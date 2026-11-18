import React, { useState } from 'react';
import { User, TaskLog, Fine, TaskType } from '@/types/database';
import {
  X,
  Phone,
  CheckCircle2,
  Trash2,
  Plus,
  AlertTriangle,
  Check,
} from 'lucide-react';

interface ResidentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  isAdmin: boolean;
  taskLogs: TaskLog[];
  fines: Fine[];
  onAddTaskLog?: (userId: string, date: string, taskType: TaskType) => Promise<void>;
  onDeleteTaskLog?: (logId: string) => Promise<void>;
  onAddFine?: (userId: string, amount: number, reason: string, month: number, year: number) => Promise<void>;
  onToggleFinePaid?: (fineId: string, currentPaid: boolean) => Promise<void>;
  onDeleteFine?: (fineId: string) => Promise<void>;
}

const taskOptions: { type: TaskType; label: string }[] = [
  { type: 'sampah', label: 'Buang Sampah' },
  { type: 'sapu', label: 'Sapu Lantai' },
  { type: 'pel', label: 'Pel Lantai' },
  { type: 'wc', label: 'Bersihkan WC' },
  { type: 'galon', label: 'Beli Galon' },
];

export const ResidentDetailModal: React.FC<ResidentDetailModalProps> = ({
  isOpen,
  onClose,
  user,
  isAdmin,
  taskLogs,
  fines,
  onAddTaskLog,
  onDeleteTaskLog,
  onAddFine,
  onToggleFinePaid,
  onDeleteFine,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'fines'>('tasks');

  // Manual Task Completion State
  const [overrideDate, setOverrideDate] = useState('2026-11-17');
  const [overrideTask, setOverrideTask] = useState<TaskType>('sapu');
  const [taskSubmitting, setTaskSubmitting] = useState(false);

  // Manual Fine State
  const [fineAmount, setFineAmount] = useState<number>(2500);
  const [fineReason, setFineReason] = useState<string>('');
  const [fineSubmitting, setFineSubmitting] = useState(false);

  React.useEffect(() => {
    setOverrideDate(new Date().toISOString().split('T')[0]);
  }, []);

  if (!isOpen || !user) return null;

  const userLogs = taskLogs
    .filter((l) => l.user_id === user.id)
    .sort((a, b) => b.task_date.localeCompare(a.task_date));

  const userFines = fines
    .filter((f) => f.user_id === user.id)
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));

  const totalUnpaidFines = userFines
    .filter((f) => !f.is_paid)
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const handleManualTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddTaskLog) return;
    setTaskSubmitting(true);
    try {
      await onAddTaskLog(user.id, overrideDate, overrideTask);
    } finally {
      setTaskSubmitting(false);
    }
  };

  const handleManualFineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddFine || !fineReason.trim()) return;
    setFineSubmitting(true);
    const now = new Date();
    try {
      await onAddFine(user.id, fineAmount, fineReason.trim(), now.getMonth() + 1, now.getFullYear());
      setFineReason('');
    } finally {
      setFineSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-150">
        {/* Header Profil Penghuni */}
        <div className="bg-zinc-50 dark:bg-zinc-950 p-6 border-b border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-900/10 dark:bg-violet-900/20 border border-violet-500/20 dark:border-violet-500/30 text-violet-900 dark:text-violet-400 font-extrabold text-2xl flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{user.name}</h3>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    user.role === 'admin'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-1 mt-1">
                <Phone className="w-3.5 h-3.5 text-zinc-400" /> {user.phone_number}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-2xl text-right shadow-xs">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Denda Belum Lunas</span>
              <span className={`text-base font-extrabold font-mono ${totalUnpaidFines > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                Rp {totalUnpaidFines.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigasi */}
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 pt-3 gap-6">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 text-xs font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'tasks'
                ? 'border-violet-900 text-violet-900 dark:text-violet-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Riwayat Tugas ({userLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('fines')}
            className={`pb-3 text-xs font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'fines'
                ? 'border-violet-900 text-violet-900 dark:text-violet-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Daftar Denda & Catatan ({userFines.length})
          </button>
        </div>

        {/* Isi Tab */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: RIWAYAT TUGAS & MANUAL OVERRIDE */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {isAdmin && onAddTaskLog && (
                <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-500" /> Selesaikan Tugas Manual (Manual Override)
                  </h4>
                  <form onSubmit={handleManualTaskSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">Tanggal Tugas</label>
                      <input
                        type="date"
                        value={overrideDate}
                        onChange={(e) => setOverrideDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">Jenis Tugas (Satuan)</label>
                      <select
                        value={overrideTask}
                        onChange={(e) => setOverrideTask(e.target.value as TaskType)}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                      >
                        {taskOptions.map((t) => (
                          <option key={t.type} value={t.type}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={taskSubmitting}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{taskSubmitting ? 'Menyimpan...' : 'Tandai Selesai'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* List Riwayat Tugas */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Daftar Tugas yang Pernah Diselesaikan
                </h4>
                {userLogs.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic py-6 text-center">
                    Belum ada riwayat tugas yang diselesaikan oleh {user.name}.
                  </p>
                ) : (
                  <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950/40">
                    {userLogs.map((log) => {
                      const taskLabel = taskOptions.find((t) => t.type === log.task_type)?.label || log.task_type;
                      return (
                        <div key={log.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-white">{taskLabel}</p>
                              <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                <span className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">{log.task_date}</span>
                                <span>•</span>
                                <span>Terverifikasi: {new Date(log.verified_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>
                          </div>

                          {isAdmin && onDeleteTaskLog && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Hapus log tugas "${taskLabel}" tanggal ${log.task_date}?`)) {
                                  onDeleteTaskLog(log.id);
                                }
                              }}
                              className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                              title="Hapus Log Tugas"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: DAFTAR DENDA & CATATAN PENALTI */}
          {activeTab === 'fines' && (
            <div className="space-y-6">
              {isAdmin && onAddFine && (
                <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-rose-500" /> Tambah Denda Secara Manual
                  </h4>
                  <form onSubmit={handleManualFineSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">Nominal Denda (Rp)</label>
                        <input
                          type="number"
                          step={500}
                          value={fineAmount}
                          onChange={(e) => setFineAmount(Number(e.target.value))}
                          required
                          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500 font-mono"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">Alasan / Catatan Pelanggaran (Log)</label>
                        <input
                          type="text"
                          value={fineReason}
                          onChange={(e) => setFineReason(e.target.value)}
                          placeholder="Contoh: Mangkir buang sampah tanggal 04/05/2026"
                          required
                          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={fineSubmitting}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{fineSubmitting ? 'Menyimpan...' : 'Berikan Denda'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* List Denda Penghuni */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Riwayat Denda & Catatan Alasan
                </h4>
                {userFines.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic py-6 text-center">
                    Tidak ada catatan denda untuk {user.name}. Bersih! ✨
                  </p>
                ) : (
                  <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950/40">
                    {userFines.map((fine) => (
                      <div key={fine.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-zinc-900 dark:text-white font-mono">
                              Rp {Number(fine.amount).toLocaleString('id-ID')}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                fine.is_paid
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              }`}
                            >
                              {fine.is_paid ? 'Lunas' : 'Belum Dibayar'}
                            </span>
                            <span className="text-[11px] text-zinc-400 font-mono">
                              (Periode: {fine.month}/{fine.year})
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                            <span className="text-zinc-400 font-medium">Alasan / Log: </span>
                            {fine.reason}
                          </p>
                        </div>

                        {isAdmin && (
                          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                            {onToggleFinePaid && (
                              <button
                                type="button"
                                onClick={() => onToggleFinePaid(fine.id, fine.is_paid)}
                                className={`px-2.5 py-1 text-xs font-semibold rounded-xl transition border cursor-pointer ${
                                  fine.is_paid
                                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:text-zinc-900 dark:hover:text-white'
                                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                }`}
                              >
                                {fine.is_paid ? 'Tandai Belum Lunas' : 'Tandai Lunas'}
                              </button>
                            )}

                            {onDeleteFine && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Hapus denda Rp${Number(fine.amount).toLocaleString('id-ID')} (${fine.reason})?`)) {
                                    onDeleteFine(fine.id);
                                  }
                                }}
                                className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                                title="Hapus Denda"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
