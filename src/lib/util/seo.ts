// SEO转换器 - 将Strapi SEO数据转换为Next.js generateMetadata格式
import { Metadata } from "next"
import {
  StrapiSEOData,
  StrapiMediaData,
  StrapiMetaSocialData,
  SEOConverterOptions,
  SEOConverterResult,
  ImageFormat,
  SocialPlatform,
} from "@/types/seo"

/**
 * 获取Strapi媒体URL
 * @param media Strapi媒体数据
 * @param format 图片格式
 * @param baseUrl 基础URL
 * @returns 完整的图片URL
 */
export function getStrapiMediaUrl(
  media: StrapiMediaData,
  format: ImageFormat = "original",
  baseUrl?: string
): string {
  if (!media) return ""

  let url = ""

  if (format === "original") {
    url = media.url
  } else if (media.formats?.[format]) {
    url = media.formats[format]!.url
  } else {
    // 如果指定格式不存在，回退到原始URL
    url = media.url
  }

  // 如果URL已经是完整的，直接返回
  if (url.startsWith("http")) {
    return url
  }

  // 添加基础URL前缀
  const base = baseUrl || process.env.NEXT_PUBLIC_STRAPI_URL || ""
  return `${base}${url}`
}

/**
 * 转换基础meta标签
 * @param seoData Strapi SEO数据
 * @param options 转换选项
 * @returns 基础meta标签对象
 */
export function convertBasicMeta(
  seoData: StrapiSEOData,
  options: SEOConverterOptions = {}
): Partial<Metadata> {
  const { baseUrl } = options

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    keywords: seoData.keywords,
    robots:
      seoData.metaRobots ||
      (seoData.preventIndexing ? "noindex,nofollow" : "index,follow"),
    viewport: seoData.metaViewport,
    alternates: {
      canonical: seoData.canonicalURL
        ? `${baseUrl}${seoData.canonicalURL}`
        : undefined,
    },
  }
}

/**
 * 转换Open Graph数据
 * @param seoData Strapi SEO数据
 * @param options 转换选项
 * @returns Open Graph元数据对象
 */
export function convertOpenGraph(
  seoData: StrapiSEOData,
  options: SEOConverterOptions = {}
): Partial<Metadata> {
  const { baseUrl, siteName, facebookAppId } = options

  // 获取Facebook社交媒体数据
  const facebookData = seoData.metaSocial?.find(
    (social) => social.socialNetwork === "Facebook"
  )

  const title = facebookData?.title || seoData.metaTitle
  const description = facebookData?.description || seoData.metaDescription
  const image = facebookData?.image || seoData.metaImage

  return {
    openGraph: {
      title,
      description,
      url: seoData.canonicalURL
        ? `${baseUrl}${seoData.canonicalURL}`
        : undefined,
      siteName: siteName || "Relaxure Living",
      images: image ? [
        {
          url: getStrapiMediaUrl(image, "large", baseUrl),
          width: image.width,
          height: image.height,
          alt: image.alternativeText || title,
        },
      ]: [],
      locale: "en_US",
      type: "website",
      ...(facebookAppId && { appId: facebookAppId }),
    },
  }
}

/**
 * 转换Twitter Cards数据
 * @param seoData Strapi SEO数据
 * @param options 转换选项
 * @returns Twitter Cards元数据对象
 */
export function convertTwitterCards(
  seoData: StrapiSEOData,
  options: SEOConverterOptions = {}
): Partial<Metadata> {
  const { baseUrl, twitterHandle } = options

  // 获取Twitter社交媒体数据
  const twitterData = seoData.metaSocial?.find(
    (social) => social.socialNetwork === "Twitter"
  )

  const title = twitterData?.title || seoData.metaTitle
  const description = twitterData?.description || seoData.metaDescription
  const image = twitterData?.image || seoData.metaImage

  return {
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getStrapiMediaUrl(image, "large", baseUrl)],
      ...(twitterHandle && { creator: twitterHandle, site: twitterHandle }),
    },
  }
}

/**
 * 转换结构化数据
 * @param seoData Strapi SEO数据
 * @param options 转换选项
 * @returns 结构化数据脚本
 */
