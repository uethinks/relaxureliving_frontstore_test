import React from "react"
import { ImgContent } from "./ImgContent"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { StoreProduct } from "@medusajs/types"
import { V2StandardProductSelector } from "./V2StandardProductSelector"
import { PergolaData, ProductInformation } from "@/types/global"
import { ProductSelectorMobile } from "./ProductSelectorMobile"
import { ProductSelectionProvider } from "./ProductSelectionContext"
import V2FeatureItems from "@/components/V2FeatureItems"

interface FirstScreenProps {
  product: StoreProduct
  accessories: StoreProduct[]
  pergolaData: PergolaData
  currentProductInfo: ProductInformation
  accessoriesCMSData: any
  standardPergolaData: any
}

export const FirstScreen: React.FC<FirstScreenProps> = ({
  product,
  accessories,
  pergolaData,
  currentProductInfo,
  accessoriesCMSData,
  standardPergolaData,
}) => {
  return (
    <ProductSelectionProvider product={product}>
      <div className="flex flex-col items-center justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <div className="lg:mx-auto flex flex-col  w-full relative mt-5 z-10">
          <div className="flex flex-col w-full lg:flex-row justify-between items-start">
            <div className="flex flex-col w-full  gap-5">
              <div className="flex flex-row justify-between items-start relative w-full gap-[65px]">
                {/* Left Content */}
                <div className="w-full lg:w-[64%] flex flex-col sticky top-0">
                  <div className="flex flex-row justify-between w-full">
                    <ImgContent
                      productImages={standardPergolaData.productImages}
                    />
                  </div>

                  <div className="flex flex-col w-full items-start mt-5 lg:mt-[80px]">
                    {standardPergolaData.productSections.map((section: any) => {
                      const key = `${section.id}-${section.__component}`
                      console.log(key, section)
                      if (section.__component === "blocks.v2-feature-items") {
                        return <V2FeatureItems key={key} data={section} />
                      } 
                      return null
                    })}
                    {/* <Advantage />
                    <DescriptionContent pergolaData={pergolaData} /> */}
                  </div>
                </div>
                {/* Desktop View */}
                <V2StandardProductSelector
                  product={product}
                  accessories={accessories}
                  accessoriesCMSData={accessoriesCMSData}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Mobile View */}
        <ProductSelectorMobile
          product={product}
          accessories={accessories}
          accessoriesCMSData={accessoriesCMSData}
        />
      </div>
    </ProductSelectionProvider>
  )
}
