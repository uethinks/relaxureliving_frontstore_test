"use client"
import React, { useState, useEffect } from "react"
import { useCart } from "@lib/context/cartContext"
import { ConfirmDialog } from "../../../../../../components/ConfirmDialog"
import { getProductByHandle } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

export const HomepageSampleKit = (): JSX.Element => {
  const { addVariant } = useCart()
  const [showDialog, setShowDialog] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [sampleKitProduct, setSampleKitProduct] =
    useState<HttpTypes.StoreProduct | null>(null)

  useEffect(() => {
    const fetchSampleKit = async () => {
      try {
        const region = await getRegion(defaultCountryCode)
        if (!region) return

        const { products } = await getProductByHandle({
          queryParams: {
            region_id: region.id,
            handle: "sample-kit",
          },
        })
        if (products.length > 0) {
          setSampleKitProduct(products[0])
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
      await addVariant({
        variantId: sampleKitProduct.variants[0].id,
        quantity: 1,
        countryCode: defaultCountryCode,
      })
      setShowSuccess(true)
      setShowDialog(false)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error("Failed to add sample kit to cart:", error)
    }
  }
  return (
    <div
      id="sample-kit"
      className="flex flex-col justify-center w-full items-center gap-5 mt-[68px] mb-[100px] lg:px-[260px]"
    >
      <div className="flex justify-center items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
        <img
          className="relative max-w-[360px] mt-[-10.00px] rounded-[30px] border-[5px] border-[#ffffff]"
          alt="Rectangle"
          src={sampleKitProduct?.images?.[0]?.url ?? undefined}
        />

        <div className="flex flex-col justify-center items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-white text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            {sampleKitProduct?.title}
          </h2>

          <p className="relative w-full opacity-80 font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-white text-[14px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] text-center tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
            {sampleKitProduct?.description}
          </p>
          <div className="inline-flex flex-col items-center gap-5 relative flex-[0_0_auto]">
            <button
              onClick={() => setShowDialog(true)}
              className="w-[271px] h-[48px] bg-[#F6AF1F] hover:bg-[#fdce6f] transition-colors border-[#ffffff] border rounded-[10px] shadow-[0px_3px_7px_#072f6c1a,0px_13px_13px_#072f6c17,0px_29px_17px_#072f6c0d,0px_51px_20px_#072f6c03,0px_80px_22px_#072f6c00] overflow-hidden"
            >
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-black text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                {sampleKitProduct?.subtitle}
              </div>
            </button>
            <div className="relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#ffffff] text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              $
              {
                sampleKitProduct?.variants?.[0]?.calculated_price
                  ?.calculated_amount
              }{" "}
              with Free Shipping
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
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
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
