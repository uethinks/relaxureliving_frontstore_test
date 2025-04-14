"use client"

import React, { useEffect } from "react"
import { HttpTypes } from "@medusajs/types"

type AirwallexWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession & {
    data: {
      redirect_url: string
    }
  }
  children: React.ReactNode
}

const AirwallexWrapper: React.FC<AirwallexWrapperProps> = ({
  paymentSession,
  children,
}) => {
  useEffect(() => {
    const loadAirwallex = async () => {
      try {
        // 检查支付会话数据
        if (!paymentSession?.data?.redirect_url) {
          console.error("No redirect URL found in payment session")
          return
        }

        // 重定向到 Airwallex 支付页面
        window.location.href = paymentSession.data.redirect_url
      } catch (error) {
        console.error("Failed to initialize Airwallex:", error)
      }
    }

    loadAirwallex()
  }, [paymentSession])

  return <div>{children}</div>
}

export default AirwallexWrapper
