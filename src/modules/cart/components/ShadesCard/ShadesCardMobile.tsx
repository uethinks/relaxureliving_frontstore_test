"use client"
import { useCart } from "@lib/context/cartContext"
import { StoreCartLineItem } from "@medusajs/types"
import React, { useEffect, useState, useCallback } from "react"
import { ConfirmDialog } from "../../../../components/ConfirmDialog"
import { formatPrice } from "@lib/utils"

// Custom hook for managing quantities
const useQuantityManager = (cart: any, updateVariantInfo: any) => {
  const [quantities, setQuantities] = useState<{
    [key: string]: number | string
  }>({})
  const [updateTimeout, setUpdateTimeout] = useState<{
    [key: string]: NodeJS.Timeout
  }>({})
  const [isUpdating, setIsUpdating] = useState(false)

  // Initialize quantities from cart items
  useEffect(() => {
    const shadesInCart = cart?.items?.filter(
      (item: any) => item.product_handle === "sunshades"
    )
    if (!shadesInCart?.length) {
      return
    }
    const newQuantities: { [key: string]: number } = {}
    shadesInCart.forEach((item: any) => {
      newQuantities[item.id] = item.quantity
    })
    setQuantities(newQuantities)
  }, [cart?.items])

  const handleQuantityChange = useCallback(
    (quantity: number | string, itemId: string): void => {
      if (isUpdating) {
        return
      }

      // Allow empty input but set to 1 after debounce
      if (quantity === "") {
        setQuantities((prev) => ({ ...prev, [itemId]: "" }))

        // Clear existing timeout for this item
        if (updateTimeout[itemId]) {
          clearTimeout(updateTimeout[itemId])
        }

        // Set new timeout with debounce
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
            // Revert to original quantity on error
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

      // Only proceed with number validation if the input is not empty
      const numQuantity = Number(quantity)
      if (isNaN(numQuantity)) {
        return // Allow partial input like "4" when typing "41"
      }

      // Update local state immediately with the current input
      setQuantities((prev) => ({ ...prev, [itemId]: quantity }))

      // Only proceed with API update if we have a valid number
      if (numQuantity >= 1) {
        // Clear existing timeout for this item
        if (updateTimeout[itemId]) {
          clearTimeout(updateTimeout[itemId])
        }

        // Set new timeout with debounce
        const timeoutId = setTimeout(async () => {
          try {
            setIsUpdating(true)
            await updateVariantInfo({
              lineId: itemId,
              quantity: numQuantity,
            })
          } catch (error) {
            console.error("Failed to update quantity:", error)
            // Revert to original quantity on error
            setQuantities((prev) => ({
              ...prev,
              [itemId]:
                cart?.items?.find((item: any) => item.id === itemId)
                  ?.quantity || 1,
            }))
          } finally {
            setIsUpdating(false)
          }
        }, 800) // Increased debounce time to 800ms

        setUpdateTimeout((prev) => ({ ...prev, [itemId]: timeoutId }))
      }
    },
    [cart?.items, updateTimeout, isUpdating, updateVariantInfo]
  )

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      Object.values(updateTimeout).forEach((timeoutId) =>
        clearTimeout(timeoutId)
      )
    }
  }, [updateTimeout])

  return { quantities, isUpdating, handleQuantityChange }
}

// Custom hook for managing shades data
const useShadesData = (cart: any) => {
  // Memoize the shades list to prevent unnecessary re-renders
  const memoizedShades = React.useMemo(() => {
    return (
      cart?.items?.filter(
        (item: any) => item.product_handle === "sunshades"
      ) ?? []
    )
  }, [cart?.items])

  // Memoize the image URLs to prevent unnecessary re-renders
  const memoizedImageUrls = React.useMemo(() => {
    const urls: { [key: string]: string } = {}
    memoizedShades.forEach((shade: any) => {
      if (shade?.product?.thumbnail) {
        urls[shade.id] = shade.product.thumbnail
      }
    })
    return urls
  }, [memoizedShades])

  return { memoizedShades, memoizedImageUrls }
}

