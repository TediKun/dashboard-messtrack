export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  phone_number: string;
  role: UserRole;
  created_at?: string;
}

export type TaskType = 'sapu' | 'pel' | 'sampah' | 'wc' | 'galon';

export interface Schedule {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  task_type: TaskType[];
  status: 'pending' | 'completed';
  created_at?: string;
  user?: User;
}

export interface TaskLog {
  id: string;
  user_id: string;
  task_date: string; // YYYY-MM-DD
  task_type: TaskType;
  proof_url?: string | null;
  verified_at: string;
  created_at?: string;
  user?: User;
}

export interface Fine {
  id: string;
  user_id: string;
  month: number;
  year: number;
  amount: number;
  reason: string;
  is_paid: boolean;
  created_at?: string;
  user?: User;
}

export type FinanceTransactionType = 'income' | 'expense' | 'fine_payment';

export interface FinanceTransaction {
  id: string;
  user_id?: string | null;
  type: FinanceTransactionType;
  amount: number;
  description: string;
  created_at: string;
  user?: User;
}

export type ArrearType = 'kas_wifi' | 'denda';

export interface Arrear {
  id: string;
  user_id: string;
  type: ArrearType;
  amount_due: number;
  month: number;
  year: number;
  is_paid: boolean;
  created_at?: string;
  user?: User;
}

