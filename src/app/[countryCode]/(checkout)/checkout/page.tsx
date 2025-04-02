import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Checkout as CheckoutComponent } from "@modules/checkout/page/Checkout"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()
  return <CheckoutComponent />
}
