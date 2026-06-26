import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs/promises';

// Helper: sign OPay cashier status requests
function signOpayRequest(payload, secretKey) {
  const data2 = JSON.stringify(payload);
  return crypto.createHmac('sha512', secretKey).update(data2).digest('hex');
}

// OPay Cashier status API verify
async function verifyOpayPayment(reference, source) {
  const secretKey = source === 'Airtime'
    ? process.env.OPAY_SECRET_KEY_AIRTIME
    : process.env.OPAY_SECRET_KEY_REGISTRATION;
  
  const payload = { country: 'NG', reference: reference };
  const authSignature = signOpayRequest(payload, secretKey);

  const response = await axios.post(
    'https://liveapi.opaycheckout.com/api/v1/international/cashier/status',
    payload,
    {
      headers: {
        'Authorization': `Bearer ${authSignature}`,
        'Content-Type': 'application/json',
        'MerchantId': process.env.OPAY_MERCHANT_ID
      }
    }
  );

  const data = response.data;
  if (data?.data?.status === 'SUCCESS') {
    return {
      success: true,
      amount: data.data.amount.total / 100, // convert kobo to Naira
      phone: data.data.payInstrumentAccount || '0',
      method: data.data.instrumentType || 'Opay',
      status: 'SUCCESS'
    };
  }
  return { success: false, status: data?.data?.status || 'FAILED' };
}

// Paystack Verification API
async function verifyPaystackPayment(reference) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        'Authorization': `Bearer ${secretKey}`
      }
    }
  );

  const data = response.data;
  if (data?.data?.status === 'success') {
    const customFields = data.data.metadata?.custom_fields;
    const phone = customFields?.[0]?.value || data.data.customer?.phone || '0';
    return {
      success: true,
      amount: data.data.amount / 100, // convert kobo to Naira
      phone: phone,
      method: data.data.channel || 'Paystack',
      status: 'success'
    };
  }
  return { success: false, status: data?.data?.status || 'failed' };
}

// Credit VoIP Line balance via softswitch customer API
async function creditVoIpLine(cusId, amount) {
  try {
    const url = `https://portal.ratelplus.net/api/customer_api?token=bTCRAod9cl&action_type=7&id=${cusId}&money=${amount}`;
    const response = await axios.post(url);
    return response.data?.status || 'failed';
  } catch (error) {
    console.error('VoIP switch balance credit failed:', error.message);
    return 'network_error';
  }
}

