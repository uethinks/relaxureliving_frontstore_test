"use client"
import { useCart } from "@lib/context/cartContext"
import React, { useState, useEffect, useCallback } from "react"
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
import { PaymentFinish } from "@modules/checkout/page/components/paymentFinish"

export const Checkout = () => {
  const { cart, setCart, getCart } = useCart()
  const [isFormValid, setIsFormValid] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [formData, setFormData] = useState({
    email: "",
    shipping_address: {
      first_name: "",
      last_name: "",
      address_1: "",
      city: "",
      province: "",
      postal_code: "",
      phone: "",
      country_code: "us",
    },
  })
  const [validationTimeout, setValidationTimeout] =
    useState<NodeJS.Timeout | null>(null)
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
  const [isLoading, setIsLoading] = useState(false)

  // 初始化 formData
  useEffect(() => {
    if (cart) {
      setFormData({
        email: cart.email ?? "",
        shipping_address: {
          first_name: cart.shipping_address?.first_name ?? "",
          last_name: cart.shipping_address?.last_name ?? "",
          address_1: cart.shipping_address?.address_1 ?? "",
          city: cart.shipping_address?.city ?? "",
          province: cart.shipping_address?.province ?? "",
          postal_code: cart.shipping_address?.postal_code ?? "",
          phone: cart.shipping_address?.phone ?? "",
          country_code: cart.shipping_address?.country_code ?? "us",
        },
      })
    }
  }, [cart])

  // 修改防抖验证函数
  const debouncedValidateForm = useCallback(() => {
    if (validationTimeout) {
      clearTimeout(validationTimeout)
    }

    const timeout = setTimeout(() => {
      const newErrors = { ...errors }
      let hasError = false

      // Email validation
      const email = formData.email?.trim() ?? ""
      if (!email) {
        newErrors.email = "Email is required"
        hasError = true
      } else {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!emailRegex.test(email)) {
          newErrors.email = "Please enter a valid email address"
          hasError = true
        } else {
          newErrors.email = ""
        }
      }

      // Phone validation
      const phone = formData.shipping_address.phone?.trim() ?? ""
      if (!phone) {
        newErrors.phone = "Phone number is required"
        hasError = true
      } else {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/
        if (!phoneRegex.test(phone)) {
          newErrors.phone = "Please enter a valid phone number"
          hasError = true
        } else {
          newErrors.phone = ""
        }
      }

      // Required fields validation
      if (!formData.shipping_address.first_name?.trim()) {
        newErrors.firstName = "First name is required"
        hasError = true
      } else {
        newErrors.firstName = ""
      }

      if (!formData.shipping_address.last_name?.trim()) {
        newErrors.lastName = "Last name is required"
        hasError = true
      } else {
        newErrors.lastName = ""
      }

      if (!formData.shipping_address.address_1?.trim()) {
        newErrors.address = "Address is required"
        hasError = true
      } else {
        newErrors.address = ""
      }

      if (!formData.shipping_address.city?.trim()) {
        newErrors.city = "City is required"
        hasError = true
      } else {
        newErrors.city = ""
      }

      if (!formData.shipping_address.province?.trim()) {
        newErrors.province = "State is required"
        hasError = true
      } else {
        newErrors.province = ""
      }

      if (!formData.shipping_address.postal_code?.trim()) {
        newErrors.postalCode = "ZIP code is required"
        hasError = true
      } else {
        newErrors.postalCode = ""
      }

      // 只在错误状态发生变化时更新状态
      if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
        setErrors(newErrors)
        setIsFormValid(!hasError)
      }
    }, 500)

    setValidationTimeout(timeout)
  }, [formData, errors])

  // 修改输入处理函数
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData }
      if (field === "email") {
        newFormData.email = value
      } else if (field.startsWith("shipping_")) {
        const addressField = field.replace("shipping_", "")
        if (addressField in newFormData.shipping_address) {
          ;(newFormData.shipping_address as any)[addressField] = value
        }
      }
      return newFormData
    })
  }, [])

  // 监听表单变化
  useEffect(() => {
    debouncedValidateForm()
    return () => {
      if (validationTimeout) {
        clearTimeout(validationTimeout)
      }
    }
  }, [formData, debouncedValidateForm])

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (validationTimeout) {
        clearTimeout(validationTimeout)
      }
    }
  }, [validationTimeout])

  // 初始化购物车
  const initializeCart = async () => {
    try {
      // 1. 首先获取购物车
      const currentCart = await getCart()
      if (!currentCart) return null

      // 2. 更新购物车状态
      setCart(currentCart)

      // 3. 获取配送选项
      const shippingMethods = await listCartShippingMethods(currentCart.id)
      await setShippingMethod({
        cartId: currentCart?.id ?? "",
        shippingMethodId: shippingMethods?.[0]?.id ?? "",
      })
    } catch (error) {
      console.error("Error initializing cart:", error)
    }
  }
  //初始化paymentSession
  const initializePaymentSession = async () => {
    const paymentSession = await initiatePaymentSession(cart as StoreCart, {
      provider_id: "pp_Airwallex_Airwallex",
      data: {
        amount: cart?.total,
        currency: cart?.currency_code,
        merchant_order_id: cart?.id,
        customer: {
          email: formData.email,
          first_name: formData.shipping_address.first_name,
          last_name: formData.shipping_address.last_name,
          phone_number: formData.shipping_address.phone,
        },
        order: {
          products: cart?.items?.map((item) => ({
            code: item?.product?.id,
            name: item?.product?.title,
            quantity: item?.quantity,
            unit_price: item?.unit_price,
          })),
          shipping: {
            address: {
              country_code: formData.shipping_address.country_code,
              state: formData.shipping_address.province,
              city: formData.shipping_address.city,
              street: formData.shipping_address.address_1,
              postcode: formData.shipping_address.postal_code,
            },
            first_name: formData.shipping_address.first_name,
            last_name: formData.shipping_address.last_name,
            email: formData.email,
            phone_number: formData.shipping_address.phone,
            shipping_method: "standard",
          },
          type: "physical_goods",
        },
      },
    })
    return paymentSession
  }
  // airwallex 初始化
  const setupAirwallex = async (paymentSession: any) => {
    const { payments } = await init({
      env: process.env.NEXT_PUBLIC_AIRWALLEX_ENV as
        | "dev"
        | "staging"
        | "demo"
        | "prod",
      enabledElements: ["payments"],
    })

    if (!payments) {
      throw new Error("Failed to initialize Airwallex payments")
    }
    // 6. 创建 Drop-in Element
    const element = await payments.createElement("dropIn", {
      intent_id: paymentSession.payment_collection?.payment_sessions?.[0]?.data
        ?.payment_intent_id as string,
      client_secret: paymentSession.payment_collection?.payment_sessions?.[0]
        ?.data?.client_secret as string,
      currency: cart?.currency_code?.toUpperCase() || "USD",
    })
    // 7. 挂载 Drop-in Element
    const container = document.getElementById("airwallex-dropin-container")
    if (container) {
      element?.mount(container)
    }
    // 8. 监听事件
    element?.on("success", (event: any) => {
      handlePaymentComplete()
    })

    element?.on("error", (event: any) => {
      console.error("Payment failed:", event)
    })

    element?.on("ready", () => {
      console.log("Drop-in element is ready")
    })
  }
  // 初始化 paymentinfo
  const initializePaymentInfo = async () => {
    // 4. 初始化 Airwallex SDK - 只在客户端执行
    if (typeof window !== "undefined") {
      // 5. 初始化支付会话
      const paymentSession = await initializePaymentSession()
      // airwallex 初始化
      setupAirwallex(paymentSession)
    }
  }

  useEffect(() => {
    initializeCart()
  }, [])

  // 添加一个 ref 来存储最新的 formData
  const formDataRef = React.useRef(formData)

  // 更新 ref 当 formData 变化时
  React.useEffect(() => {
    formDataRef.current = formData
  }, [formData])

  // 修改 handlePaymentComplete 使用 ref
  const handlePaymentComplete = async () => {
    if (cart) {
      // Update cart with form data before placing order
      await updateCart({
        email: formDataRef.current.email,
        shipping_address: formDataRef.current.shipping_address,
      })

      const cartRes = await placeOrder(cart.id)
      setOrder(cartRes.type === "order" ? cartRes.order : null)
    }
  }
  const [showPayment, setShowPayment] = useState(false)
  const handleContinue = async () => {
    if (isFormValid) {
      setIsLoading(true)
      try {
        await initializePaymentInfo()
        setShowPayment(true)
      } catch (error) {
        console.error("Error initializing payment:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setShowPayment(false)
    }
  }

  return (
    <div className="w-full 2xl:w-[1512px] bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex justify-center flex-col items-center">
      <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full relative px-5 lg:px-20">
        {/* Header */}
        <NavBarWrapper isFixed={false} />

        {/* Payment Title */}
        <div className="w-full inline-flex items-center justify-start gap-2.5 p-2.5">
          <div className="mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative w-fit text-[#343a40] tracking-[var(--heading-2-letter-spacing)] whitespace-nowrap [font-style:var(--heading-2-font-style)]">
            Payment
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse justify-start items-center lg:flex-row lg:justify-between lg:items-start w-full gap-5">
          {/* Payment Form */}
          <div className="w-full lg:w-3/5 flex flex-col items-start justify-end gap-10 p-5 lg:p-10 bg-[#efefef] rounded-[20px]">
            <div className="flex flex-col lg:flex-row items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {/* Email Input */}
              <div className="flex flex-col w-full">
                <input
                  className=" flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Inter',Helvetica] pl-[15px]"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange("email", e.target.value)
                  }}
                />
                {errors.email && (
                  <div className="text-red-500 mt-1 block">{errors.email}</div>
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

              {/* Name Inputs */}
              <div className="flex items-center gap-[39px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col md:flex-row w-full items-start gap-5 relative">
                  <div className="flex flex-col w-full md:w-1/2">
                    <input
                      className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
                      placeholder="First name"
                      type="text"
                      value={formData.shipping_address.first_name}
                      onChange={(e) =>
                        handleInputChange("shipping_first_name", e.target.value)
                      }
                    />
                    {errors.firstName && (
                      <div className="text-red-500 mt-1 block">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <input
                      className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
                      placeholder="Last name"
                      type="text"
                      value={formData.shipping_address.last_name}
                      onChange={(e) =>
                        handleInputChange("shipping_last_name", e.target.value)
                      }
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
                  className=" flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Montserrat',Helvetica] pl-[15px]"
                  placeholder="Address"
                  type="text"
                  value={formData.shipping_address.address_1}
                  onChange={(e) =>
                    handleInputChange("shipping_address_1", e.target.value)
                  }
                />
                {errors.address && (
                  <div className="text-red-500 mt-1 block">
                    {errors.address}
                  </div>
                )}
              </div>
              {/* City, State, ZIP Inputs */}
              <div className="flex w-full flex-col md:flex-row md:items-center gap-2 relative flex-[0_0_auto]">
                <div className="flex flex-col w-full md:w-1/3">
                  <input
                    className=" flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
                    placeholder="City"
                    type="text"
                    value={formData.shipping_address.city}
                    onChange={(e) =>
                      handleInputChange("shipping_city", e.target.value)
                    }
                  />
                  {errors.city && (
                    <div className="text-red-500 mt-1 block">{errors.city}</div>
                  )}
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <input
                    className=" flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
                    placeholder="State"
                    type="text"
                    value={formData.shipping_address.province}
                    onChange={(e) =>
                      handleInputChange("shipping_province", e.target.value)
                    }
                  />
                  {errors.province && (
                    <div className="text-red-500 mt-1 block">
                      {errors.province}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <input
                    className=" flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
                    placeholder="ZIP code"
                    type="text"
                    value={formData.shipping_address.postal_code}
                    onChange={(e) =>
                      handleInputChange("shipping_postal_code", e.target.value)
                    }
                  />
                  {errors.postalCode && (
                    <div className="text-red-500 mt-1 block">
                      {errors.postalCode}
                    </div>
                  )}
                </div>
              </div>
              {/* Phone Input */}
              <div className="flex flex-col w-full">
                <input
                  className=" flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Montserrat',Helvetica] pl-[15px]"
                  placeholder="Phone"
                  type="tel"
                  value={formData.shipping_address.phone}
                  onChange={(e) =>
                    handleInputChange("shipping_phone", e.target.value)
                  }
                />
                {errors.phone && (
                  <div className="text-red-500 mt-1 block">{errors.phone}</div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="w-full hover:bg-[#0a3980] bg-[#072f6c] all-[unset] box-border flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[#ffffff] relative font-medium whitespace-nowrap leading-6">
                        Processing...
                      </span>
                    </div>
                  ) : (
                    <span className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[#ffffff] relative font-medium whitespace-nowrap leading-6">
                      Continue
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Payment Section */}
            <div
              className={`flex flex-col items-start gap-[70px] relative self-stretch w-full flex-[0_0_auto] ${
                showPayment && isFormValid ? "opacity-100" : "opacity-50"
              }`}
            >
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
          <div className="w-full lg:max-w-[470px] flex flex-col items-start gap-5 lg:px-2.5 lg:sticky lg:top-10">
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
                    <div className="flex items-end justify-start gap-4">
                      <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[28px] leading-[32px] whitespace-nowrap relative tracking-[0]">
                        ${cart?.total}
                      </div>
                      {cart?.discount_total &&
                        cart?.discount_total > 0 &&
                        cart?.original_total && (
                          <div className="flex items-center gap-2">
                            <div className="w-fit [font-family:'Montserrat',Helvetica] font-medium text-[12px] leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through">
                              ${cart.original_total}
                            </div>
                            <div className="[font-family:'Montserrat',Helvetica] px-2 py-0.5 bg-[#e9ecef] rounded-full flex items-center justify-center">
                              <span className="text-[12px] font-normal text-[red]">
                                Save{" "}
                                {Math.round(
                                  (cart.discount_total / cart.original_total) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        )}
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
      {order && <PaymentFinish order={order} />}
    </div>
  )
}
