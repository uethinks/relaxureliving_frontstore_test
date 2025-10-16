"use client"

import { Suspense } from "react"
import { CheckoutSuccess } from "@modules/checkout/page/CheckoutSuccess"

export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

export default function CheckoutSuccessPage() {
  // 正常页面访问
  return (
    <Suspense>
      <CheckoutSuccess />
    </Suspense>
  )
}
