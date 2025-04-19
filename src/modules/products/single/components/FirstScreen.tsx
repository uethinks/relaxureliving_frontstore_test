"use client"
import React, { useState, useEffect, Suspense } from "react"
import { ImgContent } from "./ImgContent"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { PergolaSize, selectedProducts } from "types/global"
import { ProductSelector } from "./ProductSelector"
import dynamic from "next/dynamic"

const LazyAdvantage = dynamic(
  () => import("./Advantage").then((mod) => mod.Advantage),
  {
    ssr: false,
    loading: () => null,
  }
)

const LazyDescription = dynamic(
  () => import("./PergolaInformations").then((mod) => mod.Description),
  {
    ssr: false,
    loading: () => null,
  }
)

const LazyAssembly = dynamic(
  () => import("./PergolaInformations").then((mod) => mod.Assembly),
  {
    ssr: false,
    loading: () => null,
  }
)

interface FirstScreenProps {
  product: StoreProduct
  accessories: StoreProduct[]
  onVariantChange: (variant: StoreProductVariant | undefined) => void
  onAccessoryToggle: ({
    type,
    selectedProducts,
  }: {
    type: string
    selectedProducts: selectedProducts
  }) => void
  selectedVariant?: StoreProductVariant
  selectedAccessoriesHeater: selectedProducts
  selectedAccessoriesShades: selectedProducts
  selectedAccessoriesGlassdoor: selectedProducts
  pergolaSize: PergolaSize
  pergolaQuantity: number
  totalPrice: number
  onQuantityChange: (quantity: number) => void
  onBuyNow: () => void
}

export const FirstScreen: React.FC<FirstScreenProps> = ({
  product,
  accessories,
  onVariantChange,
  onAccessoryToggle,
  selectedVariant,
  selectedAccessoriesHeater,
  selectedAccessoriesShades,
  selectedAccessoriesGlassdoor,
  pergolaSize,
  pergolaQuantity,
  totalPrice,
  onQuantityChange,
  onBuyNow,
}) => {
  const [activeTab, setActiveTab] = useState("Description")

  return (
    <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full">
      <NavBarWrapper isFixed={false} />
      <div className="lg:mx-auto flex flex-col lg:flex-row justify-between items-start bg-[#ffffff] w-full relative">
        <div className="flex flex-col w-full lg:max-w-[817px] gap-5">
          <div className="flex flex-col w-full items-center gap-5">
            <div className="flex flex-col items-start relative self-stretch w-full">
              <div className="relative mb-[24px] self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[24px] lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                {product.title}
              </div>
              {/* <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full">
              <p className="w-full text-[#69727a] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[18px] lg:text-[22px] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                {product.subtitle}
              </p>
            </div> */}
              <p className="w-full text-[#69727A] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[16px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                {product.description}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-start bg-[#ffffff] w-full relative">
            <div className="w-full relative flex flex-col">
              <div className="flex flex-row justify-between">
                <ImgContent product={product} property1="default" />
              </div>
              {/* Mobile View */}
              <ProductSelector
                product={product}
                accessories={accessories}
                onVariantChange={onVariantChange}
                onAccessoryToggle={onAccessoryToggle}
                selectedVariant={selectedVariant}
                selectedAccessoriesHeater={selectedAccessoriesHeater}
                selectedAccessoriesShades={selectedAccessoriesShades}
                selectedAccessoriesGlassdoor={selectedAccessoriesGlassdoor}
                pergolaSize={pergolaSize}
                pergolaQuantity={pergolaQuantity}
                totalPrice={totalPrice}
                onQuantityChange={onQuantityChange}
                onBuyNow={onBuyNow}
                isMobile={true}
              />

              <div className="flex flex-col w-full items-center gap-4 mt-6">
                <Suspense>
                  <LazyAdvantage />
                </Suspense>

                <div className="inline-flex items-start gap-10 relative flex-[0_0_auto]">
                  {["Description", "Assembly"].map((tab) => (
                    <button
                      key={tab}
                      className={`inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] cursor-pointer ${
                        activeTab === tab ? "bg-[#dce7f8]" : "bg-[#f3f3f3]"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      <div
                        className={`w-fit mt-[-4.00px] mb-[-2.00px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px] ${
                          activeTab === tab
                            ? "text-[#072f6c]"
                            : "text-[#343a40]"
                        }`}
                      >
                        {tab}
                      </div>
                    </button>
                  ))}
                </div>

                {activeTab === "Description" && (
                  <Suspense>
                    <LazyDescription />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Desktop View */}
        <ProductSelector
          product={product}
          accessories={accessories}
          onVariantChange={onVariantChange}
          onAccessoryToggle={onAccessoryToggle}
          selectedVariant={selectedVariant}
          selectedAccessoriesHeater={selectedAccessoriesHeater}
          selectedAccessoriesShades={selectedAccessoriesShades}
          selectedAccessoriesGlassdoor={selectedAccessoriesGlassdoor}
          pergolaSize={pergolaSize}
          pergolaQuantity={pergolaQuantity}
          totalPrice={totalPrice}
          onQuantityChange={onQuantityChange}
          onBuyNow={onBuyNow}
          isMobile={false}
        />

        {/* Assembly Tab Content - Full Width */}
        {activeTab === "Assembly" && (
          <div className="w-full mt-4">
            <Suspense>
              <LazyAssembly />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}
