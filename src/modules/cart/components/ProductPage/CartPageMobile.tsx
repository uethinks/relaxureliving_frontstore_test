"use client"
import React from "react"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { useCart } from "@lib/context/cartContext"
import { StoreProduct } from "@medusajs/types"
import { EmptyCart } from "../EmptyCart/EmptyCart"
import { formatCartTotal } from "@lib/util/money"
import { ProductCardMobile } from "../ProductCard/ProductCardMobile"
import { ShadesCardMobile } from "../ShadesCard/ShadesCardMobile"
import { HeaterCardMobile } from "../HeaterCard/HeaterCardMobile"
import { GlassDoorCardMobile } from "../GlassDoorCard/GlassDoorCardMobile"
import { SampleKitCardMobile } from "../SampleKitCard/SampleKitCardMobile"
import { OrderSummaryMobile } from "../OrderSummary/OrderSummaryMobile"
 import { useRouter } from 'next/navigation'
import CartSkeletonMobile from "../CartSkeleton/CartSkeletonMobile"
import { trackEvent } from "@lib/util/tracking"
import { TrackingEvent } from "@/types/tracking"


interface CartPageMobileProps {
  accessories: StoreProduct[]
}

export const CartPageMobile: React.FC<CartPageMobileProps> = ({
  accessories
}) => {
  const { cart, isLoading } = useCart()
  const router = useRouter()
  
  // Check if cart is empty
  const isCartEmpty = !cart?.items || cart.items.length === 0 

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-background">
        <div className="w-full relative flex flex-col justify-center items-center pt-0">
          <NavBarWrapper isFixed={false} />
          
          {isLoading ? (
            <CartSkeletonMobile />
          ) : isCartEmpty ? (
            <EmptyCart />
          ) : (
            <div className="w-full px-6 pb-24 pt-6"> {/* Add bottom padding for floating summary */}
              {/* Mobile Cart Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#2f2a1e]">
                  Your Cart ({cart?.items?.length ?? 0})
                </h1>
                <div className="text-sm text-[#8c877c]">
                  Subtotal:{" "}
                  <span className="font-semibold text-[#8C877C]">
                    {formatCartTotal(cart)}
                  </span>
                </div>
              </div>

              {/* Mobile Cart Items */}
              <div className="flex flex-col gap-4 mt-4">
                <ProductCardMobile />
                <ShadesCardMobile />
                <HeaterCardMobile />
                <GlassDoorCardMobile />
                <SampleKitCardMobile />
              </div>

              <div className="flex flex-col mt-8 top-10 ">
                <OrderSummaryMobile />
              </div>    

              {/* Mobile Floating Order Summary */}
              <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
                     <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-1000 shadow-lg">
                <div className="max-w-md mx-auto">
                  
                    <button
                        onClick={() => {
                          trackEvent(TrackingEvent.CHECK_OUT, {
                            cartTotal: formatCartTotal(cart),
                          })
                          router.push("/checkout")
                        }}
                        className="w-full bg-primary hover:bg-primary-light text-black text-2xl font-bold py-4 px-4 transition-colors duration-200 h-[64px]"
                    >
                        Check Out - {formatCartTotal(cart)}
                    </button>
                </div>
              </div>
              </div>

            </div>
          )}
        </div>
      </div>
      <FooterDark />
    </>
  )
}