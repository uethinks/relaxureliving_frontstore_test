import { getBackgroundColor } from "@lib/utils"
import V2Headline from "./V2Headline"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface TimelineItem {
  id: number
  number: string
  title: string
  description: string
  description2: string
}

interface TimelineData {
  __component: string
  id: number
  title: string
  items: TimelineItem[]
  backgroundColor: string
}

interface V2TimelineSectionProps {
  data: TimelineData
}

export function V2TimelineSection({ data }: V2TimelineSectionProps) {
  return (
    <div
      className={`w-full py-[72px] ${getBackgroundColor(data.backgroundColor)}`}
    >
      <div className="max-w-[1074px] mx-auto">
        {/* Header */}
        <div className="mb-[72px]">
          <V2Headline title={data.title} />
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-px bg-[#706C63] z-0"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6 xl:gap-8 relative z-10">
            {data.items.map((item, index) => (
              <div key={item.id} className="flex flex-col">
                {/* Step Number and Dot */}
                <div className="flex flex-col items-center mb-6 w-full">
                  <div className="text-[32px] font-bold text-[#2F2A1E] mb-5">
                    {item.number}
                  </div>
                  <div className="size-2 bg-orange-400 border-[1px] border-[#706C63] rounded-full"></div>
                </div>

                {/* Step Content */}
                <div className="text-center w-full">
                  <h3 className="text-base font-bold text-[#2F2A1E] mb-[10px] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8C877C] leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
