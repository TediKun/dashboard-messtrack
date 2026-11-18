import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Backend Supabase client using Service Role (Bypasses RLS safely for verified admin calls)
const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  serviceRoleKey || 'placeholder'
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, table, payload, match } = body;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Supabase service role is not configured' }, { status: 500 });
    }

    if (!table) {
      return NextResponse.json({ error: 'Table is required' }, { status: 400 });
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
        if (!match) {
          return NextResponse.json({ error: 'Match condition is required for update' }, { status: 400 });
        }
        result = await supabaseAdmin.from(table).update(payload).match(match).select();
        break;
      }
      case 'delete': {
        if (!match) {
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

