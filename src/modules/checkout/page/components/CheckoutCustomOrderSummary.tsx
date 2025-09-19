
"use client"
import React, { useState, useEffect, useCallback } from "react"
import { useCart } from "@lib/context/cartContext"
import { useRouter } from "next/navigation"
import { formatCartTotal } from "@lib/util/money"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoveDownRight } from "lucide-react"
import { StoreCart } from "@medusajs/types"
import { addPromotionCode } from "@lib/data/cart"

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0)


  // Function to organize pergola configuration by type
const organizePergolaConfig = (metadata: any) => {
  const pergolaConfig = metadata?.pergola_config
  if (!pergolaConfig) return null

  const groupedConfig = {
    structure: {
      title: "Structure",
      items: [
        { label: "Type", value: pergolaConfig.type },
        { label: "Model", value: pergolaConfig.model },
        { label: "Dimensions Type", value: pergolaConfig.dimensions_type },
        { label: "Color", value: `${pergolaConfig.structure_color}, ${pergolaConfig.structure_color_code}` }
      ].filter(item => item.value)
    },
    slats: {
      title: "Slats",
      items: [
        { label: "Color", value: `${pergolaConfig.slats_color}, ${pergolaConfig.slats_color_code}, ${pergolaConfig.slats_color_hex}` },
        { label: "Direction", value: pergolaConfig.slats_direction },
        { label: "Rotation", value: pergolaConfig.slats_rotation }
      ].filter(item => item.value)
    },
    lighting: {
      title: "Lighting",
      items: [ 
        { label: "Edge Lights Position", value: pergolaConfig.edge_lights_position?.join(", ") },
        { label: "Slats Lights", value: pergolaConfig.slats_lights }
      ].filter(item => item.value)
    },
    accessories: {
      title: "Accessories",
      items: [
        { label: "Glass Door", value: pergolaConfig.glass_door },
        { label: "Glass Door Position", value: pergolaConfig.glass_door_position },
        { label: "Heater Position", value: pergolaConfig.heater_position },
        { label: "Sunshade", value: pergolaConfig.sunshade },
        { label: "Sunshade Position", value: pergolaConfig.sunshade_position }
      ].filter(item => item.value)
    },
    power: {
      title: "Power",
      items: [
        { label: "Power Cord Position", value: pergolaConfig.power_cord_position }
      ].filter(item => item.value)
    },
    dimensions: {
      title: "Dimensions",
      items: [
        { label: "Height", value: pergolaConfig.height },
        { label: "Length", value: pergolaConfig.length },
        { label: "Width", value: pergolaConfig.width }
      ].filter(item => item.value)
    }
  }

  return groupedConfig
}

