"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect, memo, useCallback, useMemo } from "react"
import Image from "next/image"
import { getStrapiUrl } from "@lib/utils"
import { FIXED_BLUR_DATA_URL } from "@modules/products/single/components/ImgContent/ImgContent"
import type { Swiper as SwiperType } from "swiper"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';


// 导入 Swiper 样式
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Media {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: {
    small?: any
    xsmall?: any
    thumbnail?: any
  } | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface ImageGalleryContextType {
  isOpen: boolean
  images: Media[]
  openImageGallery: (images: Media[], startIndex?: number) => void
  closeImageGallery: () => void
}

// 图片画廊模态框组件的 props 接口
interface ImageGalleryModalProps {
  images: Media[]
  startIndex: number
  onClose: () => void
}

const ImageGalleryContext = createContext<ImageGalleryContextType | null>(null)

// 图片画廊模态框组件 - 使用 memo 优化性能
const ImageGalleryModal = memo<ImageGalleryModalProps>(({ 
  images, 
  startIndex, 
  onClose
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // 从 context 获取外部 isOpen 状态
  const context = useContext(ImageGalleryContext)
  const externalIsOpen = context?.isOpen || false

  // 同步 startIndex 到内部 currentIndex
  useEffect(() => {
    setCurrentIndex(startIndex)
  }, [startIndex])

  // 同步外部 isOpen 状态到内部状态
  useEffect(() => {
    setIsOpen(externalIsOpen)
  }, [externalIsOpen])

  // 响应式检测
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (swiperInstance) {
          swiperInstance.slidePrev()
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (swiperInstance) {
          swiperInstance.slideNext()
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, swiperInstance, onClose])

  const handleSwiperChange = useCallback((swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex)
  }, [])

  const handlePrevClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (swiperInstance) {
      swiperInstance.slidePrev()
    }
  }, [swiperInstance])

  const handleNextClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (swiperInstance) {
      swiperInstance.slideNext()
    }
  }, [swiperInstance])

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 bg-[#000000]/90 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] flex items-center justify-center"
      >
        {/* 关闭按钮 */}
        {!isMobile && (
          <button
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-black text-xl font-bold z-10 transition-all duration-200"
            aria-label="关闭"
            onClick={onClose}
          >
            ×
          </button>
        )}

        {/* Swiper 图片画廊 */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Swiper
            spaceBetween={10}
            navigation={{
              prevEl: ".gallery-prev-button",
              nextEl: ".gallery-next-button",
            }}
            pagination={isMobile && images.length > 1 ? {
              clickable: true,
            }: false}
            modules={[Navigation, Pagination]}
            className="gallery-swiper !static w-full h-full"
            loop={images.length > 1}
            initialSlide={currentIndex}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSwiperChange}
          >
            {images.map((image, index) => {
              const imageUrl = getStrapiUrl(image.url)
              return imageUrl ? (
                <SwiperSlide
                  key={index}
                  className="!flex items-center justify-center h-full"
                >
                  <Image
                    unoptimized
                    src={imageUrl}
                    alt={image?.alternativeText || image?.name || ''}
                    width={image?.width || 1920}
                    height={image?.height || 1080}
                    blurDataURL={FIXED_BLUR_DATA_URL}
                    placeholder="blur"
                    className="max-w-[90vw] md:max-w-[60vw] h-auto object-contain bg-white"
                    priority={index === currentIndex}
                  />
                </SwiperSlide>
              ) : null
            })}
          </Swiper>

          {/* 自定义导航按钮 - 仅在大屏显示 */}
          {!isMobile && images.length > 1 && (
            <>
              <button
                className="gallery-prev-button absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-xl font-bold z-10 transition-all duration-200"
                aria-label="上一张"
                onClick={handlePrevClick}
              >
                ‹
              </button>

              <button
                className="gallery-next-button absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-xl font-bold z-10 transition-all duration-200"
                aria-label="下一张"
                onClick={handleNextClick}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* 图片计数器 */}
        {!isMobile && images.length > 1 && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
})

ImageGalleryModal.displayName = 'ImageGalleryModal'

// 独立的图片画廊管理器组件
export const ImageGalleryManager = memo(() => {
  const context = useContext(ImageGalleryContext)
  if (!context) return null

  const { isOpen, images, closeImageGallery } = context
  const [startIndex, setStartIndex] = useState(0)

  // 当 images 变化时更新 startIndex
  useEffect(() => {
    if (images.length > 0) {
      setStartIndex(0)
    }
  }, [images])

  if (!isOpen || images.length === 0) return null

  return (
    <ImageGalleryModal
      images={images}
      startIndex={startIndex}
      onClose={closeImageGallery}
    />
  )
})

ImageGalleryManager.displayName = 'ImageGalleryManager'

interface ImageGalleryProviderProps {
  children: ReactNode
}

export const ImageGalleryProvider = ({ children }: ImageGalleryProviderProps) => {
  const [images, setImages] = useState<Media[]>([])

  const openImageGallery = useCallback((imageList: Media[], startIdx: number = 0) => {
    setImages(imageList)
  }, [])

  const closeImageGallery = useCallback(() => {
    setImages([])
  }, [])

  const value = useMemo(() => ({
    isOpen: images.length > 0,
    images,
    openImageGallery,
    closeImageGallery,
  }), [images, openImageGallery, closeImageGallery])

  return (
    <ImageGalleryContext.Provider value={value}>
      {children}
      <ImageGalleryManager />
    </ImageGalleryContext.Provider>
  )
}

export const useImageGallery = () => {
  const context = useContext(ImageGalleryContext)
  if (context === null) {
    throw new Error("useImageGallery must be used within an ImageGalleryProvider")
  }
  return context
} 