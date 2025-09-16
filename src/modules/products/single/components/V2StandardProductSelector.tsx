"use client"
import React, { useState, useEffect, useCallback } from "react"
import { BuyNowButton } from "./BuyNowButton"
import { PergulaSizeSelector } from "./PergulaSizeSelector"
import {
  StoreProduct,
  StoreProductVariant,
  StoreProductOptionValue,
} from "@medusajs/types"
import { PergolaSize, selectedProducts } from "types/global"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"
import { useProductSelection } from "./ProductSelectionContext"
import { Badge } from "@/components/ui/badge"
import {
  MoveDownRight,
} from "lucide-react"
import {
  V2AccesorriesSelector,
} from "./AccesorriesSelector"
import { Button } from "@/components/ui/button"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

interface V2StandardProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  accessoriesCMSData: any
}

export const V2StandardProductSelector: React.FC<V2StandardProductSelectorProps> = ({
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
  const [isClient, setIsClient] = useState(false)

  console.log("===product===", product)
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
    `selectedColor: ${selectedColor?.value}, selectedStyle: ${selectedStyle?.value}, selectedSize: ${selectedSize?.value} , product:`, product
  )

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0)

  useEffect(() => {
    
    if (
      !selectedSize ||
      !selectedColor ||
      !selectedStyle
    ) {
      return
    }
    // console.log('===selectedSize===', selectedSize, 'variants', product.variants);
    console.log("product: ", product.title, product.variants)
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
      return (
        matchingSize && matchingColor && matchingStyle
      )
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
    try {
      await Promise.all([
        buyPergula(),
        buyHeater(),
        buyShades(),
        buyGlassdoor(),
      ])

      router.push("/checkout")
    } catch (error) {
      console.error("Error adding items to cart:", error)
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
    <div className="hidden lg:flex w-full flex-1 justify-start items-start gap-2.5 px-2.5 sticky top-0">
      <div className="w-full">
        {/* Header */}
        <div className="pb-4 border-b border-[#d9d9d9]">
          <p className="text-[#2F2A1E] text-xl mb-2">Relaxure Corsica</p>
          <h1 className="text-[#2F2A1E] text-3xl font-semibold">
            Relaxure Pergola Kit
          </h1>
        </div>

        {/* Sale Banner */}
        {isClient && (
          <div className="mt-4 p-4 border border-highlight bg-white">
            <p className="text-black text-base font-medium text-center">
              End Of Season Clearance Sale:
            </p>
            <p className="text-black text-2xl font-semibold text-center">
              Up To ${Math.round((totalOriginalPrice - totalPrice) / 100) * 100}{" "}
              OFF!
            </p>
            <p className="text-highlight text-xl font-semibold text-center">
              03:21:16:57
            </p>
          </div>
        )}

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
            selectedColor={selectedColor}
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
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">
              Shipping: <span className="text-highlight">Free</span>
            </span>
            <span className="text-[#8C877C] line-through">+$999.99</span>
          </div>
          <p className="text-[#8c8c8c] text-sm">
            <img
              src="/img/shipping.svg"
              alt="shipping"
              className="w-4 h-4 inline-block mr-2 mb-1"
            />
            <span className="ml-2">Free Shipping + Insurance</span>
            <br />
            <img
              src="/img/package.svg"
              alt="package"
              className="w-4 h-4 inline-block mr-2 mb-1"
            />
            <span className="ml-2">Delivered In 4 Weeks</span>
          </p>

          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">
              Full Insurance: <span className="text-highlight">Free</span>
            </span>
            <span className="text-[#8C877C] line-through">+$999.99</span>
          </div>
          <p className="text-[#8c8c8c] text-sm">
            <img
              src="/img/shipping.svg"
              alt="shipping"
              className="w-4 h-4 inline-block mr-2 mb-1"
            />
            <span className="ml-2">
              Includes Complimentary Insurance Coverage
            </span>
            <br />
            <img
              src="/img/package.svg"
              alt="package"
              className="w-4 h-4 inline-block mr-2 mb-1"
            />
            <span className="ml-2">
              Your Delivery Should Arrive In About Four Weeks
            </span>
          </p>

          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">
              Warranty: <span className="text-highlight">Free</span>
            </span>
            <span className="text-[#8C877C] line-through">+$999.99</span>
          </div>
          <p className="text-[#8c8c8c] text-sm">
            <img
              src="/img/shipping.svg"
              alt="shipping"
              className="w-4 h-4 inline-block mr-2 mb-1"
            />
            <span className="ml-2">100 Day Risk-Free Trial</span>
            <br />
            <img
              src="/img/warranty.svg"
              alt="warranty"
              className="w-4 h-4 inline-block mr-2 mb-1"
            />
            <span className="ml-2">Lifetime Warranty Included</span>
          </p>
        </div>

        {/* Add to Cart Button - Using BuyNowButton */}
        <div className="mt-6 sticky bottom-0">
          <BuyNowButton
            property1="primary-button-l"
            text="Add to Cart"
            className="w-full"
            onClick={handleBuyNow}
          />
        </div>

        {/* Support Section */}
        <div className="px-8 py-5 w-full mt-5 border border-[#8C877C]">
          <div className="w-full">
            <div className="flex items-center gap-4">
              <span className="bg-[#ffbf3c] p-1">
                <img src="/img/expert.svg" alt="message" className="w-7 h-7" />
              </span>
              <div className="text-[#000000] text-base">
                <p className="font-medium">We're Here to Help</p>
                <p className="font-medium text-[#8C877C] text-xs">
                9AM to 5PM PST Mon-Fri
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm flex justify-between">
            <Button variant="link" className="underline px-0 text-black"><img src="/img/telephone.svg" alt="phone" className="w-4 h-4" />1-213-566-8658</Button>
            <Button variant="link" className="underline px-0 text-black"><img src="/img/mailbox.svg" alt="phone" className="w-4 h-4" />info@relaxureliving.com</Button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-4 text-sm">
            {/* <MessageCircle className="h-4 w-4" /> */}
            <span>Chat in the Corner</span>
            {/* <ChevronDown className="h-4 w-4" /> */}
            <MoveDownRight className="h-4 w-4" />
          </div>
      </div>
    </div>
  )
}
