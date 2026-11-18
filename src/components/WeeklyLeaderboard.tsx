import React from 'react';
import { User, Schedule, TaskLog, TaskType } from '@/types/database';
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Calendar,
  Layers,
} from 'lucide-react';

interface WeeklyLeaderboardProps {
  users: User[];
  schedules: Schedule[];
  taskLogs: TaskLog[];
  selectedDate: string; // YYYY-MM-DD format within the week
}

export const WeeklyLeaderboard: React.FC<WeeklyLeaderboardProps> = ({
  users,
  schedules,
  taskLogs,
  selectedDate,
}) => {
  // Determine current active week (Sunday to Saturday) based on selected date
  const targetDate = new Date(selectedDate);
  const dayOfWeek = targetDate.getDay(); // 0 is Sunday
  const sunday = new Date(targetDate);
  sunday.setDate(targetDate.getDate() - dayOfWeek);

  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    weekDates.push(d.toISOString().split('T')[0]);
  }

  const startDateStr = weekDates[0];
  const endDateStr = weekDates[6];

  // Calculate completion per user for this week
  const userStats = users.map((u) => {
    const userLogs = taskLogs.filter(
      (l) => l.user_id === u.id && l.task_date >= startDateStr && l.task_date <= endDateStr
    );

    const sapuCount = userLogs.filter((l) => l.task_type === 'sapu').length;
    const pelCount = userLogs.filter((l) => l.task_type === 'pel').length;
    const wcCount = userLogs.filter((l) => l.task_type === 'wc').length;
    const sampahCount = userLogs.filter((l) => l.task_type === 'sampah').length;

    const totalTasks = userLogs.length;

    // Check scheduled days for this user in this week
    const scheduledDays = schedules.filter(
      (s) => s.user_id === u.id && s.date >= startDateStr && s.date <= endDateStr
    ).length;

    const score = sapuCount * 20 + pelCount * 30 + wcCount * 50 + sampahCount * 15;

    return {
      user: u,
      totalTasks,
      sapuCount,
      pelCount,
      wcCount,
      sampahCount,
      scheduledDays,
      score,
      isDutyPerson: scheduledDays > 0,
    };
  });

  // Sort by score
  userStats.sort((a, b) => b.score - a.score);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-lg">Papan Skor & Kepatuhan Mingguan</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Periode evaluasi: <span className="font-mono text-blue-400">{startDateStr}</span> s/d{' '}
            <span className="font-mono text-blue-400">{endDateStr}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-300">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Jenis Tugas: Sapu, Pel, WC, Sampah</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {userStats.map((stat, index) => {
          const isTop = index === 0 && stat.totalTasks > 0;
          return (
            <div
              key={stat.user.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition relative overflow-hidden ${
                stat.isDutyPerson
                  ? 'bg-blue-950/30 border-blue-500/40'
                  : 'bg-slate-950/60 border-slate-800/80'
              }`}
            >
              {isTop && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <Flame className="w-3 h-3 text-amber-400" /> Rank #1
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center border border-slate-700">
                    {index + 1}
                  </span>
                  <span className="font-bold text-sm text-white truncate" title={stat.user.name}>
                    {stat.user.name.split(' ')[0]}
                  </span>
                </div>

                {stat.isDutyPerson && (
                  <span className="inline-block text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 mb-2">
                    🎯 Petugas Minggu Ini
                  </span>
                )}

                <div className="space-y-1 text-xs text-slate-400 mt-2">
                  <div className="flex justify-between">
                    <span>Sapu:</span>
                    <span className="font-mono text-slate-200">{stat.sapuCount}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pel:</span>
                    <span className="font-mono text-slate-200">{stat.pelCount}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bersihkan WC:</span>
                    <span className="font-mono text-slate-200">{stat.wcCount}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Buang Sampah:</span>
                    <span className="font-mono text-slate-200">{stat.sampahCount}x</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Total Tugas</span>
                <span className="text-sm font-extrabold text-emerald-400">
                  {stat.totalTasks} Selesai
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

