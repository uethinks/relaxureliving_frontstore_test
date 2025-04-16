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
import { retrieveCustomer } from "@lib/data/customer"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import Link from "next/link"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { init } from "@airwallex/components-sdk"
import { notFound } from "next/navigation"
import { Checkout as CheckoutComponent } from "@modules/checkout/page/Checkout"

export default function CheckoutPage() {
  const { cart, setCart, getCart } = useCart()
  const [shippingOptions, setShippingOptions] = useState<any[]>([])
  const [isFormValid, setIsFormValid] = useState(false)
  const [validationTimeout, setValidationTimeout] =
    useState<NodeJS.Timeout | null>(null)
  const [customer, setCustomer] = useState<any>(null)
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

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await retrieveCustomer()
        setCustomer(customerData)
      } catch (error) {
        console.error("Error fetching customer:", error)
      }
    }
    fetchCustomer()
  }, [])

  if (!cart) {
    return notFound()
  }

  return <CheckoutComponent />
}
