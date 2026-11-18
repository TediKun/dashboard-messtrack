'use client';

import React from 'react';
import { User, TaskLog } from '@/types/database';
import { Activity, CheckCircle2, Bot, ShieldCheck, Clock } from 'lucide-react';

interface RecentActivityWidgetProps {
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

export const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({
  users,
  taskLogs,
}) => {
  const userMap = new Map(users.map((u) => [u.id, u]));

  // Sort logs by verified_at descending
  const sortedLogs = [...taskLogs].sort((a, b) =>
    (b.verified_at || '').localeCompare(a.verified_at || '')
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-6 flex flex-col justify-between shadow-xs transition-all duration-200 hover:border-violet-500/30">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/60 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Activity className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
              Aktivitas Terkini
            </h3>
          </div>
          <span className="text-[10px] font-mono font-medium text-zinc-400">
            {taskLogs.length} Total Log
          </span>
        </div>

        {/* Feed List */}
        <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
          {sortedLogs.length === 0 ? (
            <div className="py-8 text-center text-zinc-400 space-y-1">
              <Clock className="w-6 h-6 mx-auto text-zinc-400/60 mb-2" />
              <p className="text-xs font-medium">Belum ada aktivitas hari ini</p>
              <p className="text-[11px] text-zinc-500">
                Kirim foto bukti di grup WA dengan hashtag #sampah, #sapu, #pel, #wc
              </p>
            </div>
          ) : (
            sortedLogs.slice(0, 6).map((log) => {
              const resident = userMap.get(log.user_id);
              const taskTitle = taskLabelMap[log.task_type] || log.task_type;
              const isOverride = log.proof_url === 'MANUAL_ADMIN_OVERRIDE';

              let timeDisplay = log.task_date;
              try {
                if (log.verified_at) {
                  const d = new Date(log.verified_at);
                  timeDisplay = `${log.task_date} • ${d.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`;
                }
              } catch {
                // fallback to date
              }

              return (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-800/30 flex items-start justify-between gap-3 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50 transition"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold text-xs flex items-center justify-center shrink-0 border border-violet-500/20 mt-0.5">
                      {resident ? resident.name.charAt(0) : '?'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                          {resident?.name || 'Penghuni'}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          menyelesaikan
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {taskTitle}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        {timeDisplay}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1 border ${
                      isOverride
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                    }`}
                  >
                    {isOverride ? (
                      <>
                        <CheckCircle2 className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" /> Verifikasi Manual
                      </>
                    ) : (
                      <>
                        <Bot className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" /> Bot WA Aira
                      </>
                    )}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer tip */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Sinkronisasi otomatis</span>
        <span className="text-violet-600 dark:text-violet-400 font-medium">Real-time</span>
      </div>
    </div>
  );
};

