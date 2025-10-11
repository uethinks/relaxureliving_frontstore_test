"use client"

import V2ProductPage from "@/modules/products/single/components/V2ProductPage"
import { useCart } from "@lib/context/cartContext"
import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
} from "@medusajs/types"
import { ProductSelectionProvider } from "@modules/products/single/components/ProductSelectionContext"
import { V2SunshadesSelector } from "@modules/products/single/components/V2SunshadesSelector"
import { useCallback, useEffect, useState, useMemo } from "react"
import { PergolaSize, selectedProducts } from "types/global"

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
  // 移除不再需要的状态变量，使用useMemo替代
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

  // 优化：使用useMemo减少不必要的重新计算
  const selectedShades = useMemo(() => {
    const variants = getVariant()
    return variants?.map((variant) => ({
      productVarant: variant,
      quantity:
        selectedSize?.filter((size) =>
          size.includes(variant?.length?.toString() ?? "")
        ).length ?? 0,
    })) || []
  }, [getVariant, selectedSize])

  // 优化：使用useMemo计算价格，减少重新渲染
  const totalPrice = useMemo(() => {
    return selectedShades.reduce((acc, shade) => {
      return (
        acc +
        (shade.productVarant?.calculated_price?.calculated_amount ?? 0) *
          shade.quantity
      )
    }, 0)
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

  // 如果没有产品数据，显示骨架屏，减少CLS
  if (!shadesProduct) {
    return (
      <div className="w-full max-w-[1074px] mx-auto relative">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-[708px] flex flex-col gap-5">
            {/* 图片骨架屏 */}
            <div className="w-full h-[354px] bg-gray-200 animate-pulse rounded-lg"></div>
            {/* 产品信息骨架屏 */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
            </div>
          </div>
          {/* 选择器骨架屏 */}
          <div className="w-full lg:w-[300px] space-y-4">
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // console.log("shadesCMSData: ", shadesCMSData)
  console.log("shadesCMSData.productImages", shadesCMSData.productImages)
  return (
    <ProductSelectionProvider product={shadesProduct}>
      <V2ProductPage cmsData={shadesCMSData}>
        <V2SunshadesSelector
          shadesProduct={shadesProduct}
          shadesCMSData={shadesCMSData}
          pergolaSizes={pergolaSizes}
          pergolaSize={pergolaSize}
        />
      </V2ProductPage>
    </ProductSelectionProvider>
  )
}

export default ShadesProductPage
