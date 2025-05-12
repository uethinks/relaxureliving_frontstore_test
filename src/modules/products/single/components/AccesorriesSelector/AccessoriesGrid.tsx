"use client"

import { StoreProduct } from "@medusajs/types"
import { useState } from "react"

interface AccessoriesGridProps {
  accessories: StoreProduct[]
}

export const AccessoriesGrid = ({ accessories }: AccessoriesGridProps) => {
  const [selectedAccessory, setSelectedAccessory] =
    useState<StoreProduct | null>(null)

  const handleAccessoryClick = (accessory: StoreProduct) => {
    setSelectedAccessory(accessory)
  }

  return (
    <div className="mt-10">
      <h2 className="text-[44px] font-merriweather font-bold mb-8">
        Accessories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((accessory) => (
          <div
            key={accessory.id}
            className="relative bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9] hover:border-[#072F6C] transition-colors"
          >
            {accessory.thumbnail && (
              <div className="aspect-square overflow-hidden">
                <img
                  src={accessory.thumbnail}
                  alt={accessory.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-merriweather text-[28px] font-bold text-[#343A40]">
                  {accessory.title}
                </h3>
                <span className="text-[22px] font-montserrat font-medium text-[#343A40]">
                  $
                  {accessory.variants?.[0]?.calculated_price
                    ?.calculated_amount ?? 0}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleAccessoryClick(accessory)}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#072F6C] text-white flex items-center justify-center hover:bg-[#0A3D8F] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4V16M4 10H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
