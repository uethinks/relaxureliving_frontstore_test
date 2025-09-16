"use client"
import React, { useState, useEffect } from "react"
import { StoreOrder } from "@medusajs/types"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { PaymentFinish } from "@modules/checkout/page/components/paymentFinish"
import { useSearchParams } from "next/navigation"
import { retrieveOrder } from "@lib/data/orders"

export const CheckoutSuccess = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams?.get("order_id")
  const error = searchParams?.get("error")
  const [order, setOrder] = useState<StoreOrder | null>(null)

  useEffect(() => {
    if (orderId) {
      console.log("Order ID:", orderId)
      retrieveOrder(orderId).then((res) => {
        setOrder(res)
      })
    }
    if (error) {
      console.log("error", error)
    }
  }, [orderId, error]) // 只在 orderId 变化时执行

  return (
    <div className="w-full 2xl:w-[1074px] bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex justify-center flex-col items-center">
      <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full relative px-5 lg:px-20">
        {/* Header */}
        <NavBarWrapper isFixed={false} />
      </div>
      {/* Footer */}
      <FooterDark />
      {order && <PaymentFinish order={order} success={!error} />}
    </div>
  )
}
