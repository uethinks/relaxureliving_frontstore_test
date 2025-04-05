"use client"
import { useCart } from "@lib/context/cartContext"
import React, { useState, useEffect } from "react"
import { StoreCart } from "@medusajs/types"
import {
  updateCart,
  placeOrder,
  setShippingMethod,
  initiatePaymentSession,
} from "@lib/data/cart"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import Link from "next/link"
export const Checkout = () => {
  const { cart, setCart, getCart } = useCart()
  const [shippingOptions, setShippingOptions] = useState<any[]>([])
  const [paymentOptions, setPaymentOptions] = useState<any[]>([])
  useEffect(() => {
    const fetchShippingOptions = async (cartId: string) => {
      const options = await listCartShippingMethods(cartId)
      setShippingOptions(options ?? [])
    }
    const fetchPaymentProvider = async (regionId: string) => {
      const options = await listCartPaymentMethods(regionId)
      setPaymentOptions(options || [])
    }
    getCart().then((cart) => {
      setCart(cart)
      fetchShippingOptions(cart?.id ?? "")
      fetchPaymentProvider(cart?.region_id || "")
    })
  }, [])

  const confirmOrder = async () => {
    const shipping_address = {
      first_name: cart?.shipping_address?.first_name ?? "",
      last_name: cart?.shipping_address?.last_name ?? "",
      address_1: cart?.shipping_address?.address_1 ?? "",
      city: cart?.shipping_address?.city ?? "",
      province: cart?.shipping_address?.province ?? "",
      postal_code: cart?.shipping_address?.postal_code ?? "",
      phone: cart?.shipping_address?.phone ?? "",
      country_code: cart?.shipping_address?.country_code ?? "us",
    }
    const data = {
      email: cart?.email,
      shipping_address: shipping_address,
    }
    await updateCart(data)
    await setShippingMethod({
      cartId: cart?.id ?? "",
      shippingMethodId: shippingOptions?.[0]?.id ?? "",
    })
    await initiatePaymentSession(cart as StoreCart, {
      provider_id: paymentOptions[0].id,
    })
    await placeOrder(cart?.id ?? "")
  }
  return (
    <div className="bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex flex-row justify-center w-full">
      <div className="flex flex-col items-center bg-[#ffffff] w-full lg:w-[90%] 2xl:w-[1512px] relative pt-10">
        {/* Header */}
        <div className="flex w-[1248px] h-[75px] items-center justify-end gap-[305px] p-5 bg-[#f4f4f4cc] rounded-[20px] backdrop-blur-[13.8px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(13.8px)_brightness(100%)] shadow-relaxureblur-background">
          <div className="relative w-[76.45px] h-12 mt-[-6.50px] mb-[-6.50px] ml-[-1.45px] bg-[url(https://c.animaapp.com/m8tqwcaxIEhNf6/img/logo.svg)] bg-[100%_100%]" />
          <div className="inline-flex items-center gap-[54px] relative flex-[0_0_auto] mt-[-6.50px] mb-[-6.50px]">
            <div className="flex w-[574px] h-11 items-center justify-end gap-10 relative">
              <Link href="/us#pergola">
                <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                    Our pergola
                  </div>
                </div>
              </Link>
              <Link href="/us#features">
                <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                    Features
                  </div>
                </div>
              </Link>
              <Link href="/us#accessories">
                <div className="flex w-[111px] items-center justify-center gap-2.5 px-0 py-2.5 relative ml-[-50.00px]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                    Accesories
                  </div>
                </div>
              </Link>
              <Link href="/us#about">
                <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                    About us
                  </div>
                </div>
              </Link>
              <div className="inline-flex h-11 items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                <div className="relative w-[30px] h-[30px] mt-[-3.00px] mb-[-3.00px] bg-[url(https://c.animaapp.com/m8tqwcaxIEhNf6/img/vector-1.svg)] bg-[100%_100%]">
                  <div className="relative w-3.5 h-3.5 -top-0.5 left-5 bg-[#f6f6f6] rounded-[7px]">
                    <div className="relative w-2.5 h-2.5 top-0.5 left-0.5 bg-[#e54a3f] rounded-[5px]" />
                  </div>
                </div>
              </div>
            </div>
            <Link href="/us#contact">
              <button className="all-[unset] box-border w-[200px] flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative bg-[#072f6c]">
                <div className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[#ffffff] relative font-medium whitespace-nowrap leading-6">
                  Contact us
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Payment Title */}
        <div className="w-full inline-flex items-center justify-start gap-2.5 p-2.5 mt-10 mb-5">
          <div className="mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative w-fit text-[#343a40] tracking-[var(--heading-2-letter-spacing)] whitespace-nowrap [font-style:var(--heading-2-font-style)]">
            Payment
          </div>
        </div>

        <div className="flex flex-row justify-center items-start w-full">
          {/* Payment Form */}
          <div className="flex flex-col items-start justify-end gap-10 p-10  bg-[#efefef] rounded-[20px]">
            {/* Email Input */}
            <div className="flex flex-col items-start gap-3 relative w-[488px] self-stretch flex-[0_0_auto]">
              <div className="relative mt-[-0.91px] text-[#343a40] [font-family:'Montserrat',Helvetica] leading-[19.8px] w-fit font-normal whitespace-nowrap text-lg tracking-[0]">
                Contact
              </div>
              <input
                className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[458px] self-stretch [font-family:'Inter',Helvetica] pl-[15px]"
                placeholder="Email or phone number"
                type="email"
                value={cart?.email ?? ""}
                onChange={(e) => {
                  setCart(
                    cart
                      ? {
                          ...cart,
                          email: e.target.value,
                        }
                      : null
                  )
                }}
              />
            </div>

            {/* Delivery Section */}
            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                  <div className="mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-lg leading-[25.2px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                    Delivery
                  </div>
                </div>
                {/* Country Selector */}
                <div className="flex flex-col items-start gap-3 relative w-[488px] self-stretch flex-[0_0_auto]">
                  <div className="border-[#d8dadc] text-[#8d9299] flex flex-col items-center flex-[0_0_auto] px-[14.53px] py-[16.34px] w-full rounded-[9.08px] gap-[9.08px] bg-[#ffffff] border border-solid self-stretch">
                    <div className="w-full h-[13px] [font-family:'Montserrat',Helvetica] font-normal text-[#8d9299] text-xs tracking-[0] leading-[13.2px]">
                      Country
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2">
                      <img src="/img/USA.png" alt="USA" />
                      <span>United States</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Shipping Method Selector */}
              <div className="flex flex-col items-start gap-3 relative w-[488px] self-stretch flex-[0_0_auto]">
                <div className="border-[#d8dadc] text-[#8d9299] flex flex-col items-center flex-[0_0_auto] px-[14.53px] py-[16.34px] w-full rounded-[9.08px] gap-[9.08px] bg-[#ffffff] border border-solid self-stretch">
                  <div className="w-full h-[13px] [font-family:'Montserrat',Helvetica] font-normal text-[#8d9299] text-xs tracking-[0] leading-[13.2px]">
                    Shipping Method
                  </div>
                  <div className="w-full flex  items-center gap-2">
                    {shippingOptions.map((option) => (
                      <div className="w-1/3" key={option.id}>
                        {/* <input type="radio" name="shippingMethod" /> */}
                        <label>{option.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Name Inputs */}
              <div className="flex items-center gap-[39px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex w-[350px] items-start gap-5 relative">
                  <input
                    className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[214px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
                    placeholder="First name"
                    type="text"
                    value={cart?.shipping_address?.first_name ?? ""}
                    onChange={(e) => {
                      setCart(
                        cart
                          ? ({
                              ...cart,
                              shipping_address: {
                                ...cart.shipping_address,
                                first_name: e.target.value,
                              },
                            } as StoreCart)
                          : null
                      )
                    }}
                  />
                  <input
                    className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[214px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
                    placeholder="Last name"
                    type="text"
                    value={cart?.shipping_address?.last_name ?? ""}
                    onChange={(e) => {
                      setCart(
                        cart
                          ? ({
                              ...cart,
                              shipping_address: {
                                ...cart.shipping_address,
                                last_name: e.target.value,
                              },
                            } as StoreCart)
                          : null
                      )
                    }}
                  />
                </div>
              </div>
              {/* Address Input */}
              <input
                className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[458px] self-stretch [font-family:'Montserrat',Helvetica] pl-[15px]"
                placeholder="Address"
                type="text"
                value={cart?.shipping_address?.address_1 ?? ""}
                onChange={(e) => {
                  setCart(
                    cart
                      ? ({
                          ...cart,
                          shipping_address: {
                            ...cart.shipping_address,
                            address_1: e.target.value,
                          },
                        } as StoreCart)
                      : null
                  )
                }}
              />
              {/* City, State, ZIP Inputs */}
              <div className="inline-flex items-center gap-[31px] relative flex-[0_0_auto]">
                <input
                  className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[117px] [font-family:'Montserrat',Helvetica] pl-3.5"
                  placeholder="City"
                  type="text"
                  value={cart?.shipping_address?.city ?? ""}
                  onChange={(e) => {
                    setCart(
                      cart
                        ? ({
                            ...cart,
                            shipping_address: {
                              ...cart.shipping_address,
                              city: e.target.value,
                            },
                          } as StoreCart)
                        : null
                    )
                  }}
                />
                <input
                  className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[117px] [font-family:'Montserrat',Helvetica] pl-3.5"
                  placeholder="State"
                  type="text"
                  value={cart?.shipping_address?.province ?? ""}
                  onChange={(e) => {
                    setCart(
                      cart
                        ? ({
                            ...cart,
                            shipping_address: {
                              ...cart.shipping_address,
                              province: e.target.value,
                            },
                          } as StoreCart)
                        : null
                    )
                  }}
                />
                <input
                  className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[117px] [font-family:'Montserrat',Helvetica] pl-3.5"
                  placeholder="ZIP code"
                  type="text"
                  value={cart?.shipping_address?.postal_code ?? ""}
                  onChange={(e) => {
                    setCart(
                      cart
                        ? ({
                            ...cart,
                            shipping_address: {
                              ...cart.shipping_address,
                              postal_code: e.target.value,
                            },
                          } as StoreCart)
                        : null
                    )
                  }}
                />
              </div>
              {/* Phone Input */}
              <input
                className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-[458px] self-stretch [font-family:'Montserrat',Helvetica] pl-[15px]"
                placeholder="Phone"
                type="tel"
                value={cart?.shipping_address?.phone ?? ""}
                onChange={(e) => {
                  setCart(
                    cart
                      ? ({
                          ...cart,
                          shipping_address: {
                            ...cart.shipping_address,
                            phone: e.target.value,
                          },
                        } as StoreCart)
                      : null
                  )
                }}
              />
            </div>

            {/* Payment Section */}
            <div className="flex flex-col items-start gap-[70px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-center relative self-stretch w-full flex-[0_0_auto]">
                    <div className="inline-flex items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
                      <div className="mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-lg leading-[25.2px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                        Payment
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-[456px] relative self-stretch w-full flex-[0_0_auto]">
                    <div className="inline-flex h-[31px] items-center gap-2 relative flex-[0_0_auto]">
                      <div className="relative w-6 h-6 bg-contain bg-[url(https://c.animaapp.com/m8tqwcaxIEhNf6/img/magnetic-card.png)] bg-[100%_100%]" />
                      <div className="inline-flex items-center gap-[17.41px] relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.93px] [font-family:'Montserrat',Helvetica] font-normal text-formblacksecondary text-lg tracking-[0.21px] leading-[normal]">
                          Pay by airwallex
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Confirm Payment Button */}
            <div className="flex flex-col items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <button
                onClick={confirmOrder}
                className="all-[unset] box-border w-full flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative bg-[#072f6c] self-stretch flex-[0_0_auto]"
              >
                <div className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[#ffffff] relative font-medium whitespace-nowrap leading-6">
                  Confirm payment
                </div>
              </button>
            </div>
            {/* Security Message */}
            <div className="flex w-[371px] items-end gap-2 relative flex-[0_0_auto]">
              <img
                className="relative w-6 h-6"
                alt="Lock"
                src="https://c.animaapp.com/m8tqwcaxIEhNf6/img/lock.png"
              />
              <p className="relative w-[341px] mr-[-2.00px] [font-family:'Montserrat',Helvetica] font-medium text-formash text-base tracking-[0] leading-[normal]">
                All transactions are secure and encrypted
              </p>
            </div>
            {/* Footer Links */}
            <div className="flex items-center justify-center gap-[34px] relative self-stretch w-full flex-[0_0_auto]">
              <Link href="/us/terms/warranty">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Warranty
                </div>
              </Link>
              <Link href="/us/terms/refund-policy">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Refund policy
                </div>
              </Link>
              <Link href="/us/terms/terms-of-service">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Terms of service
                </div>
              </Link>
              <Link href="/us/terms/privacy-policy">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Privacy policy
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5 px-2.5">
            <div className="flex flex-col h-[464px] items-start gap-5 p-5 relative self-stretch w-full bg-[#efefef] rounded-[20px] shadow-shadow-relaxure-button">
              <div className="inline-flex items-center gap-[420px] relative flex-[0_0_auto]">
                <div className="mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[22px] leading-[30.8px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                  Order Summary
                </div>
              </div>
              <div className="flex flex-col w-[431px] h-[359px] items-center gap-[35px] relative mr-[-1.00px]">
                <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto] mb-[-5.00px]">
                  <div className="flex flex-col items-start gap-[30px] relative self-stretch w-full flex-[0_0_auto]">
                    {cart?.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-start gap-[30px] relative self-stretch w-full flex-[0_0_auto]"
                      >
                        {/* Order items */}
                        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                          <div className="flex w-[75px] h-6 items-center gap-2.5 relative">
                            <div className="relative w-[327px] h-6 mt-[-1.00px] mr-[-252.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-lg tracking-[0] leading-[27px] whitespace-nowrap">
                              {item.quantity} x {item.variant_title}
                            </div>
                          </div>
                          <div className="relative w-fit [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-base tracking-[0] leading-[22.4px] whitespace-nowrap">
                            ${item.total}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="relative self-stretch w-full h-0.5 bg-[#d9d9d9] rounded-[10px]" />
                  </div>
                  <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                    <div className="[font-family:'Montserrat',Helvetica] font-medium text-[22px] leading-[30.8px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                      Total
                    </div>
                    <div className="mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-2xl leading-[33.6px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                      $ {cart?.total}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Order Summary */}

        {/* Footer */}
        <img
          className="w-full mt-10"
          alt="Footer dark"
          src="https://c.animaapp.com/m8tqwcaxIEhNf6/img/footer-4-dark.png"
        />
      </div>
    </div>
  )
}
