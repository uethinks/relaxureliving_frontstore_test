import { Checkout as CheckoutComponent } from "@modules/checkout/page/Checkout"
import { redirect } from "next/navigation"

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const requiredParams = [
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
    "payment_risk",
  ]

  const hasAllParams = requiredParams.every(
    (param) => searchParams[param] !== undefined
  )

  if (hasAllParams) {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, Array.isArray(value) ? value[0] : value)
      }
    })
    redirect(`/api/payment/callback?${params.toString()}`)
  }

  return <CheckoutComponent />
}
