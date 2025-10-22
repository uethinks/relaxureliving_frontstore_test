"use client"
import { useCart } from "@lib/context/cartContext"
import { StoreCartLineItem } from "@medusajs/types"
import React, { useMemo, useState, useCallback } from "react"
import { ConfirmDialog } from "../../../../components/ConfirmDialog"
import { formatPrice } from "@lib/utils"

// 自定义钩子：处理数量更新逻辑
const useQuantityUpdate = (cart: any, updateVariantInfo: any) => {
  const [quantities, setQuantities] = useState<{
    [key: string]: number | string
  }>({})
  const [updateTimeout, setUpdateTimeout] = useState<{
    [key: string]: NodeJS.Timeout
  }>({})
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = useCallback(
    (quantity: number | string, itemId: string): void => {
      if (isUpdating) {
        return
      }

      if (quantity === "") {
        setQuantities((prev) => ({ ...prev, [itemId]: "" }))
        if (updateTimeout[itemId]) {
          clearTimeout(updateTimeout[itemId])
        }

        const timeoutId = setTimeout(async () => {
          try {
            setIsUpdating(true)
            const updatedCart = await updateVariantInfo({
              lineId: itemId,
              quantity: 1,
            })
            if (updatedCart) {
              setQuantities((prev) => ({ ...prev, [itemId]: 1 }))
            }
          } catch (error) {
            console.error("Failed to update quantity:", error)
            setQuantities((prev) => ({
              ...prev,
              [itemId]:
                cart?.items?.find((item: any) => item.id === itemId)
                  ?.quantity || 1,
            }))
          } finally {
            setIsUpdating(false)
          }
        }, 800)

        setUpdateTimeout((prev) => ({ ...prev, [itemId]: timeoutId }))
        return
      }

      const numQuantity = Number(quantity)
      if (isNaN(numQuantity)) {
        return
      }

      setQuantities((prev) => ({ ...prev, [itemId]: quantity }))

      if (numQuantity >= 1) {
        if (updateTimeout[itemId]) {
          clearTimeout(updateTimeout[itemId])
        }

        const timeoutId = setTimeout(async () => {
          try {
            setIsUpdating(true)
            await updateVariantInfo({
              lineId: itemId,
              quantity: numQuantity,
            })
          } catch (error) {
            console.error("Failed to update quantity:", error)
            setQuantities((prev) => ({
              ...prev,
              [itemId]:
                cart?.items?.find((item: any) => item.id === itemId)
                  ?.quantity || 1,
            }))
          } finally {
            setIsUpdating(false)
          }
        }, 800)

        setUpdateTimeout((prev) => ({ ...prev, [itemId]: timeoutId }))
      }
    },
    [cart?.items, updateTimeout, isUpdating, updateVariantInfo]
  )

  React.useEffect(() => {
    return () => {
      Object.values(updateTimeout).forEach((timeoutId) =>
        clearTimeout(timeoutId)
      )
    }
  }, [updateTimeout])

  return { quantities, setQuantities, isUpdating, handleQuantityChange }
}

// 自定义钩子：处理删除逻辑
const useDeleteHandler = (removeVariant: any) => {
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)

  const handleDelete = (itemId: string) => {
    setDeleteItemId(itemId)
  }

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      try {
        await removeVariant(deleteItemId)
      } catch (error) {
        console.error("Failed to remove product:", error)
      }
      setDeleteItemId(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteItemId(null)
  }

  return { deleteItemId, handleDelete, handleConfirmDelete, handleCancelDelete }
}

// 价格显示组件
const PriceDisplay = ({ item }: { item: StoreCartLineItem }) => (
  <div className="flex items-end justify-start gap-4">
    <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[28px] leading-[32px] whitespace-nowrap relative tracking-[0]">
      ${item?.total?.toFixed(2)}
    </div>
    {item?.discount_total > 0 && (
      <div className="flex items-center gap-2">
        <div className="w-fit [font-family:'Montserrat',Helvetica] font-medium text-[12px] leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through">
          ${item?.original_total?.toFixed(2)}
        </div>
        <div className="[font-family:'Montserrat',Helvetica] px-2 py-0.5 bg-[#e9ecef] rounded-full flex items-center justify-center">
          <span className="text-[12px] font-normal text-[red]">
            Save{" "}
            {Math.round((item?.discount_total / item?.original_total) * 100)}%
          </span>
        </div>
      </div>
    )}
  </div>
)