export function convertStructuredData(
  seoData: StrapiSEOData,
  options: SEOConverterOptions = {}
): string | undefined {
  if (!seoData.structuredData) return undefined

  try {
    return JSON.stringify(seoData.structuredData)
  } catch (error) {
    console.warn("Failed to stringify structured data:", error)
    return undefined
  }
}

/**
 * 验证SEO数据
 * @param seoData Strapi SEO数据
 * @returns 验证结果
 */
export function validateSEOData(seoData: StrapiSEOData): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  // 必需字段验证
  if (!seoData.metaTitle) {
    errors.push("metaTitle is required")
  } else if (seoData.metaTitle.length > 60) {
    warnings.push("metaTitle is longer than recommended 60 characters")
  }

  if (!seoData.metaDescription) {
    errors.push("metaDescription is required")
  } else if (seoData.metaDescription.length < 50) {
    warnings.push("metaDescription is shorter than recommended 50 characters")
  } else if (seoData.metaDescription.length > 160) {
    warnings.push("metaDescription is longer than recommended 160 characters")
  }

  if (!seoData.metaImage) {
    errors.push("metaImage is required")
  }

  // 社交媒体数据验证
  if (seoData.metaSocial) {
    seoData.metaSocial.forEach((social, index) => {
      if (!social.title) {
        errors.push(`metaSocial[${index}].title is required`)
      }
      if (!social.description) {
        errors.push(`metaSocial[${index}].description is required`)
      }
      if (social.socialNetwork === "Twitter" && social.title.length > 60) {
        warnings.push(
          `Twitter title at index ${index} is longer than recommended 60 characters`
        )
      }
      if (
        social.socialNetwork === "Facebook" &&
        social.description.length > 65
      ) {
        warnings.push(
          `Facebook description at index ${index} is longer than recommended 65 characters`
        )
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * 主转换函数 - 将Strapi SEO数据转换为Next.js Metadata
 * @param seoData Strapi SEO数据
 * @param options 转换选项
 * @returns 转换结果
 */
export function convertStrapiSEOToMetadata(
  seoData: StrapiSEOData,
  options: SEOConverterOptions = {}
): SEOConverterResult {
  // 验证输入数据
  const validation = validateSEOData(seoData)

  if (!validation.isValid) {
    // if (validation.errors.length > 0) {
    //   console.error("SEO conversion errors:", validation.errors)
    // }
    // if (validation.warnings.length > 0) {
    //   console.warn("SEO conversion warnings:", validation.warnings)
    // }
    // return {
    //   metadata: {},
    //   errors: validation.errors,
    //   warnings: validation.warnings,
    // }
  }

  try {
    // 转换各个组件
    const basicMeta = convertBasicMeta(seoData, options)
    const openGraph = convertOpenGraph(seoData, options)
    const twitterCards = convertTwitterCards(seoData, options)
    const structuredData = convertStructuredData(seoData, options)

    // 合并所有元数据
    const metadata: Metadata = {
      ...basicMeta,
      ...openGraph,
      ...twitterCards,
      ...(structuredData && {
        other: {
          "application/ld+json": structuredData,
        },
      }),
    }
    console.log("metadata", metadata)

    return {
      metadata,
      errors: validation.errors,
      warnings: validation.warnings,
    }
  } catch (error) {
    return {
      metadata: {},
      errors: [
        `Conversion failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      ],
      warnings: validation.warnings,
    }
  }
}

/**
 * 便捷函数 - 直接返回Metadata对象
 * @param seoData Strapi SEO数据
 * @param options 转换选项
 * @returns Next.js Metadata对象
 */
export function generateMetadataFromStrapi(
  seoData: StrapiSEOData,
  options: SEOConverterOptions = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Relaxure Living",
    twitterHandle: "@relaxureliving",
    facebookAppId: "your-facebook-app-id",
  }
): Metadata {
  const result = convertStrapiSEOToMetadata(seoData, options)
  console.log("result", result)
  if (result.errors && result.errors.length > 0) {
    console.error("SEO conversion errors:", result.errors)
  }

  if (result.warnings && result.warnings.length > 0) {
    console.warn("SEO conversion warnings:", result.warnings)
  }

  return result.metadata
}

// 导出所有类型和函数
export * from "@/types/seo"
