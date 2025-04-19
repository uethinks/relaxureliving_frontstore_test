"use client"

import React from "react"
import { AccessoriesGrid } from "@modules/products/single/components/AccesorriesSelector/AccessoriesGrid"
import { StoreProduct } from "@medusajs/types"

export const AccessoriesSection = ({
  accessories,
}: {
  accessories: StoreProduct[]
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-20 py-0 relative self-stretch w-full flex-[0_0_auto] mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[20px]">
      <AccessoriesGrid accessories={accessories} />
    </div>
  )
}
