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
import Link from "next/link"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { init } from "@airwallex/components-sdk"

export const Checkout = () => {
  const { cart, setCart, getCart } = useCart()
  const [shippingOptions, setShippingOptions] = useState<any[]>([])
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  })

  // 初始化购物车
  const initializeCart = async () => {
    try {
      // 1. 首先获取购物车
      const currentCart = await getCart()
      console.log("currentCart", currentCart)
      if (!currentCart) return

      // 2. 更新购物车状态
      setCart(currentCart)

      // 3. 获取配送选项
      const shippingMethods = await listCartShippingMethods(currentCart.id)
      setShippingOptions(shippingMethods ?? [])

      // 4. 初始化 Airwallex SDK
      const { payments } = await init({
        env: "prod",
        enabledElements: ["payments"],
      })

      if (!payments) {
        throw new Error("Failed to initialize Airwallex payments")
      }

      // 5. 初始化支付会话
      const paymentSession = await initiatePaymentSession(
        currentCart as StoreCart,
        {
          provider_id: "pp_Airwallex_Airwallex",
          data: {
            amount: currentCart?.total,
            currency: currentCart?.currency_code,
            merchant_order_id: currentCart?.id,
          },
        }
      )
      console.log("paymentSession", paymentSession)

      // 6. 创建 Drop-in Element
      const element = await payments.createElement("dropIn", {
        intent_id: paymentSession.payment_collection?.payment_sessions?.[0]
          ?.data?.payment_intent_id as string,
        client_secret: paymentSession.payment_collection?.payment_sessions?.[0]
          ?.data?.client_secret as string,
        currency: currentCart?.currency_code?.toUpperCase() || "USD",
      })

      if (!element) {
        throw new Error("Failed to create Airwallex drop-in element")
      }

      // 7. 挂载 Drop-in Element
      const container = document.getElementById("airwallex-dropin-container")
      if (container) {
        element.mount(container)
      }

      // 8. 监听事件
      element.on("success", (event: any) => {
        console.log("Payment successful:", event)
        handlePaymentComplete()
      })

      element.on("error", (event: any) => {
        console.error("Payment failed:", event)
      })

      element.on("ready", () => {
        console.log("Drop-in element is ready")
      })
    } catch (error) {
      console.error("Error initializing cart:", error)
    }
  }

  useEffect(() => {
    initializeCart()
  }, [])

  const handlePaymentComplete = async () => {
    if (cart) {
      await placeOrder(cart.id)
    }
  }

  const validateForm = () => {
    let valid = true
    let newErrors = {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
    }

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(cart?.email ?? "")) {
      newErrors.email =
        "Please enter a valid email address, e.g., example@domain.com."
      valid = false
    }

    // Phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(cart?.shipping_address?.phone ?? "")) {
      newErrors.phone =
        "Please enter a valid phone number, including country code if necessary."
      valid = false
    }

    // Required fields validation
    if (!cart?.email) {
      newErrors.email = "Email is required."
      valid = false
    }
    if (!cart?.shipping_address?.first_name) {
      newErrors.firstName = "First name is required."
      valid = false
    }
    if (!cart?.shipping_address?.last_name) {
      newErrors.lastName = "Last name is required."
      valid = false
    }
    if (!cart?.shipping_address?.address_1) {
      newErrors.address = "Address is required."
      valid = false
    }
    if (!cart?.shipping_address?.city) {
      newErrors.city = "City is required."
      valid = false
    }
    if (!cart?.shipping_address?.province) {
      newErrors.province = "State is required."
      valid = false
    }
    if (!cart?.shipping_address?.postal_code) {
      newErrors.postalCode = "ZIP code is required."
      valid = false
    }
    if (!cart?.shipping_address?.phone) {
      newErrors.phone = "Phone number is required."
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const confirmOrder = async () => {
    if (!validateForm()) return

    try {
      // 1. 更新购物车信息
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

      // 2. 设置配送方式
      await setShippingMethod({
        cartId: cart?.id ?? "",
        shippingMethodId: shippingOptions?.[0]?.id ?? "",
      })

      // 3. 创建订单
      const orderResult = await placeOrder(cart?.id ?? "")
      console.log("orderResult", orderResult)
      if (!orderResult || orderResult.type == "cart") {
        throw new Error("Failed to create order")
      }
    } catch (error) {
      console.error("Error in payment process:", error)
    }
  }

  return (
    <div className="bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex flex-col items-center justify-start w-full">
      <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full lg:w-[90%] 2xl:w-[1512px] relative pt-10">
        {/* Header */}
        <NavBarWrapper isFixed={false} />

        {/* Payment Title */}
        <div className="w-full inline-flex items-center justify-start gap-2.5 p-2.5 mt-10 mb-5 px-5">
          <div className="mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative w-fit text-[#343a40] tracking-[var(--heading-2-letter-spacing)] whitespace-nowrap [font-style:var(--heading-2-font-style)]">
            Payment
          </div>
        </div>

        <div className="flex flex-col justify-start items-center lg:flex-row lg:justify-between lg:items-start w-full gap-5 px-5">
          {/* Payment Form */}
          <div className="w-full lg:w-3/5 flex flex-col items-start justify-end gap-10 p-5 lg:p-10 bg-[#efefef] rounded-[20px]">
            <div className="flex flex-col lg:flex-row items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {/* Email Input */}
              <div className="flex flex-col">
                <input
                  className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Inter',Helvetica] pl-[15px]"
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
                {errors.email && (
                  <div className="text-red-500 mt-1 block">{errors.email}</div>
                )}
              </div>
              {/* Phone Input */}
              <div className="flex flex-col">
                <input
                  className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Montserrat',Helvetica] pl-[15px]"
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
                {errors.phone && (
                  <div className="text-red-500 mt-1 block">{errors.phone}</div>
                )}
              </div>
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
                <div className="flex flex-col items-start gap-3 relative w-full self-stretch flex-[0_0_auto]">
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
              <div className="flex flex-col items-start gap-3 relative w-full self-stretch flex-[0_0_auto]">
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
                <div className="flex flex-col lg:flex-row w-full items-start gap-5 relative">
                  <div className="flex flex-col">
                    <input
                      className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
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
                    {errors.firstName && (
                      <div className="text-red-500 mt-1 block">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
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
                    {errors.lastName && (
                      <div className="text-red-500 mt-1 block">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Address Input */}
              <div className="flex flex-col w-full">
                <input
                  className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Montserrat',Helvetica] pl-[15px]"
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
                {errors.address && (
                  <div className="text-red-500 mt-1 block">
                    {errors.address}
                  </div>
                )}
              </div>
              {/* City, State, ZIP Inputs */}
              <div className="flex w-full flex-col lg:flex-row lg:items-center gap-2 relative flex-[0_0_auto]">
                <div className="flex flex-col w-1/3">
                  <input
                    className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
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
                  {errors.city && (
                    <div className="text-red-500 mt-1 block">{errors.city}</div>
                  )}
                </div>
                <div className="flex flex-col w-1/3">
                  <input
                    className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
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
                  {errors.province && (
                    <div className="text-red-500 mt-1 block">
                      {errors.province}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-1/3">
                  <input
                    className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
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
                  {errors.postalCode && (
                    <div className="text-red-500 mt-1 block">
                      {errors.postalCode}
                    </div>
                  )}
                </div>
              </div>
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
                  {/* Airwallex Drop-in Element Container */}
                  <div id="airwallex-dropin-container" className="w-full" />
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
            <div className="flex w-fullitems-end gap-2 relative flex-[0_0_auto]">
              <img
                className="relative w-6 h-6"
                alt="Lock"
                src="https://c.animaapp.com/m8tqwcaxIEhNf6/img/lock.png"
              />
              <p className="relative w-full mr-[-2.00px] [font-family:'Montserrat',Helvetica] font-medium text-formash text-base tracking-[0] leading-[normal]">
                All transactions are secure and encrypted
              </p>
            </div>
            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-[34px] relative self-stretch w-full flex-[0_0_auto]">
              <Link href="/us/terms/warranty">
                <div className="underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Warranty
                </div>
              </Link>
              <Link href="/us/terms/refund-policy">
                <div className="underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Refund policy
                </div>
              </Link>
              <Link href="/us/terms/terms-of-service">
                <div className="underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Terms of service
                </div>
              </Link>
              <Link href="/us/terms/privacy-policy">
                <div className="underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Privacy policy
                </div>
              </Link>
            </div>
          </div>
          {/* Order Summary */}
          <div className="w-full lg:w-2/5 flex flex-col items-start gap-5 px-2.5 lg:sticky lg:top-0">
            <div className="flex flex-col items-start gap-5 p-5 relative self-stretch w-full bg-[#efefef] rounded-[20px] shadow-shadow-relaxure-button">
              <div className="inline-flex items-center relative flex-[0_0_auto]">
                <div className="mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[22px] leading-[30.8px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                  Order Summary
                </div>
              </div>
              <div className="flex flex-col w-full items-center gap-10 relative mr-[-1.00px]">
                <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto] mb-[-5.00px]">
                  <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                    {cart?.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-start gap-[30px] relative self-stretch w-full flex-[0_0_auto]"
                      >
                        {/* Order items */}
                        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                          <div className="flex w-full items-center gap-2.5 relative max-w-full">
                            <div className="w-full break-words relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-normal overflow-wrap break-word">
                              {item.quantity} x {item.variant_title}
                            </div>
                          </div>
                          <div className="relative  [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-base tracking-[0] leading-[22.4px] whitespace-nowrap">
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
      </div>
      {/* Footer */}
      <FooterDark />
    </div>
  )
}
