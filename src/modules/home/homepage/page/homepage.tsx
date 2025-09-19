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
import V2GuideCardsSection from "@/components/V2GudieCardSection"
import V2SectionRenderer from "@/components/V2SectionRenderer"

// 配置静态生成
export const dynamic = "force-static"
// export const revalidate = 3600 // 每小时重新验证一次

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
        <V2SectionRenderer sections={data.sections || []} />
        <V2ContactUsSection />
      </div>
      <FooterDark isHomepage={true} />
    </>
  )
}
