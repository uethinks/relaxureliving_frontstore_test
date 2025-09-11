import React from "react"
import { OurPergola } from "./sections/OurPergola"
import { Accessories } from "./sections/Accessories"
import { FooterDark } from "./sections/footer"
import { OurPromise } from "./sections/OurPromise"
import { Features } from "./sections/Features"
import { Hero } from "./sections/Hero"
import { NavBarWrapper } from "./sections/NavBarWrapper"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { FaqWrapper } from "./sections/FaqWrapper"
import { ContactUs } from "./sections/ContactUs"
import { Testimonials } from "./sections/Testimonials"
import { AwardBlock } from "@modules/common/components/AwardBlock"
import { PergolaData } from "types/global" 
import V2HeroBanner from "@/components/V2HeroBanner"
import V2ServiceSnapshots from "@/components/V2ServiceSnapshots"
import V2HeroProductSection from "@/components/V2HeroProductSection"
import V2PressSection from "@/components/V2PressSection"
import { V2CraftsmanshipSection } from "@/components/V2CraftsmanshipSection"
import { V2FeatureShowcase } from "@/components/V2FeatureShowcase"
import { V2FeatureGridSection } from "@/components/V2FeatureGridSection"
import { V2PromoBanner } from "@/components/V2PromoBanner"
import V2DualOfferSection from "@/components/V2DualOfferSection"
import V2TestimonialsSection from "@/components/V2TestimonialsSection"
import { V2FAQSection } from "@/components/V2FAQSection"
import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2OccasionsSection from "@/components/V2OccasionsSection"

// 配置静态生成
export const dynamic = "force-static"
export const revalidate = 3600 // 每小时重新验证一次

interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}

 

// 主页面组件
export default async function Homepage() {
  const { data } = await getHomePage()
  console.log('Homepage - data', data)

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>fail to load homepage</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper isHomePage={true} />
        {data.sections.map((section: any) => {
          const key = `${section.id}-${section.__component}`
          console.log('HomePage section', key, JSON.stringify(section))
          if (section.__component === "blocks.v2-hero-banner") {
            return <V2HeroBanner key={key} data={section} />
          } else if (section.__component === "blocks.v2-service-snapshots") {
            return <V2ServiceSnapshots key={key} data={section} />
          } else if (section.__component === "blocks.v2-hero-product-section") {
            return <V2HeroProductSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-press-slider") {
            return <V2PressSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-craftsmanship") {
            return <V2CraftsmanshipSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-occasions") {
            return <V2OccasionsSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-rain-resistance") {
            return <V2FeatureShowcase key={key} data={section} />
          } else if (section.__component === "blocks.v2-feature-grid") {
            return <V2FeatureGridSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-promo-banner") {
            return <V2PromoBanner key={key} data={section} />
          } else if (section.__component === "blocks.v2-dual-offer-section") {
            return <V2DualOfferSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-testimonials-section") {
            return <V2TestimonialsSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-faq-section") {
            return <V2FAQSection key={key} data={section} />
          }
          return null
        })}
        <V2ContactUsSection />
      </div>
      <FooterDark isHomepage={true} />
    </>
  )
}
