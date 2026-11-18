'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  fallbackUsers,
  fallbackFinanceTransactions,
  fallbackArrears,
} from '@/lib/fallbackData';
import { User, FinanceTransaction, Arrear } from '@/types/database';
import { BalanceHeroWidget } from '@/components/finance/BalanceHeroWidget';
import { FinanceChartWidget } from '@/components/finance/FinanceChartWidget';
import { ArrearsTableWidget } from '@/components/finance/ArrearsTableWidget';
import { TransactionLogWidget } from '@/components/finance/TransactionLogWidget';
import { exportFinanceExcel } from '@/lib/excelExport';
import { Download, ShieldCheck, Sparkles } from 'lucide-react';

export default function KeuanganPage() {
  const [users, setUsers] = useState<User[]>(fallbackUsers);
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(
    fallbackFinanceTransactions
  );
  const [arrears, setArrears] = useState<Arrear[]>(fallbackArrears);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Fetch live finance data from Supabase
  const fetchData = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const [usersRes, txRes, arrRes] = await Promise.all([
        supabase.from('users').select('*').order('name'),
        supabase
          .from('finance_transactions')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase.from('arrears').select('*').order('year', { ascending: false }),
      ]);

      if (usersRes.data && usersRes.data.length > 0) setUsers(usersRes.data);
      if (txRes.data) setTransactions(txRes.data);
      if (arrRes.data) setArrears(arrRes.data);
    } catch (err) {
      console.error('Error fetching finance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute Balances
  const totalIncome = transactions
    .filter((t) => t.type === 'income' || t.type === 'fine_payment')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const currentBalance = totalIncome - totalExpense;

  const unpaidTotal = arrears
    .filter((a) => !a.is_paid)
    .reduce((acc, curr) => acc + Number(curr.amount_due), 0);

  // Handle Export Excel
  const handleExport = async () => {
    try {
      setExporting(true);
      await exportFinanceExcel(transactions, arrears, users, currentBalance);
    } catch (err) {
      console.error('Export Excel failed:', err);
      alert('Gagal mengekspor file Excel. Silakan coba kembali.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="min-h-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
            Modul Keuangan Mess
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Pencatatan kas operasional, tagihan iuran WiFi & kas bulanan, serta rekap denda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-medium text-xs shadow-md shadow-emerald-600/25 transition active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting ? 'Mengekspor...' : 'Export Excel'}</span>
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md shadow-violet-600/25 transition active:scale-95 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kelola di Admin</span>
          </Link>
        </div>
      </div>

      {/* Bento Grid Top Section: Saldo Hero (2 cols) & Rasio Chart (1 col) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceHeroWidget
            balance={currentBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            unpaidTotal={unpaidTotal}
          />
        </div>
        <div className="lg:col-span-1">
          <FinanceChartWidget
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
        </div>
      </section>

      {/* Bento Grid Bottom Section: Wall of Shame & Transaction Log */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ArrearsTableWidget arrears={arrears} users={users} />
        <TransactionLogWidget transactions={transactions} users={users} />
      </section>
    </main>
  );
}
