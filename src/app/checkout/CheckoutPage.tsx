"use client"
import { useCart } from "@lib/context/cartContext"
import CartSkeleton from "@modules/cart/components/CartSkeleton/CartSkeleton"
import CheckoutSkeleton from "@modules/cart/components/CartSkeleton/CheckoutSkeleton"
import { EmptyCart } from "@modules/cart/components/EmptyCart/EmptyCart"
import { CheckoutComponent } from "@modules/checkout/page/CheckoutComponent"
import { CheckoutOrderSummary } from "@modules/checkout/page/components/CheckoutOrderSummary"
 
export default function CheckoutPage({
  
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
          )}
        </>
      )

}
