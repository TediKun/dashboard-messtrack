'use client';

import React from 'react';
import { PieChart, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface FinanceChartWidgetProps {
  totalIncome: number;
  totalExpense: number;
}

export const FinanceChartWidget: React.FC<FinanceChartWidgetProps> = ({
  totalIncome,
  totalExpense,
}) => {
  const totalVolume = totalIncome + totalExpense;
  const incomePercent = totalVolume > 0 ? Math.round((totalIncome / totalVolume) * 100) : 50;
  const expensePercent = totalVolume > 0 ? Math.round((totalExpense / totalVolume) * 100) : 50;

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

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-900 dark:text-violet-400">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                Rasio Arus Kas
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Perbandingan Masuk vs Keluar
              </p>
            </div>
          </div>
        </div>

        {/* Visual Progress Ratio Bar */}
        <div className="space-y-2 my-4">
          <div className="h-4 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 flex overflow-hidden p-0.5 border border-zinc-200 dark:border-zinc-700/60">
            <div
              style={{ width: `${incomePercent}%` }}
              className="h-full rounded-full bg-emerald-500 transition-all duration-500 shadow-sm"
              title={`Pemasukan: ${incomePercent}%`}
            />
            <div
              style={{ width: `${expensePercent}%` }}
              className="h-full rounded-full bg-rose-500 transition-all duration-500 shadow-sm"
              title={`Pengeluaran: ${expensePercent}%`}
            />
          </div>
          <div className="flex justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 px-1">
            <span>Pemasukan {incomePercent}%</span>
            <span>Pengeluaran {expensePercent}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            Masuk
          </div>
          <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">
            {formattedIncome}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
          <div className="flex items-center gap-1.5 text-xs font-medium text-rose-700 dark:text-rose-400 mb-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Keluar
          </div>
          <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">
            {formattedExpense}
          </div>
        </div>
      </div>
    </div>
  );
};

