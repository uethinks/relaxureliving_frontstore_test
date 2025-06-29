"use client"

import { Suspense } from "react"
import { CheckoutSuccess } from "@modules/checkout/page/CheckoutSuccess"

export default function CheckoutSuccessPage() {
  // 正常页面访问
  return (
    <Suspense>
      <CheckoutSuccess />
    </Suspense>
  )
}
