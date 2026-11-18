/**
 * Safe Admin DB Client Helper
 * Tries direct Supabase anon first; if blocked by RLS or fails, automatically falls back to /api/admin-db (Service Role)
 */
import { supabase, isSupabaseConfigured } from './supabase';

interface AdminDbParams {
  action: 'insert' | 'upsert' | 'update' | 'delete' | 'select';
  table: string;
  payload?: any;
  match?: Record<string, any>;
  onConflict?: string;
}

export async function adminDbQuery<T = any>(params: AdminDbParams): Promise<{ data: T | null; error: Error | null }> {
  if (!isSupabaseConfigured) {
    return { data: null, error: null };
  }

  // 1. First attempt: Use direct Supabase anon client
  try {
    let res: { data: any; error: any } = { data: null, error: null };

    if (params.action === 'insert') {
      res = await supabase.from(params.table).insert(params.payload).select();
    } else if (params.action === 'upsert') {
      res = await supabase.from(params.table).upsert(params.payload, params.onConflict ? { onConflict: params.onConflict } : undefined).select();
    } else if (params.action === 'update' && params.match) {
      res = await supabase.from(params.table).update(params.payload).match(params.match).select();
    } else if (params.action === 'delete' && params.match) {
      res = await supabase.from(params.table).delete().match(params.match);
    } else if (params.action === 'select') {
      let q = supabase.from(params.table).select(params.payload?.columns || '*');
      if (params.match) q = q.match(params.match);
      res = await q;
    }

    if (!res.error) {
      return { data: res.data as T, error: null };
    }

    console.warn(`Direct client failed on ${params.table}.${params.action} (${res.error.message}), falling back to /api/admin-db`);
  } catch (err) {
    console.warn(`Direct client threw error on ${params.table}.${params.action}, falling back to /api/admin-db`, err);
  }

  // 2. Second attempt: Fallback to /api/admin-db (Service Role via server API)
  try {
    const res = await fetch('/api/admin-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const json = await res.json();
    if (!res.ok || json.error) {
      return { data: null, error: new Error(json.error || `HTTP ${res.status}`) };
    }

    return { data: json.data as T, error: null };
  } catch (apiErr: unknown) {
    const msg = apiErr instanceof Error ? apiErr.message : 'Gagal menghubungi server database admin';
    return { data: null, error: new Error(msg) };
  }
}
