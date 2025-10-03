import { getBackgroundColor } from "@lib/utils"
import React, { useEffect, useRef, useState } from "react"
import V2Headline from "./V2Headline"

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
      className={`w-full pt-8 pb-12 lg:py-[72px] ${getBackgroundColor(
        data.backgroundColor
      )}`}
    >
      <div className="lg:max-w-[1074px] mx-auto">
        {/* Header */}
        <div className="mb-5 max-lg:px-6 lg:mb-[72px]">
          <V2Headline title={data.title} className={"max-lg:text-2xl"} />
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on larger screens */}
          <div className="absolute top-[47px] left-0 right-0 h-px bg-[#706C63] z-0"></div>

          {/* Steps Grid */}
          <ScrollRow>
            {data.items.map((item, index) => (
              <div key={item.id} className="flex flex-col">
                {/* Step Number and Dot */}
                <div className="flex flex-col items-center mb-6 w-full">
                  <div className="text-base lg:text-[32px] font-bold text-[#2F2A1E] mb-5">
                    0{item.number}
                  </div>
                  <div className="size-2 bg-primary border-[1px] border-[#706C63] rounded-full"></div>
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
          </ScrollRow>
        </div>
      </div>
    </div>
  )
}

interface ScrollRowProps {
  children: React.ReactNode
}

const ScrollRow: React.FC<ScrollRowProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const scrollArea = scrollRef.current
    if (!scrollArea) return

    const handleScroll = () => {
      const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth
      const percent = maxScroll > 0 ? scrollArea.scrollLeft / maxScroll : 0
      setScrollPercent(percent)
    }

    scrollArea.addEventListener("scroll", handleScroll)
    return () => scrollArea.removeEventListener("scroll", handleScroll)
  }, [])

  // 轨道宽度 - 滑块宽度
  const trackWidth = 240 - 120

  return (
    <div className="relative w-full">
      {/* 可横向滚动区域 */}
      <div
        ref={scrollRef}
        className="grid max-lg:grid-flow-col max-lg:auto-cols-[50vw] max-lg:overflow-auto lg:grid-cols-6 lg:gap-6 xl:gap-8 relative z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* 自定义滚动条 */}
      <div className="lg:hidden mt-5 mx-auto w-[240px] h-[1px] bg-[#EFEEEB]">
        <div
          ref={thumbRef}
          className="h-[1px] w-[120px] bg-black transition-transform duration-100"
          style={{ transform: `translateX(${scrollPercent * trackWidth}px)` }}
        />
      </div>
    </div>
  )
}

export default ScrollRow
