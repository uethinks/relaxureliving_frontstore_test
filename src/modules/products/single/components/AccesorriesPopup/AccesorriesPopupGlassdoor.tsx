import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { useCallback, useEffect, useState } from "react"
import { AddAccessories } from "./AddAccessories"
import GlassdoorSideSelector from "./GlassdoorSideSelector"
import { PergolaSize, selectedProducts } from "types/global"
import { ImageSlider } from "@modules/common/components/ImageSlider"

interface SelectedProduct {
  productVarant: StoreProductVariant
  quantity: number
}

export const AccesorriesPopupGlassdoor = ({
  accessoryGlassdoor,
  closePopup,
  addAccessoryGlassdoor,
  selectedGlassdoorVariant,
  pergolaSize,
}: {
  accessoryGlassdoor: StoreProduct | null
  closePopup: (type: string) => void
  addAccessoryGlassdoor: (selectedProducts: selectedProducts) => void
  selectedGlassdoorVariant: selectedProducts
  pergolaSize: PergolaSize
}): JSX.Element => {
  const closePopupGlassdoor = () => {
    closePopup("Glass door")
  }
  const addAccessoryGlassdoorHandler = () => {
    addAccessoryGlassdoor(selectedGlassdoor)
    closePopupGlassdoor()
  }
  const [selectedGlassdoor, setSelectedGlassdoor] = useState<selectedProducts>(
    selectedGlassdoorVariant
  )

  const glassdoorColors: StoreProductOption | undefined =
    accessoryGlassdoor?.options?.find((option) => option.title === "Color")

  const defaultColor: StoreProductOptionValue = glassdoorColors
    ?.values?.[0] || {
    id: "",
    value: "",
  }

  const [selectedSize, setSelectedSize] = useState<string[]>()
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)
  const [selectedSides, setSelectedSides] = useState<string[]>([])

  const getVariant = useCallback(() => {
    return accessoryGlassdoor?.variants?.filter((variant) => {
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Size" &&
          selectedSize?.find((size) =>
            size.includes(variant?.length?.toString() ?? "")
          )
      )
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Color" &&
          option.value === selectedColor.value
      )
      return matchingSize && matchingColor
    })
  }, [accessoryGlassdoor, selectedSize, selectedColor])

  useEffect(() => {
    // if (!selectedSize?.length || !selectedColor.id) return
    const variants = getVariant()
    console.log("variants", variants)
    setSelectedGlassdoor(
      variants?.map((variant) => ({
        productVarant: variant,
        quantity:
          selectedSize?.filter((size) =>
            size.includes(variant?.length?.toString() ?? "")
          ).length ?? 0,
      })) || []
    )
  }, [selectedSize, selectedColor])

  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }

  /**
   * 根据sides选择对应的size
   * @param sides
   */
  const handleSideSelect = (sides: string[]) => {
    console.log("handleSideSelect", sides)
    setSelectedSides(sides)
    setSelectedSize(
      sides.map((side) => {
        if (side === "left" || side === "right") {
          return shortSideLength
        } else {
          return longSideLength
        }
      })
    )
  }
  const [shortSideLength, setShortSideLength] = useState<string>("")
  const [longSideLength, setLongSideLength] = useState<string>("")
  useEffect(() => {
    setShortSideLength(pergolaSize.width.toString() + '"')
    setLongSideLength(pergolaSize.length.toString() + '"')
  }, [pergolaSize])

  const priceDefault = selectedGlassdoor.reduce((acc, glassdoor) => {
    return (
      acc +
      (glassdoor.productVarant?.calculated_price?.calculated_amount ?? 0) *
        glassdoor.quantity
    )
  }, 0)
  const [totalPrice, setTotalPrice] = useState<number>(priceDefault)
  useEffect(() => {
    setTotalPrice(
      selectedGlassdoor.reduce((acc, glassdoor) => {
        return (
          acc +
          (glassdoor.productVarant?.calculated_price?.calculated_amount ?? 0) *
            glassdoor.quantity
        )
      }, 0)
    )
  }, [selectedGlassdoor])

  useEffect(() => {
    /**
     * 根据selectedGlassdoor计算对应的sides
     */

    const isSquare = pergolaSize.width === pergolaSize.length
    let slides = []
    if (!isSquare) {
      const numOfShortSide =
        selectedGlassdoor.find((glassdoor) => {
          return glassdoor.productVarant?.length === pergolaSize.width
        })?.quantity ?? 0
      const numOfLongSide =
        selectedGlassdoor.find((glassdoor) => {
          return glassdoor.productVarant?.length === pergolaSize.length
        })?.quantity ?? 0

      if (numOfShortSide === 1) {
        slides.push("left")
      } else if (numOfShortSide === 2) {
        slides.push("left", "right")
      }
      if (numOfLongSide === 1) {
        slides.push("top")
      } else if (numOfLongSide === 2) {
        slides.push("top", "bottom")
      }
    } else {
      const numOfProducts = selectedGlassdoor[0]?.quantity ?? 0
      slides = new Array(numOfProducts).fill("left")
    }
    setSelectedSides(slides)
  }, [])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-50 z-50">
      <div className="relative bg-white rounded-t-[20px] md:rounded-[20px] p-10 max-w-[1269px] max-h-[90vh]  overflow-auto">
        <div className="flex flex-col lg:flex-row items-start gap-[30px]">
          <div className="relative w-full lg:w-1/2 aspect-square">
            <ImageSlider images={accessoryGlassdoor?.images || []} />
          </div>

          <div className="flex flex-col w-full lg:w-1/2 items-start gap-10">
            <div className="flex flex-col items-start gap-5 self-stretch w-full">
              <div className="flex flex-col items-start gap-2.5 py-2.5 self-stretch w-full">
                <div className="flex items-center justify-between w-full">
                  <h2 className="self-stretch font-merriweather text-[#343a40] text-[28px] font-bold leading-[39.2px]">
                    {accessoryGlassdoor?.title}
                  </h2>
                  <div className="self-stretch text-[#343a40] text-[22px] leading-[30.8px] font-montserrat font-medium">
                    {totalPrice ? "$" + totalPrice : ""}
                  </div>
                </div>
                <div className="relative h-12">
                  <div className="flex h-12 gap-5">
                    <div className="flex flex-row items-center gap-2.5 relative text-lg font-medium">
                      <p>Color:</p>
                    </div>
                    <div className="inline-flex items-center gap-[18px] relative">
                      {glassdoorColors?.values?.map((color) => (
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
                  <div className="flex flex-row items-center gap-2.5 relative text-lg font-medium">
                    <p>Pergola Size:</p>
                  </div>
                  <div className="flex px-2 h-12 bg-[#ffffff] rounded-[20px]">
                    <div className="inline-flex items-center gap-[18px] relative">
                      <button
                        className={`inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] cursor-pointer bg-[#dce7f8] rounded-[20px]`}
                      >
                        <div
                          className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap text-[#69727a]`}
                        >
                          {shortSideLength}x{longSideLength}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <GlassdoorSideSelector
                  onSideSelect={handleSideSelect}
                  selectedSides={selectedSides}
                  shortSideLength={shortSideLength}
                  longSideLength={longSideLength}
                />

                <p className="self-stretch text-[#68717a] leading-[22.4px] font-montserrat text-base font-medium mt-2">
                  {accessoryGlassdoor?.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between self-stretch w-full">
              <a
                href="/upload_files/Frameless_sliding_glass_door_technical_sheet.pdf"
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
                  onClick={closePopupGlassdoor}
                  className=" border text-gray-500 hover:text-gray-700 border-gray-500 rounded-[10px] px-4 py-2"
                >
                  Close
                </button>
                <AddAccessories
                  disabled={selectedGlassdoor.length === 0}
                  buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-semibold"
                  className="!w-[235px]"
                  property1="primary-button-l"
                  text="Add accesory"
                  addAccessory={addAccessoryGlassdoorHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
