import React from "react"

const CartSkeletonMobile = () => {
  return (
    <div className="w-full px-6 pb-24"> 
      {/* Mobile Cart Header Skeleton */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="w-40 h-6 bg-gray-200 animate-pulse rounded" />
        <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Mobile Cart Items Skeleton */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Pergola Item Skeleton */}
        <div className="full flex flex-row items-start gap-2 border-t border-white">
          {/* Small image skeleton */}
          <div className="relative h-[48px] aspect-square bg-gray-200 animate-pulse rounded" />
          
          {/* Content skeleton */}
          <div className="flex flex-col items-start justify-between gap-1 relative flex-1 pt-3">
            <div className="flex flex-row items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit relative">
                {/* Product title skeleton */}
                <div className="w-32 h-4 bg-gray-200 animate-pulse rounded mb-2" />
                
                {/* Compact options skeleton */}
                <div className="flex flex-wrap gap-[1px]">
                  {[1, 2, 3].map((optionIndex) => (
                    <div
                      key={optionIndex}
                      className="w-12 h-5 bg-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              </div>
              
              {/* Price skeleton */}
              <div className="flex flex-col items-end justify-start gap-1">
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
            
            {/* Controls skeleton */}
            <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-1 mb-1">
              <div className="flex gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-gray-200 animate-pulse rounded" />
                  <div className="w-14 h-8 bg-gray-200 animate-pulse rounded" />
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Shades Item Skeleton */}
        <div className="full flex flex-row items-start gap-2 border-t border-white">
          <div className="relative h-[48px] aspect-square bg-gray-200 animate-pulse rounded" />
          <div className="flex flex-col items-start justify-between gap-1 relative flex-1 pt-3">
            <div className="flex flex-row items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit relative">
                <div className="w-28 h-4 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="flex flex-wrap gap-[1px]">
                  <div className="w-10 h-5 bg-gray-200 animate-pulse rounded" />
                  <div className="w-14 h-5 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
              <div className="flex flex-col items-end justify-start gap-1">
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-1 mb-1">
              <div className="flex gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-gray-200 animate-pulse rounded" />
                  <div className="w-14 h-8 bg-gray-200 animate-pulse rounded" />
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Heater Item Skeleton */}
        <div className="full flex flex-row items-start gap-2 border-t border-white">
          <div className="relative h-[48px] aspect-square bg-gray-200 animate-pulse rounded" />
          <div className="flex flex-col items-start justify-between gap-1 relative flex-1 pt-3">
            <div className="flex flex-row items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit relative">
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="flex flex-wrap gap-[1px]">
                  <div className="w-16 h-5 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
              <div className="flex flex-col items-end justify-start gap-1">
                <div className="w-18 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-1 mb-1">
              <div className="flex gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-gray-200 animate-pulse rounded" />
                  <div className="w-14 h-8 bg-gray-200 animate-pulse rounded" />
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Sample Kit Item Skeleton */}
        <div className="full flex flex-row items-start gap-2 border-t border-white">
          <div className="relative h-[48px] aspect-square bg-gray-200 animate-pulse rounded" />
          <div className="flex flex-col items-start justify-between gap-1 relative flex-1 pt-3">
            <div className="flex flex-row items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit relative">
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded mb-1" />
                <div className="w-16 h-3 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex flex-col items-end justify-start gap-1">
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-1 mb-1">
              <div className="flex gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-gray-200 animate-pulse rounded" />
                  <div className="w-14 h-8 bg-gray-200 animate-pulse rounded" />
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Order Summary Skeleton */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 bg-gray-200 animate-pulse rounded" />
              <div className="w-20 h-5 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="w-32 h-3 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default CartSkeletonMobile