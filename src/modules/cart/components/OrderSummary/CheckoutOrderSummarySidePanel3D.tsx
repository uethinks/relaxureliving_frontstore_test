"use client"
import { formatCurrency } from "@lib/util/money"
import { StoreCart } from "@medusajs/types"

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

export const CheckoutOrderSummarySidePanel3D = ({ cart }: { cart: StoreCart | null }) => {
  console.log("CheckoutOrderSummarySidePanel3D cart", cart)

  return (
    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
      {/* <h1>3D Checkout Order Summary</h1>  */}
      {cart?.items?.map((item: any) => (
        <div
          key={item.id}
          className="flex flex-col items-start gap-[30px] relative self-stretch w-full flex-[0_0_auto]"
        >
          {/* Order items */}
          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            
            <div className="flex w-full items-center gap-2.5 relative max-w-full">
              <div
                className={`w-full break-words relative mt-[-1.00px] 
                [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base 
                tracking-[0] leading-6 whitespace-normal overflow-wrap break-word`}
              >
                {item.quantity} x {item.variant_title ?? item.title}
              </div>
            </div>
            <div className="relative  [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-base tracking-[0] leading-[22.4px] whitespace-nowrap">
              {/* ${Number((item.metadata?.original_prices?.catalogRetailPrice ?? 0) * item.quantity).toFixed(2)}               */}
              {formatCurrency((item.metadata?.original_prices?.catalogRetailPrice ?? 0) * item.quantity)}              
            </div> 

          </div>
{/*  
          {item.metadata?.original_prices && (() => {
            const prices = item.metadata.original_prices

            let unitPrice = Number(prices.unit_retail_price || 0)
            let finalPrice = Number(prices.final_price || 0)

            let unitPriceWithDiscountAndVat = Number(prices.unit_retail_price_with_discount_and_vat || 0)
            let unitPriceWitoutDiscount = Number(prices.unit_retail_price_without_discount || 0)
            const vatRate = Number(prices.vat_rate || 0)

            

 
            // const unitPrice = Number(prices.unit_retail_price || 0)
            const unitPriceWithDiscount = Number(prices.unit_retail_price_without_discount || 0)
            // const finalPrice = Number(prices.final_price || 0)
            
            
            // Calculate intermediate values
            const vatAmount = unitPrice * (vatRate / 100)
            const priceWithVAT = unitPrice + vatAmount
            const discountAmount = priceWithVAT - finalPrice
            const taxAmount = vatAmount // Assuming VAT is the tax component
            
            return (
              <div className="w-full bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Price Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Raw Price:</span>
                    <span className="font-medium">${unitPrice.toFixed(2)}</span>
                  </div>
                  
                  {vatRate >= 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">VAT ({vatRate}%):</span>
                      <span className="font-medium">${vatAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {discountAmount >= 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount:</span>
                      <span className="font-medium text-green-600">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-blue-800">Final Price:</span>
                      <span className="text-blue-800">${finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
 
          {item.metadata?.pergola_config && (() => {
            const config = organizePergolaConfig(item.metadata)
            if (!config) return null
            
            return (
              <div className="w-full bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Pergola Configuration</h3>
                {Object.entries(config).map(([key, group]) => {
                  if (group.items.length === 0) return null
                  
                  return (
                    <div key={key} className="mb-3">
                      <h4 className="font-medium text-gray-700 text-sm mb-1">{group.title}</h4>
                      <div className="space-y-1">
                        {group.items.map((item, index) => (
                          <div key={index} className="text-xs text-gray-600">
                            <span className="font-medium">{item.label}:</span> {item.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })()} */}

          
        </div>
      ))}
      <div className="relative self-stretch w-full h-0.5 bg-[#d9d9d9] rounded-[10px]" />
    </div>
  )
}
