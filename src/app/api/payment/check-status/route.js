import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference') || '';

    if (!reference) {
      return NextResponse.json({ credited: false, error: 'Missing reference.' }, { status: 400 });
    }

    const db = getDb();
    const [rows] = await db.query(
      'SELECT status, flags FROM opay_payment WHERE reference = ? ORDER BY id DESC LIMIT 1',
      [reference]
    );

    if (rows.length > 0 && rows[0].status === 1 && rows[0].flags === 1) {
      return NextResponse.json({ credited: true });
    }
    
    return NextResponse.json({ credited: false });
  } catch (error) {
    console.error('Check status error:', error);
    return NextResponse.json({ credited: false, error: error.message }, { status: 500 });
  }
}
