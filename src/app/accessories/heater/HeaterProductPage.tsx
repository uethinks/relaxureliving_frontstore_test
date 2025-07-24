"use client"

import {
  StoreProduct,
  StoreProductOption,
  StoreProductOptionValue,
  StoreProductVariant,
} from "@medusajs/types"
import { useCallback, useEffect, useState } from "react"
import { AddAccessories } from "@modules/products/single/components/AccesorriesPopup/AddAccessories"
import { ImageSlider } from "@modules/common/components/ImageSlider"
import { useCart } from "@lib/context/cartContext"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

interface HeaterProductPageProps {
  heaterProduct: StoreProduct
  heaterCMSData: any
}

export const HeaterProductPage = ({
  heaterProduct,
  heaterCMSData,
}: HeaterProductPageProps): JSX.Element => {
  const { addVariant } = useCart()
  const [selectedHeater, setSelectedHeater] =
    useState<StoreProductVariant | null>(heaterProduct?.variants?.[0] || null)
  const [selectedHeaterQuantity, setSelectedHeaterQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const heaterSizes: StoreProductOption | undefined =
    heaterProduct?.options?.find((option) => option.title === "Watt")
  const heaterColors: StoreProductOption | undefined =
    heaterProduct?.options?.find((option) => option.title === "Color")
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
    return heaterProduct?.variants?.find((variant) => {
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
  }, [heaterProduct, selectedSize, selectedColor])

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

  const addAccessoryHeaterHandler = async () => {
    if (selectedHeater && selectedHeaterQuantity > 0) {
      try {
        setIsAddingToCart(true)
        await addVariant({
          variantId: selectedHeater.id,
          quantity: selectedHeaterQuantity,
          countryCode: defaultCountryCode, // 可以根据需要调整
        })
        window.location.href = "/cart"
        console.log("Heater added to cart successfully!")
      } catch (error) {
        console.error("Failed to add heater to cart:", error)
        // 这里可以添加错误提示
      } finally {
        setIsAddingToCart(false)
      }
    }
  }

  return (
    <div className="w-full max-w-[1512px] mx-auto relative">
      <div className="flex flex-col gap-4 text-[36px] font-medium text-black font-merriweather mb-5">
        Accessories
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-[30px]">
        {/* 左侧产品图片 */}
        <div className="relative w-full lg:w-auto h-auto lg:h-[546px] aspect-[360/300] lg:aspect-[466/546]">
          <ImageSlider images={heaterCMSData?.product_images || []} />
        </div>

        {/* 右侧产品详情 */}
        <div className="flex flex-col justify-between w-full h-full lg:w-1/2 items-start gap-10">
          <div className="flex flex-col items-start gap-5 self-stretch w-full">
            <div className="flex flex-col items-start lg:gap-2.5 py-2.5 self-stretch w-full">
              {/* 产品标题和价格 */}
              <div className="flex lg:items-center justify-between w-full gap-4">
                <h2 className="self-stretch [font-family:'Merriweather',serif] text-[#343a40] text-[24px] lg:text-[28px] font-bold leading-[1.4]">
                  {heaterProduct?.title}
                </h2>
                <div className="flex items-end justify-start gap-4">
                  <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[24px] lg:text-[28px] leading-[1.2] whitespace-nowrap relative tracking-[0]">
                    {totalPrice ? "$" + totalPrice : ""}
                  </div>
                </div>
              </div>

              {/* 颜色选择器 */}
              {sortedColors && sortedColors.length > 0 && (
                <div className="relative min-h-[48px] w-full">
                  <div className="flex flex-col sm:flex-row sm:h-12 gap-3 sm:gap-5">
                    <div className="flex text-[#343A40] flex-row items-center gap-2.5 relative text-[16px] lg:text-[18px] [font-family:'Montserrat',sans-serif] font-medium">
                      <p>Color:</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-[18px] relative">
                      {sortedColors?.map((color) => (
                        <div
                          key={color.id}
                          className="flex flex-row items-center gap-2.5 relative"
                        >
                          <button
                            className={`w-6 h-6 rounded-[20px] cursor-pointer border-2 border-solid transition-all duration-200 ${
                              selectedColor.id === color.id
                                ? "bg-[#F6AF1F33] border-[#F6AF1F]"
                                : "bg-[#ffffff] border-gray-300 hover:border-[#F6AF1F]"
                            }`}
                            onClick={() => handleColorClick(color)}
                          ></button>
                          <div
                            className={`relative w-fit mt-[-1px] font-montserrat font-medium text-16 lg:text-18 tracking-[0] leading-[27px] whitespace-nowrap text-[#F6AF1F]`}
                          >
                            {color.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 数量选择器 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 self-stretch w-full lg:mt-4">
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
                    disabled={selectedHeaterQuantity <= 0}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-xl font-medium">-</span>
                  </button>
                  <div className="w-16 lg:w-20 h-10 flex items-center justify-center rounded-[10px] border border-solid border-[#a8a8a8]">
                    <input
                      value={selectedHeaterQuantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0
                        setSelectedHeaterQuantity(Math.max(0, value))
                      }}
                      type="number"
                      min="0"
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

              {/* 产品描述 */}
              <p className="self-stretch text-[#68717a] leading-[22.4px] [font-family:'Montserrat',sans-serif] text-[16px] lg:text-base font-medium mt-2">
                {heaterProduct?.description}
              </p>
            </div>
          </div>

          {/* 底部操作按钮 */}
          <div className="flex flex-col md:flex-row items-center justify-between self-stretch w-full gap-4">
            <a
              href="/upload_files/Heater_technical_sheet_new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
              <h3 className="font-medium text-[#69727A] text-[14px] [font-family:'Montserrat',sans-serif]">
                Download specs
              </h3>
            </a>

            <div className="flex flex-row items-center gap-2.5 relative">
              <AddAccessories
                disabled={
                  selectedHeaterQuantity === 0 ||
                  selectedHeater === null ||
                  isAddingToCart
                }
                buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-medium"
                property1="primary-button-l"
                text="Add Heater"
                addAccessory={addAccessoryHeaterHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
