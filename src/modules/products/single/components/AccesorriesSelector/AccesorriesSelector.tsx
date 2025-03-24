import { useState } from "react"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { AccesorriesPopupHeater } from "../AccesorriesPopup/AccesorriesPopupHeater"
import { AccesorriesPopupShades } from "../AccesorriesPopup/AccesorriesPopupShades"
import { AccesorriesPopupGlassdoor } from "../AccesorriesPopup/AccesorriesPopupGlassdoor"
interface Props {
  onAccessoryChange: ({
    type,
    productVarant,
    quantity,
  }: {
    type: string
    productVarant: StoreProductVariant | null
    quantity: number
  }) => void
  accessories: StoreProduct[]
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
    console.log("closePopup", type)
    if (type === "Heating") {
      setIsOpenHeater(false)
    } else if (type === "Shades") {
      setIsOpenShade(false)
    } else if (type === "Glass door") {
      setIsOpenGlassdoor(false)
    }
  }
  const addAccessoryHeater = (
    selectedAccessoryHeater: StoreProductVariant | null,
    selectedAccessoryHeaterQuantity: number
  ) => {
    console.log(
      "addAccessoryHeater",
      selectedAccessoryHeater,
      selectedAccessoryHeaterQuantity
    )
    onAccessoryChange({
      type: "Heating",
      productVarant: selectedAccessoryHeater,
      quantity: selectedAccessoryHeaterQuantity,
    })
  }
  const addAccessoryShades = (
    selectedAccessoryShades: StoreProductVariant | null,
    selectedAccessoryShadesQuantity: number
  ) => {
    console.log(
      "addAccessoryShades",
      selectedAccessoryShades,
      selectedAccessoryShadesQuantity
    )
    onAccessoryChange({
      type: "Shades",
      productVarant: selectedAccessoryShades,
      quantity: selectedAccessoryShadesQuantity,
    })
  }
  const addAccessoryGlassdoor = (
    selectedAccessoryGlassdoor: StoreProductVariant | null,
    selectedAccessoryGlassdoorQuantity: number
  ) => {
    console.log(
      "addAccessoryGlassdoor",
      selectedAccessoryGlassdoor,
      selectedAccessoryGlassdoorQuantity
    )
    onAccessoryChange({
      type: "Glass door",
      productVarant: selectedAccessoryGlassdoor,
      quantity: selectedAccessoryGlassdoorQuantity,
    })
  }

  return (
    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
      <p className="relative self-stretch h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-16 tracking-[0] leading-6 whitespace-nowrap">
        Add accesories to your pergola
      </p>

      <div className="flex flex-col w-[430px] items-start gap-5 relative flex-[0_0_auto]">
        <div className="flex w-[430px] items-center gap-[22px] relative flex-[0_0_auto]">
          {accessoriesIcons.map((accessory) => (
            <button
              key={accessory.name}
              className={`flex flex-col w-[127px] h-[76px] items-center justify-center gap-2.5 px-0 py-0 relative rounded-[20px] cursor-pointer ${
                accessory.selected ? "bg-[#dce7f8]" : "bg-[#ffffff]"
              }`}
              onClick={() => handleAccessoryClick(accessory)}
              aria-pressed={accessory.selected}
            >
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

      {isOpenHeater && (
        <AccesorriesPopupHeater
          closePopup={closePopup}
          accessoryHeater={selectedHeater}
          addAccessoryHeater={addAccessoryHeater}
        />
      )}
      {isOpenShade && (
        <AccesorriesPopupShades
          closePopup={closePopup}
          accessoryShades={selectedShade}
          addAccessoryShades={addAccessoryShades}
        />
      )}
      {isOpenGlassdoor && (
        <AccesorriesPopupGlassdoor
          closePopup={closePopup}
          accessoryGlassdoor={selectedGlassdoor}
          addAccessoryGlassdoor={addAccessoryGlassdoor}
        />
      )}
    </div>
  )
}
