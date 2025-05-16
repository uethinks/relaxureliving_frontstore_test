"use client"
import React, { useState, useEffect, useCallback } from "react"
import { StoreOrder } from "@medusajs/types"
import { placeOrder } from "@lib/data/cart"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { PaymentFinish } from "@modules/checkout/page/components/paymentFinish"
import { useSearchParams } from "next/navigation"

export const CheckoutSuccess = () => {
  const searchParams = useSearchParams()
  const cartId = searchParams?.get("cart_id")
  const [order, setOrder] = useState<StoreOrder | null>(null)

  useEffect(() => {
    if (cartId) {
      console.log("Cart ID:", cartId)
      placeOrder(cartId)
        .then((res) => {
          setOrder(res.type === "order" ? res.order : null)
        })
        .catch((err) => {
          console.log("err", err)
        })
    }
  }, [cartId]) // 只在 cartId 变化时执行

  return (
    <div className="w-full 2xl:w-[1512px] bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex justify-center flex-col items-center">
      <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full relative px-5 lg:px-20">
        {/* Header */}
        <NavBarWrapper isFixed={false} />
      </div>
      {/* Footer */}
      <FooterDark />
      {order && <PaymentFinish order={order} />}
    </div>
  )
}
