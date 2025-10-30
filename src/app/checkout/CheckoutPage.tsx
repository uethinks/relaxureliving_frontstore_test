"use client"
import React, { useEffect, useState } from "react"
import { useCart } from "@lib/context/cartContext"
import CheckoutSkeleton from "@modules/cart/components/CartSkeleton/CheckoutSkeleton"
import { EmptyCart } from "@modules/cart/components/EmptyCart/EmptyCart"
import { CheckoutComponent } from "@modules/checkout/page/CheckoutComponent"
import { CheckoutOrderSummary } from "@modules/checkout/page/components/CheckoutOrderSummary"
import CheckoutPageMobile from "./CheckoutPageMobile"
import { useScreenSize } from "@lib/hooks/useScreenSize"
 
export default function CheckoutPage({
  
}: {
  
}) {
  const { cart, isLoading } = useCart()
  const { isMobile, width } = useScreenSize({ mobileBreakpoint: 1024 })
  const [isScreenReady, setIsScreenReady] = useState(false)
  
  // Check if cart is empty
  const isCartEmpty = !cart?.items || cart.items.length === 0

  // Wait for screen size to be properly detected (avoid hydration issues)
  useEffect(() => {
    if (width > 0) {
      setIsScreenReady(true)
    }
  }, [width])

  // Show loading skeleton only during initial load (avoid unmounting on cart refresh)
  const isInitialLoading = isLoading && !cart
  if (isInitialLoading || !isScreenReady) {
    return <CheckoutSkeleton />
  }

  // Show empty cart if no items
  if (isCartEmpty) {
    return <EmptyCart />
  }

  // Render mobile version if on mobile device
  if (isMobile) {
    return <CheckoutPageMobile />
  }

  // Desktop version
  return (
    <div className="w-full max-w-[1074px] mx-auto">          
      <div className="relative flex flex-col my-10 lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-6 w-full">
        <div className="flex flex-col gap-[30px] w-full lg:w-2/3">                                      
          <CheckoutComponent cart={cart} />
        </div>
        <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3 sticky top-10">
          <CheckoutOrderSummary cart={cart}/>
        </div>              
      </div>
    </div>
  )
}
