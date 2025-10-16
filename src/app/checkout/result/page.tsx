"use client"

import { Suspense } from "react"
import { CheckoutResult } from "@modules/checkout/page/CheckoutResult"

export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600
// This page handles legacy Airwallex payment results without request_id in URL
// For new implementations, use /checkout-result/[request_id] instead
// This fallback will try to get request_id from query parameters

export default function CheckoutResultPage() {
  return (
    <Suspense>
      <CheckoutResult />
    </Suspense>
  )
}
