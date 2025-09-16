"use client"
import React, { useMemo } from "react"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { IMG_BY_STYLE, PergolaFeatures, VALUE_BY_COLORS } from "./PergolaFeatures"
import { Button } from "@/components/ui/button"
import { DownloadIcon, FileDownIcon } from "lucide-react"

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
  }: Props): React.JSX.Element => {
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

        if (aWidth !== bWidth) {
          return aWidth - bWidth
        }
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

    // console.log('sortedColors',sortedColors)

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
        {/* Size Section with new UI */}
        <div className="mb-4">
          <div className="text-sm font-medium text-[#000000] mb-2 flex justify-between">
            <span> Size: {selectedSize?.value || "10'x10'"}</span>
            <span className="text-sm text-[#8c877c] mb-3">+ $876.00</span>
          </div>

          <PergolaFeatures selectedSize={selectedSize?.value || "10'x10'"} />

          <div className="grid grid-cols-2 gap-2">
            {sortedSizes?.map((size) => (
              <Button
                key={size.id}
                variant={selectedSize?.id === size.id ? "default" : "outline"}
                className={`h-12 text-base ${
                  selectedSize?.id === size.id
                    ? "bg-[#ffbf3c] font-semibold text-[#000000] border-[#ffbf3c]"
                    : "bg-transparent border-white text-[#8C877C]"
                }`}
                onClick={() => onSizeChange(size)}
              >
                {size.value}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Size */}
        <div className="mb-4">
          <Button
            variant="outline"
            className="w-full border-2 border-primary text-[#140E02] font-semibold bg-transparent"
            onClick={() => (window as any).tidioChatApi?.open()}
          >
            I Want A Custom Size
          </Button>
          <Button variant="link" className="text-xs px-0 text-[#2F2A1E] mt-1">
            <FileDownIcon className="w-4 h-4" color="#FFBF3C" />
            <span className="underline">Download Dimensions</span>
          </Button>
        </div>

        {/* Style Section */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-[#000000] mb-3">
            Style: {selectedStyle?.value || "Wall Mounted"}
          </div>
          <div className="flex gap-2">
            {sortedStyles?.map((style) => (
              <div
                key={style.id}
                className={`aspect-square flex-1 px-5 border-2 cursor-pointer flex flex-col items-center justify-center ${
                  selectedStyle?.id === style.id
                    ? "border-[#ffbf3c] bg-[#ffd379] text-black font-semibold"
                    : "border-white text-[#8C877C]"
                }`}
                onClick={() => onStyleChange(style)}
              >
                {/* <div className="w-full h-12 bg-[#2f2a1f] border border-[#d9d9d9] rounded mb-2"></div> */}
                <img className="w-2/3" src={IMG_BY_STYLE[style.value]} alt={style.value} />
                <div className="text-base text-center">
                  {style.value}
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-xs px-0 text-[#2F2A1E] mt-1">
            <FileDownIcon className="w-4 h-4" color="#FFBF3C" />
            <span className="underline">Download Specs</span>
          </Button>
        </div>

        {/* Color Section */}
        <div className="mb-12">
          <div className="text-sm font-semibold text-[#000000] mb-3">
            Structure Color: {selectedColor?.value || "Dark Gray"}
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
                onClick={() => onColorChange(color)}
              >
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
)
