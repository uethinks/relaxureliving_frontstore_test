/* NOSONAR */
import { useState, useEffect } from "react"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
// Using simple button elements instead of Button component to avoid import issues
import {
  PergolaSize,
  selectedProductVariant,
  selectedProducts,
} from "types/global"

// Constants to avoid string duplication
const ACCESSORY_NAMES = {
  HEATING: "Heating",
  SHADES: "Shades",
  GLASS_DOOR: "Glass door",
} as const

interface Props {
  onAccessoryChange: ({
    type,
    selectedProducts,
  }: {
    type: string
    selectedProducts: selectedProducts
  }) => void
  accessories: StoreProduct[]
  selectedHeaterVariant: selectedProducts
  selectedShadesVariant: selectedProducts
  selectedGlassdoorVariant: selectedProducts
  pergolaSize: PergolaSize
  accessoriesCMSData: any
}

type accessoriesIcons = {
  name: string
  title: string
  image: string
  selected: boolean
}

export const AccesorriesSelector = ({
  onAccessoryChange,
  accessories,
  selectedHeaterVariant,
  selectedShadesVariant,
  selectedGlassdoorVariant,
  pergolaSize,
  accessoriesCMSData,
}: Props): React.JSX.Element => {
  const [accessoriesIcons, setAccessoriesIcons] = useState<accessoriesIcons[]>([
    {
      name: ACCESSORY_NAMES.HEATING,
      title: "Heater",
      image: "/img/heating.svg",
      selected: false,
    },
    {
      name: ACCESSORY_NAMES.SHADES,
      title: "Shade Screen",
      image: "/img/shades.svg",
      selected: false,
    },
    {
      name: ACCESSORY_NAMES.GLASS_DOOR,
      title: "Frameless Sliding Glass Door",
      image: "/img/glass-door.svg",
      selected: false,
    },
  ])

  // Side selection state for each accessory
  const [selectedHeaterSides, setSelectedHeaterSides] = useState<string[]>([])
  const [selectedShadesSides, setSelectedShadesSides] = useState<string[]>([])
  const [selectedGlassdoorSides, setSelectedGlassdoorSides] = useState<string[]>([])

  // Calculate quantities and prices for each accessory
  const getHeaterQuantity = () => selectedHeaterVariant?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0
  const getShadesQuantity = () => selectedShadesVariant?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0
  const getGlassdoorQuantity = () => selectedGlassdoorVariant?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0

  const getHeaterPrice = () => {
    return selectedHeaterVariant?.reduce((sum, item) => {
      return sum + ((item.productVarant?.calculated_price?.calculated_amount || 0) * (item.quantity || 0))
    }, 0) || 0
  }

  const getShadesPrice = () => {
    return selectedShadesVariant?.reduce((sum, item) => {
      return sum + ((item.productVarant?.calculated_price?.calculated_amount || 0) * (item.quantity || 0))
    }, 0) || 0
  }

  const getGlassdoorPrice = () => {
    return selectedGlassdoorVariant?.reduce((sum, item) => {
      return sum + ((item.productVarant?.calculated_price?.calculated_amount || 0) * (item.quantity || 0))
    }, 0) || 0
  }

  // Handle side selection for each accessory
  const handleSideSelect = (accessoryType: string, side: string) => {
    let currentSides: string[]
    let setSides: (sides: string[]) => void

    switch (accessoryType) {
      case ACCESSORY_NAMES.HEATING:
        currentSides = selectedHeaterSides
        setSides = setSelectedHeaterSides
        break
      case ACCESSORY_NAMES.SHADES:
        currentSides = selectedShadesSides
        setSides = setSelectedShadesSides
        break
      case ACCESSORY_NAMES.GLASS_DOOR:
        currentSides = selectedGlassdoorSides
        setSides = setSelectedGlassdoorSides
        break
      default:
        return
    }

    const newSides = currentSides.includes(side)
      ? currentSides.filter(s => s !== side)
      : [...currentSides, side]
    
    setSides(newSides)
  }

  // Initialize sides based on existing selections
  const initializeSides = () => {
    // Initialize heater sides
    const heaterSides: string[] = []
    if (getHeaterQuantity() > 0) {
      if (pergolaSize.width === pergolaSize.length) {
        // Square pergola
        heaterSides.push("left")
      } else {
        // Rectangle pergola
        if (selectedHeaterVariant?.find(item => item.productVarant?.length === pergolaSize.width)) {
          heaterSides.push("left", "right")
        }
        if (selectedHeaterVariant?.find(item => item.productVarant?.length === pergolaSize.length)) {
          heaterSides.push("front", "back")
        }
      }
    }
    setSelectedHeaterSides(heaterSides)

    // Initialize shades sides
    const shadesSides: string[] = []
    if (getShadesQuantity() > 0) {
      if (pergolaSize.width === pergolaSize.length) {
        shadesSides.push("left")
      } else {
        if (selectedShadesVariant?.find(item => item.productVarant?.length === pergolaSize.width)) {
          shadesSides.push("left", "right")
        }
        if (selectedShadesVariant?.find(item => item.productVarant?.length === pergolaSize.length)) {
          shadesSides.push("front", "back")
        }
      }
    }
    setSelectedShadesSides(shadesSides)

    // Initialize glassdoor sides
    const glassdoorSides: string[] = []
    if (getGlassdoorQuantity() > 0) {
      if (pergolaSize.width === pergolaSize.length) {
        glassdoorSides.push("left")
      } else {
        if (selectedGlassdoorVariant?.find(item => item.productVarant?.length === pergolaSize.width)) {
          glassdoorSides.push("left", "right")
        }
        if (selectedGlassdoorVariant?.find(item => item.productVarant?.length === pergolaSize.length)) {
          glassdoorSides.push("front", "back")
        }
      }
    }
    setSelectedGlassdoorSides(glassdoorSides)
  }

  // Initialize sides when component mounts or selections change
  useEffect(() => {
    initializeSides()
  }, [])

  return (
    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
      {/* <h3 className="relative self-stretch h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-16 tracking-[0] leading-6 whitespace-nowrap">
        Add accessories to your pergola
      </h3> */}

      {/* <div className="flex flex-col w-full items-start gap-5 relative flex-[0_0_auto]">
        <div className="flex w-full items-center gap-[22px] relative flex-[0_0_auto]">
          {accessoriesIcons.map((accessory) => (
            <button
              key={accessory.name}
              className={`flex flex-col w-1/3 h-[76px] items-center justify-center gap-2.5 px-0 py-0 relative rounded-[20px] cursor-pointer ${
                (accessory.name.toLowerCase().includes("heating") && getHeaterQuantity() > 0) ||
                (accessory.name.toLowerCase().includes("shades") && getShadesQuantity() > 0) ||
                (accessory.name.toLowerCase().includes("glass") && getGlassdoorQuantity() > 0)
                  ? "bg-[#F6AF1F33]"
                  : "bg-[#ffffff]"
              }`}
              onClick={() => {
                // Handle accessory click - could open a simplified selection modal or inline editor
                console.log(`Clicked ${accessory.name}`)
              }}
              aria-pressed={accessory.selected}
            >
              {((accessory.name.toLowerCase().includes("heating") && getHeaterQuantity() > 0) ||
                (accessory.name.toLowerCase().includes("shades") && getShadesQuantity() > 0) ||
                (accessory.name.toLowerCase().includes("glass") && getGlassdoorQuantity() > 0)) && (
                <div className="absolute -top-3 -right-3 w-8 h-8 p-1 rounded-full bg-[#f3f3f3]">
                  <div className="w-full h-full flex items-center justify-center bg-[#F6AF1F33] rounded-full">
                    <span className="text-[#69727a] text-base">
                      {accessory.name.toLowerCase().includes("heating")
                        ? getHeaterQuantity()
                        : accessory.name.toLowerCase().includes("shades")
                        ? getShadesQuantity()
                        : getGlassdoorQuantity()}
                    </span>
                  </div>
                </div>
              )}
              <img
                className="relative w-6 h-6 mt-[-10.00px]"
                alt={accessory.name}
                src={accessory.image}
              />

              <div className="flex h-[22px] items-start justify-center relative self-stretch w-full mb-[-10.00px]">
                <h3 className="relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-16 tracking-[0] leading-[21.6px]">
                  {accessory.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div> */}

      {/* Add-ons Section */}
      <div className="mb-4 space-y-4 w-full">
        {/* Sunshade */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#000000]">
              Sunshade: {getShadesQuantity()}, {selectedShadesSides.join(", ") || "None"}
            </span>
            <span className="text-sm text-[#000000]">
              +${getShadesPrice().toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              className={`px-4 py-2 rounded border ${
                selectedShadesSides.includes("front") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.SHADES, "front")}
            >
              Front
            </button>
            <button 
              className={`px-4 py-2 rounded border ${
                selectedShadesSides.includes("back") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.SHADES, "back")}
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`px-4 py-2 rounded border ${
                selectedShadesSides.includes("left") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.SHADES, "left")}
            >
              Left
            </button>
            <button 
              className={`px-4 py-2 rounded border ${
                selectedShadesSides.includes("right") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.SHADES, "right")}
            >
              Right
            </button>
          </div>
          <div className="text-xs text-[#ffbf3c] mt-1 cursor-pointer">
            📋 Download Specs
          </div>
        </div>

        {/* Glass Door */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#000000]">
              Glass Door: {getGlassdoorQuantity()}
            </span>
            <span className="text-sm text-[#000000]">
              +${getGlassdoorPrice().toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button 
              className={`px-4 py-2 rounded border ${
                selectedGlassdoorSides.includes("front") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.GLASS_DOOR, "front")}
            >
              Front
            </button>
            <button 
              className={`px-4 py-2 rounded border ${
                selectedGlassdoorSides.includes("back") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.GLASS_DOOR, "back")}
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              className={`px-4 py-2 rounded border ${
                selectedGlassdoorSides.includes("left") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.GLASS_DOOR, "left")}
            >
              Left
            </button>
            <button 
              className={`px-4 py-2 rounded border ${
                selectedGlassdoorSides.includes("right") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.GLASS_DOOR, "right")}
            >
              Right
            </button>
          </div>
          <div className="text-xs text-[#ffbf3c] mt-1 cursor-pointer">
            📋 Download Specs
          </div>
        </div>

        {/* Heater */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#000000]">
              Heater: {getHeaterQuantity()}
            </span>
            <span className="text-sm text-[#000000]">
              +${getHeaterPrice().toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button 
              className={`px-4 py-2 rounded border ${
                selectedHeaterSides.includes("front") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.HEATING, "front")}
            >
              Front
            </button>
            <button 
              className={`px-4 py-2 rounded border ${
                selectedHeaterSides.includes("back") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.HEATING, "back")}
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              className={`px-4 py-2 rounded border ${
                selectedHeaterSides.includes("left") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.HEATING, "left")}
            >
              Left
            </button>
            <button 
              className={`px-4 py-2 rounded border ${
                selectedHeaterSides.includes("right") 
                  ? "bg-[#ffbf3c] text-[#000000] border-[#ffbf3c]" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSideSelect(ACCESSORY_NAMES.HEATING, "right")}
            >
              Right
            </button>
          </div>
          <div className="text-xs text-[#ffbf3c] mt-1 cursor-pointer">
            📋 Download Specs
          </div>
        </div>
      </div>
    </div>
  )
}
