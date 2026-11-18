'use client';

import React from 'react';
import { User, Schedule, TaskLog } from '@/types/database';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';

interface CalendarWidgetProps {
  users: User[];
  schedules: Schedule[];
  taskLogs: TaskLog[];
  selectedMonth: number; // 0-11
  selectedYear: number;
  todayStr: string;
  onMonthChange: (month: number, year: number) => void;
  onSelectDate: (date: string, schedule?: Schedule, logs?: TaskLog[]) => void;
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  users,
  schedules,
  taskLogs,
  selectedMonth,
  selectedYear,
  todayStr,
  onMonthChange,
  onSelectDate,
}) => {
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

  const userMap = new Map(users.map((u) => [u.id, u]));

  // Build calendar matrix
  const cells: (null | {
    day: number;
    dateStr: string;
    schedule?: Schedule;
    assignedUser?: User;
    logs: TaskLog[];
  })[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const dateStr = `${selectedYear}-${monthStr}-${dayStr}`;

    const schedule = schedules.find((s) => s.date === dateStr);
    const assignedUser = schedule ? userMap.get(schedule.user_id) : undefined;
    const logs = taskLogs.filter((l) => l.task_date === dateStr);

    cells.push({
      day: d,
      dateStr,
      schedule,
      assignedUser,
      logs,
    });
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-6 flex flex-col justify-between shadow-xs transition-all duration-200 hover:border-violet-500/30">
      {/* Header Month & Navigation */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                {MONTH_NAMES[selectedMonth]} {selectedYear}
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Kalender Piket & Kehadiran Tugas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 transition"
              title="Bulan Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 transition"
              title="Bulan Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {DAY_NAMES.map((d, idx) => (
            <div
              key={d}
              className={`text-[10px] font-bold uppercase tracking-wider py-1 ${
                idx === 0 ? 'text-rose-500' : 'text-zinc-400'
              }`}
            >
              {d}
            </div>
          ))}

          {cells.map((cell, idx) => {
            if (!cell) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[64px] sm:min-h-[72px] rounded-2xl bg-zinc-50/40 dark:bg-zinc-900/20 border border-transparent"
                />
              );
            }

            const { day, dateStr, schedule, assignedUser, logs } = cell;
            const isToday = dateStr === todayStr;
            const hasSchedule = Boolean(schedule);
            const hasDone = logs.length > 0;
            const isPast = dateStr < todayStr;

            // Indicator dot
            let statusDot = null;
            if (hasSchedule) {
              if (hasDone) {
                statusDot = <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />;
              } else if (isPast) {
                statusDot = <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />;
              } else {
                statusDot = <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />;
              }
            }

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate(dateStr, schedule, logs)}
                className={`min-h-[64px] sm:min-h-[72px] p-1.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-150 cursor-pointer active:scale-95 group relative ${
                  isToday
                    ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30 ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-zinc-900'
                    : 'bg-zinc-50/70 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200/60 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-bold ${
                      isToday ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {day}
                  </span>
                  {!isToday && statusDot}
                </div>

                <div className="w-full mt-1">
                  {assignedUser ? (
                    <div
                      className={`text-[9px] font-semibold truncate rounded px-1 py-0.2 ${
                        isToday
                          ? 'bg-white/20 text-white'
                          : 'bg-violet-500/10 text-violet-700 dark:text-violet-300'
                      }`}
                    >
                      {assignedUser.name.split(' ')[0]}
                    </div>
                  ) : (
                    <span className="text-[9px] text-zinc-300 dark:text-zinc-600">-</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-600 inline-block" />
          <span>Hari Ini</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>Tugas Selesai</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
          <span>Mangkir (0 Tugas)</span>
        </div>
      </div>
    </div>
  );
};

