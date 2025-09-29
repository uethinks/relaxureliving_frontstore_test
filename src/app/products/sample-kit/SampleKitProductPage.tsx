"use client"

import { useCart } from "@lib/context/cartContext"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { ProductSelectionProvider } from "@modules/products/single/components/ProductSelectionContext"
import V2ProductPage from "@modules/products/single/components/V2ProductPage"
import { V2SampleKitSelector } from "@modules/products/single/components/V2SampleKitSelector"
import { useCallback, useEffect, useState } from "react"

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
    useState<StoreProductVariant | null>(
      sampleKitProduct?.variants?.[0] || null
    )
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
      <V2ProductPage cmsData={sampleKitCMSData}>
        {/* Desktop View */}
        <V2SampleKitSelector
          sampleKitProduct={sampleKitProduct}
          sampleKitCMSData={sampleKitCMSData}
        />
      </V2ProductPage>
    </ProductSelectionProvider>
  )
}
