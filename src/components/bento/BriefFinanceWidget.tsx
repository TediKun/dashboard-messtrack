'use client';

import React from 'react';
import Link from 'next/link';
import { Wallet, AlertCircle, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Fine } from '@/types/database';

interface BriefFinanceWidgetProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  fines: Fine[];
  currentMonth: number;
  currentYear: number;
}

export const BriefFinanceWidget: React.FC<BriefFinanceWidgetProps> = ({
  balance,
  totalIncome,
  totalExpense,
  fines,
  currentMonth,
  currentYear,
}) => {
  const formatIDR = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  const monthFines = fines.filter(
    (f) => f.month === currentMonth && f.year === currentYear
  );
  const unpaidFines = monthFines.filter((f) => !f.is_paid);
  const totalUnpaidFinesAmount = unpaidFines.reduce(
    (sum, f) => sum + Number(f.amount),
    0
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-6 flex flex-col justify-between shadow-xs transition-all duration-200 hover:border-violet-500/30">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-600/10 text-violet-700 dark:text-violet-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-900 dark:text-white text-sm tracking-tight">
                Ringkasan Keuangan
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Saldo kas mess & denda berjalan
              </p>
            </div>
          </div>

          <Link
            href="/keuangan"
            className="inline-flex items-center gap-1 text-xs font-bold text-violet-800 dark:text-violet-400 hover:text-violet-950 dark:hover:text-violet-300 transition"
          >
            <span>Detail</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hero Balance Box */}
        <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Saldo Kas Aktif
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40">
              Kas Mess
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white font-mono">
            {formatIDR(balance)}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-700/50 text-xs">
            <div>
              <span className="text-zinc-400 text-[10px] block">Pemasukan</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs font-mono">{formatIDR(totalIncome)}</span>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] block">Pengeluaran</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 text-xs font-mono">{formatIDR(totalExpense)}</span>
            </div>
          </div>
        </div>

        {/* Month Fines Summary Card */}
        <div className="p-3 rounded-2xl bg-zinc-50/60 dark:bg-zinc-800/20 border border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`p-1.5 rounded-xl shrink-0 ${unpaidFines.length > 0 ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'}`}>
              {unpaidFines.length > 0 ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                Denda Bulan Ini
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {unpaidFines.length > 0 ? `${unpaidFines.length} belum lunas` : 'Semua lunas'}
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs font-black font-mono text-zinc-900 dark:text-white">
              {formatIDR(totalUnpaidFinesAmount)}
            </div>
            <span className="text-[9px] text-zinc-400 uppercase font-semibold">
              Belum Lunas
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs">
        <span className="text-[11px] text-zinc-400">
          Iuran: Rp 65.000 / bln
        </span>
        <Link
          href="/keuangan"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold transition active:scale-95"
        >
          <span>Modul Kas</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
