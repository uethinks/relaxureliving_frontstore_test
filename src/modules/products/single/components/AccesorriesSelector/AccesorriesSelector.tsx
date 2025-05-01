import { useState } from "react"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { AccesorriesPopupHeater } from "../AccesorriesPopup/AccesorriesPopupHeater"
import { AccesorriesPopupShades } from "../AccesorriesPopup/AccesorriesPopupShades"
import { AccesorriesPopupGlassdoor } from "../AccesorriesPopup/AccesorriesPopupGlassdoor"
import {
  PergolaSize,
  selectedProductVariant,
  selectedProducts,
} from "types/global"
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
}: Props): JSX.Element => {
  const [accessoriesIcons, setAccessoriesIcons] = useState<accessoriesIcons[]>([
    {
      name: "Heating",
      title: "Heater",
      image: "/img/heating.svg",
      selected: false,
    },
    {
      name: "Shades",
      title: "Shade Screen",
      image: "/img/shades.svg",
      selected: false,
    },
    {
      name: "Glass door",
      title: "Frameless Sliding Glass Door",
      image: "/img/glass-door.svg",
      selected: false,
    },
  ])
  const [selectedHeater, setSelectedHeater] = useState<StoreProduct | null>(
    null
  )
  const [selectedShade, setSelectedShade] = useState<StoreProduct | null>(null)
  const [selectedGlassdoor, setSelectedGlassdoor] =
    useState<StoreProduct | null>(null)

  const [isOpenHeater, setIsOpenHeater] = useState(false)
  const [isOpenShade, setIsOpenShade] = useState(false)
  const [isOpenGlassdoor, setIsOpenGlassdoor] = useState(false)
  const handleAccessoryClick = (accessoryIcon: accessoriesIcons) => {
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (item.name === accessoryIcon.name) {
          item.selected = true
        }
        return item
      })
    )
    const accessoryProduct = accessories.find(
      (product) => product.title === accessoryIcon.title
    )
    if (accessoryIcon.name === "Heating" && accessoryProduct) {
      setSelectedHeater(accessoryProduct)
      setIsOpenHeater(true)
    } else if (accessoryIcon.name === "Shades" && accessoryProduct) {
      setSelectedShade(accessoryProduct)
      setIsOpenShade(true)
    } else if (accessoryIcon.name === "Glass door" && accessoryProduct) {
      setSelectedGlassdoor(accessoryProduct)
      setIsOpenGlassdoor(true)
    }
  }

  const closePopup = (type: string) => {
    if (type === "Heating") {
      setIsOpenHeater(false)
    } else if (type === "Shades") {
      setIsOpenShade(false)
    } else if (type === "Glass door") {
      setIsOpenGlassdoor(false)
    }
  }
  const addAccessoryHeater = (selectedProducts: selectedProducts) => {
    onAccessoryChange({
      type: "Heating",
      selectedProducts: selectedProducts,
    })
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (
          item.name === "Heating" &&
          (selectedProducts?.[0]?.productVarant === null ||
            selectedProducts?.[0]?.quantity === 0)
        ) {
          item.selected = false
        }
        return item
      })
    )
  }
  const addAccessoryShades = (selectedProducts: selectedProducts) => {
    onAccessoryChange({
      type: "Shades",
      selectedProducts: selectedProducts,
    })
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (
          item.name === "Shades" &&
          (selectedProducts?.[0]?.productVarant === null ||
            selectedProducts?.[0]?.quantity === 0)
        ) {
          item.selected = false
        }
        return item
      })
    )
  }
  const addAccessoryGlassdoor = (selectedProducts: selectedProducts) => {
    onAccessoryChange({
      type: "Glass door",
      selectedProducts: selectedProducts,
    })
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (
          item.name === "Glass door" &&
          (selectedProducts?.[0]?.productVarant === null ||
            selectedProducts?.[0]?.quantity === 0)
        ) {
          item.selected = false
        }
        return item
      })
    )
  }

  return (
    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
      <p className="relative self-stretch h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-16 tracking-[0] leading-6 whitespace-nowrap">
        Add accessories to your pergola
      </p>

      <div className="flex flex-col w-full items-start gap-5 relative flex-[0_0_auto]">
        <div className="flex w-full items-center gap-[22px] relative flex-[0_0_auto]">
          {accessoriesIcons.map((accessory) => (
            <button
              key={accessory.name}
              className={`flex flex-col w-1/3 h-[76px] items-center justify-center gap-2.5 px-0 py-0 relative rounded-[20px] cursor-pointer ${
                (accessory.name.toLowerCase().includes("heating") &&
                  selectedHeaterVariant?.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  ) > 0) ||
                (accessory.name.toLowerCase().includes("shades") &&
                  selectedShadesVariant?.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  ) > 0) ||
                (accessory.name.toLowerCase().includes("glass") &&
                  selectedGlassdoorVariant?.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  ) > 0)
                  ? "bg-[#dce7f8]"
                  : "bg-[#ffffff]"
              }`}
              onClick={() => handleAccessoryClick(accessory)}
              aria-pressed={accessory.selected}
            >
              {((accessory.name.toLowerCase().includes("heating") &&
                selectedHeaterVariant?.reduce(
                  (sum, item) => sum + (item.quantity || 0),
                  0
                ) > 0) ||
                (accessory.name.toLowerCase().includes("shades") &&
                  selectedShadesVariant?.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  ) > 0) ||
                (accessory.name.toLowerCase().includes("glass") &&
                  selectedGlassdoorVariant?.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  ) > 0)) && (
                <div className="absolute -top-3 -right-3 w-8 h-8 p-1 rounded-full bg-[#f3f3f3]">
                  <div className="w-full h-full flex items-center justify-center bg-[#E6EEFF] rounded-full">
                    <span className="text-[#072F6C] text-base font-semibold">
                      {accessory.name.toLowerCase().includes("heating")
                        ? selectedHeaterVariant?.reduce(
                            (sum, item) => sum + (item.quantity || 0),
                            0
                          )
                        : accessory.name.toLowerCase().includes("shades")
                        ? selectedShadesVariant?.reduce(
                            (sum, item) => sum + (item.quantity || 0),
                            0
                          )
                        : selectedGlassdoorVariant?.reduce(
                            (sum, item) => sum + (item.quantity || 0),
                            0
                          )}
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
                <div className="relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-16 tracking-[0] leading-[21.6px]">
                  {accessory.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {
        <AccesorriesPopupHeater
          closePopup={closePopup}
          accessoryHeater={selectedHeater}
          addAccessoryHeater={addAccessoryHeater}
          selectedHeaterVariant={selectedHeaterVariant}
          showPopup={isOpenHeater}
        />
      }
      {
        <AccesorriesPopupShades
          closePopup={closePopup}
          accessoryShades={selectedShade}
          addAccessoryShades={addAccessoryShades}
          selectedShadesVariant={selectedShadesVariant}
          pergolaSize={pergolaSize}
          showPopup={isOpenShade}
        />
      }
      {
        <AccesorriesPopupGlassdoor
          closePopup={closePopup}
          accessoryGlassdoor={selectedGlassdoor}
          addAccessoryGlassdoor={addAccessoryGlassdoor}
          selectedGlassdoorVariant={selectedGlassdoorVariant}
          pergolaSize={pergolaSize}
          showPopup={isOpenGlassdoor}
        />
      }
    </div>
  )
}