// 数量选择器组件
const QuantitySelector = ({
  item,
  quantities,
  isUpdating,
  handleQuantityChange,
}: {
  item: StoreCartLineItem
  quantities: { [key: string]: number | string }
  isUpdating: boolean
  handleQuantityChange: (quantity: number | string, itemId: string) => void
}) => (
  <div className="flex items-center gap-2">
    <button
      onClick={() => {
        const currentValue = Number(quantities[item.id] || 1)
        const newValue = Math.max(1, currentValue - 1)
        handleQuantityChange(newValue.toString(), item.id)
      }}
      disabled={isUpdating}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-xl font-medium">-</span>
    </button>
    <div className="flex w-14 h-10 items-center justify-center gap-2.5 p-2.5 relative bg-[#ffffff] rounded-[20px] border border-solid border-[#a8a8a8]">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantities[item.id] ?? ""}
        disabled={isUpdating}
        onChange={(e) => {
          const value = e.target.value
          handleQuantityChange(value, item.id)
        }}
        className={`text-center focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] 
          font-medium text-[#69727a] text-base tracking-[0] leading-6 whitespace-nowrap 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
      />
    </div>
    <button
      onClick={() => {
        const currentValue = Number(quantities[item.id] || 1)
        const newValue = currentValue + 1
        handleQuantityChange(newValue.toString(), item.id)
      }}
      disabled={isUpdating}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-xl font-medium">+</span>
    </button>
  </div>
)

// 单个加热器卡片组件
const HeaterItem = ({
  item,
  quantities,
  isUpdating,
  handleQuantityChange,
  handleDelete,
}: {
  item: StoreCartLineItem
  quantities: { [key: string]: number | string }
  isUpdating: boolean
  handleQuantityChange: (quantity: number | string, itemId: string) => void
  handleDelete: (itemId: string) => void
}) => (
  <div className="full flex flex-col md:flex-row items-start gap-5 border-t border-white">
    <div
      className="relative h-[160px] aspect-square bg-cover bg-[50%_50%]"
      style={{
        backgroundImage: `url("${item?.product?.thumbnail}")`,
      }}
    />
    <div className="flex flex-col w-full h-[160px] items-start justify-between gap-4 relative flex-1 pt-5">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
        <div className="w-fit relative">
          <p className="text-[24px] font-semibold whitespace-nowrap tracking-[0]">
            {item?.product_title}
          </p>
          <div className="flex flex-wrap gap-[1px] mt-2">
            {item.variant?.options?.map((option: any) => (
              <span
                key={option.id}
                className="inline-flex items-center px-2 py-1.5 text-[12px] lg:text-[12px] font-regular bg-[#ffffff] border border-[#e9ecef] text-gray-500"
              >
                {option.option.title}: {option.value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end justify-start gap-1">
          <div className="font-semibold text-[20px] whitespace-nowrap relative tracking-[0] py-1">
            {formatPrice(item?.total)}
          </div>
          {item?.discount_total > 0 && (
            <div className="flex flex-col items-end">
              <div className="font-medium text-[14px] leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through">
                {formatPrice(item?.original_total)}
              </div>
              <div className="py-0.5 bg-[#e9ecef] rounded-full flex items-center justify-center">
                <span className="text-[14px] font-normal text-highlight">
                  Save {Math.round((item?.discount_total / item?.original_total) * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex gap-2.5">
          <div className="flex items-center gap-10 relative flex-[0_0_auto] bg-transparent border border-white">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const currentValue = Number(quantities[item.id] || 1)
                  const newValue = Math.max(1, currentValue - 1)
                  handleQuantityChange(newValue.toString(), item.id)
                }}
                disabled={isUpdating}
                className={`w-8 h-8 flex items-center justify-center
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="text-xl font-medium">-</span>
              </button>
              <div className="flex w-14 h-10 items-center justify-center gap-2.5 p-2.5 relative">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantities[item.id] ?? ""}
                  disabled={isUpdating}
                  onChange={(e) => {
                    const value = e.target.value
                    handleQuantityChange(value, item.id)
                  }}
                  className={`text-center bg-transparent focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] 
                    font-medium text-black text-base tracking-[0] leading-6 whitespace-nowrap 
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                />
              </div>
              <button
                onClick={() => {
                  const currentValue = Number(quantities[item.id] || 1)
                  const newValue = currentValue + 1
                  handleQuantityChange(newValue.toString(), item.id)
                }}
                disabled={isUpdating}
                className={`w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="text-xl font-medium">+</span>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleDelete(item.id)}
          className="flex w-10 h-10 items-center gap-2.5 px-[9px] py-[7px]"
        >
          <div className="relative w-4 h-5">
            <img alt="Layer" src="/img/delete.png" />
          </div>
        </button>
      </div>
    </div>
  </div>
)

export const HeaterCard = (): JSX.Element | null => {
  const { cart, removeVariant, updateVariantInfo } = useCart()
  const { quantities, setQuantities, isUpdating, handleQuantityChange } =
    useQuantityUpdate(cart, updateVariantInfo)
  const {
    deleteItemId,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
  } = useDeleteHandler(removeVariant)

  const heater = useMemo(() => {
    if (!cart?.items) {
      return null
    }
    const heaterItems = cart.items.filter(
      (item) => item.product_handle?.includes("heater")
    )
    return heaterItems.length > 0 ? heaterItems : null
  }, [cart?.items])

  // Initialize quantities from cart items
  useMemo(() => {
    if (!heater) {
      return
    }
    const newQuantities: { [key: string]: number } = {}
    heater.forEach((item) => {
      newQuantities[item.id] = item.quantity
    })
    setQuantities(newQuantities)
  }, [heater, setQuantities])

  if (!heater) {
    return null
  }

  return (
    <>
      {heater.map((item) => (
        <HeaterItem
          key={item.id}
          item={item}
          quantities={quantities}
          isUpdating={isUpdating}
          handleQuantityChange={handleQuantityChange}
          handleDelete={handleDelete}
        />
      ))}
      <ConfirmDialog
        isOpen={deleteItemId !== null}
        title="Are you sure you want to delete this product?"
        message="Confirming will permanently remove this heater."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}
