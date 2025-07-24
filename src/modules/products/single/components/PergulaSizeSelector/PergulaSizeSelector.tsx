"use client"
import React, { useMemo } from "react"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { PergolaFeatures } from "./PergolaFeatures"

interface Props {
  className: string
  product: StoreProduct
  selectedSize?: StoreProductOptionValue
  selectedColor?: StoreProductOptionValue
  selectedStyle?: StoreProductOptionValue
  onSizeChange: (size: StoreProductOptionValue) => void
  onColorChange: (color: StoreProductOptionValue) => void
  onStyleChange: (style: StoreProductOptionValue) => void
}

export const PergulaSizeSelector = React.memo(
  ({
    className,
    product,
    selectedSize,
    selectedColor,
    selectedStyle,
    onSizeChange,
    onColorChange,
    onStyleChange,
  }: Props): JSX.Element => {
    // 使用useMemo缓存排序后的尺寸和颜色列表
    const sortedSizes = useMemo(() => {
      const pergolaSizes = product.options?.find(
        (option) => option.title === "Size"
      )
      return pergolaSizes?.values?.sort((a, b) => {
        const getDimensions = (size: string) => {
          const matches = size.match(/(\d+)["']x(\d+)["']/)
          return matches ? [parseInt(matches[1]), parseInt(matches[2])] : [0, 0]
        }

        const [aWidth, aLength] = getDimensions(a.value)
        const [bWidth, bLength] = getDimensions(b.value)

        if (aWidth !== bWidth) return aWidth - bWidth
        return aLength - bLength
      })
    }, [product.options])

    const sortedColors = useMemo(() => {
      const pergolaColors = product.options?.find(
        (option) => option.title === "Color"
      )
      return pergolaColors?.values?.sort((a, b) =>
        a.value.localeCompare(b.value)
      )
    }, [product.options])

    const sortedStyles = useMemo(() => {
      const pergolaStyles = product.options?.find(
        (option) => option.title === "Style"
      )
      return pergolaStyles?.values?.sort((a, b) =>
        a.value.localeCompare(b.value)
      )
    }, [product.options])
    return (
      <>
        <div
          className={`flex flex-col w-full items-start gap-5 relative ${className} mb-4`}
        >
          <div className="flex w-full items-center gap-2.5 relative">
            <h3 className="relative w-full mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[16px] tracking-[0] leading-6 whitespace-normal">
              What size do you want for your pergola?
            </h3>
          </div>

          <div className="relative h-12 2xl:w-auto">
            <div className="flex p-1 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
              <div className="inline-flex items-center gap-1 lg:gap-0 xl:gap-[18px] relative">
                {sortedSizes?.map((size) => (
                  <button
                    key={size.id}
                    className={`inline-flex items-center justify-center gap-2.5 p-1 relative flex-[0_0_auto] cursor-pointer ${
                      selectedSize?.id === size.id
                        ? "bg-[#F6AF1F33] rounded-[20px]"
                        : ""
                    }`}
                    onClick={() => onSizeChange(size)}
                  >
                    <div
                      className={`mx-2 lg:mx-0 xl:mx-2 relative w-fit 
                        mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium 
                        text-[16px] lg:text-[18px] tracking-[0] leading-[27px] whitespace-nowrap ${
                          selectedSize?.id === size.id
                            ? "text-[#072f6c]"
                            : "text-[#69727a]"
                        }`}
                    >
                      {size.value}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <PergolaFeatures selectedSize={selectedSize?.value || "10'x10'"} />
        </div>
        <div
          className={`flex flex-col items-start gap-2.5 relative ${className}`}
        >
          <div className="flex w-full items-center gap-2.5 relative">
            <h3 className="relative w-full mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[16px] tracking-[0] leading-6 whitespace-normal">
              What Color would you like to choose?
            </h3>
          </div>

          <div className="relative h-12">
            <div className="flex px-2 h-12">
              <div className="inline-flex items-center gap-[18px] relative">
                {sortedColors?.map((color) => (
                  <div
                    key={color.id}
                    className="flex flex-row items-center gap-2.5 relative"
                  >
                    <button
                      className={`w-10 h-10 rounded-[20px] cursor-pointer border-solid p-1 ${
                        selectedColor?.id === color.id
                          ? "border-[#F6AF1F] border-2"
                          : ""
                      }`}
                      onClick={() => onColorChange(color)}
                    >
                      <div
                        className={`w-full h-full rounded-[20px] ${
                          selectedColor?.id === color.id
                            ? "bg-[#F6AF1F33]"
                            : "bg-[#ffffff]"
                        }`}
                      ></div>
                    </button>
                    <div
                      className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-16 tracking-[0] leading-[27px] whitespace-nowrap text-[#F6AF1F]`}
                    >
                      {color.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col items-start gap-2.5 relative ${className}`}
        >
          <div className="flex w-full items-center gap-2.5 relative">
            <h3 className="relative w-full mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[16px] tracking-[0] leading-6 whitespace-normal">
              What Style would you like to choose?
            </h3>
          </div>

          <div className="relative h-12">
            <div className="flex px-2 h-12">
              <div className="inline-flex items-center gap-[18px] relative">
                {sortedStyles?.map((style) => (
                  <div
                    key={style.id}
                    className="flex flex-row items-center gap-2.5 relative"
                  >
                    <button
                      className={`rounded-[10px] cursor-pointer border-solid p-1 border-2 ${
                        selectedStyle?.id === style.id ? "border-[#F6AF1F]" : ""
                      }`}
                      onClick={() => onStyleChange(style)}
                    >
                      <div
                        className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-16 tracking-[0] leading-[27px] whitespace-nowrap text-[#F6AF1F]`}
                      >
                        {style.value}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
)
