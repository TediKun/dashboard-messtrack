'use client';

import React, { useState, useEffect } from 'react';
import { User, Schedule, TaskLog, TaskType } from '@/types/database';
import {
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

interface TodayDutyWidgetProps {
  users: User[];
  schedules: Schedule[];
  taskLogs: TaskLog[];
  todayStr: string;
}

const DUTY_TASKS: { type: TaskType; label: string; desc: string }[] = [
  { type: 'sampah', label: 'Buang Sampah', desc: 'Pagi hari' },
  { type: 'sapu', label: 'Sapu Lantai', desc: 'Ruangan & kamar' },
  { type: 'pel', label: 'Pel Lantai', desc: 'Area bersama' },
  { type: 'wc', label: 'Bersihkan WC', desc: 'Toilet mess' },
];

export const TodayDutyWidget: React.FC<TodayDutyWidgetProps> = ({
  users,
  schedules,
  taskLogs,
  todayStr,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  // Running live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Find schedule for today (or next closest schedule if today is outside bounds)
  const scheduleToday = schedules.find((s) => s.date === todayStr);
  const activeSchedule =
    scheduleToday ||
    schedules.find((s) => s.date >= todayStr) ||
    schedules[0];

  const assignedUser = activeSchedule
    ? users.find((u) => u.id === activeSchedule.user_id)
    : undefined;

  const targetDate = activeSchedule ? activeSchedule.date : todayStr;
  const isExactToday = targetDate === todayStr;

  // Completed tasks for the active date
  const dateLogs = taskLogs.filter((l) => l.task_date === targetDate);
  const completedTaskSet = new Set(dateLogs.map((l) => l.task_type));

  const completedCount = DUTY_TASKS.filter((t) => completedTaskSet.has(t.type)).length;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-6 flex flex-col gap-4 shadow-xs transition-all duration-200 hover:border-violet-500/30">
      {/* Background violet aura */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Live Clock & Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Live Roster & Clock
            </span>
          </div>
          <div className="font-mono text-xs font-semibold px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
            {timeStr || '--:--:--'} WIB
          </div>
        </div>

        {/* Assigned Person Hero */}
        <div className="flex items-start gap-4 pb-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="relative">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-violet-500/20">
              {assignedUser ? assignedUser.name.charAt(0) : '?'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] text-white">
              ✓
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
                {isExactToday ? 'Petugas Hari Ini' : `Jadwal Terdekat (${targetDate})`}
              </span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white truncate">
              {assignedUser ? assignedUser.name : 'Belum Ditugaskan'}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5 truncate">
              {assignedUser?.phone_number || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Task Checklist */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold uppercase tracking-wider text-[10px]">Tugas Harian</span>
          <span className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">
            {completedCount}/{DUTY_TASKS.length} Selesai
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DUTY_TASKS.map((task) => {
            const isDone = completedTaskSet.has(task.type);
            return (
              <div
                key={task.type}
                className={`p-2.5 rounded-2xl border transition-all duration-150 flex items-center justify-between ${
                  isDone
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
                    : 'bg-zinc-50/80 dark:bg-zinc-800/40 border-zinc-200/60 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                  )}
                  <div className="truncate">
                    <p className="text-xs font-semibold leading-tight truncate">{task.label}</p>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-none">
                      {task.desc}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-200/70 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {isDone ? 'Done' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

