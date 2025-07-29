"use client"
import { useCart } from "@lib/context/cartContext"
import React, { useState, useEffect, useCallback } from "react"
import { StoreCart, StoreOrder } from "@medusajs/types"
import {
  updateCart,
  placeOrder,
  setShippingMethod,
  initiatePaymentSession,
  addPromotionCode,
} from "@lib/data/cart"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import Link from "next/link"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { OceanPaymentForm } from "./components/OceanPaymentForm"
import Breadcrumb from "@/components/Breadcrumb"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

type ShippingAddress = {
  first_name: string
  last_name: string
  address_1: string
  city: string
  province: string
  postal_code: string
  phone: string
  country_code: string
}

type FormData = {
  email: string
  shipping_address: ShippingAddress
}

function reportToGA(eventName: string, value: any) {
  if (window.gtag) {
    window.gtag("event", eventName, value)
  }
}

export const Checkout = () => {
  const { cart, getCart } = useCart()
  const [promotionCode, setPromotionCode] = useState("")
  const [isApplyingPromotion, setIsApplyingPromotion] = useState(false)
  const [promotionError, setPromotionError] = useState("")
  const [promotionSuccess, setPromotionSuccess] = useState("")
  const [appliedPromotions, setAppliedPromotions] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    email: "",
    shipping_address: {
      first_name: "",
      last_name: "",
      address_1: "",
      city: "",
      province: "",
      postal_code: "",
      phone: "",
      country_code: defaultCountryCode,
    },
  })
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

  const handleFieldChange = useCallback(
    (field: keyof FormData | keyof ShippingAddress, value: string) => {
      setFormData((prev) => {
        if (field === "email") {
          return { ...prev, email: value }
        }
        return {
          ...prev,
          shipping_address: { ...prev.shipping_address, [field]: value },
        }
      })
    },
    []
  )

  // 验证邮箱格式
  const validateEmail = (email: string): string => {
    if (!email) {
      return "Email is required"
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  // 验证电话号码格式
  const validatePhone = (phone: string): string => {
    if (!phone) {
      return "Phone number is required"
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number"
    }
    return ""
  }

  // 验证必填字段
  const validateRequiredField = (value: string, fieldName: string): string => {
    if (!value?.trim()) {
      return `${fieldName} is required`
    }
    return ""
  }

  // 验证地址字段
  const validateAddressFields = (): Record<string, string> => {
    const addressErrors: Record<string, string> = {}

    addressErrors.firstName = validateRequiredField(
      formData.shipping_address.first_name,
      "First name"
    )
    addressErrors.lastName = validateRequiredField(
      formData.shipping_address.last_name,
      "Last name"
    )
    addressErrors.address = validateRequiredField(
      formData.shipping_address.address_1,
      "Address"
    )
    addressErrors.city = validateRequiredField(
      formData.shipping_address.city,
      "City"
    )
    addressErrors.province = validateRequiredField(
      formData.shipping_address.province,
      "State"
    )
    addressErrors.postalCode = validateRequiredField(
      formData.shipping_address.postal_code,
      "ZIP code"
    )

    return addressErrors
  }

  //提交时验证
  const validateForm = () => {
    const newErrors = { ...errors }
    let hasError = false

    // 验证邮箱
    const emailError = validateEmail(formData.email?.trim() ?? "")
    if (emailError) {
      newErrors.email = emailError
      hasError = true
    } else {
      newErrors.email = ""
    }

    // 验证电话
    const phoneError = validatePhone(
      formData.shipping_address.phone?.trim() ?? ""
    )
    if (phoneError) {
      newErrors.phone = phoneError
      hasError = true
    } else {
      newErrors.phone = ""
    }

    // 验证地址字段
    const addressErrors = validateAddressFields()
    Object.entries(addressErrors).forEach(([key, error]) => {
      if (error) {
        newErrors[key as keyof typeof newErrors] = error
        hasError = true
      } else {
        newErrors[key as keyof typeof newErrors] = ""
      }
    })

    setErrors(newErrors)
    return !hasError
  }

  // 初始化购物车
  const initializeCart = async () => {
    try {
      if (!cart) {
        console.error("Cart is not initialized")
        return
      }

      // 获取配送选项
      const shippingMethods = await listCartShippingMethods(cart.id)
      if (!shippingMethods?.length) {
        console.error("No shipping methods available")
        return
      }

      // 设置配送方式
      await setShippingMethod({
        cartId: cart.id,
        shippingMethodId: shippingMethods[0].id,
      })

      // 初始化支付会话
      await initializePaymentSession()
    } catch (error) {
      console.error("Error initializing cart:", error)
    }
  }

  // 监听购物车变化，当购物车加载完成后初始化
  useEffect(() => {
    if (cart) {
      initializeCart()
    }
  }, [cart])

  // 初始化已应用的优惠码
  useEffect(() => {
    if (cart?.promotions && cart.promotions.length > 0) {
      // 从购物车的promotions数组中提取优惠码，过滤掉undefined值
      const promotionCodes = cart.promotions
        .map((promo) => promo.code)
        .filter((code): code is string => code !== undefined)
      setAppliedPromotions(promotionCodes)
    } else {
      setAppliedPromotions([])
    }
  }, [cart?.promotions])

  //初始化paymentSession
  const initializePaymentSession = async () => {
    const paymentProvider =
      process.env.NEXT_PUBLIC_PROVIDER_PAYMENT_ID ||
      "pp_OceanPayment_OceanPayment"

    const paymentSession = await initiatePaymentSession(cart as StoreCart, {
      provider_id: paymentProvider,
      data: {
        cart_id: cart?.id,
      },
    })
    return paymentSession
  }

  const updateCartDeliveryInfo = async (): Promise<StoreCart | null> => {
    if (cart) {
      // Update cart with form data before placing order
      return await updateCart({
        email: formData.email,
        shipping_address: formData.shipping_address,
      })
    }
    return null
  }

  const getPromotionDetails = (code: string) => {
    if (!cart?.promotions) {
      return null
    }
    return cart.promotions.find((promo) => promo.code === code)
  }

  const formatDiscountAmount = (promotion: any) => {
    if (promotion?.application_method?.type === "fixed") {
      return `$${promotion.application_method.value}`
    } else if (promotion?.application_method?.type === "percentage") {
      return `${promotion.application_method.value}%`
    }
    return ""
  }

  const applyPromotionCode = async () => {
    if (!promotionCode.trim() || !cart?.id) {
      setPromotionError("Please enter a valid promotion code")
      return
    }

    // 检查是否已经应用过这个优惠码
    if (appliedPromotions.includes(promotionCode.trim().toUpperCase())) {
      setPromotionError("This promotion code has already been applied")
      return
    }

    setIsApplyingPromotion(true)
    setPromotionError("")
    setPromotionSuccess("")

    try {
      await addPromotionCode(cart.id, [promotionCode.trim()])
      setPromotionSuccess("Promotion code applied successfully!")
      setPromotionCode("")
      // 重新获取购物车数据以更新折扣信息和已应用的优惠码
      await getCart()
    } catch (error: any) {
      setPromotionError(
        error?.response?.data?.message || "Failed to apply promotion code"
      )
    } finally {
      setIsApplyingPromotion(false)
    }
  }

  const comlpeleCartAndCreateOrder = async (): Promise<StoreOrder | null> => {
    if (cart) {
      const cartRes = await placeOrder(cart.id)
      if (cartRes.type === "order") {
        return cartRes.order
      }
    }
    return null
  }

  return (
    <div className="w-full 2xl:w-[1512px] bg-[#ffffff] [font-family:'Montserrat',Helvetica] flex justify-center flex-col items-center">
      <div className="flex flex-col items-center mb-5 bg-[#ffffff] w-full relative px-5 lg:px-20">
        {/* Header */}
        <NavBarWrapper isFixed={false} />

        {/* Payment Title */}
        <div className="w-full inline-flex items-center justify-start gap-2.5 p-2.5">
          <div
            className={`mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] 
                          text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] 
                          relative w-fit text-[#343a40] tracking-[var(--heading-2-letter-spacing)] 
                          whitespace-nowrap [font-style:var(--heading-2-font-style)]`}
          >
            Payment
          </div>
        </div>
        <Breadcrumb steps={["Cart", "Information", "Payment"]} current={2} />
        <div className="mt-10 flex flex-col-reverse justify-start items-center lg:flex-row lg:justify-between lg:items-start w-full gap-5">
          {/* Payment Form */}
          <div className="w-full lg:w-3/5 flex flex-col items-start justify-end gap-10 p-5 lg:p-10 bg-[#efefef] rounded-[20px]">
            <div className="flex flex-col lg:flex-row items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {/* Email Input */}
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-sm text-gray-600">Email</label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  className={`flex-1 grow focus:outline-none border border-solid border-[#d8dadc] 
                    px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] 
                    text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch 
                    [font-family:'Inter',Helvetica] pl-[15px]`}
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={(e) =>
                    reportToGA("input_email", { email: e.target.value })
                  }
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
                  <div
                    className={`mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-lg 
                    leading-[25.2px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap`}
                  >
                    Delivery
                  </div>
                </div>
                {/* Country Selector */}
                <div className="flex flex-col items-start gap-3 relative w-full self-stretch flex-[0_0_auto]">
                  <div
                    className={`border-[#d8dadc] text-[#8d9299] flex flex-col items-center 
                            flex-[0_0_auto] px-[14.53px] py-[16.34px] w-full rounded-[9.08px] gap-[9.08px] bg-[#ffffff] border border-solid self-stretch`}
                  >
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
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-sm text-gray-600">
                        First name
                      </label>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      className={`focus:outline-none border border-solid border-[#d8dadc] 
                        px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative 
                        tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] 
                        [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow`}
                      placeholder="First name"
                      type="text"
                      value={formData.shipping_address.first_name}
                      onChange={(e) =>
                        handleFieldChange("first_name", e.target.value)
                      }
                    />
                    {errors.firstName && (
                      <div className="text-red-500 mt-1 block">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-sm text-gray-600">Last name</label>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      className={`focus:outline-none border border-solid border-[#d8dadc] 
                        px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative 
                        tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] 
                        [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow`}
                      placeholder="Last name"
                      type="text"
                      value={formData.shipping_address.last_name}
                      onChange={(e) =>
                        handleFieldChange("last_name", e.target.value)
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
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-sm text-gray-600">Address</label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  className={`flex-1 grow focus:outline-none border border-solid border-[#d8dadc] 
                    px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] 
                    text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch 
                    [font-family:'Montserrat',Helvetica] pl-[15px]`}
                  placeholder="Address"
                  type="text"
                  value={formData.shipping_address.address_1}
                  onChange={(e) =>
                    handleFieldChange("address_1", e.target.value)
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
                  <div className="flex items-center gap-1 mb-1">
                    <label className="text-sm text-gray-600">City</label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    className={`flex-1 grow focus:outline-none border border-solid border-[#d8dadc] 
                      px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] 
                      text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] 
                      [font-family:'Montserrat',Helvetica] pl-3.5`}
                    placeholder="City"
                    type="text"
                    value={formData.shipping_address.city}
                    onChange={(e) => handleFieldChange("city", e.target.value)}
                  />
                  {errors.city && (
                    <div className="text-red-500 mt-1 block">{errors.city}</div>
                  )}
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <div className="flex items-center gap-1 mb-1">
                    <label className="text-sm text-gray-600">State</label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    className={`flex-1 grow focus:outline-none border border-solid border-[#d8dadc] 
                      px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] 
                      text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] 
                      [font-family:'Montserrat',Helvetica] pl-3.5`}
                    placeholder="State"
                    type="text"
                    value={formData.shipping_address.province}
                    onChange={(e) =>
                      handleFieldChange("province", e.target.value)
                    }
                  />
                  {errors.province && (
                    <div className="text-red-500 mt-1 block">
                      {errors.province}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <div className="flex items-center gap-1 mb-1">
                    <label className="text-sm text-gray-600">ZIP code</label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    className={`flex-1 grow focus:outline-none border border-solid border-[#d8dadc] 
                      px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] 
                      text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] 
                      [font-family:'Montserrat',Helvetica] pl-3.5`}
                    placeholder="ZIP code"
                    type="text"
                    value={formData.shipping_address.postal_code}
                    onChange={(e) =>
                      handleFieldChange("postal_code", e.target.value)
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
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-sm text-gray-600">Phone</label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  className={`
                    flex-1 grow focus:outline-none border border-solid border-[#d8dadc] 
                    px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative 
                    tracking-[0] text-base text-[#8d9299] h-[18px] font-normal 
                    leading-[17.6px] w-full self-stretch [font-family:'Inter',Helvetica] pl-[15px]
                  `}
                  placeholder="Phone"
                  type="tel"
                  value={formData.shipping_address.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  onBlur={(e) =>
                    reportToGA("input_phone", { phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <div className="text-red-500 mt-1 block">{errors.phone}</div>
                )}
              </div>
            </div>

            {/* Payment Section */}
            <div
              className={`flex flex-col items-start gap-[70px] relative self-stretch w-full flex-[0_0_auto]`}
            >
              <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-center relative self-stretch w-full flex-[0_0_auto]">
                    <div className="inline-flex items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
                      <div
                        className={`mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-lg 
                          leading-[25.2px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap`}
                      >
                        Payment
                      </div>
                    </div>
                  </div>
                  <OceanPaymentForm
                    deliveryInfo={formData}
                    updateCartDeliveryInfo={updateCartDeliveryInfo}
                    formValidation={validateForm}
                    comlpeleCartAndCreateOrder={comlpeleCartAndCreateOrder}
                  />
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
              <Link href="/terms/warranty">
                <div
                  className={`underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] 
                  font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}
                >
                  Warranty
                </div>
              </Link>
              <Link href="/terms/refund-policy">
                <div
                  className={`underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] 
                  font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}
                >
                  Refund policy
                </div>
              </Link>
              <Link href="/terms/terms-of-service">
                <div
                  className={`underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] 
                  font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}
                >
                  Terms of service
                </div>
              </Link>
              <Link href="/terms/privacy-policy">
                <div
                  className={`underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] 
                  font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}
                >
                  Privacy policy
                </div>
              </Link>
            </div>
          </div>
          {/* Order Summary */}
          <div className="w-full lg:max-w-[470px] flex flex-col items-start gap-5 lg:px-2.5 lg:sticky lg:top-10">
            <div className="flex flex-col items-start gap-5 p-5 relative self-stretch w-full bg-[#efefef] rounded-[20px] shadow-shadow-relaxure-button">
              <div className="inline-flex items-center relative flex-[0_0_auto]">
                <div
                  className={`mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[22px] 
                  leading-[30.8px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap`}
                >
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
                            <div
                              className={`w-full break-words relative mt-[-1.00px] 
                              [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base 
                              tracking-[0] leading-6 whitespace-normal overflow-wrap break-word`}
                            >
                              {item.quantity} x {item.variant_title}
                            </div>
                          </div>
                          <div className="relative  [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-base tracking-[0] leading-[22.4px] whitespace-nowrap">
                            ${Number(item.total ?? 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="relative self-stretch w-full h-0.5 bg-[#d9d9d9] rounded-[10px]" />
                  </div>
                  {/* Promotion Code Input */}
                  <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
                      <input
                        className={`flex-1 grow focus:outline-none border border-solid border-[#d8dadc] 
                          px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] 
                          text-base text-[#343a40] h-[18px] font-normal leading-[17.6px] 
                          [font-family:'Montserrat',Helvetica] pl-3`}
                        placeholder="Enter promotion code"
                        type="text"
                        value={promotionCode}
                        onChange={(e) => setPromotionCode(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            applyPromotionCode()
                          }
                        }}
                      />
                      <button
                        onClick={applyPromotionCode}
                        disabled={isApplyingPromotion || !promotionCode.trim()}
                        className={`p-3 bg-[#343a40] text-white rounded-[9.08px] font-medium text-sm 
                                  hover:bg-[#495057] disabled:bg-[#6c757d] disabled:cursor-not-allowed 
                                  transition-colors duration-200 [font-family:'Montserrat',Helvetica]`}
                      >
                        Apply
                      </button>
                    </div>

                    {/* Applied Promotions Display */}
                    {appliedPromotions.length > 0 && (
                      <div className="flex flex-col gap-2 w-full">
                        <div className="text-sm font-medium text-[#343a40] [font-family:'Montserrat',Helvetica]">
                          Applied Promotions:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {appliedPromotions.map((code, index) => {
                            const promotionDetails = getPromotionDetails(code)
                            const discountAmount = promotionDetails
                              ? formatDiscountAmount(promotionDetails)
                              : ""
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm [font-family:'Montserrat',Helvetica]"
                              >
                                <span>✓ {code}</span>
                                {discountAmount && (
                                  <span className="text-xs font-medium">
                                    ({discountAmount} off)
                                  </span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {promotionError && (
                      <div className="text-red-500 text-sm [font-family:'Montserrat',Helvetica]">
                        {promotionError}
                      </div>
                    )}
                    {promotionSuccess && (
                      <div className="text-green-500 text-sm [font-family:'Montserrat',Helvetica]">
                        {promotionSuccess}
                      </div>
                    )}
                  </div>

                  {/* Promotion Discount Display */}
                  {(cart?.discount_total ?? 0) > 0 && (
                    <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                        <div className="flex w-full items-center gap-2.5 relative max-w-full">
                          <div
                            className={`w-full break-words relative mt-[-1.00px] 
                            [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base 
                            tracking-[0] leading-6 whitespace-normal overflow-wrap break-word`}
                          >
                            Promotion Discount
                          </div>
                        </div>
                        <div className="relative [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-base tracking-[0] leading-[22.4px] whitespace-nowrap">
                          -${Number(cart?.discount_total ?? 0).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                  <div className="[font-family:'Montserrat',Helvetica] font-medium text-[22px] leading-[30.8px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                    Total
                  </div>
                  <div className="flex items-end justify-start gap-4">
                    <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[28px] leading-[32px] whitespace-nowrap relative tracking-[0]">
                      ${Number(cart?.total ?? 0).toFixed(2)}
                    </div>
                    {(cart?.discount_total ?? 0) > 0 &&
                      cart?.original_total && (
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-fit [font-family:'Montserrat',Helvetica] font-medium text-[12px] 
                            leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through`}
                          >
                            ${Number(cart.original_total ?? 0).toFixed(2)}
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
      {/* Footer */}
      <FooterDark />
    </div>
  )
}
