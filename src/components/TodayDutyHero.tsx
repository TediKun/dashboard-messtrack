import React from 'react';
import { User, Schedule, TaskLog, TaskType } from '@/types/database';
import {
  CalendarCheck,
  Clock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';

interface TodayDutyHeroProps {
  users: User[];
  schedules: Schedule[];
  taskLogs: TaskLog[];
  selectedDate: string; // YYYY-MM-DD
}

export const TodayDutyHero: React.FC<TodayDutyHeroProps> = ({
  users,
  schedules,
  taskLogs,
  selectedDate,
}) => {
  const scheduleToday = schedules.find((s) => s.date === selectedDate);
  const assignedUser = scheduleToday
    ? users.find((u) => u.id === scheduleToday.user_id)
    : undefined;

  const todayLogs = taskLogs.filter((l) => l.task_date === selectedDate);
  const completedTaskTypes = new Set(todayLogs.map((l) => l.task_type));

  const formattedDate = new Date(selectedDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const tasksList: { type: TaskType; label: string; req: string; fine: string }[] = [
    { type: 'sampah', label: 'Buang Sampah', req: 'Tugas Harian', fine: 'Rp 2.000' },
    { type: 'sapu', label: 'Sapu Lantai', req: 'Tugas Harian', fine: 'Rp 2.500' },
    { type: 'pel', label: 'Pel Lantai', req: 'Tugas Harian', fine: 'Rp 2.500' },
    { type: 'wc', label: 'Bersihkan WC', req: 'Tugas Harian', fine: 'Rp 5.000' },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Assigned Person Badge */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CalendarCheck className="w-3.5 h-3.5" /> Piket Aktif Hari Ini
            </span>
            <span className="text-xs text-slate-400 font-mono">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              {assignedUser ? assignedUser.name.charAt(0) : '?'}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Penanggung Jawab Utama</p>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {assignedUser ? assignedUser.name : 'Belum Terjadwal'}
              </h2>
              {assignedUser && (
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  WA: {assignedUser.phone_number}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick Task Status Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {tasksList.map((t) => {
            const isDone = completedTaskTypes.has(t.type);
            return (
              <div
                key={t.type}
                className={`p-3 rounded-xl border flex flex-col justify-between transition ${
                  isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-bold truncate">{t.label}</span>
                  {isDone ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">{t.req}</span>
                  <span
                    className={`font-semibold px-1.5 py-0.2 rounded ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isDone ? 'Selesai' : 'Belum'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
