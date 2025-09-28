"use client"
import { useImageGallery } from "@lib/context/imageZoomContext"
import { getStrapiUrl } from "@lib/utils"
import { FileX } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

interface Media {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: {
    small?: MediaFormat
    xsmall?: MediaFormat
    thumbnail?: MediaFormat
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

interface MediaRendererOptions {
  aspectRatio?: string // 默认"525/262"
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  videoOptions?: {
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    controls?: boolean
  }
  imageOptions?: {
    priority?: boolean
    sizes?: string
  }
  enableZoom?: boolean // 是否启用图片放大功能
  className?: string
}

interface MediaRendererProps {
  media: Media
  options?: MediaRendererOptions
}

export default function MediaRenderer({
  media,
  options = {},
}: MediaRendererProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { openImageGallery } = useImageGallery()

  const {
    aspectRatio = undefined,
    objectFit = "cover",
    videoOptions = {
      autoplay: true,
      muted: true,
      loop: true,
      controls: false,
    },
    imageOptions = {
      priority: false,
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    },
    enableZoom = false,
    className = "",
  } = options

  // Intersection Observer for video autoplay
  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.5, // 当50%的视频可见时触发
      }
    )

    observer.observe(videoRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // 控制视频播放/暂停
  useEffect(() => {
    if (!videoRef.current) return

    if (isInView && videoOptions.autoplay) {
      videoRef.current.play().catch(console.error)
    } else {
      videoRef.current.pause()
    }
  }, [isInView, videoOptions.autoplay])

  // 检测媒体类型
  const isVideo = media?.mime.startsWith("video/")
  const isImage = media?.mime.startsWith("image/")

  // 处理错误
  const handleError = () => {
    setHasError(true)
  }

  // 计算宽高比
  const aspectRatioValue = aspectRatio
    ? aspectRatio
        .split("/")
        .map(Number)
        .reduce((a, b) => a / b)
    : undefined

  // 处理放大功能
  const handleZoomClick = () => {
    openImageGallery([media], 0)
  }

  if (!media || !media.url) {
    // 不支持的媒体类型
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={aspectRatioValue ? { aspectRatio: aspectRatioValue } : {}}
      >
        <FileX size={30} color="#8C877C" />
      </div>
    )
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={aspectRatioValue ? { aspectRatio: aspectRatioValue } : {}}
      >
        <span className="text-muted-foreground text-sm">媒体加载失败</span>
      </div>
    )
  }

  if (isVideo) {
    return (
      <div
        className={`w-full h-full overflow-hidden ${className}`}
        style={aspectRatioValue ? { aspectRatio: aspectRatioValue } : {}}
      >
        <video
          autoPlay={videoOptions.autoplay}
          ref={videoRef}
          src={getStrapiUrl(media.url)}
          className={`w-full h-full object-${objectFit} transition-transform duration-300 hover:scale-105`}
          muted={videoOptions.muted}
          loop={videoOptions.loop}
          controls={videoOptions.controls}
          playsInline
          onError={handleError}
          poster={media.previewUrl ? getStrapiUrl(media.previewUrl) : undefined}
        />
      </div>
    )
  }

  if (isImage) {
    return (
      <div
        className={`w-full h-full overflow-hidden relative ${className}`}
        style={aspectRatioValue ? { aspectRatio: aspectRatioValue } : {}}
      >
        <Image
          unoptimized
          src={getStrapiUrl(media.url)}
          alt={media.alternativeText || media.name}
          width={media.width || 525}
          height={media.height || 262}
          className={`w-full h-full object-${objectFit} transition-transform duration-300 hover:scale-105`}
          priority={imageOptions.priority}
          sizes={imageOptions.sizes}
          onError={handleError}
        />

        {/* 放大按钮 */}
        {enableZoom && (
          <button
            onClick={handleZoomClick}
            className="absolute bottom-2 right-0 p-2 w-8 h-8 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 z-10"
            aria-label="放大图片"
          >
            <Image src="/img/zoom-in.png" alt="放大" width={16} height={16} />
          </button>
        )}
      </div>
    )
  }

  // 不支持的媒体类型
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={aspectRatioValue ? { aspectRatio: aspectRatioValue } : {}}
    >
      <span className="text-muted-foreground text-sm">不支持的媒体类型</span>
    </div>
  )
}
