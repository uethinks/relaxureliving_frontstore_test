"use client"

import dynamic from "next/dynamic"
import { useIsMobile } from "@/lib/hooks/useScreenSize"
import React, { useMemo, useEffect, useState } from "react"

// 高优先级组件 - 首屏关键组件，保持静态导入以确保快速加载
import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2HeroBanner from "@/components/V2HeroBanner"
import V2HeroProductSection from "@/components/V2HeroProductSection"
import V2ServiceSnapshots from "@/components/V2ServiceSnapshots"

// 中优先级组件 - 首屏可能显示，但可以延迟加载
import { V2CraftsmanshipSection } from "@/components/V2CraftsmanshipSection"
import { V2FeatureGridSection } from "@/components/V2FeatureGridSection"
import { V2FeatureShowcase } from "@/components/V2FeatureShowcase"
import V2OccasionsSection from "@/components/V2OccasionsSection"
import { V2PromoBanner } from "@/components/V2PromoBanner"
import V2PressSection from "@/components/V2PressSection"

// 非关键组件 - 使用动态导入进行代码分割，按需加载
const V2DualOfferSection = dynamic(() => import("@/components/V2DualOfferSection"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: true,
})

const V2FAQSection = dynamic(() => import("@/components/V2FAQSection").then(mod => ({ default: mod.V2FAQSection })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: true,
})

const V2FeatureCards = dynamic(() => import("@/components/V2FeatureCards"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: true,
})

const V2GuideCardsSection = dynamic(() => import("@/components/V2GuideCardSection"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: true,
})

const V2TestimonialsSection = dynamic(() => import("@/components/V2TestimonialsSection"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: true,
})

const V2TimelineSection = dynamic(() => import("./V2TimelineSection").then(mod => ({ default: mod.V2TimelineSection })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: true,
})

const V2PergolasComparisonTable = dynamic(() => import("./V2ComparisonSection").then(mod => ({ default: mod.V2PergolasComparisonTable })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: true,
})

interface Section {
  id: string | number
  __component: string
  [key: string]: any
}

interface V2SectionRendererProps {
  customComponents?: any
  sections: Section[]
  showContactUs?: boolean
  className?: string
  maxHighPrioritySections?: number // 高优先级section的最大数量，默认为3
}

// Component mapping for different section types
const sectionComponents = {
  "blocks.v2-hero-banner": V2HeroBanner,
  "blocks.v2-service-snapshots": V2ServiceSnapshots,
  "blocks.v2-hero-product-section": V2HeroProductSection,
  "blocks.v2-press-slider": V2PressSection,
  "blocks.v2-craftsmanship": V2CraftsmanshipSection,
  "blocks.v2-occasions": V2OccasionsSection,
  "blocks.v2-rain-resistance": V2FeatureShowcase,
  "blocks.v2-feature-grid": V2FeatureGridSection,
  "blocks.v2-promo-banner": V2PromoBanner,
  "blocks.v2-dual-offer-section": V2DualOfferSection,
  "blocks.v2-testimonials-section": V2TestimonialsSection,
  "blocks.v2-faq-section": V2FAQSection,
  "blocks.v2-feature-cards": V2FeatureCards,
  "blocks.v2-guide-cards-section": V2GuideCardsSection,
  "blocks.v2-timeline-section": V2TimelineSection,
  "blocks.v2-comparison-section": V2PergolasComparisonTable,
} as const

export const V2SectionRenderer: React.FC<V2SectionRendererProps> = ({
  customComponents = {},
  sections = [],
  showContactUs = true,
  className = "flex flex-col w-full items-start justify-center",
  maxHighPrioritySections = 3,
}) => {
  const isMobile = useIsMobile(1024)
  
  // 添加客户端渲染状态管理，避免水合错误
  const [isClient, setIsClient] = useState(false)
  const [clientIsMobile, setClientIsMobile] = useState(false) // 服务器端默认值

  useEffect(() => {
    // 客户端水合完成后更新状态
    setIsClient(true)
    setClientIsMobile(isMobile)
  }, [isMobile])

  // 使用useMemo优化渲染逻辑，避免不必要的重新渲染
  const renderedSections = useMemo(() => {
    const mergedComponents = {
      ...sectionComponents,
      ...customComponents,
    }

    return sections.map((section, index) => {
      const key = `${section.id}-${section.__component}-${index}`
      const Component =
        mergedComponents[section.__component as keyof typeof sectionComponents]

      if (!Component) {
        console.warn(`Unknown section component: ${section.__component}`)
        return null
      }

      // 使用客户端状态或服务器端默认值
      const currentIsMobile = isClient ? clientIsMobile : false
      
      // 计算section优先级：index越小优先级越高，前maxHighPrioritySections个为高优先级
      const sectionPriority = index < maxHighPrioritySections ? 'high' : 'normal'
      
      // 调试信息：在开发环境中输出优先级信息
      if (process.env.NODE_ENV === 'development') {
        console.log(`Section ${index} (${section.__component}): priority = ${sectionPriority}`)
      }

      return (
        <div 
          key={key} 
          className="w-full"
          style={{ minHeight: sectionPriority === 'high' ? '200px' : '100px' }} // 预设最小高度，减少CLS
        >
          <Component data={section as any} isMobile={currentIsMobile} sectionPriority={sectionPriority} />
        </div>
      )
    })
  }, [sections, customComponents, isClient, clientIsMobile])

  return (
    <div className={className}>
      {renderedSections}
      {showContactUs && (
        <V2ContactUsSection isMobile={isClient ? clientIsMobile : false} />
      )}
    </div>
  )
}

export default V2SectionRenderer