// Component for individual shade card
const ShadeCardItem = ({
  shade,
  imageUrl,
  quantities,
  isUpdating,
  handleQuantityChange,
  onDelete,
}: {
  shade: StoreCartLineItem
  imageUrl: string
  quantities: { [key: string]: number | string }
  isUpdating: boolean
  handleQuantityChange: (quantity: number | string, itemId: string) => void
  onDelete: (itemId: string) => void
}) => (
  <div className="full flex flex-row items-start gap-2 border-t border-white">
    <div
      className="relative h-[48px] aspect-square bg-cover bg-[50%_50%]"
      style={{
        backgroundImage: `url("${imageUrl}")`,
      }}
    />
    <div className="flex flex-col items-start justify-between gap-1 relative flex-1 pt-3">
      <div className="flex flex-row items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
        <div className={`w-fit relative`}>
          <p className="text-[14px] font-semibold whitespace-nowrap tracking-[0]">
            {shade?.product_title}
          </p>
          <div className="flex flex-wrap gap-[1px] mt-2">
            {shade?.variant?.options?.map((option: any) => (
              <span
                key={option.id}
                className="inline-flex items-center px-1 py-1.5 text-[9px] font-regular bg-[#ffffff] border border-[#e9ecef] text-gray-500"
              >
                {option.option.title}: {option.value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end justify-start gap-1">
          <div className="font-semibold text-[14px] whitespace-nowrap relative tracking-[0] py-1">            
            {formatPrice(shade?.total)}
          </div>
          {shade?.discount_total > 0 && (
            <div className="flex flex-col items-end">
              <div className="font-medium text-[14px] leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through">
                {formatPrice(shade?.original_total)}
              </div>
              <div className="py-0.5 bg-[#e9ecef] rounded-full flex items-center justify-center">
                <span className="text-[14px] font-normal text-highlight">
                  Save{" "}
                  {Math.round(
                    (shade?.discount_total / shade?.original_total) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] mt-1 mb-1">
        <div className="flex gap-2.5">
          <div className="flex items-center gap-10 relative flex-[0_0_auto] bg-transparent border border-white">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const currentValue = Number(quantities[shade.id] || 1)
                  const newValue = Math.max(1, currentValue - 1)
                  handleQuantityChange(newValue.toString(), shade.id)
                }}
                disabled={isUpdating}
                className={`w-8 h-5 flex items-center justify-center
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="text-xl font-medium">-</span>
              </button>
              <div className="flex w-14 h-8 items-center justify-center gap-2.5 p-2.5 relative">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantities[shade.id] ?? ""}
                  disabled={isUpdating}
                  onChange={(e) => {
                    const value = e.target.value
                    handleQuantityChange(value, shade.id)
                  }}
                  className={`text-center bg-transparent focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] 
                    font-medium text-black text-base tracking-[0] leading-6 whitespace-nowrap 
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                />
              </div>
              <button
                onClick={() => {
                  const currentValue = Number(quantities[shade.id] || 1)
                  const newValue = currentValue + 1
                  handleQuantityChange(newValue.toString(), shade.id)
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
          onClick={() => onDelete(shade.id)}
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

export const ShadesCardMobile = (): JSX.Element | null => {
  const { cart, removeVariant, updateVariantInfo } = useCart()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)

  const { quantities, isUpdating, handleQuantityChange } = useQuantityManager(
    cart,
    updateVariantInfo
  )
  const { memoizedShades, memoizedImageUrls } = useShadesData(cart)

  const handleDelete = (itemId: string) => {
    setDeleteItemId(itemId)
  }

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      await removeVariant(deleteItemId)
      setDeleteItemId(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteItemId(null)
  }

  return !memoizedShades?.length ? null : (
    <>
      {memoizedShades.map((shade: StoreCartLineItem) => (
        <ShadeCardItem
          key={shade.id}
          shade={shade}
          imageUrl={memoizedImageUrls[shade.id]}
          quantities={quantities}
          isUpdating={isUpdating}
          handleQuantityChange={handleQuantityChange}
          onDelete={handleDelete}
        />
      ))}
      <ConfirmDialog
        isOpen={deleteItemId !== null}
        title="Are you sure you want to delete this product?"
        message="Confirming will permanently remove this shade screen."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}
