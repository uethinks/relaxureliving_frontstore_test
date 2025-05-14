import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      account,
      terminal,
      order_number,
      order_currency,
      order_amount,
      billing_firstName,
      billing_lastName,
      billing_email,
    } = body;

    // 从环境变量获取安全码
    const secureCode = process.env.OCEANPAYMENT_SECURE_CODE;
    if (!secureCode) {
      return NextResponse.json(
        { error: 'Secure code not configured' },
        { status: 500 }
      );
    }

    // 生成签名
    const signString = `${account}${terminal}${order_number}${order_currency}${order_amount}${billing_firstName}${billing_lastName}${billing_email}${secureCode}`;
    const signValue = crypto
      .createHash('sha256')
      .update(signString)
      .digest('hex');

    return NextResponse.json({ signValue });
  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
} 