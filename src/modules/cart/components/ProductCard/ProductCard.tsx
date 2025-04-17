"use client"
import React, { useMemo, useState, useCallback } from "react"
import { useCart } from "@lib/context/cartContext"
import { ConfirmDialog } from "../../../../components/ConfirmDialog"

export const ProductCard = (): JSX.Element | null => {
  const { cart, removeVariant, updateVariantInfo, getCart, setCart } = useCart()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<{
    [key: string]: number | string
  }>({})
  const [updateTimeout, setUpdateTimeout] = useState<{
    [key: string]: NodeJS.Timeout
  }>({})
  const [isUpdating, setIsUpdating] = useState(false)

  console.log("cart ProductCard", cart)
  const pergola = useMemo(() => {
    if (!cart?.items) return []
    return cart.items.filter((item) => {
      // 检查多个可能的标识
      return (
        item.title?.includes("Pergola") ||
        item.product_title?.includes("Pergola") ||
        item.product_type === "Pergola"
      )
    })
  }, [cart?.items])

  // Initialize quantities from cart items
  useMemo(() => {
    const newQuantities: { [key: string]: number } = {}
    pergola.forEach((item) => {
      newQuantities[item.id] = item.quantity
    })
    setQuantities(newQuantities)
  }, [pergola])

  const removeProduct = async (pergolaId: string) => {
    try {
      await removeVariant(pergolaId)
    } catch (error) {
      console.error("Failed to remove product:", error)
    }
  }

  const handleQuantityChange = useCallback(
    (quantity: number | string, itemId: string): void => {
      if (isUpdating) return

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
            await updateVariantInfo({
              lineId: itemId,
              quantity: 1,
            })
            // Only update cart if the update was successful
            const updatedCart = await getCart()
            if (updatedCart) {
              setCart(updatedCart)
              setQuantities((prev) => ({ ...prev, [itemId]: 1 }))
            }
          } catch (error) {
            console.error("Failed to update quantity:", error)
            // Revert to original quantity on error
            setQuantities((prev) => ({
              ...prev,
              [itemId]:
                cart?.items?.find((item) => item.id === itemId)?.quantity || 1,
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
      if (isNaN(numQuantity)) return // Allow partial input like "4" when typing "41"

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
            // Only update cart if the update was successful
            const updatedCart = await getCart()
            if (updatedCart) {
              setCart(updatedCart)
            }
          } catch (error) {
            console.error("Failed to update quantity:", error)
            // Revert to original quantity on error
            setQuantities((prev) => ({
              ...prev,
              [itemId]:
                cart?.items?.find((item) => item.id === itemId)?.quantity || 1,
            }))
          } finally {
            setIsUpdating(false)
          }
        }, 800) // Increased debounce time to 800ms

        setUpdateTimeout((prev) => ({ ...prev, [itemId]: timeoutId }))
      }
    },
    [
      cart?.items,
      updateTimeout,
      isUpdating,
      updateVariantInfo,
      getCart,
      setCart,
    ]
  )

  const handleDelete = (itemId: string) => {
    setDeleteItemId(itemId)
  }

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      await removeProduct(deleteItemId)
      setDeleteItemId(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteItemId(null)
  }

  if (pergola.length === 0) {
    return null
  }

  return (
    <>
      {pergola.map((item) => (
        <div
          key={item.id}
          className="full flex items-center gap-5 p-5 rounded-[20px] bg-[#F3F3F3]"
        >
          <div
            className="relative w-full lg:w-1/3 h-[146px] rounded-[20px]"
            style={{
              background: `url(${item?.product?.thumbnail}) no-repeat center center / cover`,
            }}
          />
          <div className="flex flex-col w-full lg:w-2/3 items-start gap-4 relative">
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[22px] leading-[33px] whitespace-nowrap relative tracking-[0]">
                {item?.product_subtitle}
              </div>
              <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
                <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-[22px] leading-[30.8px] whitespace-nowrap relative tracking-[0]">
                  $ {item?.total}
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col items-center gap-2.5 relative flex-[0_0_auto]">
              <div className="text-[18px] text-[#7e7e7e]">
                {quantities[item.id]} x {item?.variant_title}
              </div>
            </div>
            <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex gap-2.5">
                <div className="flex items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
                  <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-lg leading-[25.2px] whitespace-nowrap relative tracking-[0]">
                    Quantity
                  </div>
                </div>
                <div className="flex items-center gap-10 relative flex-[0_0_auto]">
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
                      className="text-center focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base tracking-[0] leading-6 whitespace-nowrap [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex w-10 h-10 items-center gap-2.5 px-[9px] py-[7px] bg-[#ffffff] rounded-[31px] border border-solid border-[#a8a8a8]"
              >
                <div className="relative w-4 h-5">
                  <img
                    className="absolute w-4 h-5 top-0 left-[3px]"
                    alt="Layer"
                    src="https://c.animaapp.com/m8o9g6iofzwjOy/img/layer-3-1.png"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
      <ConfirmDialog
        isOpen={deleteItemId !== null}
        title="Are you sure you want to delete this product?"
        message="Confirming will permanently remove this pergola."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}
