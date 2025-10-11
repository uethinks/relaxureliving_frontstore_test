"use client"

import { useEffect } from "react"

interface PreloadResourcesProps {
  images?: Array<{
    url: string
    as?: "image"
    type?: string
  }>
  videos?: Array<{
    url: string
    as?: "video"
    type?: string
  }>
  fonts?: Array<{
    url: string
    as?: "font"
    type?: string
    crossOrigin?: "anonymous" | "use-credentials"
  }>
}

export default function PreloadResources({ 
  images = [], 
  videos = [], 
  fonts = [] 
}: PreloadResourcesProps) {
  useEffect(() => {
    // 预加载关键图片
    images.forEach(({ url, as = "image", type }) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = url
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    })

    // 预加载关键视频
    videos.forEach(({ url, as = "video", type }) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = url
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    })

    // 预加载关键字体
    fonts.forEach(({ url, as = "font", type, crossOrigin = "anonymous" }) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = url
      link.as = as
      if (type) link.type = type
      link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    })

    // 清理函数
    return () => {
      // 组件卸载时清理预加载链接
      const preloadLinks = document.querySelectorAll('link[rel="preload"]')
      preloadLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })
    }
  }, [images, videos, fonts])

  return null
}
