/* NOSONAR */
/**
 * 户外凉亭配件选择器组件
 * 
 * 功能说明：
 * 1. 显示三种配件选择按钮：加热器、遮阳帘、玻璃门
 * 2. 管理配件的选择状态和数量显示
 * 3. 处理配件的添加、移除和弹窗显示逻辑
 * 4. 与父组件通信，传递配件选择结果
 */
import { useState } from "react"
import { StoreProduct, StoreProductOptionValue, StoreProductVariant } from "@medusajs/types"
import { AccesorriesPopupHeater } from "../AccesorriesPopup/AccesorriesPopupHeater"
import { AccesorriesPopupShades } from "../AccesorriesPopup/AccesorriesPopupShades"
import { AccesorriesPopupGlassdoor } from "../AccesorriesPopup/AccesorriesPopupGlassdoor"
import {
  PergolaSize,
  selectedProductVariant,
  selectedProducts,
} from "types/global"

// 配件类型常量，避免字符串重复
const ACCESSORY_NAMES = {
  HEATING: "Heating",      // 加热器
  SHADES: "Shades",        // 遮阳帘
  GLASS_DOOR: "Glass door", // 玻璃门
} as const

/**
 * 组件属性接口
 */
interface Props {
  /** 配件选择变化的回调函数，用于向父组件传递选择结果 */
  onAccessoryChange: ({
    type,
    selectedProducts,
  }: {
    type: string
    selectedProducts: selectedProducts
  }) => void
  /** 可用的配件产品列表 */
  accessories: StoreProduct[]
  selectedColor?: StoreProductOptionValue,

  /** 当前选中的加热器变体信息 */
  selectedHeaterVariant: selectedProducts
  /** 当前选中的遮阳帘变体信息 */
  selectedShadesVariant: selectedProducts
  /** 当前选中的玻璃门变体信息 */
  selectedGlassdoorVariant: selectedProducts
  /** 凉亭尺寸信息 */
  pergolaSize: PergolaSize
  /** 配件相关的CMS数据 */
  accessoriesCMSData: any
  /** 选择器相关的CMS数据 */
  selectorData: any
}

/**
 * 配件图标的数据结构
 */
type accessoriesIcons = {
  name: string      // 配件名称
  title: string     // 配件标题
  image: string     // 配件图标路径
  selected: boolean // 是否被选中
}

