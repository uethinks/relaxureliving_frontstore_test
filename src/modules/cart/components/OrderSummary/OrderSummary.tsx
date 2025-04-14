"use client"
import React from "react"
import { Button } from "../Button/Button"
import { useCart } from "@lib/context/cartContext"
import { useRouter } from "next/navigation"
export const OrderSummary = (): JSX.Element => {
  const { cart } = useCart()
  console.log("OrderSummary cart", cart)
  const router = useRouter()
  return (
    <div className="flex flex-col w-full items-start gap-2.5 px-2.5">
      <div className="flex flex-col items-start justify-center gap-5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#efefef] rounded-[20px] shadow-shadow-relaxure-button">
        <div className="inline-flex items-center gap-[420px] relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[22px] tracking-[0] leading-[30.8px] whitespace-nowrap">
            Order Summary
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-[35px] relative mr-[-1.00px]">
          <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-[30px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[30px] relative self-stretch w-full flex-[0_0_auto]">
                {cart?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-end justify-between relative self-stretch w-full flex-[0_0_auto]"
                  >
                    <div className="flex items-center gap-2.5 relative max-w-full">
                      <div className="w-full break-words relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-normal overflow-wrap break-word">
                        {item.quantity} x {item.title}
                      </div>
                    </div>
                    <div className="w-fit [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-base leading-[22.4px] whitespace-nowrap relative tracking-[0]">
                      $ {item.total}
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-center justify-start relative">
                    <div className="flex h-6 items-center gap-2.5 relative">
                      <div className="relative h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                        Delivery Fee
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#a5feae8c] rounded-[10px]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#2c5630] text-lg tracking-[0] leading-[21.6px] whitespace-nowrap">
                      Free Shipping
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative self-stretch w-full h-0.5 bg-[#d9d9d9] rounded-[10px]" />
            </div>
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[22px] leading-[30.8px] whitespace-nowrap relative tracking-[0]">
                Total:
              </div>
              <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-2xl leading-[33.6px] whitespace-nowrap relative tracking-[0]">
                ${cart?.total}
              </div>
            </div>
          </div>
          <Button onClick={() => router.push("/us/checkout")} text="Checkout" />
        </div>
      </div>
    </div>
  )
}
