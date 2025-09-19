import React from "react"

const CheckoutSkeleton = () => {
  return (
    <div className="w-full max-w-[1074px] mx-auto">          
      <div className="relative flex flex-col my-10 lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-6 w-full">
        
        {/* Left side - Checkout Form */}
        <div className="flex flex-col gap-[30px] w-full lg:w-2/3">
          
          {/* Contact Section */}
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded" />
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
              <div className="w-40 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Delivery Section */}
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
            
            {/* Country selector */}
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded" />
            
            {/* Name fields */}
            <div className="flex flex-col md:flex-row w-full items-start gap-5">
              <div className="w-full md:w-1/2 h-12 bg-gray-200 animate-pulse rounded" />
              <div className="w-full md:w-1/2 h-12 bg-gray-200 animate-pulse rounded" />
            </div>
            
            {/* Address field */}
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded" />
            
            {/* City, State, ZIP */}
            <div className="flex w-full flex-col md:flex-row md:items-center gap-2">
              <div className="w-full md:w-1/3 h-12 bg-gray-200 animate-pulse rounded" />
              <div className="w-full md:w-1/3 h-12 bg-gray-200 animate-pulse rounded" />
              <div className="w-full md:w-1/3 h-12 bg-gray-200 animate-pulse rounded" />
            </div>
            
            {/* Phone field */}
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded" />
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
              <div className="w-44 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Payment Section */}
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto] pb-8">
            <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
            <div className="w-full p-10 bg-gray-200 border border-[#e5e7eb] animate-pulse">
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-24 bg-gray-200 rounded" />
              </div>
              <div className="mt-6 h-12 bg-gray-300 rounded" />
              <p className="mt-6 text-sm text-gray-500">
                {/* Preparing secure payment… */}
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-[34px] relative self-stretch w-full flex-[0_0_auto]">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        </div>
        
        {/* Right side - Order Summary */}
        <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3 sticky top-10">
          <div className="flex flex-col w-full items-start">
            {/* Order Summary Header */}
            <div className="w-32 h-6 bg-gray-200 animate-pulse rounded mb-6" />
            
            {/* Cart Items */}
            <div className="flex flex-col gap-0 mb-6 border-b border-white w-full">
              {[1, 2].map((index) => (
                <div key={index} className="flex flex-row items-start gap-3 py-4">
                  {/* Product image with quantity badge */}
                  <div className="relative flex-shrink-0">
                    <div className="h-12 w-12 bg-gray-200 animate-pulse rounded" />
                    <div className="absolute -top-2 -right-2 bg-gray-300 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                      
                    </div>
                  </div>
                  
                  {/* Product details */}
                  <div className="flex flex-1 justify-between items-start">
                    <div className="flex flex-col">
                      <div className="w-32 h-4 bg-gray-200 animate-pulse rounded mb-1" />
                      <div className="w-20 h-3 bg-gray-200 animate-pulse rounded" />
                    </div>
                    <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Promotion Code Input */}
            <div className="flex items-center gap-0 mb-2 py-4 w-full">
              <div className="flex-1 h-11 bg-gray-200 animate-pulse rounded-l" />
              <div className="h-11 w-20 bg-gray-300 animate-pulse rounded-r" />
            </div>

            {/* Pricing Breakdown */}
            <div className="flex flex-col gap-1 mb-2 py-4 w-full">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                </div>
              ))}
            </div>

            {/* Tax and Discount */}
            <div className="flex flex-col gap-1 mb-4 py-4 w-full border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="w-12 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-8 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="w-12 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4 border-t border-gray-200 w-full">
              <div className="w-12 h-6 bg-gray-200 animate-pulse rounded" />
              <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSkeleton