import React from "react"
import { ImgContent } from "./ImgContent"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { StoreProduct } from "@medusajs/types"
import { ProductSelector } from "./ProductSelector"
import { Advantage } from "./Advantage"
import { TabButtons } from "./TabButtons"
import { DescriptionContent } from "./DescriptionContent"
import { AssemblyContent } from "./AssemblyContent"
import { PergolaData, ProductInformation } from "@/types/global"
import { ProductSelectorMobile } from "./ProductSelectorMobile"
import { ProductSelectionProvider } from "./ProductSelectionContext"

interface FirstScreenProps {
  product: StoreProduct
  accessories: StoreProduct[]
  pergolaData: PergolaData
  currentProductInfo: ProductInformation
  accessoriesCMSData: any
}

export const FirstScreen: React.FC<FirstScreenProps> = ({
  product,
  accessories,
  pergolaData,
  currentProductInfo,
  accessoriesCMSData,
}) => {
  return (
    <ProductSelectionProvider product={product}>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <div className="lg:mx-auto flex flex-col  bg-[#ffffff] w-full relative mt-5 z-10">
          <div className="flex flex-col w-full lg:flex-row justify-between items-start">
            <div className="flex flex-col w-full  gap-5">
              <div className="flex flex-col w-full lg:max-w-[64%] items-center gap-5 lg:pr-[65px]">
                <div className="flex flex-col items-start relative self-stretch w-full">
                  <h1 className="relative mb-[24px] self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[24px] lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                    {currentProductInfo.productTitle}
                  </h1>
                  <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full">
                    <h2 className="w-full text-[#69727a] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[18px] lg:text-[22px] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                      {currentProductInfo.productSubtitle}
                    </h2>
                  </div>
                  <h3 className="w-full text-[#69727A] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[16px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                    {currentProductInfo.productDescription}
                  </h3>
                </div>
              </div>
              <div className="flex flex-row justify-between items-start relative w-full gap-[65px]">
                <div className="w-full lg:w-[64%] relative flex flex-col">
                  <div className="flex flex-row justify-between w-full">
                    <ImgContent productImages={pergolaData.product_images} />
                  </div>

                  <div className="flex flex-col w-full items-start mt-5 lg:mt-[80px]">
                    <Advantage />

                    <div className="flex flex-wrap items-center justify-between w-full mt-5 mb-5 lg:mt-[60px] lg:mb-[60px]">
                      <TabButtons />
                      <a
                        href="/upload_files/Pergola_technical_sheet_new.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2"
                      >
                        <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
                        <h3 className="font-medium text-[#69727A] text-[14px]">
                          Product Technical Sheet
                        </h3>
                      </a>
                    </div>

                    <DescriptionContent pergolaData={pergolaData} />
                  </div>
                </div>
                {/* Desktop View */}
                <ProductSelector
                  product={product}
                  accessories={accessories}
                  accessoriesCMSData={accessoriesCMSData}
                />
              </div>
            </div>
          </div>
          {/* Assembly Tab Content - Full Width */}
          <AssemblyContent pergolaData={pergolaData} />
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
