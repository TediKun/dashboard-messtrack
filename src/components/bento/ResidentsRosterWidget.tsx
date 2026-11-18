'use client';

import React from 'react';
import { User, TaskLog, Fine } from '@/types/database';
import { Users, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ResidentsRosterWidgetProps {
  users: User[];
  taskLogs: TaskLog[];
  fines: Fine[];
  onSelectUser: (user: User) => void;
}

export const ResidentsRosterWidget: React.FC<ResidentsRosterWidgetProps> = ({
  users,
  taskLogs,
  fines,
  onSelectUser,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-6 shadow-xs transition-all duration-200 hover:border-violet-500/30">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
              Roster Penghuni Mess
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Klik kartu penghuni untuk melihat detail riwayat tugas & catatan denda
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300">
          5 Anggota
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {users.map((u) => {
          const userTasks = taskLogs.filter((l) => l.user_id === u.id).length;
          const userUnpaidFines = fines
            .filter((f) => f.user_id === u.id && !f.is_paid)
            .reduce((sum, f) => sum + Number(f.amount), 0);

          return (
            <button
              key={u.id}
              type="button"
              onClick={() => onSelectUser(u)}
              className="p-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/60 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60 text-left transition-all duration-150 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 font-extrabold text-sm flex items-center justify-center border border-violet-500/20 group-hover:scale-105 transition-transform">
                    {u.name.charAt(0)}
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-violet-500 transition-all" />
                </div>

                <p className="text-sm font-bold text-zinc-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {u.name}
                </p>
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  {u.role === 'admin' ? '⭐ Admin' : 'Penghuni'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 dark:text-zinc-400">Tugas Selesai</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {userTasks}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 dark:text-zinc-400">Denda Aktif</span>
                  <span
                    className={`font-mono font-bold ${
                      userUnpaidFines > 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-zinc-400'
                    }`}
                  >
                    Rp {userUnpaidFines.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

