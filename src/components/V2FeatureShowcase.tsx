import { FeatureCard } from "@/components/FeatureCard"
import type { RainResistanceBlock } from "@/types/rainResistance"
import { getBackgroundColor } from "@lib/utils"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { GalleryCarousel } from "./GalleryCarousel"

interface RainResistanceBlockProps {
  data: RainResistanceBlock
  isMobile?: boolean
}

export function V2FeatureShowcase({
  data,
  isMobile = false,
}: RainResistanceBlockProps) {
  console.log("V2FeatureShowcase data", data)
  return (
    <div className={`w-full ${getBackgroundColor(data.backgroundColor)}`}>
      {/* Section Body */}
      {(data.title || data.description) && (
        <div className="px-6 lg:px-0 py-8 lg:py-20">
          {/* Hero Content */}
          <div className="text-center">
            {/* Hero title */}
            <h1
              id="craftsmanship-title"
              className="w-full lg:max-w-[1074px] lg:mx-auto text-2xl lg:text-h2 font-bold text-black leading-tight"
            >
              {data.title}
            </h1>
            {/* Hero description */}
            <div className="w-full lg:max-w-[1074px] lg:mx-auto text-[#8C877C] text-sm lg:text-lg mt-[10px] lg:mt-5">
              <Markdown remarkPlugins={[remarkGfm]}>
                {data.description}
              </Markdown>
            </div>
          </div>
        </div>
      )}

      {/* Feature Sections */}
      {isMobile ? (
        <GalleryCarousel
          items={data.items.map((item) => ({
            media: item.media,
            mediaUrl: item.media.url,
            mediaAlternativeText: item.media.alternativeText,
            title: item.title,
            description: item.description,
            button: item.button,
          }))}
        />
      ) : (
        <div className="flex flex-col">
          {data.items.map((item, index) => (
            <FeatureCard
              key={item.id}
              item={item}
              textColor={index % 2 === 0 ? "text-[#140e02]" : "text-white"}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
