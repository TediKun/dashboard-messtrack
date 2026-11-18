'use client';

import React, { useState, useEffect } from 'react';
import { User, Fine } from '@/types/database';
import { ShieldAlert, AlertTriangle, TrendingUp, CheckCircle, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface FinesAnalyticsWidgetProps {
  users: User[];
  fines: Fine[];
  currentMonth: number;
  currentYear: number;
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export const FinesAnalyticsWidget: React.FC<FinesAnalyticsWidgetProps> = ({
  users,
  fines,
  currentMonth,
  currentYear,
}) => {
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [viewYear, setViewYear] = useState(currentYear);

  useEffect(() => {
    setViewMonth(currentMonth);
    setViewYear(currentYear);
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isCurrentMonthView = viewMonth === currentMonth && viewYear === currentYear;

  // Filter fines for the selected period
  const periodFines = fines.filter(
    (f) => f.month === viewMonth && f.year === viewYear
  );

  const totalUnpaid = periodFines
    .filter((f) => !f.is_paid)
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const totalPaid = periodFines
    .filter((f) => f.is_paid)
    .reduce((sum, f) => sum + Number(f.amount), 0);

  // Group fines by user
  const userBreakdown = users.map((u) => {
    const userUnpaid = periodFines
      .filter((f) => f.user_id === u.id && !f.is_paid)
      .reduce((sum, f) => sum + Number(f.amount), 0);
    return {
      user: u,
      unpaid: userUnpaid,
    };
  });

  // Sort by highest unpaid fine
  userBreakdown.sort((a, b) => b.unpaid - a.unpaid);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-6 flex flex-col gap-4 shadow-xs transition-all duration-200 hover:border-violet-500/30">
      {/* Background violet/amber aura */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 dark:bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Month Navigator */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Fines & Penalty Pool
            </span>
          </div>

          {/* Month switcher navigation */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
              title="Bulan Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold px-1.5 text-zinc-700 dark:text-zinc-200">
              {MONTH_NAMES[viewMonth - 1].slice(0, 3)} {viewYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
              title="Bulan Berikutnya"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium block">
              Total Denda ({MONTH_NAMES[viewMonth - 1]} {viewYear})
            </span>
            {!isCurrentMonthView && (
              <button
                type="button"
                onClick={() => {
                  setViewMonth(currentMonth);
                  setViewYear(currentYear);
                }}
                className="text-[10px] text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Bulan Ini
              </button>
            )}
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight font-mono">
              Rp {totalUnpaid.toLocaleString('id-ID')}
            </span>
            {totalUnpaid === 0 && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Nihil
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Progress Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pb-1 border-b border-zinc-100 dark:border-zinc-800/60">
          <span className="font-semibold uppercase tracking-wider text-[10px]">Perbandingan Penghuni</span>
          <span className="text-[10px]">Beban Denda</span>
        </div>

        <div className="space-y-2 pt-1">
          {userBreakdown.slice(0, 4).map(({ user, unpaid }) => {
            const percentage = totalUnpaid > 0 ? Math.round((unpaid / totalUnpaid) * 100) : 0;
            const hasFine = unpaid > 0;
            return (
              <div key={user.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      hasFine ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-400'
                    }`}
                  >
                    Rp {unpaid.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      hasFine
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                        : 'bg-emerald-500/30'
                    }`}
                    style={{ width: `${hasFine ? Math.max(percentage, 8) : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
