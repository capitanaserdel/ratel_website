import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Read parameters
    const reference = formData.get('reference') || '';
    const pics1 = formData.get('pics1') || '';
    const pics2 = formData.get('pics2') || '';
    const pics3 = formData.get('pics3') || null;
    const mobile = formData.get('mobile') || '';
    const fname = formData.get('fname') || '';
    const sname = formData.get('sname') || '';
    const email = formData.get('email') || '';
    const loc = formData.get('loc') || 'Abuja (09)';
    const addr = formData.get('addr') || '';
    const source = formData.get('source') || '';
    const price = formData.get('price') || '0';
    const amount = formData.get('amount') || '0';
    const rc = formData.get('rc') || null;
    const dateof = formData.get('dateof') || null;
    const compserv = formData.get('compserv') || null;
    const noL = formData.get('noL') || null;
    const gender = formData.get('gender') || null;
    const nin = formData.get('nin') || null;

    if (!pics1 || !mobile) {
      return new Response('Failed to save registration: Missing mobile or ID card image.', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    const db = getDb();
    
    // Insert query into `registration` table
    const sql = `
      INSERT INTO \`registration\` (
        mobile, calling_card, fname, sname, reference, gender, email, loc, nin, addr, 
        pics1, pics2, pics3, amount, source, rc_number, date_of_inc, company_services, no_of_lline
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await db.query(sql, [
      mobile, price, fname, sname, reference, gender, email, loc, nin, addr,
      pics1, pics2, pics3, amount, source, rc, dateof, compserv, noL
    ]);

    // Return plain text 'Success' to match what frontend expects
    return new Response('Success', {
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    console.error('Registration API error:', error);
    return new Response('Failed to save registration: ' + error.message, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
