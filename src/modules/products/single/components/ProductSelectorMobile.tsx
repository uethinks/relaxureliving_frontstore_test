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

interface ProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  accessoriesCMSData: any
}

export const ProductSelectorMobile: React.FC<ProductSelectorProps> = ({
  product,
  accessories,
  accessoriesCMSData,
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
  const [selectedSize, setSelectedSize] = useState<
    StoreProductOptionValue | undefined
  >(product.options?.find((option) => option.title === "Size")?.values?.[0])
  const [selectedColor, setSelectedColor] = useState<
    StoreProductOptionValue | undefined
  >(product.options?.find((option) => option.title === "Color")?.values?.[0])

  const router = useRouter()

  const pergolaSizes = product.options?.find(
    (option) => option.title === "Size"
  )
  const pergolaColors = product.options?.find(
    (option) => option.title === "Color"
  )
  const defaultSize = pergolaSizes?.values?.[0]
  const defaultColor = pergolaColors?.values?.[0]

  useEffect(() => {
    if (!selectedSize || !selectedColor) return

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
      return matchingSize && matchingColor
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
  }, [selectedSize, selectedColor, product, pergolaQuantity])

  const handleSizeChange = useCallback((size: StoreProductOptionValue) => {
    setSelectedSize(size)
  }, [])

  const handleColorChange = useCallback((color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }, [])

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
    try {
      const results = await Promise.all([
        buyPergula(),
        buyHeater(),
        buyShades(),
        buyGlassdoor(),
      ])

      router.push("/cart")
    } catch (error) {
      console.error("Error adding items to cart:", error)
    }
  }

  const buyPergula = async () => {
    if (!selectedVariant?.id) return null

    try {
      const result = await addToCart({
        variantId: selectedVariant.id,
        quantity: pergolaQuantity,
        countryCode: "us",
      })
      return result
    } catch (error) {
      console.error("Error adding pergola to cart:", error)
      throw error
    }
  }

  const buyHeater = async () => {
    if (selectedAccessoriesHeater.length === 0) return null

    const addToCartPromises = selectedAccessoriesHeater
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: "us",
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
    if (selectedAccessoriesShades.length === 0) return null

    const addToCartPromises = selectedAccessoriesShades
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: "us",
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
    if (selectedAccessoriesGlassdoor.length === 0) return null

    const addToCartPromises = selectedAccessoriesGlassdoor
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: "us",
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
          className="w-full bg-[#0A3B5C] text-white rounded-[16px] py-3 text-lg font-medium"
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
          <div className="flex w-full flex-col items-start gap-4 relative">
            <div className="flex w-full flex-col items-start gap-2.5 relative">
              <div className="flex justify-between items-start gap-2.5 relative self-stretch w-full">
                <div className="flex items-center justify-center gap-2.5 py-0 relative">
                  <div className="flex items-end justify-start gap-4">
                    <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[36px] leading-[32px] whitespace-nowrap relative tracking-[0]">
                      ${totalPrice}
                    </div>
                    <span className="text-[16px] font-normal">
                      with free shipping
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 relative">
                  <button
                    onClick={() =>
                      setPergolaQuantity(
                        pergolaQuantity > 1 ? pergolaQuantity - 1 : 1
                      )
                    }
                    className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                  >
                    <span className="text-[#343a40] text-lg -mt-0.5">-</span>
                  </button>
                  <div className="text-[#343a40] text-lg font-medium">
                    {pergolaQuantity}
                  </div>
                  <button
                    onClick={() => setPergolaQuantity(pergolaQuantity + 1)}
                    className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                  >
                    <span className="text-[#343a40] text-lg -mt-0.5">+</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-fit [font-family:'Montserrat',Helvetica] font-medium text-[24px] leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through">
                  ${totalOriginalPrice}
                </div>
                {
                  <div className="[font-family:'Montserrat',Helvetica] px-2 py-0.5 bg-[#e9ecef] rounded-full flex items-center justify-center">
                    <span className="text-[24px] font-normal text-[red]">
                      Save{" "}
                      {Math.round(
                        ((totalOriginalPrice - totalPrice) /
                          totalOriginalPrice) *
                          100
                      )}
                      %
                    </span>
                  </div>
                }
              </div>
            </div>
            <div className="flex flex-col w-full items-end gap-2.5 relative">
              <PergulaSizeSelector
                product={product}
                className="!self-stretch !flex-[0_0_auto] !flex"
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={handleSizeChange}
                onColorChange={handleColorChange}
              />
              <AccesorriesSelector
                pergolaSize={pergolaSize}
                onAccessoryChange={handleAccessoryToggle}
                accessories={accessories}
                selectedHeaterVariant={selectedAccessoriesHeater}
                selectedShadesVariant={selectedAccessoriesShades}
                selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
                accessoriesCMSData={accessoriesCMSData}
              />
            </div>
            <BuyNowButton
              onClick={handleBuyNow}
              property1="primary-button-l"
              text="Add to cart"
              className=""
            />
            <div className="flex items-center justify-center w-full mt-2 py-3 px-4 border border-[#0A3B5C] rounded-[10px]">
              <p className="text-[#0A3B5C] text-center text-base">
                Pay ${Math.round(totalPrice / 24)}/mo x 24 with{" "}
                <span className="font-bold">Klarna.</span>
              </p>
            </div>
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
