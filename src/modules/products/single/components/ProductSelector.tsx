"use client"
import React from "react"
import { BuyNowButton } from "./BuyNowButton"
import { PergulaSizeSelector } from "./PergulaSizeSelector"
import { AccesorriesSelector } from "./AccesorriesSelector"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { PergolaSize, selectedProducts } from "types/global"

interface ProductSelectorProps {
  product: StoreProduct
  accessories: StoreProduct[]
  onVariantChange: (variant: StoreProductVariant | undefined) => void
  onAccessoryToggle: ({
    type,
    selectedProducts,
  }: {
    type: string
    selectedProducts: selectedProducts
  }) => void
  selectedVariant?: StoreProductVariant
  selectedAccessoriesHeater: selectedProducts
  selectedAccessoriesShades: selectedProducts
  selectedAccessoriesGlassdoor: selectedProducts
  pergolaSize: PergolaSize
  pergolaQuantity: number
  totalPrice: number
  onQuantityChange: (quantity: number) => void
  onBuyNow: () => void
  isMobile?: boolean
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  product,
  accessories,
  onVariantChange,
  onAccessoryToggle,
  selectedVariant,
  selectedAccessoriesHeater,
  selectedAccessoriesShades,
  selectedAccessoriesGlassdoor,
  pergolaSize,
  pergolaQuantity,
  totalPrice,
  onQuantityChange,
  onBuyNow,
  isMobile = false,
}) => {
  const baseClasses = isMobile
    ? "mt-10 flex lg:hidden flex-col w-full items-start gap-2.5 p-2 md:p-5 relative bg-[#f3f3f3] rounded-[20px]"
    : "hidden lg:flex w-full lg:max-w-[470px] justify-end items-start mt-4 gap-2.5 px-2.5 sticky top-[280px] right-[-132px]"

  return (
    <div className={baseClasses}>
      <div
        className={`flex flex-col w-full items-start gap-2.5 md:p-5 relative ${
          !isMobile && "bg-[#f3f3f3] rounded-[20px]"
        }`}
      >
        <div className="flex w-full flex-col items-start gap-4 relative">
          <div className="flex w-full flex-col items-start gap-2.5 relative">
            <div className="flex justify-between items-start gap-2.5 relative self-stretch w-full">
              <div className="flex items-center justify-center gap-2.5 px-2.5 py-0 relative">
                <div className="w-fit [font-family:'Montserrat',Helvetica] font-semibold text-[22px] leading-[30.8px] whitespace-nowrap relative mt-[-1.00px] text-[#343a40] tracking-[0]">
                  ${totalPrice}
                </div>
              </div>
              <div className="flex items-center gap-2.5 relative">
                <button
                  onClick={() =>
                    onQuantityChange(
                      pergolaQuantity > 1 ? pergolaQuantity - 1 : 1
                    )
                  }
                  className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                >
                  <span className="text-[#343a40] text-lg -mt-0.5">-</span>
                </button>
                <div className="text-[#343a40] text-lg font-medium">
                  {pergolaQuantity}
                </div>
                <button
                  onClick={() => onQuantityChange(pergolaQuantity + 1)}
                  className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                >
                  <span className="text-[#343a40] text-lg -mt-0.5">+</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-end gap-2.5 relative">
            <PergulaSizeSelector
              product={product}
              className="!self-stretch !flex-[0_0_auto] !flex"
              property1="default"
              onVariantChange={onVariantChange}
            />
            <AccesorriesSelector
              pergolaSize={pergolaSize}
              onAccessoryChange={onAccessoryToggle}
              accessories={accessories}
              selectedHeaterVariant={selectedAccessoriesHeater}
              selectedShadesVariant={selectedAccessoriesShades}
              selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
            />
          </div>
          <BuyNowButton
            onClick={onBuyNow}
            property1="primary-button-l"
            text="Add to cart"
            className=""
          />
          <div className="flex items-center justify-center w-full mt-2 py-3 px-4 border border-[#0A3B5C] rounded-[10px]">
            <p className="text-[#0A3B5C] text-center text-base">
              Pay ${Math.round(totalPrice / 24)}/mo x 24 with{" "}
              <span className="font-bold">Klarna.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
