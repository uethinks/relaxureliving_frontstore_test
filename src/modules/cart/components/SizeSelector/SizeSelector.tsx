"use client"
import React, { useEffect, useState } from "react"
import {
  StoreProductOption,
  StoreProductParams,
  StoreProduct,
  StoreProductVariant,
  StoreProductOptionValue,
  StoreCartLineItem,
} from "@medusajs/types"
import { getProductByProductId } from "@lib/data/products"
import { useCart } from "@lib/context/cartContext"

export const SizeSelector = (): JSX.Element | null => {
  const { cart, getCart, addVariant, removeVariant } = useCart()
  const [product, setProduct] = useState<StoreProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [currentPergola, setCurrentPergola] =
    useState<StoreCartLineItem | null>(null)
  const [quantity] = useState<number>(currentPergola?.quantity ?? 1)
  const defaultPergola =
    cart?.items?.find((item) => item.product_type === "Pergula") || null
  /**
   * get the pergola in cart
   */
  useEffect(() => {
    const currentPergola =
      cart?.items?.find((item) => item.product_type === "Pergula") || null
    setCurrentPergola(currentPergola)
  }, [cart])

  //set the default size and color
  useEffect(() => {
    const fetchProduct = async () => {
      if (!defaultPergola?.product_id) return
      /**
       * first get the product with all variants
       */
      const queryParams: StoreProductParams = {
        fields: `*variants`,
      }
      const { product } = await getProductByProductId({
        productId: defaultPergola.product_id,
        queryParams,
      })
      setProduct(product)

      /**
       * then get the selected pergola variant
       */
      const selectedVariant = product.variants?.find(
        (variant: StoreProductVariant) =>
          variant.id === defaultPergola.variant_id
      )
      /**
       * then set the selected size and color
       */
      selectedVariant?.options?.forEach((option) => {
        if (option?.option?.title === "Size") {
          setSelectedSize(option.value)
        } else if (option?.option?.title === "Color") {
          setSelectedColor(option.value)
        }
      })
    }

    fetchProduct()
  }, [])

  const pergolaSizes = product?.options?.find(
    (option: StoreProductOption) => option.title === "Size"
  )
  const pergolaColors = product?.options?.find(
    (option: StoreProductOption) => option.title === "Color"
  )
  const removePergolaVariantByLineId = async () => {
    const lineId = currentPergola?.id ?? ""
    await removeVariant(lineId)
  }

  /**
   * get the variant id by size and color
   */
  const getPergolaVariantIdBySizeAndColor = (
    size: string | null,
    color: string | null
  ) => {
    const variant = product?.variants?.find(
      (variant: StoreProductVariant) =>
        variant.options?.find((option) => option.value === size) &&
        variant.options?.find((option) => option.value === color)
    )
    return variant?.id
  }

  /**
   * when the size is changed, update the variant info
   */
  const selecteSizeHandler = async (size: string) => {
    await removePergolaVariantByLineId()
    const variantId = getPergolaVariantIdBySizeAndColor(size, selectedColor)
    if (variantId) {
      await addVariant({
        variantId: variantId,
        quantity: quantity,
        countryCode: "us",
      })
    }
    await getCart()
    setSelectedSize(size)
  }

  /**
   * when the color is changed, update the variant info
   */
  const selecteColorHandler = (color: string) => {
    setSelectedColor(color)
    removePergolaVariantByLineId()
    const variantId = getPergolaVariantIdBySizeAndColor(selectedSize, color)
    if (variantId) {
      addVariant({
        variantId: variantId,
        quantity: quantity,
        countryCode: "us",
      })
    }
    getCart()
  }

  const selectedSizeClass = "rounded-[20px] bg-[#dce7f8] text-[#072f6c]"
  const unSelectedSizeClass = "text-[#69727a]"

  // if (!currentPergola) return null

  return (
    <div className={`flex-col items-start gap-5 relative flex`}>
      <div className="flex items-center justify-center gap-2.5 h-12 relative ">
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
          <div className="w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-lg leading-[25.2px] whitespace-nowrap relative tracking-[0]">
            Size :
          </div>
        </div>
        <div className="flex justify-center items-center border border-solid border-[#e9e9e9] h-12 rounded-[40px] bg-[#ffffff]">
          <div className="inline-flex justify-center items-center gap-[18px] relative px-4">
            {pergolaSizes?.values?.map((size: StoreProductOptionValue) => (
              <button
                onClick={() => selecteSizeHandler(size.value)}
                key={size.id}
                className="inline-flex items-center gap-2.5 flex-[0_0_auto] justify-center relative"
              >
                <div
                  className={`[font-family:'Montserrat',Helvetica] w-fit p-1.5 tracking-[0] text-lg font-medium leading-[27px] whitespace-nowrap relative ${
                    size.value === selectedSize
                      ? selectedSizeClass
                      : unSelectedSizeClass
                  }`}
                >
                  {size.value}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="inline-flex flex-col items-start gap-5 flex-[0_0_auto] relative">
        <div className="w-[411px] flex items-center gap-2.5 h-6 relative">
          <p className="[font-family:'Montserrat',Helvetica] w-[411px] mt-[-1.00px] tracking-[0] text-base text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative">
            What color would you like to choose?
          </p>
        </div>
        <div className="w-[301px] flex items-start gap-[30px] flex-[0_0_auto] relative">
          {pergolaColors?.values?.map((color: StoreProductOptionValue) => (
            <button
              key={color.id}
              className="w-[130px] flex items-center gap-2 relative"
              onClick={() => selecteColorHandler(color.value)}
            >
              <div className="border-2 border-solid border-[#072f6c] w-[41px] h-[41px] rounded-[20px] relative flex items-center justify-center">
                <div
                  className={`w-[31px] h-[31px] rounded-[15.5px] bg-[#7e7e7e] relative ${
                    color.value === selectedColor
                      ? "bg-[#7e7e7e]"
                      : "bg-[#ffffff]"
                  }`}
                />
              </div>

              <div className="w-[60px] flex items-start px-0 py-2.5 rounded-[20px] justify-center relative">
                <div className="w-[61px] flex items-center mr-[-0.50px] gap-2.5 ml-[-0.50px] px-0 py-2.5 h-6 rounded-[20px] relative">
                  <div className="[font-family:'Montserrat',Helvetica] w-[81px] mt-[-11.00px] tracking-[0] text-base mr-[-20.00px] text-[#072f6c] h-6 font-medium leading-6 whitespace-nowrap mb-[-9.00px] relative">
                    {color.value}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
