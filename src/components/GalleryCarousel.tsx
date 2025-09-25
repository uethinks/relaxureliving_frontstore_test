import { getStrapiUrl } from "@lib/utils"
import { useState } from "react"
import { CustomCarousel } from "./CustomCarousel"
import V2Button, { ButtonData } from "./V2Button"
import V2Headline from "./V2Headline"

interface GalleryItem {
  mediaUrl: string
  mediaAlternativeText: string | null
  title?: string
  description?: string
  button?: ButtonData
}

interface GalleryCarouselProps {
  items: GalleryItem[]
  slidesNum?: number
}

export function GalleryCarousel({
  items,
  slidesNum = 3,
}: GalleryCarouselProps) {
  const [current, setCurrent] = useState(0)

  return (
    <>
      {/* Main Image Display */}
      <img
        className="w-full h-[83.2vw] object-contain"
        src={getStrapiUrl(items[current].mediaUrl)}
        alt={items[current].mediaAlternativeText || items[current].title}
      />

      {/* Thumbnail Carousel */}
      <div className={"w-full mb-10"}>
        <CustomCarousel
          slidesPerView={slidesNum}
          autoPlay={items.length > slidesNum}
          spaceBetween={8}
          showDots={false}
          showNav={items.length > slidesNum}
          data={items.map((item, key) => (
            <div
              key={key}
              className="flex items-center justify-center w-full h-[26.667vw]"
            >
              <img
                className="w-full"
                src={getStrapiUrl(item.mediaUrl)}
                alt={item.mediaAlternativeText || item.title}
              />
            </div>
          ))}
          onChange={(i) => {
            setCurrent(i)
          }}
        />
      </div>

      {/* Title */}
      {items[current]?.title && (
        <div className="w-full px-6 mb-5">
          <V2Headline title={items[current]?.title || ""} />
        </div>
      )}

      {/* Description */}
      {items[current].description && (
        <div className="w-full px-6 mb-10 text-[#8C877C] text-sm">
          {items[current]?.description}
        </div>
      )}

      {/* Link */}
      {items[current].button && (
        <div className="w-full px-6 mb-10">
          <V2Button
            data={
              {
                ...items[current].button,
                size:
                  items[current]?.button?.sizeMobile ||
                  items[current]?.button?.size,
              } as any
            }
            className="w-full"
          />
        </div>
      )}
    </>
  )
}
