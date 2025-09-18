import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import V2Button from "./V2Button"

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
}

export default function PergolaGuide({ data }: PergolaGuideProps) {
  console.log("PergolaGuide data", data)
  return (
    <div className={`${getBackgroundColor(data.backgroundColor)} py-24 w-full`}>
      <div className="max-w-[1074px] mx-auto"> 
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2f2a1e] mb-4 sm:mb-6 text-balance">
            {data.title}
          </h1>
          <p className="text-[#8c877c] text-base sm:text-lg leading-relaxed max-w-4xl mx-auto text-pretty">
            {data.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:gap-8 mb-8 sm:mb-12 md:grid-cols-2 lg:gap-10">
          {data.items.map((step) => (
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
                            <img
                              src={getStrapiUrl(item.icon.url)}
                              alt={item.title}
                              className="w-6 h-6 sm:w-8 sm:h-8"
                            />
                          ) : null}
                          {/* 默认图标fallback */}
                        </div>
                        <div className="flex-1 min-w-0 flex items-center">
                          {item.title && (
                            <p className="text-[#8c877c] text-sm leading-tight">
                              {item.title}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
          
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <V2Button data={data.button as any} />
        </div>
      </div>
    </div>
  )
}
