"use client"
import React, { useState, useEffect } from "react"
import { useCart } from "@lib/context/cartContext"
import { StoreCartLineItem } from "@medusajs/types"

export const ProductCard = (): JSX.Element | null => {
  const { cart, getCart, removeVariant, updateVariantInfo, setCart } = useCart()
  useEffect(() => {
    getCart().then((cart) => {
      setCart(cart)
    })
  }, [])
  let pergolaInCart = cart?.items?.find(
    (item) => item.product_type === "Pergula"
  )
  const [quantity, setQuantity] = useState<number>(pergolaInCart?.quantity ?? 1)
  const [pergola, setPergola] = useState<StoreCartLineItem | null>(
    pergolaInCart ?? null
  )
  const removeProduct = async () => {
    if (pergola?.id) {
      await removeVariant(pergola?.id)
      await getCart()
    }
  }
  const updateQuantity = async (quantity: number) => {
    if (pergola?.id) {
      await updateVariantInfo({
        lineId: pergola?.id,
        quantity: quantity,
      })
      await getCart()
      setQuantity(quantity)
    }
  }
  useEffect(() => {
    pergolaInCart = cart?.items?.find((item) => item.product_type === "Pergula")
    setPergola(pergolaInCart ?? null)
    setQuantity(pergolaInCart?.quantity ?? 1)
  }, [cart])

  return !pergola ? null : (
    <div className="flex items-center gap-5 p-5 bg-[#f3f3f3] rounded-[20px]">
      <div
        className="relative w-[209px] h-[175px] rounded-[20px]"
        style={{
          background: `url(${pergola?.product?.thumbnail}) no-repeat center center / cover`,
        }}
      />
      <div className="flex flex-col w-[548px] items-start gap-[26px] relative">
        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[22px] tracking-[0] leading-[30.8px] whitespace-nowrap">
            {pergola?.product_subtitle}
          </p>
          <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
            <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-[22px] leading-[30.8px] whitespace-nowrap relative tracking-[0]">
              $ {pergola?.total}
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col items-center gap-2.5 relative flex-[0_0_auto]">
          <div className="text-[18px] text-[#7e7e7e]">
            {pergola?.quantity} x {pergola?.variant_title}
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
                src="https://c.animaapp.com/m8o9g6iofzwjOy/img/layer-3.png"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
