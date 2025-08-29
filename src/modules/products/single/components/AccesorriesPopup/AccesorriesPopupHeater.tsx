"use client"
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
  showPopup,
  heaterCMSData,
}: {
  accessoryHeater: StoreProduct | null
  closePopup: (type: string) => void
  addAccessoryHeater: (selectedProducts: selectedProducts) => void
  selectedHeaterVariant: selectedProducts
  showPopup: boolean
  heaterCMSData: any
}): React.JSX.Element => {
  const closePopupHeater = () => {
    closePopup("Heating")
  }
  const addAccessoryHeaterHandler = () => {
    const selectedHeaterProduct = {
      productVarant: selectedHeater,
      quantity: selectedHeaterQuantity,
    }
    console.log("addAccessoryHeaterHandler selectedHeater", selectedHeaterProduct)
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
  const sortedColors = heaterColors?.values?.sort((a, b) =>
    a.value.localeCompare(b.value)
  )

  const defaultSize: StoreProductOptionValue = {
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
  useEffect(() => {
    setSelectedSize(
      heaterSizes?.values?.[0] || {
        id: "",
        value: "",
      }
    )
    setSelectedColor(
      heaterColors?.values?.[0] || {
        id: "",
        value: "",
      }
    )
  }, [heaterSizes, sortedColors])
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

  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }

  useEffect(() => {
    const variant = getVariant()
    if (variant) {
      setSelectedHeater(variant)
    }
  }, [selectedSize, selectedColor, getVariant])

  const totalPrice = selectedHeater?.calculated_price?.calculated_amount
    ? selectedHeater?.calculated_price?.calculated_amount *
      selectedHeaterQuantity
    : 0
  const totalOriginalPrice = selectedHeater?.calculated_price?.original_amount
    ? selectedHeater?.calculated_price?.original_amount * selectedHeaterQuantity
    : 0

  return (
    <div
      className={`fixed inset-0 flex items-end md:items-center justify-center bg-black-50 z-50 ${
        showPopup ? "flex" : "hidden"
      }`}
    >
      <div className="relative bg-white rounded-t-[20px] md:rounded-[20px] w-full md:w-auto md:max-w-[1269px] h-[95vh] md:h-auto md:max-h-[90vh] overflow-auto">
        <div className="sticky top-0 left-0 right-0 bg-white z-10 h-10 flex items-center px-2 md:hidden">
          <button
            onClick={closePopupHeater}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 pb-[160px] md:pb-4 lg:p-10">
          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-[30px]">
            <h2 className="lg:hidden self-stretch [font-family:'Merriweather',serif] text-[#343a40] text-[22px] font-bold leading-[39.2px]">
              {accessoryHeater?.title}
            </h2>
            <div className="relative w-full lg:w-auto h-auto lg:h-[546px] aspect-[360/300] lg:aspect-[466/546]">
              <ImageSlider images={heaterCMSData?.product_images || []} />
            </div>

            <div className="flex flex-col justify-between w-full h-full lg:w-1/2 items-start gap-10">
              <div className="flex flex-col items-start gap-5 self-stretch w-full">
                <div className="flex flex-col items-start lg:gap-2.5 py-2.5 self-stretch w-full">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="hidden lg:block self-stretch [font-family:'Merriweather',serif] text-[#343a40] text-[28px] font-bold leading-[39.2px]">
                      {accessoryHeater?.title}
                    </h2>
                    <div className="flex items-end justify-start gap-4">
                      <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[28px] leading-[32px] whitespace-nowrap relative tracking-[0]">
                        {totalPrice ? "$" + totalPrice : ""}
                      </div>
                      {totalOriginalPrice > totalPrice && (
                        <div className="flex items-center gap-2">
                          <div className="w-fit [font-family:'Montserrat',Helvetica] font-medium text-[12px] leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through">
                            ${totalOriginalPrice}
                          </div>
                          <div className="[font-family:'Montserrat',Helvetica] px-2 py-0.5 bg-[#e9ecef] rounded-full flex items-center justify-center">
                            <span className="text-[12px] font-normal text-[red]">
                              Save{" "}
                              {Math.round(
                                ((totalOriginalPrice - totalPrice) /
                                  totalOriginalPrice) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative h-12">
                    <div className="flex h-12 gap-5">
                      <div className="flex text-[#343A40] flex-row items-center gap-2.5 relative text-[16px] lg:text-[18px] [font-family:'Montserrat',sans-serif] font-medium">
                        <p>Color:</p>
                      </div>
                      <div className="inline-flex items-center gap-[18px] relative">
                        {sortedColors?.map((color) => (
                          <div
                            key={color.id}
                            className="flex flex-row items-center gap-2.5 relative"
                          >
                            <button
                              className={`w-6 h-6 rounded-[20px] cursor-pointer border-2 border-solid ${
                                selectedColor.id === color.id
                                  ? "bg-[#F6AF1F33]"
                                  : "bg-[#ffffff]"
                              }  ${
                                selectedColor.id === color.id
                                  ? "border-[#F6AF1F]"
                                  : ""
                              }`}
                              onClick={() => handleColorClick(color)}
                            ></button>
                            <div
                              className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] 
                                font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap text-[#F6AF1F]`}
                            >
                              {color.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-stretch w-full lg:mt-4">
                    <div className="flex items-center justify-center gap-2.5 lg:py-2.5">
                      <h3 className="text-[#343A40] text-[16px] lg:text-[18px] leading-[27px] whitespace-nowrap font-montserrat font-medium">
                        How many heaters do you need:
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setSelectedHeaterQuantity(
                            Math.max(0, selectedHeaterQuantity - 1)
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-xl font-medium">-</span>
                      </button>
                      <div className="w-4 lg:w-14 h-10 flex items-center justify-center rounded-[10px] lg:border border-solid border-[#a8a8a8]">
                        <input
                          value={selectedHeaterQuantity}
                          onChange={(e) =>
                            setSelectedHeaterQuantity(Number(e.target.value))
                          }
                          type="text"
                          className="text-[#69727a] leading-6 font-montserrat font-medium text-base focus:outline-none border-0 text-center w-full"
                        ></input>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedHeaterQuantity(selectedHeaterQuantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-xl font-medium">+</span>
                      </button>
                    </div>
                  </div>

                  <p className="self-stretch text-[#68717a] leading-[22.4px] [font-family:'Montserrat',sans-serif] text-[16px] lg:text-base font-medium mt-2">
                    {accessoryHeater?.description}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex flex-col md:flex-row items-center justify-between self-stretch w-full">
                <a
                  href="/upload_files/Heater_technical_sheet_new.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2"
                >
                  <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
                  <h3 className="font-medium text-[#69727A] text-[14px] [font-family:'Montserrat',sans-serif]">
                    Download specs
                  </h3>
                </a>

                <div className="flex flex-row items-center gap-2.5 relative">
                  <button
                    onClick={closePopupHeater}
                    className="border text-white bg-black rounded-[10px] px-4 py-2"
                  >
                    Close
                  </button>
                  <AddAccessories
                    disabled={
                      selectedHeaterQuantity === 0 || selectedHeater === null
                    }
                    buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-medium"
                    property1="primary-button-l"
                    text="Add accesory"
                    addAccessory={addAccessoryHeaterHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white px-4 pb-4 border-t">
          <div className="flex flex-col gap-0">
            <a
              href="/upload_files/Heater_technical_sheet_new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2"
            >
              <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
              <span className="font-medium text-[#69727A] text-[14px] [font-family:'Montserrat',sans-serif]">
                Download specs
              </span>
            </a>
            <AddAccessories
              disabled={selectedHeaterQuantity === 0 || selectedHeater === null}
              buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-semibold w-full text-center"
              className="!w-full"
              property1="primary-button-l"
              text="Add accesory"
              addAccessory={addAccessoryHeaterHandler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
