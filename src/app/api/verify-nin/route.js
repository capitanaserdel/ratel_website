import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const nin = body?.nin || '';

    if (!nin || nin.length !== 11) {
      return NextResponse.json({
        success: false,
        message: 'NIN must be exactly 11 digits'
      }, { status: 400 });
    }

    const secretKey = process.env.AFRICVERIFY_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({
        success: false,
        message: 'AfricVerify integration is not configured. Missing secret key.'
      }, { status: 500 });
    }

    console.log(`[verify-nin] Querying AfricVerify for NIN: ${nin}`);

    // Call AfricVerify API
    const response = await axios.post(
      'https://api.africverify.com/api/v1/kyc/NG/nin',
      { nin },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        timeout: 20000 // 20s timeout
      }
    );

    const resData = response.data;
    console.log('[verify-nin] AfricVerify response:', JSON.stringify(resData));

    // Handle standard/expected successful response structures
    if (response.status === 200 && (resData.status === 'success' || resData.success === true || resData.data)) {
      const details = resData.data?.data || resData.data || resData;

      const toTitleCase = (str) => {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };

      // Map properties based on the AfricVerify schema with standard fallbacks
      const fname = toTitleCase(details.firstname || details.firstName || details.first_name || details.fname || '');
      const sname = toTitleCase(details.surname || details.lastName || details.last_name || details.surname || details.lastname || '');
      const email = details.email || '';
      const mobile = details.telephoneno || details.phoneNumber || details.phone || details.mobile || details.telephone || '';
      const addr = details.residence_address || details.address || details.residentialAddress || details.addressLine || '';

      return NextResponse.json({
        success: true,
        data: { fname, sname, email, mobile, addr }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: resData.message || 'NIN verification failed. Invalid NIN or connection issue.'
      });
    }
  } catch (error) {
    console.error('[verify-nin] Error verifying NIN:', error.response?.data || error.message);
    const errMsg = error.response?.data?.message || error.message || 'Internal server error';
    return NextResponse.json({
      success: false,
      message: errMsg
    }, { status: error.response?.status || 500 });
  }
}
