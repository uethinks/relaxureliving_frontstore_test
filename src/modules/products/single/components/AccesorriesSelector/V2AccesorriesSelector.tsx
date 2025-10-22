/* NOSONAR */
import { useState, useEffect } from "react"
import {
  StoreProduct,
  StoreProductOptionValue,
} from "@medusajs/types"
// Using simple button elements instead of Button component to avoid import issues
import {
  PergolaSize,
  selectedProducts,
} from "types/global"
import { DirectionalSelector } from "./DirectionalSelector"
import { FileDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VALUE_BY_COLORS } from "../PergulaSizeSelector/PergolaFeatures"
import { handleDownloadPDF } from "@lib/util/selector"

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
  selectedSize?: StoreProductOptionValue
  selectedColor?: StoreProductOptionValue
  selectedHeaterVariant: selectedProducts
  selectedShadesVariant: selectedProducts
  selectedGlassdoorVariant: selectedProducts
  pergolaSize: PergolaSize
  selectorData: any
  accessoriesCMSData: any
}

export const V2AccesorriesSelector = ({
  onAccessoryChange,
  accessories,
  selectedColor,
  selectedSize,
  selectedHeaterVariant,
  selectedShadesVariant,
  selectedGlassdoorVariant,
  pergolaSize,
  selectorData,
}: Props): React.JSX.Element => {

  // Side selection state for each accessory
  const [selectedHeaterSides, setSelectedHeaterSides] = useState<string[]>([])
  const [selectedShadesSides, setSelectedShadesSides] = useState<string[]>([])
  const [selectedGlassdoorSides, setSelectedGlassdoorSides] = useState<
    string[]
  >([])

  // Calculate quantities and prices for each accessory
  const getHeaterQuantity = () =>
    selectedHeaterVariant?.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    ) || 0
  const getShadesQuantity = () =>
    selectedShadesVariant?.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    ) || 0
  const getGlassdoorQuantity = () =>
    selectedGlassdoorVariant?.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    ) || 0

  const getHeaterPrice = () => {
    return (
      selectedHeaterVariant?.reduce((sum, item) => {
        return (
          sum +
          (item.productVarant?.calculated_price?.calculated_amount || 0) *
            (item.quantity || 0)
        )
      }, 0) || 0
    )
  }

  const getShadesPrice = () => {
    return (
      selectedShadesVariant?.reduce((sum, item) => {
        return (
          sum +
          (item.productVarant?.calculated_price?.calculated_amount || 0) *
            (item.quantity || 0)
        )
      }, 0) || 0
    )
  }

  const getGlassdoorPrice = () => {
    return (
      selectedGlassdoorVariant?.reduce((sum, item) => {
        return (
          sum +
          (item.productVarant?.calculated_price?.calculated_amount || 0) *
            (item.quantity || 0)
        )
      }, 0) || 0
    )
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
      ? currentSides.filter((s) => s !== side)
      : [...currentSides, side]

    setSides(newSides)

    console.log("newSides", newSides, "accessoryType", accessoryType)
    // Special handling for shades: Update product variants based on side selection
    if (accessoryType === ACCESSORY_NAMES.SHADES) {
      updateShadesVariants(newSides)
    } else if (accessoryType === ACCESSORY_NAMES.HEATING) {
      updateHeaterVariants(newSides)
    } else if (accessoryType === ACCESSORY_NAMES.GLASS_DOOR) {
      updateGlassdoorVariants(newSides)
    }
  }

  // Update shades variants based on selected sides
  const updateShadesVariants = (selectedSides: string[]) => {
    console.log("selectedSides", selectedSides)
    if (!accessories || selectedSides.length === 0) {
      onAccessoryChange({
        type: ACCESSORY_NAMES.SHADES,
        selectedProducts: [],
      })
      return
    }

    // Find the shades product
    const shadesProduct = accessories.find(
      (product) =>
        product.title?.toLowerCase().includes("shade") ||
        product.title?.toLowerCase().includes("sunshade")
    )

    if (!shadesProduct) return

    // Calculate quantities for each side type
    const shortSideCount = selectedSides.filter(
      (side) => side === "left" || side === "right"
    ).length

    const longSideCount = selectedSides.filter(
      (side) => side === "front" || side === "back"
    ).length

    // Create new variants array
    const newVariants: selectedProducts = []

    // Add short side variants (width)
    if (shortSideCount > 0) {
      const shortSideVariant = shadesProduct.variants?.find(
        (variant) => variant.length === pergolaSize.width
      )
      if (shortSideVariant) {
        newVariants.push({
          productVarant: shortSideVariant,
          quantity: shortSideCount,
        })
      }
    }

    // Add long side variants (length)
    if (longSideCount > 0) {
      const longSideVariant = shadesProduct.variants?.find(
        (variant) => variant.length === pergolaSize.length
      )
      if (longSideVariant) {
        newVariants.push({
          productVarant: longSideVariant,
          quantity: longSideCount,
        })
      }
    }

    // Update the parent component with new variants
    onAccessoryChange({
      type: ACCESSORY_NAMES.SHADES,
      selectedProducts: newVariants,
    })
  }

  // Update heater variants based on selected sides
  const updateHeaterVariants = (selectedSides: string[]) => {
    if (!accessories || selectedSides.length === 0) {
      onAccessoryChange({
        type: ACCESSORY_NAMES.HEATING,
        selectedProducts: [],
      })
      return
    }

    // Find the heater product
    const heaterProduct = accessories.find((product) =>
      product.title?.toLowerCase().includes("heater")
    )

    if (!heaterProduct) return

    // Create new variants array
    const newVariants: selectedProducts = []
    console.log("heaterProduct", heaterProduct.variants, selectedColor?.value)

    // Add short side variants (width)
    const sideVariant = heaterProduct.variants?.find((variant) => {
      const matchingColor = variant?.options?.find((option) => {
        console.log("option", option, "selectedColor", selectedColor?.value)
        return (
          option.option?.title === "Color" &&
          option.value === selectedColor?.value
        )
      })
      console.log("matchingColor", matchingColor)
      return !!matchingColor
    })
    if (sideVariant) {
      newVariants.push({
        productVarant: sideVariant,
        quantity: selectedSides.length,
      })
    }

    // Update the parent component with new variants
    onAccessoryChange({
      type: ACCESSORY_NAMES.HEATING,
      selectedProducts: newVariants,
    })
  }

  // Update glassdoor variants based on selected sides
  const updateGlassdoorVariants = (selectedSides: string[]) => {
    if (!accessories || selectedSides.length === 0) {
      onAccessoryChange({
        type: ACCESSORY_NAMES.GLASS_DOOR,
        selectedProducts: [],
      })
      return
    }

    // Find the glassdoor product
    const glassdoorProduct = accessories.find(
      (product) =>
        product.title?.toLowerCase().includes("glass door") ||
        product.title?.toLowerCase().includes("frameless sliding glass door")
    )

    if (!glassdoorProduct) return

    // Calculate quantities for each side type
    const shortSideCount = selectedSides.filter(
      (side) => side === "left" || side === "right"
    ).length
    
    const longSideCount = selectedSides.filter(
      (side) => side === "front" || side === "back"
    ).length
    
    // Create new variants array
    const newVariants: selectedProducts = []
    
    // Add short side variants (width)
    
    if (shortSideCount > 0) {
      const shortSideVariant = glassdoorProduct.variants?.find(
        (variant) => variant.length === pergolaSize.width
      )
      console.log('shortSideCount', shortSideCount)
    console.log('pergolaSize.width', pergolaSize.width)
      console.log('shortSideVariant', shortSideVariant)
      if (shortSideVariant) {
        newVariants.push({
          productVarant: shortSideVariant,
          quantity: shortSideCount,
        })
      }
    }

    // Add long side variants (length)
    
    if (longSideCount > 0) {
      const longSideVariant = glassdoorProduct.variants?.find(
        (variant) => variant.length === pergolaSize.length
      )
      console.log('longSideCount', longSideCount)
    console.log('pergolaSize.length', pergolaSize.length)
      console.log('longSideVariant', longSideVariant)
      if (longSideVariant) {
        newVariants.push({
          productVarant: longSideVariant,
          quantity: longSideCount,
        })
      }
    }

    // Update the parent component with new variants
    onAccessoryChange({
      type: ACCESSORY_NAMES.GLASS_DOOR,
      selectedProducts: newVariants,
    })
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
        if (
          selectedHeaterVariant?.find(
            (item) => item.productVarant?.length === pergolaSize.width
          )
        ) {
          heaterSides.push("left", "right")
        }
        if (
          selectedHeaterVariant?.find(
            (item) => item.productVarant?.length === pergolaSize.length
          )
        ) {
          heaterSides.push("front", "back")
        }
      }
    }
    setSelectedHeaterSides(heaterSides)

    // Initialize shades sides
    const shadesSides: string[] = []
    if (getShadesQuantity() > 0) {
      if (pergolaSize.width === pergolaSize.length) {
        // Square pergola - determine number based on total quantity
        const totalQuantity = getShadesQuantity()
        if (totalQuantity > 0) {
          shadesSides.push(...Array(totalQuantity).fill("left"))
        }
      } else {
        // Rectangle pergola - map variants to sides
        const shortSideVariant = selectedShadesVariant?.find(
          (item) => item.productVarant?.length === pergolaSize.width
        )
        const longSideVariant = selectedShadesVariant?.find(
          (item) => item.productVarant?.length === pergolaSize.length
        )

        // Add short sides (left/right)
        if (shortSideVariant && shortSideVariant.quantity) {
          if (shortSideVariant.quantity >= 1) shadesSides.push("left")
          if (shortSideVariant.quantity >= 2) shadesSides.push("right")
        }

        // Add long sides (front/back)
        if (longSideVariant && longSideVariant.quantity) {
          if (longSideVariant.quantity >= 1) shadesSides.push("front")
          if (longSideVariant.quantity >= 2) shadesSides.push("back")
        }
      }
    }
    setSelectedShadesSides(shadesSides)

    // Initialize glassdoor sides
    const glassdoorSides: string[] = []
    if (getGlassdoorQuantity() > 0) {
      console.log('pergolaSize.width === pergolaSize.length', pergolaSize.width === pergolaSize.length)
      if (pergolaSize.width === pergolaSize.length) {
        glassdoorSides.push("left")
      } else {
        console.log('selectedGlassdoorVariant', selectedGlassdoorVariant)
        console.log('pergolaSize.width', pergolaSize.width)
        console.log('pergolaSize.length', pergolaSize.length)
        if (
          selectedGlassdoorVariant?.find(
            (item) => item.productVarant?.length === pergolaSize.width
          )
        ) {
          glassdoorSides.push("left", "right")
        }
        if (
          selectedGlassdoorVariant?.find(
            (item) => item.productVarant?.length === pergolaSize.length
          )
        ) {
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

  useEffect(() => {
    setSelectedGlassdoorSides([])
    setSelectedHeaterSides([])
    setSelectedShadesSides([])
  }, [selectedSize, selectedColor])

  return (
    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">

      {/* Add-ons Section */}
      <div className="mb-4 space-y-4 w-full">
        {/* Sunshade */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#000000]">
              Sunshade: {getShadesQuantity()},{" "}
              {selectedShadesSides.join(", ") || "None"}
            </span>
            <span className="text-sm text-[#000000]">
              +${getShadesPrice().toFixed(2)}
            </span>
          </div>

          {/* Visual Side Selector */}
          <DirectionalSelector
            title="Which side do you want the shades?"
            selectedSides={selectedShadesSides}
            onSideSelect={handleSideSelect}
            pergolaSize={pergolaSize}
            accessoryType={ACCESSORY_NAMES.SHADES}
          />

          {/* Color Section */}
          <div className="">
            <div className="flex gap-2">
              <div
                className={`h-6 w-6 border-2 cursor-pointer border-[#ffbf3c] bg-[#ffd379]`}
                style={{ backgroundColor: VALUE_BY_COLORS["Light Gray"] }}
              ></div>
            </div>
          </div>

          <Button variant="link" className="text-xs px-0 text-[#2F2A1E] mt-1" onClick={() => handleDownloadPDF(selectorData?.PDF_Link_sunshade, "sunshade")}>
            <FileDownIcon className="w-4 h-4" color="#FFBF3C" />
            <span className="underline">Download Specs</span>
          </Button>
        </div>

        {/* Glass Door */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#000000]">
              Glass Door: {getGlassdoorQuantity()},{" "}
              {selectedGlassdoorSides.join(", ") || "None"}
            </span>
            <span className="text-sm text-[#000000]">
              +${getGlassdoorPrice().toFixed(2)}
            </span>
          </div>

          {/* Visual Side Selector */}
          <DirectionalSelector
            title="Which side do you want the glass doors?"
            selectedSides={selectedGlassdoorSides}
            onSideSelect={handleSideSelect}
            pergolaSize={pergolaSize}
            accessoryType={ACCESSORY_NAMES.GLASS_DOOR}
          />

          <Button variant="link" className="text-xs px-0 text-[#2F2A1E] mt-1" onClick={() => handleDownloadPDF(selectorData?.PDF_Link_glassdoor, "glassdoor")}>
            <FileDownIcon className="w-4 h-4" color="#FFBF3C" />
            <span className="underline">Download Specs</span>
          </Button>
        </div>

        {/* Heater */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#000000]">
              Heater: {getHeaterQuantity()},{" "}
              {selectedHeaterSides.join(", ") || "None"}
            </span>
            <span className="text-sm text-[#000000]">
              +${getHeaterPrice().toFixed(2)}
            </span>
          </div>

          {/* Visual Side Selector */}
          <DirectionalSelector
            title="Which side do you want the heaters?"
            selectedSides={selectedHeaterSides}
            onSideSelect={handleSideSelect}
            pergolaSize={pergolaSize}
            accessoryType={ACCESSORY_NAMES.HEATING}
          />

          <Button variant="link" className="text-xs px-0 text-[#2F2A1E] mt-1" onClick={() => handleDownloadPDF(selectorData?.PDF_Link_heater, "heater")}>
            <FileDownIcon className="w-4 h-4" color="#FFBF3C" />
            <span className="underline">Download Specs</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
