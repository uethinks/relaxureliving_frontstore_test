"use client"
import { useCart } from "@lib/context/cartContext"
import React, { useMemo, useState, useCallback } from "react"
import { ConfirmDialog } from "../../../../components/ConfirmDialog"

export const HeaterCard = (): JSX.Element | null => {
  const { cart, removeVariant, updateVariantInfo } = useCart()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<{
    [key: string]: number | string
  }>({})
  const [updateTimeout, setUpdateTimeout] = useState<{
    [key: string]: NodeJS.Timeout
  }>({})
  const [isUpdating, setIsUpdating] = useState(false)

  const heater = useMemo(() => {
    if (!cart?.items) return null
    const heaterItems = cart.items.filter(
      (item) => item.product_title === "Heater"
    )
    return heaterItems.length > 0 ? heaterItems : null
  }, [cart?.items])

  // Initialize quantities from cart items
  useMemo(() => {
    if (!heater) return
    const newQuantities: { [key: string]: number } = {}
    heater.forEach((item) => {
      newQuantities[item.id] = item.quantity
    })
    setQuantities(newQuantities)
  }, [heater])

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

  const removeProduct = async (heaterId: string) => {
    try {
      await removeVariant(heaterId)
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
            const updatedCart = await updateVariantInfo({
              lineId: itemId,
              quantity: 1,
            })
            // Only update cart if the update was successful
            if (updatedCart) {
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

  return !heater ? null : (
    <>
      {heater.map((item) => (
        <div
          key={item.id}
          className="full flex flex-col md:flex-row items-center gap-5 p-5 rounded-[20px] border border-solid border-[#69727a]"
        >
          <div
            className="relative w-full md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 aspect-square rounded-[20px] bg-cover bg-[50%_50%]"
            style={{
              backgroundImage: `url("${item?.product?.thumbnail}")`,
            }}
          />
          <div className="flex flex-col w-full md:w-2/3 items-start gap-4 relative">
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[14px] lg:text-[22px] leading-[33px] whitespace-nowrap relative tracking-[0]">
                {item?.product_title}
              </div>
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
                        {Math.round(
                          (item?.discount_total / item?.original_total) * 100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="inline-flex flex-col items-center gap-2.5 relative flex-[0_0_auto]">
              <div className="text-[14px] lg:text-[18px] text-[#7e7e7e]">
                {quantities[item.id]} x {item?.variant_title}
              </div>
            </div>
            <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex gap-2.5">
                <div className="flex items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
                  <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-[14px] lg:text-[18px] leading-[25.2px] whitespace-nowrap relative tracking-[0]">
                    Quantity
                  </div>
                </div>
                <div className="flex items-center gap-10 relative flex-[0_0_auto]">
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
                        className="text-center focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base tracking-[0] leading-6 whitespace-nowrap [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
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
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex w-10 h-10 items-center gap-2.5 px-[9px] py-[7px] bg-[#ffffff] rounded-[31px] border border-solid border-[#a8a8a8]"
              >
                <div className="relative w-4 h-5">
                  <img alt="Layer" src="/img/delete.png" />
                </div>
              </button>
            </div>
          </div>
        </div>
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
