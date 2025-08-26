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
import { useProductSelection } from "./ProductSelectionContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart, MessageCircle, Phone, Mail, ChevronDown } from "lucide-react"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

interface V2ProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  accessoriesCMSData: any
}

export const V2ProductSelector: React.FC<V2ProductSelectorProps> = ({
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

  console.log('===product===', product);
  console.log('===accessories===', accessories);
  console.log('===accessoriesCMSData===', accessoriesCMSData);

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

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0)

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
  const savingsPercentage = totalOriginalPrice > 0 
    ? Math.round(((totalOriginalPrice - totalPrice) / totalOriginalPrice) * 100)
    : 0

  // Calculate monthly payment
  const monthlyPayment = totalPrice / 24

  return (
    <div className="hidden lg:flex w-full flex-1 justify-start items-start gap-2.5 px-2.5 sticky top-0">
      <div className="w-full">
        {/* Header */}
        <div className="pb-4 border-b border-[#d9d9d9]">
          <p className="text-[#2F2A1E] text-xl mb-2">Relaxure Corsica</p>
          <h1 className="text-[#2F2A1E] text-3xl font-semibold">Relaxure Pergola Kit</h1>
        </div>

        {/* Sale Banner */}
        {isClient && (
          <div className="mt-4 p-4 border border-highlight bg-white">
            <p className="text-black text-base font-medium text-center">End Of Season Clearance Sale:</p>
            <p className="text-black text-2xl font-semibold text-center">Up To ${Math.round((totalOriginalPrice - totalPrice) / 100) * 100} OFF!</p>
            <p className="text-highlight text-xl font-semibold text-center">03:21:16:57</p>
          </div>
        )}

        {/* Price Section */}
        <div className="mt-4">
          <p className="text-[#140E02] text-sm font-semibold">Price:</p>
          <div className="flex items-center gap-2">
            <span className="text-[#000000] text-3xl font-bold">{formatPrice(totalPrice)}</span>
            {savingsPercentage > 0 && (
              <Badge className="bg-highlight rounded-none text-white font-bold px-6 py-2 [clip-path:polygon(15px_0,100%_0,100%_100%,15px_100%,0_50%)]">{savingsPercentage}% off</Badge>
            )}
          </div>
          {totalOriginalPrice > totalPrice && (
            <p className="text-[#8c8c8c] text-xl">
              <span className="line-through font-semibold">{formatPrice(totalOriginalPrice)}</span> <span className="text-[#ff5f00]">Save {formatPrice(totalOriginalPrice - totalPrice)}</span>
            </p>
          )}
          <div className="text-black text-sm mt-1 p-4 border border-highlight flex items-center gap-2">
            <img src="/img/Klarna.png" alt="Klarna" className="h-6" /> <span>Pay </span>  <span className="font-semibold">{formatPrice(monthlyPayment)}/Mo x 24</span> <span>With Klarna</span>
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

        {/* Service Sections */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">Packing & Delivery: Free</span>
            <span className="text-[#000000]">+$999.99</span>
          </div>
          <p className="text-[#8c8c8c] text-xs">
            📦 Free Shipping + Insurance
            <br />📅 Delivered In 4 Weeks
          </p>

          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">Full Insurance: Free</span>
            <span className="text-[#000000]">+$999.99</span>
          </div>
          <p className="text-[#8c8c8c] text-xs">
            📋 Includes Complimentary Insurance Coverage
            <br />📦 Your Delivery Should Arrive In About Four Weeks
          </p>

          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">Warranty: Free</span>
            <span className="text-[#000000]">+$999.99</span>
          </div>
          <p className="text-[#8c8c8c] text-xs">
            ✅ 100 Day Risk-Free Trial
            <br />
            🛡️ Lifetime Warranty Included
          </p>
        </div>

        {/* Add to Cart Button - Using BuyNowButton */}
        <div className="p-4 mt-6">
          <BuyNowButton
            property1="primary-button-l"
            text="Add to Cart"
            className="w-full"
            onClick={handleBuyNow}
          />
        </div>

        {/* Support Section */}
        <div className="pb-6">
          <div className="bg-[#ffbf3c] rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-[#000000]" />
              <span className="text-[#000000] font-medium">We're Here to Help</span>
            </div>
            <p className="text-[#000000] text-sm">Contact Our Expert</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#8c8c8c]" />
              <span className="text-[#000000]">1.213.566.8658</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#8c8c8c]" />
              <span className="text-[#000000]">Info@Relaxureliving.Com</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 mt-4 text-sm text-[#8c8c8c]">
            <MessageCircle className="h-4 w-4" />
            <span>Chat in the Corner</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Sample Kit Link */}
        <div className="pb-6">
          <div className="w-full flex flex-row justify-center items-center gap-2.5 relative text-[#072F6C] underline">
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
}
