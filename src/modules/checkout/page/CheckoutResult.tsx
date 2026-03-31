"use client"
import React, { useState, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { PaymentFinish } from "@modules/checkout/page/components/paymentFinish"
import { useSearchParams, useParams } from "next/navigation"
import { retrieveOrderByAirwallexRequestId } from "@lib/data/orders"
import { clearCartCookie } from "@lib/data/cart"

export const CheckoutResult = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  
  // Try to get request_id from URL params (dynamic route) or query params (legacy)
  const requestId = (params?.request_id as string) || searchParams?.get("request_id")
  
  const [order, setOrder] = useState<HttpTypes.StoreOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const pollForOrder = async (requestId: string) => {
    const maxAttempts = 150; // 5 minutes (150 attempts * 2s interval)
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`Polling attempt ${attempts + 1}/${maxAttempts} for request ID:`, requestId)
        const orders = await retrieveOrderByAirwallexRequestId(requestId)
        console.log("Retrieved orders:", orders)
        
        if (orders && orders.length > 0) {
          // Order found
          setOrder(orders[0])
          setIsLoading(false)
          setHasError(false)
          return;
        }
      } catch (error) {
        console.warn(`Polling attempt ${attempts + 1} failed:`, error);
        // Don't set error state, just continue polling
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2s intervals
    }
    
    // If we reach here, polling timed out after 5 minutes
    console.log("Polling timed out after 5 minutes")
    setIsLoading(false)
    setHasError(true)
  }

  useEffect(() => {
    if (requestId) {
      //remove cartId from cookie
      clearCartCookie()      
      pollForOrder(requestId)
    } else {
      setHasError(true)
      setIsLoading(false)
    }
  }, [requestId])

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full 2xl:w-[1512px] bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex justify-center flex-col items-center">
        <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full relative px-5 lg:px-20">
          {/* Header */}
          <NavBarWrapper isFixed={false} />
        </div>
        {/* Loading content */}
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F6AF1F] mx-auto mb-4"></div>
            <p className="text-lg font-medium text-[#343a40]">Processing your payment...</p>
          </div>
        </div>
        {/* Footer */}
        <FooterDark />
      </div>
    )
  }

  // Error state - payment failed
  if (hasError || !order) {
    return (
      <div className="w-full 2xl:w-[1512px] bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex justify-center flex-col items-center">
        <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full relative px-5 lg:px-20">
          {/* Header */}
          <NavBarWrapper isFixed={false} />
        </div>
        
        {/* Error content */}
        <div className="bg-[#00000080] flex justify-center items-start w-full h-full absolute top-0 left-0 px-4 lg:px-10 z-50 pt-5">
          <div className="flex flex-col w-full lg:w-[547px] items-center justify-start gap-5 p-5 relative bg-[#ffffff] rounded-[20px]">
            <div className="inline-flex flex-col items-center gap-5 relative flex-[0_0_auto]">
              {/* Error icon/image */}
              <div className="relative w-[155px] h-[147px] flex items-center justify-center bg-[#ff000020] rounded-full">
                <div className="text-6xl text-[#ff0000]">❌</div>
              </div>
              
              {/* Error message */}
              <div className="flex flex-col w-[361px] items-center gap-2 relative flex-[0_0_auto]">
                <div className="flex flex-col items-center justify-center gap-2.5 px-0 py-2.5 relative self-stretch flex-[0_0_auto]">
                  <div className="relative w-[284px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#ff0000] text-[26px] text-center tracking-[0] leading-[normal]">
                    Payment Failed!
                  </div>
                  <div className="relative w-[284px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] text-[18px] text-center tracking-[0] leading-[normal] text-[#343a40]">
                    Please try again or contact our support team.
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-4 w-full">
              <a
                href="/checkout"
                className="all-[unset] box-border w-full flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative bg-[#F6AF1F] hover:bg-[#fdce6f] self-stretch flex-[0_0_auto]"
              >
                <div className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-black relative font-medium whitespace-nowrap leading-6">
                  Try Again
                </div>
              </a>
              
              <a
                href="/"
                className="all-[unset] box-border w-full flex items-center gap-2 px-6 py-3 rounded-[10px] justify-center relative bg-[#ffffff] border-2 border-[#F6AF1F] hover:bg-[#f5f5f5] self-stretch flex-[0_0_auto]"
              >
                <div className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[#F6AF1F] relative font-medium whitespace-nowrap leading-6">
                  Back to Home
                </div>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <FooterDark />
      </div>
    )
  }

  // Success state - show PaymentFinish component
  return (
    <div className="w-full 2xl:w-[1512px] bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex justify-center flex-col items-center">
      <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full relative px-5 lg:px-20">
        {/* Header */}
        <NavBarWrapper isFixed={false} />
      </div>
      {/* Footer */}
      <FooterDark />
      {/* Success payment finish overlay */}
      <PaymentFinish order={order} success={true} />
    </div>
  )
}