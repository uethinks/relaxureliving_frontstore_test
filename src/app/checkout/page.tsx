import { Checkout as CheckoutComponent } from "@modules/checkout/page/Checkout"
import { redirect } from "next/navigation"

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // const params = await searchParams

  // const requiredParams = [
  //   "account",
  //   "terminal",
  //   "order_number",
  //   "order_currency",
  //   "order_amount",
  //   "order_notes",
  //   "card_number",
  //   "payment_id",
  //   "payment_authType",
  //   "payment_status",
  //   "payment_details",
  //   "payment_risk",
  // ]

  // const hasAllParams = requiredParams.every(
  //   (param) => params[param] !== undefined
  // )

  // if (hasAllParams) {
  //   const urlParams = new URLSearchParams()
  //   Object.entries(params).forEach(([key, value]) => {
  //     if (value !== undefined) {
  //       urlParams.append(key, Array.isArray(value) ? value[0] : value)
  //     }
  //   })
  //   redirect(`/api/payment/callback?${urlParams.toString()}`)
  // }

  return <CheckoutComponent />
}
