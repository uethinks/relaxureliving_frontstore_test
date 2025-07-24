import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import {retrieveOrder, captureOrderWebhook} from "@lib/data/orders"

enum TerminalNameEnum {
  Credit = "Credit Card",
  Google = "GooglePay",
  Apple = "ApplePay",
  Klarna = "Klarna",
  Afterpay = "Afterpay",
}
const getTerminalSecureCode = (terminalName: TerminalNameEnum) => {
  switch (terminalName) {
    case TerminalNameEnum.Credit:
      return process.env.OCEANPAYMENT_SECURE_CODE
    case TerminalNameEnum.Google:
      return process.env.OCEANPAYMENT_GOOGLE_SECURE_CODE
    case TerminalNameEnum.Apple:
      return process.env.OCEANPAYMENT_APPLE_SECURE_CODE
    case TerminalNameEnum.Klarna:
      return process.env.OCEANPAYMENT_KLARNA_SECURE_CODE
    case TerminalNameEnum.Afterpay:
      return process.env.OCEANPAYMENT_AFTERPAY_SECURE_CODE
    default:
      return ""
  }
}

export async function GET(request: NextRequest) {
    // 获取 URL 查询参数
    const searchParams = request.nextUrl.searchParams
    
    // 获取表单字段
    const fields = [
      "account",
      "terminal",
      "order_number",
      "order_currency",
      "order_amount",
      "order_notes",
      "card_number",
      "payment_id",
      "payment_authType",
      "payment_status",
      "payment_details",
      "payment_risk"
    ]
    
    const values: string[] = []
    fields.forEach((key) => {
      values.push(searchParams.get(key) || "")
    })
    // 获取 secureCode
    const methods = searchParams.get("methods") || ""
    const secureCode = getTerminalSecureCode(methods as TerminalNameEnum) || ""
    values.push(secureCode)
    // 拼接明文
    const signString = values.join("")
    // 生成 SHA256 签名
    const hash = crypto.createHash("sha256").update(signString).digest("hex").toUpperCase()
    // 获取 signValue
    const signValue = searchParams.get("signValue") || ""
    // 获取 payment_status
    const paymentStatus = searchParams.get("payment_status") || ""
    // 获取 cart_id
    const orderId = searchParams.get("order_number") || ""
    console.log("---------------callback start---------------")
    console.log("methods", methods)
    console.log("secureCode", secureCode)
    console.log("signString", signString)
    console.log("hash", hash)
    console.log("signValue", signValue)
    console.log("---------------callback end---------------")

    const captureOrder = async (orderId: string) => {
      const order = await retrieveOrder(orderId)
      const paymentSessionId = order.payment_collections?.[0]?.payments?.[0]?.payment_session?.id
      if (paymentSessionId) {
        const captureOrder = await captureOrderWebhook(paymentSessionId)
        console.log("captureOrder", captureOrder)
      }
    }
    // 校验签名和 payment_status
    if (paymentStatus === "1" && signValue === hash) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      const successUrl = `${baseUrl}/checkout/success?order_id=${orderId}`
      captureOrder(orderId)
      return NextResponse.redirect(successUrl, {
        status: 302,
        headers: {
          'Location': successUrl,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    } else {
      // 校验失败或状态不对
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      const paymentDetails = searchParams.get("payment_details")
      const errorInfo = { status: paymentStatus, paymentDetails }
      const errorUrl = `${baseUrl}/checkout/success?order_id=${orderId}&error=${JSON.stringify(errorInfo)}`
      return NextResponse.redirect(errorUrl, {
        status: 302,
        headers: {
          'Location': errorUrl,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    }
} 
