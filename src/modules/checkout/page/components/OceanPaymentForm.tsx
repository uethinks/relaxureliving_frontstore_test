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
        // 先加载 jQuery
        await loadScript("https://secure.oceanpayment.com/pub/js/jquery/jq.js")
        // 再加载 Oceanpayment
        await loadScript(
          "https://secure.oceanpayment.com/pages/js/oceanpayment.js"
        )

        // 初始化 Oceanpayment
        const isSandbox = process.env.NEXT_PUBLIC_OCEANPAYMENT_ENV === "sandbox"
        window.Oceanpayment.init(isSandbox, "", "")
      } catch (error) {
        console.error("Failed to load Oceanpayment scripts:", error)
      }
    }

    initOceanpayment()
  }, [])
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
      } else {
        // 支付失败
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/us/checkout/success?order_id=${orderNumber}&error=error`
      }
    }
  }

  const onSubmit = async (data: OceanPaymentFormData) => {
    try {
      setIsLoading(true)

      // 1. 首先验证表单
      const isValid = formValidation()
      if (!isValid) {
        return
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
        setValue(
          "terminal",
          process.env.NEXT_PUBLIC_OCEANPAYMENT_TERMINAL || ""
        )
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
          const names = cart.items
            .map((item: any) => item.title || "")
            .join(",")
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

      // 4. 调用 OceanPayment checkout
      if (window.Oceanpayment) {
        const formData = watch() // 获取所有表单数据
        formData.signValue = signature // 添加签名
        console.log("formData", formData)
        window.Oceanpayment.checkout(formData)
      } else {
        throw new Error("Oceanpayment not initialized")
      }
    } catch (error) {
      console.error("Payment error:", error)
      // 这里可以添加错误处理逻辑
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
  )
}
