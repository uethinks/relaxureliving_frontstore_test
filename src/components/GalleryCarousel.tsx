import { getStrapiUrl } from "@lib/utils"
import { useState } from "react"
import { CustomCarousel } from "./CustomCarousel"

interface GalleryItem {
  mediaUrl: string
  mediaAlternativeText: string | null
  title: string
  description: string
}

interface GalleryCarouselProps {
  items: GalleryItem[]
  slidesNum?: number
}

export function GalleryCarousel({
  items,
  slidesNum = 3,
}: GalleryCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <>
      {/* Main Image Display */}
      <img
        className="w-full h-[83.2vw] object-contain"
        src={getStrapiUrl(items[currentPage].mediaUrl)}
        alt={
          items[currentPage].mediaAlternativeText || items[currentPage].title
        }
      />

      {/* Thumbnail Carousel */}
      <CustomCarousel
        slidesPerView={slidesNum}
        autoPlay={false}
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
          setCurrentPage(i)
        }}
      />

      {/* Description */}
      <div className="w-full px-6 pt-9 pb-6 text-[#8C877C] text-sm">
        {items[currentPage].description}
      </div>
    </>
  )
}
