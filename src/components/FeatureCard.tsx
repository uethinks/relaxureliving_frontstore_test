import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { RainResistanceItem } from "@/types/rainResistance"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import V2Headline from "./V2Headline"
import V2Button from "./V2Button"
import V2MediaRenderer from "./V2MediaRenderer"

interface FeatureCardProps {
  item: RainResistanceItem
  textColor?: string
  index: number
}

export function FeatureCard({ item, index }: FeatureCardProps) {
  const isReversed = item.mediaPosition === "Left"
  console.log("item", item)

  return (
    <section className={`${getBackgroundColor(item.backgroundColor)}`}>
      <div className="relative">
        {/* Content */}
        <div
          className={`absolute max-w-[1074px] mx-auto left-0 right-0 my-auto top-0 bottom-0 grid lg:grid-cols-2 items-center ${
            isReversed ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          <div
            className={`flex  top-0 ${
              isReversed ? "lg:col-start-2 justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start gap-4 w-[436px]">
              <div className="flex-1 flex flex-col gap-10 items-start">
                <V2Headline title={item.title} />
                <div
                  className={`leading-relaxed mb-6 prose prose-lg max-w-none`}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                {item.button && (
                  <div className="flex justify-between gap-4">
                    {item.button && <V2Button data={item.button as any} />}
                    {item.rightButton && (
                      <V2Button data={item.rightButton as any} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div
          className={`grid lg:grid-cols-2 items-center ${
            isReversed ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          <div></div>

          {/* Image */}
          <div className={`relative ${isReversed ? "lg:col-start-1" : ""}`}>
            <div className="relative w-full h-auto overflow-hidden">
              {item.media && (
                <V2MediaRenderer
                  media={item.media}
                  options={{
                    objectFit: "cover",
                    imageOptions: {
                      priority: index === 0,
                      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
