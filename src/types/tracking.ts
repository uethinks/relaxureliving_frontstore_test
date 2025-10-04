/**
 * Google Analytics 跟踪事件类型定义
 * 简化版本 - 只包含事件名称枚举和基础接口
 */

// 跟踪事件名称枚举
export enum TrackingEvent {
  ONLINE_CHAT = 'online_chat',
  CONTACT_US = 'contact_us',
  HP_TO_CUSTOM = 'hp_to_custom',
  STANDARD_TO_CART = 'standard_to_cart',
  STANDARD_TO_3D = 'standard_to_3D',
  STANDARD_ALWAYSON_TO_3D = 'standard_alwayson_to_3D',
  CUSTOM_TO_3D = 'custom_to_3D',
  CUSTOM_2ND_TO_3D = 'custom_2nd_to_3D',
  CHECK_OUT = 'check_out'
}

// 事件参数接口
export interface EventParams {
  /** 当前页面URL，自动注入 */
  url?: string
  /** 自定义参数 */
  [key: string]: any
}

// 跟踪配置接口
export interface TrackingConfig {
  /** 是否启用调试模式 */
  debug?: boolean
  /** 是否自动注入URL */
  autoInjectUrl?: boolean
  /** 自定义URL获取函数 */
  getCurrentUrl?: () => string
}

// 跟踪函数类型
export type TrackFunction = (event: TrackingEvent, params?: EventParams) => void

// 跟踪管理器接口
export interface TrackingManager {
  track: TrackFunction
  config: TrackingConfig
  isGtagAvailable: () => boolean
  setConfig: (config: Partial<TrackingConfig>) => void
}
