"use client"
import React, { useState } from "react"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
interface Props {
  property1: "default"
  className: string
  onVariantChange: (variant: StoreProductVariant | undefined) => void
  product: StoreProduct
}

export const PergulaSizeSelector = ({
  property1,
  className,
  onVariantChange,
  product,
}: Props): JSX.Element => {
  const pergolaSizes: StoreProductOption | undefined = product.options?.find(
    (option) => option.title === "Size"
  )
  const pergolaColors: StoreProductOption | undefined = product.options?.find(
    (option) => option.title === "Color"
  )
  const pergolaStyles: StoreProductOption | undefined = product.options?.find(
    (option) => option.title === "Style"
  )
  const defaultSize: StoreProductOptionValue = pergolaSizes?.values?.[0] || {
    id: "",
    value: "",
  }
  const defaultColor: StoreProductOptionValue = pergolaColors?.values?.[0] || {
    id: "",
    value: "",
  }
  const defaultStyle: StoreProductOptionValue = pergolaStyles?.values?.[0] || {
    id: "",
    value: "",
  }
  const [selectedSize, setSelectedSize] =
    useState<StoreProductOptionValue>(defaultSize)
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)
  const [selectedStyle, setSelectedStyle] =
    useState<StoreProductOptionValue>(defaultStyle)
  const getVariant = () => {
    return product.variants?.find((variant) => {
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
  }
  const handleSizeClick = (size: StoreProductOptionValue) => {
    setSelectedSize(size)
    const variant = getVariant()
    onVariantChange(variant)
  }

  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
    const variant = getVariant()
    onVariantChange(variant)
  }

  const handleStyleClick = (style: StoreProductOptionValue) => {
    setSelectedStyle(style)
    const variant = getVariant()
    onVariantChange(variant)
  }

  return (
    <>
      <div
        className={`inline-flex flex-col items-start gap-5 relative ${className}`}
      >
        <div className="inline-flex h-6 items-center gap-2.5 relative">
          <p className="relative w-[327px] h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-18 tracking-[0] leading-6 whitespace-nowrap">
            What size do you want for your pergola?
          </p>
        </div>

        <div className="relative h-12">
          <div className="flex px-2 h-12 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
            <div className="inline-flex items-center gap-[18px] relative">
              {pergolaSizes?.values?.map((size) => (
                <button
                  key={size.id}
                  className={`inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] cursor-pointer ${
                    selectedSize === size ? "bg-[#dce7f8] rounded-[20px]" : ""
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  <div
                    className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap ${
                      selectedSize === size
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
      </div>
      <div
        className={`inline-flex flex-col items-start gap-5 relative ${className}`}
      >
        <div className="inline-flex h-6 items-center gap-2.5 relative">
          <p className="relative w-[327px] h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-18 tracking-[0] leading-6 whitespace-nowrap">
            What Color do you want for your pergola?
          </p>
        </div>

        <div className="relative h-12">
          <div className="flex px-2 h-12 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
            <div className="inline-flex items-center gap-[18px] relative">
              {pergolaColors?.values?.map((color) => (
                <button
                  key={color.id}
                  className={`inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] cursor-pointer ${
                    selectedColor === color ? "bg-[#dce7f8] rounded-[20px]" : ""
                  }`}
                  onClick={() => handleColorClick(color)}
                >
                  <div
                    className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap ${
                      selectedColor === color
                        ? "text-[#072f6c]"
                        : "text-[#69727a]"
                    }`}
                  >
                    {color.value}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`inline-flex flex-col items-start gap-5 relative ${className}`}
      >
        <div className="inline-flex h-6 items-center gap-2.5 relative">
          <p className="relative w-[327px] h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-18 tracking-[0] leading-6 whitespace-nowrap">
            What Style do you want for your pergola?
          </p>
        </div>

        <div className="relative h-12">
          <div className="flex px-2 h-12 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
            <div className="inline-flex items-center gap-[18px] relative">
              {pergolaStyles?.values?.map((style) => (
                <button
                  key={style.id}
                  className={`inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] cursor-pointer ${
                    selectedStyle === style ? "bg-[#dce7f8] rounded-[20px]" : ""
                  }`}
                  onClick={() => handleStyleClick(style)}
                >
                  <div
                    className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap ${
                      selectedStyle === style
                        ? "text-[#072f6c]"
                        : "text-[#69727a]"
                    }`}
                  >
                    {style.value}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
