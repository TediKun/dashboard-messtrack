'use client';

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { adminDbQuery } from '@/lib/adminDb';
import {
  FinanceTransaction,
  Arrear,
  User,
  FinanceTransactionType,
  ArrearType,
} from '@/types/database';
import {
  Wallet,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Receipt,
  DollarSign,
  Calendar,
  UserCheck,
} from 'lucide-react';

interface FinanceAdminTabProps {
  users: User[];
  transactions: FinanceTransaction[];
  arrears: Arrear[];
  onRefresh: () => Promise<void>;
  setTransactions: React.Dispatch<React.SetStateAction<FinanceTransaction[]>>;
  setArrears: React.Dispatch<React.SetStateAction<Arrear[]>>;
}

export const FinanceAdminTab: React.FC<FinanceAdminTabProps> = ({
  users,
  transactions,
  arrears,
  onRefresh,
  setTransactions,
  setArrears,
}) => {
  // Modal State for Add Transaction
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [txType, setTxType] = useState<FinanceTransactionType>('expense');
  const [txDesc, setTxDesc] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txUserId, setTxUserId] = useState('');
  const [txDate, setTxDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [savingTx, setSavingTx] = useState(false);

  // Modal State for Add / Edit Arrear (Tunggakan)
  const [isAddArrearOpen, setIsAddArrearOpen] = useState(false);
  const [arrearUserId, setArrearUserId] = useState(users[0]?.id || '');
  const [arrearType, setArrearType] = useState<ArrearType>('kas_wifi');
  const [arrearAmount, setArrearAmount] = useState('65000');
  const [arrearMonth, setArrearMonth] = useState(() => new Date().getMonth() + 1);
  const [arrearYear, setArrearYear] = useState(() => new Date().getFullYear());
  const [savingArrear, setSavingArrear] = useState(false);

  // Filter Arrear state
  const [filterArrearStatus, setFilterArrearStatus] = useState<'all' | 'unpaid' | 'paid'>('all');

  const userMap = new Map<string, string>();
  users.forEach((u) => userMap.set(u.id, u.name));

  // Compute stats
  const totalIncome = transactions
    .filter((t) => t.type === 'income' || t.type === 'fine_payment')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const currentBalance = totalIncome - totalExpense;
  const totalUnpaid = arrears
    .filter((a) => !a.is_paid)
    .reduce((acc, curr) => acc + Number(curr.amount_due), 0);

  // Format currency
  const formatIDR = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  // --- ACTIONS TRANSAKSI ---
  const handleSaveTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(txAmount);
    if (isNaN(amountNum) || amountNum <= 0 || !txDesc.trim()) {
      alert('Mohon isi deskripsi dan nominal angka yang valid!');
      return;
    }

    setSavingTx(true);
    const newTxPayload = {
      user_id: txUserId || null,
      type: txType,
      amount: amountNum,
      description: txDesc.trim(),
      created_at: new Date(txDate).toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data, error } = await adminDbQuery<FinanceTransaction[]>({
        action: 'insert',
        table: 'finance_transactions',
        payload: [newTxPayload],
      });

      if (error) {
        alert('Gagal menambah transaksi: ' + error.message);
        setSavingTx(false);
        return;
      }
      if (data && data.length > 0) {
        setTransactions((prev) => [data[0], ...prev]);
      } else {
        await onRefresh();
      }
    } else {
      setTransactions((prev) => [
        { id: `tx-${Date.now()}`, ...newTxPayload },
        ...prev,
      ]);
    }

    setSavingTx(false);
    setIsAddTxOpen(false);
    setTxDesc('');
    setTxAmount('');
    setTxUserId('');
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data transaksi ini secara permanen?')) {
      return;
    }

    if (isSupabaseConfigured) {
      const { error } = await adminDbQuery({
        action: 'delete',
        table: 'finance_transactions',
        match: { id },
      });
      if (error) {
        alert('Gagal menghapus transaksi: ' + error.message);
        return;
      }
    }

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // --- ACTIONS TUNGGAKAN (ARREARS) ---
  const handleToggleArrearPaid = async (arrear: Arrear) => {
    const nextStatus = !arrear.is_paid;
    if (isSupabaseConfigured) {
      const { error } = await adminDbQuery({
        action: 'update',
        table: 'arrears',
        payload: { is_paid: nextStatus },
        match: { id: arrear.id },
      });

      if (error) {
        alert('Gagal memperbarui status tagihan: ' + error.message);
        return;
      }

      // If marking as paid, optionally log to transactions if not already logged
      if (nextStatus) {
        const confirmLog = confirm(
          'Tandai Lunas berhasil! Apakah Anda ingin mencatat uang masuk ini ke Transaksi Kas secara otomatis?'
        );
        if (confirmLog) {
          const userName = userMap.get(arrear.user_id) || 'Penghuni';
          await adminDbQuery({
            action: 'insert',
            table: 'finance_transactions',
            payload: [{
              user_id: arrear.user_id,
              type: arrear.type === 'denda' ? 'fine_payment' : 'income',
              amount: arrear.amount_due,
              description: `Pelunasan ${arrear.type === 'kas_wifi' ? 'Kas & WiFi' : 'Denda'} (${userName})`,
              created_at: new Date().toISOString(),
            }],
          });
          await onRefresh();
        }
      }
    }

    setArrears((prev) =>
      prev.map((a) => (a.id === arrear.id ? { ...a, is_paid: nextStatus } : a))
    );
  };

  const handleDeleteArrear = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tagihan tunggakan ini?')) {
      return;
    }

    if (isSupabaseConfigured) {
      const { error } = await adminDbQuery({
        action: 'delete',
        table: 'arrears',
        match: { id },
      });
      if (error) {
        alert('Gagal menghapus tagihan: ' + error.message);
        return;
      }
    }

    setArrears((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveArrear = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(arrearAmount);
    if (!arrearUserId || isNaN(amountNum) || amountNum <= 0) {
      alert('Mohon pilih penghuni dan isi nominal yang benar!');
      return;
    }

    setSavingArrear(true);
    const newPayload = {
      user_id: arrearUserId,
      type: arrearType,
      amount_due: amountNum,
      month: Number(arrearMonth),
      year: Number(arrearYear),
      is_paid: false,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data, error } = await adminDbQuery<Arrear[]>({
        action: 'upsert',
        table: 'arrears',
        payload: [newPayload],
        onConflict: 'user_id,type,month,year',
      });

      if (error) {
        alert('Gagal membuat tagihan: ' + error.message);
        setSavingArrear(false);
        return;
      }
      if (data && data.length > 0) {
        const item = data[0];
        setArrears((prev) => {
          const exists = prev.some((a) => a.id === item.id);
          if (exists) {
            return prev.map((a) => (a.id === item.id ? item : a));
          }
          return [item, ...prev];
        });
      } else {
        await onRefresh();
      }
    } else {
      setArrears((prev) => [
        { id: `arr-${Date.now()}`, ...newPayload },
        ...prev,
      ]);
    }

    setSavingArrear(false);
    setIsAddArrearOpen(false);
  };

  // Generate monthly bill (Kas 50k + WiFi 15k = 65k) for all active residents
  const handleGenerateMonthlyBills = async () => {
    const curMonth = new Date().getMonth() + 1;
    const curYear = new Date().getFullYear();
    const confirmGen = confirm(
      `Apakah Anda ingin membuat otomatis tagihan Kas & WiFi (Rp 65.000) untuk seluruh ${users.length} penghuni pada periode Bulan ${curMonth}/${curYear}?`
    );
    if (!confirmGen) return;

    const newBills = users.map((u) => ({
      user_id: u.id,
      type: 'kas_wifi' as ArrearType,
      amount_due: 65000,
      month: curMonth,
      year: curYear,
      is_paid: false,
    }));

    if (isSupabaseConfigured) {
      const { error } = await adminDbQuery({
        action: 'upsert',
        table: 'arrears',
        payload: newBills,
        onConflict: 'user_id,type,month,year',
      });

      if (error) {
        alert('Gagal generate tagihan: ' + error.message);
        return;
      }
      await onRefresh();
    } else {
      setArrears((prev) => [
        ...newBills.map((b, i) => ({
          id: `arr-gen-${Date.now()}-${i}`,
          ...b,
          created_at: new Date().toISOString(),
        })),
        ...prev,
      ]);
    }
    alert(`Berhasil generate tagihan bulan ${curMonth}/${curYear} untuk seluruh penghuni!`);
  };

  // Filtered arrears list
  const filteredArrears = arrears.filter((a) => {
    if (filterArrearStatus === 'unpaid') return !a.is_paid;
    if (filterArrearStatus === 'paid') return a.is_paid;
    return true;
  });

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Saldo Kas Aktif
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {formatIDR(currentBalance)}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Sisa kas yang dapat digunakan</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Total Pemasukan
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {formatIDR(totalIncome)}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Akumulasi iuran & denda masuk</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Total Pengeluaran
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {formatIDR(totalExpense)}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Belanja galon, gas & operasional</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Tunggakan Belum Dibayar
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {formatIDR(totalUnpaid)}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Piutang kas & denda tertagih</p>
        </div>
      </div>

      {/* SECTION 1: MANAJEMEN TUNGGAKAN (ARREARS & MONTHLY BILLING) */}
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                Kelola Tunggakan & Iuran Penghuni
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300">
                Billing Rules
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Atur status lunas/belum lunas uang kas (Rp 50k) + WiFi (Rp 15k) dan denda piket, serta generate tagihan massal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setFilterArrearStatus('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filterArrearStatus === 'all'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500'
                }`}
              >
                Semua ({arrears.length})
              </button>
              <button
                onClick={() => setFilterArrearStatus('unpaid')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filterArrearStatus === 'unpaid'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-zinc-500'
                }`}
              >
                Belum Lunas ({arrears.filter((a) => !a.is_paid).length})
              </button>
              <button
                onClick={() => setFilterArrearStatus('paid')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filterArrearStatus === 'paid'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-zinc-500'
                }`}
              >
                Lunas ({arrears.filter((a) => a.is_paid).length})
              </button>
            </div>

            <button
              onClick={handleGenerateMonthlyBills}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-semibold text-xs shadow-xs transition"
              title="Generate otomatis tagihan kas & wifi 65k untuk seluruh 5 penghuni"
            >
              <Calendar className="w-3.5 h-3.5 text-violet-400" />
              <span>Generate Iuran Bulan Ini</span>
            </button>

            <button
              onClick={() => setIsAddArrearOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/20 transition cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tagihan Manual</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Nama Penghuni</th>
                <th className="py-3 px-4">Jenis Tagihan</th>
                <th className="py-3 px-4">Periode</th>
                <th className="py-3 px-4">Nominal</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi Kelola</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
              {filteredArrears.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-400">
                    Tidak ada data tunggakan untuk filter yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredArrears.map((a) => {
                  const userName = userMap.get(a.user_id) || 'Penghuni';
                  const period = `${monthNames[a.month - 1] || a.month} ${a.year}`;
                  return (
                    <tr
                      key={a.id}
                      className={`hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition ${
                        !a.is_paid ? 'bg-amber-50/15 dark:bg-amber-950/10' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                              a.is_paid
                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40'
                            }`}
                          >
                            {userName.charAt(0)}
                          </div>
                          <span>{userName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            a.type === 'kas_wifi'
                              ? 'text-violet-600 dark:text-violet-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {a.type === 'kas_wifi' ? 'Kas Mess + WiFi' : 'Denda Piket'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-500 dark:text-zinc-400">
                        {period}
                      </td>
                      <td className="py-3 px-4 font-bold font-mono text-zinc-900 dark:text-white">
                        {formatIDR(a.amount_due)}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleArrearPaid(a)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition active:scale-95 cursor-pointer ${
                            a.is_paid
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-200'
                          }`}
                          title="Klik untuk mengubah status pembayaran"
                        >
                          {a.is_paid ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Lunas</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Belum Bayar (Ubah)</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteArrear(a.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                          title="Hapus Tagihan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: TRANSAKSI KAS MESS (TAMBAH, EDIT, HAPUS TRANSAKSI) */}
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
              Riwayat & Pencatatan Transaksi Kas
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Input pengeluaran operasional (galon, gas, alat kebersihan), uang masuk, atau hapus transaksi salah.
            </p>
          </div>

          <button
            onClick={() => setIsAddTxOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Transaksi Baru</span>
          </button>
        </div>

        <div className="overflow-x-auto border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Jenis</th>
                <th className="py-3 px-4">Deskripsi / Keterangan</th>
                <th className="py-3 px-4">Terkait Penghuni</th>
                <th className="py-3 px-4">Nominal</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-400">
                    Belum ada catatan transaksi keuangan.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const isIncome = tx.type === 'income' || tx.type === 'fine_payment';
                  const userName = tx.user_id ? userMap.get(tx.user_id) : 'Kas Mess / Umum';
                  const dateFormatted = new Date(tx.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition"
                    >
                      <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 font-mono">
                        {dateFormatted}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isIncome
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400'
                          }`}
                        >
                          {tx.type === 'fine_payment'
                            ? 'Denda'
                            : tx.type === 'income'
                            ? 'Pemasukan'
                            : 'Pengeluaran'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-zinc-900 dark:text-white">
                        {tx.description}
                      </td>
                      <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300 font-medium">
                        {userName}
                      </td>
                      <td
                        className={`py-3 px-4 font-bold font-mono ${
                          isIncome
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isIncome ? `+${formatIDR(tx.amount)}` : `-${formatIDR(tx.amount)}`}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteTransaction(tx.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                          title="Hapus Transaksi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: TAMBAH TRANSAKSI BARU */}
      {isAddTxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                Catat Transaksi Kas Baru
              </h3>
              <button
                onClick={() => setIsAddTxOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Jenis Transaksi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTxType('expense')}
                    className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                      txType === 'expense'
                        ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'
                    }`}
                  >
                    - Pengeluaran Mess
                  </button>
                  <button
                    type="button"
                    onClick={() => setTxType('income')}
                    className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                      txType === 'income'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'
                    }`}
                  >
                    + Pemasukan Kas
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Keterangan / Keperluan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Beli Galon Aqua / Refill Gas / Kas Tambahan"
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Nominal (Rp)
                </label>
                <input
                  type="number"
                  placeholder="20000"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Tanggal Transaksi
                </label>
                <input
                  type="date"
                  value={txDate}
                  onChange={(e) => setTxDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Penghuni Terkait (Opsional)
                </label>
                <select
                  value={txUserId}
                  onChange={(e) => setTxUserId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">-- Kas Mess Umum --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingTx}
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition cursor-pointer"
                >
                  {savingTx ? 'Menyimpan...' : 'Simpan Transaksi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH TAGIHAN MANUAL */}
      {isAddArrearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                Tambah Tagihan / Tunggakan
              </h3>
              <button
                onClick={() => setIsAddArrearOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArrear} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Penghuni
                </label>
                <select
                  value={arrearUserId}
                  onChange={(e) => setArrearUserId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.phone_number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Jenis Tagihan
                </label>
                <select
                  value={arrearType}
                  onChange={(e) => {
                    const t = e.target.value as ArrearType;
                    setArrearType(t);
                    if (t === 'kas_wifi') setArrearAmount('65000');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="kas_wifi">Kas Mess + WiFi (Rp 65.000)</option>
                  <option value="denda">Denda Piket / Khusus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Nominal Tagihan (Rp)
                </label>
                <input
                  type="number"
                  value={arrearAmount}
                  onChange={(e) => setArrearAmount(e.target.value)}
                  placeholder="65000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Bulan
                  </label>
                  <select
                    value={arrearMonth}
                    onChange={(e) => setArrearMonth(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    {monthNames.map((m, idx) => (
                      <option key={idx} value={idx + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Tahun
                  </label>
                  <input
                    type="number"
                    value={arrearYear}
                    onChange={(e) => setArrearYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddArrearOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingArrear}
                  className="w-1/2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-violet-600/25 transition cursor-pointer"
                >
                  {savingArrear ? 'Menyimpan...' : 'Simpan Tagihan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

