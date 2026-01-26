"use client"

import type { CraftsmanshipData } from "@/types/craftsmanship"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useEffect, useState } from "react"
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
  // 添加客户端渲染状态管理，避免水合错误
  const [isClient, setIsClient] = useState(false)
  const [clientIsMobile, setClientIsMobile] = useState(isMobile)

  useEffect(() => {
    // 客户端水合完成后更新状态
    setIsClient(true)
    setClientIsMobile(isMobile)
  }, [isMobile])

  return (
    <section className="w-full bg-white" aria-labelledby="craftsmanship-title">
      <div className="w-full">
        {/* Section Body */}
        <div className="px-6 lg:px-0 py-8 lg:py-0">
          {/* Hero Content */}
          <div className="text-center mt-8 lg:mt-16 mb-3 lg:mb-5">
            {/* Hero title */}
            <h2
              id="craftsmanship-title"
              className="text-2xl lg:text-h2 font-bold text-black mb-2.5 lg:mb-6 leading-tight"
            >
              {data.title}
            </h2>
            {/* Hero description */}
            <div className="w-full lg:max-w-[1074px] lg:mx-auto text-[#8C877C] text-sm lg:text-lg mb-2.5 lg:mb-0">
              <Markdown remarkPlugins={[remarkGfm]}>
                {data.description2}
              </Markdown>
            </div>
          </div>

          {/* Hero Subtitle */}
          <div className="text-center mb-0 lg:mb-12">
            <h3 className="text-base lg:text-2xl font-bold text-black">
              {data.subtitle}
            </h3>
          </div>
        </div>

        {/* Feature Items */}
        {!isClient ? (
          /* 服务器端渲染和首次客户端渲染 - 使用传入的isMobile值 */
          isMobile ? (
            <GalleryCarousel
              items={data.items.map((item) => ({
                media: item.media,
                mediaUrl: item.media.url,
                mediaAlternativeText: item.media.alternativeText || item.title,
                description: item.description,
              }))}
            />
          ) : (
            <ImageAccordion items={data.items} />
          )
        ) : (
          /* 客户端水合完成后 - 使用客户端状态 */
          clientIsMobile ? (
            <GalleryCarousel
              items={data.items.map((item) => ({
                media: item.media,
                mediaUrl: item.media.url,
                mediaAlternativeText: item.media.alternativeText || item.title,
                description: item.description,
              }))}
            />
          ) : (
            <ImageAccordion items={data.items} />
          )
        )}
      </div>
    </section>
  )
}
