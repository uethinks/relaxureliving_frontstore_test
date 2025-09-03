import React from "react"
import { FirstScreen } from "./components/FirstScreen"
import { StoreProduct } from "@medusajs/types"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { FaqWrapper } from "@modules/home/homepage/page/sections/FaqWrapper"
import { CustomerReviewsServer } from "./components/CustomerReviewsServer"
import { AwardBlock } from "@modules/common/components/AwardBlock"
import { ImageOnLeft, AccessoriesCards } from "./components/LandingPage"
import { PergolaData, ProductInformation } from "@/types/global"
import { ProductSchema } from "./components/ProductSchema"
import { ProductSidebar } from "@/components/ProductSidebar"
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
import V2FeatureCards from "@/components/V2FeatureCards"

interface V2CustomProductItemProps {
  product: StoreProduct
  accessories: StoreProduct[]
  pergolaData: PergolaData
  // currentProductInfo: ProductInformation
  accessoriesCMSData: any
  standardPergolaData: any
}

export const V2CustomProductItem = ({
  product,
  accessories,
  pergolaData,
  accessoriesCMSData,
  standardPergolaData,
}: V2CustomProductItemProps): React.JSX.Element => {
  return (
    <>
      {/* <ProductSchema
        product={product}
        pergolaData={pergolaData}
        currentProductInfo={currentProductInfo}
      /> */}

      {/* Floating Sidebar */}
      <ProductSidebar product={product} />

      <div className="bg-background flex flex-col items-center justify-center w-full">
        <FirstScreen
          product={product}
          accessories={accessories}
          pergolaData={pergolaData}
          standardPergolaData={standardPergolaData}
          accessoriesCMSData={accessoriesCMSData}
        />
        {/* product description section */}
        <div className="flex flex-col w-full items-start justify-center">
          {standardPergolaData.descriptionSections.map((section: any) => {
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
            } else if (section.__component === "blocks.v2-feature-cards") {
              return <V2FeatureCards key={key} data={section} />
            }
            return null
          })}
          <V2ContactUsSection />
        </div>

        {/* <ProductOverviewAccordion
          productOverview={pergolaData.product_overview}
        />
        <div className="lg:mx-auto flex flex-col justify-between items-start w-full relative">
          <div className="w-full">
            <AccessoriesCards pergolaData={pergolaData} />
          </div>
          <div className="w-full mt-5 rounded-2xl overflow-hidden">
            <FaqWrapper faq={pergolaData.faq} />
          </div>
        </div>
        <div
          id="reviews"
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="lg:mx-auto flex flex-col justify-between items-start w-full relative">
            <div className="w-full">
              <CustomerReviewsServer />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2.5 bg-[#F6AF1F] rounded-2xl mt-20 py-10">
          <h2
            className={`text-[#343a40] text-[36px] font-heading-2 font-[number:var(--heading-2-font-weight)] 
            text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] 
            [font-style:var(--heading-2-font-style)]`}
          >
            {pergolaData.get_in_touch.title}
          </h2>
          <a
            href="/#contact"
            className="flex flex-row items-center justify-center gap-2.5 border border-[#343a40] rounded-2xl px-20 py-2 hover:bg-[#fdce6f]"
          >
            {pergolaData.get_in_touch.button_name}
          </a>
        </div>
        <div className="w-full md:bg-[#F3F3F3] md:border rounded-2xl mt-20 md:px-[63px]">
          <ImageOnLeft pergolaData={pergolaData} />
        </div>
        <div className="w-full mt-20">
          <AwardBlock data={pergolaData.credential} />
        </div>
        <div className="w-full mt-20">
          <ProductpageSampleKit sampleKit={pergolaData.sample_kit} />
        </div> */}
      </div>

      <FooterDark />
    </>
  )
}
