"use client"
import { useForm } from "react-hook-form"
import { useEffect, useState, useRef } from "react"
import { StoreCart, StoreOrder } from "@medusajs/types"
import { useCart } from "@lib/context/cartContext"
import { retrieveOrder } from "@lib/data/orders"
import { captureOrderWebhook } from "@lib/data/orders"
import { postKlarnaPayment, postAfterpayPayment } from "@lib/api/payment"
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
  itemList?: string
}

type TerminalName =
  | "Credit Card"
  | "GooglePay"
  | "ApplePay"
  | "Klarna"
  | "Afterpay"
enum TerminalNameEnum {
  Credit = "Credit Card",
  Google = "GooglePay",
  Apple = "ApplePay",
  Klarna = "Klarna",
  Afterpay = "Afterpay",
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
    onePageKlarnaPay: any
    onePageAfterpayPay: any
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
    "credit" | "google" | "apple" | "klarna" | "afterpay"
  >("credit")
  const isSandbox = process.env.NEXT_PUBLIC_OCEANPAYMENT_ENV === "sandbox"
  const [loadedScripts, setLoadedScripts] = useState<Set<string>>(new Set())
  const googlePayRef = useRef<HTMLDivElement>(null)
  const applePayRef = useRef<HTMLDivElement>(null)
  const creditPayRef = useRef<HTMLDivElement>(null)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      // 如果脚本已经加载，直接返回
      if (loadedScripts.has(src)) {
        resolve(true)
        return
      }

