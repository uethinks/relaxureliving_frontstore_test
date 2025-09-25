import type { CraftsmanshipData } from "@/types/craftsmanship"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { GalleryCarousel } from "./GalleryCarousel"
import { ImageAccordion } from "./ImageAccordion"

interface CraftsmanshipSectionProps {
  data: CraftsmanshipData
  isMobile?: boolean
}

export function V2CraftsmanshipSection({
  data,
  isMobile = false,
}: CraftsmanshipSectionProps) {
  return (
    <section className="w-full bg-white" aria-labelledby="craftsmanship-title">
      <div className="w-full">
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
              <Markdown remarkPlugins={[remarkGfm]}>
                {data.description2}
              </Markdown>
            </div>
          </div>

          {/* Hero Subtitle */}
          <div className="text-center mb-0 lg:mb-12">
            <h2 className="text-base lg:text-2xl font-bold text-black">
              {data.subtitle}
            </h2>
          </div>
        </div>

        {/* Feature Items */}
        {isMobile ? (
          /* Mobile - 屏幕宽度小于1024px */
          <GalleryCarousel
            items={data.items.map((item) => ({
              mediaUrl: item.media.url,
              mediaAlternativeText: item.media.alternativeText,
              title: item.title,
              description: item.description,
            }))}
          />
        ) : (
          /* PC - 屏幕宽度大于等于1024px */
          <ImageAccordion items={data.items} />
        )}
      </div>
    </section>
  )
}
