'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  fallbackUsers,
  fallbackSchedules,
  fallbackTaskLogs,
  fallbackFines,
  fallbackFinanceTransactions,
} from '@/lib/fallbackData';
import { User, Schedule, TaskLog, Fine, FinanceTransaction } from '@/types/database';
import { TodayDutyWidget } from '@/components/bento/TodayDutyWidget';
import { BriefFinanceWidget } from '@/components/bento/BriefFinanceWidget';
import { TomorrowDutyWidget } from '@/components/bento/TomorrowDutyWidget';
import { MiniRecentActivity } from '@/components/bento/MiniRecentActivity';
import { ResidentsRosterWidget } from '@/components/bento/ResidentsRosterWidget';
import { ResidentDetailModal } from '@/components/ResidentDetailModal';
import { Sparkles, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';

export default function HomePage() {
  const [users, setUsers] = useState<User[]>(fallbackUsers);
  const [schedules, setSchedules] = useState<Schedule[]>(fallbackSchedules);
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>(fallbackTaskLogs);
  const [fines, setFines] = useState<Fine[]>(fallbackFines);
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(
    fallbackFinanceTransactions
  );

  // Real-time date states
  const [todayStr, setTodayStr] = useState('2026-11-18');
  const [currentMonth, setCurrentMonth] = useState<number>(11);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  // Resident Profile Detail Modal
  const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    setTodayStr(now.toISOString().split('T')[0]);
    setCurrentMonth(now.getMonth() + 1);
    setCurrentYear(now.getFullYear());
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured) return;
      try {
        const [usersRes, schedulesRes, logsRes, finesRes, txRes] = await Promise.all([
          supabase.from('users').select('*').order('name'),
          supabase.from('schedules').select('*').order('date'),
          supabase.from('task_logs').select('*'),
          supabase.from('fines').select('*'),
          supabase.from('finance_transactions').select('*'),
        ]);

        if (usersRes.data && usersRes.data.length > 0) setUsers(usersRes.data);
        if (schedulesRes.data && schedulesRes.data.length > 0) setSchedules(schedulesRes.data);
        if (logsRes.data) setTaskLogs(logsRes.data);
        if (finesRes.data) setFines(finesRes.data);
        if (txRes.data) setTransactions(txRes.data);
      } catch (err) {
        console.error('Error fetching home data from Supabase:', err);
      }
    }

    fetchData();
  }, []);

  // Compute Balances for Brief Finance Widget
  const totalIncome = transactions
    .filter((t) => t.type === 'income' || t.type === 'fine_payment')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const currentBalance = totalIncome - totalExpense;

  return (
    <main className="min-h-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Overview Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
            Overview Hari Ini
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Ringkasan cepat tugas piket kebersihan mess dan status kas aktif.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/piket"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md shadow-violet-600/20 transition active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Lihat Semua Jadwal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Row 1: Brief Piket Widget (Left) + Brief Finance Widget (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <TodayDutyWidget
          users={users}
          schedules={schedules}
          taskLogs={taskLogs}
          todayStr={todayStr}
        />

        <BriefFinanceWidget
          balance={currentBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          fines={fines}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </div>

      {/* Row 2: Residents Roster Strip */}
      <div>
        <ResidentsRosterWidget
          users={users}
          taskLogs={taskLogs}
          fines={fines}
          onSelectUser={(u) => {
            setSelectedUserDetail(u);
            setIsUserDetailOpen(true);
          }}
        />
      </div>

      {/* Resident Profile Detail Modal (Read-only) */}
      <ResidentDetailModal
        isOpen={isUserDetailOpen}
        onClose={() => setIsUserDetailOpen(false)}
        user={selectedUserDetail}
        isAdmin={false}
        taskLogs={taskLogs}
        fines={fines}
      />
    </main>
  );
}
