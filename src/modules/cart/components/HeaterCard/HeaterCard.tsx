"use client"
import { useCart } from "@lib/context/cartContext"
import { StoreCartLineItem } from "@medusajs/types"
import React, { useEffect, useState } from "react"

export const HeaterCard = (): JSX.Element | null => {
  const { cart, getCart, removeVariant, updateVariantInfo, setCart } = useCart()
  useEffect(() => {
    getCart().then((cart) => {
      console.log("HeaterCard", cart)
      setCart(cart)
    })
  }, [])

  let heaterInCart = cart?.items?.filter(
    (item) => item.product_title === "Heater"
  )
  const [heater, setHeater] = useState<StoreCartLineItem[] | null>(
    heaterInCart ?? null
  )

  const removeProduct = async (heaterId: string) => {
    if (heaterId) {
      await removeVariant(heaterId)
      await getCart()
    }
  }
  const updateQuantity = async (quantity: number, heaterId: string) => {
    if (heaterId) {
      await updateVariantInfo({
        lineId: heaterId,
        quantity: quantity,
      })
      await getCart()
    }
  }
  useEffect(() => {
    heaterInCart = cart?.items?.filter(
      (item) => item.product_title === "Heater"
    )
    setHeater(heaterInCart ?? [])
  }, [cart])

  return !heater ? null : (
    <>
      {heater.map((item) => (
        <div
          key={item.id}
          className="full flex items-center gap-5 p-5 rounded-[20px] border border-solid border-[#69727a]"
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
                {item?.quantity} x {item?.variant_title}
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
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(Number(e.target.value), item.id)
                      }
                      className="text-right focus:outline-none relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base tracking-[0] leading-6 whitespace-nowrap"
                    ></input>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeProduct(item.id)}
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
    </>
  )
}
