import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { useCallback, useEffect, useState } from "react"
import { AddAccessories } from "./AddAccessories"
export const AccesorriesPopupShades = ({
  accessoryShades,
  closePopup,
  addAccessoryShades,
  selectedShadesVariant,
}: {
  accessoryShades: StoreProduct | null
  closePopup: (type: string) => void
  addAccessoryShades: (
    selectedAccessoryShades: StoreProductVariant | null,
    selectedAccessoryShadesQuantity: number
  ) => void
  selectedShadesVariant: {
    productVarant: StoreProductVariant | null
    quantity: number
  }
}): JSX.Element => {
  const closePopupShades = () => {
    closePopup("Shades")
  }
  const productImage = accessoryShades?.images?.[0].url
  const addAccessoryShadesHandler = () => {
    addAccessoryShades(currentShadesVarant, currentShadesVarantQuantity)
    closePopupShades()
  }
  const [currentShadesVarant, setCurrentShadesVarant] =
    useState<StoreProductVariant | null>(
      selectedShadesVariant.productVarant || null
    )
  const [currentShadesVarantQuantity, setCurrentShadesVarantQuantity] =
    useState(selectedShadesVariant.quantity)
  const shadeSizes: StoreProductOption | undefined =
    accessoryShades?.options?.find((option) => option.title === "Size")
  const shadesColors: StoreProductOption | undefined =
    accessoryShades?.options?.find((option) => option.title === "Color")

  const defaultSize: StoreProductOptionValue = shadeSizes?.values?.[0] || {
    id: "",
    value: "",
  }
  const defaultColor: StoreProductOptionValue = shadesColors?.values?.[0] || {
    id: "",
    value: "",
  }

  const [selectedSize, setSelectedSize] =
    useState<StoreProductOptionValue>(defaultSize)
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)

  const getVariant = useCallback(() => {
    return accessoryShades?.variants?.find((variant) => {
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Size" && option.value === selectedSize.value
      )
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Color" &&
          option.value === selectedColor.value
      )
      return matchingSize && matchingColor
    })
  }, [accessoryShades, selectedSize, selectedColor])

  const handleSizeClick = (size: StoreProductOptionValue) => {
    setSelectedSize(size)
  }
  useEffect(() => {
    const variant = getVariant()
    if (variant) {
      setCurrentShadesVarant(variant)
    }
  }, [selectedSize, selectedColor])

  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-50 z-50">
      <div className="relative bg-white rounded-[20px] p-10 max-w-[1269px] max-h-[90vh] overflow-auto">
        <div className="flex items-start gap-[30px]">
          <div
            className={`relative w-[466px] h-[467px] rounded-[20px] bg-cover bg-[50%_50%]`}
            style={{ backgroundImage: `url(${productImage})` }}
          />

          <div className="flex flex-col w-[733px] items-start gap-10">
            <div className="flex flex-col items-start gap-5 self-stretch w-full">
              <div className="flex flex-col items-start gap-2.5 py-2.5 self-stretch w-full">
                <div className="flex items-center justify-between w-full">
                  <h2 className="self-stretch font-merriweather text-[#343a40] text-[28px] font-bold leading-[39.2px]">
                    {accessoryShades?.title}
                  </h2>
                  <div className="self-stretch text-[#343a40] text-[22px] leading-[30.8px] font-montserrat font-medium">
                    {currentShadesVarant?.calculated_price?.calculated_amount &&
                    currentShadesVarantQuantity
                      ? "$" +
                        currentShadesVarant?.calculated_price
                          ?.calculated_amount *
                          currentShadesVarantQuantity
                      : ""}
                  </div>
                </div>
                <div className="relative h-12">
                  <div className="flex px-2 h-12 gap-5">
                    <div className="flex flex-row items-center gap-2.5 relative">
                      <p>Color:</p>
                    </div>
                    <div className="inline-flex items-center gap-[18px] relative">
                      {shadesColors?.values?.map((color) => (
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
                    <p>Size:</p>
                  </div>
                  <div className="flex px-2 h-12 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
                    <div className="inline-flex items-center gap-[18px] relative">
                      {shadeSizes?.values?.map((size) => (
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
                  {accessoryShades?.description}
                </p>

                <div className="flex items-center gap-2 self-stretch w-full mt-4">
                  <div className="flex items-center justify-center gap-2.5 py-2.5">
                    <p className="text-[#69727a] text-lg leading-[27px] whitespace-nowrap font-montserrat font-medium">
                      How many shades do you need:
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-14 h-10 flex items-center justify-center rounded-[10px] border border-solid border-[#a8a8a8]">
                      <input
                        value={currentShadesVarantQuantity}
                        onChange={(e) =>
                          setCurrentShadesVarantQuantity(Number(e.target.value))
                        }
                        type="text"
                        className="text-[#69727a] leading-6 font-montserrat font-medium text-base focus:outline-none border-0 text-center w-full"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between self-stretch w-full">
              <button className="flex items-center gap-1.5 py-3 rounded-[10px]">
                <img
                  className="w-6 h-6"
                  alt="Download icon"
                  src="https://c.animaapp.com/QOr7NHyD/img/frame-1000004698.svg"
                />
                <span className="text-[#69727a] font-montserrat font-medium text-sm leading-[21px]">
                  Download specs
                </span>
              </button>
              <div className="flex flex-row items-center gap-2.5 relative">
                <button
                  onClick={closePopupShades}
                  className=" border text-gray-500 hover:text-gray-700 border-gray-500 rounded-[10px] px-4 py-2"
                >
                  Close
                </button>
                <AddAccessories
                  buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-semibold"
                  className="!w-[235px]"
                  property1="primary-button-l"
                  text="Add accesory"
                  addAccessory={addAccessoryShadesHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
