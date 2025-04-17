"use client"
import { useCart } from "@lib/context/cartContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Checkout as CheckoutComponent } from "@modules/checkout/page/Checkout"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, isLoading } = useCart()

  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      router.push("/")
    }
  }, [cart, router])

  if (isLoading || !cart || !cart.items || cart.items.length === 0) {
    return null
  }

  return <CheckoutComponent />
}
