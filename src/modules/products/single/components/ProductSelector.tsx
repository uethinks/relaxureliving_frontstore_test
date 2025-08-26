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

interface ProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  accessoriesCMSData: any
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
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
    <div className="hidden lg:flex w-full lg:max-w-[36%] justify-start items-start gap-2.5 px-2.5 sticky top-0">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="p-4 border-b border-[#d9d9d9]">
          <p className="text-[#8c8c8c] text-sm">Relaxure Corsica</p>
          <h1 className="text-[#000000] text-3xl font-semibold">Relaxure Pergola Kit</h1>
        </div>

        {/* Sale Banner */}
        {isClient && (
          <div className="mx-4 mt-4 p-3 border border-[#ff5f00] rounded-lg bg-[#fff5f0]">
            <p className="text-[#000000] text-sm font-medium text-center">End Of Season Clearance Sale:</p>
            <p className="text-[#ff5f00] text-lg font-bold text-center">Up To ${Math.round((totalOriginalPrice - totalPrice) / 100) * 100} OFF!</p>
            <p className="text-[#ff5f00] text-sm font-medium text-center">03:21:16:57</p>
          </div>
        )}

        {/* Price Section */}
        <div className="p-4">
          <p className="text-[#8c8c8c] text-sm">Price:</p>
          <div className="flex items-center gap-2">
            <span className="text-[#000000] text-2xl font-bold">{formatPrice(totalPrice)}</span>
            {savingsPercentage > 0 && (
              <Badge className="bg-[#ff5f00] text-white text-xs">{savingsPercentage}% off</Badge>
            )}
          </div>
          {totalOriginalPrice > totalPrice && (
            <p className="text-[#8c8c8c] text-sm">
              <span className="line-through">{formatPrice(totalOriginalPrice)}</span> Save <span className="text-[#ff5f00]">{formatPrice(totalOriginalPrice - totalPrice)}</span>
            </p>
          )}
          <p className="text-[#8c8c8c] text-xs mt-1">
            <span className="text-[#ff5f00]">Klarna:</span> Pay {formatPrice(monthlyPayment)}/Mo x 24 With Klarna
          </p>
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-end gap-2.5 mt-3">
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
          </div>
        </div>

        {/* Product Image */}
        <div className="px-4 mb-4">
          <img
            src="/dark-modern-pergola-outdoor-structure.png"
            alt="Relaxure Pergola Kit"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Size Selection */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#000000] font-medium">
              Size: {selectedSize?.value || "Select Size"}
            </span>
            {selectedVariant && (
              <span className="text-[#000000]">
                +{formatPrice(selectedVariant.calculated_price?.calculated_amount || 0)}
              </span>
            )}
          </div>
          <p className="text-[#8c8c8c] text-xs mb-3">
            Fits 4-6 People
            <br />
            Perfect For Morning Coffee
            <br />
            Perfect For Small BBQ
            <br />
            Perfect For Small Patio
            <br />
            Higher Ceiling
            <br />
            8.79ft(268cm)
          </p>
          
          {/* Size Options */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {product.options?.find(opt => opt.title === "Size")?.values?.map((size) => (
              <Button
                key={size.value}
                variant={selectedSize?.value === size.value ? "default" : "outline"}
                className={`h-12 ${
                  selectedSize?.value === size.value
                    ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c] hover:bg-[#ffd379]"
                    : "bg-white border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5]"
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size.value}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            className="w-full border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent"
          >
            I Want A Custom Size
          </Button>
          <button className="text-[#ff5f00] text-sm mt-2 underline">📥 Download Dimensions</button>
        </div>

        {/* Style Selection */}
        <div className="px-4 mb-6">
          <p className="text-[#000000] font-medium mb-3">
            Style: {selectedStyle?.value || "Select Style"}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {product.options?.find(opt => opt.title === "Style")?.values?.map((style) => (
              <div
                key={style.value}
                className={`p-3 rounded-lg border cursor-pointer ${
                  selectedStyle?.value === style.value 
                    ? "bg-[#ffbf3c] border-[#ffbf3c]" 
                    : "bg-white border-[#d9d9d9]"
                }`}
                onClick={() => handleStyleChange(style)}
              >
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">{style.value}</span>
                </div>
                <p className="text-center text-sm font-medium text-[#000000]">{style.value}</p>
              </div>
            ))}
          </div>
          <button className="text-[#ff5f00] text-sm underline">📥 Download Specs</button>
        </div>

        {/* Color Selection */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#000000] font-medium">
              Color: {selectedColor?.value || "Select Color"}
            </span>
          </div>
          <div className="flex gap-2 mb-3">
            {product.options?.find(opt => opt.title === "Color")?.values?.map((color) => (
              <div
                key={color.value}
                className={`w-6 h-6 rounded border cursor-pointer ${
                  selectedColor?.value === color.value 
                    ? "ring-2 ring-[#ffbf3c] ring-offset-2" 
                    : ""
                }`}
                style={{ backgroundColor: color.value === "Dark Gray" ? "#2f2a1e" : "#8c877c" }}
                onClick={() => handleColorChange(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Configuration Sections */}
        <div className="px-4 space-y-6">
          {/* Shade Screen */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#000000] font-medium">
                Shade Screen: {selectedAccessoriesShades.length}, {selectedColor?.value || "Dark Gray"}
              </span>
              <span className="text-[#000000]">
                +{formatPrice(selectedAccessoriesShades.reduce((sum, item) => sum + (item.quantity * (item.productVarant?.calculated_price?.calculated_amount || 0)), 0))}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button variant="outline" className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent">
                Short 10'
              </Button>
              <Button variant="outline" className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent">
                Short 10'
              </Button>
              <Button className="bg-[#ffbf3c] text-[#000000] border-[#ffbf3c] hover:bg-[#ffd379]">Long 13'</Button>
              <Button variant="outline" className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent">
                Long 13'
              </Button>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-6 h-6 bg-[#2f2a1e] rounded border"></div>
              <div className="w-6 h-6 bg-[#8c877c] rounded border"></div>
            </div>
            <button className="text-[#ff5f00] text-sm underline">📥 Download Specs</button>
          </div>

          {/* Glass Door */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#000000] font-medium">
                Glass Door: {selectedAccessoriesGlassdoor.length}
              </span>
              <span className="text-[#000000]">
                +{formatPrice(selectedAccessoriesGlassdoor.reduce((sum, item) => sum + (item.quantity * (item.productVarant?.calculated_price?.calculated_amount || 0)), 0))}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button variant="outline" className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent">
                Short 10'
              </Button>
              <Button variant="outline" className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent">
                Short 10'
              </Button>
              <Button variant="outline" className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent">
                Long 13'
              </Button>
              <Button variant="outline" className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent">
                Long 13'
              </Button>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-6 h-6 bg-[#2f2a1e] rounded border"></div>
            </div>
            <button className="text-[#ff5f00] text-sm underline">📥 Download Specs</button>
          </div>

          {/* Heater */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#000000] font-medium">
                Heater: {selectedAccessoriesHeater.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span className="text-[#000000]">
                +{formatPrice(selectedAccessoriesHeater.reduce((sum, item) => sum + (item.quantity * (item.productVarant?.calculated_price?.calculated_amount || 0)), 0))}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <Button
                variant="outline"
                size="icon"
                className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent"
                onClick={() => {
                  if (selectedAccessoriesHeater.length > 0) {
                    const newHeaters = [...selectedAccessoriesHeater]
                    if (newHeaters[0].quantity > 0) {
                      newHeaters[0].quantity--
                      setSelectedAccessoriesHeater(newHeaters)
                    }
                  }
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-[#000000] font-medium w-8 text-center">
                {selectedAccessoriesHeater.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="border-[#d9d9d9] text-[#000000] hover:bg-[#f5f5f5] bg-transparent"
                onClick={() => {
                  if (selectedAccessoriesHeater.length > 0) {
                    const newHeaters = [...selectedAccessoriesHeater]
                    newHeaters[0].quantity++
                    setSelectedAccessoriesHeater(newHeaters)
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-6 h-6 bg-[#2f2a1e] rounded border"></div>
            </div>
            <button className="text-[#ff5f00] text-sm underline">📥 Download Specs</button>
          </div>
        </div>

        {/* Service Sections */}
        <div className="px-4 mt-6 space-y-4">
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

        {/* Add to Cart Button */}
        <div className="p-4 mt-6">
          <Button 
            className="w-full h-12 bg-[#ffbf3c] text-[#000000] font-semibold text-lg hover:bg-[#ffd379] border-0"
            onClick={handleBuyNow}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>

        {/* Support Section */}
        <div className="px-4 pb-6">
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
        <div className="px-4 pb-6">
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
