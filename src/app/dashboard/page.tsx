'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  fallbackUsers,
  fallbackSchedules,
  fallbackTaskLogs,
  fallbackFines,
  fallbackFinanceTransactions,
  fallbackArrears,
} from '@/lib/fallbackData';
import { User, Schedule, TaskLog, Fine, TaskType, FinanceTransaction, Arrear } from '@/types/database';
import { ResidentDetailModal } from '@/components/ResidentDetailModal';
import { FinanceAdminTab } from '@/components/admin/FinanceAdminTab';
import { ThemeToggle } from '@/components/ThemeToggle';
import { adminDbQuery } from '@/lib/adminDb';
import {
  Shield,
  ArrowLeft,
  KeyRound,
  Users,
  Calendar,
  CheckCircle2,
  Plus,
  LogOut,
  AlertCircle,
  Eye,
  Pencil,
  Trash2,
  X,
  Filter,
  Wallet,
} from 'lucide-react';

const taskNameMap: Record<string, string> = {
  sampah: 'Buang Sampah',
  sapu: 'Sapu Lantai',
  pel: 'Pel Lantai',
  wc: 'Bersihkan WC',
  galon: 'Beli Galon',
};

export default function AdminDashboardPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Management States
  const [users, setUsers] = useState<User[]>(fallbackUsers);
  const [schedules, setSchedules] = useState<Schedule[]>(fallbackSchedules);
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>(fallbackTaskLogs);
  const [fines, setFines] = useState<Fine[]>(fallbackFines);
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(
    fallbackFinanceTransactions
  );
  const [arrears, setArrears] = useState<Arrear[]>(fallbackArrears);
  const [activeTab, setActiveTab] = useState<'users' | 'schedules' | 'finance'>('users');

  // Filter Schedule: Pilihan Tanggal Fleksibel
  const [todayStr, setTodayStr] = useState('2026-11-17');
  const [scheduleFilterDate, setScheduleFilterDate] = useState('2026-11-17');

  // Resident Detail Modal State
  const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // User CRUD Form Modal State
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [userFormMode, setUserFormMode] = useState<'add' | 'edit'>('add');
  const [formUserId, setFormUserId] = useState('');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<'user' | 'admin'>('user');
  const [formSaving, setFormSaving] = useState(false);

  // Fetch all initial data
  const loadData = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const [uRes, sRes, tRes, fRes, txRes, arrRes] = await Promise.all([
        supabase.from('users').select('*').order('name'),
        supabase.from('schedules').select('*').order('date'),
        supabase.from('task_logs').select('*'),
        supabase.from('fines').select('*'),
        supabase
          .from('finance_transactions')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase.from('arrears').select('*').order('year', { ascending: false }),
      ]);

      if (uRes.data && uRes.data.length > 0) setUsers(uRes.data);
      if (sRes.data && sRes.data.length > 0) setSchedules(sRes.data);
      if (tRes.data) setTaskLogs(tRes.data);
      if (fRes.data) setFines(fRes.data);
      if (txRes.data) setTransactions(txRes.data);
      if (arrRes.data) setArrears(arrRes.data);
    } catch (e) {
      console.error('Failed to load admin data:', e);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTodayStr(today);
    setScheduleFilterDate(today);

    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAdminAuthenticated(true);
        }
      });
      loadData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    if (!isSupabaseConfigured) {
      if (password === 'admin123' || email.includes('admin')) {
        setIsAdminAuthenticated(true);
      } else {
        setAuthError('Demo Mode: Gunakan password "admin123" atau hubungkan Supabase.');
      }
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setIsAdminAuthenticated(true);
      await loadData();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal login';
      setAuthError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setIsAdminAuthenticated(false);
  };

  // --- CRUD PENGHUNI ---
  const handleOpenAddUser = () => {
    setUserFormMode('add');
    setFormUserId('');
    setFormName('');
    setFormPhone('628');
    setFormRole('user');
    setIsUserFormOpen(true);
  };

  const handleOpenEditUser = (user: User) => {
    setUserFormMode('edit');
    setFormUserId(user.id);
    setFormName(user.name);
    setFormPhone(user.phone_number);
    setFormRole(user.role);
    setIsUserFormOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    const cleanPhone = formPhone.replace(/\D/g, '');

    try {
      if (userFormMode === 'add') {
        const newUser: User = {
          id: isSupabaseConfigured ? undefined as unknown as string : `user-${Date.now()}`,
          name: formName.trim(),
          phone_number: cleanPhone,
          role: formRole,
        };

        if (isSupabaseConfigured) {
          const { data, error } = await adminDbQuery<User[]>({
            action: 'insert',
            table: 'users',
            payload: [{
              name: newUser.name,
              phone_number: newUser.phone_number,
              role: newUser.role,
            }],
          });
          if (error) throw error;
          if (data && data.length > 0) setUsers((prev) => [...prev, data[0]]);
        } else {
          setUsers((prev) => [...prev, newUser]);
        }
      } else {
        if (isSupabaseConfigured) {
          const { error } = await adminDbQuery({
            action: 'update',
            table: 'users',
            payload: {
              name: formName.trim(),
              phone_number: cleanPhone,
              role: formRole,
            },
            match: { id: formUserId },
          });
          if (error) throw error;
        }

        setUsers((prev) =>
          prev.map((u) =>
            u.id === formUserId
              ? { ...u, name: formName.trim(), phone_number: cleanPhone, role: formRole }
              : u
          )
        );
      }

      setIsUserFormOpen(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menyimpan penghuni');
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Hapus permanen penghuni "${user.name}"? Seluruh jadwal dan riwayat dendanya akan dihapus permanen.`)) {
      return;
    }

    try {
      if (isSupabaseConfigured) {
        const { error } = await adminDbQuery({
          action: 'delete',
          table: 'users',
          match: { id: user.id },
        });
        if (error) throw error;
      }

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setSchedules((prev) => prev.filter((s) => s.user_id !== user.id));
      setTaskLogs((prev) => prev.filter((t) => t.user_id !== user.id));
      setFines((prev) => prev.filter((f) => f.user_id !== user.id));
      if (selectedUserDetail?.id === user.id) {
        setIsDetailOpen(false);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus penghuni');
    }
  };

  // --- DETAIL MODAL ACTIONS ---
  const handleAddTaskLog = async (userId: string, date: string, taskType: TaskType) => {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await adminDbQuery<TaskLog[]>({
          action: 'insert',
          table: 'task_logs',
          payload: [{
            user_id: userId,
            task_date: date,
            task_type: taskType,
            proof_url: 'MANUAL_ADMIN_OVERRIDE',
            verified_at: new Date().toISOString(),
          }],
        });
        if (error) throw error;
        if (data && data.length > 0) setTaskLogs((prev) => [data[0], ...prev]);
      } else {
        const newLog: TaskLog = {
          id: `log-${Date.now()}`,
          user_id: userId,
          task_date: date,
          task_type: taskType,
          proof_url: 'MANUAL_ADMIN_OVERRIDE',
          verified_at: new Date().toISOString(),
        };
        setTaskLogs((prev) => [newLog, ...prev]);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menyelesaikan tugas');
    }
  };

  const handleDeleteTaskLog = async (logId: string) => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await adminDbQuery({
          action: 'delete',
          table: 'task_logs',
          match: { id: logId },
        });
        if (error) throw error;
      }
      setTaskLogs((prev) => prev.filter((l) => l.id !== logId));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus log tugas');
    }
  };

  const handleAddFine = async (
    userId: string,
    amount: number,
    reason: string,
    month: number,
    year: number
  ) => {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await adminDbQuery<Fine[]>({
          action: 'insert',
          table: 'fines',
          payload: [{
            user_id: userId,
            amount,
            reason,
            month,
            year,
            is_paid: false,
          }],
        });
        if (error) throw error;
        if (data && data.length > 0) setFines((prev) => [data[0], ...prev]);
      } else {
        const newFine: Fine = {
          id: `fine-${Date.now()}`,
          user_id: userId,
          amount,
          reason,
          month,
          year,
          is_paid: false,
          created_at: new Date().toISOString(),
        };
        setFines((prev) => [newFine, ...prev]);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menambahkan denda');
    }
  };

  const handleToggleFinePaid = async (fineId: string, currentPaid: boolean) => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await adminDbQuery({
          action: 'update',
          table: 'fines',
          payload: { is_paid: !currentPaid },
          match: { id: fineId },
        });
        if (error) throw error;
      }
      setFines((prev) =>
        prev.map((f) => (f.id === fineId ? { ...f, is_paid: !currentPaid } : f))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal mengubah status denda');
    }
  };

  const handleDeleteFine = async (fineId: string) => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await adminDbQuery({
          action: 'delete',
          table: 'fines',
          match: { id: fineId },
        });
        if (error) throw error;
      }
      setFines((prev) => prev.filter((f) => f.id !== fineId));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus denda');
    }
  };

  const displaySchedules = schedules
    .filter((s) => (scheduleFilterDate ? s.date >= scheduleFilterDate : true))
    .sort((a, b) => a.date.localeCompare(b.date));

  // If NOT authenticated, show Login Screen
  if (!isAdminAuthenticated) {
    return (
      <main className="min-h-full flex items-center justify-center p-4 py-12 transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="space-y-1.5 text-center">
            <div className="w-12 h-12 bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Login Admin</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Autentikasi diperlukan untuk mengelola penghuni, jadwal, dan manual override.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">Email Admin</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@messtrack.local"
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-violet-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-violet-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-2xl text-sm shadow-md shadow-violet-600/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Shield className="w-4 h-4" />
              <span>{loading ? 'Memproses...' : 'Masuk ke Admin Panel'}</span>
            </button>
          </form>

          {!isSupabaseConfigured && (
            <p className="text-[11px] text-center text-zinc-500">
              💡 Demo Mode: Masukkan password <code className="text-violet-600 dark:text-violet-400 font-mono">admin123</code> untuk masuk.
            </p>
          )}
        </div>
      </main>
    );
  }

  // Admin Authenticated View
  return (
    <main className="min-h-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Admin Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Kelola data penghuni, jadwal piket, serta pembukuan & tunggakan kas mess.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-auto text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-500/20 transition cursor-pointer active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar Sesi</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" /> Kelola Penghuni ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'schedules'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            <Calendar className="w-4 h-4" /> Jadwal Piket ({displaySchedules.length})
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'finance'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            <Wallet className="w-4 h-4" /> Keuangan & Tunggakan
          </button>
        </div>

        {/* TAB 1: PENGHUNI */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Daftar Penghuni Mess</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Kelola nama, nomor WhatsApp (format 62), hak akses admin, serta rincian tugas & denda.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddUser}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/20 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Penghuni</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Nama</th>
                    <th className="py-3 px-4">Nomor WhatsApp</th>
                    <th className="py-3 px-4">Peran (Role)</th>
                    <th className="py-3 px-4">Tugas Selesai</th>
                    <th className="py-3 px-4">Denda Aktif</th>
                    <th className="py-3 px-4 text-right">Aksi & Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                  {users.map((u) => {
                    const userLogsCount = taskLogs.filter((l) => l.user_id === u.id).length;
                    const userUnpaidFines = fines
                      .filter((f) => f.user_id === u.id && !f.is_paid)
                      .reduce((sum, f) => sum + Number(f.amount), 0);

                    return (
                      <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                        <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">{u.name}</td>
                        <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-300">{u.phone_number}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              u.role === 'admin'
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{userLogsCount} selesai</td>
                        <td className="py-3 px-4 font-mono">
                          <span className={userUnpaidFines > 0 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-zinc-400'}>
                            Rp {userUnpaidFines.toLocaleString('id-ID')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedUserDetail(u);
                                setIsDetailOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 hover:bg-violet-600/20 border border-violet-500/20 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                              title="Lihat Detail & Override"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Detail</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditUser(u)}
                              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                              title="Edit Penghuni"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u)}
                              className="p-1 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-500/10 transition cursor-pointer"
                              title="Hapus Penghuni"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: JADWAL PIKET */}
        {activeTab === 'schedules' && (
          <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Jadwal Piket Mess</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Pilih tanggal untuk melihat jadwal mulai dari tanggal tersebut ke depan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-violet-500" />
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Mulai Tanggal:</span>
                  <input
                    type="date"
                    value={scheduleFilterDate}
                    onChange={(e) => setScheduleFilterDate(e.target.value)}
                    className="bg-transparent text-zinc-800 dark:text-zinc-200 font-mono focus:outline-none cursor-pointer text-xs"
                  />
                </div>

                {scheduleFilterDate && (
                  <button
                    type="button"
                    onClick={() => setScheduleFilterDate('')}
                    className="px-3 py-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-medium transition cursor-pointer"
                  >
                    Tampilkan Semua
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase">
                  <tr>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Penghuni Terjadwal</th>
                    <th className="py-3 px-4">Jenis Tugas (Satuan)</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                  {displaySchedules.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-zinc-400 italic">
                        Tidak ada jadwal piket yang cocok dengan filter tanggal.
                      </td>
                    </tr>
                  ) : (
                    displaySchedules.map((s) => {
                      const assigned = users.find((u) => u.id === s.user_id);
                      const isToday = s.date === todayStr;
                      return (
                        <tr
                          key={s.id}
                          className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition ${
                            isToday ? 'bg-violet-500/10 border-l-2 border-l-violet-600' : ''
                          }`}
                        >
                          <td className="py-3 px-4 font-mono font-medium text-zinc-900 dark:text-zinc-200">
                            {s.date} {isToday && <span className="text-[10px] text-violet-600 dark:text-violet-400 font-bold ml-1">(Hari Ini)</span>}
                          </td>
                          <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">
                            {assigned?.name || s.user_id}
                          </td>
                          <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">
                            {s.task_type.map((t) => taskNameMap[t] || t).join(', ')}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-zinc-400 text-center">
              Total {displaySchedules.length} tanggal jadwal ditampilkan.
            </p>
          </div>
        )}

        {/* TAB 3: KEUANGAN & TUNGGAKAN */}
        {activeTab === 'finance' && (
          <FinanceAdminTab
            users={users}
            transactions={transactions}
            arrears={arrears}
            onRefresh={loadData}
            setTransactions={setTransactions}
            setArrears={setArrears}
          />
        )}
      </div>

      {/* MODAL DETAIL PENGHUNI (MANUAL OVERRIDE & LOG DENDA) */}
      <ResidentDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        user={selectedUserDetail}
        isAdmin={true}
        taskLogs={taskLogs}
        fines={fines}
        onAddTaskLog={handleAddTaskLog}
        onDeleteTaskLog={handleDeleteTaskLog}
        onAddFine={handleAddFine}
        onToggleFinePaid={handleToggleFinePaid}
        onDeleteFine={handleDeleteFine}
      />

      {/* MODAL TAMBAH / EDIT PENGHUNI */}
      {isUserFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                {userFormMode === 'add' ? 'Tambah Penghuni Baru' : 'Edit Data Penghuni'}
              </h3>
              <button
                onClick={() => setIsUserFormOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  required
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">
                  Nomor WhatsApp (Awali dengan 62)
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  required
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-900 dark:text-white font-mono focus:outline-none focus:border-violet-500"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block">
                  Nomor ini digunakan bot WhatsApp Aira untuk mengenali laporan piket.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">Peran (Role)</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as 'user' | 'admin')}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="user">Penghuni Biasa (User)</option>
                  <option value="admin">Pengelola / Admin</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserFormOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-2xl text-xs transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-2xl text-xs shadow-md shadow-violet-600/20 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{formSaving ? 'Menyimpan...' : 'Simpan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
