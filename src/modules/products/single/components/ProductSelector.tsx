"use client"
import React, { useState, useEffect, useCallback } from "react"
import { BuyNowButton } from "./BuyNowButton"
import { PergulaSizeSelector } from "./PergulaSizeSelector"
import { AccesorriesSelector } from "./AccesorriesSelector"
import {
  StoreProduct,
  StoreProductVariant,
  StoreProductOptionValue,
} from "@medusajs/types"
import { PergolaSize, selectedProducts } from "types/global"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"
import { useProductSelection } from "./ProductSelectionContext"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"
interface ProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  accessoriesCMSData: any
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  product,
  accessories,
  accessoriesCMSData,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<StoreProductVariant>()
  const [pergolaSize, setPergolaSize] = useState<PergolaSize>({
    width: 0,
    length: 0,
  })
  const [selectedAccessoriesHeater, setSelectedAccessoriesHeater] =
    useState<selectedProducts>([])
  const [selectedAccessoriesShades, setSelectedAccessoriesShades] =
    useState<selectedProducts>([])
  const [selectedAccessoriesGlassdoor, setSelectedAccessoriesGlassdoor] =
    useState<selectedProducts>([])
  const [pergolaQuantity, setPergolaQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const router = useRouter()

  // 使用 Context 获取状态
  const {
    selectedSize,
    selectedColor,
    selectedStyle,
    setSelectedSize,
    setSelectedColor,
    setSelectedStyle,
  } = useProductSelection()
  console.log('selectedColor', selectedColor)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0)

  useEffect(() => {
    if (!selectedSize || !selectedColor || !selectedStyle) {
      return
    }

    const variant = product.variants?.find((variant) => {
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Size" && option.value === selectedSize.value
      )
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Color" &&
          option.value === selectedColor.value
      )
      const matchingStyle = variant?.options?.find(
        (option) =>
          option.option?.title === "Style" &&
          option.value === selectedStyle.value
      )
      return matchingSize && matchingColor && matchingStyle
    })

    setSelectedVariant(variant)
    setPergolaSize({
      width: variant?.width ?? 0,
      length: variant?.length ?? 0,
    })
    setTotalPrice(
      pergolaQuantity * (variant?.calculated_price?.calculated_amount ?? 0)
    )
    setTotalOriginalPrice(
      pergolaQuantity * (variant?.calculated_price?.original_amount ?? 0)
    )
    setSelectedAccessoriesShades([])
    setSelectedAccessoriesGlassdoor([])
  }, [selectedSize, selectedColor, selectedStyle, product, pergolaQuantity])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSizeChange = useCallback(
    (size: StoreProductOptionValue) => {
      setSelectedSize(size)
    },
    [setSelectedSize]
  )

  const handleColorChange = useCallback(
    (color: StoreProductOptionValue) => {
      setSelectedColor(color)
    },
    [setSelectedColor]
  )

  const handleStyleChange = useCallback(
    (style: StoreProductOptionValue) => {
      setSelectedStyle(style)
    },
    [setSelectedStyle]
  )

  const handleAccessoryToggle = useCallback(
    ({
      type,
      selectedProducts,
    }: {
      type: string
      selectedProducts: selectedProducts
    }) => {
      console.log("handleAccessoryToggle type", type, selectedProducts)
      if (type === "Heating") {
        setSelectedAccessoriesHeater(selectedProducts)
      } else if (type === "Shades") {
        setSelectedAccessoriesShades(selectedProducts)
      } else if (type === "Glass door") {
        setSelectedAccessoriesGlassdoor(selectedProducts)
      }
    },
    []
  )

  const handleBuyNow = async () => {
    try {
      await Promise.all([
        buyPergula(),
        buyHeater(),
        buyShades(),
        buyGlassdoor(),
      ])

      router.push("/checkout")
    } catch (error) {
      console.error("Error adding items to cart:", error)
    }
  }

  const buyPergula = async () => {
    if (!selectedVariant?.id) {
      return null
    }

    try {
      const result = await addToCart({
        variantId: selectedVariant.id,
        quantity: pergolaQuantity,
        countryCode: defaultCountryCode,
      })
      return result
    } catch (error) {
      console.error("Error adding pergola to cart:", error)
      throw error
    }
  }

  const buyHeater = async () => {
    if (selectedAccessoriesHeater.length === 0) {
      return null
    }

    const addToCartPromises = selectedAccessoriesHeater
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: defaultCountryCode,
          })
          return result
        } catch (error) {
          console.error("Error adding heater to cart:", error)
          throw error
        }
      })

    try {
      const results = await Promise.all(addToCartPromises)
      return results
    } catch (error) {
      console.error("Error adding heaters to cart:", error)
      throw error
    }
  }

  const buyShades = async () => {
    if (selectedAccessoriesShades.length === 0) {
      return null
    }

    const addToCartPromises = selectedAccessoriesShades
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: defaultCountryCode,
          })
          return result
        } catch (error) {
          console.error("Error adding item to cart:", error)
          throw error
        }
      })

    try {
      const results = await Promise.all(addToCartPromises)
      return results
    } catch (error) {
      console.error("Error adding shades to cart:", error)
      throw error
    }
  }

  const buyGlassdoor = async () => {
    if (selectedAccessoriesGlassdoor.length === 0) {
      return null
    }

    const addToCartPromises = selectedAccessoriesGlassdoor
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: defaultCountryCode,
          })
          return result
        } catch (error) {
          console.error("Error adding glassdoor to cart:", error)
          throw error
        }
      })

    try {
      const results = await Promise.all(addToCartPromises)
      return results
    } catch (error) {
      console.error("Error adding glassdoors to cart:", error)
      throw error
    }
  }

  return (
    <div className="hidden lg:flex w-full lg:max-w-[36%] justify-end items-start gap-2.5 px-2.5 sticky top-0">
      <div className="flex flex-col w-full items-start gap-2.5 md:p-5 relative bg-[#f3f3f3] rounded-[20px]">
        {isClient && (
          <div className="absolute left-0 top-0 mt-4 z-10">
            <div className="bg-[#ADEBB3] text-[#0A3B5C] rounded-r-[10px] px-4 py-2 font-medium text-lg shadow">
              Save{" "}
              {totalOriginalPrice > 0
                ? Math.round(
                    ((totalOriginalPrice - totalPrice) / totalOriginalPrice) *
                      100
                  )
                : 0}
              %
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between mt-12 mb-2">
          <div className="flex items-end gap-4">
            <span className="font-bold text-[36px] leading-[32px]">
              {formatPrice(totalPrice)}
            </span>
            <span className="text-[#6c757d] text-[24px] line-through">
              {formatPrice(totalOriginalPrice)}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() =>
                setPergolaQuantity(
                  pergolaQuantity > 1 ? pergolaQuantity - 1 : 1
                )
              }
              className="w-8 h-8 bg-white rounded-full border border-[#e9ecef] flex items-center justify-center text-xl shadow"
            >
              -
            </button>
            <span className="text-[#343a40] text-lg font-medium">
              {pergolaQuantity}
            </span>
            <button
              onClick={() => setPergolaQuantity(pergolaQuantity + 1)}
              className="w-8 h-8 bg-white rounded-full border border-[#e9ecef] flex items-center justify-center text-xl shadow"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-full mb-4">
          <p className="text-[#0A3B5C] text-base">
            Pay {formatPrice(totalPrice / 24)}/mo x 24 with{" "}
            <span className="font-bold">Klarna.</span>
          </p>
        </div>
        <div className="flex flex-col w-full items-end gap-2.5 relative">
          <PergulaSizeSelector
            product={product}
            className="!self-stretch !flex-[0_0_auto] !flex"
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            selectedStyle={selectedStyle}
            onSizeChange={handleSizeChange}
            onColorChange={handleColorChange}
            onStyleChange={handleStyleChange}
          />
          <AccesorriesSelector
            pergolaSize={pergolaSize}
            selectedColor={selectedColor}
            onAccessoryChange={handleAccessoryToggle}
            accessories={accessories}
            selectedHeaterVariant={selectedAccessoriesHeater}
            selectedShadesVariant={selectedAccessoriesShades}
            selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
            accessoriesCMSData={accessoriesCMSData}
          />
        </div>
        <BuyNowButton
          onClick={handleBuyNow}
          property1="primary-button-l"
          text="Add to cart"
          className=""
        />
        <div className="w-full flex flex-row justify-center items-center gap-2.5 relative text-[#072F6C] mt-2 underline">
          <a
            href="/#sample-kit"
            className="text-[#072F6C] hover:text-[#0a4499] transition-colors duration-200"
          >
            Not ready to buy yet? Try a sample kit.
          </a>
        </div>
      </div>
    </div>
  )
}
