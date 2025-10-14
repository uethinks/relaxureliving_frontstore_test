"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Zoom } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/zoom"
import { getStrapiUrl } from "@lib/utils"

interface ImageSliderProps {
  images: { url: string }[]
  className?: string
}

export const ImageSlider = ({
  images,
  className = "",
}: ImageSliderProps): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 预加载图片
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image()
      img.src = getStrapiUrl(image.url) ?? image.url
      img.onload = () => {
        setLoadedImages((prev) => new Set([...Array.from(prev), index]))
      }
    })
  }, [images])

  return (
    <div
      className={`
        relative w-full mx-auto 
        ${
          isMobile
            ? "aspect-[360/300] max-w-[360px]"
            : "aspect-[466/546] max-w-[466px]"
        }
        ${className}
      `}
    >
      <Swiper
        modules={[Navigation, Pagination, Zoom]}
        navigation={!isMobile}
        pagination={{
          clickable: true,
        }}
        zoom={{
          maxRatio: 3,
          minRatio: 1,
          toggle: true,
        }}
        loop={images.length >= 6}
        className="h-full rounded-[20px] select-none"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="rounded-[20px] overflow-hidden">
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent animate-spin" />
              </div>
            )}
            <div className="swiper-zoom-container h-full flex items-center justify-center">
              <img
                src={getStrapiUrl(image.url) ?? image.url}
                alt=""
                className={`w-full h-full !object-cover rounded-[20px] transition-opacity duration-300 ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                style={{
                  maxWidth: isMobile ? "360px" : "466px",
                  maxHeight: isMobile ? "300px" : "546px",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .swiper-slide {
          overflow: hidden;
        }

        .swiper-slide img {
        }

        .swiper-button-next,
        .swiper-button-prev {
          width: 36px !important;
          height: 36px !important;
          background: rgba(255, 255, 255, 0.7) !important;
          border-radius: 18px !important;
          border: 1px solid rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(29.4px) !important;
          -webkit-backdrop-filter: blur(29.4px) !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.9) !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
          color: #343a40 !important;
        }

        .swiper-pagination {
          bottom: 16px !important;
        }

        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 9999px !important;
          opacity: 1 !important;
          margin: 0 4px !important;
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
          width: 16px !important;
          background: #fff !important;
        }

        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
