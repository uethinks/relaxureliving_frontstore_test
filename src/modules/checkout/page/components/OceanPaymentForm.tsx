"use client"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { StoreCart, StoreOrder } from "@medusajs/types"
import { useCart } from "@lib/context/cartContext"
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
type OceanPaymentFormData = {
  order_number: string
  order_currency: string
  order_amount: string
  methods: string
  account: string
  terminal: string
  key: string
  backUrl: string
  noticeUrl: string
  productSku: string
  productName: string
  productNum: string
  productPrice: string
  billing_firstName: string
  billing_lastName: string
  billing_email: string
  billing_country: string
  billing_state: string
  billing_ip: string
  signValue?: string
  order_notes: string
  billing_phone: string
}

type OceanPaymentFormProps = {
  formValidation: () => boolean
  deliveryInfo: FormData
  updateCartDeliveryInfo: () => Promise<StoreCart | null>
  comlpeleCartAndCreateOrder: () => Promise<StoreOrder | null>
}

declare global {
  interface Window {
    Oceanpayment: any
    oceanpaymentCallBack: (result: any) => void
    onePageApplePay: any
    onePageGooglePay: any
    oceanpaymentApplePayCallBack: (result: any) => void
    oceanpaymentGooglePayCallBack: (result: any) => void
  }
}

// 获取支付签名的函数
const getPaymentSignature = async (data: any) => {
  try {
    const response = await fetch("/api/payment/signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to generate signature")
    }

    const { signValue } = await response.json()
    return signValue
  } catch (error) {
    console.error("Error getting payment signature:", error)
    return null
  }
}

