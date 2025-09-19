"use client"
import { useCart } from "@lib/context/cartContext"
import { retrieveCart } from "@lib/data/cart"
import { StoreCart } from "@medusajs/types"
import CartSkeleton from "@modules/cart/components/CartSkeleton/CartSkeleton"
import CheckoutSkeleton from "@modules/cart/components/CartSkeleton/CheckoutSkeleton"
import { EmptyCart } from "@modules/cart/components/EmptyCart/EmptyCart"
import { CheckoutCustomComponent } from "@modules/checkout/page/CheckoutCustomComponent"
import { CheckoutCustomOrderSummary } from "@modules/checkout/page/components/CheckoutCustomOrderSummary"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
 
export default function CheckoutCustomPage({
  
}: {
  
}) {

  const searchParams = useSearchParams()
  const [cart, setCart] = useState<StoreCart | null>(null)
  const [isCartLoading, setIsCartLoading] = useState(true)
  
  
    // Check if cart is empty
  const isCartEmpty = !cart?.items || cart.items.length === 0
   

    // Get cart function to replace the one from useCart
  const getCart = useCallback(async () => {
    try {
      setIsCartLoading(true)
      const cartId = searchParams?.get("cartId")
      if (!cartId) {
        console.error("No cartId found in URL params")
        return null
      }
      const cartData = await retrieveCart(cartId)
      setCart(cartData)
      return cartData
    } catch (error) {
      console.error("Failed to fetch cart:", error)
      return null
    } finally {
      setIsCartLoading(false)
    }
    }, [searchParams])

  // Fetch cart on component mount
  useEffect(() => {
    getCart()
  }, [getCart])


  return (
    <>
      
          {isCartLoading ? (
            <CheckoutSkeleton />
          ) : isCartEmpty ? (
            <EmptyCart />
          ) : (     
            <div className="w-full max-w-[1074px] mx-auto">          
              <div className="relative flex flex-col my-10 lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-6 w-full">
                <div className="flex flex-col gap-[30px] w-full lg:w-2/3">                                      
                    <CheckoutCustomComponent cart={cart} />
                </div>
                <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3 sticky top-10">
                  <CheckoutCustomOrderSummary cart={cart}/>
                </div>              
              </div>
            </div>
          )}
        </>
      )

}
