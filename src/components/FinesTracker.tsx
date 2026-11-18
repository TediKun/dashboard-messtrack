import React from 'react';
import { User, Fine } from '@/types/database';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface FinesTrackerProps {
  users: User[];
  fines: Fine[];
  currentMonth: number;
  currentYear: number;
}

export const FinesTracker: React.FC<FinesTrackerProps> = ({
  users,
  fines,
  currentMonth,
  currentYear,
}) => {
  // Aggregate fines per user for current selected month/year
  const userFinesMap = users.map((u) => {
    const userFines = fines.filter(
      (f) => f.user_id === u.id && f.month === currentMonth && f.year === currentYear
    );
    const totalUnpaid = userFines
      .filter((f) => !f.is_paid)
      .reduce((sum, f) => sum + Number(f.amount), 0);
    const totalPaid = userFines
      .filter((f) => f.is_paid)
      .reduce((sum, f) => sum + Number(f.amount), 0);

    return {
      user: u,
      unpaid: totalUnpaid,
      paid: totalPaid,
      count: userFines.length,
      finesList: userFines,
    };
  });

  const totalPoolUnpaid = userFinesMap.reduce((acc, curr) => acc + curr.unpaid, 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-lg">Pelacak Denda Bulanan</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Akumulasi denda pelanggaran piket per penghuni (Periode: {currentMonth}/{currentYear})
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200/70 rounded-xl px-4 py-2 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
            Total Denda Terkumpul
          </span>
          <span className="text-lg font-extrabold text-amber-900">
            Rp {totalPoolUnpaid.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {userFinesMap.map(({ user, unpaid, finesList }) => {
          const hasFines = unpaid > 0;
          return (
            <div
              key={user.id}
              className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                hasFines
                  ? 'bg-rose-50/50 border-rose-200/80'
                  : 'bg-emerald-50/40 border-emerald-200/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-800 truncate" title={user.name}>
                    {user.name.split(' ')[0]}
                  </span>
                  {hasFines ? (
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>
                <div className="text-xs text-slate-500 space-y-0.5">
                  <p className="font-mono text-[11px] text-slate-400">{user.phone_number}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/40">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Total Denda
                </span>
                <span
                  className={`text-base font-extrabold ${
                    hasFines ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  Rp {unpaid.toLocaleString('id-ID')}
                </span>
                {finesList.length > 0 && (
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1" title={finesList.map(f => f.reason).join(', ')}>
                    {finesList[0].reason}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

