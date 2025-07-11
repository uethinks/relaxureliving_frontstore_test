"use client"
import React, { useState, useEffect } from "react"
import { useCart } from "@lib/context/cartContext"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { getProductByProductId } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import { SampleKit } from "@/types/global"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

export const ProductpageSampleKit = ({
  sampleKit,
}: {
  sampleKit: SampleKit
}): JSX.Element => {
  const { addVariant } = useCart()
  const [showDialog, setShowDialog] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [sampleKitProduct, setSampleKitProduct] =
    useState<HttpTypes.StoreProduct | null>(null)
  console.log("sampleKit", sampleKit)

  useEffect(() => {
    const fetchSampleKit = async () => {
      try {
        const region = await getRegion(defaultCountryCode)
        if (!region) return

        const { product } = await getProductByProductId({
          productId: sampleKit.product_id,
          queryParams: {},
        })
        if (product) {
          setSampleKitProduct(product)
        }
      } catch (error) {
        console.error("Failed to fetch sample kit:", error)
      }
    }

    fetchSampleKit()
  }, [])

  const handleAddToCart = async () => {
    if (!sampleKitProduct?.variants?.[0]?.id) {
      console.error("Sample kit variant not found")
      return
    }

    try {
      console.log("Adding sample kit to cart...")
      await addVariant({
        variantId: sampleKitProduct.variants[0].id,
        quantity: 1,
        countryCode: defaultCountryCode,
      })
      console.log("Sample kit added successfully, showing success message")
      setShowSuccess(true)
      setShowDialog(false)
      setTimeout(() => {
        console.log("Hiding success message")
        setShowSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Failed to add sample kit to cart:", error)
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <div
      id="sample-kit"
      className="flex flex-col justify-center w-full items-center gap-5 lg:px-[260px]"
    >
      <div className="flex flex-col justify-center items-center relative self-stretch w-full flex-[0_0_auto]">
        <img
          className="relative max-w-[360px] mt-[-10.00px] rounded-[30px] border-[10px] border-solid border-[#ffffff]"
          alt="Rectangle"
          src={`${baseUrl}${sampleKit?.product_image?.url}`}
        />

        <div className="flex flex-col justify-center mt-5 items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            {sampleKit?.title}
          </div>

          <p className="relative w-full opacity-80 font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#69727A] text-[14px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] text-center tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
            {sampleKit?.description}
          </p>
          <div className="inline-flex flex-col items-center gap-5 relative flex-[0_0_auto]">
            <button
              onClick={() => setShowDialog(true)}
              className="w-[271px] h-[48px] border bg-[#F6AF1F] rounded-[10px] shadow-[0px_3px_7px_rgba(246,175,31,0.15),0px_13px_13px_rgba(246,175,31,0.10),0px_29px_17px_rgba(246,175,31,0.05),0px_51px_20px_rgba(246,175,31,0.03),0px_80px_22px_rgba(246,175,31,0.01)] overflow-hidden"
            >
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                {sampleKit?.button_name}
              </div>
            </button>
            <div className="relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#69727A] text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              {sampleKit?.price_info}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDialog}
        title="Add Sample Kit to Cart"
        message="Are you sure you want to add this sample kit to your cart?"
        onConfirm={handleAddToCart}
        onCancel={() => setShowDialog(false)}
      />

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn z-50">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Sample kit added to cart successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}
