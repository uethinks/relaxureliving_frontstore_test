"use client"
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react"
import { StoreProduct, StoreProductOptionValue } from "@medusajs/types"

interface ProductSelectionContextType {
  selectedSize: StoreProductOptionValue | undefined
  selectedColor: StoreProductOptionValue | undefined
  selectedStyle: StoreProductOptionValue | undefined
  setSelectedSize: (size: StoreProductOptionValue) => void
  setSelectedColor: (color: StoreProductOptionValue) => void
  setSelectedStyle: (style: StoreProductOptionValue) => void
}

const ProductSelectionContext = createContext<
  ProductSelectionContextType | undefined
>(undefined)

interface ProductSelectionProviderProps {
  children: ReactNode
  product: StoreProduct
}

export const ProductSelectionProvider: React.FC<
  ProductSelectionProviderProps
> = ({ children, product }) => {
  const pergolaColors = product.options?.find(
    (option) => option.title === "Color"
  )
  const pergolaStyles = product.options?.find(
    (option) => option.title === "Style"
  )

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

  const defaultSize = sortedSizes?.[0]
  const defaultColor = pergolaColors?.values?.find(
    (color) => color.value === "Dark Gray"
  )
  const defaultStyle = pergolaStyles?.values?.find(
    (style) => style.value === "Freestanding"
  )

  const [selectedSize, setSelectedSize] = useState<
    StoreProductOptionValue | undefined
  >(defaultSize)
  const [selectedColor, setSelectedColor] = useState<
    StoreProductOptionValue | undefined
  >(defaultColor)
  const [selectedStyle, setSelectedStyle] = useState<
    StoreProductOptionValue | undefined
  >(defaultStyle)

  const handleSizeChange = useCallback((size: StoreProductOptionValue) => {
    setSelectedSize(size)
  }, [])

  const handleColorChange = useCallback((color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }, [])

  const handleStyleChange = useCallback((style: StoreProductOptionValue) => {
    setSelectedStyle(style)
  }, [])

  const value = {
    selectedSize,
    selectedColor,
    selectedStyle,
    setSelectedSize: handleSizeChange,
    setSelectedColor: handleColorChange,
    setSelectedStyle: handleStyleChange,
  }

  return (
    <ProductSelectionContext.Provider value={value}>
      {children}
    </ProductSelectionContext.Provider>
  )
}

export const useProductSelection = () => {
  const context = useContext(ProductSelectionContext)
  if (context === undefined) {
    throw new Error(
      "useProductSelection must be used within a ProductSelectionProvider"
    )
  }
  return context
}
