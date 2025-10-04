/**
 * React Hook for Google Analytics tracking - 简化版本
 * 提供在React组件中方便使用的跟踪功能
 */

import { useCallback } from 'react'
import trackingManager, { TrackingEvent, EventParams } from '@/lib/util/tracking'

/**
 * 使用跟踪功能的React Hook
 * @returns 跟踪函数和配置方法
 */
export const useTracking = () => {
  // 通用跟踪函数
  const track = useCallback((event: TrackingEvent, params?: EventParams) => {
    trackingManager.track(event, params)
  }, [])

  // 配置方法
  const setConfig = useCallback((config: Partial<{ debug?: boolean; autoInjectUrl?: boolean }>) => {
    trackingManager.setConfig(config)
  }, [])

  // 检查gtag可用性
  const isGtagAvailable = useCallback(() => {
    return trackingManager.isGtagAvailable()
  }, [])

  return {
    // 跟踪函数
    track,
    
    // 工具方法
    setConfig,
    isGtagAvailable,
    
    // 当前配置
    config: trackingManager.config
  }
}

export default useTracking
