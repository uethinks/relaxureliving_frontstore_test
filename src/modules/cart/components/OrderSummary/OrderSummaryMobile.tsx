"use client"
import React from "react"
import { useCart } from "@lib/context/cartContext"
import { useRouter } from "next/navigation"
import { formatCartTotal } from "@lib/util/money"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoveDownRight } from "lucide-react"
import V2SupportSection from "@/components/V2SupportSection"

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0)

export const OrderSummaryMobile = (): JSX.Element => {
  const { cart } = useCart()
  const router = useRouter()

  // Calculate monthly payment for Klarna (24 months)
  const monthlyPayment = cart?.total ? cart.total / 24 : 0

  return (
    <div className="flex flex-col w-full items-start">
      {/* Main Order Summary */}
      <div className="flex flex-col items-start justify-center relative self-stretch w-full border border-gray-100">
        <div className="w-full bg-white">
          <div className="text-black text-[14px] border border-white flex items-center gap-2 px-4 py-4 bg-background">
            <img src="/img/Klarna.png" alt="Klarna" className="h-6" />{" "}
            <span>Pay </span>{" "}
            <span className="font-semibold">
              {formatPrice(monthlyPayment)}/Mo x 24
            </span>{" "}
            <span>With Klarna</span>
          </div>
          {/* <h2 className="text-2xl font-medium text-gray-800 mb-6">
            Order Summary
          </h2> */}

          {/* Cart Items */}
          {/* <div className="flex flex-col gap-4 mb-6">
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-base font-medium text-gray-800">
                    {item.quantity} x {item.title}
                  </div>
                </div>
                <div className="text-base font-semibold text-gray-800">
                  {formatCartTotal({ ...cart, total: item.total })}
                </div>
              </div>
            ))}
          </div> */}

          {/* Pricing Breakdown */}
          <div className="flex flex-col gap-1 mb-2 p-3 text-[14px]">
            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Packing & Delivery: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">$395-$750</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Full Insurance: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">$295</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Warranty: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">$749-$1798</span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-col gap-3 mb-10 px-2">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5">
                <Image     
                  unoptimized              
                  src="/img/package.svg"
                  alt="Package icon"
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-1 text-sm">
                  Delivered in 7 Weeks
                </h3>
                <p className="text-sm text-gray-600">
                  Fast and reliable delivery so you can enjoy it sooner.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5">
                <Image
                  src="/img/shipping.svg"
                  alt="Shipping icon"
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-1 text-sm">
                  Hassle-Free Delivery
                </h3>
                <p className="text-sm text-gray-600">
                  Peace of mind delivered free. We handle everything for a smooth setup.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5">
                <Image
                  src="/img/warranty.svg"
                  alt="Warranty icon"
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-1 text-sm">
                  Industry-Leading Warranty
                </h3>
                <p className="text-sm text-gray-600">
                  Built to last. Protected with one of the best warranties in the industry.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          {/* <div className="w-full h-px bg-gray-200 mb-6" /> */}

          {/* Total */}
          {/* <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-medium text-gray-800">Total:</div>
            <div className="flex items-end gap-4">
              <div className="text-3xl font-bold text-gray-800">
                {formatCartTotal(cart)}
              </div>
              {(cart?.discount_total ?? 0) > 0 && cart?.original_total && (
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-400 line-through">
                    {formatCartTotal({ ...cart, total: cart.original_total })}
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded-full">
                    <span className="text-xs font-normal text-red-500">
                      Save{" "}
                      {Math.round(
                        (cart.discount_total / cart.original_total) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div> */}

          {/* Checkout Button */}
     
        </div>
        {/* Customer Support */}
        <V2SupportSection />
      </div>
    </div>
  )
}
