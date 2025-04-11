import { ProductPage } from "@modules/cart/components/ProductPage/ProductPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart() {
  return <ProductPage />
}
