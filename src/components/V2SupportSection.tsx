import React from "react"
import { Button } from "@/components/ui/button"
import { MoveDownRight } from "lucide-react"

export default function V2SupportSection() {
  // Data object containing all text fields
  const data = {
    phoneNumber: "1-213-566-8658",
    email: "info@relaxureliving.com",
    businessHours: "9AM to 5PM PST Mon-Fri",
    chatText: "Chat in the Corner",
    helpText: "We're Here to Help",
  }

  return (
    <>
      {/* Support Section */}
      <div className={`px-8 py-5 w-full mt-5 border border-[#8C877C]`}>
        <div className="w-full">
          <div className="flex items-center gap-4">
            <span className="bg-[#ffbf3c] p-1">
              <img src="/img/expert.svg" alt="message" className="w-7 h-7" />
            </span>
            <div className="text-[#000000] text-base">
              <p className="font-medium">{data.helpText}</p>
              <p className="font-medium text-[#8C877C] text-xs">
                {data.businessHours}
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm flex justify-between">
          <Button variant="link" className="underline px-0 text-black">
            <img src="/img/telephone.svg" alt="phone" className="w-4 h-4" />
            {data.phoneNumber}
          </Button>
          <Button variant="link" className="underline px-0 text-black">
            <img src="/img/mailbox.svg" alt="phone" className="w-4 h-4" />
            {data.email}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 mt-4 text-sm">
        {/* <MessageCircle className="h-4 w-4" /> */}
        <span>{data.chatText}</span>
        {/* <ChevronDown className="h-4 w-4" /> */}
        <MoveDownRight className="h-4 w-4" />
      </div>
    </>
  )
}
