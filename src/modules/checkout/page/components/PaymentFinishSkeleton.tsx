import React from "react"

export const PaymentFinishSkeleton = (): JSX.Element => {
  return (
    <div className="flex justify-center items-start w-full px-4 lg:px-0">
      <div className="flex flex-col w-full lg:w-[547px] items-center justify-start gap-5 p-5 relative bg-[#ffffff] rounded-[20px] shadow-lg">
        
        {/* Success animation and message section */}
        <div className="inline-flex flex-col items-center gap-5 relative flex-[0_0_auto]">
          {/* Animation placeholder */}
          <div className="relative w-[155px] h-[147px] bg-gray-200 animate-pulse rounded-[20px]" />
          
          {/* Message section */}
          <div className="flex flex-col w-[361px] items-center gap-2 relative flex-[0_0_auto]">
            <div className="flex flex-col items-center justify-center gap-2.5 px-0 py-2.5 relative self-stretch flex-[0_0_auto]">
              {/* Main title */}
              <div className="w-[284px] h-[31px] bg-gray-200 animate-pulse rounded mt-[-1.00px]" />
            </div>
            
            {/* Subtitle area */}
            <div className="flex items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[323px] h-[24px] bg-gray-100 animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Address Info Section */}
        <div className="flex flex-col items-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[20px]">
          {/* Name */}
          <div className="items-start self-stretch w-full flex-[0_0_auto] flex gap-2.5 px-0 py-2.5 relative">
            <div className="w-[200px] h-[21px] bg-gray-200 animate-pulse rounded" />
          </div>

          {/* Address */}
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="w-[300px] h-[24px] bg-gray-200 animate-pulse rounded" />
          </div>

          {/* Delivery info */}
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="w-[180px] h-[24px] bg-gray-200 animate-pulse rounded" />
          </div>
        </div>

        {/* Order Details Section */}
        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
          {/* Amount and Payment Status */}
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            {/* Amount */}
            <div className="flex flex-col items-center justify-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[20px_20px_0px_0px]">
              <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-5 relative flex-1 grow">
                  <div className="w-[60px] h-[24px] bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="w-[119px] items-start justify-end flex gap-2.5 px-0 py-2.5 relative">
                  <div className="w-[100px] h-[21px] bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="flex-col justify-center p-5 bg-[#f9f9f9] flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-5 relative flex-1 grow">
                  <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="w-[80px] h-[27px] bg-gray-200 animate-pulse rounded-[10px]" />
              </div>
            </div>

            {/* Order Number */}
            <div className="flex flex-col items-center justify-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[0px_0px_20px_20px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 relative self-stretch w-full">
                <div className="flex flex-col items-start gap-5 relative flex-shrink-0">
                  <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <div className="w-[200px] h-[21px] bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex-col justify-center p-5 bg-[#f9f9f9] flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-5 relative flex-1 grow">
                  <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="flex justify-start gap-2.5 p-1.5 relative flex-[0_0_auto] rounded-[10px]">
                  <div className="w-[150px] h-[21px] bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total and Button Section */}
        <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]">
          {/* Total */}
          <div className="flex flex-col items-center justify-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[20px]">
            <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col h-[34px] items-start gap-5 relative flex-1 grow">
                <div className="w-[50px] h-[30px] bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="items-center justify-end flex-1 grow flex gap-2.5 px-0 py-2.5 relative">
                <div className="w-[120px] h-[26px] bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>

          {/* Explore More Button */}
          <div className="flex items-center justify-end gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="w-full h-[48px] bg-gray-200 animate-pulse rounded-[10px]" />
          </div>
        </div>
      </div>
    </div>
  )
}