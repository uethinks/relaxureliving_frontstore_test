import { useCart } from "@lib/context/cartContext"
import CartSkeleton from "@modules/cart/components/CartSkeleton/CartSkeleton"
import { EmptyCart } from "@modules/cart/components/EmptyCart/EmptyCart"
import { OrderSummary } from "@modules/cart/components/OrderSummary/OrderSummary"

import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import CheckoutCustomPage from "./CheckoutCustomPage"
import { Suspense, useEffect, useState } from "react"

export default async function Checkout({
  
}: {
  
}) {
 

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-background ">
        <div className=" w-full relative flex flex-col justify-center items-center pt-0">
          <NavBarWrapper isFixed={false} />
          <Suspense>
            <CheckoutCustomPage/>
          </Suspense>
          
        </div>
    
      </div> 
      <FooterDark />
    </>
  )
 
}
