"use client"
import { useCart } from "@lib/context/cartContext"
import React, { useState, useEffect, useCallback } from "react"
import { HttpTypes, StoreCart, StoreOrder, StorePaymentCollectionResponse } from "@medusajs/types"
import {
  updateCart,
  placeOrder,
  setShippingMethod,
  initiatePaymentSession,
  addPromotionCode,
} from "@lib/data/cart"
// Airwallex SDK is now used in AirwallexPaymentForm component
import { listCartShippingMethods } from "@lib/data/fulfillment"
import Link from "next/link"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
//import { OceanPaymentForm } from "./components/OceanPaymentForm"
import Breadcrumb from "@/components/Breadcrumb" 
import AirwallexPaymentForm, { PaymentIntentBody } from "./components/AirwallexPaymentForm"
import { retrieveOrderByPaymentIntentId } from "@lib/data/orders"
import { set } from "lodash"

 

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

// Lightweight skeleton while payment intent is being prepared
const PaymentLoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full p-10 bg-white rounded-[14px] border border-[#e5e7eb] animate-pulse">
        {/* <div className="h-5 w-48 bg-gray-200 rounded mb-4" /> */}
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
        <div className="mt-6 h-12 bg-gray-300 rounded-lg" />
        {/* <div className="mt-3 h-3 w-1/3 bg-gray-200 rounded" /> */}
        <p className="mt-6 text-sm text-gray-500">
          Preparing secure payment…
        </p>
      </div>
      
    </div>
  )
}

function reportToGA(eventName: string, value: any) {
  if (window.gtag) {
    window.gtag("event", eventName, value)
  }
}

