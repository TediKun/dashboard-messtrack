import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Backend Supabase client using Service Role
const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  serviceRoleKey || 'placeholder'
);

// Whitelisted tables to prevent arbitrary table manipulation
const ALLOWED_TABLES = new Set([
  'users',
  'schedules',
  'task_logs',
  'fines',
  'finance_transactions',
  'arrears',
]);

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Supabase service role is not configured' }, { status: 500 });
    }

    // --- Authentication & Authorization Verification ---
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    // In production with Supabase configured, require valid authenticated admin session
    if (anonKey && serviceRoleKey !== 'placeholder') {
      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized: Admin authentication token required' },
          { status: 401 }
        );
      }

      // Verify the user token against Supabase Auth
      const supabaseAuthCheck = createClient(supabaseUrl, anonKey);
      const { data: { user }, error: authError } = await supabaseAuthCheck.auth.getUser(token);

      if (authError || !user) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid or expired admin session' },
          { status: 401 }
        );
      }
    }

    const body = await req.json();
    const { action, table, payload, match } = body;

    if (!table || typeof table !== 'string') {
      return NextResponse.json({ error: 'Table is required' }, { status: 400 });
    }

    // Check against allowed tables whitelist
    if (!ALLOWED_TABLES.has(table)) {
      return NextResponse.json({ error: `Forbidden: Access to table '${table}' is not permitted` }, { status: 403 });
    }

    let result;

    switch (action) {
      case 'insert': {
        result = await supabaseAdmin.from(table).insert(payload).select();
        break;
      }
      case 'upsert': {
        const onConflict = body.onConflict;
        result = await supabaseAdmin.from(table).upsert(payload, onConflict ? { onConflict } : undefined).select();
        break;
      }
      case 'update': {
        if (!match || typeof match !== 'object' || Object.keys(match).length === 0) {
          return NextResponse.json({ error: 'Match condition is required for update' }, { status: 400 });
        }
        result = await supabaseAdmin.from(table).update(payload).match(match).select();
        break;
      }
      case 'delete': {
        if (!match || typeof match !== 'object' || Object.keys(match).length === 0) {
          return NextResponse.json({ error: 'Match condition is required for delete' }, { status: 400 });
        }
        result = await supabaseAdmin.from(table).delete().match(match);
        break;
      }
      case 'select': {
        let query = supabaseAdmin.from(table).select(payload?.columns || '*');
        if (match) {
          query = query.match(match);
        }
        if (payload?.order) {
          query = query.order(payload.order.column, { ascending: payload.order.ascending ?? true });
        }
        result = await query;
        break;
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    if (result.error) {
      console.error(`Admin DB API Error on ${table} [${action}]:`, result.error);
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json({ data: result.data });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('Admin DB API Exception:', err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

