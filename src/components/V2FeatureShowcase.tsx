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
      <div className="px-6 lg:px-0 py-8 lg:py-0">
        {/* Hero Content */}
        <div className="text-center mt-8 lg:mt-16 mb-3 lg:mb-5">
          {/* Hero title */}
          <h1
            id="craftsmanship-title"
            className="text-2xl lg:text-h2 font-bold text-black mb-2.5 lg:mb-6 leading-tight"
          >
            {data.title}
          </h1>
          {/* Hero description */}
          <div className="w-full lg:max-w-[1074px] lg:mx-auto text-[#8C877C] text-sm lg:text-lg mb-2.5 lg:mb-0">
            <Markdown remarkPlugins={[remarkGfm]}>{data.description}</Markdown>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      {isMobile ? (
        <GalleryCarousel
          items={data.items.map((item) => ({
            mediaUrl: item.media.url,
            mediaAlternativeText: item.media.alternativeText,
            title: item.title,
            description: item.description,
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
