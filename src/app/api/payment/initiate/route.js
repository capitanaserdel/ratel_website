import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      reference,
      ratelnumber,
      source, // "Airtime" or "Personal Subscriber"
      gateway, // "opay" or "paystack"
      email,
      fname,
      lname,
      amount, // Amount in Naira
      redirect_origin
    } = body;

    if (!reference || !ratelnumber || !gateway) {
      return NextResponse.json({ status: 'error', message: 'Missing required parameters.' }, { status: 400 });
    }

    const device_ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';
    const device_os = userAgent.includes('Mobi') ? 'Mobile' : 'Web';

    const db = getDb();

    // 1. Log transaction in the database
    const [check] = await db.query('SELECT reference FROM opay_payment WHERE reference = ?', [reference]);
    if (check.length === 0) {
      await db.query(`
        INSERT INTO opay_payment (reference, ratelnumber, opay_status, progress, devices_os, device_ip, channels)
        VALUES (?, ?, 'INITIAL', 25, ?, ?, ?)
      `, [reference, ratelnumber, device_os, device_ip, gateway === 'opay' ? 'Opay' : 'Paystack']);
    }

    // 2. If OPay, create Cashier URL server-to-server
    if (gateway === 'opay') {
      const amountInKobo = Math.round(parseFloat(amount) * 100);
      const hostOrigin = redirect_origin || 'https://ratelplus.net';

      // Setup OPay return URLs
      const returnUrl = `${hostOrigin}/api/payment/verify?reference=${reference}&gateway=opay&source=${encodeURIComponent(source)}&redirect_origin=${encodeURIComponent(hostOrigin)}`;
      const callbackUrl = `https://ratelplus.net/api/payment/verify?gateway=opay&source=${encodeURIComponent(source)}`;
      const cancelUrl = `${hostOrigin}/${source === 'Airtime' ? 'airtime' : 'personal-subscribers'}?status=cancel`;

      const opayData = {
        country: 'NG',
        reference: reference,
        amount: { total: amountInKobo, currency: 'NGN' },
        returnUrl: returnUrl,
        callbackUrl: callbackUrl,
        cancelUrl: cancelUrl,
        displayName: 'RatelPlus',
        expireAt: '300',
        userInfo: {
          userEmail: email || 'customer@ratelplus.net',
          userId: reference,
          userMobile: ratelnumber,
          userName: `${fname || 'Customer'} ${lname || ''}`.trim()
        },
        product: {
          description: source === 'Airtime' ? 'Buying of Airtime using Opay endpoint' : 'Subscribing for VoIP line using Opay endpoint',
          name: source === 'Airtime' ? 'Airtime purchase' : 'Subscription purchase'
        }
      };

      const opayResponse = await axios.post(
        'https://liveapi.opaycheckout.com/api/v1/international/cashier/create',
        opayData,
        {
          headers: {
            'Authorization': process.env.OPAY_PUBLIC_KEY || 'Bearer OPAYPUB17722214161430.48667319872775505',
            'Content-Type': 'application/json',
            'MerchantId': process.env.OPAY_MERCHANT_ID || '256624031449374'
          }
        }
      );

      const resData = opayResponse.data;
      if (resData.message === 'SUCCESSFUL' && resData.data?.cashierUrl) {
        return NextResponse.json({
          status: 'success',
          cashierUrl: resData.data.cashierUrl
        });
      } else {
        return NextResponse.json({
          status: 'error',
          message: 'OPay cashier creation failed: ' + (resData.message || 'Unknown error')
        }, { status: 500 });
      }
    }

    // 3. If Paystack, just return success so frontend can load inline
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Payment initiation error:', error.response?.data || error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to initiate payment: ' + (error.response?.data?.message || error.message)
    }, { status: 500 });
  }
}
