"use client"
import { Image as ImageType } from "@/types/global"
import React, { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import type { Swiper as SwiperType } from "swiper"
import { FreeMode, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useProductSelection } from "../ProductSelectionContext"

// 导入 Swiper 样式
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import { getStrapiUrl } from "@lib/utils"

interface Props {
  productImages: ImageType[]
}

// 精确的图片尺寸常量
const MAIN_IMAGE_DIMENSIONS = {
  mobile: { width: 375, height: 187 },
  desktop: { width: 708, height: 354 }
} as const

const THUMBNAIL_DIMENSIONS = { width: 100, height: 100 } as const

// 固定的浅灰色占位符 - 确保服务端和客户端一致性
const FIXED_BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzA4IiBoZWlnaHQ9IjM1NCIgdmlld0JveD0iMCAwIDcwOCAzNTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI3MDgiIGhlaWdodD0iMzU0IiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo="

export const ImgContent = ({ productImages }: Props): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [modalSwiper, setModalSwiper] = useState<SwiperType | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<number>>(new Set())
  const THUMBNAILS_PER_PAGE = 6
  const MOBILE_THUMBNAILS_PER_PAGE = 4
  const strapiCmsAssetUrl = process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL

  // Intersection Observer refs for lazy loading
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([])

  // 使用 Context 获取状态
  const { selectedSize, selectedColor, selectedStyle } = useProductSelection()

  // Intersection Observer hook for lazy loading
  const useIntersectionObserver = useCallback((ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            callback()
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => observer.disconnect()
    }, [ref, callback])
  }, [])

  // 图片优化工具函数 - 优化版本，改善LCP
  const getOptimizedImageProps = useCallback((image: ImageType, isMain: boolean = false) => {
    const baseUrl = getStrapiUrl(image.url)
    console.log("getOptimizedImageProps baseUrl", baseUrl)
    
    // 使用响应式尺寸，改善LCP
    const dimensions = isMain 
      ? MAIN_IMAGE_DIMENSIONS.desktop
      : THUMBNAIL_DIMENSIONS
    
    return {
      src: baseUrl,
      alt: (image as any).alternativeText || image.caption || "产品图片",
      width: dimensions.width,
      height: dimensions.height,
      priority: isMain, // 主图优先加载
      placeholder: "blur" as const,
      blurDataURL: FIXED_BLUR_DATA_URL,
      quality: isMain ? 95 : 75, // 提高主图质量
      sizes: isMain 
        ? "(max-width: 768px) 100vw, (max-width: 1200px) 708px, 708px"
        : "(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw",
      loading: isMain ? "eager" as const : "lazy" as const, // 主图立即加载
      onError: (error: any) => {
        console.warn(`Image load error for ${baseUrl}:`, error)
      }
    }
  }, [strapiCmsAssetUrl])

  // 根据选中的选项筛选图片
  const filteredImages = React.useMemo(() => {
    if (!selectedSize && !selectedColor && !selectedStyle) {
      return productImages
    }

    const selectedValues = [
      selectedSize?.value,
      selectedColor?.value,
      selectedStyle?.value,
    ].filter(Boolean)

    return (
      //productImages?.sort((a, b) => a.id - b.id).filter((image) => {
      productImages?.filter((image) => {
        if (!image.caption) {
          return true
        }

        const caption = image.caption.toLowerCase()
        // 检查是否包含 "all"
        if (caption.includes("all")) {
          return true
        }

        // 检查是否同时包含所有选中的值
        return selectedValues.every((value) => {
          if (!value) {
            return true // 如果没有选择该参数，则不参与过滤
          }
          const matchesValue = caption.includes(value.toLowerCase())
          return matchesValue
        })
      }) || []
    )
  }, [productImages, selectedSize, selectedColor, selectedStyle])

  console.log('filteredImages', filteredImages)

  // 当筛选后的图片变化时，重置当前图片索引
  useEffect(() => {
    if (
      filteredImages.length > 0 &&
      currentImageIndex >= filteredImages.length
    ) {
      setCurrentImageIndex(0)
    }
  }, [filteredImages, currentImageIndex])

  // 处理键盘事件
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      if (isModalOpen) {
        modalSwiper?.slidePrev()
      } else {
        setCurrentImageIndex((prev) =>
          prev === 0 ? productImages.length - 1 : prev - 1
        )
      }
    } else if (e.key === "ArrowRight") {
      if (isModalOpen) {
        modalSwiper?.slideNext()
      } else {
        setCurrentImageIndex((prev) =>
          prev === productImages.length - 1 ? 0 : prev + 1
        )
      }
    }
  }

  // 监听窗口大小变化
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 始终监听键盘事件
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isModalOpen, modalSwiper, thumbsSwiper])

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const isMobile = windowWidth < 1024

  // 性能监控 - 仅在客户端执行
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP detected:', entry.startTime, 'ms')
        }
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.log('CLS detected:', (entry as any).value)
        }
      }
    })
    observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] })
    
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="flex flex-col justify-center items-center relative w-full overflow-hidden">
        {/* 主图 */}
        <div className="relative w-full">
          <div 
            className="cursor-pointer w-full overflow-hidden"
            style={{ 
              aspectRatio: isMobile ? '375/187' : '708/354',
              minHeight: isMobile ? '187px' : '354px'
            }}
          >
            {filteredImages.length > 0 ? (
              <Image
                unoptimized
                {...getOptimizedImageProps(filteredImages[currentImageIndex], true)}
                className="w-full h-full object-cover object-center"
                onClick={handleImageClick}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  No images found
                  <br />
                  <span className="text-sm">
                    Please select other size, color or style
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 缩略图轮播 */}
        {filteredImages.length > 0 && (
          <div
            className={`flex py-5 justify-center items-center w-full
          overflow-hidden`}
            style={{ height: '150px' }} // 稳定缩略图容器高度
          >
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
                {filteredImages?.map((image, index) => {
                  const thumbnailRef = useRef<HTMLDivElement>(null)
                  
                  // 为每个缩略图设置延迟加载
                  useIntersectionObserver(thumbnailRef, () => {
                    if (!loadedThumbnails.has(index)) {
                      setLoadedThumbnails(prev => new Set([...Array.from(prev), index]))
                    }
                  })

                  return (
                    <SwiperSlide
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setCurrentImageIndex(index)}
                    >
                    <div 
                      className="overflow-hidden relative"
                      style={{ 
                        aspectRatio: '1/1',
                        // width: '100px',
                        // height: '100px',
                        minWidth: '100px',
                        minHeight: '100px'
                      }}
                      ref={thumbnailRef}
                    >
                        {/* 占位符 */}
                        {!loadedThumbnails.has(index) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                          </div>
                        )}
                        
                        {/* 实际图片 - 只在进入视口时加载 */}
                        {loadedThumbnails.has(index) && (
                          <Image
                            unoptimized
                            {...getOptimizedImageProps(image, false)}
                            src={getStrapiUrl(image.formats.small.url) ?? image.formats.small.url}
                            className="w-full h-full object-cover object-center transition-opacity duration-300 opacity-100"
                            onError={() => {
                              console.warn(`Failed to load thumbnail ${index}`)
                            }}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>

              {/* 自定义导航按钮 */}
              <button
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-black/50 
                   p-2 w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110`}
                onClick={() => thumbsSwiper?.slidePrev()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-black"
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
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-black/50 
                  p-2 w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110`}
                onClick={() => thumbsSwiper?.slideNext()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-black"
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
        )}
      </div>

      {/* 模态框 */}
      {isModalOpen && filteredImages.length > 0 && (
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
                onSwiper={setModalSwiper}
              >
                {filteredImages?.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="!flex items-center justify-center h-full"
                  >
                    <Image
                      unoptimized
                      {...getOptimizedImageProps(image, false)}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      priority={index === currentImageIndex}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* 自定义导航按钮 - 仅在大屏显示 */}
              {!isMobile && (
                <>
                  <button
                    className={`modal-prev-button absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 
                    p-3 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110`}
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
                    className={`modal-next-button absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 
                    p-3 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110`}
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