export const Checkout = () => {
  // This check works for both Server Components and Client Components
  if (typeof window === 'undefined') {
    console.log('Component is rendering on the server side.');
  } else {
    // For client components, you might want to use useEffect to ensure
    // the log only appears after hydration, if needed.
    useEffect(() => {
      console.log('Component is rendering on the client side.');
    }, []);
  }

  const { cart, getCart } = useCart()
  const [order, setOrder] = useState<any>(null)
  const [promotionCode, setPromotionCode] = useState("")
  const [isApplyingPromotion, setIsApplyingPromotion] = useState(false)
  const [promotionError, setPromotionError] = useState("")
  const [promotionSuccess, setPromotionSuccess] = useState("")
  const [appliedPromotions, setAppliedPromotions] = useState<string[]>([])
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntentBody>()
  const [isFormValid, setIsFormValid] = useState(false)
  const [isInitializingPayment, setIsInitializingPayment] = useState(false)
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
        const newData = field === "email" 
          ? { ...prev, email: value }
          : { ...prev, shipping_address: { ...prev.shipping_address, [field]: value } }
        
        // console.log("handleFieldChange field:", field, "value:", value, "newData", newData)
        
        // // 实时检查表单有效性
        // setTimeout(() => checkFormValidity(newData), 0)
        
        return newData
      })
    },
    []
   )

  const isFormFieldsValid = () => {
    
    const dataToCheck =  formData
    
    // 检查所有必填字段是否填写
    const isComplete = 
      dataToCheck.email?.trim() &&
      dataToCheck.shipping_address.first_name?.trim() &&
      dataToCheck.shipping_address.last_name?.trim() &&
      dataToCheck.shipping_address.address_1?.trim() &&
      dataToCheck.shipping_address.city?.trim() &&
      dataToCheck.shipping_address.province?.trim() &&
      dataToCheck.shipping_address.postal_code?.trim() &&
      dataToCheck.shipping_address.phone?.trim()
    
    // 检查格式是否正确
    const emailValid = !dataToCheck.email || validateEmail(dataToCheck.email?.trim() ?? "") === ""
    const phoneValid = !dataToCheck.shipping_address.phone || validatePhone(dataToCheck.shipping_address.phone?.trim() ?? "") === ""
    
    const isValid = Boolean(isComplete && emailValid && phoneValid)
    return isValid
  }
   

  // 检查表单是否完整且有效
  const checkFormValidity = useCallback(async (formDataToCheck?: FormData) => {

    const dataToCheck = formDataToCheck || formData
    const isValid = isFormFieldsValid()
    console.log("表单验证结果 isValid", isValid)
    setIsFormValid(isValid)
    if (isValid) {
      console.log("表单验证通过，开始初始化支付会话 isInitializingPayment", isInitializingPayment)
      await updateCartDeliveryInfo(formData)
      if (!isInitializingPayment) {
        initializePaymentSession()
      }      
    } 
    return isValid
  }, [formData, cart])
  
  // // 监听购物车促销信息变化，如果表单有效则重新初始化支付会话
  // useEffect(() => {
  //   if (isFormValid && cart?.promotions !== undefined) {
  //     console.log("促销信息变化，重新初始化支付会话")
  //     setPaymentIntent(undefined) // 清除旧的paymentIntent
  //     initializePaymentSession()
  //   }
  // }, [cart?.promotions, cart?.total, isFormValid])

  // 监听表单数据变化，实时检查有效性
  useEffect(() => {
    checkFormValidity()
  }, [formData])

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
  //https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
  const validatePhone = (phone: string): string => {
    if (!phone) {
      return "Phone number is required"
    }
    //const phoneRegex = /^\+?[1-9]\d{1,14}$/
    const phoneRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
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
    setErrors(newErrors)
    const isValid = !hasError
    setIsFormValid(isValid)
    
    // 如果表单有效且没有支付会话，则初始化
    // if (isValid && !paymentIntent && cart) {
    //   initializePaymentSession()
    // }
    
    return isValid
  }

  // 初始化购物车配送方法（不包含支付会话）
  const initializeCartShipping = async () => {
    try {
      if (!cart) {
        console.error("Cart is not initialized")
        return
      }
      console.log("initializeCartShipping - cart", cart, new Date().toISOString())

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
    } catch (error) {
      console.error("Error initializing cart shipping:", error)
    }
  }

  // 初始化支付会话（在表单验证通过后调用） 这个只调用一次 当所有表单字段都有填写
  const initializePaymentSession = async () => {

    if (!cart) {      
      return
    }
    
    setIsInitializingPayment(true)
    try {
      console.log("initializePaymentSession - start", new Date().toISOString())
      // 先更新购物车配送信息
      
      
      // 重新获取购物车以获取最新的总金额
      const updatedCart = await getCart()
      
      const paymentProvider = process.env.NEXT_PUBLIC_PROVIDER_PAYMENT_ID || "pp_Airwallex_Airwallex"
      
      // 使用更新后的购物车数据
      const cartToUse =  updatedCart || cart
      console.log("initializePaymentSession - cartToUse", cartToUse, "total", cartToUse?.total, "discount_total", cartToUse?.discount_total)
      
      const paymentSession = await initiatePaymentSession(cartToUse as StoreCart, {
        provider_id: paymentProvider,
        data: {
          cart_id: cartToUse?.id,
          total: cartToUse?.total,
          original_total: cartToUse?.original_total,
          currency: cartToUse?.region?.currency_code,        
          shipping_address: cartToUse?.shipping_address,
          products: cartToUse?.items?.map(item => ({            
            name: item.variant_title,
            quantity: item.quantity,
            unit_price: item.unit_price,
          }) ),
        },
      }) as StorePaymentCollectionResponse
      
      console.log("initializePaymentSession - paymentSession", paymentSession, new Date().toISOString())
      
      let paymentSessions = paymentSession.payment_collection?.payment_sessions
      if (paymentSessions && paymentSessions.length > 0) {
        const sessionData = paymentSessions[0].data
        if (sessionData && typeof sessionData === 'object' && 'amount' in sessionData) {
          console.log("initializePaymentSession - paymentIntent sessionData ", sessionData)
          setPaymentIntent(sessionData as PaymentIntentBody)
        }
      }
    } catch (error) {
      console.error("Error initializing payment session:", error)
    } finally {
      //setIsInitializingPayment(false)
    }
  }

  // 监听购物车变化，设置配送方法但不初始化支付会话
  useEffect(() => {
    if (cart) {
      initializeCartShipping()
    }
  }, [cart?.id])

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



  const updateCartDeliveryInfo = async (deliveryInfo?: FormData): Promise<StoreCart | null> => {
    if (cart) {
      // Use passed deliveryInfo if provided, otherwise fall back to local formData
      const infoToUse = deliveryInfo || formData;
      // Update cart with delivery info before placing order
      console.log("updateCartDeliveryInfo cart id:", cart.id, "email:", infoToUse.email, "shipping_address", infoToUse.shipping_address)
      return await updateCart({
        email: infoToUse.email,
        shipping_address: infoToUse.shipping_address,
      })
    }
    return null
  }

  const getPromotionDetails = (code: string) => {
    if (!cart?.promotions) return null
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
      
      // 如果表单有效，重新初始化支付会话以使用新的总金额      
      if (isFormValid) {
        console.log("优惠码应用成功，重新初始化支付会话")
        setIsInitializingPayment(false)
        await initializePaymentSession()
      }
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
      console.log("comlpeleCartAndCreateOrder cart", cart)
      const cartRes = await placeOrder(cart.id)
      setOrder(cartRes.type === "order" ? cartRes.order : null)
      console.log("comlpeleCartAndCreateOrder cartRes", cartRes)
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
          <div className="mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative w-fit text-[#343a40] tracking-[var(--heading-2-letter-spacing)] whitespace-nowrap [font-style:var(--heading-2-font-style)]">
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
                  className="flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Inter',Helvetica] pl-[15px]"
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
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-sm text-gray-600">
                        First name
                      </label>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
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
                      className="focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5 flex-1 grow"
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
                  className="flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Montserrat',Helvetica] pl-[15px]"
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
                    className="flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
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
                    className="flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
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
                    className="flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3.5"
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
                  className="flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#8d9299] h-[18px] font-normal leading-[17.6px] w-full self-stretch [font-family:'Inter',Helvetica] pl-[15px]"
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
                      <div className="mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-lg leading-[25.2px] relative w-fit text-[#343a40] tracking-[0] whitespace-nowrap">
                        Payment
                      </div>
                    </div>
                  </div>
                  {/* <OceanPaymentForm
                    deliveryInfo={formData}
                    updateCartDeliveryInfo={updateCartDeliveryInfo}
                    formValidation={validateForm}
                    comlpeleCartAndCreateOrder={comlpeleCartAndCreateOrder}
                  /> */}

                  {/* 支付组件条件性显示 */}
                  
                  {!isFormValid ? (
                    <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 w-full">
                      <div className="text-gray-600 mb-2">
                        Please fill in all required delivery information above to proceed with payment
                      </div>
                      <div className="text-sm text-gray-500">
                        All fields marked with * are required
                      </div>
                    </div>
             
                  ) : paymentIntent ? (
                    <AirwallexPaymentForm
                      paymentIntent={paymentIntent}
                      formValidation={validateForm}
                      deliveryInfo={formData}
                      updateCartDeliveryInfo={updateCartDeliveryInfo}                      
                      comlpeleCartAndCreateOrder={comlpeleCartAndCreateOrder}
                    />                  
                  ) : <PaymentLoadingSkeleton />}

                </div>
              </div>
            </div>
            {/* Security Message */}
            {/* <div className="flex w-fullitems-end gap-2 relative flex-[0_0_auto]">
              <img
                className="relative w-6 h-6"
                alt="Lock"
                src="https://c.animaapp.com/m8tqwcaxIEhNf6/img/lock.png"
              />
              <p className="relative w-full mr-[-2.00px] [font-family:'Montserrat',Helvetica] font-medium text-formash text-base tracking-[0] leading-[normal]">
                All transactions are secure and encrypted
              </p>
            </div> */}
            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-[34px] relative self-stretch w-full flex-[0_0_auto]">
              <Link href="/terms/warranty">
                <div className="underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Warranty
                </div>
              </Link>
              <Link href="/terms/refund-policy">
                <div className="underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Refund policy
                </div>
              </Link>
              <Link href="/terms/terms-of-service">
                <div className="underline relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-[#343a40] text-sm text-center tracking-[-0.28px] leading-6 whitespace-nowrap">
                  Terms of service
                </div>
              </Link>
              <Link href="/terms/privacy-policy">
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
                        className="flex-1 grow focus:outline-none border border-solid border-[#d8dadc] px-[14.53px] py-[16.34px] rounded-[9.08px] bg-[#ffffff] relative tracking-[0] text-base text-[#343a40] h-[18px] font-normal leading-[17.6px] [font-family:'Montserrat',Helvetica] pl-3"
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
                        className="p-3 bg-[#343a40] text-white rounded-[9.08px] font-medium text-sm hover:bg-[#495057] disabled:bg-[#6c757d] disabled:cursor-not-allowed transition-colors duration-200 [font-family:'Montserrat',Helvetica]"
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
                          <div className="w-full break-words relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-normal overflow-wrap break-word">
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
                          <div className="w-fit [font-family:'Montserrat',Helvetica] font-medium text-[12px] leading-[20px] whitespace-nowrap relative text-[#6c757d] line-through">
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
