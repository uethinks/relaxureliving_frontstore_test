import React from "react"

const CartSkeleton = () => {
  return (
    <div className="w-full max-w-[1074px] mx-auto">          
      <div className="relative flex flex-col my-10 lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-6 w-full">
        <div className="flex flex-col gap-[30px] w-full lg:w-2/3">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="w-48 h-8 bg-gray-200 animate-pulse rounded" />
            <div className="w-32 h-6 bg-gray-200 animate-pulse rounded" />
          </div>
          
          {/* Product cards skeleton */}
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="full flex flex-col md:flex-row items-start gap-5 border-t border-gray-200 pt-5"
            >
              {/* Product image skeleton */}
              <div className="relative h-[160px] aspect-square bg-gray-200 animate-pulse rounded" />
              
              {/* Product info skeleton */}
              <div className="flex flex-col w-full h-[160px] items-start justify-between gap-4 relative flex-1">
                <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                  <div className="w-fit relative">
                    {/* Product title skeleton */}
                    <div className="w-64 h-6 bg-gray-200 animate-pulse rounded mb-3" />
                    
                    {/* Product options skeleton */}
                    <div className="flex flex-wrap gap-[1px]">
                      {[1, 2, 3].map((optionIndex) => (
                        <div
                          key={optionIndex}
                          className="w-20 h-7 bg-gray-200 animate-pulse rounded"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Price section skeleton */}
                  <div className="flex flex-col items-end justify-start gap-1">
                    <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
                    <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
                
                {/* Quantity and delete section skeleton */}
                <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                      <div className="w-14 h-10 bg-gray-200 animate-pulse rounded" />
                      <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order summary skeleton */}
        <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3 sticky top-10">
          <div className="bg-white p-0 rounded-lg ">
            <div className="bg-white p-6 rounded-lg ">
                <div className="w-32 h-6 bg-gray-200 animate-pulse rounded mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex justify-between">
                <div className="w-12 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
                <div className="flex flex-col gap-2 pt-3">
                    <div className="w-40 h-5 bg-gray-200 animate-pulse rounded" />
                    <div className="w-full h-20 bg-gray-200 animate-pulse rounded" />
                </div>
                     <div className="flex flex-col gap-2 pt-3">
                    <div className="w-40 h-5 bg-gray-200 animate-pulse rounded" />
                    <div className="w-full h-20 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="flex flex-col gap-2 pt-3">
                    <div className="w-40 h-5 bg-gray-200 animate-pulse rounded" />
                    <div className="w-full h-20 bg-gray-200 animate-pulse rounded" />
                </div>
            </div>
            </div>
            <div className="w-full h-20 bg-gray-200 animate-pulse mt-12" />
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default CartSkeleton