import { notFound } from "next/navigation"
import { getProductByProductId } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { V2CustomProductItem } from "@modules/products/single"
import {
  getCustomPergola,
  getGlassdoor,
  getHeater,
  getPergola,
  getShades,
  getStandardPergola,
} from "@lib/cms/strapiCmsApi"
import { StoreProduct, StoreProductResponse } from "@medusajs/types" 
import { Metadata } from "next"
import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import V2HeroBanner from "@/components/V2HeroBanner"
import V2ServiceSnapshots from "@/components/V2ServiceSnapshots"
import V2HeroProductSection from "@/components/V2HeroProductSection"
import V2PressSection from "@/components/V2PressSection"
import { V2CraftsmanshipSection } from "@/components/V2CraftsmanshipSection"
import V2OccasionsSection from "@/components/V2OccasionsSection"
import { V2FeatureShowcase } from "@/components/V2FeatureShowcase"
import { V2FeatureGridSection } from "@/components/V2FeatureGridSection"
import { V2PromoBanner } from "@/components/V2PromoBanner"
import V2DualOfferSection from "@/components/V2DualOfferSection"
import V2TestimonialsSection from "@/components/V2TestimonialsSection"
import { V2FAQSection } from "@/components/V2FAQSection"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"

// 强制静态生成
export const dynamic = "force-static"
export const revalidate = 3600 // 1小时重新验证一次

type ProductInformation = {
  id: number
  productTitle: string
  productSubtitle: string
  productDescription: string
  urlLink: string
}

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

 

export default async function ProductCustomPage() {
  try {
    // 1. 并行获取基础数据
    const { data: pergolaData } = await getCustomPergola()

    console.log("ProductCustomPage - pergolaData", pergolaData)

    // 5. 渲染页面
    return (
      <>
        <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
          <NavBarWrapper isHomePage={true} />
          {pergolaData.sections.map((section: any) => {
            const key = `${section.id}-${section.__component}`
            console.log(key, section)
            if (section.__component === "blocks.v2-hero-banner") {
              return <V2HeroBanner key={key} data={section} />
            } else if (section.__component === "blocks.v2-service-snapshots") {
              return <V2ServiceSnapshots key={key} data={section} />
            } else if (
              section.__component === "blocks.v2-hero-product-section"
            ) {
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
            } else if (
              section.__component === "blocks.v2-testimonials-section"
            ) {
              return <V2TestimonialsSection key={key} data={section} />
            } else if (section.__component === "blocks.v2-faq-section") {
              return <V2FAQSection key={key} data={section} />
            }
            return null
          })}
          <V2ContactUsSection />
        </div>
        <FooterDark isHomepage={false} />
      </>
    )
  } catch (error) {
    console.error("Error rendering product page:", error)
    notFound()
    return null // 添加明确的return语句以满足Sonar要求
  }
}
