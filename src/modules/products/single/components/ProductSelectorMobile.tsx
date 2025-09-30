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
import { FaChevronLeft } from "react-icons/fa"
import { useProductSelection } from "./ProductSelectionContext"
import { useCart } from "@lib/context/cartContext"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"
interface ProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  accessoriesCMSData: any
  selectorData: any
}

export const ProductSelectorMobile: React.FC<ProductSelectorProps> = ({
  product,
  accessories,
  accessoriesCMSData,
  selectorData,
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
  const [showPopup, setShowPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { cart } = useCart()

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
    let hasCartAlready = cart != null && (cart?.items?.length ?? 0) > 0    
    try {
      setIsLoading(true)

      await Promise.all([
        buyPergula(),
        buyHeater(),
        buyShades(),
        buyGlassdoor(),
      ])

      router.push( hasCartAlready ? "/cart" : "/checkout")
    } catch (error) {
      console.error("Error adding items to cart:", error)
      setIsLoading(false)
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

  // 金额格式化函数
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0)

  // 浮动按钮
  const FloatingBar = (props: { className?: string }) => (
    <div
      className={`fixed bottom-5 left-0 w-full z-50 px-2 pb-2 lg:hidden ${
        props.className || ""
      }`}
    >
      <div className="flex flex-col items-center bg-[#e5e5e5] rounded-[32px] p-4 shadow-lg">
        <div className="flex gap-4 w-full items-center justify-between mb-2">
          <span className="text-2xl font-bold">
            $
            {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl"
              onClick={() =>
                setPergolaQuantity(Math.max(1, pergolaQuantity - 1))
              }
            >
              -
            </button>
            <span className="text-lg">{pergolaQuantity}</span>
            <button
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl"
              onClick={() => setPergolaQuantity(pergolaQuantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="w-full bg-[#F6AF1F] hover:bg-[#fdce6f] text-black rounded-[16px] py-3 text-lg font-medium"
          onClick={() => setShowPopup(true)}
        >
          Continue
        </button>
      </div>
    </div>
  )

  // popup内容
  const Popup = (props: { className?: string }) => (
    <div
      className={`fixed inset-0 z-50 bg-[#f3f3f3] w-screen h-screen flex flex-col lg:hidden ${
        props.className || ""
      }`}
    >
      {/* 顶部栏 */}
      <div className="flex items-center pt-4 pb-2 relative">
        <button className="p-2" onClick={() => setShowPopup(false)}>
          <FaChevronLeft className="text-[18px] text-[#343A40]" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
      </div>
      {/* 组件内容 */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="mt-2 flex flex-col w-full items-start gap-2.5 p-2 md:p-5 relative bg-[#f3f3f3] rounded-[20px]">
          {/* Save标签 */}
          <div className="absolute left-0 top-0 mt-4 z-10 flex gap-4">
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
            <div className="flex items-end gap-4">
              <span className="text-[#6c757d] text-[24px] line-through">
                {formatPrice(totalOriginalPrice)}
              </span>
            </div>
          </div>
          {/* 价格和数量选择器 */}
          <div className="flex w-full items-center justify-between mt-[64px] mb-2">
            <div className="flex items-end gap-4">
              <span className="font-bold text-[36px] leading-[32px]">
                {formatPrice(totalPrice)}
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
          {/* 分期付款信息 */}
          <div className="w-full mb-4">
            <p className="text-[#0A3B5C] text-base">
              Pay {formatPrice(totalPrice / 24)}/mo x 24 with{" "}
              <span className="font-bold">Klarna.</span>
            </p>
          </div>
          {/* 选择器和配件 */}
          <div className="flex flex-col w-full items-end gap-2.5 relative">
            <PergulaSizeSelector
              product={product}
              className="!self-stretch !flex-[0_0_auto] !flex"
              selectorData={selectorData}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              selectedStyle={selectedStyle}
              onSizeChange={handleSizeChange}
              onColorChange={handleColorChange}
              onStyleChange={handleStyleChange}
            />
            <AccesorriesSelector
              pergolaSize={pergolaSize}
              onAccessoryChange={handleAccessoryToggle}
              selectorData={selectorData}
              accessories={accessories}
              selectedHeaterVariant={selectedAccessoriesHeater}
              selectedShadesVariant={selectedAccessoriesShades}
              selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
              accessoriesCMSData={accessoriesCMSData}
            />
          </div>
            <BuyNowButton
              property1="primary-button-l"
              text={isLoading ? "Adding to Cart..." : "Add to Cart"}
              className={`w-full ${isLoading ? 'opacity-100 cursor-not-allowed ' : ''}`}
              onClick={isLoading ? undefined : handleBuyNow}
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
    </div>
  )

  // 只在移动端显示
  return (
    <>
      <FloatingBar className={showPopup ? "hidden" : ""} />
      <Popup className={showPopup ? "" : "hidden"} />
    </>
  )
}
