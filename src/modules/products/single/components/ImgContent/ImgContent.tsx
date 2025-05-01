"use client"
import React, { useState, useEffect } from "react"
import { StoreProduct } from "@medusajs/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// 导入 Swiper 样式
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "swiper/css/pagination"

interface Props {
  product: StoreProduct
  property1: "default"
}

export const ImgContent = ({ product, property1 }: Props): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const images = product.images?.map((image) => image)
  const THUMBNAILS_PER_PAGE = 6
  const MOBILE_THUMBNAILS_PER_PAGE = 4

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const isMobile = windowWidth < 1024

  return (
    <>
      <div className="flex flex-col justify-center items-center relative w-full rounded-[20px] overflow-hidden">
        {/* 主图 */}
        <div className="relative w-full">
          <div className="rounded-[20px] cursor-pointer aspect-[360/504] lg:aspect-[817/558] w-full overflow-hidden">
            <img
              src={images?.[currentImageIndex]?.url}
              alt=""
              className="w-full h-full object-cover object-center"
              onClick={handleImageClick}
            />
          </div>
        </div>

        {/* 缩略图轮播 */}
        <div className="flex py-2 justify-center items-center px-1 w-[98%] bg-[#ffffff] rounded-[20px] overflow-hidden border border-solid border-[#ffffff87] backdrop-blur-[3.3px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.3px)_brightness(100%)]">
          <div className="relative w-full">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={
                windowWidth < 1024
                  ? MOBILE_THUMBNAILS_PER_PAGE
                  : THUMBNAILS_PER_PAGE
              }
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation]}
              className="thumbs-swiper"
              loop={true}
              onSlideChange={(swiper) => {
                setCurrentImageIndex(swiper.realIndex)
              }}
            >
              {images?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={image.url}
                      alt=""
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 自定义导航按钮 */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
              onClick={() => thumbsSwiper?.slidePrev()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
              onClick={() => thumbsSwiper?.slideNext()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
              <Swiper
                spaceBetween={10}
                navigation={{
                  prevEl: ".modal-prev-button",
                  nextEl: ".modal-next-button",
                }}
                pagination={{
                  enabled: isMobile,
                  clickable: true,
                }}
                modules={[Navigation, Pagination]}
                className="modal-swiper !static w-full h-full"
                loop={true}
                initialSlide={currentImageIndex}
              >
                {images?.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="!flex items-center justify-center h-full"
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* 自定义导航按钮 - 仅在大屏显示 */}
              {!isMobile && (
                <>
                  <button className="modal-prev-button absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-3 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button className="modal-next-button absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-3 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* 关闭按钮 */}
            <button
              className="fixed top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors duration-200 z-50"
              onClick={handleCloseModal}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 20px !important;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </>
  )
}
