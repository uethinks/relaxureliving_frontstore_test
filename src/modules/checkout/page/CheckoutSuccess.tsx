"use client"
import React, { useState, useEffect } from "react"
import { StoreOrder } from "@medusajs/types"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { PaymentFinish } from "@modules/checkout/page/components/paymentFinish"
import { PaymentFinishSkeleton } from "@modules/checkout/page/components/PaymentFinishSkeleton"
import { useSearchParams } from "next/navigation"
import { retrieveOrder } from "@lib/data/orders"

export const CheckoutSuccess = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams?.get("order_id")
  const error = searchParams?.get("error")
  const [order, setOrder] = useState<StoreOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      console.log("Order ID:", orderId)
      setIsLoading(true)
      retrieveOrder(orderId).then((res) => {
        setOrder(res)
        console.log("Retrieved Order:", JSON.stringify(res))
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
    if (error) {
      console.log("error", error)
    }
  }, [orderId, error]) // 只在 orderId 变化时执行

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-background">
        <div className="w-full relative flex flex-col justify-center items-center pt-0">
          <NavBarWrapper isFixed={false} />
          <div className="w-full max-w-[1074px] mx-auto px-5 lg:px-20 py-10">
            {isLoading ? (
              <PaymentFinishSkeleton />
            ) : (
              order && <PaymentFinish order={order} success={!error} />
            )}
          </div>
        </div>
      </div>
      <FooterDark />
    </>
  )
}
