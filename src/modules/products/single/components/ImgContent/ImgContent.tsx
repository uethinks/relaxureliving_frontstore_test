"use client"
import React, { useState, useEffect } from "react"
import { StoreProduct } from "@medusajs/types"

interface Props {
  product: StoreProduct
  property1: "default"
}

export const ImgContent = ({ product, property1 }: Props): JSX.Element => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const images = product.images?.map((image) => image)
  const THUMBNAILS_PER_PAGE = 6

  // Preload all images
  useEffect(() => {
    if (images) {
      images.forEach((image) => {
        const img = new Image()
        img.src = image.url
      })
    }
  }, [images])

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleThumbnailNavigation = (direction: "left" | "right") => {
    if (!images || isAnimating) return

    setIsAnimating(true)
    if (direction === "left") {
      setThumbnailStartIndex((prev) => Math.max(0, prev - 1))
    } else {
      setThumbnailStartIndex((prev) =>
        Math.min(images.length - THUMBNAILS_PER_PAGE, prev + 1)
      )
    }

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  const visibleThumbnails = images?.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + THUMBNAILS_PER_PAGE
  )

  const translateX = -thumbnailStartIndex * (100 / THUMBNAILS_PER_PAGE)

  return (
    <>
      <div className="flex flex-col justify-center items-center relative w-full rounded-[20px] overflow-hidden">
        <img
          className="rounded-[20px] cursor-pointer"
          src={images?.[currentImageIndex]?.url}
          alt=""
          onClick={handleImageClick}
        />
        <div className="flex py-2 justify-center items-center px-1 w-[98%] bg-[#ffffff] rounded-[20px] overflow-hidden border border-solid border-[#ffffff87] backdrop-blur-[3.3px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.3px)_brightness(100%)]">
          <div className="relative w-full">
            <div className="flex gap-2.5 px-2 overflow-hidden">
              <div
                className="flex w-full gap-2.5 transition-transform duration-300 ease-in-out transform-gpu"
                style={{
                  transform: `translateX(-${
                    thumbnailStartIndex * (100 / THUMBNAILS_PER_PAGE)
                  }%)`,
                }}
              >
                {images?.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-[calc((100%-12.5px)/6)] aspect-square rounded-2xl bg-cover bg-center cursor-pointer transition-all duration-300 ${
                      index === currentImageIndex
                        ? "border-2 border-white-500 scale-105"
                        : "hover:scale-105"
                    }`}
                    style={{
                      backgroundImage: `url(${image.url})`,
                      minWidth: `calc((100% - 12.5px) / 6)`,
                      maxWidth: `calc((100% - 12.5px) / 6)`,
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  ></button>
                ))}
              </div>
            </div>

            {thumbnailStartIndex > 0 && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                onClick={() => handleThumbnailNavigation("left")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
            )}

            {images &&
              thumbnailStartIndex + THUMBNAILS_PER_PAGE < images.length && (
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                  onClick={() => handleThumbnailNavigation("right")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
              )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              className="max-w-full max-h-[90vh] object-contain"
              src={images?.[currentImageIndex]?.url}
              alt=""
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
