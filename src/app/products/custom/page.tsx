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
import V2SectionRenderer from "@/components/V2SectionRenderer"

// 强制静态生成
export const dynamic = "force-static"
// export const revalidate = 3600 // 1小时重新验证一次

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
          <V2SectionRenderer sections={pergolaData.sections || []} />
        </div>
        <FooterDark isHomepage={false} />
      </>
    )
  } catch (error) {
    console.error("Error rendering product custom  page:", error)
    notFound()
    return null // 添加明确的return语句以满足Sonar要求
  }
}
