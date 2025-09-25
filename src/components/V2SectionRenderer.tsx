"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { V2CraftsmanshipSection } from "@/components/V2CraftsmanshipSection"
import V2DualOfferSection from "@/components/V2DualOfferSection"
import { V2FAQSection } from "@/components/V2FAQSection"
import V2FeatureCards from "@/components/V2FeatureCards"
import { V2FeatureGridSection } from "@/components/V2FeatureGridSection"
import { V2FeatureShowcase } from "@/components/V2FeatureShowcase"
import V2GuideCardsSection from "@/components/V2GuideCardSection"
import V2HeroBanner from "@/components/V2HeroBanner"
import V2HeroProductSection from "@/components/V2HeroProductSection"
import V2OccasionsSection from "@/components/V2OccasionsSection"
import V2PressSection from "@/components/V2PressSection"
import { V2PromoBanner } from "@/components/V2PromoBanner"
import V2ServiceSnapshots from "@/components/V2ServiceSnapshots"
import V2TestimonialsSection from "@/components/V2TestimonialsSection"
import React, { useEffect, useState } from "react"
import { V2TimelineSection } from "./V2TimelineSection"

interface Section {
  id: string | number
  __component: string
  [key: string]: any
}

interface V2SectionRendererProps {
  sections: Section[]
  showContactUs?: boolean
  className?: string
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
} as const

export const V2SectionRenderer: React.FC<V2SectionRendererProps> = ({
  sections = [],
  showContactUs = true,
  className = "flex flex-col w-full items-start justify-center",
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // 初始设置
    handleResize()

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const renderSection = (section: Section) => {
    const key = `${section.id}-${section.__component}`
    const Component =
      sectionComponents[section.__component as keyof typeof sectionComponents]

    if (!Component) {
      console.warn(`Unknown section component: ${section.__component}`)
      return null
    }

    return <Component key={key} data={section as any} isMobile={isMobile} />
  }

  return (
    <div className={className}>
      {sections.map(renderSection)}
      {showContactUs && <V2ContactUsSection isMobile={isMobile} />}
    </div>
  )
}

export default V2SectionRenderer
