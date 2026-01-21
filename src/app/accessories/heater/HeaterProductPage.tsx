"use client"

import V2ProductPage from "@/modules/products/single/components/V2ProductPage"
import { useCart } from "@lib/context/cartContext"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { ProductSelectionProvider } from "@modules/products/single/components/ProductSelectionContext"
import { V2HeatersSelector } from "@modules/products/single/components/V2HeatersSelector"
import { useCallback, useEffect, useState } from "react"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

interface HeaterProductPageProps {
  heaterProduct: StoreProduct
  heaterCMSData: any
}

export const HeaterProductPage = ({
  heaterProduct,
  heaterCMSData,
}: HeaterProductPageProps): JSX.Element => {
  const { addVariant } = useCart()
  const [selectedHeater, setSelectedHeater] =
    useState<StoreProductVariant | null>(heaterProduct?.variants?.[0] || null)
  const [selectedHeaterQuantity, setSelectedHeaterQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const heaterSizes: StoreProductOption | undefined =
    heaterProduct?.options?.find((option) => option.title === "Watt")
  const heaterColors: StoreProductOption | undefined =
    heaterProduct?.options?.find((option) => option.title === "Color")
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
    return heaterProduct?.variants?.find((variant) => {
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
  }, [heaterProduct, selectedSize, selectedColor])

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

  const addAccessoryHeaterHandler = async () => {
    if (selectedHeater && selectedHeaterQuantity > 0) {
      try {
        setIsAddingToCart(true)
        await addVariant({
          variantId: selectedHeater.id,
          quantity: selectedHeaterQuantity,
          countryCode: defaultCountryCode, // 可以根据需要调整
        })
        window.location.href = "/cart"
        // console.log("Heater added to cart successfully!")
      } catch (error) {
        console.error("Failed to add heater to cart:", error)
        // 这里可以添加错误提示
      } finally {
        setIsAddingToCart(false)
      }
    }
  }

  return (
    <ProductSelectionProvider product={heaterProduct}>
      <V2ProductPage cmsData={heaterCMSData}>
        <V2HeatersSelector
          heaterProduct={heaterProduct}
          heaterCMSData={heaterCMSData}
        />
      </V2ProductPage>
    </ProductSelectionProvider>
  )
}
