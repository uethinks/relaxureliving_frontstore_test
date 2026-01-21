"use client"

import V2ProductPage from "@/modules/products/single/components/V2ProductPage"
import { StoreProduct, StoreProductOptionValue } from "@medusajs/types"
import { ProductSelectionProvider } from "@modules/products/single/components/ProductSelectionContext"
import { V2GlassDoorsSelector } from "@modules/products/single/components/V2GlassDoorsSelector"
import { useCallback, useEffect, useState } from "react"
import { PergolaSize, selectedProducts } from "types/global"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

interface GlassdoorPageClientProps {
  glassdoorProduct: StoreProduct
  glassdoorCMSData: any
  pergolaSizes: StoreProductOptionValue[]
  pergolaSize: PergolaSize
}

const GlassdoorProductPage = ({
  glassdoorProduct,
  glassdoorCMSData,
  pergolaSizes,
  pergolaSize,
}: GlassdoorPageClientProps) => {
  const [selectedColor, setSelectedColor] = useState<StoreProductOptionValue>()
  const [selectedSize, setSelectedSize] = useState<string[]>([])
  const [selectedGlassdoor, setSelectedGlassdoor] = useState<selectedProducts>(
    []
  )
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  // 更新选中的glassdoor和价格
  useEffect(() => {
    const variants = getVariant()
    setSelectedGlassdoor(
      variants?.map((variant) => ({
        productVarant: variant,
        quantity:
          selectedSize?.filter((size) =>
            size.includes(variant?.length?.toString() ?? "")
          ).length ?? 0,
      })) || []
    )
  }, [selectedSize, selectedColor])

  // 计算价格
  useEffect(() => {
    setTotalPrice(
      selectedGlassdoor.reduce((acc, glassdoor) => {
        return (
          acc +
          (glassdoor.productVarant?.calculated_price?.calculated_amount ?? 0) *
            glassdoor.quantity
        )
      }, 0)
    )
  }, [selectedGlassdoor])

  // 获取变体
  const getVariant = useCallback(() => {
    return glassdoorProduct?.variants?.filter((variant) => {
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Size" &&
          selectedSize?.find((size) =>
            size.includes(variant?.length?.toString() ?? "")
          )
      )
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Color" &&
          option.value === selectedColor?.value
      )
      return matchingSize && matchingColor
    })
  }, [glassdoorProduct, selectedSize, selectedColor])

  // 如果没有产品数据，显示加载或错误状态
  if (!glassdoorProduct) {
    return (
      <div className="w-full max-w-[1074px] mx-auto relative">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading glassdoor product...</p>
        </div>
      </div>
    )
  }

  // console.log("glassdoorProduct: ", glassdoorProduct)
  // console.log("glassdoorCMSData: ", glassdoorCMSData)

  return (
    <ProductSelectionProvider product={glassdoorProduct}>
      <V2ProductPage cmsData={glassdoorCMSData}>
        <V2GlassDoorsSelector
          glassdoorProduct={glassdoorProduct}
          glassdoorCMSData={glassdoorCMSData}
          pergolaSizes={pergolaSizes}
          pergolaSize={pergolaSize}
        />
      </V2ProductPage>
    </ProductSelectionProvider>
  )
}

export default GlassdoorProductPage
