'use client';

import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  fallbackUsers,
  fallbackSchedules,
  fallbackTaskLogs,
  fallbackFines,
} from '@/lib/fallbackData';
import { User, Schedule, TaskLog, Fine, TaskType } from '@/types/database';
import { CalendarWidget } from '@/components/bento/CalendarWidget';
import { RecentActivityWidget } from '@/components/bento/RecentActivityWidget';
import { ResidentsRosterWidget } from '@/components/bento/ResidentsRosterWidget';
import { FinesAnalyticsWidget } from '@/components/bento/FinesAnalyticsWidget';
import { TomorrowDutyWidget } from '@/components/bento/TomorrowDutyWidget';
import { DutyRulesWidget } from '@/components/bento/DutyRulesWidget';
import { TaskDetailModal } from '@/components/TaskDetailModal';
import { ResidentDetailModal } from '@/components/ResidentDetailModal';

export default function PiketPage() {
  const [users, setUsers] = useState<User[]>(fallbackUsers);
  const [schedules, setSchedules] = useState<Schedule[]>(fallbackSchedules);
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>(fallbackTaskLogs);
  const [fines, setFines] = useState<Fine[]>(fallbackFines);

  // Real-time date states
  const [todayStr, setTodayStr] = useState('2026-11-18');
  const [selectedMonth, setSelectedMonth] = useState<number>(10); // November (0-indexed)
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  // Task Day Detail Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string>('');
  const [modalAssignedUser, setModalAssignedUser] = useState<{ name: string } | undefined>(undefined);
  const [modalLogs, setModalLogs] = useState<TaskLog[]>([]);
  const [modalTasks, setModalTasks] = useState<TaskType[]>(['sampah', 'sapu', 'pel', 'wc']);

  // Resident Profile Detail Modal (Read-only for public)
  const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    setTodayStr(now.toISOString().split('T')[0]);
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured) return;
      try {
        const [usersRes, schedulesRes, logsRes, finesRes] = await Promise.all([
          supabase.from('users').select('*').order('name'),
          supabase.from('schedules').select('*').order('date'),
          supabase.from('task_logs').select('*'),
          supabase.from('fines').select('*'),
        ]);

        if (usersRes.data && usersRes.data.length > 0) setUsers(usersRes.data);
        if (schedulesRes.data && schedulesRes.data.length > 0) setSchedules(schedulesRes.data);
        if (logsRes.data) setTaskLogs(logsRes.data);
        if (finesRes.data) setFines(finesRes.data);
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
      }
    }

    fetchData();
  }, []);

  const handleSelectDate = (date: string, schedule?: Schedule, logs?: TaskLog[]) => {
    setModalDate(date);
    const assigned = schedule ? users.find((u) => u.id === schedule.user_id) : undefined;
    setModalAssignedUser(assigned ? { name: assigned.name } : undefined);
    setModalLogs(logs || []);
    setModalTasks(schedule?.task_type || ['sampah', 'sapu', 'pel', 'wc']);
    setModalOpen(true);
  };

  return (
    <main className="min-h-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          Jadwal & Riwayat Piket
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Pantau kalender jadwal piket harian, aktivitas verifikasi tugas, dan rekap denda kebersihan.
        </p>
      </div>

      {/* Bento Grid Row 1: Real-Time Calendar + Fines Analytics Leaderboard & Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <CalendarWidget
          users={users}
          schedules={schedules}
          taskLogs={taskLogs}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          todayStr={todayStr}
          onMonthChange={(m, y) => {
            setSelectedMonth(m);
            setSelectedYear(y);
          }}
          onSelectDate={handleSelectDate}
        />

        <div className="space-y-6">
          <FinesAnalyticsWidget
            users={users}
            fines={fines}
            currentMonth={selectedMonth + 1}
            currentYear={selectedYear}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TomorrowDutyWidget
              users={users}
              schedules={schedules}
              todayStr={todayStr}
            />
            <DutyRulesWidget />
          </div>
        </div>
      </div>

      {/* Bento Grid Row 2: Live Activity Logs */}
      <div>
        <RecentActivityWidget
          users={users}
          taskLogs={taskLogs}
        />
      </div>

      {/* Bento Grid Row 3: Residents Roster Strip */}
      <ResidentsRosterWidget
        users={users}
        taskLogs={taskLogs}
        fines={fines}
        onSelectUser={(u) => {
          setSelectedUserDetail(u);
          setIsUserDetailOpen(true);
        }}
      />

      {/* Task Date Detail Modal */}
      <TaskDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        date={modalDate}
        assignedUser={modalAssignedUser}
        completedLogs={modalLogs}
        allTasks={modalTasks}
      />

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

