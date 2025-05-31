"use client"
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
import React, { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { useRouter } from "next/navigation"

const formatDateTime = (dateString: string | Date) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
  success: boolean
}
export const PaymentFinish = ({
  order,
  success,
}: OrderCompletedTemplateProps): JSX.Element | "" => {
  const [paymentFinishShow, setPaymentFinishShow] = useState(true)
  const router = useRouter()
  const componentRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (paymentFinishShow && componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [paymentFinishShow])

  const handleExploreMore = () => {
    router.push(`/`)
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.gtag("event", "conversion", {
        send_to: "AW-17039829404/1xj5CJaY5L4aEJzTnL0_",
        value: order.total,
        currency: "USD",
        transaction_id: order.id,
      })
    }
  }, [])
  const failMessageTitle = "Order received"
  const failMessage =
    "But your payment failed. We will contact you to fix this issue within 24 hours"

  const successMessage = "Payment Completed"

  return !paymentFinishShow ? (
    ""
  ) : (
    <div
      ref={componentRef}
      className="bg-[#00000080] flex justify-center items-start w-full h-full absolute top-0 left-0 px-4 lg:px-10 z-50 pt-5"
    >
      <div className="flex flex-col w-full lg:w-[547px] items-center justify-start gap-5 p-5 relative bg-[#ffffff] rounded-[20px]">
        <div className="inline-flex flex-col items-center gap-5 relative flex-[0_0_auto]">
          <div className="relative w-[155px] h-[147px] bg-[url(https://c.animaapp.com/OZvkuZwc/img/https---lottiefiles-com-animations-item-shipped-cm0d29wrd2.gif)] bg-cover bg-[50%_50%]" />

          <div className="flex flex-col w-[361px] items-center gap-2 relative flex-[0_0_auto]">
            <div className="flex flex-col items-center justify-center gap-2.5 px-0 py-2.5 relative self-stretch flex-[0_0_auto]">
              <div className="relative w-[284px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#000000] text-[26px] text-center tracking-[0] leading-[normal]">
                {success ? successMessage : failMessageTitle}
              </div>
              {!success && (
                <div className="relative w-[284px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] text-[18px] text-center tracking-[0] leading-[normal]">
                  {failMessage}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <p className="w-[323px] opacity-[0.56] text-base text-center leading-6 relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] tracking-[0]">
                {/* We will send you an email with the delivery details */}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[20px]">
          <div className="items-start self-stretch w-full flex-[0_0_auto] flex gap-2.5 px-0 py-2.5 relative">
            <div className="relative w-[397px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#000000] text-lg tracking-[0] leading-[normal]">
              {order?.shipping_address?.first_name}{" "}
              {order?.shipping_address?.last_name}
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative self-stretch mt-[-1.00px] opacity-[0.56] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6">
              {order?.shipping_address?.address_1}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="self-stretch text-base leading-6 relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] tracking-[0]">
              {/* Expected delivery day 12 Jan 2025 */}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-center justify-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[20px_20px_0px_0px]">
              <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-5 relative flex-1 grow">
                  <div className="relative self-stretch mt-[-1.00px] opacity-[0.56] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6">
                    Amount
                  </div>
                </div>

                <div className="w-[119px] items-start justify-end flex gap-2.5 px-0 py-2.5 relative">
                  <div className="relative w-[119px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#000000] text-lg text-right tracking-[0] leading-[normal]">
                    ${order.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col justify-center p-5 bg-[#f9f9f9] flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-5 relative flex-1 grow">
                  <div className="relative self-stretch mt-[-1.00px] opacity-[0.56] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6">
                    Payment status
                  </div>
                </div>

                <div
                  className={`inline-flex items-center justify-center gap-2.5 p-1.5 relative flex-[0_0_auto] ${
                    success ? "bg-[#adebb3]" : "bg-[#ffffff]"
                  } rounded-[10px]`}
                >
                  <div
                    className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[21.6px] whitespace-nowrap ${
                      success ? "text-[#2c5630]" : "text-[#ff0000]"
                    }`}
                  >
                    {success ? "Successful" : "Failed"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[0px_0px_20px_20px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 relative self-stretch w-full">
                <div className="flex flex-col items-start gap-5 relative flex-shrink-0">
                  <div className="relative self-stretch mt-[-1.00px] opacity-[0.56] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6">
                    Order number
                  </div>
                </div>

                <div className="flex-1 w-full sm:w-auto">
                  <div className="relative w-full mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-lg tracking-[0] leading-[21.6px] break-all">
                    {order.id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex-col justify-center p-5 bg-[#f9f9f9] flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-5 relative flex-1 grow">
                  <div className="relative self-stretch mt-[-1.00px] opacity-[0.56] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6">
                    Date and time
                  </div>
                </div>

                <div className="flex justify-start gap-2.5 p-1.5 relative flex-[0_0_auto] rounded-[10px]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-lg tracking-[0] leading-[21.6px] whitespace-nowrap">
                    {formatDateTime(order.updated_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-center justify-center gap-2.5 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f9f9] rounded-[20px]">
            <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col h-[34px] items-start gap-5 relative flex-1 grow">
                <div className="self-stretch h-[23px] text-xl leading-[30px] whitespace-nowrap relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] tracking-[0]">
                  Total
                </div>
              </div>

              <div className="items-center justify-end flex-1 grow flex gap-2.5 px-0 py-2.5 relative">
                <div className="relative w-[120px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#000000] text-[22px] tracking-[0] leading-[normal]">
                  ${order.total}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <button
              onClick={handleExploreMore}
              className="all-[unset] box-border w-full flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative bg-[#072f6c] self-stretch flex-[0_0_auto]"
            >
              <div className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[#ffffff] relative font-medium whitespace-nowrap leading-6">
                Explore more
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
