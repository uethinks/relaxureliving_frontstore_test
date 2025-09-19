
"use client"
import React, { useState, useEffect } from "react"
import { useCart } from "@lib/context/cartContext"
import { useRouter } from "next/navigation"
import { formatCartTotal } from "@lib/util/money"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoveDownRight } from "lucide-react"
import { StoreCart } from "@medusajs/types"
import { addPromotionCode } from "@lib/data/cart"

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0)


export const CheckoutOrderSummary = ({
    cart
}: {
  cart: StoreCart | null
}): JSX.Element => {   
 
  const router = useRouter()
  const { getCart } = useCart()
  
  // Promotion state
  const [promotionCode, setPromotionCode] = useState("")
  const [isApplyingPromotion, setIsApplyingPromotion] = useState(false)
  const [promotionError, setPromotionError] = useState("")
  const [promotionSuccess, setPromotionSuccess] = useState("")
  const [appliedPromotions, setAppliedPromotions] = useState<string[]>([])

  // Calculate monthly payment for Klarna (24 months)
  const monthlyPayment = cart?.total ? cart.total / 24 : 0
  
  // Initialize applied promotions from cart
  useEffect(() => {
    if (cart?.promotions && cart.promotions.length > 0) {
      const promotionCodes = cart.promotions
        .map((promo) => promo.code)
        .filter((code): code is string => code !== undefined)
      setAppliedPromotions(promotionCodes)
    } else {
      setAppliedPromotions([])
    }
  }, [cart?.promotions])
  
  // Helper functions
  const getPromotionDetails = (code: string) => {
    if (!cart?.promotions) {
      return null
    }
    return cart.promotions.find((promo) => promo.code === code)
  }

  const formatDiscountAmount = (promotion: any) => {
    if (promotion?.application_method?.type === "fixed") {
      return `$${promotion.application_method.value}`
    } else if (promotion?.application_method?.type === "percentage") {
      return `${promotion.application_method.value}%`
    }
    return ""
  }
  
  const applyPromotionCode = async () => {
    if (!promotionCode.trim() || !cart?.id) {
      setPromotionError("Please enter a valid promotion code")
      return
    }

    // Check if promotion code is already applied
    if (appliedPromotions.includes(promotionCode.trim().toUpperCase())) {
      setPromotionError("This promotion code has already been applied")
      return
    }

    setIsApplyingPromotion(true)
    setPromotionError("")
    setPromotionSuccess("")

    try {
      await addPromotionCode(cart.id, [promotionCode.trim()])
      setPromotionSuccess("Promotion code applied successfully!")
      setPromotionCode("")
      
      // Refresh cart data
      await getCart()
    } catch (error: any) {
      setPromotionError(
        error?.response?.data?.message || "Failed to apply promotion code"
      )
    } finally {
      setIsApplyingPromotion(false)
    }
  }

  return (
    <div className="flex flex-col w-full items-start">
      {/* Main Order Summary */}
      <div className="flex flex-col items-start justify-center relative self-stretch w-full">
        <div className="w-full">

            <h2 className="text-[24px] font-semibold text-[#111827]">Order Summary</h2>
          
          {/* Cart Items List */}
          <div className="flex flex-col gap-0 mb-6  border-b border-white">
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-start gap-3 py-4"
              >
                {/* Product Image with Quantity Badge */}
                <div className="relative flex-shrink-0">
                  <div
                    className="h-12 w-12 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${item?.product?.thumbnail}")`,
                    }}
                  />
                  {/* Quantity Badge */}
                  <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="flex flex-1 justify-between items-start">
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-semibold text-gray-800">
                      {item?.product_title}
                    </h4>
                    
                    {/* Product Options */}
                    {item.variant?.options && item.variant.options.length > 0 && (
                      <div className="text-[12px] font-normal text-gray-500 mt-1">
                        {item.variant.options.map((option: any, index: number) => (
                          <span key={option.id}>
                            {option.value}
                            {index < (item.variant?.options?.length || 0) - 1 && ' / '}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="flex flex-col items-end">
                    <div className="font-semibold text-[14px] text-gray-800">
                      {formatPrice(item?.original_total)}
                    </div>
                    {/* {item?.discount_total > 0 && (
                      <div className="flex flex-col items-end">
                        <div className="font-medium text-[12px] text-gray-500 line-through">
                          ${item?.original_total?.toFixed(2)}
                        </div>
                        <div className="text-[10px] bg-primary px-2 py-0.5 rounded">
                          Save {formatPrice(item?.discount_total)}
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promotion Code Input */}
          <div className="flex items-center gap-0 mb-2 py-4 ">
            <div className="relative flex-1">
              <img 
                src="/img/form_tag_accent.svg" 
                alt="Promotion" 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8A300] pointer-events-none" 
              />
              <input
                className="flex-1 w-full h-11 focus:outline-none  px-4 pl-12 bg-white text-[16px] text-[#000000] font-medium placeholder:text-[#9ca3af]"
                placeholder="Enter promotion code"
                type="text"
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    applyPromotionCode()
                  }
                }}
              />
            </div>
            <button
              onClick={applyPromotionCode}
              disabled={isApplyingPromotion || !promotionCode.trim()}
              className="h-11 px-2 bg-primary font-semibold text-[14px] 
                        hover:bg-[#d19300]"
            >
              {isApplyingPromotion ? "Applying..." : "Apply"}
            </button>
          </div>

          {/* Applied Promotions Display */}
          {appliedPromotions.length > 0 && (
            <div className="flex flex-col gap-2 mb-4">
              <div className="text-sm font-medium text-[#343a40] [font-family:'Montserrat',Helvetica]">
                Applied Promotions:
              </div>
              <div className="flex flex-wrap gap-2">
                {appliedPromotions.map((code, index) => {
                  const promotionDetails = getPromotionDetails(code)
                  const discountAmount = promotionDetails
                    ? formatDiscountAmount(promotionDetails)
                    : ""
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-primary   text-sm [font-family:'Montserrat',Helvetica]"
                    >
                      <span>✓ {code}</span>
                      {discountAmount && (
                        <span className="text-xs font-medium">
                          ({discountAmount} off)
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Error/Success Messages */}
          {promotionError && (
            <div className="text-red-500 text-sm mb-4 [font-family:'Montserrat',Helvetica]">
              {promotionError}
            </div>
          )}
          {promotionSuccess && (
            <div className="text-green-500 text-sm mb-4 [font-family:'Montserrat',Helvetica]">
              {promotionSuccess}
            </div>
          )}

          {/* Pricing Breakdown */}
          <div className="flex flex-col gap-1 mb-2 py-4 text-[14px] font-semibold">
            <div className="flex justify-between items-center">
              <span className="text-[#000000] ">
                Subtotal: <span>{cart?.items?.length ?? "-"} items</span>
              </span>
              <span className="text-[#111827]">+{formatPrice(cart?.original_total ?? 0)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Shipping: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">+$999.99</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Full Insurance: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">+$999.99</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Lifetime Warranty: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">+$999.99</span>
            </div>
          </div>

          {/* Tax and discount */}
          <div className="flex flex-col gap-1 mb-4 py-4 text-[14px] font-semibold border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-[#000000]">
                Discount
              </span>
              <span className="text-[#111827]">{formatPrice(cart?.discount_total || 0)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000]">
                Tax
              </span>
              <span className="text-[#111827]">{formatPrice(cart?.tax_total || 0)}</span>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center py-4 border-t border-gray-200">
            <span className="text-[24px] font-bold text-[#111827]">Total</span>
            <span className="text-[24px] font-bold text-[#111827]">{formatPrice(cart?.total || 0)}</span>
          </div>
          
          {/* {cart?.discount_total && cart.discount_total > 0 && (
            <div className="flex items-center justify-end gap-2 mt-2">
              <img src="/img/form_tag.svg" alt="Discount Icon" className="w-4 h-4" />
              <span className="text-[14px] text-green-600">
                Total savings {formatPrice(cart.discount_total)}
              </span>
            </div>
          )}
                     */}
        </div> 
      </div>
    </div>
  )
}

