'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Arrear, User } from '@/types/database';

interface ArrearsTableWidgetProps {
  arrears: Arrear[];
  users: User[];
  onToggleStatus?: (arrearId: string, currentStatus: boolean) => void;
}

export const ArrearsTableWidget: React.FC<ArrearsTableWidgetProps> = ({
  arrears,
  users,
  onToggleStatus,
}) => {
  const userMap = new Map<string, string>();
  users.forEach((u) => userMap.set(u.id, u.name));

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ];

  // Sort unpaid first, then by year and month
  const sortedArrears = [...arrears].sort((a, b) => {
    if (a.is_paid === b.is_paid) {
      return b.month - a.month;
    }
    return a.is_paid ? 1 : -1;
  });

  const unpaidCount = arrears.filter((a) => !a.is_paid).length;

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                Tabel Tunggakan & Iuran
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                Wall of Shame
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Uang Kas (Rp 50k) + WiFi (Rp 15k) = Rp 65.000 / bln & Denda Piket
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {unpaidCount} Belum Lunas
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase">
              <th className="pb-3 px-2">Penghuni</th>
              <th className="pb-3 px-2">Jenis Tagihan</th>
              <th className="pb-3 px-2">Periode</th>
              <th className="pb-3 px-2">Nominal</th>
              <th className="pb-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
            {sortedArrears.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-zinc-400 text-xs">
                  Tidak ada data tunggakan. Semua bersih!
                </td>
              </tr>
            ) : (
              sortedArrears.map((item) => {
                const userName = userMap.get(item.user_id) || 'Penghuni';
                const formattedAmount = new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(item.amount_due);
                const period = `${monthNames[item.month - 1] || item.month} ${item.year}`;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition ${
                      !item.is_paid ? 'bg-amber-50/20 dark:bg-amber-950/10' : ''
                    }`}
                  >
                    <td className="py-3 px-2 font-medium text-zinc-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                            item.is_paid
                              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                          }`}
                        >
                          {userName.charAt(0)}
                        </div>
                        <span className="truncate max-w-[140px] sm:max-w-none">{userName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-zinc-600 dark:text-zinc-300 text-xs">
                      {item.type === 'kas_wifi' ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-violet-900 dark:text-violet-400">
                          Kas & WiFi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                          Denda Piket
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-2 text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                      {period}
                    </td>

                    <td className="py-3 px-2 font-bold text-zinc-900 dark:text-white font-mono text-xs">
                      {formattedAmount}
                    </td>

                    <td className="py-3 px-2 text-right">
                      {item.is_paid ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Lunas
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 animate-pulse">
                          <AlertCircle className="w-3 h-3" />
                          Belum Bayar
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

