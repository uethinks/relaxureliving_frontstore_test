"use client"
import React, { useState } from "react"
import { BuyNowButton } from "./components/BuyNowButton"
import { PergulaSizeSelector } from "./components/PergulaSizeSelector"
import { ImgContent } from "./components/ImgContent"
import { AccesorriesSelector } from "./components/AccesorriesSelector"
import { Advantage } from "./components/Advantage"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
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

  const handleVariantChange = (variant: StoreProductVariant | undefined) => {
    setSelectedVariant(variant)
  }

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

  const tabContent = {
    Description: {
      image: "https://c.animaapp.com/ZNF68wCJ/img/img@4x.jpg",
      text: "This modern pergola is the perfect blend of sleek design and durability, crafted from premium materials to ensure both style and longevity. Featuring a robust aluminum frame, it is powder-coated for superior resistance to weathering, corrosion, and fading, making it ideal for year-round outdoor use. The elegant, minimalist design is complemented by clean lines and a streamlined structure, adding a touch of sophistication to any garden, patio, or backyard.",
    },
    Assembly: {
      image: "https://example.com/assembly-image.jpg",
      text: "Assembly of this pergola is straightforward and can typically be completed in a few hours. The kit comes with all necessary hardware and detailed instructions. We recommend having at least two people for the assembly process for safety and efficiency.",
    },
    Shipping: {
      image: "https://example.com/shipping-image.jpg",
      text: "We offer free shipping on all pergola orders within the continental United States. Delivery typically takes 2-3 weeks from the order date. International shipping is available at an additional cost, with delivery times varying by location.",
    },
  }

  return (
    <div className="bg-[#ffffff] flex flex-row justify-center w-full">
      <div className="bg-[#ffffff] w-[1512px] h-[3533px] relative">
        <div className="flex flex-col w-[817px] items-center gap-5 absolute top-[152px] left-20">
          <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              {product.title}
            </div>

            <p className="w-[795px] text-[#69727a] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              {product.description}
            </p>
          </div>

          <ImgContent product={product} property1="default" />
        </div>

        <div className="inline-flex items-center gap-2.5 px-2.5 py-10 absolute top-[260px] left-[947px]">
          <div className="flex flex-col w-[470px] items-start gap-2.5 p-5 relative">
            <div className="absolute w-[470px] h-full top-0 left-0 bg-[#f3f3f3] rounded-[20px] overflow-hidden shadow-shadow-relaxure-button opacity-90"></div>

            <div className="inline-flex flex-col items-start gap-10 relative flex-[0_0_auto]">
              <div className="flex flex-col w-[428px] items-start gap-2.5 relative flex-[0_0_auto]">
                <div className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-center gap-2.5 relative flex-1 grow">
                    <div className="relative w-[282px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[22px] tracking-[0] leading-[33px]">
                      {product.subtitle}
                    </div>
                  </div>

                  <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
                    <div className="w-fit [font-family:'Montserrat',Helvetica] font-semibold text-[22px] leading-[30.8px] whitespace-nowrap relative mt-[-1.00px] text-[#343a40] tracking-[0]">
                      {selectedVariant?.calculated_price?.currency_code}
                      {selectedVariant?.calculated_price?.calculated_amount}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-[430px] items-end gap-[50px] relative">
                <PergulaSizeSelector
                  product={product}
                  className="!self-stretch !flex-[0_0_auto] !flex !w-full"
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
                property1="primary-button-l"
                text="Buy now"
                className=""
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[817px] items-center gap-[60px] absolute top-[917px] left-20">
          <Advantage />

          <div className="inline-flex items-start gap-[60px] relative flex-[0_0_auto]">
            {["Description", "Assembly", "Shipping"].map((tab) => (
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
        </div>

        <img
          className="absolute w-[817px] h-[600px] top-[1232px] left-20 object-cover"
          alt="Img"
          src={tabContent[activeTab as keyof typeof tabContent].image}
        />

        <div className="flex flex-col w-[817px] items-start gap-10 absolute top-[1872px] left-20">
          <div className="flex flex-col items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <p className="flex-1 font-heading-2 font-[number:var(--heading-2-font-weight)] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative mt-[-1.00px] text-[#343a40] tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
                {activeTab}
              </p>
            </div>

            <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <p className="flex-1 mt-[-1.00px] text-[#68717a] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                {tabContent[activeTab as keyof typeof tabContent].text}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-10 p-5 relative self-stretch w-full flex-[0_0_auto] bg-[#f3f3f3] rounded-[20px]">
            <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
              <img
                className="relative w-[30px] h-[30px]"
                alt="Frame"
                src="https://c.animaapp.com/ZNF68wCJ/img/frame-1000004741.svg"
              />

              <p className="flex-1 mt-[-1.00px] text-[#68717a] relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                This {selectedVariant?.title} pergola offers a spacious design,
                ideal for outdoor areas.
              </p>
            </div>

            <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
              <div className="relative w-[30px] h-[30px] bg-[url(https://c.animaapp.com/ZNF68wCJ/img/group-4@2x.png)] bg-[100%_100%]" />

              <p className="flex-1 mt-[-1.00px] text-[#68717a] relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                Selected accessories:
                {Boolean(
                  selectedAccessoriesShades?.productVarant &&
                    selectedAccessoriesShades?.quantity
                ) && (
                  <span>
                    {selectedAccessoriesHeater?.productVarant?.title ?? ""}{" "}
                  </span>
                )}
                {Boolean(
                  selectedAccessoriesShades?.productVarant &&
                    selectedAccessoriesShades?.quantity
                ) && (
                  <span>
                    {selectedAccessoriesShades?.productVarant?.title ?? ""}{" "}
                  </span>
                )}
                {Boolean(
                  selectedAccessoriesGlassdoor?.productVarant &&
                    selectedAccessoriesGlassdoor?.quantity
                ) && (
                  <span>
                    {selectedAccessoriesGlassdoor?.productVarant?.title ?? ""}{" "}
                  </span>
                )}
              </p>
            </div>

            <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
              <img
                className="relative w-[30px] h-[30px]"
                alt="Frame"
                src="https://c.animaapp.com/ZNF68wCJ/img/frame-1000004742.svg"
              />

              <p className="flex-1 mt-[-1.00px] text-[#68717a] relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                Customizable features allow you to create the perfect outdoor
                space for your needs.
              </p>
            </div>
          </div>
        </div>

        <img
          className="absolute w-[1512px] h-[688px] top-[2845px] left-0"
          alt="Footer dark"
          src="https://c.animaapp.com/ZNF68wCJ/img/footer-4-dark@2x.png"
        />

        <div className="flex w-[1248px] h-[75px] items-center justify-end gap-[305px] p-5 absolute top-[34px] left-[132px] bg-[#f4f4f4cc] rounded-[20px] backdrop-blur-[13.8px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(13.8px)_brightness(100%)]">
          <div className="relative w-[76.45px] h-12 mt-[-6.50px] mb-[-6.50px] ml-[-1.45px] bg-[url(https://c.animaapp.com/ZNF68wCJ/img/logo.svg)] bg-[100%_100%]" />

          <div className="inline-flex items-center gap-[54px] relative flex-[0_0_auto] mt-[-6.50px] mb-[-6.50px]">
            <div className="flex w-[574px] h-11 items-center justify-end gap-10 relative">
              <div className="flex w-[111px] items-center justify-center gap-2.5 px-0 py-2.5 relative">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                  Accesories
                </div>
              </div>

              <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                  Features
                </div>
              </div>

              <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                  Our pergola
                </div>
              </div>
            </div>

            <BuyNowButton
              className=""
              property1="primary-button-l"
              text="Contact us"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
