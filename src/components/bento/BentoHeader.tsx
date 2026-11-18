'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const BentoHeader: React.FC = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-violet-500/25">
          M
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Mess<span className="text-violet-600 dark:text-violet-400">Track</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Dormitory Duty Automation & Transparency Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-end sm:self-auto">
        <ThemeToggle />

        <Link
          href="/keuangan"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md shadow-emerald-600/25 transition active:scale-95 cursor-pointer"
        >
          <span>Kas Mess</span>
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md shadow-violet-600/25 transition active:scale-95 cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </Link>
      </div>
    </header>
  );
};


