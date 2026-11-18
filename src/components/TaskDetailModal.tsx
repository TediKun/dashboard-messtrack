'use client';

import React from 'react';
import { TaskLog, TaskType } from '@/types/database';
import { X, CheckCircle2, Clock, Calendar as CalendarIcon, User as UserIcon } from 'lucide-react';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  assignedUser?: { name: string };
  completedLogs: TaskLog[];
  allTasks: TaskType[];
}

const taskLabels: Record<TaskType, { title: string; desc: string }> = {
  sampah: { title: 'Buang Sampah', desc: 'Wajib setiap pagi ke tempat pembuangan' },
  sapu: { title: 'Sapu Lantai', desc: 'Sapu seluruh ruangan dan kamar' },
  pel: { title: 'Pel Lantai', desc: 'Pel bersih seluruh area mess' },
  wc: { title: 'Bersihkan WC', desc: 'Kuras bak & sikat lantai kamar mandi' },
  galon: { title: 'Beli Galon', desc: 'Refill air minum mess' },
};

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  date,
  assignedUser,
  completedLogs,
  allTasks,
}) => {
  if (!isOpen) return null;

  const completedTypes = new Set(completedLogs.map((l) => l.task_type));

  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-zinc-900 dark:bg-zinc-950 px-6 py-4 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">Detail Tugas Piket</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl p-3.5 border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 font-bold flex items-center justify-center text-sm border border-violet-500/20">
                <UserIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">Petugas</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  {assignedUser?.name || 'Tidak ada jadwal'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-zinc-400 block font-medium">Tanggal</span>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono">
                {date}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Status Tugas Harian
            </h4>
            <div className="space-y-2">
              {allTasks.map((t) => {
                const isDone = completedTypes.has(t);
                const log = completedLogs.find((l) => l.task_type === t);
                const info = taskLabels[t] || { title: t, desc: '' };

                return (
                  <div
                    key={t}
                    className={`flex items-start justify-between p-3 rounded-2xl border transition ${
                      isDone
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
                        : 'bg-zinc-50/80 dark:bg-zinc-800/40 border-zinc-200/60 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Clock className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs font-bold leading-snug">{info.title}</p>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{info.desc}</p>
                        {isDone && log?.verified_at && (
                          <span className="inline-block text-[9px] font-medium text-emerald-700 dark:text-emerald-300 mt-1 bg-emerald-100/60 dark:bg-emerald-900/40 px-1.5 py-0.2 rounded font-mono">
                            Terverifikasi: {new Date(log.verified_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-200/70 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {isDone ? 'Selesai' : 'Belum'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-medium rounded-2xl text-xs transition active:scale-95 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
