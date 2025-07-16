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
import { ProductOverviewAccordion } from "./components/ProductOverviewAccordion"
import { ProductpageSampleKit } from "./components/ProductpageSampleKit"

interface ProductItemProps {
  product: StoreProduct
  accessories: StoreProduct[]
  pergolaData: PergolaData
  currentProductInfo: ProductInformation
  accessoriesCMSData: any
}

export const ProductItem = ({
  product,
  accessories,
  pergolaData,
  currentProductInfo,
  accessoriesCMSData,
}: ProductItemProps): JSX.Element => {
  return (
    <>
      <ProductSchema
        product={product}
        pergolaData={pergolaData}
        currentProductInfo={currentProductInfo}
      />
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:max-w-[1910px] px-4 lg:px-20">
        <FirstScreen
          product={product}
          accessories={accessories}
          currentProductInfo={currentProductInfo}
          pergolaData={pergolaData}
          accessoriesCMSData={accessoriesCMSData}
        />
        {/* product overview section */}
        <ProductOverviewAccordion
          productOverview={pergolaData.product_overview}
        />
        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
          <div className="w-full">
            <AccessoriesCards pergolaData={pergolaData} />
          </div>
          <div className="w-full mt-5 rounded-2xl overflow-hidden">
            <FaqWrapper faq={pergolaData.faq} />
          </div>
        </div>
        <div
          id="reviews"
          className="bg-[#ffffff] flex flex-col items-center justify-center w-full"
        >
          <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
            <div className="w-full">
              <CustomerReviewsServer />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2.5 bg-[#F6AF1F] rounded-2xl mt-20 py-10">
          <h2 className="text-[#343a40] text-[36px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
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
        </div>
      </div>

      <FooterDark />
    </>
  )
}
