"use client"
import { useCart } from "@lib/context/cartContext"
import { StoreCartLineItem } from "@medusajs/types"
import React, { useEffect, useState } from "react"

export const ShadesCard = (): JSX.Element | null => {
  const { cart, getCart, removeVariant, updateVariantInfo, setCart } = useCart()
  useEffect(() => {
    getCart().then((cart) => {
      setCart(cart)
    })
  }, [])

  let shadesInCart = cart?.items?.find(
    (item) => item.product_title === "Shade Screen"
  )
  const [quantity, setQuantity] = useState<number>(shadesInCart?.quantity ?? 1)
  const [shades, setShades] = useState<StoreCartLineItem | null>(
    shadesInCart ?? null
  )

  const removeProduct = async () => {
    if (shades?.id) {
      await removeVariant(shades?.id)
      await getCart()
    }
  }
  const updateQuantity = async (quantity: number) => {
    if (shades?.id) {
      await updateVariantInfo({
        lineId: shades?.id,
        quantity: quantity,
      })
      await getCart()
      setQuantity(quantity)
    }
  }
  useEffect(() => {
    shadesInCart = cart?.items?.find(
      (item) => item.product_title === "Shade Screen"
    )
    setShades(shadesInCart ?? null)
    setQuantity(shadesInCart?.quantity ?? 1)
  }, [cart])

  return !shades ? null : (
    <div className="flex h-[190px] items-center gap-5 p-5 rounded-[20px] border border-solid border-[#69727a]">
      <div
        className="relative w-[209px] h-[146px] rounded-[20px]"
        style={{
          background: `url(${shades?.product?.thumbnail}) no-repeat center center / cover`,
        }}
      />
      <div className="flex flex-col w-[548px] items-start gap-[68px] relative">
        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[22px] leading-[33px] whitespace-nowrap relative tracking-[0]">
            {shades?.product_subtitle}
          </div>
          <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
            <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-[22px] leading-[30.8px] whitespace-nowrap relative tracking-[0]">
              $ {shades?.total}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
            <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-lg leading-[25.2px] whitespace-nowrap relative tracking-[0]">
              Quantity
            </div>
          </div>
          <div className="inline-flex items-center gap-10 relative flex-[0_0_auto]">
            <div className="flex w-14 h-10 items-center justify-center gap-2.5 p-2.5 relative bg-[#ffffff] rounded-[20px] border border-solid border-[#a8a8a8]">
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => updateQuantity(Number(e.target.value))}
                className="text-right focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base tracking-[0] leading-6 whitespace-nowrap"
              ></input>
            </div>
          </div>
          <button
            onClick={removeProduct}
            className="flex w-10 h-10 items-center gap-2.5 px-[9px] py-[7px] absolute top-[3px] left-[502px] bg-[#ffffff] rounded-[31px] border border-solid border-[#a8a8a8]"
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
  )
}
