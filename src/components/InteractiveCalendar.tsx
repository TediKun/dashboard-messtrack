import React from 'react';
import { User, Schedule, TaskLog } from '@/types/database';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface InteractiveCalendarProps {
  users: User[];
  schedules: Schedule[];
  taskLogs: TaskLog[];
  selectedMonth: number; // 0-11
  selectedYear: number;
  onMonthChange: (month: number, year: number) => void;
  onSelectDate: (date: string, schedule?: Schedule, logs?: TaskLog[]) => void;
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// User distinct indicator badges
const USER_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Cecep Supriatna': { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
  'Dadan': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  'Sofwan': { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
  'Tedi Triadi': { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', dot: 'bg-fuchsia-500' },
  'Rama Cahya Maulana': { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
};

export const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  users,
  schedules,
  taskLogs,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onSelectDate,
}) => {
  const [todayStr, setTodayStr] = React.useState<string>('');

  React.useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0]);
  }, []);
  // Calendar generation logic
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      onMonthChange(11, selectedYear - 1);
    } else {
      onMonthChange(selectedMonth - 1, selectedYear);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      onMonthChange(0, selectedYear + 1);
    } else {
      onMonthChange(selectedMonth + 1, selectedYear);
    }
  };

  // Lookup users by id
  const userMap = new Map(users.map((u) => [u.id, u]));

  // Calendar dates array
  const calendarCells = [];

  // Blank cells before the 1st day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }

  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${selectedYear}-${monthStr}-${dayStr}`;

    const schedule = schedules.find((s) => s.date === dateStr);
    const assignedUser = schedule ? userMap.get(schedule.user_id) : undefined;
    const logsForDate = taskLogs.filter((l) => l.task_date === dateStr);

    calendarCells.push({
      day,
      dateStr,
      schedule,
      assignedUser,
      logsForDate,
    });
  }



  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
      {/* Month Navigation & Legend Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {MONTH_NAMES[selectedMonth]} {selectedYear}
          </h2>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-md text-slate-600 hover:bg-white hover:shadow-xs transition"
              title="Bulan Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-md text-slate-600 hover:bg-white hover:shadow-xs transition"
              title="Bulan Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
            <span className="text-slate-600 font-medium">Selesai (Minimal 1 Tugas)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs"></span>
            <span className="text-slate-600 font-medium">Mangkir (0 Tugas)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-200 inline-block"></span>
            <span className="text-slate-600 font-medium">Mendatang / Kosong</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Day Header */}
        {DAY_NAMES.map((d, idx) => (
          <div
            key={d}
            className={`text-xs font-bold uppercase tracking-wider py-1.5 ${
              idx === 0 ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            {d}
          </div>
        ))}

        {/* Calendar Cells */}
        {calendarCells.map((cell, idx) => {
          if (!cell) {
            return (
              <div
                key={`empty-${idx}`}
                className="min-h-[90px] rounded-xl bg-slate-50/50 border border-transparent"
              />
            );
          }

          const { day, dateStr, schedule, assignedUser, logsForDate } = cell;
          const isToday = dateStr === todayStr;
          const hasSchedule = Boolean(schedule);
          const hasCompletedTask = logsForDate.length > 0;
          const isPast = dateStr < todayStr;

          // Status determination as per PRD:
          // 🟢 Green Date: User completed at least 1 task that day
          // 🔴 Red Date: User had a schedule but completed 0 tasks (Mangkir)
          let statusBg = 'bg-slate-50 hover:bg-slate-100/70 border-slate-200/60';
          let indicatorBadge = null;

          if (hasSchedule) {
            if (hasCompletedTask) {
              statusBg = 'bg-emerald-50/80 hover:bg-emerald-100/70 border-emerald-300 text-emerald-950';
              indicatorBadge = (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm animate-pulse" />
              );
            } else if (isPast) {
              statusBg = 'bg-rose-50/80 hover:bg-rose-100/70 border-rose-300 text-rose-950';
              indicatorBadge = <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />;
            } else {
              // Scheduled for today or future
              statusBg = 'bg-blue-50/50 hover:bg-blue-100/50 border-blue-200/80 text-blue-950';
              indicatorBadge = <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />;
            }
          }

          const userBadgeStyle = assignedUser
            ? USER_COLORS[assignedUser.name] || {
                bg: 'bg-slate-100',
                text: 'text-slate-700',
                dot: 'bg-slate-400',
              }
            : null;

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(dateStr, schedule, logsForDate)}
              className={`min-h-[92px] p-2 rounded-xl border text-left flex flex-col justify-between transition group relative ${statusBg} ${
                isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-sm font-bold ${
                    isToday
                      ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center -ml-0.5 -mt-0.5 shadow-sm'
                      : 'text-slate-700'
                  }`}
                >
                  {day}
                </span>
                {indicatorBadge}
              </div>

              {/* Assigned Resident Pill */}
              <div className="w-full mt-1.5">
                {assignedUser && userBadgeStyle ? (
                  <div
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold truncate flex items-center gap-1 ${userBadgeStyle.bg} ${userBadgeStyle.text}`}
                    title={assignedUser.name}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${userBadgeStyle.dot} shrink-0`} />
                    <span className="truncate">{assignedUser.name.split(' ')[0]}</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-300 italic block">-</span>
                )}

                {/* Completed tasks count tag */}
                {hasCompletedTask && (
                  <div className="mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-100/70 px-1 py-0.5 rounded text-center">
                    ✓ {logsForDate.length} tugas selesai
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
        <Info className="w-4 h-4 text-blue-500 shrink-0" />
        <span>
          Klik pada tanggal kalender untuk melihat detail daftar tugas dan verifikasi foto piket penghuni.
        </span>
      </div>
    </div>
  );
};

