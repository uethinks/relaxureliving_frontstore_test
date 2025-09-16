"use client"

import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { useCallback, useEffect, useState } from "react"
import { useCart } from "@lib/context/cartContext"
import { ProductSelectionProvider } from "@modules/products/single/components/ProductSelectionContext"
import { ImgContent } from "@modules/products/single/components/ImgContent"
import remarkGfm from "remark-gfm"
import Markdown from "react-markdown"
import { V2HeatersSelector } from "@modules/products/single/components/V2HeatersSelector"
import { V2SampleKitSelector } from "@modules/products/single/components/V2SampleKitSelector"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

interface SampleKitProductPageProps {
  sampleKitProduct: StoreProduct
  sampleKitCMSData: any
}

export const SampleKitProductPage = ({
  sampleKitProduct,
  sampleKitCMSData,
}: SampleKitProductPageProps): JSX.Element => {
  const { addVariant } = useCart()
  const [selectedHeater, setSelectedHeater] =
    useState<StoreProductVariant | null>(sampleKitProduct?.variants?.[0] || null)
  const [selectedHeaterQuantity, setSelectedHeaterQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const heaterSizes: StoreProductOption | undefined =
    sampleKitProduct?.options?.find((option) => option.title === "Watt")
  const heaterColors: StoreProductOption | undefined =
    sampleKitProduct?.options?.find((option) => option.title === "Color")
  const sortedColors = heaterColors?.values?.sort((a, b) =>
    a.value.localeCompare(b.value)
  )

  const defaultSize: StoreProductOptionValue = {
    id: "",
    value: "",
  }
  const defaultColor: StoreProductOptionValue = heaterColors?.values?.[0] || {
    id: "",
    value: "",
  }

  console.log("sampleKitProduct", sampleKitProduct)
  console.log("sampleKitCMSData", sampleKitCMSData)

  const [selectedSize, setSelectedSize] =
    useState<StoreProductOptionValue>(defaultSize)
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)

  useEffect(() => {
    setSelectedSize(
      heaterSizes?.values?.[0] || {
        id: "",
        value: "",
      }
    )
    setSelectedColor(
      heaterColors?.values?.[0] || {
        id: "",
        value: "",
      }
    )
  }, [heaterSizes, sortedColors])

  const getVariant = useCallback(() => {
    return sampleKitProduct?.variants?.find((variant) => {
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Watt" && option.value === selectedSize.value
      )
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Color" &&
          option.value === selectedColor.value
      )
      return matchingSize && matchingColor
    })
  }, [sampleKitProduct, selectedSize, selectedColor])

  useEffect(() => {
    const variant = getVariant()
    if (variant) {
      setSelectedHeater(variant)
    }
  }, [selectedSize, selectedColor, getVariant])

  const totalPrice = selectedHeater?.calculated_price?.calculated_amount
    ? selectedHeater?.calculated_price?.calculated_amount *
      selectedHeaterQuantity
    : 0

  console.log("sampleKitCMSData", sampleKitCMSData)
  console.log("sampleKitProduct", sampleKitProduct)

  return (
    <ProductSelectionProvider product={sampleKitProduct}>
      <div className="w-full max-w-[1074px] mx-auto relative">
        <div className="lg:mx-auto flex flex-col  w-full relative z-10">
          <div className="flex flex-col w-full lg:flex-row justify-between items-start">
            <div className="flex flex-col max-w-[1074px] w-full mx-auto mt-10  gap-5 pb-5">
              <div className="flex flex-row justify-between items-start relative w-full gap-[65px]">
                {/* Left Content */}
                <div className="w-full lg:w-[64%] flex flex-col sticky top-0">
                  <div className="flex flex-row justify-between w-full">
                    <ImgContent
                      productImages={sampleKitCMSData.productImages || []}
                    />
                  </div>
                  <div className="text-[#2F2A1E] text-sm mt-12 pb-12 w-full prose max-w-none">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      // rehypePlugins={[rehypeRaw]}
                      remarkRehypeOptions={{ passThrough: ["link"] }}
                    >
                      {sampleKitCMSData.description}
                    </Markdown>
                  </div>
                </div>
                {/* Desktop View */}
                <V2SampleKitSelector
                  sampleKitProduct={sampleKitProduct}
                  sampleKitCMSData={sampleKitCMSData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductSelectionProvider>
  )
}
