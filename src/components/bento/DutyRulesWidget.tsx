'use client';

import React from 'react';
import { Sparkles, Trash2, Brush, Waves, Bath } from 'lucide-react';

export const DutyRulesWidget: React.FC = () => {
  const rules = [
    { icon: Trash2, title: 'Buang Sampah', desc: 'Pagi hari sebelum jam 08:30 WIB' },
    { icon: Brush, title: 'Sapu & Pel', desc: 'Ruang santai, lorong & teras bersama' },
    { icon: Bath, title: 'Sikat WC', desc: 'Kuras bak & bersihkan kloset mess' },
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 p-5 shadow-xs transition-all duration-200 hover:border-violet-500/30">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/60 mb-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            SOP Tugas Kebersihan
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">Denda Rp 10.000 / tugas</span>
      </div>

      <div className="space-y-2">
        {rules.map((rule, idx) => {
          const Icon = rule.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/60"
            >
              <div className="p-1.5 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                  {rule.title}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate leading-normal">
                  {rule.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

