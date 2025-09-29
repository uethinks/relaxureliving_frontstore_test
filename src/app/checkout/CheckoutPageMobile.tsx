"use client"
import { useCart } from "@lib/context/cartContext"
import CheckoutSkeleton from "@modules/cart/components/CartSkeleton/CheckoutSkeleton"
import { EmptyCart } from "@modules/cart/components/EmptyCart/EmptyCart"
import { CheckoutComponentMobile } from "@modules/checkout/page/CheckoutComponentMobile"
import { CheckoutOrderSummaryMobile } from "@modules/checkout/page/components/CheckoutOrderSummaryMobile"
export default function CheckoutPageMobile({
  
}: {
  
}) {

  const { cart, isLoading } = useCart()
  
  // Check if cart is empty
  const isCartEmpty = !cart?.items || cart.items.length === 0
   
  return (
    <>
      {isLoading ? (
        <CheckoutSkeleton />
      ) : isCartEmpty ? (
        <EmptyCart />
      ) : (     
        <div className="w-full px-6 py-8">
          {/* Mobile layout: Order Summary on top, Checkout form below */}
          <div className="flex flex-col gap-3">
            {/* Order Summary at the top for mobile */}
            <CheckoutOrderSummaryMobile cart={cart} />
            
            {/* Checkout form below */}
            <CheckoutComponentMobile cart={cart} />
          </div>
        </div>
      )}
    </>
  )
}
