"use client"
import React, { useState, useEffect } from "react"
import { BuyNowButton } from "./components/BuyNowButton"
import { PergulaSizeSelector } from "./components/PergulaSizeSelector"
import { ImgContent } from "./components/ImgContent"
import { AccesorriesSelector } from "./components/AccesorriesSelector"
import { Advantage } from "./components/Advantage"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import {
  ImageOnLeft,
  ImageOnRight,
  Advantages,
  AccessoriesCards,
} from "./components/LandingPage"
import { Assembly, Description } from "./components/PergolaInformations"
type accessoryHeaterVirant = {
  productVarant: StoreProductVariant | null
  quantity: number
}
type accessoryShadesVariant = {
  productVarant: StoreProductVariant | null
  quantity: number
}
type accessoryGlassdoorVariant = {
  productVarant: StoreProductVariant | null
  quantity: number
}

export const ProductItem = ({
  product,
  accessories,
}: {
  product: StoreProduct
  accessories: StoreProduct[]
}): JSX.Element => {
  const [selectedVariant, setSelectedVariant] = useState<StoreProductVariant>()
  const [selectedAccessoriesHeater, setSelectedAccessoriesHeater] =
    useState<accessoryHeaterVirant>({ productVarant: null, quantity: 0 })
  const [selectedAccessoriesShades, setSelectedAccessoriesShades] =
    useState<accessoryShadesVariant>({ productVarant: null, quantity: 0 })
  const [selectedAccessoriesGlassdoor, setSelectedAccessoriesGlassdoor] =
    useState<accessoryGlassdoorVariant>({ productVarant: null, quantity: 0 })
  const [activeTab, setActiveTab] = useState("Description")
  const [pergolaQuantity, setPergolaQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const handleVariantChange = (variant: StoreProductVariant | undefined) => {
    setSelectedVariant(variant)
  }
  useEffect(() => {
    setTotalPrice(
      pergolaQuantity *
        (selectedVariant?.calculated_price?.calculated_amount ?? 0)
    )
  }, [pergolaQuantity, selectedVariant])
  const handleAccessoryToggle = ({
    type,
    productVarant,
    quantity,
  }: {
    type: string
    productVarant: StoreProductVariant | null
    quantity: number
  }) => {
    if (type === "Heating") {
      setSelectedAccessoriesHeater({ productVarant, quantity })
    } else if (type === "Shades") {
      setSelectedAccessoriesShades({ productVarant, quantity })
    } else if (type === "Glass door") {
      setSelectedAccessoriesGlassdoor({ productVarant, quantity })
    }
  }

  const router = useRouter()
  // add the selected variant to the cart
  const handleBuyNow = async () => {
    try {
      const results = await Promise.all([
        buyPergula(),
        buyHeater(),
        buyShades(),
        buyGlassdoor(),
      ])

      // 这里可以添加后续逻辑，比如导航到购物车页面
      router.push("/cart")
    } catch (error) {
      console.error("Error adding items to cart:", error)
    }
  }
  const buyPergula = async () => {
    console.log("selectedVariant", selectedVariant, pergolaQuantity)
    if (!selectedVariant?.id) return null

    return await addToCart({
      variantId: selectedVariant.id,
      quantity: pergolaQuantity,
      countryCode: "us",
    })
  }

  const buyHeater = async () => {
    if (
      !selectedAccessoriesHeater?.productVarant?.id ||
      !selectedAccessoriesHeater.quantity
    )
      return null

    return await addToCart({
      variantId: selectedAccessoriesHeater.productVarant.id,
      quantity: selectedAccessoriesHeater.quantity,
      countryCode: "us",
    })
  }

  const buyShades = async () => {
    if (
      !selectedAccessoriesShades?.productVarant?.id ||
      !selectedAccessoriesShades.quantity
    )
      return null

    return await addToCart({
      variantId: selectedAccessoriesShades.productVarant.id,
      quantity: selectedAccessoriesShades.quantity,
      countryCode: "us",
    })
  }

  const buyGlassdoor = async () => {
    if (
      !selectedAccessoriesGlassdoor?.productVarant?.id ||
      !selectedAccessoriesGlassdoor.quantity
    )
      return null

    return await addToCart({
      variantId: selectedAccessoriesGlassdoor.productVarant.id,
      quantity: selectedAccessoriesGlassdoor.quantity,
      countryCode: "us",
    })
  }

  return (
    <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full overflow-hidden">
      <NavBarWrapper isFixed={false} />
      <div className="flex flex-col justify-between items-start bg-[#ffffff] w-full md:w-full lg:w-[90%] 2xl:w-[1512px] relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-10">
        <div className="flex flex-col w-full lg:w-[65%] items-center gap-5 px-4">
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative mb-2 self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              {product.title}
            </div>
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <p className="w-full text-[#69727a] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[22px] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                {product.subtitle}
              </p>
            </div>
            <p className="w-full text-[#69727a] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              {product.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-start bg-[#ffffff] w-full relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="w-full lg:w-[65%] px-4 relative flex flex-col">
            <div className="flex flex-row justify-between mt-4">
              <ImgContent product={product} property1="default" />
            </div>
            <div className="mt-10 flex lg:hidden flex-col w-full items-start gap-2.5 p-5 relative bg-[#f3f3f3] rounded-[20px]">
              <div className="flex w-full flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="flex w-full flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                  <div className="flex justify-between items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
                      <div className="w-fit [font-family:'Montserrat',Helvetica] font-semibold text-[22px] leading-[30.8px] whitespace-nowrap relative mt-[-1.00px] text-[#343a40] tracking-[0]">
                        ${totalPrice}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 relative">
                      <button
                        onClick={() =>
                          setPergolaQuantity(
                            pergolaQuantity == 1
                              ? pergolaQuantity
                              : pergolaQuantity - 1
                          )
                        }
                        className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                      >
                        <span className="text-[#343a40] text-lg -mt-0.5">
                          -
                        </span>
                      </button>
                      <div className="text-[#343a40] text-lg font-medium">
                        {pergolaQuantity}
                      </div>
                      <button
                        onClick={() => setPergolaQuantity(pergolaQuantity + 1)}
                        className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                      >
                        <span className="text-[#343a40] text-lg -mt-0.5">
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full items-end gap-2.5 relative">
                  <PergulaSizeSelector
                    product={product}
                    className="!self-stretch !flex-[0_0_auto] !flex"
                    property1="default"
                    onVariantChange={handleVariantChange}
                  />
                  <AccesorriesSelector
                    onAccessoryChange={handleAccessoryToggle}
                    accessories={accessories}
                    selectedHeaterVariant={selectedAccessoriesHeater}
                    selectedShadesVariant={selectedAccessoriesShades}
                    selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
                  />
                </div>
                <BuyNowButton
                  onClick={handleBuyNow}
                  property1="primary-button-l"
                  text="Buy now"
                  className=""
                />
              </div>
            </div>
            <div className="flex flex-col w-full items-center gap-4 mt-6">
              <Advantage />

              <div className="inline-flex items-start gap-10 relative flex-[0_0_auto]">
                {["Description", "Assembly"].map((tab) => (
                  <button
                    key={tab}
                    className={`inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] cursor-pointer ${
                      activeTab === tab ? "bg-[#dce7f8]" : "bg-[#f3f3f3]"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <div
                      className={`w-fit mt-[-4.00px] mb-[-2.00px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px] ${
                        activeTab === tab ? "text-[#072f6c]" : "text-[#343a40]"
                      }`}
                    >
                      {tab}
                    </div>
                  </button>
                ))}
              </div>
              {activeTab === "Description" && <Description />}
            </div>
          </div>
          <div className="hidden lg:flex w-full lg:w-[35%] justify-end items-start mt-4 gap-2.5 px-2.5 sticky top-0 right-0">
            <div className="flex flex-col w-full items-start gap-2.5 p-5 relative bg-[#f3f3f3] rounded-[20px] overflow-y-auto">
              <div className="flex w-full flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="flex w-full flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                  <div className="flex justify-between items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
                      <div className="w-fit [font-family:'Montserrat',Helvetica] font-semibold text-[22px] leading-[30.8px] whitespace-nowrap relative mt-[-1.00px] text-[#343a40] tracking-[0]">
                        ${totalPrice}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 relative">
                      <button
                        onClick={() =>
                          setPergolaQuantity(
                            pergolaQuantity == 1
                              ? pergolaQuantity
                              : pergolaQuantity - 1
                          )
                        }
                        className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                      >
                        <span className="text-[#343a40] text-lg -mt-0.5">
                          -
                        </span>
                      </button>
                      <div className="text-[#343a40] text-lg font-medium">
                        {pergolaQuantity}
                      </div>
                      <button
                        onClick={() => setPergolaQuantity(pergolaQuantity + 1)}
                        className="w-6 h-6 bg-white rounded-full border border-[#f3f3f3] flex items-center justify-center"
                      >
                        <span className="text-[#343a40] text-lg -mt-0.5">
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full items-end gap-2.5 relative">
                  <PergulaSizeSelector
                    product={product}
                    className="!self-stretch !flex-[0_0_auto] !flex"
                    property1="default"
                    onVariantChange={handleVariantChange}
                  />
                  <AccesorriesSelector
                    onAccessoryChange={handleAccessoryToggle}
                    accessories={accessories}
                    selectedHeaterVariant={selectedAccessoriesHeater}
                    selectedShadesVariant={selectedAccessoriesShades}
                    selectedGlassdoorVariant={selectedAccessoriesGlassdoor}
                  />
                </div>
                <BuyNowButton
                  onClick={handleBuyNow}
                  property1="primary-button-l"
                  text="Buy now"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full relative flex justify-end items-start mt-4 gap-2.5 px-2.5">
          {activeTab === "Assembly" && <Assembly />}
        </div>
        <ImageOnLeft />
        <ImageOnRight />
        <Advantages />
        <AccessoriesCards />
        <OurPromise />
      </div>
      <FooterDark />
    </div>
  )
}
