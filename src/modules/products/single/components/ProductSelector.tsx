"use client"
import React, { useState, useEffect } from "react"
import { BuyNowButton } from "./BuyNowButton"
import { PergulaSizeSelector } from "./PergulaSizeSelector"
import { AccesorriesSelector } from "./AccesorriesSelector"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { PergolaSize, selectedProducts } from "types/global"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"

interface ProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  isMobile?: boolean
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  product,
  accessories,
  isMobile = false,
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

  const router = useRouter()

  useEffect(() => {
    setPergolaSize({
      width: selectedVariant?.width ?? 0,
      length: selectedVariant?.length ?? 0,
    })
  }, [selectedVariant])

  useEffect(() => {
    setTotalPrice(
      pergolaQuantity *
        (selectedVariant?.calculated_price?.calculated_amount ?? 0)
    )
    setTotalOriginalPrice(
      pergolaQuantity *
        (selectedVariant?.calculated_price?.original_amount ?? 0)
    )
  }, [pergolaQuantity, selectedVariant])

  useEffect(() => {
    setSelectedAccessoriesShades([])
    setSelectedAccessoriesGlassdoor([])
  }, [selectedVariant])

  const handleVariantChange = (variant: StoreProductVariant | undefined) => {
    setSelectedVariant(variant)
  }

  const handleAccessoryToggle = ({
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
  }

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

  const baseClasses = isMobile
    ? "mt-10 flex lg:hidden flex-col w-full items-start gap-2.5 p-2 md:p-5 relative bg-[#f3f3f3] rounded-[20px]"
    : "hidden lg:flex w-full lg:max-w-[36%] justify-end items-start gap-2.5 px-2.5 sticky top-0"

  return (
    <div className={baseClasses}>
      <div
        className={`flex flex-col w-full items-start gap-2.5 md:p-5 relative ${
          !isMobile && "bg-[#f3f3f3] rounded-[20px]"
        }`}
      >
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
                      ((totalOriginalPrice - totalPrice) / totalOriginalPrice) *
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
              property1="default"
              onVariantChange={handleVariantChange}
            />
            <AccesorriesSelector
              pergolaSize={pergolaSize}
              onAccessoryChange={handleAccessoryToggle}
              accessories={accessories}
              selectedHeaterVariant={selectedAccessoriesHeater}
              selectedShadesVariant={selectedAccessoriesShades}
              selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
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
  )
}
