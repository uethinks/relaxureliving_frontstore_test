"use client"
import React, { useEffect, useState, useCallback } from "react"
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
  const sortedColors = pergolaColors?.values?.sort((a, b) =>
    a.value.localeCompare(b.value)
  )
  const defaultSize: StoreProductOptionValue = pergolaSizes?.values?.[0] || {
    id: "",
    value: "",
  }
  const defaultColor: StoreProductOptionValue = pergolaColors?.values?.[0] || {
    id: "",
    value: "",
  }
  const [selectedSize, setSelectedSize] =
    useState<StoreProductOptionValue>(defaultSize)
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)

  const getVariant = useCallback(() => {
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
      return matchingSize && matchingColor
    })
  }, [product, selectedSize, selectedColor])

  const handleSizeClick = (size: StoreProductOptionValue) => {
    setSelectedSize(size)
  }
  useEffect(() => {
    const variant = getVariant()
    onVariantChange(variant)
  }, [selectedSize, selectedColor])

  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }

  return (
    <>
      <div
        className={`flex flex-col w-full items-start gap-5 relative ${className} mb-4`}
      >
        <div className="flex w-full items-center gap-2.5 relative">
          <p className="relative w-full mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[16px] tracking-[0] leading-6 whitespace-normal">
            What size do you want for your pergola?
          </p>
        </div>

        <div className="relative h-12 w-full 2xl:w-auto">
          <div className="flex p-1 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
            <div className="inline-flex items-center gap-1 md:gap-[18px] relative">
              {pergolaSizes?.values?.map((size) => (
                <button
                  key={size.id}
                  className={`inline-flex items-center justify-center gap-2.5 p-1 relative flex-[0_0_auto] cursor-pointer ${
                    selectedSize === size ? "bg-[#dce7f8] rounded-[20px]" : ""
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  <div
                    className={`mx-2 relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[16px] lg:text-[18px] tracking-[0] leading-[27px] whitespace-nowrap ${
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
        <div className="flex flex-col w-full items-start gap-5 relative text-[#343A40]">
          <div className="flex flex-row items-center gap-2.5 relative">
            <img src="/img/fits-people.png" alt="Fits People" />
            <p>Fits 2-4 people</p>
          </div>
          <div className="flex flex-row items-center gap-2.5 relative">
            <img src="/img/ideal.png" alt="Ideal" />
            <p>Perfect for morning coffee</p>
          </div>
          <div className="flex flex-row items-center gap-2.5 relative">
            <img src="/img/morning-coffee.png" alt="Morning Coffee" />
            <p>Ideal for small patios</p>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col items-start gap-2.5 relative ${className}`}
      >
        <div className="flex w-full items-center gap-2.5 relative">
          <p className="relative w-full mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[16px] tracking-[0] leading-6 whitespace-normal">
            What Color would you like to choose?
          </p>
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
                      selectedColor === color ? "border-[#072F6C] border-2" : ""
                    }`}
                    onClick={() => handleColorClick(color)}
                  >
                    <div
                      className={`w-full h-full rounded-[20px]   ${
                        color.value == "Dark Gray"
                          ? "bg-[#7F7F7F]"
                          : "bg-[#ffffff]"
                      } `}
                    ></div>
                  </button>
                  <div
                    className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-16 tracking-[0] leading-[27px] whitespace-nowrap text-[#072f6c]`}
                  >
                    {color.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
