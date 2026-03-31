"use client"
import { useImageGallery } from "@lib/context/imageZoomContext"
import { getStrapiUrl } from "@lib/utils"
import { FIXED_BLUR_DATA_URL } from "@modules/products/single/components/ImgContent/ImgContent"
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
    large?: MediaFormat
    medium?: MediaFormat
    small?: MediaFormat
    xlarge?: MediaFormat
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
  type?: "media" | "icon" | "hero" // 新增hero类型用于标识关键区域
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

// 响应式图片配置：定义不同设备类型的图片格式优先级
// 便于后期调整，只需修改此配置即可
const RESPONSIVE_IMAGE_CONFIG = {
  mobile: {
    media: '(max-width: 767px)',
    formats: ['large', 'xlarge', 'url'] as const, // 优先级从高到低
  },
  tablet: {
    media: '(min-width: 768px) and (max-width: 1024px)',
    formats: ['xlarge', 'url'] as const,
  },
  desktop: {
    media: '(min-width: 1025px)',
    formats: ['url'] as const, // PC端只用原始url
  },
} as const

const DEFAULT_IMAGE_ASPECT_RATIO = 525 / 262
const DEFAULT_VIDEO_ASPECT_RATIO = 16 / 9

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
    type = "media",
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

  // 组件卸载时清理视频
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [])

  // 控制视频播放/暂停
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    if (isInView && videoOptions.autoplay) {
      // 确保视频已经加载完成再播放
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        video.play().catch((error) => {
          // 忽略 AbortError，这是正常的播放中断
          if (error.name !== 'AbortError') {
            console.error('Video play error:', error)
          }
        })
      } else {
        // 如果视频还没加载完成，等待 loadeddata 事件
        const handleLoadedData = () => {
          video.play().catch((error) => {
            if (error.name !== 'AbortError') {
              console.error('Video play error:', error)
            }
          })
        }
        video.addEventListener('loadeddata', handleLoadedData, { once: true })
        
        return () => {
          video.removeEventListener('loadeddata', handleLoadedData)
        }
      }
    } else {
      // 只有在视频正在播放时才暂停
      if (!video.paused) {
        video.pause()
      }
    }
  }, [isInView, videoOptions.autoplay])

  // 检测媒体类型
  const isVideo = media?.mime?.startsWith("video/")
  const isImage = media?.mime?.startsWith("image/")
  const mediaAspectRatio =
    media?.width && media?.height ? media.width / media.height : undefined

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
  const stableAspectRatio =
    aspectRatioValue ??
    mediaAspectRatio ??
    (isVideo ? DEFAULT_VIDEO_ASPECT_RATIO : DEFAULT_IMAGE_ASPECT_RATIO)

  // 处理放大功能
  const handleZoomClick = () => {
    openImageGallery([media], 0)
  }

  if (!media || !media.url) {
    // 不支持的媒体类型
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ aspectRatio: stableAspectRatio }}
      >
        <FileX size={30} color="#8C877C" />
      </div>
    )
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ aspectRatio: stableAspectRatio }}
      >
        <span className="text-muted-foreground text-sm">媒体加载失败</span>
      </div>
    )
  }

  if (isVideo) {
    // 优化视频加载策略：基于section优先级或hero类型决定是否自动播放
    // shouldAutoplay 在移动端 直接为true
    // const isMobile = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)
    // const shouldAutoplay = videoOptions.autoplay && isInView
    
    return (
      <div
        className={`overflow-hidden ${className}`}
        style={{ aspectRatio: stableAspectRatio }}
      >
        <video
          autoPlay={true}
          ref={videoRef}
          src={getStrapiUrl(media.url) || undefined}
          width={media.width || 16}
          height={media.height || 9}
          className={`w-full h-full object-${objectFit} transition-transform duration-300 hover:scale-105`}
          muted={true}
          loop={videoOptions.loop}
          controls={videoOptions.controls}
          aria-label={media.alternativeText || media.name}
          playsInline
          // preload={sectionPriority === "high" ? "metadata" : "none"}
          onError={handleError}
          poster={media.previewUrl ? (getStrapiUrl(media.previewUrl) || undefined) : undefined}
        />
      </div>
    )
  }

  if (isImage) {
    const animationClass = type === "icon" ? "" : "transition-transform duration-300 hover:scale-105"
    
    // 智能优先级设置：基于section优先级、hero类型或手动设置
    const isHighPriority = imageOptions.priority
    // 调试信息：在开发环境中输出优先级信息
    if (process.env.NODE_ENV === 'development') {
      // console.log(`MediaRenderer: sectionPriority=${imageOptions.priority}, type=${type}, imageOptions.priority=${imageOptions.priority}, isHighPriority=${isHighPriority}`)
    }
    
    // 优化sizes属性，提供更精确的响应式配置
    const optimizedSizes = imageOptions.sizes || 
      (imageOptions.priority
        ? "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw")
    
    // 根据配置和formats生成srcSet
    const buildSrcSet = (formatNames: readonly string[]): string[] => {
      const srcSetItems: string[] = []
      
      for (const formatName of formatNames) {
        if (formatName === 'url') {
          // 使用原始url：直接检查media.url和media.width是否存在
          if (media.url && media.width) {
            const url = getStrapiUrl(media.url)
            srcSetItems.push(`${url} ${media.width}w`)
          }
        } else {
          // 使用formats中的格式：直接检查formats是否存在
          const format = media.formats?.[formatName as keyof typeof media.formats]
          if (format && format.url && format.width) {
            const url = getStrapiUrl(format.url)
            srcSetItems.push(`${url} ${format.width}w`)
          }
        }
      }
      
      return srcSetItems
    }
    
    // 获取响应式图片源
    const getResponsiveImageSources = () => {
      const sources: Array<{ srcSet: string; media: string }> = []
      const fallbackUrl = getStrapiUrl(media.url)
      
      // 遍历配置，为每个设备类型生成source
      Object.values(RESPONSIVE_IMAGE_CONFIG).forEach((config) => {
        const srcSetItems = buildSrcSet(config.formats)
        
        if (srcSetItems.length > 0) {
          sources.push({
            srcSet: srcSetItems.join(', '),
            media: config.media,
          })
        }
      })
      
      return { sources, fallbackUrl }
    }
    
    const { sources, fallbackUrl } = getResponsiveImageSources()
    const imageWidth = media.width || 525
    const imageHeight = media.height || 262
    
    return (
      <div
        className={`overflow-hidden relative ${className}`}
        style={{ aspectRatio: stableAspectRatio }}
      >
        {fallbackUrl ? (
          sources.length > 0 ? (
            // 使用 picture 元素实现响应式图片加载
            <picture>
              {sources.map((source, index) => (
                <source
                  key={index}
                  srcSet={source.srcSet}
                  media={source.media}
                  type={media.mime || 'image/jpeg'}
                />
              ))}
              <img
                src={fallbackUrl}
                alt={media.alternativeText || media.name || "媒体内容"}
                width={imageWidth}
                height={imageHeight}
                className={`w-full h-full object-${objectFit} ${animationClass}`}
                loading={isHighPriority ? 'eager' : 'lazy'}
                onError={handleError}
                sizes={optimizedSizes}
              />
            </picture>
          ) : (
            // 如果没有 formats，使用 Next.js Image 组件（保持原有功能）
            <Image        
              unoptimized    
              src={fallbackUrl}
              alt={media.alternativeText || media.name || "媒体内容"}
              width={imageWidth}
              height={imageHeight}
              className={`w-full h-full object-${objectFit} ${animationClass}`}
              priority={isHighPriority}
              sizes={optimizedSizes}
              quality={isHighPriority ? 90 : 85}
              placeholder="blur"
              blurDataURL={FIXED_BLUR_DATA_URL}
              onError={handleError}
            />
          )
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 text-sm">图片加载失败</span>
          </div>
        )}

        {/* 放大按钮 */}
        {enableZoom && fallbackUrl && (
          <button
            onClick={handleZoomClick}
            className="absolute bottom-2 right-0 p-2 w-8 h-8 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 z-10"
            aria-label="放大图片"
          >
            <Image unoptimized src="/img/zoom-in.png" alt="放大" width={16} height={16} />
          </button>
        )}
      </div>
    )
  }

  // 不支持的媒体类型
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ aspectRatio: stableAspectRatio }}
    >
      <span className="text-muted-foreground text-sm">不支持的媒体类型</span>
    </div>
  )
}
