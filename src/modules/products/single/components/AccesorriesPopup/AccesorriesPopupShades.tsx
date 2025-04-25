import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
} from "@medusajs/types"
import { useCallback, useEffect, useState } from "react"
import { AddAccessories } from "./AddAccessories"
import ShadesSideSelector from "./ShadesSideSelector"
import { PergolaSize, selectedProducts } from "types/global"
import { ImageSlider } from "@modules/common/components/ImageSlider"

export const AccesorriesPopupShades = ({
  accessoryShades,
  closePopup,
  addAccessoryShades,
  selectedShadesVariant,
  pergolaSize,
}: {
  accessoryShades: StoreProduct | null
  closePopup: (type: string) => void
  addAccessoryShades: (selectedProducts: selectedProducts) => void
  selectedShadesVariant: selectedProducts
  pergolaSize: PergolaSize
}): JSX.Element => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  const closePopupShades = () => {
    closePopup("Shades")
  }
  const productImage = accessoryShades?.images?.[0].url
  const addAccessoryShadesHandler = () => {
    addAccessoryShades(selectedShades)
    closePopupShades()
  }
  const [selectedShades, setSelectedShades] = useState<selectedProducts>(
    selectedShadesVariant
  )

  const shadesColors: StoreProductOption | undefined =
    accessoryShades?.options?.find((option) => option.title === "Color")
  const sortedColors = shadesColors?.values?.sort((a, b) =>
    a.value.localeCompare(b.value)
  )

  const defaultColor: StoreProductOptionValue = shadesColors?.values?.[0] || {
    id: "",
    value: "",
  }

  const [selectedSize, setSelectedSize] = useState<string[]>()
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)
  const [selectedSides, setSelectedSides] = useState<string[]>([])

  const getVariant = useCallback(() => {
    return accessoryShades?.variants?.filter((variant) => {
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
  }, [accessoryShades, selectedSize, selectedColor])

  useEffect(() => {
    const variants = getVariant()
    setSelectedShades(
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

  const priceDefault = selectedShades.reduce((acc, shade) => {
    return (
      acc +
      (shade.productVarant?.calculated_price?.calculated_amount ?? 0) *
        shade.quantity
    )
  }, 0)
  const [totalPrice, setTotalPrice] = useState<number>(priceDefault)
  const [totalOriginalPrice, setTotalOriginalPrice] =
    useState<number>(priceDefault)
  useEffect(() => {
    setTotalPrice(
      selectedShades.reduce((acc, shade) => {
        return (
          acc +
          (shade.productVarant?.calculated_price?.calculated_amount ?? 0) *
            shade.quantity
        )
      }, 0)
    )
    setTotalOriginalPrice(
      selectedShades.reduce((acc, shade) => {
        return (
          acc +
          (shade.productVarant?.calculated_price?.original_amount ?? 0) *
            shade.quantity
        )
      }, 0)
    )
  }, [selectedShades])

  useEffect(() => {
    /**
     * 根据selectedShades计算对应的sides
     */
    const isSquare = pergolaSize.width === pergolaSize.length
    let slides = []
    if (!isSquare) {
      const numOfShortSide =
        selectedShades.find((shade) => {
          return shade.productVarant?.length === pergolaSize.width
        })?.quantity ?? 0
      const numOfLongSide =
        selectedShades.find((shade) => {
          return shade.productVarant?.length === pergolaSize.length
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
      const numOfProducts = selectedShades[0]?.quantity ?? 0
      slides = new Array(numOfProducts).fill("left")
    }

    setSelectedSides(slides)
  }, [])

  return (
    <div className="fixed inset-0 flex items-end md:items-center justify-center bg-black-50 z-50">
      <div className="relative bg-white rounded-t-[20px] md:rounded-[20px] w-full md:w-auto md:max-w-[1269px] h-[95vh] md:h-auto md:max-h-[90vh] overflow-auto">
        <div className="sticky top-0 left-0 right-0 bg-white z-10 h-10 flex items-center px-4 md:hidden">
          <button
            onClick={closePopupShades}
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
            <h2 className="lg:hidden self-stretch font-merriweather text-[#343a40] text-[22px] font-medium leading-[39.2px]">
              {accessoryShades?.title}
            </h2>
            <div className="relative w-full lg:w-auto h-auto lg:h-[546px] aspect-[360/300] lg:aspect-[466/546]">
              <ImageSlider images={accessoryShades?.images || []} />
            </div>

            <div className="flex flex-col justify-between w-full lg:w-1/2 items-start gap-10">
              <div className="flex flex-col items-start gap-5 self-stretch w-full">
                <div className="flex flex-col items-start lg:gap-2.5 py-2.5 self-stretch w-full">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="hidden lg:block self-stretch font-merriweather text-[#343a40] text-[28px] font-bold leading-[39.2px]">
                      {accessoryShades?.title}
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
                      <div className="flex flex-row text-[#343A40] items-center gap-2.5 relative text-[16px] lg:text-[18px] [font-family:'Montserrat',sans-serif] font-medium">
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
                                !color.value?.toLowerCase().includes("white")
                                  ? "bg-[#7F7F7F]"
                                  : "bg-[#ffffff]"
                              }  ${
                                selectedColor === color
                                  ? "border-[#072F6C]"
                                  : ""
                              }`}
                              onClick={() => handleColorClick(color)}
                            ></button>
                            <div
                              className={`hidden lg:block relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap text-[#072f6c]`}
                            >
                              {color.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ShadesSideSelector
                    onSideSelect={handleSideSelect}
                    selectedSides={selectedSides}
                    shortSideLength={shortSideLength}
                    longSideLength={longSideLength}
                  />

                  <p className="self-stretch text-[#68717a] leading-[22.4px] font-montserrat text-[16px] lg:text-base font-medium mt-2">
                    {accessoryShades?.description}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex flex-col md:flex-row items-center justify-between self-stretch w-full">
                <a
                  href="/upload_files/Sunshade_technical_sheet.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2"
                >
                  <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
                  <span className="font-medium text-[#69727A] text-[14px] [font-family:'Montserrat',sans-serif]">
                    Download specs
                  </span>
                </a>
                <div className="flex flex-row items-center gap-2.5 relative">
                  <button
                    onClick={closePopupShades}
                    className="border text-gray-500 hover:text-gray-700 border-gray-500 rounded-[10px] px-4 py-2"
                  >
                    Close
                  </button>
                  <AddAccessories
                    disabled={selectedShades.length === 0}
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

        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white px-4 pb-4 border-t">
          <div className="flex flex-col gap-0">
            <a
              href="/upload_files/Sunshade_technical_sheet.pdf"
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
              disabled={selectedShades.length === 0}
              buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-semibold w-full text-center"
              className="!w-full"
              property1="primary-button-l"
              text="Add accesory"
              addAccessory={addAccessoryShadesHandler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
