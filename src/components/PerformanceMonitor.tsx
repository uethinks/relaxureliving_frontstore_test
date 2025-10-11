"use client"

import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // 只在生产环境或开发环境启用性能监控
    if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITOR === 'true') {
      const metrics: PerformanceMetrics = {}

      // 监听 Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric = entry as any
          
          switch (metric.name) {
            case 'first-contentful-paint':
              metrics.fcp = metric.value
              break
            case 'largest-contentful-paint':
              metrics.lcp = metric.value
              break
            case 'first-input-delay':
              metrics.fid = metric.value
              break
            case 'cumulative-layout-shift':
              metrics.cls = metric.value
              break
            case 'time-to-first-byte':
              metrics.ttfb = metric.value
              break
          }
        }

        // 当所有关键指标都收集到时，发送到分析服务
        if (metrics.fcp && metrics.lcp && metrics.cls !== undefined) {
          console.log('Performance Metrics:', metrics)
          
          // 可以在这里发送到分析服务
          // sendToAnalytics(metrics)
        }
      })

      // 观察不同类型的性能条目
      try {
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] })
      } catch (error) {
        console.warn('Performance Observer not supported:', error)
      }

      // 清理函数
      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return null
}