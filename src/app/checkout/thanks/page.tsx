"use client"

import { Suspense } from "react"
import { ThanksPage } from "@modules/checkout/page/ThanksPage"

export default function CheckoutThanksPage() {
  return (
    <Suspense>
      <ThanksPage />
    </Suspense>
  )
}
