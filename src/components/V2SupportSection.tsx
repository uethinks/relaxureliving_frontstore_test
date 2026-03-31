import { MoveDownRight } from "lucide-react"

export default function V2SupportSection() {
  // Data object containing all text fields
  const data = {
    phoneNumber: "1-213-566-8658",
    email: "info@relaxureliving.com",
    businessHours: "10:00 AM – 6:00 PM EST / 6:00 AM – 2:00 PM PST (Mon–Sun)",
    chatText: "Chat in the Corner",
    helpText: "We're Here to Help",
  }

  return (
    <div className={"max-lg:px-6"}>
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

        <div className="text-xs flex justify-between">
          <a
            href={`tel:${data.phoneNumber}`}
            className="inline-flex items-center underline px-0 text-black gap-1 text-xs"
          >
            <img src="/img/telephone.svg" alt="phone" className="w-4 h-4" />
            {data.phoneNumber}
          </a>
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center underline px-0 text-black gap-1 text-xs"
          >
            <img src="/img/mailbox.svg" alt="phone" className="w-4 h-4" />
            {data.email}
          </a>
        </div>
      </div>
      <div
        className="flex w-full items-center justify-center gap-1 mt-4 text-sm cursor-pointer"
        onClick={() => {
          ;(window as any).tidioChatApi.open()
        }}
      >
        {/* <MessageCircle className="h-4 w-4" /> */}
        <span>{data.chatText}</span>
        {/* <ChevronDown className="h-4 w-4" /> */}
        <MoveDownRight className="h-4 w-4" />
      </div>
    </div>
  )
}
