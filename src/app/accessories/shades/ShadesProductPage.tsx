"use client"

import React from "react"
import { useCallback, useEffect, useState } from "react"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
} from "@medusajs/types"
import { ImageSlider } from "@modules/common/components/ImageSlider"
import { useCart } from "@lib/context/cartContext"
import { selectedProducts, PergolaSize } from "types/global"
import ShadesSideSelector from "@modules/products/single/components/AccesorriesPopup/ShadesSideSelector"
import { AddAccessories } from "@modules/products/single/components/AccesorriesPopup/AddAccessories"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"
interface ShadesPageClientProps {
  shadesProduct: StoreProduct
  shadesCMSData: any
  pergolaSizes: StoreProductOptionValue[]
  pergolaSize: PergolaSize
}

const ShadesProductPage = ({
  shadesProduct,
  shadesCMSData,
  pergolaSizes,
  pergolaSize,
}: ShadesPageClientProps) => {
  const { addVariant } = useCart()

  // 状态管理
  const [selectedPergolaSize, setSelectedPergolaSize] = useState<string>("")
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue | null>(null)
  const [selectedSides, setSelectedSides] = useState<string[]>([])
  const [selectedSize, setSelectedSize] = useState<string[]>([])
  const [selectedShades, setSelectedShades] = useState<selectedProducts>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalOriginalPrice, setTotalOriginalPrice] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shortSideLength, setShortSideLength] = useState<string>("")
  const [longSideLength, setLongSideLength] = useState<string>("")

  // 获取颜色选项
  const shadesColors: StoreProductOption | undefined =
    shadesProduct?.options?.find((option) => option.title === "Color")
  const sortedColors = shadesColors?.values?.sort((a, b) =>
    a.value.localeCompare(b.value)
  )

  // 根据选择获取对应的variant
  const getVariant = useCallback(() => {
    return shadesProduct?.variants?.filter((variant) => {
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
  }, [shadesProduct, selectedSize, selectedColor])

  // 初始化pergola尺寸长度
  useEffect(() => {
    console.log("Initial pergolaSize:", pergolaSize)
    setShortSideLength(pergolaSize.width.toString() + '"')
    setLongSideLength(pergolaSize.length.toString() + '"')
  }, [pergolaSize])

  // 当选择pergola尺寸时更新长度
  useEffect(() => {
    if (selectedPergolaSize) {
      console.log("Selected pergola size:", selectedPergolaSize)
      // 移除所有非数字和x的字符，然后按x分割
      const cleanSize = selectedPergolaSize.replace(/[^\dx]/gi, "")
      const parts = cleanSize.split("x")
      console.log("Clean size:", cleanSize, "Parts:", parts)

      if (parts.length === 2) {
        const width = parseInt(parts[0])
        const length = parseInt(parts[1])
        console.log("Parsed width:", width, "length:", length)
        if (width && length) {
          const shortSide = Math.min(width, length)
          const longSide = Math.max(width, length)
          console.log("Setting shortSide:", shortSide, "longSide:", longSide)
          setShortSideLength(shortSide.toString() + '"')
          setLongSideLength(longSide.toString() + '"')
        }
      }
    }
  }, [selectedPergolaSize])

  // 初始化默认值
  useEffect(() => {
    if (sortedColors && sortedColors.length > 0 && !selectedColor) {
      setSelectedColor(sortedColors[0])
    }
  }, [sortedColors, selectedColor])

  /**
   * 根据sides选择对应的size
   * @param sides
   */
  const handleSideSelect = (sides: string[]) => {
    setSelectedSides(sides)
    setSelectedSize(
      sides.map((side) => {
        if (side === "left" || side === "right") {
          return shortSideLength
        } else {
          return longSideLength
        }
      })
    )
  }

  // 更新选中的shades和价格
  useEffect(() => {
    const variants = getVariant()
    setSelectedShades(
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
      selectedShades.reduce((acc, shade) => {
        return (
          acc +
          (shade.productVarant?.calculated_price?.calculated_amount ?? 0) *
            shade.quantity
        )
      }, 0)
    )
    setTotalOriginalPrice(
      selectedShades.reduce((acc, shade) => {
        return (
          acc +
          (shade.productVarant?.calculated_price?.original_amount ?? 0) *
            shade.quantity
        )
      }, 0)
    )
  }, [selectedShades])

  // 处理颜色选择
  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }

  // 添加到购物车
  const handleAddToCart = async () => {
    if (selectedShades.length === 0 || isLoading) return

    setIsLoading(true)
    try {
      for (const shade of selectedShades) {
        if (shade.productVarant) {
          await addVariant({
            variantId: shade.productVarant.id,
            quantity: shade.quantity,
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

  // 如果没有产品数据，显示加载或错误状态
  if (!shadesProduct) {
    return (
      <div className="w-full max-w-[1512px] mx-auto relative">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading shades product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1512px] mx-auto relative">
      <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-[30px]">
        {/* 左侧产品图片 */}
        <div className="relative w-full lg:w-auto h-auto lg:h-[546px] aspect-[360/300] lg:aspect-[466/546]">
          <ImageSlider images={shadesCMSData?.product_images || []} />
        </div>

        {/* 右侧产品配置 */}
        <div className="flex flex-col justify-between w-full lg:w-1/2 items-start gap-10">
          <div className="flex flex-col items-start gap-5 self-stretch w-full">
            {/* 产品标题和价格 */}
            <div className="flex flex-col items-start lg:gap-2.5 py-2.5 self-stretch w-full">
              <div className="flex items-center justify-between w-full">
                <h2 className="self-stretch font-merriweather text-[#343a40] text-[22px] lg:text-[28px] font-bold leading-[39.2px]">
                  {shadesProduct?.title}
                </h2>
                <div className="flex items-end justify-start gap-4">
                  <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[22px] lg:text-[28px] leading-[32px] whitespace-nowrap relative tracking-[0]">
                    {totalPrice ? "$" + totalPrice.toFixed(2) : ""}
                  </div>
                </div>
              </div>

              {/* Pergola尺寸选择 */}
              <div className="flex flex-col items-start gap-4 mt-6">
                <h3 className="text-[#343A40] text-[16px] lg:text-[18px] [font-family:'Montserrat',sans-serif] font-medium">
                  What size is your pergola?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pergolaSizes.length > 0 ? (
                    pergolaSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => {
                          setSelectedPergolaSize(size.value)
                          // 重置选择
                          setSelectedSides([])
                          setSelectedSize([])
                        }}
                        className={`px-4 py-2 rounded-[20px] border transition-all ${
                          selectedPergolaSize === size.value
                            ? "bg-[#F6AF1F33] text-black border-[#F6AF1F33]"
                            : "bg-white border-[#E9E9E9] text-black"
                        }`}
                      >
                        {size.value}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No pergola sizes available
                    </p>
                  )}
                </div>
              </div>

              {/* 颜色选择 */}
              <div className="flex flex-col items-start gap-4 mt-6">
                <h3 className="text-[#343A40] text-[16px] lg:text-[18px] [font-family:'Montserrat',sans-serif] font-medium">
                  What color would you like to choose?
                </h3>
                <div className="flex items-center gap-[18px] flex-wrap">
                  {sortedColors && sortedColors.length > 0 ? (
                    sortedColors.map((color) => (
                      <div
                        key={color.id}
                        className="flex flex-row items-center gap-2.5 relative"
                      >
                        <button
                          className={`w-6 h-6 rounded-[20px] cursor-pointer border-2 border-solid ${
                            selectedColor?.id === color.id
                              ? "bg-[#F6AF1F33] border-[#F6AF1F]"
                              : "bg-[#ffffff] border-[#E9E9E9]"
                          }`}
                          onClick={() => handleColorClick(color)}
                        ></button>
                        <div
                          className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap ${
                            selectedColor?.id === color.id
                              ? "text-[#F6AF1F]"
                              : "text-[#343A40]"
                          }`}
                        >
                          {color.value}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No colors available</p>
                  )}
                </div>
              </div>

              {/* Shades边选择 */}
              {selectedPergolaSize && (
                <div className="mt-6">
                  <ShadesSideSelector
                    onSideSelect={handleSideSelect}
                    selectedSides={selectedSides}
                    shortSideLength={shortSideLength}
                    longSideLength={longSideLength}
                  />
                </div>
              )}

              {/* 产品描述 */}
              <p className="self-stretch text-[#68717a] leading-[22.4px] font-montserrat text-[16px] lg:text-base font-medium mt-6">
                {shadesProduct?.description}
              </p>
            </div>
          </div>

          {/* 底部操作区域 */}
          <div className="flex flex-col md:flex-row items-center justify-between self-stretch w-full gap-4">
            <a
              href="/upload_files/Sunshade_technical_sheet_new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2"
            >
              <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
              <h3 className="font-medium text-[#69727A] text-[14px] [font-family:'Montserrat',sans-serif]">
                Download specs
              </h3>
            </a>
            <div className="flex flex-row items-center gap-2.5 relative">
              <AddAccessories
                disabled={selectedShades.length === 0 || isLoading}
                buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-medium"
                property1="primary-button-l"
                text="Add Shades"
                addAccessory={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShadesProductPage
