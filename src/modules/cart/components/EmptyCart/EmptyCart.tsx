import React from "react"
import { Button } from "@medusajs/ui"
import Link from "next/link"

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-start lg:justify-center min-h-[60vh] w-full max-w-[800px] mx-auto px-4">
      <h1 className="text-[24px] font-medium lg:text-[36px] font-merriweather leading-[48px] text-[#343a40] mb-6 text-center">
        Your cart is empty
      </h1>
      <p className="text-[16px] font-montserrat lg:text-[18px] text-medium leading-[28px] text-[#495057] text-center max-w-[640px] mb-10">
        Our flagship pergola with motorized louvers, intelligent weather
        sensors, and app connectivity for complete control over your outdoor
        environment in any season.
      </p>
      <Link href="/products/pergola">
        <Button
          variant="primary"
          className="h-[48px] px-8 text-[16px] text-black lg:text-[18px] font-medium font-montserrat bg-[#F6AF1F] hover:bg-[#fdce6f] transition-colors"
        >
          Explore The Corsica
        </Button>
      </Link>
    </div>
  )
}
