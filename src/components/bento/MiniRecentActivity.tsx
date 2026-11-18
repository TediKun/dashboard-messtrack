'use client';

import React from 'react';
import { User, TaskLog } from '@/types/database';
import { Activity, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

interface MiniRecentActivityProps {
  users: User[];
  taskLogs: TaskLog[];
}

const taskLabelMap: Record<string, string> = {
  sampah: 'Buang Sampah',
  sapu: 'Sapu Lantai',
  pel: 'Pel Lantai',
  wc: 'Bersihkan WC',
  galon: 'Beli Galon',
};

export const MiniRecentActivity: React.FC<MiniRecentActivityProps> = ({
  users,
  taskLogs,
}) => {
  const userMap = new Map(users.map((u) => [u.id, u]));

  // Get latest 3 logs
  const latestLogs = [...taskLogs]
    .sort((a, b) => (b.verified_at || '').localeCompare(a.verified_at || ''))
    .slice(0, 3);

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-5 shadow-xs transition-all duration-200 hover:border-violet-500/30">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/60 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <h3 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">
            Aktivitas Terakhir
          </h3>
        </div>
        <Link
          href="/piket"
          className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-2">
        {latestLogs.length === 0 ? (
          <p className="text-xs text-zinc-400 py-2">Belum ada aktivitas tercatat.</p>
        ) : (
          latestLogs.map((log) => {
            const user = userMap.get(log.user_id);
            const taskLabel = taskLabelMap[log.task_type] || log.task_type;
            const timeFormatted = log.verified_at
              ? new Date(log.verified_at).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '-';

            return (
              <div
                key={log.id}
                className="flex items-center justify-between p-2 rounded-2xl bg-zinc-50/60 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate leading-tight">
                      {user ? user.name.split(' ')[0] : 'Penghuni'}
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      {taskLabel}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-medium text-zinc-400 shrink-0">
                  {timeFormatted} WIB
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

