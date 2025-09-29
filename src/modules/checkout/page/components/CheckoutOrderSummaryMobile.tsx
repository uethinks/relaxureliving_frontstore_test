"use client"
import React, { useState, useEffect } from "react"
import { useCart } from "@lib/context/cartContext"
import { StoreCart } from "@medusajs/types"
import { addPromotionCode } from "@lib/data/cart"

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0)

export const CheckoutOrderSummaryMobile = ({
  cart
}: {
  cart: StoreCart | null
}): JSX.Element => {   
  const { getCart } = useCart()
  
  // Promotion state
  const [promotionCode, setPromotionCode] = useState("")
  const [isApplyingPromotion, setIsApplyingPromotion] = useState(false)
  const [promotionError, setPromotionError] = useState("")
  const [promotionSuccess, setPromotionSuccess] = useState("")
  const [appliedPromotions, setAppliedPromotions] = useState<string[]>([])

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

  const handleApplyPromotion = async () => {
    if (!promotionCode.trim() || !cart?.id) return
    
    setIsApplyingPromotion(true)
    setPromotionError("")
    setPromotionSuccess("")
    
    try {
      await addPromotionCode(cart.id, [promotionCode])
      setPromotionSuccess(`Promotion "${promotionCode}" applied successfully!`)
      setPromotionCode("")
      // Refresh cart to get updated totals
      await getCart()
    } catch (error) {
      setPromotionError("Failed to apply promotion code. Please check the code and try again.")
    } finally {
      setIsApplyingPromotion(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleApplyPromotion()
    }
  }

  return (
    <div className="p-0">
            <h2 className="text-[18px] font-semibold text-[#111827] mb-2">Order Summary</h2>
          
          {/* Cart Items List */}
          <div className="flex flex-col gap-0 mb-4 border-b border-white">
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-start gap-2 py-2"
              >
                {/* Product Image with Quantity Badge */}
                <div className="relative flex-shrink-0">
                  <div
                    className="h-10 w-10 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${item?.product?.thumbnail}")`,
                    }}
                  />
                  {/* Quantity Badge */}
                  <div className="absolute -top-1 -right-1 bg-gray-600 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
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
                      <div className="text-[12px] font-normal text-gray-500 mt-0.5">
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
                  </div>
                </div>
              </div>
            ))}
          </div>

      {/* Promotion Code */}
      <div className="border-t border-gray-200 pt-4 mb-4">
 
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
                    handleApplyPromotion()
                  }
                }}
              />
            </div>
            <button
              onClick={handleApplyPromotion}
              disabled={isApplyingPromotion || !promotionCode.trim()}
              className="h-11 px-2 bg-primary font-semibold text-[14px] 
                        hover:bg-[#d19300]"
            >
              {isApplyingPromotion ? "Applying..." : "Apply"}
            </button>
          </div>

        
        {/* Applied Promotions */}
        {appliedPromotions.length > 0 && (
          <div className="mb-2">
            {appliedPromotions.map((code) => (
              <div key={code} className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                ✓ {code}
              </div>
            ))}
          </div>
        )}
        
        {promotionError && (
          <p className="text-red-600 text-xs">{promotionError}</p>
        )}
        {promotionSuccess && (
          <p className="text-green-600 text-xs">{promotionSuccess}</p>
        )}
      </div>

          {/* Pricing Breakdown */}
          <div className="flex flex-col gap-0.5 mb-1 py-2 text-[14px] font-semibold">
            <div className="flex justify-between items-center">
              <span className="text-[#000000]">
                Subtotal: <span>{cart?.items?.length ?? "-"} items</span>
              </span>
              <span className="text-[#111827]">+{formatPrice(cart?.original_total ?? 0)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Shipping: <span className="text-highlight">Free</span>
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
                Lifetime Warranty: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">$749-$1798</span>
            </div>
          </div>

          {/* Tax and discount */}
          <div className="flex flex-col gap-0.5 mb-2 py-2 text-[14px] font-semibold border-t border-gray-200">
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
          <div className="flex justify-between items-center py-2 border-t border-gray-200">
            <span className="text-[18px] font-bold text-[#111827]">Total</span>
            <span className="text-[18px] font-bold text-[#111827]">{formatPrice(cart?.total || 0)}</span>
          </div>
    </div>
  )
}