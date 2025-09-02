"use client"

import { Suspense } from "react"
import { CheckoutResult } from "@modules/checkout/page/CheckoutResult"

// This page handles Airwallex payment results with dynamic request_id
// URL format: /checkout-result/{request_id}
// When using Klarna and Afterpay, users are redirected to their pages,
// then after confirming payment, they are redirected to this page
// We get the request_id from URL params to query order status via retrieveOrderByAirwallexRequestId
// If order exists: show CheckoutSuccess-like page with "Payment successful! placing your order..."
// If not: show "Payment failed! please try again." and let user retry payment

export default function CheckoutResultPage() {
  return (
    <Suspense>
      <CheckoutResult />
    </Suspense>
  )
}