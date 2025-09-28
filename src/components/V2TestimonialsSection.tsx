"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getStrapiUrl } from "@lib/utils"
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { CustomCarousel } from "./CustomCarousel"

interface Avatar {
  id: number
  name: string
  alternativeText?: string
  width: number
  height: number
  url: string
}

interface ButtonData {
  id: number
  type: string
  size: string
  text: string
  link: string
  icon?: string
}

interface TestimonialItem {
  id: number
  quote: string
  author: string
  rating: number
  review: string
  avatar: Avatar
  media?: {
    id: number
    name: string
    alternativeText?: string
    width?: number
    height?: number
    url: string
    ext: string
    mime: string
  }[]
}

interface TestimonialSectionData {
  __component: string
  id: number
  button: ButtonData
  items: TestimonialItem[]
}
const getMediaType = (media?: TestimonialItem["media"], index: number = 0) => {
  if (!media || !media[index]) return null

  const videoExtensions = [".mp4", ".mpv", ".webm", ".avi", ".mov"]
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"]

  const extension = media[index].ext.toLowerCase()

  if (videoExtensions.includes(extension)) return "video"
  if (imageExtensions.includes(extension)) return "image"

  return null
}
const getMediaUrl = (media?: TestimonialItem["media"], index: number = 0) => {
  if (!media || !media[index]) return null
  return getStrapiUrl(media[index].url)
}
function PCVersion({ data }: { data: TestimonialSectionData }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener("timeupdate", updateProgress)
    return () => video.removeEventListener("timeupdate", updateProgress)
  }, [selectedIndex])

  useEffect(() => {
    const video = videoRef.current
    if (
      video &&
      getMediaType(data.items[selectedIndex]?.media, selectedMediaIndex) ===
        "video"
    ) {
      video.currentTime = 0
      setVideoProgress(0)
    } else {
      setVideoProgress(0)
    }
  }, [selectedIndex, selectedMediaIndex, data.items])

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const currentScroll = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth

      setCanScrollLeft(currentScroll > 0)
      setCanScrollRight(currentScroll < maxScroll)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      updateScrollButtons()
      container.addEventListener("scroll", updateScrollButtons)
      return () => container.removeEventListener("scroll", updateScrollButtons)
    }
  }, [])

  const handleScrollLeft = () => {
    if (scrollContainerRef.current && canScrollLeft) {
      const container = scrollContainerRef.current
      const cardWidth = 525 + 8 // card width + gap
      const currentScroll = container.scrollLeft
      const targetScroll = Math.max(0, currentScroll - cardWidth)

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      })
    }
  }

  const handleScrollRight = () => {
    if (scrollContainerRef.current && canScrollRight) {
      const container = scrollContainerRef.current
      const cardWidth = 525 + 8 // card width + gap
      const currentScroll = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      const targetScroll = Math.min(maxScroll, currentScroll + cardWidth)

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      })
    }
  }

  // Reset media index when testimonial changes
  useEffect(() => {
    setSelectedMediaIndex(0)
  }, [selectedIndex])

  if (!data || !data.items || data.items.length === 0) {
    return (
      <section className={`max-w-[1074px] mx-auto px-4 sm:px-6 py-8 sm:py-12`}>
        <div className="text-center text-gray-500">
          No testimonials available
        </div>
      </section>
    )
  }

  const currentItem = data.items[selectedIndex]

  return (
    <section
      className={`bg-white w-full pt-10 pb-20`}
      aria-label="Customer testimonials and experiences"
    >
      <div className="max-w-[1074px] mx-auto ">
        {/* Arrow Navigation Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 z-10 w-20 h-20 items-center justify-center hover:scale-110 transition-all duration-300"
              aria-label="Scroll testimonials left"
            >
              <ChevronLeft className="w-12 h-12 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 z-10 w-20 h-20 items-center justify-center hover:scale-110 transition-all duration-300"
              aria-label="Scroll testimonials right"
            >
              <ChevronRight className="w-12 h-12 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
            </button>
          )}

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data.items.map((item, index) => (
              <Card
                key={item.id}
                className={`cursor-pointer border-t-2 w-[525px] flex-shrink-0 transition-all duration-200 hover:shadow-md ${
                  selectedIndex === index
                    ? "bg-yellow-50 border-t-yellow-400"
                    : "hover:bg-gray-50 border-t-transparent"
                }`}
                style={{
                  background: "linear-gradient(270deg, #FFF 0%, #EFEEEB 100%)",
                }}
                onClick={() => setSelectedIndex(index)}
                role="button"
                tabIndex={0}
                aria-pressed={selectedIndex === index}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setSelectedIndex(index)
                  }
                }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Image
                      unoptimized
                      src={getStrapiUrl(item.avatar.url)}
                      alt={
                        item.avatar.alternativeText ||
                        `${item.author} profile picture`
                      }
                      width={48}
                      height={48}
                      className="rounded-full flex-shrink-0 sm:w-[60px] sm:h-[60px]"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <blockquote className="text-gray-900 text-base sm:text-lg font-medium mb-2 leading-relaxed">
                        {item.quote}
                      </blockquote>
                      <cite className="text-gray-600 text-sm not-italic">
                        {item.author}
                      </cite>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-6 w-full">
          {/* Hero Video Section */}
          <div className="relative order-2 lg:order-1 flex-1">
            <div className="relative overflow-hidden shadow-lg">
              {(() => {
                const currentMedia = currentItem.media?.[selectedMediaIndex]
                const mediaType = getMediaType(
                  currentItem.media,
                  selectedMediaIndex
                )
                const mediaUrl = getMediaUrl(
                  currentItem.media,
                  selectedMediaIndex
                )

                if (!currentMedia || !mediaUrl) {
                  // Fallback to placeholder
                  return (
                    <div
                      className="w-full bg-gray-200 flex items-center justify-center"
                      style={{ aspectRatio: "708/345" }}
                      aria-label="No media available"
                    >
                      <span className="text-gray-500">No media available</span>
                    </div>
                  )
                }

                if (mediaType === "video") {
                  return (
                    <video
                      ref={videoRef}
                      src={mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "708/345" }}
                      aria-label={`Video showcasing ${currentItem.author}'s outdoor space`}
                    >
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  )
                }

                if (mediaType === "image") {
                  return (
                    <Image
                      unoptimized
                      src={mediaUrl}
                      alt={
                        currentMedia.alternativeText ||
                        `${currentItem.author}'s outdoor space`
                      }
                      width={currentMedia.width || 500}
                      height={currentMedia.height || 600}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "708/345" }}
                      loading="lazy"
                    />
                  )
                }

                return null
              })()}

              {/* Progress bar - only show for video */}
              {getMediaType(currentItem.media, selectedMediaIndex) ===
                "video" && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"
                  role="progressbar"
                  aria-valuenow={Math.round(videoProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Video progress"
                >
                  <div
                    className="h-full bg-red-500 transition-all duration-100"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              )}
            </div>

            {currentItem.media?.length && currentItem.media.length > 1 && (
              <div
                className="absolute -bottom-6 left-0 flex gap-2 mt-4 sm:mt-6 justify-center lg:justify-start"
                role="tablist"
              >
                {currentItem.media?.map((_, index) => (
                  <button
                    key={index}
                    className={`w-[10px] h-[10px] rounded-none transition-colors focus:ring-[#FFBF3C] ${
                      selectedMediaIndex === index
                        ? "bg-[#FFBF3C]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => setSelectedMediaIndex(index)}
                    role="tab"
                    aria-selected={selectedMediaIndex === index}
                    aria-label={`View media ${index + 1} for ${
                      currentItem.author
                    }'s testimonial`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-6 order-1 lg:order-2 w-[341px]">
            <div className="flex items-center gap-2 mt-2">
              <div
                className="flex gap-1"
                role="img"
                aria-label={`${currentItem.rating} out of 5 stars`}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center ${
                      i < currentItem.rating ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex items-center justify-center w-[25px] h-[25px] bg-[#51b380] hover:bg-[#51b380]/90 rounded-sm">
                      <Star
                        className={`w-[13px] h-[13px] fill-white text-white`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Badge
                variant="secondary"
                className="ml-2 text-base sm:text-lg font-semibold"
              >
                {currentItem.rating.toFixed(1)}
              </Badge>
            </div>

            <div className="">
              <p className="text-gray-900 text-base sm:text-lg mb-4 overflow-hidden overflow-ellipsis">
                {currentItem.review}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end mt-2">
          <Button
            size="lg"
            className="bg-[#FFBF3C] hover:bg-primary-light text-gray-900 font-semibold text-lg w-[525px] sm:text-xl px-6 sm:px-8 py-3 sm:py-4 h-auto"
            asChild
          >
            <a href={data.button.link} className="flex items-center gap-3">
              {data.button.text}
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function MobileVersion({ data }: { data: TestimonialSectionData }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const currentItem = data.items[selectedIndex]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener("timeupdate", updateProgress)
    return () => video.removeEventListener("timeupdate", updateProgress)
  }, [selectedIndex])

  useEffect(() => {
    const video = videoRef.current
    if (
      video &&
      getMediaType(data.items[selectedIndex]?.media, selectedMediaIndex) ===
        "video"
    ) {
      video.currentTime = 0
      setVideoProgress(0)
    } else {
      setVideoProgress(0)
    }
  }, [selectedIndex, selectedMediaIndex, data.items])

  // Reset media index when testimonial changes
  useEffect(() => {
    setSelectedMediaIndex(0)
  }, [selectedIndex])

  return (
    <div className={"w-full mb-12"}>
      <CustomCarousel
        onChange={(i) => {
          setSelectedIndex(i)
        }}
        showNav={false}
        autoPlay={false}
        data={data.items.map((item, index) => (
          <div key={item.id}>
            <div
              className={`border-t-[1px] px-6 py-5 w-full bg-yellow-50 border-t-yellow-400 }`}
              style={{
                background: "linear-gradient(270deg, #FFF 0%, #EFEEEB 100%)",
              }}
              role="button"
              tabIndex={0}
              aria-pressed={selectedIndex === index}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedIndex(index)
                }
              }}
            >
              <div className="flex flex-col items-start gap-2">
                <div className={"flex items-center gap-2"}>
                  <Image
                    unoptimized
                    src={getStrapiUrl(item.avatar.url)}
                    alt={
                      item.avatar.alternativeText ||
                      `${item.author} profile picture`
                    }
                    width={42}
                    height={42}
                    className="rounded-full flex-grow-0 flex-shrink-0 basis-auto w-[42px] h-[42px]"
                    loading="lazy"
                  />
                  <div className="w-full">
                    <blockquote className="text-[#140E02] text-xl font-semibold leading-7">
                      <span className={"text-[#FFBF3C]"}>"</span>
                      {item.quote}
                      <span className={"text-[#FFBF3C]"}>"</span>
                    </blockquote>
                  </div>
                </div>
                <cite className="text-[#2F2A1E] text-sm">{item.author}</cite>
              </div>
            </div>
            <div className={"w-full h-[48.8vw]"}>
              {(() => {
                const currentMedia = currentItem.media?.[selectedMediaIndex]
                const mediaType = getMediaType(
                  currentItem.media,
                  selectedMediaIndex
                )
                const mediaUrl = getMediaUrl(
                  currentItem.media,
                  selectedMediaIndex
                )

                if (!currentMedia || !mediaUrl) {
                  // Fallback to placeholder
                  return (
                    <div
                      className="w-full bg-gray-200 flex items-center justify-center"
                      style={{ aspectRatio: "708/345" }}
                      aria-label="No media available"
                    >
                      <span className="text-gray-500">No media available</span>
                    </div>
                  )
                }

                if (mediaType === "video") {
                  return (
                    <video
                      ref={videoRef}
                      src={mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "708/345" }}
                      aria-label={`Video showcasing ${currentItem.author}'s outdoor space`}
                    >
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  )
                }

                if (mediaType === "image") {
                  return (
                    <Image
                      unoptimized
                      src={mediaUrl}
                      alt={
                        currentMedia.alternativeText ||
                        `${currentItem.author}'s outdoor space`
                      }
                      width={currentMedia.width || 500}
                      height={currentMedia.height || 600}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "708/345" }}
                      loading="lazy"
                    />
                  )
                }

                return null
              })()}

              {/* Progress bar - only show for video */}
              {getMediaType(currentItem.media, selectedMediaIndex) ===
                "video" && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"
                  role="progressbar"
                  aria-valuenow={Math.round(videoProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Video progress"
                >
                  <div
                    className="h-full bg-red-500 transition-all duration-100"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              )}
            </div>
            <div className={"p-6 pb-0"}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center ${
                        i < currentItem.rating ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex items-center justify-center w-[25px] h-[25px] bg-[#51b380] hover:bg-[#51b380]/90 rounded-sm">
                        <Star
                          className={`w-[13px] h-[13px] fill-white text-white`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[#140E02] text-base font-semibold">
                  {currentItem.rating.toFixed(1)}
                </div>
              </div>
              <p className="text-[#2F2A1E] text-sm">{currentItem.review}</p>
            </div>
          </div>
        ))}
      />
      <div className="px-6">
        <Button
          className="bg-[#FFBF3C] hover:bg-primary-light text-gray-900 font-semibold text-lg w-full"
          asChild
        >
          <a href={data.button.link} className="flex items-center gap-3">
            {data.button.text}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </Button>
      </div>
    </div>
  )
}

export default function V2TestimonialsSection({
  data,
  isMobile = false,
}: {
  data: TestimonialSectionData
  isMobile?: boolean
}) {
  return isMobile ? <MobileVersion data={data} /> : <PCVersion data={data} />
}
