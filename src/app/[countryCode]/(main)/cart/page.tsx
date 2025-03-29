import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { ProductPage } from "@modules/cart/components/ProductPage/ProductPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { useCart } from "@lib/context/cartContext"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart() {
  return <ProductPage />
}
