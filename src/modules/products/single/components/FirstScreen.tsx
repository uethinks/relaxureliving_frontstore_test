import V2FeatureItems from "@/components/V2FeatureItems"
import { PergolaData } from "@/types/global"
import { convertSelectorData } from "@lib/util/selector"
import { StoreProduct } from "@medusajs/types"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import React, { useMemo } from "react"
import { ProductSelectionProvider } from "./ProductSelectionContext"
import V2ProductPage from "./V2ProductPage"
import { V2StandardProductSelector } from "./V2StandardProductSelector"

interface FirstScreenProps {
  product: StoreProduct
  accessories: StoreProduct[]
  pergolaData: PergolaData
  accessoriesCMSData: any
  standardPergolaData?: any
}

export const FirstScreen: React.FC<FirstScreenProps> = ({
  product,
  accessories,
  pergolaData,
  accessoriesCMSData,
  standardPergolaData,
}) => {
  const selectorData = useMemo(() => {
    if (!standardPergolaData?.relatedProductIds) return {}
    return convertSelectorData(standardPergolaData.relatedProductIds)
  }, [standardPergolaData])

  console.log("FirstScreen standardPergolaData", standardPergolaData)

  return (
    <ProductSelectionProvider product={product}>
      <div className="bg-background flex flex-col items-start justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <V2ProductPage
          cmsData={{
            ...standardPergolaData,
            category: "Relaxure Corsica",
          }}
          customSections={
            <div className="flex flex-col w-full items-start">
              {standardPergolaData.productSections.map((section: any) => {
                const key = `${section.id}-${section.__component}`
                console.log(key, section)
                if (section.__component === "blocks.v2-feature-items") {
                  return <V2FeatureItems key={key} data={section} />
                }
                return null
              })}
            </div>
          }
        >
          {/* Desktop View */}
          <V2StandardProductSelector
            product={product}
            selectorData={selectorData}
            accessories={accessories}
            accessoriesCMSData={accessoriesCMSData}
          />
        </V2ProductPage>
      </div>
    </ProductSelectionProvider>
  )
}
