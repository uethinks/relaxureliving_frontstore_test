"use client"
import { formatCurrency } from "@lib/util/money"
import { StoreCart } from "@medusajs/types"

interface CheckoutOrderSummarySidePanelProps {
  cart: StoreCart | null
}

export const CheckoutOrderSummarySidePanel = ({ cart }: CheckoutOrderSummarySidePanelProps) => {
  return (
    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
      
      {cart?.items?.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-start gap-[30px] relative self-stretch w-full flex-[0_0_auto]"
        >
          {/* Order items */}
          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex w-full items-center gap-2.5 relative max-w-full">
              <div
                className={`w-full break-words relative mt-[-1.00px] 
                [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base 
                tracking-[0] leading-6 whitespace-normal overflow-wrap break-word`}
              >
                {item.quantity} x {item.variant_title}
              </div>
            </div>
            <div className="relative  [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-base tracking-[0] leading-[22.4px] whitespace-nowrap">
              {formatCurrency(item.total ?? 0)}
            </div>
          </div>
        </div>
      ))}
      <div className="relative self-stretch w-full h-0.5 bg-[#d9d9d9] rounded-[10px]" />
    </div>
  )
}
