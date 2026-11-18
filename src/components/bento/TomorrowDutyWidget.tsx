'use client';

import React from 'react';
import { User, Schedule } from '@/types/database';
import { CalendarCheck2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TomorrowDutyWidgetProps {
  users: User[];
  schedules: Schedule[];
  todayStr: string;
}

export const TomorrowDutyWidget: React.FC<TomorrowDutyWidgetProps> = ({
  users,
  schedules,
  todayStr,
}) => {
  // Compute tomorrow date string
  const getTomorrowDateStr = () => {
    try {
      const d = new Date(todayStr);
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const tomorrowStr = getTomorrowDateStr();
  const tomorrowSchedule = schedules.find((s) => s.date === tomorrowStr);
  const assignedTomorrow = tomorrowSchedule
    ? users.find((u) => u.id === tomorrowSchedule.user_id)
    : undefined;

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-5 shadow-xs transition-all duration-200 hover:border-violet-500/30 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/60 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Piket Besok ({tomorrowStr})
            </span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40">
            Next Turn
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-extrabold text-base flex items-center justify-center border border-zinc-200/60 dark:border-zinc-700/60 shrink-0">
            {assignedTomorrow ? assignedTomorrow.name.charAt(0) : '?'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-zinc-900 dark:text-white truncate">
              {assignedTomorrow ? assignedTomorrow.name : 'Belum Ditentukan'}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
              {assignedTomorrow?.phone_number || 'Pengingat otomatis H-1'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
        <span className="text-zinc-500 dark:text-zinc-400">
          SOP: Buang sampah pagi & sapu area mess
        </span>
        <Link
          href="/piket"
          className="text-violet-600 dark:text-violet-400 font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>Cek Kalender</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

