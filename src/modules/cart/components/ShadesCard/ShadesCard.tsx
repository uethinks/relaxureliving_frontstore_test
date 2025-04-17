"use client"
import { useCart } from "@lib/context/cartContext"
import { StoreCartLineItem } from "@medusajs/types"
import React, { useEffect, useState } from "react"
import { ConfirmDialog } from "../../../../components/ConfirmDialog"

export const ShadesCard = (): JSX.Element | null => {
  const { cart, getCart, removeVariant, updateVariantInfo, setCart } = useCart()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)

  useEffect(() => {
    getCart().then((cart) => {
      console.log("ShadesCard", cart)
      setCart(cart)
    })
  }, [])

  let shadesInCart = cart?.items?.filter(
    (item) => item.product_title === "Shade Screen"
  )
  // const [quantity, setQuantity] = useState<number>(shadesInCart?.quantity ?? 1)
  const [shades, setShades] = useState<StoreCartLineItem[] | null>(
    shadesInCart ?? null
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

  const removeProduct = async (shadeId: string) => {
    if (shadeId) {
      await removeVariant(shadeId)
      await getCart()
    }
  }
  const updateQuantity = async (quantity: number, shadeId: string) => {
    if (shadeId) {
      await updateVariantInfo({
        lineId: shadeId,
        quantity: quantity,
      })
      await getCart()
      // setQuantity(quantity)
    }
  }
  useEffect(() => {
    shadesInCart = cart?.items?.filter(
      (item) => item.product_title === "Shade Screen"
    )
    setShades(shadesInCart ?? [])
    // setQuantity(shadesInCart?.quantity ?? 1)
  }, [cart])

  return !shades ? null : (
    <>
      {shades.map((shade) => (
        <div
          key={shade.id}
          className="full flex items-center gap-5 p-5 rounded-[20px] border border-solid border-[#69727a]"
        >
          <div
            className="relative w-full lg:w-1/3 h-[146px] rounded-[20px]"
            style={{
              background: `url(${shade?.product?.thumbnail}) no-repeat center center / cover`,
            }}
          />
          <div className="flex flex-col w-full lg:w-2/3 items-start gap-4 relative">
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[22px] leading-[33px] whitespace-nowrap relative tracking-[0]">
                {shade?.product_subtitle}
              </div>
              <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
                <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-[22px] leading-[30.8px] whitespace-nowrap relative tracking-[0]">
                  $ {shade?.total}
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col items-center gap-2.5 relative flex-[0_0_auto]">
              <div className="text-[18px] text-[#7e7e7e]">
                {shade?.quantity} x {shade?.variant_title}
              </div>
              <div className="w-full flex items-center gap-2 relative">
                <div className="w-[41px] h-[41px] rounded-[20px] relative flex items-center justify-center">
                  <div className="w-[31px] h-[31px] rounded-[15.5px] bg-[#7e7e7e] relative" />
                </div>

                <div className="w-[60px] flex items-start px-0 py-2.5 rounded-[20px] justify-center relative">
                  <div className="w-[61px] flex items-center mr-[-0.50px] gap-2.5 ml-[-0.50px] px-0 py-2.5 h-6 rounded-[20px] relative">
                    <div className="text-[16px] [font-family:'Montserrat',Helvetica] w-[81px] mt-[-11.00px] tracking-[0] text-base mr-[-20.00px] text-[#7e7e7e] h-6 font-medium leading-6 whitespace-nowrap mb-[-9.00px] relative">
                      Dark grey
                    </div>
                  </div>
                </div>
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
                      type="number"
                      value={shade.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(Number(e.target.value), shade.id)
                      }
                      className="text-right focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base tracking-[0] leading-6 whitespace-nowrap"
                    ></input>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(shade.id)}
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
        message="Confirming will permanently remove this shade screen."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}
