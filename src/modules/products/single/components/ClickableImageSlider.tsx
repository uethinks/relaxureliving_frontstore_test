"use client"

import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface ClickableImageSliderProps {
  images: { url: string }[]
  className?: string
}

export const ClickableImageSlider: React.FC<ClickableImageSliderProps> = ({
  images,
  className = "",
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const strapiCmsUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

  if (!images || images.length === 0) {
    return <></>
  }

  return (
    <>
      {/* 显示第一张图片 */}
      <div className={`relative ${className}`}>
        <img
          src={strapiCmsUrl + images[0].url}
          alt=""
          className="w-full h-full object-cover rounded-[20px] cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

        {/* 图片数量指示器 */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
            +{images.length - 1}
          </div>
        )}
      </div>

      {/* 全屏轮播弹窗 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-60 z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* 关闭按钮 */}
          <button
            onClick={() => setIsOpen(false)}
            className={`absolute top-6 right-6 z-20 w-12 h-12 bg-gray-800 bg-opacity-60 
            rounded-full flex items-center justify-center text-white hover:bg-gray-800 
            hover:bg-opacity-80 transition-colors text-xl font-bold`}
          >
            ✕
          </button>

          {/* 轮播器容器 */}
          <div
            className="w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={true}
              pagination={{ clickable: true }}
              loop={true}
              className="w-full h-full"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={strapiCmsUrl + image.url}
                      alt={`Image ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      style={{ maxHeight: "80vh" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <style jsx global>{`
        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: #f6af1f !important;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
          pointer-events: auto !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #fdce6f !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold !important;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.7 !important;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>
    </>
  )
}

export default ClickableImageSlider
