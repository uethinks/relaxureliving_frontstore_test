"use client"
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

/**
 * 遮阳篷配件弹窗组件
 * 功能：允许用户选择遮阳篷配件的颜色、尺寸、安装位置，并添加到购物车
 */
export const AccesorriesPopupShades = ({
  accessoryShades,        // 遮阳篷配件产品数据
  closePopup,             // 关闭弹窗的回调函数
  addAccessoryShades,     // 添加遮阳篷配件到购物车的回调函数
  selectedShadesVariant,  // 已选中的遮阳篷配件变体
  pergolaSize,            // 凉亭尺寸信息
  showPopup,              // 控制弹窗显示/隐藏
  shadesCMSData,          // 遮阳篷配件的CMS数据（图片等）
}: {
  accessoryShades: StoreProduct | null
  closePopup: (type: string) => void
  addAccessoryShades: (selectedProducts: selectedProducts) => void
  selectedShadesVariant: selectedProducts
  pergolaSize: PergolaSize
  showPopup: boolean
  shadesCMSData: any
}): React.JSX.Element => {
  
  // 关闭遮阳篷配件弹窗
  const closePopupShades = () => {
    closePopup("Shades")
  }
  
  // 添加遮阳篷配件到购物车的处理函数
  const addAccessoryShadesHandler = () => {
    addAccessoryShades(selectedShades)
    closePopupShades()
  }
  
  // 选中的遮阳篷配件状态
  const [selectedShades, setSelectedShades] = useState<selectedProducts>(
    selectedShadesVariant
  )

  // 获取遮阳篷配件的颜色选项
  const shadesColors: StoreProductOption | undefined =
    accessoryShades?.options?.find((option) => option.title === "Color")
  
  // 对颜色选项进行排序
  const sortedColors = shadesColors?.values?.sort((a, b) =>
    a.value.localeCompare(b.value)
  )

  // 默认颜色（第一个颜色）
  const defaultColor: StoreProductOptionValue = shadesColors?.values?.[0] || {
    id: "",
    value: "",
  }

  // 选中的尺寸状态
  const [selectedSize, setSelectedSize] = useState<string[]>()
  // 选中的颜色状态
  const [selectedColor, setSelectedColor] =
    useState<StoreProductOptionValue>(defaultColor)
  // 选中的安装位置状态（left, right, top, bottom）
  const [selectedSides, setSelectedSides] = useState<string[]>([])
  
  // 初始化选中颜色
  useEffect(() => {
    setSelectedColor(
      sortedColors?.[0] || {
        id: "",
        value: "",
      }
    )
  }, [sortedColors])
  
  /**
   * 根据选中的尺寸和颜色筛选产品变体
   * 返回匹配的产品变体数组
   */
  const getVariant = useCallback(() => {
    return accessoryShades?.variants?.filter((variant) => {
      // 匹配尺寸：检查变体的长度是否包含在选中的尺寸中
      const matchingSize = variant?.options?.find(
        (option) =>
          option.option?.title === "Size" &&
          selectedSize?.find((size) =>
            size.includes(variant?.length?.toString() ?? "")
          )
      )
      // 匹配颜色：检查变体的颜色是否与选中的颜色一致
      const matchingColor = variant?.options?.find(
        (option) =>
          option.option?.title === "Color" &&
          option.value === selectedColor.value
      )
      return matchingSize && matchingColor
    })
  }, [accessoryShades, selectedSize, selectedColor])

  /**
   * 当尺寸或颜色改变时，更新选中的遮阳篷配件
   * 计算每个变体的数量（基于选中的尺寸）
   */
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

  // 处理颜色选择
  const handleColorClick = (color: StoreProductOptionValue) => {
    setSelectedColor(color)
  }

  /**
   * 根据选择的安装位置计算对应的尺寸
   * @param sides 选中的安装位置数组
   */
  const handleSideSelect = (sides: string[]) => {
    console.log("handleSideSelect sides", sides)
    setSelectedSides(sides)
    setSelectedSize(
      sides.map((side) => {
        // 左右边使用短边长度
        if (side === "left" || side === "right") {
          return shortSideLength
        } else {
          // 上下边使用长边长度
          return longSideLength
        }
      })
    )
  }
  
  // 短边长度状态（凉亭宽度）
  const [shortSideLength, setShortSideLength] = useState<string>("")
  // 长边长度状态（凉亭长度）
  const [longSideLength, setLongSideLength] = useState<string>("")
  
  // 根据凉亭尺寸设置短边和长边长度
  useEffect(() => {
    setShortSideLength(pergolaSize.width.toString() + '"')
    setLongSideLength(pergolaSize.length.toString() + '"')
  }, [pergolaSize])

  // 计算默认价格（基于选中的遮阳篷配件）
  const priceDefault = selectedShades.reduce((acc, shade) => {
    return (
      acc +
      (shade.productVarant?.calculated_price?.calculated_amount ?? 0) *
        shade.quantity
    )
  }, 0)
  
  // 总价格状态
  const [totalPrice, setTotalPrice] = useState<number>(priceDefault)
  // 原价状态
  const [totalOriginalPrice, setTotalOriginalPrice] =
    useState<number>(priceDefault)
  
  /**
   * 当选中的遮阳篷配件改变时，重新计算总价格和原价
   */
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

  /**
   * 当弹窗显示状态改变时的处理逻辑
   * 1. 设置选中的遮阳篷配件
   * 2. 根据已选中的配件计算对应的安装位置
   */
  useEffect(() => {
    if (showPopup) {
      setSelectedShades(selectedShadesVariant)
    } else {
      setSelectedShades([])
    }
    
    /**
     * 根据已选中的遮阳篷配件计算对应的安装位置
     * 逻辑：
     * - 如果凉亭是正方形，所有边都使用相同的数量
     * - 如果凉亭是长方形，分别计算短边和长边的数量
     */
    const isSquare = pergolaSize.width === pergolaSize.length
    let slides = []
    
    if (!isSquare) {
      // 长方形凉亭：分别计算短边和长边的数量
      const numOfShortSide =
        selectedShadesVariant.find((shade) => {
          return shade.productVarant?.length === pergolaSize.width
        })?.quantity ?? 0
      const numOfLongSide =
        selectedShadesVariant.find((shade) => {
          return shade.productVarant?.length === pergolaSize.length
        })?.quantity ?? 0
      
      // 根据短边数量设置左右边
      if (numOfShortSide === 1) {
        slides.push("left")
      } else if (numOfShortSide === 2) {
        slides.push("left", "right")
      }
      
      // 根据长边数量设置上下边
      if (numOfLongSide === 1) {
        slides.push("top")
      } else if (numOfLongSide === 2) {
        slides.push("top", "bottom")
      }
    } else {
      // 正方形凉亭：所有边使用相同的数量
      const numOfProducts = selectedShadesVariant[0]?.quantity ?? 0
      slides = new Array(numOfProducts).fill("left")
    }

    setSelectedSides(slides)
  }, [showPopup])

  return (
    <div
      className={`fixed inset-0 flex items-end md:items-center justify-center bg-black-50 z-50 ${
        showPopup ? "flex" : "hidden"
      }`}
    >
      {/* 弹窗主容器 */}
      <div className="relative bg-white rounded-t-[20px] md:rounded-[20px] w-full md:w-auto md:max-w-[1269px] h-[95vh] md:h-auto md:max-h-[90vh] overflow-auto">
        {/* 移动端关闭按钮 */}
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

        {/* 弹窗内容区域 */}
        <div className="px-4 pb-[160px] md:pb-4 lg:p-10">
          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-[30px]">
            {/* 移动端标题 */}
            <h2 className="lg:hidden self-stretch font-merriweather text-[#343a40] text-[22px] font-medium leading-[39.2px]">
              {accessoryShades?.title}
            </h2>
            
            {/* 产品图片轮播 */}
            <div className="relative w-full lg:w-auto h-auto lg:h-[546px] aspect-[360/300] lg:aspect-[466/546]">
              <ImageSlider images={shadesCMSData?.product_images || []} />
            </div>

            {/* 产品信息和选择区域 */}
            <div className="flex flex-col justify-between w-full lg:w-1/2 items-start gap-10">
              <div className="flex flex-col items-start gap-5 self-stretch w-full">
                <div className="flex flex-col items-start lg:gap-2.5 py-2.5 self-stretch w-full">
                  {/* 产品标题和价格 */}
                  <div className="flex items-center justify-between w-full">
                    <h2 className="hidden lg:block self-stretch font-merriweather text-[#343a40] text-[28px] font-bold leading-[39.2px]">
                      {accessoryShades?.title}
                    </h2>
                    <div className="flex items-end justify-start gap-4">
                      {/* 当前价格 */}
                      <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[28px] leading-[32px] whitespace-nowrap relative tracking-[0]">
                        {totalPrice ? "$" + totalPrice : ""}
                      </div>
                      {/* 折扣信息显示 */}
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
                  
                  {/* 颜色选择区域 */}
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
                              className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium 
                                text-18 tracking-[0] leading-[27px] whitespace-nowrap text-[#F6AF1F]`}
                            >
                              {color.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* 安装位置选择器 */}
                  <ShadesSideSelector
                    onSideSelect={handleSideSelect}
                    selectedSides={selectedSides}
                    shortSideLength={shortSideLength}
                    longSideLength={longSideLength}
                  />

                  {/* 产品描述 */}
                  <p className="self-stretch text-[#68717a] leading-[22.4px] font-montserrat text-[16px] lg:text-base font-medium mt-2">
                    {accessoryShades?.description}
                  </p>
                </div>
              </div>

              {/* 桌面端底部操作区域 */}
              <div className="hidden md:flex flex-col md:flex-row items-center justify-between self-stretch w-full">
                {/* 下载规格书链接 */}
                <a
                  href="/upload_files/Sunshade_technical_sheet_new.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2"
                >
                  <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
                  <h3 className="font-medium text-[#69727A] text-[14px] [font-family:'Montserrat',sans-serif]">
                    Download specs
                  </h3>
                </a>
                
                {/* 操作按钮区域 */}
                <div className="flex flex-row items-center gap-2.5 relative">
                  <button
                    onClick={closePopupShades}
                    className="border text-white bg-black rounded-[10px] px-4 py-2"
                  >
                    Close
                  </button>
                  <AddAccessories
                    disabled={selectedShades.length === 0}
                    buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-medium"
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

        {/* 移动端底部操作区域 */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white px-4 pb-4 border-t">
          <div className="flex flex-col gap-0">
            {/* 下载规格书链接 */}
            <a
              href="/upload_files/Sunshade_technical_sheet_new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2"
            >
              <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
              <h3 className="font-medium text-[#69727A] text-[14px] [font-family:'Montserrat',sans-serif]">
                Download specs
              </h3>
            </a>
            
            {/* 添加配件按钮 */}
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
