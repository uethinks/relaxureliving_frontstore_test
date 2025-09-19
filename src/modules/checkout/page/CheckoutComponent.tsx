"use client"
import React, { useState, useEffect, useCallback } from "react"
import { StoreCart, StoreOrder, StorePaymentCollectionResponse } from "@medusajs/types"
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
//import { OceanPaymentForm } from "./components/OceanPaymentForm"
import AirwallexPaymentForm, { PaymentIntentBody } from "./components/AirwallexPaymentForm"
import { PaymentLoadingSkeleton } from "./components/PaymentLoadingSkeleton"

 
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

// Simple icon slot to reserve space for future SVGs from /img/*.svg
// Replace the emoji inside with <img src="/img/your-icon.svg" alt="" className="w-5 h-5" /> later
const IconSlot: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-[#E8A300] pointer-events-none ${className ?? ""}`}>
    {children ?? ""}
  </span>
)

// Minimal US states list for the State dropdown; extend/adjust as needed
const US_STATES: { value: string; label: string }[] = [
  { value: "", label: "State" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

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

 
export const CheckoutComponent = ({
    cart
}: {
  cart: StoreCart | null
}): JSX.Element => {   
 
 
  const [promotionCode, setPromotionCode] = useState("")  
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
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [smsOptIn, setSmsOptIn] = useState(false)

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
      console.log("表单验证通过，开始初始化支付会话 isInitializingPayment", isInitializingPayment, "formData", formData)
      await updateCartDeliveryInfo(formData)
      console.log("updateCartDeliveryInfo done - 初始化 payment")
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
      // const updatedCart = await getCart()
      
      const paymentProvider = process.env.NEXT_PUBLIC_PROVIDER_PAYMENT_ID || "pp_Airwallex_Airwallex"
      
      // 使用更新后的购物车数据
      const cartToUse =  cart
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
      console.log("updateCartDeliveryInfo cart id:", cart.id, "cart.email", cart.email, "email:", infoToUse.email, "shipping_address", infoToUse.shipping_address)      
      return await updateCart({
        ...(cart.email ? {} : {email: infoToUse.email}), //如果这个cart已经关联了就无法再修改        
        shipping_address: infoToUse.shipping_address,
      })
    }
    return null
  }
 

   

  const comlpeleCartAndCreateOrder = async (): Promise<StoreOrder | null> => {

    if (cart) {
      console.log("comlpeleCartAndCreateOrder cart", cart)
      const cartRes = await placeOrder(cart.id)
      console.log("comlpeleCartAndCreateOrder cartRes", cartRes)
      if (cartRes.type === "order") {
        return cartRes.order
      }
    }
    return null
  }
  
  return (
      
        <div className="w-full flex flex-col items-start justify-end gap-10 ">
            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {/* Contact Header */}
              <h2 className="text-[24px] font-semibold text-[#111827]">Contact</h2>
              {/* Email Input */}
              <div className="flex flex-col w-full">
                <label className="sr-only" htmlFor="checkout-email">Email</label>
                <div className="relative">
                  <IconSlot>
                    <img src="/img/form_email.svg" alt="" className="w-5 h-5" />
                  </IconSlot>
                  <input
                    id="checkout-email"
                    className={`w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-3 placeholder:text-[#8d9299]`}
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={(e) => reportToGA("input_email", { email: e.target.value })}
                  />
                </div>
                {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
                {/* Newsletter opt-in */}
                <label className="mt-3 inline-flex items-center gap-2 text-sm text-[#6b7280]">
                  <input
                    type="checkbox"
                    className="accent-primary w-4 h-4 rounded border-gray-300 checked:text-white"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  />
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <h2 className="text-[24px] font-semibold text-[#111827]">Delivery</h2>
                {/* Country Selector */}
                <div className="flex flex-col items-start gap-3 relative w-full self-stretch flex-[0_0_auto]">
                  <div
                    className={`text-[#8d9299] flex flex-col items-center 
                            flex-[0_0_auto] px-[14.53px] py-[16.34px] w-full gap-[9.08px] bg-[#ffffff] self-stretch`}
                  >
                    <div className="w-full h-[13px] [font-family:'Montserrat',Helvetica] font-normal text-[#8d9299] text-xs tracking-[0] leading-[13.2px]">
                      Country
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-0">
                      
                      <img src="/img/form_country.svg" alt="" className="w-5 h-5" />

                      <img src="/img/USA.png" alt="USA" className="mx-2 w-5 h-5 ml-3" />

                      <span className="text-black font-medium">United States</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name Inputs */}
              <div className="flex items-center gap-[39px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col md:flex-row w-full items-start gap-5 relative">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="sr-only" htmlFor="first-name">First name</label>
                    <div className="relative">
                      <IconSlot>
                        <img src="/img/form_firstnameVector.svg" alt="" className="w-5 h-5" />
                      </IconSlot>
                      <input
                        id="first-name"
                        className={`w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-3 placeholder:text-[#8d9299]`}
                        placeholder="First name"
                        type="text"
                        value={formData.shipping_address.first_name}
                        onChange={(e) => handleFieldChange("first_name", e.target.value)}
                      />
                    </div>
                    {errors.firstName && (
                      <div className="text-red-500 mt-1 block">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="sr-only" htmlFor="last-name">Last name</label>
                    <div className="relative">
                      <IconSlot>
                        <img src="/img/form_lastname.svg" alt="" className="w-5 h-5" />
                      </IconSlot>
                      <input
                        id="last-name"
                        className={`w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-3 placeholder:text-[#8d9299]`}
                        placeholder="Last name"
                        type="text"
                        value={formData.shipping_address.last_name}
                        onChange={(e) => handleFieldChange("last_name", e.target.value)}
                      />
                    </div>
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
                <label className="sr-only" htmlFor="address-1">Address</label>
                <div className="relative">
                  <IconSlot>
                    <img src="/img/form_address.svg" alt="" className="w-5 h-5" />
                  </IconSlot>
                  <input
                    id="address-1"
                    className={`w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-3 placeholder:text-[#8d9299]`}
                    placeholder="Address"
                    type="text"
                    value={formData.shipping_address.address_1}
                    onChange={(e) => handleFieldChange("address_1", e.target.value)}
                  />
                </div>
                {errors.address && (
                  <div className="text-red-500 mt-1 block">
                    {errors.address}
                  </div>
                )}
              </div>
              {/* City, State, ZIP Inputs */}
              <div className="flex w-full flex-col md:flex-row md:items-center gap-2 relative flex-[0_0_auto]">
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="sr-only" htmlFor="city">City</label>
                  <div className="relative">
                    <IconSlot>
                      <img src="/img/form_city.svg" alt="" className="w-5 h-5" />
                    </IconSlot>
                    <input
                      id="city"
                      className={`w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-3 placeholder:text-[#8d9299]`}
                      placeholder="City"
                      type="text"
                      value={formData.shipping_address.city}
                      onChange={(e) => handleFieldChange("city", e.target.value)}
                    />
                  </div>
                  {errors.city && (
                    <div className="text-red-500 mt-1 block">{errors.city}</div>
                  )}
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="sr-only text-gray-400" htmlFor="state">State</label>
                  <div className="relative">
                    <IconSlot>
                      <img src="/img/form_state.svg" alt="" className="w-5 h-5" />
                    </IconSlot>
                    <select
                      id="state"
                      className={`appearance-none w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-10`}
                      value={formData.shipping_address.province}
                      onChange={(e) => handleFieldChange("province", e.target.value)}
                    >                      
                      {US_STATES.map((s) => (
                        <option key={s.value} value={s.value} disabled={s.value === ""}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                  </div>
                  {errors.province && (
                    <div className="text-red-500 mt-1 block">
                      {errors.province}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="sr-only" htmlFor="zip">ZIP code</label>
                  <div className="relative">
                    <IconSlot>
                      <img src="/img/form_zip.svg" alt="" className="w-5 h-5" />
                    </IconSlot>
                    <input
                      id="zip"
                      className={`w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-3 placeholder:text-[#8d9299]`}
                      placeholder="ZIP code"
                      type="text"
                      value={formData.shipping_address.postal_code}
                      onChange={(e) => handleFieldChange("postal_code", e.target.value)}
                    />
                  </div>
                  {errors.postalCode && (
                    <div className="text-red-500 mt-1 block">
                      {errors.postalCode}
                    </div>
                  )}
                </div>
              </div>
              {/* Phone Input */}
              <div className="flex flex-col w-full">
                <label className="sr-only" htmlFor="phone">Phone</label>
                <div className="relative">
                  <IconSlot>
                    <img src="/img/form_phone.svg" alt="" className="w-5 h-5" />
                  </IconSlot>
                  <input
                    id="phone"
                    className={`w-full focus:outline-none bg-white text-base text-[#343a40] h-12 pl-11 pr-3 placeholder:text-[#8d9299]`}
                    placeholder="Phone"
                    type="tel"
                    value={formData.shipping_address.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    onBlur={(e) => reportToGA("input_phone", { phone: e.target.value })}
                  />
                </div>
                {errors.phone && (
                  <div className="text-red-500 mt-1 block">{errors.phone}</div>
                )}
                {/* SMS opt-in */}
                <label className="mt-3 inline-flex items-center gap-2 text-sm text-[#6b7280]">
                  <input
                    type="checkbox"
                    className="accent-primary w-4 h-4 rounded border-gray-300 checked:text-white"
                    checked={smsOptIn}
                    onChange={(e) => setSmsOptIn(e.target.checked)}
                  />
                  Text me with news and offers
                </label>
              </div>
            </div>

            {/* Payment Section */}
                        <div
              className={`flex flex-col items-start gap-[70px] relative self-stretch w-full flex-[0_0_auto] pb-8 border-b border-white`}
            >
              <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto] ">
                <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-center relative self-stretch w-full flex-[0_0_auto] my-4">
                    <h2 className="text-[24px] font-semibold text-[#111827]">Payment</h2>
                  </div>
                  {/* <OceanPaymentForm
                    deliveryInfo={formData}
                    updateCartDeliveryInfo={updateCartDeliveryInfo}
                    formValidation={validateForm}
                    comlpeleCartAndCreateOrder={comlpeleCartAndCreateOrder}
                  /> */}

                  {/* 支付组件条件性显示 */}
                  
                  {  paymentIntent ? (
                     <AirwallexPaymentForm
                      key={paymentIntent.id}
                      paymentIntent={paymentIntent}
                      formValidation={validateForm}
                      deliveryInfo={formData}
                      updateCartDeliveryInfo={updateCartDeliveryInfo}                      
                      comlpeleCartAndCreateOrder={comlpeleCartAndCreateOrder}
                    />   
                  ) : <PaymentLoadingSkeleton isFormValid={isFormValid} />}

                </div>
              </div>
            </div>
            {/* Security Message */}
            {/* <div className="flex w-fullitems-end gap-2 relative flex-[0_0_auto]">
              <img
                className="relative w-6 h-6"
                alt="Lock"
                src="/img/lock.png"
              />
              <p className="relative w-full mr-[-2.00px] [font-family:'Montserrat',Helvetica] font-medium text-formash text-base tracking-[0] leading-[normal]">
                All transactions are secure and encrypted
              </p>
            </div> */}
            {/* Footer Links */}
              <div className="flex flex-wrap items-center justify-center gap-[34px] relative self-stretch w-full flex-[0_0_auto]">
              <Link href="/terms/warranty">
                <div
                  className={`underline relative w-fit  text-[#2a261b] text-[12px] font-semibold text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}
                >
                  Warranty
                </div>
              </Link>
              <Link href="/terms/refund-policy">
                <div
                  className={`underline relative w-fit  text-[#2a261b] text-[12px] font-semibold text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}
                >
                  Refund policy
                </div>
              </Link>
              <Link href="/terms/terms-of-service">
                <div
                  className={`underline relative w-fit  text-[#2a261b] text-[12px] font-semibold text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}
                >
                  Terms of service
                </div>
              </Link>
              <Link href="/terms/privacy-policy">
                <div
                  className={`underline relative w-fit  text-[#2a261b] text-[12px] font-semibold text-center tracking-[-0.28px] leading-6 whitespace-nowrap`}

                >
                  Privacy policy
                </div>
              </Link>
            </div>
          </div>
      
    
  )
}
