"use client"

import React, { useCallback, useEffect, useState } from "react"
import { StoreProduct, StoreProductOptionValue } from "@medusajs/types"
import { ImageSlider } from "@modules/common/components/ImageSlider"
import { useCart } from "@lib/context/cartContext"
import { selectedProducts, PergolaSize } from "types/global"
import GlassdoorSideSelector from "@modules/products/single/components/AccesorriesPopup/GlassdoorSideSelector"
import { AddAccessories } from "@modules/products/single/components/AccesorriesPopup/AddAccessories"
import { ImgContent } from "@modules/products/single/components/ImgContent"
import { ProductSelectionProvider } from "@modules/products/single/components/ProductSelectionContext"
import { V2GlassDoorsSelector } from "@modules/products/single/components/V2GlassDoorsSelector"
import remarkGfm from "remark-gfm"
import Markdown from "react-markdown"

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

  // 获取颜色选项
  const glassdoorColors = glassdoorProduct?.options?.find(
    (option) => option.title === "Color"
  )
  const sortedColors = glassdoorColors?.values?.sort((a, b) =>
    a.value.localeCompare(b.value)
  )

  // 初始化默认值
  useEffect(() => {
    if (sortedColors && sortedColors.length > 0 && !selectedColor) {
      setSelectedColor(sortedColors[0])
    }
  }, [sortedColors, selectedColor])

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

  console.log("glassdoorProduct: ", glassdoorProduct)
  console.log("glassdoorCMSData: ", glassdoorCMSData)

  return (
    <ProductSelectionProvider product={glassdoorProduct}>
      <div className="w-full max-w-[1074px] mx-auto relative">
        <div className="lg:mx-auto flex flex-col  w-full relative z-10">
          <div className="flex flex-col w-full lg:flex-row justify-between items-start">
            <div className="flex flex-col max-w-[1074px] w-full mx-auto mt-10  gap-5 pb-5">
              <div className="flex flex-row justify-between items-start relative w-full gap-[24px]">
                {/* Left Content */}
                <div className="w-full lg:w-[64%] flex flex-col sticky top-0">
                  <div className="flex flex-row justify-between w-full">
                    <ImgContent
                      productImages={glassdoorCMSData.productImages || []}
                    />
                  </div>
                  <div className="text-[#2F2A1E] text-sm mt-12 pb-12 w-full prose max-w-none">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      // rehypePlugins={[rehypeRaw]}
                      remarkRehypeOptions={{ passThrough: ["link"] }}
                    >
                      {glassdoorCMSData.description}
                    </Markdown>
                  </div>
                </div>
                {/* Desktop View */}
                <V2GlassDoorsSelector
                  glassdoorProduct={glassdoorProduct}
                  glassdoorCMSData={glassdoorCMSData}
                  pergolaSizes={pergolaSizes}
                  pergolaSize={pergolaSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductSelectionProvider>
  )
}

export default GlassdoorProductPage
