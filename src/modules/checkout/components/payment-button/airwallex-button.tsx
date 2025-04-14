"use client"

import { Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import ErrorMessage from "@modules/checkout/components/error-message"

type AirwallexPaymentButtonProps = {
  cart: HttpTypes.StoreCart
  session: HttpTypes.StorePaymentSession
  disabled?: boolean
  onPaymentCompleted: () => void
  dataTestId?: string
}

const AirwallexPaymentButton = ({
  cart,
  session,
  disabled = false,
  onPaymentCompleted,
  dataTestId = "airwallex-payment-button",
}: AirwallexPaymentButtonProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      // Implement Airwallex payment processing here
      // This is where you would handle the Airwallex payment flow
      // After successful payment:
      onPaymentCompleted()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        disabled={disabled}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="airwallex-payment-error-message"
      />
    </>
  )
}

export default AirwallexPaymentButton