export const CheckoutCustomOrderSummary = ({
    cart
}: {
  cart: StoreCart | null
}): JSX.Element => {   
   
  const cacluateSubtotalBySumItems = useCallback((cart: StoreCart | null) => {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((sum, item) => {
      const itemPrice = (item.metadata?.original_prices as any)?.catalogRetailPrice ?? 0
      return sum + itemPrice * item.quantity
    }, 0)
  }, [cart?.items])

  const renderInputAttributes = (inputAttributes: any) => {
    if (!inputAttributes || typeof inputAttributes !== 'object') return null
    
    // Get values from the dictionary and filter attributes that have data
    const attributeValues = Object.entries(inputAttributes)
      .filter(([key, attribute]: [string, any]) => attribute?.data?._name)
      .map(([key, attribute]: [string, any]) => ({
        key,
        name: attribute.data._name,
        value: attribute.value
      }))
    
    if (attributeValues.length === 0) return null

    // Group attributes by category based on key prefix
    const groupedAttributes = {
      pergola: [] as any[],
      sides: [] as any[],
      power: [] as any[],
      glass: [] as any[],
      slats: [] as any[],
      lights: [] as any[],
      other: [] as any[]
    }

    attributeValues.forEach(attr => {
      const key = attr.key.toLowerCase()
      if (key.includes('pergola')) {
        groupedAttributes.pergola.push(attr)
      } else if (key.includes('sides-closing') || key.includes('sunshade')) {
        groupedAttributes.sides.push(attr)
      } else if (key.includes('power-cord')) {
        groupedAttributes.power.push(attr)
      } else if (key.includes('glass')) {
        groupedAttributes.glass.push(attr)
      } else if (key.includes('slats')) {
        groupedAttributes.slats.push(attr)
      } else if (key.includes('lights') || key.includes('no-lights')) {
        groupedAttributes.lights.push(attr)
      } else {
        groupedAttributes.other.push(attr)
      }
    })

    // Create display lines for non-empty groups
    const displayLines = []
    
    if (groupedAttributes.pergola.length > 0) {
      const pergolaValues = groupedAttributes.pergola.map(attr => attr.name).join(' / ')
      displayLines.push(`Pergola: ${pergolaValues}`)
    }
    
    if (groupedAttributes.sides.length > 0) {
      const sidesValues = groupedAttributes.sides.map(attr => attr.name).join(' / ')
      displayLines.push(`Sides: ${sidesValues}`)
    }
    
    if (groupedAttributes.power.length > 0) {
      const powerValues = groupedAttributes.power.map(attr => attr.name).join(' / ')
      displayLines.push(`Power: ${powerValues}`)
    }
    
    if (groupedAttributes.glass.length > 0) {
      const glassValues = groupedAttributes.glass.map(attr => attr.name).join(' / ')
      displayLines.push(`Glass: ${glassValues}`)
    }
    
    if (groupedAttributes.slats.length > 0) {
      const slatsValues = groupedAttributes.slats.map(attr => attr.name).join(' / ')
      displayLines.push(`Slats: ${slatsValues}`)
    }
    
    if (groupedAttributes.lights.length > 0) {
      const lightsValues = groupedAttributes.lights.map(attr => attr.name).join(' / ')
      displayLines.push(`Lights: ${lightsValues}`)
    }
    
    if (groupedAttributes.other.length > 0) {
      const otherValues = groupedAttributes.other.map(attr => attr.name).join(' / ')
      displayLines.push(`Other: ${otherValues}`)
    }

    if (displayLines.length === 0) return null
    
    return (
      <div className="text-[12px] font-normal text-gray-500 mt-1">
        {displayLines.map((line, index) => (
          <div key={index}>
            {line}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full items-start">
      {/* Main Order Summary */}
      <div className="flex flex-col items-start justify-center relative self-stretch w-full">
        <div className="w-full">

            <h2 className="text-[24px] font-semibold text-[#111827]">Order Summary</h2>
          
          {/* Cart Items List */}
          <div className="flex flex-col gap-0 mb-6  border-b border-white">
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-start gap-3 py-4"
              >
                {/* Product Image with Quantity Badge */}
                <div className="relative flex-shrink-0">
                  <div
                    className="h-12 w-12 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${item?.metadata?.thumbnail}")`,
                    }}
                  />
                  {/* Quantity Badge */}
                  <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="flex flex-1 justify-between items-start">
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-semibold text-gray-800">
                      {item.variant_title ?? item.title}
                    </h4> 

                    {/* {renderInputAttributes(item.metadata?.inputAttributes)} */}
                  </div>
                  
                  {/* Price */}
                  <div className="flex flex-col items-end">
                    <div className="font-semibold text-[14px] text-gray-800">                      
                      {formatPrice(((item.metadata?.original_prices as any)?.catalogRetailPrice ?? 0) * item.quantity)}
                    </div>
                    {/* {item?.discount_total > 0 && (
                      <div className="flex flex-col items-end">
                        <div className="font-medium text-[12px] text-gray-500 line-through">
                          ${item?.original_total?.toFixed(2)}
                        </div>
                        <div className="text-[10px] bg-primary px-2 py-0.5 rounded">
                          Save {formatPrice(item?.discount_total)}
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>

    

          {/* Pricing Breakdown */}
          <div className="flex flex-col gap-1 mb-2 py-4 text-[14px] font-semibold">
            <div className="flex justify-between items-center">
              <span className="text-[#000000] ">
                Subtotal: <span>{cart?.items?.length ?? "-"} items</span>
              </span>
              <span className="text-[#111827]">+{formatPrice(cacluateSubtotalBySumItems(cart))}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Shipping: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">+$999.99</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Full Insurance: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">+$999.99</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000] font-medium">
                Lifetime Warranty: <span className="text-highlight">Free</span>
              </span>
              <span className="text-[#8C877C] line-through">+$999.99</span>
            </div>
          </div>

          {/* Tax and discount */}
          <div className="flex flex-col gap-1 mb-4 py-4 text-[14px] font-semibold border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-[#000000]">
                Discount
              </span>
              <span className="text-[#111827]">
                {formatPrice((cart?.metadata?.display_prices as any)?.totalDiscountAmount ?? 0)}
                </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#000000]">
                Tax
              </span>
              <span className="text-[#111827]">
                {formatPrice((cart?.metadata?.display_prices as any)?.totalTaxAmount ?? 0)}
                </span>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center py-4 border-t border-gray-200">
            <span className="text-[24px] font-bold text-[#111827]">Total</span>
            <span className="text-[24px] font-bold text-[#111827]">{formatPrice(cart?.total || 0)}</span>
          </div>
          
          {/* {cart?.discount_total && cart.discount_total > 0 && (
            <div className="flex items-center justify-end gap-2 mt-2">
              <img src="/img/form_tag.svg" alt="Discount Icon" className="w-4 h-4" />
              <span className="text-[14px] text-green-600">
                Total savings {formatPrice(cart.discount_total)}
              </span>
            </div>
          )}
                     */}
        </div> 
      </div>
    </div>
  )
}

