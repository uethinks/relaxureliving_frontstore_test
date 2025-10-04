/**
 * Google Analytics 跟踪工具
 * 提供统一的trackEvent函数和tracking管理器
 */

import { TrackingEvent, EventParams, TrackingConfig, TrackingManager } from '@/types/tracking'

// 声明全局gtag函数
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

/**
 * 核心trackEvent函数 - 直接调用gtag发送事件
 * @param event 事件类型
 * @param params 事件参数
 */
export function trackEvent(event: TrackingEvent, params?: EventParams): void {
  // 检查是否在浏览器环境
  if (typeof window === 'undefined') {
    if (trackingManager.config.debug) {
      console.warn('[Tracking] trackEvent called in SSR environment, skipping')
    }
    return
  }

  // 检查gtag是否可用
  if (!window.gtag) {
    if (trackingManager.config.debug) {
      console.warn('[Tracking] gtag not available, skipping event:', event)
    }
    return
  }

  try {
    // 准备事件参数
    const eventParams: any = { ...params }

    // 自动注入URL（如果启用且未提供）
    if (trackingManager.config.autoInjectUrl && !eventParams.url) {
      eventParams.url = trackingManager.config.getCurrentUrl?.() || window.location.href
    }

    // 发送事件到gtag
    window.gtag('event', event, eventParams)

    // 调试日志
    if (trackingManager.config.debug) {
      console.log('[Tracking] Event sent:', {
        event,
        params: eventParams,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('[Tracking] Error sending event:', error, {
      event,
      params
    })
  }
}

/**
 * 跟踪管理器实现
 */
const trackingManager: TrackingManager = {
  // 默认配置
  config: {
    debug: false,
    autoInjectUrl: true,
    getCurrentUrl: () => {
      if (typeof window !== 'undefined') {
        return window.location.href
      }
      return ''
    }
  },

  // 跟踪方法
  track: (event: TrackingEvent, params?: EventParams) => {
    trackEvent(event, params)
  },

  // 检查gtag可用性
  isGtagAvailable: (): boolean => {
    return typeof window !== 'undefined' && typeof window.gtag === 'function'
  },

  // 设置配置
  setConfig: (newConfig: Partial<TrackingConfig>) => {
    trackingManager.config = {
      ...trackingManager.config,
      ...newConfig
    }
    
    if (trackingManager.config.debug) {
      console.log('[Tracking] Configuration updated:', trackingManager.config)
    }
  }
}

// 导出trackingManager作为默认导出
export default trackingManager
