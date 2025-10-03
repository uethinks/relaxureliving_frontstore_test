"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CustomCarousel } from "./CustomCarousel"
import V2Button from "./V2Button"
import V2MediaRenderer from "./V2MediaRenderer"

// 添加IconData接口
interface IconData {
  id: number
  documentId: string
  url: string
}

interface GuideItem {
  id: number
  title: string
  description: string | null
  description2: string | null
  icon: IconData | null
}

interface GuideStep {
  id: number
  topic: string
  title: string
  items: GuideItem[]
}

interface GuideButton {
  id: number
  type: string
  size: string | null
  text: string
  link: string
  iconHidden: boolean
  icon: string | null
}

interface PergolaGuideData {
  __component: string
  id: number
  title: string
  subtitle: string
  items: GuideStep[]
  button: GuideButton
  backgroundColor?: string
}

interface PergolaGuideProps {
  data: PergolaGuideData
  isMobile?: boolean
}

function CardItem({ step }: { step: GuideStep }) {
  return (
    <Card
      key={step.id}
      className="bg-white border-l-2 border-primary border-t-0 border-r-0 border-b-0 shadow-sm"
    >
      <CardContent className="px-6 py-5 sm:p-8">
        <div className="mb-5">
          <h3 className="text-sm font-medium text-[#2F2A1E] tracking-wide">
            {step.topic}
          </h3>
          <h2 className="text-base font-bold text-[#140E02] text-balance">
            {step.title}
          </h2>
        </div>

        <div className="space-y-2">
          {step.items.map((item) => {
            // Parse the title to extract the main title and description

            return (
              <div
                key={item.id}
                className="flex justify-start items-center gap-3"
              >
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-start">
                  {/* 动态渲染图标 */}
                  {item.icon ? (
                    <V2MediaRenderer
                      media={item.icon as any}
                      options={{
                        objectFit: "contain",
                        type: "icon",
                        className: "w-6 h-6 sm:w-8 sm:h-8"
                      }}
                    />
                  ) : null}
                  {/* 默认图标fallback */}
                </div>
                <div className="flex-1 min-w-0 flex items-center">
                  {item.description2 && (
                    <div className="text-[#8c877c] text-sm leading-tight">
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        // rehypePlugins={[rehypeRaw]}
                        remarkRehypeOptions={{
                          passThrough: ["link"],
                        }}
                      >
                        {item.description2}
                      </Markdown>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function PergolaGuide({
  data,
  isMobile = false,
}: PergolaGuideProps) {
  console.log("PergolaGuide data", data)
  const [carouselData, setCarouselData] = useState<React.ReactNode[]>([])

  useEffect(() => {
    if (!data || !data.items) {
      return
    }
    if (isMobile) {
      // 屏幕宽度小于1024px时，将两个item包裹在一个div中
      const groupedData: React.ReactNode[] = []
      for (let i = 0; i < data.items.length; i += 2) {
        const pair = data.items.slice(i, i + 2)
        groupedData.push(
          <div key={i} className="w-full flex flex-col gap-[10px] px-6">
            {pair.map((step) => (
              <CardItem key={step.id} step={step} />
            ))}
          </div>
        )
      }
      setCarouselData(groupedData)
    }
  }, [isMobile, data])

  return (
    <div
      className={`${getBackgroundColor(
        data.backgroundColor
      )} pb-12 lg:py-24 w-full`}
    >
      <div className="w-full lg:max-w-[1074px] mx-auto">
        {/* Header */}
        <div className="text-center max-lg:px-6 max-lg:pt-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2f2a1e] mb-4 sm:mb-6 text-balance">
            {data.title}
          </h1>
          <p className="text-[#8c877c] text-base sm:text-lg leading-relaxed max-w-4xl mx-auto text-pretty">
            {data.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="lg:grid lg:gap-6 lg:grid-cols-2 mt-6 mb-2 lg:mb-20">
          {isMobile ? (
            <CustomCarousel data={carouselData} showNav={false} />
          ) : (
            data.items.map((step) => <CardItem key={step.id} step={step} />)
          )}
        </div>

        {/* CTA Button */}
        {data.button && (
          <div className={"text-center max-lg:w-full max-lg:px-6"}>
            <V2Button
              data={data.button as any}
              className="max-lg:whitespace-normal max-lg:break-words max-lg:w-full max-lg:h-auto max-lg:px-6"
            />
          </div>
        )}
      </div>
    </div>
  )
}
