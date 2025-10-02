// SEO相关类型定义 - 基于Strapi配置生成
import { Metadata } from "next"

// Strapi媒体数据类型
export interface StrapiMediaData {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats?: {
    large?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    small?: { url: string; width: number; height: number }
    thumbnail: { url: string; width: number; height: number }
  }
  url: string
  mime?: string
  size?: number
  provider?: string
  provider_metadata?: any
  createdAt?: string
  updatedAt?: string
}

// Strapi社交媒体数据类型 - 基于meta-social.json
export interface StrapiMetaSocialData {
  id: number
  socialNetwork: "Facebook" | "Twitter"
  title: string
  description: string
  image?: StrapiMediaData
}

// Strapi SEO数据类型 - 基于seo.json
export interface StrapiSEOData {
  metaTitle: string
  metaDescription: string
  metaImage: StrapiMediaData
  metaSocial?: StrapiMetaSocialData[]
  keywords?: string
  metaRobots?: string
  structuredData?: any
  metaViewport?: string
  canonicalURL?: string
  preventIndexing?: boolean
}

// SEO转换器配置选项
export interface SEOConverterOptions {
  baseUrl?: string
  defaultImage?: string
  siteName?: string
  twitterHandle?: string
  facebookAppId?: string
}

// SEO转换器结果类型
export interface SEOConverterResult {
  metadata: Metadata
  errors?: string[]
  warnings?: string[]
}

// 图片格式选择器类型
export type ImageFormat = "thumbnail" | "small" | "medium" | "large" | "original"

// 社交媒体平台类型
export type SocialPlatform = "facebook" | "twitter"