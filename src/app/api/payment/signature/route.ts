import { NextResponse } from 'next/server';
import crypto from 'crypto';
enum TerminalNameEnum {
  Credit = "Credit",
  Google = "Google",
  Apple = "Apple",
  Klarna = "Klarna",
  Afterpay = "Afterpay"
}
const getTerminalInfo = (terminalName: TerminalNameEnum) => {
  switch (terminalName) {
    case TerminalNameEnum.Credit:
      return {
        secureCode: process.env.OCEANPAYMENT_SECURE_CODE,
      }
    case TerminalNameEnum.Google:
      return {
        secureCode: process.env.OCEANPAYMENT_GOOGLE_SECURE_CODE,
      }
    case TerminalNameEnum.Apple:
      return {
        secureCode: process.env.OCEANPAYMENT_APPLE_SECURE_CODE,
      }
    case TerminalNameEnum.Klarna:
      return {
        secureCode: process.env.OCEANPAYMENT_KLARNA_SECURE_CODE,
      }
    case TerminalNameEnum.Afterpay:
      return {
        secureCode: process.env.OCEANPAYMENT_AFTERPAY_SECURE_CODE,
      }
  }
}
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
      terminalName
    } = body;
    // 从环境变量获取安全码
    let secureCode = process.env.OCEANPAYMENT_SECURE_CODE;
    switch (terminalName) {
      case TerminalNameEnum.Google:
        secureCode = process.env.OCEANPAYMENT_GOOGLE_SECURE_CODE
        break
      case TerminalNameEnum.Apple:
        secureCode = process.env.OCEANPAYMENT_APPLE_SECURE_CODE
        break
      case TerminalNameEnum.Klarna:
        secureCode = process.env.OCEANPAYMENT_KLARNA_SECURE_CODE
        break
      case TerminalNameEnum.Afterpay:
        secureCode = process.env.OCEANPAYMENT_AFTERPAY_SECURE_CODE
        break
    }
    
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