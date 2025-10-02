"use client"

import { useEffect, useState } from "react"

export type ScreenSize = "mobile" | "tablet" | "desktop"

interface UseScreenSizeOptions {
  mobileBreakpoint?: number
  tabletBreakpoint?: number
  debounceMs?: number
}

interface UseScreenSizeReturn {
  screenSize: ScreenSize
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
}

/**
 * 自定义 Hook 用于检测屏幕尺寸
 * 统一管理窗口大小变化监听，避免重复代码
 *
 * @param options 配置选项
 * @returns 屏幕尺寸相关状态
 */
export function useScreenSize(
  options: UseScreenSizeOptions = {}
): UseScreenSizeReturn {
  const {
    mobileBreakpoint = 768,
    tabletBreakpoint = 1024,
    debounceMs = 100,
  } = options

  // 使用函数式初始化，避免服务器端渲染时的状态更新
  const [width, setWidth] = useState(() => {
    if (typeof window === "undefined") {
      return 1024 // 服务器端默认值
    }
    return window.innerWidth
  })
  
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window === "undefined") {
      return "desktop" // 服务器端默认值
    }
    const initialWidth = window.innerWidth
    if (initialWidth < mobileBreakpoint) {
      return "mobile"
    } else if (initialWidth < tabletBreakpoint) {
      return "tablet"
    } else {
      return "desktop"
    }
  })

  useEffect(() => {
    // 服务端渲染时直接返回，不执行任何副作用
    if (typeof window === "undefined") {
      return
    }

    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      // 防抖处理，避免频繁触发
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const newWidth = window.innerWidth
        setWidth(newWidth)

        if (newWidth < mobileBreakpoint) {
          setScreenSize("mobile")
        } else if (newWidth < tabletBreakpoint) {
          setScreenSize("tablet")
        } else {
          setScreenSize("desktop")
        }
      }, debounceMs)
    }

    // 初始设置 - 只在客户端执行
    handleResize()

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [mobileBreakpoint, tabletBreakpoint, debounceMs])

  return {
    screenSize,
    isMobile: screenSize === "mobile",
    isTablet: screenSize === "tablet",
    isDesktop: screenSize === "desktop",
    width,
  }
}

/**
 * 简化版本，只返回是否为移动端
 * 兼容现有代码
 */
export function useIsMobile(mobileBreakpoint: number = 768): boolean {
  const { isMobile } = useScreenSize({ mobileBreakpoint })
  return isMobile
}
