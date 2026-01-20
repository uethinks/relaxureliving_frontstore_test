"use client"
import { useIsMobile } from "@lib/hooks/useScreenSize"
import { getStrapiUrl } from "@lib/utils"
import { useState } from "react"
import { CustomCarousel } from "./CustomCarousel"
import V2Button, { ButtonData } from "./V2Button"
import V2Headline from "./V2Headline"
import V2MediaRenderer from "./V2MediaRenderer"
import Image from "next/image"
import { FIXED_BLUR_DATA_URL } from "@modules/products/single/components/ImgContent/ImgContent"


interface GalleryItem {
  media?: any
  mediaUrl: string
  mediaAlternativeText: string | null
  title?: string
  description?: string
  button?: ButtonData
  rightButton?: ButtonData
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
  const isMobile = useIsMobile(1024)

  return (
    <>
      {/* Main Image Display */}
      <V2MediaRenderer
        media={items[current].media}
        options={{
          objectFit: "cover",
          imageOptions: {
            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
          },
        }}
      />

      {/* Thumbnail Carousel */}
      <div className={"w-full mt-2 mb-10"}>
        {items.length > 1 && (
          <CustomCarousel
            slidesPerView={items.length > 3 ? slidesNum : items.length}
            autoPlay={false}
            spaceBetween={8}
            showDots={false}
            showNav={items.length > slidesNum}
            data={items.map((item, key) => {
              const isVideo = item.media?.mime.startsWith("video/")

              return (
                <div
                  key={key}
                  className="flex items-center justify-center w-full h-[26.667vw]"
                  onClick={() => {
                    setCurrent(key)
                  }}
                >
                  {isVideo ? (
                    <V2MediaRenderer
                      media={item.media}
                      options={{
                        objectFit: "cover",
                        imageOptions: {
                          priority: key === 0,
                          sizes:
                            "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
                        },
                        videoOptions: {
                          autoplay: false,
                        },
                      }}
                    />
                  ) : (
                    <Image
                      className="w-full object-cover"
                      width={360}
                      height={300}
                      src={getStrapiUrl(item.mediaUrl) || ""}
                      alt={item.mediaAlternativeText || item.title || ""}
                      placeholder="blur"
                      blurDataURL={FIXED_BLUR_DATA_URL}
                    />
                  )}
                </div>
              )
            })}
            onChange={(i) => {
              setCurrent(i)
            }}
          />
        )}
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
                size: isMobile
                  ? items[current]?.button?.sizeMobile || "Medium"
                  : items[current]?.button?.size,
              } as any
            }
            className="w-full"
          />
          {items[current]?.rightButton && (
            <V2Button
              data={
                {
                  ...items[current].rightButton,
                  size: isMobile
                    ? items[current]?.rightButton?.sizeMobile || "Medium"
                    : items[current]?.rightButton?.size,
                } as any
              }
              className="w-full mt-4"
            />
          )}
        </div>
      )}
    </>
  )
}
