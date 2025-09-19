"use client"

import { useCallback, useEffect, useState } from "react"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
} from "@medusajs/types"
import { useCart } from "@lib/context/cartContext"
import { selectedProducts, PergolaSize } from "types/global"
import { ImgContent } from "@modules/products/single/components/ImgContent"
import remarkGfm from "remark-gfm"
import { V2SunshadesSelector } from "@modules/products/single/components/V2SunshadesSelector"
import Markdown from "react-markdown"
import { ProductSelectionProvider } from "@modules/products/single/components/ProductSelectionContext"

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
  }, [selectedShades])

  // 处理颜色选择
  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }

  // 添加到购物车
  const handleAddToCart = async () => {
    if (selectedShades.length === 0 || isLoading) {
      return
    }

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
      <div className="w-full max-w-[1074px] mx-auto relative">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading shades product...</p>
        </div>
      </div>
    )
  }

  // console.log("shadesCMSData: ", shadesCMSData)
  console.log('shadesCMSData.productImages', shadesCMSData.productImages)
  return (
    <ProductSelectionProvider product={shadesProduct}>
      <div className="w-full relative">
        <div className="lg:mx-auto flex flex-col  w-full relative z-10">
          <div className="flex flex-col w-full lg:flex-row justify-between items-start">
            <div className="flex flex-col max-w-[1074px] w-full mx-auto mt-10  gap-5 pb-5">
              <div className="flex flex-row justify-between items-start relative w-full gap-[29px]">
                {/* Left Content */}
                <div className="w-full lg:w-[64%] flex flex-col sticky top-0">
                  <div className="flex flex-row justify-between w-full">
                    <ImgContent
                      productImages={shadesCMSData.productImages.sort((a:any, b: any) => b.id - a.id) || []}
                    />
                  </div>
                  <div className="text-[#2F2A1E] text-sm mt-12 pb-12 w-full prose max-w-none">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      // rehypePlugins={[rehypeRaw]}
                      remarkRehypeOptions={{ passThrough: ["link"] }}
                    >
                      {shadesCMSData.detailDescription}
                    </Markdown>
                  </div>
                </div>
                {/* Desktop View */}
                <V2SunshadesSelector
                  shadesProduct={shadesProduct}
                  shadesCMSData={shadesCMSData}
                  pergolaSizes={pergolaSizes}
                  pergolaSize={pergolaSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductSelectionProvider>
  )
}

export default ShadesProductPage