      const script = document.createElement("script")
      script.src = src
      script.async = true
      script.onload = () => {
        setLoadedScripts((prev) => {
          const newSet = new Set(prev)
          newSet.add(src)
          return newSet
        })
        resolve(true)
      }
      script.onerror = reject
      document.body.appendChild(script)
    })
  }

  const loadAllScripts = async () => {
    try {
      await Promise.all([
        loadScript("https://secure.oceanpayment.com/pub/js/jquery/jq.js"),
        loadScript("https://secure.oceanpayment.com/pages/js/oceanpayment.js"),
        loadScript(
          "https://secure.oceanpayment.com/pages/js/oceanpayment-googlepay.js"
        ),
        loadScript(
          "https://secure.oceanpayment.com/pages/js/oceanpayment-applepay.js"
        ),
      ])
    } catch (error) {
      console.error("Failed to load payment scripts:", error)
    } finally {
      setScriptsLoaded(true)
    }
  }

  // 在组件挂载时加载所有脚本
  useEffect(() => {
    loadAllScripts()
  }, [])

  const captureOrder = async (orderId: string) => {
    const order = await retrieveOrder(orderId)
    const paymentSessionId =
      order.payment_collections?.[0]?.payments?.[0]?.payment_session?.id
    if (paymentSessionId) {
      const captureOrder = await captureOrderWebhook(paymentSessionId)
      console.log("captureOrder", captureOrder)
    }
  }
  const paymentResultXmlHandler = async (result: any) => {
    // 解析返回的 XML 结果
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(result, "text/xml")
    const orderNumber =
      xmlDoc.getElementsByTagName("order_number")[0]?.textContent
    // 获取支付状态
    const status = xmlDoc.getElementsByTagName("payment_status")[0]?.textContent
    const payUrl = xmlDoc.getElementsByTagName("pay_url")[0]?.textContent || ""

    console.log("result xmlDoc", xmlDoc, status)
    if (status === "1") {
      try {
        await captureOrder(orderNumber as string)
        // 支付成功，等待captureOrder完成后再跳转
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order_id=${orderNumber}`
      } catch (error) {
        console.error("Error capturing order:", error)
        // 如果captureOrder失败，仍然跳转到成功页面，但带上错误参数
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order_id=${orderNumber}&error=capture_failed`
      }
    } else if (status === "-1" && payUrl !== "") {
      // 需要3D认证
      window.location.href = payUrl
    } else if (status === "0") {
      const paymentDetails =
        xmlDoc.getElementsByTagName("payment_details")[0]?.textContent
      const errorInfo = { status, paymentDetails }
      // 支付失败
      window.location.href = `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/checkout/success?order_id=${orderNumber}&error=${JSON.stringify(
        errorInfo
      )}`
    }
  }
  const initOceanpayment = async () => {
    try {
      window.oceanpaymentCallBack = async (result: any) => {
        console.log("Payment callback result:", result)
        if (!result.msg) {
          await paymentResultXmlHandler(result)
        } else {
          console.log("Payment callback result json:", result)
        }
      }

      if (window.Oceanpayment) {
        window.Oceanpayment.init(isSandbox, "", "")
      }
    } catch (error) {
      console.error("Failed to load Oceanpayment scripts:", error)
    }
  }
  const initApplePay = async () => {
    try {
      window.oceanpaymentApplePayCallBack = (data: any) => {
        console.log("Apple Pay callback result:", data)
        if (data.code == 2) {
          handleApplePay()
        } else {
          paymentResultXmlHandler(data)
        }
      }

      if (window.onePageApplePay) {
        window.onePageApplePay.init(isSandbox, {
          cssUrl: "",
          transactionInfo: {
            orderCurrency: "USD",
            orderAmount: cart?.total?.toString() || "0",
            billCountry: defaultCountryCode.toUpperCase(),
            orderNumber: cart?.id,
            billAddress: "",
          },
          buttonStyle: {
            buttonstyle: "",
            type: "",
          },
        })
      }
    } catch (error) {
      console.error("Failed to load Apple Pay scripts:", error)
    }
  }
  const initGooglePay = async () => {
    try {
      window.oceanpaymentGooglePayCallBack = (data: any) => {
        console.log("Google Pay callback result:", data)
        if (data.code == 2) {
          handleGooglePay()
        } else {
          paymentResultXmlHandler(data)
        }
      }

      if (window.onePageGooglePay) {
        window.onePageGooglePay.init(isSandbox, {
          cssUrl: "",
          transactionInfo: {
            orderCurrency: "USD",
            orderAmount: cart?.total?.toString() || "0",
            billCountry: defaultCountryCode.toUpperCase(),
          },
          buttonStyle: {
            buttonColor: "",
            buttonType: "",
            buttonRadius: "",
            buttonSizeMode: "",
            buttonLocale: "",
          },
        })
      }
    } catch (error) {
      console.error("Failed to load Google Pay scripts:", error)
    }
  }

  // 修改原有的支付方法初始化 useEffect
  useEffect(() => {
    console.log("paymentMethod", paymentMethod, scriptsLoaded)
    if (!scriptsLoaded) return // 如果脚本未加载完成，不执行初始化

    if (paymentMethod === "google" && googlePayRef.current) {
      initGooglePay()
    } else if (paymentMethod === "apple" && applePayRef.current) {
      initApplePay()
    } else if (paymentMethod === "credit" && creditPayRef.current) {
      initOceanpayment()
    }
  }, [paymentMethod, scriptsLoaded])

  const getTerminalInfo = (terminalName: TerminalNameEnum) => {
    switch (terminalName) {
      case TerminalNameEnum.Credit:
        return {
          account: process.env.NEXT_PUBLIC_OCEANPAYMENT_ACCOUNT,
          terminal: process.env.NEXT_PUBLIC_OCEANPAYMENT_TERMINAL,
          methods: "Credit Card",
        }
      case TerminalNameEnum.Google:
        return {
          account: process.env.NEXT_PUBLIC_OCEANPAYMENT_ACCOUNT,
          terminal: process.env.NEXT_PUBLIC_OCEANPAYMENT_GOOGLE_TERMINAL,
          methods: "GooglePay",
        }
      case TerminalNameEnum.Apple:
        return {
          account: process.env.NEXT_PUBLIC_OCEANPAYMENT_ACCOUNT,
          terminal: process.env.NEXT_PUBLIC_OCEANPAYMENT_APPLE_TERMINAL,
          methods: "ApplePay",
        }
      case TerminalNameEnum.Klarna:
        return {
          account: process.env.NEXT_PUBLIC_OCEANPAYMENT_ACCOUNT,
          terminal: process.env.NEXT_PUBLIC_OCEANPAYMENT_KLARNA_TERMINAL,
          methods: "Klarna",
        }
      case TerminalNameEnum.Afterpay:
        return {
          account: process.env.NEXT_PUBLIC_OCEANPAYMENT_ACCOUNT,
          terminal: process.env.NEXT_PUBLIC_OCEANPAYMENT_AFTERPAY_TERMINAL,
          methods: "Afterpay",
        }
    }
  }
  const prepareFormData = async (
    terminalName: TerminalName = "Credit Card"
  ): Promise<OceanPaymentFormData | null> => {
    // 1. 首先验证表单
    const isValid = formValidation()
    if (!isValid) {
      return null
    }
    await updateCartDeliveryInfo()
    const order = await comlpeleCartAndCreateOrder()

    const terminalInfo = getTerminalInfo(terminalName as TerminalNameEnum)
    const baseUrl = `${location.href}`
    const notifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/notify`
    // 2. 获取支付签名
    const data = {
      account: terminalInfo.account,
      terminal: terminalInfo.terminal,
      baseUrl,
      order_number: order?.id,
      order_currency: "USD",
      order_amount: cart?.total?.toString(),
      billing_firstName: deliveryInfo.shipping_address?.first_name,
      billing_lastName: deliveryInfo.shipping_address?.last_name,
      billing_email: deliveryInfo.email,
      terminalName,
    }
    const signature = await getPaymentSignature(data)

    // 3. 初始化支付表单数据
    // 设置订单相关数据
    setValue("order_number", order?.id || "")
    setValue("order_currency", "USD")
    setValue("order_amount", cart?.total?.toString() || "0")
    setValue("order_notes", "order_notes")
    setValue("methods", terminalInfo.methods)
    // 设置账户相关数据
    setValue("account", terminalInfo.account || "")
    setValue("terminal", terminalInfo.terminal || "")
    setValue("key", process.env.NEXT_PUBLIC_OCEANPAYMENT_KEY || "")
    // 设置回调URL
    setValue("backUrl", baseUrl)
    setValue("noticeUrl", notifyUrl)
    // 设置产品信息
    if (cart?.items && cart.items.length > 0) {
      const skus = "1234567890"
      const names = cart.items.map((item: any) => item.title || "").join(",")
      const nums = cart.items.map((item: any) => item.quantity || "").join(",")
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
    const formData = watch() // 获取所有表单数据
    formData.signValue = signature // 添加签名
    return formData
  }
  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const formData = await prepareFormData()
      // 4. 调用 OceanPayment checkout
      if (formData) {
        console.log("onSubmit formData", formData)
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
    const formData = await prepareFormData(TerminalNameEnum.Apple)
    console.log("handleApplePay formData", formData)
    window.onePageApplePay.checkout(formData)
  }
  const handleGooglePay = async () => {
    const formData = await prepareFormData(TerminalNameEnum.Google)
    console.log("handleGooglePay formData", formData)
    window.onePageGooglePay.checkout(formData)
  }
  const handleKlarnaPay = async () => {
    const formData = await prepareFormData(TerminalNameEnum.Klarna)
    if (formData) {
      const items = cart?.items?.reduce(
        (acc: any, item: any, index: number) => {
          acc[index] = {
            type: "1",
            title: item.title || "",
            sku: item.variant?.sku || `#${index + 1}`,
            price: item.unit_price?.toString() || "0",
            quantity: item.quantity?.toString() || "1",
            total_amount: (
              (item.unit_price || 0) * (item.quantity || 1)
            ).toFixed(2),
            taxRate: "0",
            taxPrice: "0",
          }
          return acc
        },
        {}
      )
      formData.itemList = JSON.stringify(items)
      console.log("handleKlarnaPay formData", formData)
      postKlarnaPayment(formData)
    }
  }
  const handleAfterpayPay = async () => {
    const formData = await prepareFormData(TerminalNameEnum.Afterpay)
    if (formData) {
      console.log("handleAfterpayPay formData", formData)
      postAfterpayPayment(formData)
    }
  }

  return (
    <>
      {/* 支付方式切换按钮区 */}
      <div className="flex flex-wrap gap-4 mb-6 justify-start items-start">
        <button
          type="button"
          className={`flex flex-wrap items-center gap-1 px-4 py-2 rounded border transition-colors duration-150 ${
            paymentMethod === "credit"
              ? "bg-gray-100 border-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setPaymentMethod("credit")}
        >
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
        </button>
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors duration-150 ${
            paymentMethod === "klarna"
              ? "bg-gray-100 border-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setPaymentMethod("klarna")}
        >
          <span className="ml-1 font-medium">Klarna</span>
          <img src="/img/Klarna.png" className="w-7" alt="klarna" />
        </button>
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors duration-150 ${
            paymentMethod === "afterpay"
              ? "bg-gray-100 border-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setPaymentMethod("afterpay")}
        >
          <span className="ml-1 font-medium">Afterpay</span>
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-4 w-full ${
          paymentMethod === "credit" ? "flex" : "hidden"
        }`}
      >
        {/* 加载Oceanpayment支付页面 */}
        {paymentMethod === "credit" && (
          <div ref={creditPayRef} id="oceanpayment-element"></div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#F6AF1F] text-black py-4 rounded-lg font-medium hover:bg-[#0a3980] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      <button
        onClick={handleKlarnaPay}
        disabled={isLoading}
        className={`w-full justify-center bg-[#343a40] text-white py-4 rounded-lg font-medium hover:bg-[#23272b] transition-colors disabled:opacity-50 ${
          paymentMethod === "klarna" ? "flex" : "hidden"
        }`}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>

      <button
        onClick={handleAfterpayPay}
        disabled={isLoading}
        className={`w-full justify-center bg-[#343a40] text-white py-4 rounded-lg font-medium hover:bg-[#23272b] transition-colors disabled:opacity-50 ${
          paymentMethod === "afterpay" ? "flex" : "hidden"
        }`}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>

      {paymentMethod === "google" && (
        <div
          ref={googlePayRef}
          id="oceanpayment-googlepayelement"
          className={`w-full flex justify-center ${
            paymentMethod === "google" ? "flex" : "block"
          }`}
        ></div>
      )}

      {paymentMethod === "apple" && (
        <div
          ref={applePayRef}
          id="oceanpayment-applepayelement"
          className={`w-full flex justify-center ${
            paymentMethod === "apple" ? "flex" : "block"
          }`}
        ></div>
      )}
    </>
  )
}
