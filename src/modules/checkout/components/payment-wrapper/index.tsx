"use client"

import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import StripeWrapper from "./stripe-wrapper"
import AirwallexWrapper from "./airwallex-wrapper"
import { HttpTypes } from "@medusajs/types"
import { isStripe } from "@lib/constants"

type PaymentWrapperProps = {
  cart: HttpTypes.StoreCart
  children: React.ReactNode
}

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
const stripePromise = stripeKey ? loadStripe(stripeKey) : null

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  if (paymentSession?.provider_id === "pp_Airwallex_Airwallex") {
    const hasRedirectUrl =
      paymentSession.data &&
      typeof paymentSession.data === "object" &&
      "redirect_url" in paymentSession.data &&
      typeof paymentSession.data.redirect_url === "string"
    if (!hasRedirectUrl) {
      console.warn("Airwallex payment session missing redirect_url")
      return <div>{children}</div>
    }
    return (
      <AirwallexWrapper
        paymentSession={
          paymentSession as HttpTypes.StorePaymentSession & {
            data: { redirect_url: string }
          }
        }
      >
        {children}
      </AirwallexWrapper>
    )
  }

  if (
    isStripe(paymentSession?.provider_id) &&
    paymentSession &&
    stripePromise
  ) {
    return (
      <StripeWrapper
        paymentSession={paymentSession}
        stripeKey={stripeKey}
        stripePromise={stripePromise}
      >
        {children}
      </StripeWrapper>
    )
  }

  return <div>{children}</div>
}

export default PaymentWrapper
