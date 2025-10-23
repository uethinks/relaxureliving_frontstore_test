"use client"
import { Badge } from "@/components/ui/badge"
import V2SupportSection from "@/components/V2SupportSection"
import { useCart } from "@lib/context/cartContext"
import { addToCartBatch } from "@lib/data/cart"
import {
  StoreProduct,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { PergolaSize, selectedProducts } from "types/global"
import { V2AccesorriesSelector } from "./AccesorriesSelector"
import { BuyNowButton } from "./BuyNowButton"
import { PergulaSizeSelector } from "./PergulaSizeSelector"
import { useProductSelection } from "./ProductSelectionContext"
import V2ServiceDescription from "@/components/V2ServiceDescription"
import V2ProductSelectorHeader from "./V2ProductSelectorHeader"
import { trackEvent } from "@lib/util/tracking"
import { TrackingEvent } from "@/types/tracking"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

interface V2StandardProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  selectorData: any
  accessoriesCMSData: any
}

export const V2StandardProductSelector: React.FC<
  V2StandardProductSelectorProps
> = ({ product, accessories, selectorData, accessoriesCMSData }) => {
  const { cart } = useCart()
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
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  console.log("===product===", product)
  console.log("===selectorData2", selectorData)
  console.log("===accessories===", accessories)
  console.log("===accessoriesCMSData===", accessoriesCMSData)
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

  console.log(
    `selectedColor: ${selectedColor?.value}, selectedStyle: ${selectedStyle?.value}, selectedSize: ${selectedSize?.value} , product:`,
    product
  )

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0)

  useEffect(() => {
    if (!selectedSize || !selectedColor || !selectedStyle) {
      return
    }
    // console.log('===selectedSize===', selectedSize, selectedColor, selectedStyle);
    // console.log("product: ", product.title, product.variants)
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
      // console.log('matchingSize: ', matchingSize, 'matchingColor: ', matchingColor, 'matchingStyle: ', matchingStyle);
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
    setSelectedAccessoriesHeater([])
  }, [selectedSize, selectedColor, selectedStyle, product, pergolaQuantity])

  useEffect(() => {
    setIsClient(true)
  }, [])

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
    setIsLoading(true)
    try {
      trackEvent(TrackingEvent.STANDARD_TO_CART, {
        productName: product.title,
        productId: product.id,
        productPrice: totalPrice,
        productQuantity: pergolaQuantity,
      })

      // Collect all items to add in a single batch
      const itemsToAdd = []

      // Add pergola
      if (selectedVariant?.id) {
        itemsToAdd.push({
          variantId: selectedVariant.id,
          quantity: pergolaQuantity,
        })
      }

      // Add heaters
      selectedAccessoriesHeater
        .filter((item) => item.productVarant && item.quantity)
        .forEach((item) => {
          itemsToAdd.push({
            variantId: item.productVarant!.id,
            quantity: item.quantity,
          })
        })

      // Add shades
      selectedAccessoriesShades
        .filter((item) => item.productVarant && item.quantity)
        .forEach((item) => {
          itemsToAdd.push({
            variantId: item.productVarant!.id,
            quantity: item.quantity,
          })
        })

      // Add glass doors
      selectedAccessoriesGlassdoor
        .filter((item) => item.productVarant && item.quantity)
        .forEach((item) => {
          itemsToAdd.push({
            variantId: item.productVarant!.id,
            quantity: item.quantity,
          })
        })

      // Batch add all items with single cache revalidation
      if (itemsToAdd.length > 0) {
        await addToCartBatch({
          items: itemsToAdd,
          countryCode: defaultCountryCode,
        })
      }

      router.push(hasCartAlready ? "/cart" : "/checkout")
    } catch (error) {
      console.error("handleBuyNow Error adding items to cart:", error)
      setIsLoading(false)
    }
  }

  // Calculate savings percentage
  const savingsPercentage =
    totalOriginalPrice > 0
      ? Math.round(
          ((totalOriginalPrice - totalPrice) / totalOriginalPrice) * 100
        )
      : 0

  // Calculate monthly payment
  const monthlyPayment = totalPrice / 24

  return (
    <div className="flex w-full flex-1 justify-start items-start gap-2.5 lg:sticky lg:top-0">
      <div className="w-full pb-4">
        {/* Header */}
        <div className={"max-lg:hidden"}>
          <V2ProductSelectorHeader
            data={{
              category: "Relaxure Corsica",
              name: "Relaxure Pergola Kit",
            }}
          />
        </div>

        <div className={"max-lg:px-6"}>
          {/* Sale Banner */}
          {/* {isClient && (
            <div className="mt-1 p-4 border border-highlight bg-white">
              <p className="text-black text-base font-medium text-center">
                End Of Season Clearance Sale:
              </p>
              <p className="text-black text-2xl font-semibold text-center">
                Up To $
                {Math.round((totalOriginalPrice - totalPrice) / 100) * 100} OFF!
              </p>
              <p className="text-highlight text-xl font-semibold text-center">
                03:21:16:57
              </p>
            </div>
          )} */}

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-[#140E02] text-sm font-semibold">Price:</p>
            <div className="flex items-center gap-2">
              <span className="text-[#000000] text-3xl font-bold">
                {formatPrice(totalPrice)}
              </span>
              {savingsPercentage > 0 && (
                <Badge className="bg-highlight rounded-none text-white font-bold px-6 py-2 [clip-path:polygon(15px_0,100%_0,100%_100%,15px_100%,0_50%)]">
                  {savingsPercentage}% off
                </Badge>
              )}
            </div>
            {totalOriginalPrice > totalPrice && (
              <p className="text-[#8c8c8c] text-xl">
                <span className="line-through font-semibold">
                  {formatPrice(totalOriginalPrice)}
                </span>{" "}
                <span className="text-[#ff5f00]">
                  Save {formatPrice(totalOriginalPrice - totalPrice)}
                </span>
              </p>
            )}
            <div className="text-black text-sm mt-1 p-4 border border-white flex items-center gap-2">
              <img src="/img/Klarna.png" alt="Klarna" className="h-6" />{" "}
              <span>Pay </span>{" "}
              <span className="font-semibold">
                {formatPrice(monthlyPayment)}/Mo x 24
              </span>{" "}
              <span>With Klarna</span>
            </div>

            {/* Quantity Controls */}
            {/* <div className="flex items-center justify-end gap-2.5 mt-3">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-white rounded-full border border-[#e9ecef] text-xl shadow"
                onClick={() => setPergolaQuantity(pergolaQuantity > 1 ? pergolaQuantity - 1 : 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-[#343a40] text-lg font-medium w-8 text-center">
                {pergolaQuantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-white rounded-full border border-[#e9ecef] text-xl shadow"
                onClick={() => setPergolaQuantity(pergolaQuantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div> */}
          </div>

          {/* Size, Style, and Color Selection - Using PergulaSizeSelector */}
          <div className="mt-10 mb-6">
            <PergulaSizeSelector
              product={product}
              className="w-full"
              selectorData={selectorData}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              selectedStyle={selectedStyle}
              onSizeChange={handleSizeChange}
              onColorChange={handleColorChange}
              onStyleChange={handleStyleChange}
            />
          </div>

          {/* Accessories Selection - Using AccesorriesSelector */}
          <div className="mb-6">
            <V2AccesorriesSelector
              pergolaSize={pergolaSize}
              selectorData={selectorData}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onAccessoryChange={handleAccessoryToggle}
              accessories={accessories}
              selectedHeaterVariant={selectedAccessoriesHeater}
              selectedShadesVariant={selectedAccessoriesShades}
              selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
              accessoriesCMSData={accessoriesCMSData}
            />
          </div>
          {/* <div className="mb-6">
            <AccesorriesSelector
              pergolaSize={pergolaSize}
              onAccessoryChange={handleAccessoryToggle}
              accessories={accessories}
              selectedHeaterVariant={selectedAccessoriesHeater}
              selectedShadesVariant={selectedAccessoriesShades}
              selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
              accessoriesCMSData={accessoriesCMSData}
            />
          </div> */}

          {/* Service Sections */}
          <V2ServiceDescription />
        </div>
        {/* Add to Cart Button - Using BuyNowButton */}
        <div className="mt-6 sticky bottom-0">
          <BuyNowButton
            property1="primary-button-l"
            text={isLoading ? "Adding to Cart..." : "Add to Cart"}
            className={`w-full ${
              isLoading ? "opacity-100 cursor-not-allowed " : ""
            }`}
            onClick={isLoading ? undefined : handleBuyNow}
          />
        </div>

        {/* Support Section */}
        <V2SupportSection />
      </div>
    </div>
  )
}
