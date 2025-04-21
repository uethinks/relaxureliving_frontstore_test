import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { useCallback, useEffect, useState } from "react"
import { AddAccessories } from "./AddAccessories"
import { selectedProducts } from "types/global"
import { ImageSlider } from "@modules/common/components/ImageSlider"

export const AccesorriesPopupHeater = ({
  accessoryHeater,
  closePopup,
  addAccessoryHeater,
  selectedHeaterVariant,
}: {
  accessoryHeater: StoreProduct | null
  closePopup: (type: string) => void
  addAccessoryHeater: (selectedProducts: selectedProducts) => void
  selectedHeaterVariant: selectedProducts
}): JSX.Element => {
  const closePopupHeater = () => {
    closePopup("Heating")
  }
  const productImage = accessoryHeater?.images?.[0].url
  const addAccessoryHeaterHandler = () => {
    const selectedHeaterProduct = {
      productVarant: selectedHeater,
      quantity: selectedHeaterQuantity,
    }
    addAccessoryHeater([selectedHeaterProduct])
    closePopupHeater()
  }
  const [selectedHeater, setSelectedHeater] =
    useState<StoreProductVariant | null>(
      selectedHeaterVariant?.[0]?.productVarant || null
    )
  const [selectedHeaterQuantity, setSelectedHeaterQuantity] = useState(
    selectedHeaterVariant?.[0]?.quantity || 0
  )

  const heaterSizes: StoreProductOption | undefined =
    accessoryHeater?.options?.find((option) => option.title === "Watt")
  const heaterColors: StoreProductOption | undefined =
    accessoryHeater?.options?.find((option) => option.title === "Color")

  const defaultSize: StoreProductOptionValue = heaterSizes?.values?.[0] || {
    id: "",
    value: "",
  }
  const defaultColor: StoreProductOptionValue = heaterColors?.values?.[0] || {
    id: "",
    value: "",
  }

  const [selectedSize, setSelectedSize] =
    useState<StoreProductOptionValue>(defaultSize)
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)

  const getVariant = useCallback(() => {
    return accessoryHeater?.variants?.find((variant) => {
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Watt" && option.value === selectedSize.value
      )
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Color" &&
          option.value === selectedColor.value
      )
      return matchingSize && matchingColor
    })
  }, [accessoryHeater, selectedSize, selectedColor])

  const handleSizeClick = (size: StoreProductOptionValue) => {
    setSelectedSize(size)
  }

  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }

  useEffect(() => {
    const variant = getVariant()
    if (variant) {
      setSelectedHeater(variant)
    }
  }, [selectedSize, selectedColor, getVariant])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-50 z-50">
      <div className="relative bg-white rounded-[20px] p-10 max-w-[1269px] max-h-[90vh] overflow-auto">
        <div className="flex flex-col lg:flex-row items-center gap-[30px]">
          <div className="relative w-full lg:w-1/2 aspect-square">
            <ImageSlider images={accessoryHeater?.images || []} />
          </div>

          <div className="flex flex-col justify-between w-full h-full lg:w-1/2 items-start gap-10">
            <div className="flex flex-col items-start gap-5 self-stretch w-full">
              <div className="flex flex-col items-start gap-2.5 py-2.5 self-stretch w-full">
                <div className="flex items-center justify-between w-full">
                  <h2 className="self-stretch font-merriweather text-[#343a40] text-[28px] font-bold leading-[39.2px]">
                    {accessoryHeater?.title}
                  </h2>
                  <div className="self-stretch text-[#343a40] text-[22px] leading-[30.8px] font-montserrat font-medium">
                    {selectedHeater?.calculated_price?.calculated_amount &&
                    selectedHeaterQuantity
                      ? "$" +
                        selectedHeater?.calculated_price?.calculated_amount *
                          selectedHeaterQuantity
                      : ""}
                  </div>
                </div>

                <div className="relative h-12">
                  <div className="flex px-2 h-12 gap-5">
                    <div className="flex flex-row items-center gap-2.5 relative">
                      <p>Color:</p>
                    </div>
                    <div className="inline-flex items-center gap-[18px] relative">
                      {heaterColors?.values?.map((color) => (
                        <div
                          key={color.id}
                          className="flex flex-row items-center gap-2.5 relative"
                        >
                          <button
                            className={`w-6 h-6 rounded-[20px] cursor-pointer border-2 border-solid ${
                              color.value == "Dark Grey"
                                ? "bg-[#7F7F7F]"
                                : "bg-[#ffffff]"
                            }  ${
                              selectedColor === color ? "border-[#072F6C]" : ""
                            }`}
                            onClick={() => handleColorClick(color)}
                          ></button>
                          <div
                            className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap text-[#072f6c]`}
                          >
                            {color.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative h-12 flex flex-row items-center gap-2.5">
                  <div className="flex flex-row items-center gap-2.5 relative">
                    <p>Watt:</p>
                  </div>
                  <div className="flex px-2 h-12 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
                    <div className="inline-flex items-center gap-[18px] relative">
                      {heaterSizes?.values?.map((size) => (
                        <button
                          key={size.id}
                          className={`inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] cursor-pointer ${
                            selectedSize === size
                              ? "bg-[#dce7f8] rounded-[20px]"
                              : ""
                          }`}
                          onClick={() => handleSizeClick(size)}
                        >
                          <div
                            className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap ${
                              selectedSize === size
                                ? "text-[#072f6c]"
                                : "text-[#69727a]"
                            }`}
                          >
                            {size.value}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="self-stretch text-[#68717a] leading-[22.4px] font-montserrat text-base font-medium mt-2">
                  {accessoryHeater?.description}
                </p>

                <div className="flex items-center gap-2 self-stretch w-full mt-4">
                  <div className="flex items-center justify-center gap-2.5 py-2.5">
                    <p className="text-[#69727a] text-lg leading-[27px] whitespace-nowrap font-montserrat font-medium">
                      How many heaters do you need:
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-14 h-10 flex items-center justify-center rounded-[10px] border border-solid border-[#a8a8a8]">
                      <input
                        value={selectedHeaterQuantity}
                        onChange={(e) =>
                          setSelectedHeaterQuantity(Number(e.target.value))
                        }
                        type="text"
                        className="text-[#69727a] leading-6 font-montserrat font-medium text-base focus:outline-none border-0 text-center w-full"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between self-stretch w-full">
              <a
                href="/upload_files/Heater_technical_sheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2"
              >
                <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
                <span className="font-medium text-[#69727A] text-[14px]">
                  Download specs
                </span>
              </a>

              <div className="flex flex-row items-center gap-2.5 relative">
                <button
                  onClick={closePopupHeater}
                  className=" border text-gray-500 hover:text-gray-700 border-gray-500 rounded-[10px] px-4 py-2"
                >
                  Close
                </button>
                <AddAccessories
                  disabled={
                    selectedHeaterQuantity === 0 || selectedHeater === null
                  }
                  buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-semibold"
                  property1="primary-button-l"
                  text="Add accesory"
                  addAccessory={addAccessoryHeaterHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
