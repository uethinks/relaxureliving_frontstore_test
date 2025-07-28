"use client"
import { useCart } from "@lib/context/cartContext"
import { StoreCartLineItem } from "@medusajs/types"
import React, { useEffect, useState, useCallback } from "react"
import { ConfirmDialog } from "../../../../components/ConfirmDialog"

export const SampleKitCard = (): JSX.Element | null => {
  const { cart, removeVariant, updateVariantInfo } = useCart()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [sampleKit, setSampleKit] = useState<StoreCartLineItem | null>(null)
  const [quantities, setQuantities] = useState<{
    [key: string]: number | string
  }>({})
  const [updateTimeout, setUpdateTimeout] = useState<{
    [key: string]: NodeJS.Timeout
  }>({})
  const [isUpdating, setIsUpdating] = useState(false)

  // Find sample kit in cart
  useEffect(() => {
    if (!cart?.items) {
      return
    }
    const sampleKitItem = cart.items.find((item) =>
      item.product_handle?.toLowerCase().includes("sample-kit")
    )
    setSampleKit(sampleKitItem || null)
  }, [cart?.items])

  // Initialize quantities from cart items
  useEffect(() => {
    if (!sampleKit) {
      return
    }
    const newQuantities: { [key: string]: number } = {}
    newQuantities[sampleKit.id] = sampleKit.quantity
    setQuantities(newQuantities)
  }, [sampleKit])

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

  const removeProduct = async (sampleKitId: string) => {
    if (sampleKitId) {
      await removeVariant(sampleKitId)
    }
  }

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

  if (!sampleKit) {
    return null
  }

  return (
    <>
      <div className="full flex flex-col md:flex-row items-center gap-5 p-5 rounded-[20px] border border-solid border-[#69727a]">
        <div
          className="relative w-full md:w-1/3 h-[146px] rounded-[20px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${sampleKit?.product?.thumbnail}")`,
          }}
        />
        <div className="flex flex-col w-full md:w-2/3 items-start gap-4 relative">
          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div
              className={`w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium
                text-[#343a40] text-[14px] lg:text-[22px] leading-[33px] whitespace-nowrap relative tracking-[0]`}
            >
              {sampleKit?.product_subtitle}
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
              <div
                className={`w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold
                  text-[#343a40] text-[14px] lg:text-[22px] leading-[30.8px] whitespace-nowrap relative tracking-[0]`}
              >
                $ {sampleKit?.total?.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-center gap-2.5 relative flex-[0_0_auto]">
            <div className="text-[14px] lg:text-[18px] text-[#7e7e7e]">
              {quantities[sampleKit.id]} x {sampleKit?.variant_title}
            </div>
          </div>
          <div className="flex justify-between items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex gap-2.5">
              <div className="flex items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
                <div
                  className={`w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium
                    text-[#69727a] text-[14px] lg:text-[16px] leading-[25.2px] whitespace-nowrap relative tracking-[0]`}
                >
                  Quantity
                </div>
              </div>
              <div className="flex items-center gap-10 relative flex-[0_0_auto]">
                <div className="flex w-14 h-10 items-center justify-center gap-2.5 p-2.5 relative bg-[#ffffff] rounded-[20px] border border-solid border-[#a8a8a8]">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={quantities[sampleKit.id] ?? ""}
                    disabled={isUpdating}
                    onChange={(e) => {
                      const value = e.target.value
                      handleQuantityChange(value, sampleKit.id)
                    }}
                    className={`text-center focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] 
                      font-medium text-[#69727a] text-base tracking-[0] leading-6 whitespace-nowrap 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                      [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(sampleKit.id)}
              className="flex w-10 h-10 items-center gap-2.5 px-[9px] py-[7px] bg-[#ffffff] rounded-[31px] border border-solid border-[#a8a8a8]"
            >
              <div className="relative w-4 h-5">
                <img alt="Layer" src="/img/delete.png" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={deleteItemId !== null}
        title="Are you sure you want to delete this product?"
        message="Confirming will permanently remove this sample kit."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}
