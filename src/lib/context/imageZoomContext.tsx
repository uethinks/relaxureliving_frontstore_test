"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import Image from "next/image"
import { getStrapiUrl } from "@lib/utils"

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
  currentIndex: number
  openImageGallery: (images: Media[], startIndex?: number) => void
  closeImageGallery: () => void
  nextImage: () => void
  prevImage: () => void
  goToImage: (index: number) => void
}

const ImageGalleryContext = createContext<ImageGalleryContextType | null>(null)

interface ImageGalleryProviderProps {
  children: ReactNode
}

export const ImageGalleryProvider = ({ children }: ImageGalleryProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<Media[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const openImageGallery = (imageList: Media[], startIndex: number = 0) => {
    setImages(imageList)
    setCurrentIndex(startIndex)
    setIsOpen(true)
  }

  const closeImageGallery = () => {
    setIsOpen(false)
    setImages([])
    setCurrentIndex(0)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index)
    }
  }

  const value = {
    isOpen,
    images,
    currentIndex,
    openImageGallery,
    closeImageGallery,
    nextImage,
    prevImage,
    goToImage,
  }

  return (
    <ImageGalleryContext.Provider value={value}>
      {children}
      {/* 图片画廊组件 */}
        <div 
          className={`fixed inset-0 bg-[#000000]/90 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeImageGallery}
        >
          <div 
            className="relative w-[90vw] h-[90vh] flex items-center justify-center"
            // onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
            //   onClick={closeImageGallery}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-black text-xl font-bold z-10 transition-all duration-200"
              aria-label="关闭"
            >
              ×
            </button>

            {/* 上一张按钮 */}
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-xl font-bold z-10 transition-all duration-200"
                aria-label="上一张"
              >
                ‹
              </button>
            )}

            {/* 下一张按钮 */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-xl font-bold z-10 transition-all duration-200"
                aria-label="下一张"
              >
                ›
              </button>
            )}

            {/* 当前图片 */}
            {images[currentIndex]?.url && (() => {
              const imageUrl = getStrapiUrl(images[currentIndex].url)
              return imageUrl ? (
                <Image
                  unoptimized
                  src={imageUrl}
                  alt={images[currentIndex]?.alternativeText || images[currentIndex]?.name || ''}
                  width={images[currentIndex]?.width || 1920}
                  height={images[currentIndex]?.height || 1080}
                  className="max-w-[60vw] h-auto object-contain bg-white"
                  priority
                />
              ) : null
            })()}

            {/* 图片计数器 */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* 缩略图导航 */}
            {images.length > 1 && images.length <= 10 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((image, index) => {
                  const imageUrl = getStrapiUrl(image.url)
                  return imageUrl ? (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-12 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                        index === currentIndex 
                          ? 'border-white' 
                          : 'border-transparent hover:border-gray-400'
                      }`}
                    >
                      <Image
                        unoptimized
                        src={imageUrl}
                        alt={image.alternativeText || image.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ) : null
                })}
              </div>
            )}
          </div>
        </div>
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