export const AccesorriesSelector = ({
  onAccessoryChange,
  accessories,
  selectedColor,
  selectorData,
  selectedHeaterVariant,
  selectedShadesVariant,
  selectedGlassdoorVariant,
  pergolaSize,
  accessoriesCMSData,
}: Props): React.JSX.Element => {
  // 配件图标状态管理 - 控制按钮的显示和选中状态
  const [accessoriesIcons, setAccessoriesIcons] = useState<accessoriesIcons[]>([
    {
      name: ACCESSORY_NAMES.HEATING,
      title: "Heater",
      image: "/img/heating.svg",
      selected: false,
    },
    {
      name: ACCESSORY_NAMES.SHADES,
      title: "Shade Screen",
      image: "/img/shades.svg",
      selected: false,
    },
    {
      name: ACCESSORY_NAMES.GLASS_DOOR,
      title: "Frameless Sliding Glass Door",
      image: "/img/glass-door.svg",
      selected: false,
    },
  ])

  // 当前选中的配件产品状态
  const [selectedHeater, setSelectedHeater] = useState<StoreProduct | null>(null)
  const [selectedShade, setSelectedShade] = useState<StoreProduct | null>(null)
  const [selectedGlassdoor, setSelectedGlassdoor] = useState<StoreProduct | null>(null)

  // 弹窗显示状态控制
  const [isOpenHeater, setIsOpenHeater] = useState(false)
  const [isOpenShade, setIsOpenShade] = useState(false)
  const [isOpenGlassdoor, setIsOpenGlassdoor] = useState(false)

  /**
   * 处理配件按钮点击事件
   * 
   * 功能：
   * 1. 更新配件图标的选中状态
   * 2. 根据配件类型设置对应的产品
   * 3. 打开对应的配件选择弹窗
   * 
   * @param accessoryIcon 被点击的配件图标对象
   */
  const handleAccessoryClick = (accessoryIcon: accessoriesIcons) => {
    console.log("handleAccessoryClick accessoryIcon", accessoryIcon)
    
    // 更新配件图标的选中状态
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (item.name === accessoryIcon.name) {
          item.selected = true
        }
        return item
      })
    )
    
    // 根据配件标题查找对应的产品
    const accessoryProduct = accessories.find(
      (product) => product.title === accessoryIcon.title
    )
    
    // 根据配件类型执行不同的操作
    if (accessoryIcon.name === ACCESSORY_NAMES.HEATING && accessoryProduct) {
      setSelectedHeater(accessoryProduct)
      setIsOpenHeater(true)
    } else if (
      accessoryIcon.name === ACCESSORY_NAMES.SHADES &&
      accessoryProduct
    ) {
      setSelectedShade(accessoryProduct)
      setIsOpenShade(true)
    } else if (
      accessoryIcon.name === ACCESSORY_NAMES.GLASS_DOOR &&
      accessoryProduct
    ) {
      setSelectedGlassdoor(accessoryProduct)
      setIsOpenGlassdoor(true)
    }
  }

  /**
   * 关闭指定类型的配件弹窗
   * 
   * @param type 配件类型
   */
  const closePopup = (type: string) => {
    if (type === ACCESSORY_NAMES.HEATING) {
      setIsOpenHeater(false)
    } else if (type === ACCESSORY_NAMES.SHADES) {
      setIsOpenShade(false)
    } else if (type === ACCESSORY_NAMES.GLASS_DOOR) {
      setIsOpenGlassdoor(false)
    }
  }

  /**
   * 添加加热器配件
   * 
   * 功能：
   * 1. 调用父组件的回调函数，传递选择结果
   * 2. 根据选择结果更新配件图标的选中状态
   * 
   * @param selectedProducts 选中的产品信息
   */
  const addAccessoryHeater = (selectedProducts: selectedProducts) => {
    console.log("addAccessoryHeater selectedProducts", selectedProducts)
    
    // 向父组件传递选择结果
    onAccessoryChange({
      type: ACCESSORY_NAMES.HEATING,
      selectedProducts: selectedProducts,
    })
    
    // 更新配件图标状态：如果没有选择产品或数量为0，则取消选中状态
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (
          item.name === ACCESSORY_NAMES.HEATING &&
          (selectedProducts?.[0]?.productVarant === null ||
            selectedProducts?.[0]?.quantity === 0)
        ) {
          item.selected = false
        }
        return item
      })
    )
  }

  /**
   * 添加遮阳帘配件
   * 
   * @param selectedProducts 选中的产品信息
   */
  const addAccessoryShades = (selectedProducts: selectedProducts) => {
    console.log("addAccessoryShades selectedProducts", selectedProducts)
    onAccessoryChange({
      type: ACCESSORY_NAMES.SHADES,
      selectedProducts: selectedProducts,
    })
    
    // 更新配件图标状态
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (
          item.name === ACCESSORY_NAMES.SHADES &&
          (selectedProducts?.[0]?.productVarant === null ||
            selectedProducts?.[0]?.quantity === 0)
        ) {
          item.selected = false
        }
        return item
      })
    )
  }

  /**
   * 添加玻璃门配件
   * 
   * @param selectedProducts 选中的产品信息
   */
  const addAccessoryGlassdoor = (selectedProducts: selectedProducts) => {
    console.log("addAccessoryGlassdoor selectedProducts", selectedProducts)
    onAccessoryChange({
      type: ACCESSORY_NAMES.GLASS_DOOR,
      selectedProducts: selectedProducts,
    })
    
    // 更新配件图标状态
    setAccessoriesIcons(
      accessoriesIcons.map((item) => {
        if (
          item.name === ACCESSORY_NAMES.GLASS_DOOR &&
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
      {/* 组件标题 */}
      <h3 className="relative self-stretch h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-16 tracking-[0] leading-6 whitespace-nowrap">
        Add accessories to your pergola
      </h3>

      {/* 配件选择按钮区域 */}
      <div className="flex flex-col w-full items-start gap-5 relative flex-[0_0_auto]">
        <div className="flex w-full items-center gap-[22px] relative flex-[0_0_auto]">
          {/* 渲染三种配件选择按钮 */}
          {accessoriesIcons.map((accessory) => (
            <button
              key={accessory.name}
              className={`flex flex-col w-1/3 h-[76px] items-center justify-center gap-2.5 px-0 py-0 relative rounded-[20px] cursor-pointer ${
                // 动态样式：根据配件选择状态决定背景色
                // 如果配件被选中（数量>0），显示橙色背景；否则显示白色背景
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
                  ? "bg-[#F6AF1F33]"  // 选中状态：橙色背景
                  : "bg-[#ffffff]"     // 未选中状态：白色背景
              }`}
              onClick={() => handleAccessoryClick(accessory)}
              aria-pressed={accessory.selected}
            >
              {/* 数量指示器：当配件被选中时显示数量 */}
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
                  <div className="w-full h-full flex items-center justify-center bg-[#F6AF1F33] rounded-full">
                    <span className="text-[#69727a] text-base">
                      {/* 根据配件类型显示对应的数量 */}
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
              
              {/* 配件图标 */}
              <img
                className="relative w-6 h-6 mt-[-10.00px]"
                alt={accessory.name}
                src={accessory.image}
              />

              {/* 配件名称标签 */}
              <div className="flex h-[22px] items-start justify-center relative self-stretch w-full mb-[-10.00px]">
                <h3 className="relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-16 tracking-[0] leading-[21.6px]">
                  {accessory.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 加热器配件选择弹窗 */}
      {
        <AccesorriesPopupHeater
          closePopup={closePopup}
          accessoryHeater={selectedHeater}
          addAccessoryHeater={addAccessoryHeater}
          selectedHeaterVariant={selectedHeaterVariant}
          showPopup={isOpenHeater}
          heaterCMSData={accessoriesCMSData?.heaterCMSData}
        />
      }
      
      {/* 遮阳帘配件选择弹窗 */}
      {
        <AccesorriesPopupShades
          closePopup={closePopup}
          accessoryShades={selectedShade}
          addAccessoryShades={addAccessoryShades}
          selectedShadesVariant={selectedShadesVariant}
          pergolaSize={pergolaSize}
          showPopup={isOpenShade}
          shadesCMSData={accessoriesCMSData?.shadesCMSData}
        />
      }
      
      {/* 玻璃门配件选择弹窗 */}
      {
        <AccesorriesPopupGlassdoor
          closePopup={closePopup}
          accessoryGlassdoor={selectedGlassdoor}
          addAccessoryGlassdoor={addAccessoryGlassdoor}
          selectedGlassdoorVariant={selectedGlassdoorVariant}
          pergolaSize={pergolaSize}
          showPopup={isOpenGlassdoor}
          glassdoorCMSData={accessoriesCMSData?.glassDoorCMSData}
        />
      }
    </div>
  )
}
