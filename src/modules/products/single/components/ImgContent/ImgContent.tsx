"use client"
import React, { useState, useEffect, useCallback } from "react"
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<number>>(
    new Set()
  )
  const images = product.images?.map((image) => image)
  const THUMBNAILS_PER_PAGE = 6
  const MOBILE_THUMBNAILS_PER_PAGE = 4
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const thumbnailsPerPage =
    windowWidth < 1024 ? MOBILE_THUMBNAILS_PER_PAGE : THUMBNAILS_PER_PAGE

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Preload images with loading state
  useEffect(() => {
    if (images) {
      images.forEach((image, index) => {
        const img = new Image()
        img.src = image.url
        img.onload = () => {
          setLoadedImages((prev) => new Set([...Array.from(prev), index]))
        }
      })
    }
  }, [images])

  // Preload visible thumbnails
  useEffect(() => {
    if (!images) return

    const thumbnailsPerPage =
      windowWidth < 1024 ? MOBILE_THUMBNAILS_PER_PAGE : THUMBNAILS_PER_PAGE
    const visibleThumbnails = images.slice(
      thumbnailStartIndex,
      thumbnailStartIndex + thumbnailsPerPage
    )

    visibleThumbnails.forEach((_, index) => {
      const actualIndex = thumbnailStartIndex + index
      if (!loadedThumbnails.has(actualIndex)) {
        const img = new Image()
        img.src = images[actualIndex].url
        img.onload = () => {
          setLoadedThumbnails(
            (prev) => new Set([...Array.from(prev), actualIndex])
          )
        }
      }
    })
  }, [images, thumbnailStartIndex, windowWidth])

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleModalImageNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (!images) return

      if (direction === "prev") {
        setCurrentImageIndex((prev) =>
          prev > 0 ? prev - 1 : images.length - 1
        )
      } else {
        setCurrentImageIndex((prev) =>
          prev < images.length - 1 ? prev + 1 : 0
        )
      }
    },
    [images]
  )

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleModalImageNavigation("prev")
      } else if (e.key === "ArrowRight") {
        handleModalImageNavigation("next")
      } else if (e.key === "Escape") {
        handleCloseModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, handleModalImageNavigation])

  const handleThumbnailNavigation = (direction: "left" | "right") => {
    if (!images || isAnimating) return

    setIsAnimating(true)
    const maxStartIndex = Math.max(0, images.length - thumbnailsPerPage)

    // Prevent over-scrolling by checking current position
    const currentPosition = thumbnailStartIndex
    let newPosition

    if (direction === "left") {
      // 如果是第一页，则跳转到最后一页
      if (currentPosition === 0) {
        newPosition = maxStartIndex
      } else {
        newPosition = currentPosition - 1
      }
    } else {
      // 如果是最后一页，则跳转到第一页
      if (currentPosition >= maxStartIndex) {
        newPosition = 0
      } else {
        newPosition = currentPosition + 1
      }
    }

    // Only update if the position actually changes
    if (newPosition !== currentPosition) {
      setThumbnailStartIndex(newPosition)
    }

    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // Calculate if navigation buttons should be shown
  const showLeftButton = thumbnailStartIndex > 0
  const showRightButton =
    thumbnailStartIndex < Math.max(0, (images?.length || 0) - thumbnailsPerPage)

  // Calculate the actual number of visible thumbnails
  const visibleCount = Math.min(thumbnailsPerPage, images?.length || 0)

  // Calculate the container width and transform, including gaps
  const gapWidth = 10 // 2.5rem = 10px
  const containerStyle = {
    transform: `translateX(calc(-${thumbnailStartIndex} * ((100% - ${
      (visibleCount - 1) * gapWidth
    }px) / ${visibleCount} + ${gapWidth}px))`,
    width: `calc(${images?.length || 0} * ((100% - ${
      (visibleCount - 1) * gapWidth
    }px) / ${visibleCount}) + ${(images?.length || 0) - 1} * ${gapWidth}px)`,
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center relative w-full rounded-[20px] overflow-hidden">
        {/* Main Image with Loading State */}
        <div className="relative w-full">
          {!loadedImages.has(currentImageIndex) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-[20px]">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            className={`rounded-[20px] cursor-pointer aspect-[360/504] lg:aspect-[817/558] w-full object-cover object-center transition-opacity duration-300 ${
              loadedImages.has(currentImageIndex) ? "opacity-100" : "opacity-0"
            }`}
            src={images?.[currentImageIndex]?.url}
            alt=""
            onClick={handleImageClick}
            loading="lazy"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex py-2 justify-center items-center px-1 w-[98%] bg-[#ffffff] rounded-[20px] overflow-hidden border border-solid border-[#ffffff87] backdrop-blur-[3.3px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.3px)_brightness(100%)]">
          <div className="relative w-full">
            <div className="flex gap-2.5 px-2 overflow-hidden">
              <div
                className="flex gap-2.5 transition-transform duration-300 ease-in-out transform-gpu"
                style={containerStyle}
              >
                {images?.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 aspect-square rounded-2xl bg-cover bg-center cursor-pointer transition-all duration-300 ${
                      index === currentImageIndex
                        ? "border-2 border-white-500 scale-105"
                        : "hover:scale-105"
                    } ${!loadedThumbnails.has(index) ? "bg-gray-100" : ""}`}
                    style={{
                      backgroundImage: loadedThumbnails.has(index)
                        ? `url("${image.url}")`
                        : "none",
                      width: `calc((100% - ${
                        (visibleCount - 1) * gapWidth
                      }px) / ${visibleCount})`,
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    {!loadedThumbnails.has(index) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 rounded-full p-2 w-8 h-8 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-110 border-4 border-white/90"
              onClick={() => handleThumbnailNavigation("left")}
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
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 rounded-full p-2 w-8 h-8 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-110 border-4 border-white/90"
              onClick={() => handleThumbnailNavigation("right")}
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
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal with Loading State */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {!loadedImages.has(currentImageIndex) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              className={`max-w-full max-h-[90vh] object-contain transition-opacity duration-300 ${
                loadedImages.has(currentImageIndex)
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              src={images?.[currentImageIndex]?.url}
              alt=""
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
              onClick={handleCloseModal}
            >
              ×
            </button>

            {/* Previous button */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-all duration-200 opacity-50 hover:opacity-100 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                handleModalImageNavigation("prev")
              }}
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
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-all duration-200 opacity-50 hover:opacity-100 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                handleModalImageNavigation("next")
              }}
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
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 text-white text-sm">
              {currentImageIndex + 1} / {images?.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
