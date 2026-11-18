'use client';

import React from 'react';
import { History, ArrowDownLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { FinanceTransaction, User } from '@/types/database';

interface TransactionLogWidgetProps {
  transactions: FinanceTransaction[];
  users: User[];
}

export const TransactionLogWidget: React.FC<TransactionLogWidgetProps> = ({
  transactions,
  users,
}) => {
  const userMap = new Map<string, string>();
  users.forEach((u) => userMap.set(u.id, u.name));

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-900 dark:text-violet-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
              Riwayat Transaksi Real-time
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Log pemasukan kas, pembayaran denda, dan pengeluaran mess
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-zinc-400">
          {sorted.length} Transaksi
        </span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[380px] pr-1 space-y-2.5">
        {sorted.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-400">
            Belum ada riwayat transaksi tercatat.
          </div>
        ) : (
          sorted.map((tx) => {
            const isIncome = tx.type === 'income' || tx.type === 'fine_payment';
            const formattedAmount = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(tx.amount);

            const txDate = new Date(tx.created_at);
            const dateStr = txDate.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
            const timeStr = txDate.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            });

            const userName = tx.user_id ? userMap.get(tx.user_id) : 'Kas Mess';

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl flex items-center justify-center ${
                      isIncome
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-white">
                      {tx.description}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      <span className="font-medium text-violet-900 dark:text-violet-400">
                        {userName}
                      </span>
                      <span>•</span>
                      <span>{dateStr} {timeStr}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs sm:text-sm font-bold font-mono ${
                      isIncome
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {isIncome ? `+${formattedAmount}` : `-${formattedAmount}`}
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                    {tx.type === 'fine_payment'
                      ? 'Denda'
                      : tx.type === 'income'
                      ? 'Kas Masuk'
                      : 'Pengeluaran'}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

