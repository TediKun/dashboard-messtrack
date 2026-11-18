'use client';

import React from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, TrendingUp } from 'lucide-react';

interface BalanceHeroWidgetProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  unpaidTotal: number;
}

export const BalanceHeroWidget: React.FC<BalanceHeroWidgetProps> = ({
  balance,
  totalIncome,
  totalExpense,
  unpaidTotal,
}) => {
  const formattedBalance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(balance);

  const formattedIncome = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(totalIncome);

  const formattedExpense = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(totalExpense);

  const formattedUnpaid = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(unpaidTotal);

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#f8fafc] dark:bg-zinc-950/60 p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex flex-col justify-between transition-colors">
      {/* Top section */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Saldo Kas Mess Aktif
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            {formattedBalance}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Total akumulasi kas mess, iuran bulanan WiFi & penerimaan denda
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <Wallet className="w-6 h-6 text-zinc-950 dark:text-white" />
        </div>
      </div>

      {/* Stat chips / metric breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <ArrowDownRight className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-zinc-400">Total Pemasukan</div>
            <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{formattedIncome}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-zinc-400">Total Pengeluaran</div>
            <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400">{formattedExpense}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="p-2 rounded-xl bg-violet-900/10 dark:bg-violet-900/30 text-violet-900 dark:text-violet-300">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-zinc-400">Tunggakan Tertagih</div>
            <div className="text-sm font-extrabold text-violet-900 dark:text-violet-300">{formattedUnpaid}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
