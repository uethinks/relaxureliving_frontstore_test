"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react"
import { BuyNowButton } from "./BuyNowButton"
import {
  StoreProduct,
  StoreProductVariant,
  StoreProductOptionValue,
} from "@medusajs/types"
import { PergolaSize, selectedProducts } from "types/global"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"
import { useProductSelection } from "./ProductSelectionContext"
import { Badge } from "@/components/ui/badge"
import { MoveDownRight, FileDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@lib/context/cartContext"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import V2ServiceDescription from "@/components/V2ServiceDescription"
import { freeServices } from "@lib/utils"
import V2SupportSection from "@/components/V2SupportSection"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

// PergolaFeatures 相关常量和接口
interface Feature {
  icon: string
  text: string
}

// 定义常用的图标常量
const FITS_PEOPLE_ICON = "/img/fits-people.png"

// 定义常用的feature常量
const FITS_PEOPLE_2_4: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 2-4 People",
}
const FITS_PEOPLE_4_6: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 4-6 People",
}
const FITS_PEOPLE_6_8: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 6-8 People",
}
const FITS_PEOPLE_8_12: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 8-12 People",
}
const MORNING_COFFEE: Feature = {
  icon: "/img/morning-coffee.png",
  text: "Perfect For Morning Coffee",
}
const SMALL_PATIO: Feature = {
  icon: "/img/small-patio.png",
  text: "Ideal For Small Patios",
}
const HIGHER_CEILING: Feature = {
  icon: "/img/ceiling.png",
  text: "Higher Ceiling 8.29FT(268cm)",
}
const SMALL_BBQ: Feature = {
  icon: "/img/bbq.png",
  text: "Perfect For Small BBQ",
}
const MODULAR_SOFA: Feature = {
  icon: "/img/sofa.png",
  text: "Fits A Modular Sofa",
}
const SMALL_KITCHEN: Feature = {
  icon: "/img/kitchen.png",
  text: "Fits A Small Kitchen Set",
}
const HOSTING_PARTIES: Feature = {
  icon: "/img/party.png",
  text: "Perfect For Hosting Parties",
}
const EXPANSIVE_BACKYARD: Feature = {
  icon: "/img/backyard.png",
  text: "Ideal For Expansive Backyards",
}
const OUTDOOR_RETREATS: Feature = {
  icon: "/img/outdoor.png",
  text: "Perfect For Outdoor Retreats",
}
const MULTIPLE_SEATING: Feature = {
  icon: "/img/small-patio.png",
  text: "Ideal For Multiple Seating Areas",
}

const FEATURES_BY_SIZE: Record<string, Feature[]> = {
  "10'x10'": [FITS_PEOPLE_2_4, MORNING_COFFEE, SMALL_PATIO, HIGHER_CEILING],
  "10'x13'": [
    FITS_PEOPLE_4_6,
    MORNING_COFFEE,
    SMALL_BBQ,
    MODULAR_SOFA,
    SMALL_PATIO,
    HIGHER_CEILING,
  ],
  "13'x13'": [
    FITS_PEOPLE_6_8,
    SMALL_BBQ,
    MODULAR_SOFA,
    SMALL_KITCHEN,
    HOSTING_PARTIES,
    HIGHER_CEILING,
  ],
  "13'x19'": [
    FITS_PEOPLE_8_12,
    EXPANSIVE_BACKYARD,
    OUTDOOR_RETREATS,
    MULTIPLE_SEATING,
    SMALL_KITCHEN,
    HOSTING_PARTIES,
    HIGHER_CEILING,
  ],
}

// Color Dark Gray, White
const VALUE_BY_COLORS: Record<string, string> = {
  "Dark Gray": "#252D35",
  "Dark Grey": "#252D35",
  White: "#FFFFFF",
}

// style CONFIG
const IMG_BY_STYLE: Record<string, string> = {
  "Wall Mounted": "/img/product_style_wall_mounted.png",
  Freestanding: "/img/product_style_freestanding.png",
}

// V2AccesorriesSelector 相关常量
const ACCESSORY_NAMES = {
  HEATING: "Heating",
  SHADES: "Shades",
  GLASS_DOOR: "Glass door",
} as const

type accessoriesIcons = {
  name: string
  title: string
  image: string
  selected: boolean
}