export const OceanPaymentForm = ({
  comlpeleCartAndCreateOrder,
  formValidation,
  deliveryInfo,
  updateCartDeliveryInfo,
}: OceanPaymentFormProps) => {
  const { handleSubmit, setValue, watch } = useForm<OceanPaymentFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const { cart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<
    "credit" | "google" | "apple"
  >("credit")
  const isSandbox = process.env.NEXT_PUBLIC_OCEANPAYMENT_ENV === "sandbox"
  // 动态加载 OceanPayment 脚本
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.async = true
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    const initOceanpayment = async () => {
      try {
        // 并行加载所有脚本
        const scripts = [
          "https://secure.oceanpayment.com/pub/js/jquery/jq.js",
          "https://secure.oceanpayment.com/pages/js/oceanpayment.js",
          "https://secure.oceanpayment.com/pages/js/oceanpayment-googlepay.js",
          "https://secure.oceanpayment.com/pages/js/oceanpayment-applepay.js",
        ]

        await Promise.all(scripts.map((script) => loadScript(script)))
        // 初始化 Oceanpayment

        window.Oceanpayment.init(isSandbox, "", "")
      } catch (error) {
        console.error("Failed to load Oceanpayment scripts:", error)
      }
    }

    initOceanpayment()
  }, [])
  const initApplePay = () => {
    if (typeof window !== "undefined") {
      window.onePageApplePay.init(isSandbox, {
        cssUrl: "" /*传入线上css样式文件地址，可以控制按钮大小*/,
        transactionInfo: {
          //*传入订单实际的金额，币种，国家
          orderCurrency: "USD" /*交易币种*/,
          orderAmount: cart?.total?.toString() || "0" /*交易金额*/,
          billCountry: "US" /*账单国家*/,
          orderNumber: cart?.id /*订单号*/,
          billAddress: "" /*账单地址*/,
        },
        buttonStyle: {
          buttonstyle: "" /*按钮颜色*/,
          type: "" /*按钮类型*/,
        },
      })
    }
  }
  const initGooglePay = () => {
    if (typeof window !== "undefined") {
      window.onePageGooglePay.init(isSandbox, {
        cssUrl: "" /*传入线上css样式文件地址，可以控制按钮大小*/,
        transactionInfo: {
          //*传入订单实际的金额，币种，国家
          orderCurrency: "USD" /*交易币种*/,
          orderAmount: cart?.total?.toString() || "0" /*交易金额*/,
          billCountry: "US" /*账单国家*/,
        },
        buttonStyle: {
          buttonColor: "" /*按钮颜色*/,
          buttonType: "" /*按钮类型*/,
          buttonRadius: "" /*圆角*/,
          buttonSizeMode: "" /*尺寸样式*/,
          buttonLocale: "" /*按钮语言*/,
        },
      })
    }
  }
  if (typeof window !== "undefined") {
    // 定义支付回调函数
    window.oceanpaymentCallBack = (result: any) => {
      console.log("Payment callback result:", result)

      // 解析返回的 XML 结果
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(result, "text/xml")
      const orderNumber =
        xmlDoc.getElementsByTagName("order_number")[0]?.textContent
      // 获取支付状态
      const status = xmlDoc.getElementsByTagName("status")[0]?.textContent
      const payUrl =
        xmlDoc.getElementsByTagName("pay_url")[0]?.textContent || ""

      if (status === "1") {
        // 支付成功
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/us/checkout/success?order_id=${orderNumber}`
      } else if (status === "-1" || payUrl !== "") {
        // 需要3D认证
        window.location.href = payUrl
      } else if (status === "0") {
        // 支付失败
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/us/checkout/success?order_id=${orderNumber}&error=error`
      }
    }
    window.oceanpaymentApplePayCallBack = (data: any) => {
      console.log("Apple Pay callback result:", data)
      if (data.code == 2) {
        handleApplePay()
      } else {
        /*处理下单返回*/
        console.log("Apple Pay callback result:", data)
      }
    }
    window.oceanpaymentGooglePayCallBack = (data: any) => {
      console.log("Google Pay callback result:", data)
      if (data.code == 2) {
        handleGooglePay()
      } else {
        /*处理下单返回*/
        console.log("Google Pay callback result:", data)
      }
    }
  }

  // 切换支付方式时初始化google/apple pay
  useEffect(() => {
    if (paymentMethod === "google") {
      const el = document.getElementById("oceanpayment-googlepayelement")
      if (el) el.innerHTML = ""
      initGooglePay()
    } else if (paymentMethod === "apple") {
      const el = document.getElementById("oceanpayment-applepayelement")
      if (el) el.innerHTML = ""
      initApplePay()
    }
  }, [paymentMethod, cart])
  const prepareFormData = async (): Promise<OceanPaymentFormData | null> => {
    // 1. 首先验证表单
    const isValid = formValidation()
    if (!isValid) {
      return null
    }
    await updateCartDeliveryInfo()
    const order = await comlpeleCartAndCreateOrder()
    if (!order) {
      throw new Error("Failed to create order")
    }
    // 2. 获取支付签名
    const data = {
      account: process.env.NEXT_PUBLIC_OCEANPAYMENT_ACCOUNT,
      terminal: process.env.NEXT_PUBLIC_OCEANPAYMENT_TERMINAL,
      order_number: order?.id,
      order_currency: "USD",
      order_amount: cart?.total?.toString(),
      billing_firstName: deliveryInfo.shipping_address?.first_name,
      billing_lastName: deliveryInfo.shipping_address?.last_name,
      billing_email: deliveryInfo.email,
    }
    const signature = await getPaymentSignature(data)
    if (!signature) {
      throw new Error("Failed to get payment signature")
    }

    // 3. 初始化支付表单数据
    if (cart) {
      // 设置订单相关数据
      setValue("order_number", order.id)
      setValue("order_currency", "USD")
      setValue("order_amount", cart.total?.toString() || "0")
      setValue("order_notes", "order_notes")
      setValue("methods", "Credit Card")
      // 设置账户相关数据
      setValue("account", process.env.NEXT_PUBLIC_OCEANPAYMENT_ACCOUNT || "")
      setValue("terminal", process.env.NEXT_PUBLIC_OCEANPAYMENT_TERMINAL || "")
      setValue("key", process.env.NEXT_PUBLIC_OCEANPAYMENT_KEY || "")
      // 设置回调URL
      setValue(
        "backUrl",
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`
      )
      setValue(
        "noticeUrl",
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/notify`
      )
      // 设置产品信息
      if (cart.items && cart.items.length > 0) {
        const skus = "1234567890"
        const names = cart.items.map((item: any) => item.title || "").join(",")
        const nums = cart.items
          .map((item: any) => item.quantity || "")
          .join(",")
        const prices = cart.items
          .map((item: any) => item.unit_price || "")
          .join(",")
        setValue("productSku", skus)
        setValue("productName", names)
        setValue("productNum", nums)
        setValue("productPrice", prices)
      }
      // 设置账单信息
      setValue("billing_firstName", deliveryInfo.shipping_address.first_name)
      setValue("billing_lastName", deliveryInfo.shipping_address.last_name)
      setValue("billing_email", deliveryInfo.email)
      setValue(
        "billing_country",
        deliveryInfo.shipping_address.country_code?.toUpperCase() || "US"
      )
      setValue("billing_state", deliveryInfo.shipping_address.province)
      setValue("billing_ip", "0.0.0.0")
      setValue("billing_phone", "N/A")
    }
    const formData = watch() // 获取所有表单数据
    formData.signValue = signature // 添加签名
    console.log("formData", formData)
    return formData
  }
  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const formData = await prepareFormData()
      // 4. 调用 OceanPayment checkout
      if (formData && typeof window !== "undefined") {
        window.Oceanpayment.checkout(formData)
      } else {
        throw new Error("formData not initialized")
      }
    } catch (error) {
      console.error("Payment error:", error)
      // 这里可以添加错误处理逻辑
    } finally {
      setIsLoading(false)
    }
  }
  const handleApplePay = async () => {
    if (typeof window !== "undefined") {
      const formData = await prepareFormData()
      window.onePageApplePay.checkout(formData)
    }
  }
  const handleGooglePay = async () => {
    if (typeof window !== "undefined") {
      const formData = await prepareFormData()
      window.onePageGooglePay.checkout(formData)
    }
  }

  return (
    <>
      {/* 支付方式切换按钮区 */}
      <div className="flex flex-col gap-4 mb-6 justify-start items-start">
        <button
          type="button"
          className={`flex items-center gap-1 px-4 py-2 rounded border transition-colors duration-150 ${
            paymentMethod === "credit"
              ? "bg-gray-100 border-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setPaymentMethod("credit")}
        >
          <span className="ml-2 font-medium">Credit Card</span>
          <img src="/img/visa.png" className="w-7" alt="visa" />
          <img src="/img/master.png" className="w-7" alt="master" />
          <img src="/img/Maestro.png" className="w-7" alt="Maestro" />
          <img
            src="/img/American_Express.png"
            className="w-7"
            alt="American_Express"
          />
          <img src="/img/Diners_Club.png" className="w-7" alt="Diners_Club" />
          <img src="/img/Discover.png" className="w-7" alt="Discover" />
          <img
            src="/img/VISA_Electron.png"
            className="w-7"
            alt="VISA_Electron"
          />
          <img src="/img/Klarna.png" className="w-7" alt="Klarna" />
          <img src="/img/afterpay.png" className="w-7" alt="afterpay" />
        </button>
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors duration-150 ${
            paymentMethod === "google"
              ? "bg-gray-100 border-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setPaymentMethod("google")}
        >
          <span className="ml-1 font-medium">Google Pay</span>
          <img src="/img/google_pay.png" className="w-8" alt="google_pay" />
        </button>
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors duration-150 ${
            paymentMethod === "apple"
              ? "bg-gray-100 border-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setPaymentMethod("apple")}
        >
          <span className="ml-1 font-medium">Apple Pay</span>
          <img src="/img/apple_pay.png" className="w-8" alt="apple_pay" />
        </button>
      </div>

      {/* 支付内容区 */}
      {paymentMethod === "credit" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          {/* 加载Oceanpayment支付页面 */}
          <div id="oceanpayment-element"></div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#343a40] text-white py-4 rounded-lg font-medium hover:bg-[#23272b] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      )}
      {paymentMethod === "google" && (
        <div
          id="oceanpayment-googlepayelement"
          className="w-full flex justify-center"
        ></div>
      )}
      {paymentMethod === "apple" && (
        <div
          id="oceanpayment-applepayelement"
          className="w-full flex justify-center"
        ></div>
      )}
    </>
  )
}