// Send subscriber registration email details
async function sendRegistrationEmail(regDetails, source, amount, method) {
  try {
    const {
      pics1, pics2, pics3, email, fname, sname, gender, addr, loc, nin, timestamp, rc_number, company_services, no_of_lline
    } = regDetails;

    const transporter = nodemailer.createTransport({
      host: 'ratelplus.net',
      port: 587,
      secure: false, // TLS
      auth: {
        user: 'smtp@ratelplus.net',
        pass: 'smtp@ratel'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mylogo = '<img src="https://ratelplus.net/assets/img/rATEL-LOGO.png" />';
    const defaultPath = `${mylogo}<br>The following is a message from: <a href="https://ratelplus.net">RatelPlus</a>`;
    const subject = `${source} {${method}} ${regDetails.reference}`;

    let messageHtml = '';
    if (source === 'Personal Subscriber') {
      messageHtml = `
        <b>Customer Name:</b> ${fname} ${sname}<hr>
        <b>Gender:</b> ${gender}<hr>
        <b>Email Address:</b> ${email}<hr>
        <b>Mobile Number:</b> ${regDetails.mobile}<hr>
        <b>Residential Address:</b> ${addr}<hr>
        <b>Ratel Number Location:</b> ${loc}<hr>
        <b>NIN Number:</b> ${nin}<hr>
        <b>Valid Identification:</b> ${pics1}<hr>
        <b>Passport Photo:</b> ${pics2}<hr>
        <b>Request:</b> ${source}<hr>
        <b>Amount Paid:</b> &#8358;${amount}<hr>
        <b>Payment Source:</b> ${method}<hr>
        <b>TimeStamp:</b> ${timestamp}<hr>
      `;
    } else {
      messageHtml = `
        <b>REGISTERED COMPANY NAME:</b> ${fname}<hr>
        <b>RC-NUMBER:</b> ${rc_number}<hr>
        <b>DATE OF INCORPORATION/-REGISTRATION:</b> ${regDetails.date_of_inc}<hr>
        <b>BUSINESS ADDRESS:</b> ${addr}<hr>
        <b>CONTACT PHONE NUMBER:</b> ${regDetails.mobile}<hr>
        <b>COMPANY SERVICES:</b> ${company_services}<hr>
        <b>DIRECTOR'S NAME:</b> ${sname}<hr>
        <b>EMAIL:</b> ${email}<hr>
        <b>UPLOADED CAC CERTIFICATE:</b> ${pics1}<hr>
        <b>VALID ID:</b> ${pics2}<hr>
        <b>UPLOADED PROOF OF ADDRESS:</b> ${pics3}<hr>
        <b>NUMBER OF LINES REQUIRED:</b> ${no_of_lline}<hr>
        <b>RATEL NUMBER LOCATION:</b> ${loc}<hr>
        <b>AMOUNT PAID:</b> &#8358;${amount}<hr>
        <b>Payment Source:</b> ${method}<hr>
        <b>TIMESTAMP:</b> ${timestamp}<hr>
      `;
    }

    const fullMessage = `
      <html>
        <body style="height: 70%;">
          <div style="min-height: 20px; padding: 8px; margin-bottom: 20px; background-color: #f5f5f5; border: 1px solid #e3e3e3; border-radius: 4px; width: 100%;">
            <center>${defaultPath}</center>
          </div>
          <div>
            <table style="width: 100%;">
              <tr>
                <td style="border:3px solid #FF704D; text-align:left; font-family:Helvetica,Arial,sans-serif; font-size:14px; padding:10px;">
                  ${messageHtml}
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;

    const attachments = [];
    const uploadPath = path.join(process.cwd(), 'public', 'uploads');

    const addAttachment = async (filename) => {
      if (filename) {
        const filePath = path.join(uploadPath, filename);
        try {
          await fs.access(filePath);
          attachments.push({ filename: filename, path: filePath });
        } catch {
          console.warn(`Attachment file not found: ${filePath}`);
        }
      }
    };

    await addAttachment(pics1);
    await addAttachment(pics2);
    await addAttachment(pics3);

    await transporter.sendMail({
      from: email,
      to: 'customercare@ratelplus.net',
      subject: subject,
      html: fullMessage,
      attachments: attachments
    });

    console.log('Registration email notification sent.');
  } catch (error) {
    console.error('Failed to send registration email notification:', error.message);
  }
}

// Unified payment processors business logic
async function processVerifiedPayment(reference, details) {
  const db = getDb();
  
  // 1. Fetch current transaction record from opay_payment
  const [payments] = await db.query(
    'SELECT * FROM opay_payment WHERE reference = ? ORDER BY id DESC LIMIT 1',
    [reference]
  );
  
  if (payments.length === 0) {
    return { success: false, message: 'Transaction record not found in database.' };
  }

  const payment = payments[0];
  const { status: currentStatus, ratelnumber, flags } = payment;

  // Prevent double-crediting
  if (flags === 1 || currentStatus === 1) {
    return { success: true, message: 'Transaction already completed.' };
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false }); // "hh:mm:ss"
  
  // Check transaction type (Airtime vs Registration) by checking if reference belongs to a registration
  const [registrations] = await db.query(
    'SELECT * FROM registration WHERE reference = ? ORDER BY id DESC LIMIT 1',
    [reference]
  );

  const isRegistration = registrations.length > 0;

  if (isRegistration) {
    // Registration verification
    const reg = registrations[0];
    const { mobile, amount: regAmount, source: regSource } = reg;

    // Check if reg_payment already logged
    const [checkReg] = await db.query(
      'SELECT reference FROM reg_payment WHERE reference = ?',
      [reference]
    );

    if (checkReg.length === 0) {
      await db.query(`
        INSERT INTO reg_payment (reference, phone, channels, amount, source, status, time_cron)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [reference, mobile, details.method, details.amount, regSource, details.status, timeStr]);
    }

    // Mark registration as paid
    await db.query(
      'UPDATE registration SET isPaid = 1, gateway_amount = ? WHERE reference = ?',
      [details.amount, reference]
    );

    // Update opay_payment row
    await db.query(`
      UPDATE opay_payment 
      SET status = 1, cus_number = ?, channels = ?, progress = 100, door = 'close', 
          amount_r = ?, opay_status = ?, time_cron = ?, method = ?
      WHERE reference = ?
    `, [mobile, details.method, details.amount, details.status, timeStr, details.method, reference]);

    // Send email notification (failsafe background task)
    await sendRegistrationEmail(reg, regSource, details.amount, details.method);

  } else {
    // Airtime Recharge verification
    let normalizedAccount = ratelnumber;
    if (normalizedAccount.startsWith('06') || normalizedAccount.startsWith('09')) {
      normalizedAccount = '020' + normalizedAccount.substring(1);
    }

    // Resolve VoIP switch ID
    const [switchData] = await db.query(
      'SELECT cus_id FROM switch_data WHERE ratelnumber = ? LIMIT 1',
      [normalizedAccount]
    );

    const cusId = switchData[0]?.cus_id || null;

    if (!cusId) {
      console.warn(`VoIP account ${normalizedAccount} not found in switch_data. Storing payment status, skipping automatic credit.`);
      await db.query(`
        UPDATE opay_payment 
        SET amount_r = ?, opay_status = ?, progress = 75, channels = ?
        WHERE reference = ?
      `, [details.amount, details.status, details.method, reference]);
      return { success: true, message: 'Payment verified, but VoIP line not found. Marked for manual review.' };
    }

    // Perform VoIP switch API credit
    const creditStatus = await creditVoIpLine(cusId, details.amount);

    if (creditStatus === 'balance added successfully') {
      await db.query(`
        UPDATE opay_payment 
        SET status = 1, cus_number = ?, cus_id = ?, channels = ?, progress = 100, door = 'close', 
            amount_r = ?, opay_status = ?, time_cron = ?, method = ?, recharger_count = recharger_count + 1, flags = 1, switch_status = ?
        WHERE reference = ?
      `, [normalizedAccount, cusId, details.method, details.amount, details.status, timeStr, details.method, creditStatus, reference]);
    } else {
      // API call failed, save status but progress is 75 so it goes to retry table
      await db.query(`
        UPDATE opay_payment 
        SET amount_r = ?, opay_status = ?, progress = 75, channels = ?, switch_status = ?
        WHERE reference = ?
      `, [details.amount, details.status, details.method, creditStatus, reference]);
    }
  }

  return { success: true, message: 'Transaction verified and processed successfully.' };
}

// GET handles browser redirects and manual verifications
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference') || '';
    const gateway = searchParams.get('gateway') || 'opay';
    const source = searchParams.get('source') || 'Airtime';
    const redirect_origin = searchParams.get('redirect_origin') || 'https://ratelplus.net';
    const format = searchParams.get('format') || '';

    if (!reference) {
      return NextResponse.json({ status: 'error', message: 'Missing reference.' }, { status: 400 });
    }

    // 1. Verify transaction status
    let verification;
    if (gateway === 'paystack') {
      verification = await verifyPaystackPayment(reference);
    } else {
      verification = await verifyOpayPayment(reference, source);
    }

    if (verification.success) {
      // 2. Process database and crediting
      await processVerifiedPayment(reference, verification);
      
      // 3. Return JSON if format=json is requested (for inline poll checks)
      if (format === 'json') {
        return NextResponse.json({ credited: true, status: 'success' });
      }
      
      // Otherwise redirect back to frontend success page
      const targetPage = source === 'Airtime' ? 'airtime' : 'personal-subscribers';
      return NextResponse.redirect(`${redirect_origin}/${targetPage}?status=success&reference=${reference}`);
    } else {
      if (format === 'json') {
        return NextResponse.json({ credited: false, status: verification.status });
      }
      // Redirect back to frontend with failure
      const targetPage = source === 'Airtime' ? 'airtime' : 'personal-subscribers';
      return NextResponse.redirect(`${redirect_origin}/${targetPage}?status=failure&message=${encodeURIComponent(verification.status)}`);
    }
  } catch (error) {
    console.error('GET Verification endpoint error:', error);
    if (searchParams.get('format') === 'json') {
      return NextResponse.json({ credited: false, status: 'error', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

// POST handles server-to-server webhook callbacks (OPay Webhooks)
export async function POST(request) {
  try {
    const body = await request.json();
    const reference = body?.payload?.reference;
    
    if (!reference) {
      return NextResponse.json({ status: 'error', message: 'Missing reference in payload.' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'Airtime';

    // 1. Verify transaction status
    const verification = await verifyOpayPayment(reference, source);

    if (verification.success) {
      // 2. Process database and crediting
      await processVerifiedPayment(reference, verification);
      return NextResponse.json({ status: 'success', message: 'Webhook verified and credited.' });
    }

    return NextResponse.json({ status: 'error', message: 'Transaction check failed.' }, { status: 400 });
  } catch (error) {
    console.error('POST Webhook handler error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