interface V2SunshadesSelectorProps {
  shadesProduct: StoreProduct
  shadesCMSData: any
  pergolaSizes: StoreProductOptionValue[]
  pergolaSize: PergolaSize
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0)

export const V2SunshadesSelector: React.FC<V2SunshadesSelectorProps> = ({
  shadesProduct,
  shadesCMSData,
  pergolaSizes,
  pergolaSize,
}) => {
  const { addVariant } = useCart()
  const [selectedPergolaSize, setSelectedPergolaSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<StoreProductOptionValue>()
  const [selectedGlassdoor, setSelectedGlassdoor] = useState<selectedProducts>(
    []
  )
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [manualQuantity, setManualQuantity] = useState<number>(1)

  // Quantity control functions
  const incrementQuantity = () => {
    setManualQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setManualQuantity((prev) => Math.max(1, prev - 1))
  }

  // 获取颜色选项
  const shadesColors = shadesProduct?.options?.find(
    (option) => option.title === "Frame Color"
  )
  const sortedColors = shadesColors?.values?.sort((a, b) =>
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
    console.log("variants: ", variants)
    setSelectedGlassdoor(
      variants?.map((variant) => ({
        productVarant: variant,
        quantity: selectedPergolaSize?.includes(
          variant?.length?.toString() ?? ""
        )
          ? 1
          : 0,
      })) || []
    )
  }, [selectedPergolaSize, selectedColor])

  // 计算价格
  useEffect(() => {
    console.log("selectedGlassdoor: ", selectedGlassdoor)
    setCalculatedPrice(
      selectedGlassdoor[0]?.productVarant?.calculated_price
        ?.calculated_amount ?? 0
    )
    setTotalPrice(
      manualQuantity *
        (selectedGlassdoor[0]?.productVarant?.calculated_price
          ?.calculated_amount ?? 0)
    )

    setTotalOriginalPrice(
      manualQuantity *
        (selectedGlassdoor[0]?.productVarant?.calculated_price
          ?.original_amount ?? 0)
    )
  }, [selectedGlassdoor, manualQuantity])

  // 添加到购物车
  const handleAddToCart = async () => {
    if (manualQuantity === 0 || isLoading) {
      return
    }

    setIsLoading(true)
    try {
      for (const glassdoor of selectedGlassdoor) {
        if (glassdoor.productVarant) {
          await addVariant({
            variantId: glassdoor.productVarant.id,
            quantity: manualQuantity,
            countryCode: defaultCountryCode,
          })
        }
      }
      window.location.href = "/cart"
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 获取变体
  const getVariant = useCallback(() => {
    return shadesProduct?.variants?.filter((variant) => {
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Size" &&
          selectedPergolaSize?.includes(variant?.length?.toString() ?? "")
      )
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Frame Color" &&
          option.value === selectedColor?.value
      )
      return matchingSize && matchingColor
    })
  }, [shadesProduct, selectedPergolaSize, selectedColor])

  // Calculate monthly payment
  const monthlyPayment = totalPrice / 24
  const savingsPercentage =
    totalOriginalPrice > 0
      ? Math.round(
          ((totalOriginalPrice - totalPrice) / totalOriginalPrice) * 100
        )
      : 0

  return (
    <div className="hidden lg:flex w-full flex-1 justify-start items-start gap-2.5 sticky top-0">
      <div className="w-full">
        {/* Header */}
        <div className="pb-4 border-[#d9d9d9]">
          <p className="text-[#2F2A1E] text-xl mb-2">Relaxure Accessories</p>
          <h1 className="text-[#2F2A1E] text-3xl font-semibold">
            {shadesCMSData?.name}
          </h1>
        </div>
        <div className="text-[#2F2A1E] text-sm">
          <Markdown remarkPlugins={[remarkGfm]}>
            {shadesCMSData.shortDescription}
          </Markdown>
        </div>
        {/* Sale Banner */}
        {/* {(
          <div className="mt-4 p-4 border border-highlight bg-white">
            <p className="text-black text-base font-medium text-center">
              End Of Season Clearance Sale:
            </p>
            <p className="text-black text-2xl font-semibold text-center">
              Up To ${Math.round((totalOriginalPrice - totalPrice) / 100) * 100}{" "}
              OFF!
            </p>
            <p className="text-highlight text-xl font-semibold text-center">
              03:21:16:57
            </p>
          </div>
        )} */}

        {/* Price Section */}
        <div className="mt-4 w-full">
          <p className="text-[#140E02] text-sm font-semibold">Price:</p>
          <div className="flex items-center gap-2 w-full mb-4">
            <span className="text-[#000000] text-3xl font-bold">
              {formatPrice(totalPrice)}
            </span>
            {savingsPercentage > 0 && (
              <Badge className="bg-highlight rounded-none text-white font-bold px-6 py-2 [clip-path:polygon(15px_0,100%_0,100%_100%,15px_100%,0_50%)]">
                {savingsPercentage}% off
              </Badge>
            )}
          </div>
          {totalOriginalPrice > totalPrice && (
            <p className="text-[#8c8c8c] text-xl">
              <span className="line-through font-semibold">
                {formatPrice(totalOriginalPrice)}
              </span>{" "}
              <span className="text-[#ff5f00]">
                Save {formatPrice(totalOriginalPrice - totalPrice)}
              </span>
            </p>
          )}
          <div className="text-black text-sm mt-1 p-4 border border-white flex items-center gap-2">
            <img src="/img/Klarna.png" alt="Klarna" className="h-6" />{" "}
            <span>Pay </span>{" "}
            <span className="font-semibold">
              {formatPrice(monthlyPayment)}/Mo x 24
            </span>{" "}
            <span>With Klarna</span>
          </div>
        </div>

        {/* Size, Style, and Color Selection - 内联 PergulaSizeSelector 逻辑 */}
        <div className="mt-8 mb-6">
          {/* Size Section with new UI */}
          <div className="flex flex-col items-start gap-5">
            <div className="text-sm font-medium text-[#000000] flex justify-between w-full">
              <span> Size: {selectedPergolaSize}</span>
              <span className="text-sm text-[#8c877c] mb-3">
                + {formatPrice(calculatedPrice)}
              </span>
            </div>
            {/* Quantity Selector */}
            <div className="flex justify-between items-center border border-white bg-transparent w-full">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 text-gray-700 hover:bg-primary-light transition-colors"
                disabled={manualQuantity <= 1}
              >
                −
              </button>
              <span className="px-4 py-2 text-gray-700 min-w-[50px] text-center">
                {manualQuantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 text-gray-700 hover:bg-primary-light transition-colors"
              >
                +
              </button>
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              {shadesProduct?.options
                ?.find((option) => option.title === "Size")
                ?.values?.map((size) => (
                  <Button
                    key={size.id}
                    variant={
                      selectedPergolaSize?.includes(size.value)
                        ? "default"
                        : "outline"
                    }
                    className={`h-12 text-base ${
                      selectedPergolaSize?.includes(size.value)
                        ? "bg-primary-light font-semibold text-[#000000] border-[#ffbf3c]"
                        : "bg-transparent border-white text-[#8C877C]"
                    }`}
                    onClick={() => {
                      setSelectedPergolaSize(size.value)
                      console.log("selectedSize: ", size)
                    }}
                  >
                    {size.value}
                  </Button>
                ))}
            </div>
            <Button variant="link" className="text-xs px-0 text-[#2F2A1E] py-0">
              <FileDownIcon className="w-4 h-4" color="#FFBF3C" />
              <span className="underline">Download dimensions</span>
            </Button>
            {/* Color Section */}
            <div className="w-full">
              <div className="text-sm font-semibold text-[#000000] mb-3">
                Frame Color: {selectedColor?.value || "Dark Gray"}
              </div>
              <div className="flex gap-2">
                {sortedColors?.map((color) => (
                  <div
                    key={color.id}
                    className={`h-6 w-6 border-2 cursor-pointer ${
                      selectedColor?.id === color.id
                        ? "border-[#ffbf3c] bg-[#ffd379]"
                        : "border-none"
                    }`}
                    style={{ backgroundColor: VALUE_BY_COLORS[color.value] }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service Sections */}
        <V2ServiceDescription data={freeServices} />

        {/* Add to Cart Button - Using BuyNowButton */}
        <div className="mt-6 sticky bottom-0">
          <BuyNowButton
            property1="primary-button-l"
            text="Add to Cart"
            className="w-full"
            onClick={handleAddToCart}
          />
        </div>

        <V2SupportSection />
      </div>
    </div>
  )
}
