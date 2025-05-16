import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
    // 获取 POST 数据
    const formData = await request.formData()
    
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
      values.push(formData.get(key)?.toString() || "")
    })
    // 获取 secureCode
    const secureCode = process.env.OCEANPAYMENT_SECURE_CODE || ""
    values.push(secureCode)
    // 拼接明文
    const signString = values.join("+")
    // 生成 SHA256 签名
    const hash = crypto.createHash("sha256").update(signString).digest("hex")
    // 获取 signValue
    const signValue = formData.get("signValue")?.toString() || ""
    // 获取 payment_status
    const paymentStatus = formData.get("payment_status")?.toString() || ""
    // 获取 cart_id
    const cartId = formData.get("order_number")?.toString() || ""
    // 校验签名和 payment_status
    if (paymentStatus === "1") {
      const countryCode = "us"
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      const successUrl = `${baseUrl}/${countryCode}/checkout/success?cart_id=${cartId}`
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
      const countryCode = "us"
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      const errorUrl = `${baseUrl}/${countryCode}/checkout/success?status=error`
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