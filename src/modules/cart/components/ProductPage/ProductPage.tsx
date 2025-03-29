import React from "react"
import { OrderSummary } from "../OrderSummary/OrderSummary"
import { ProductCard } from "../ProductCard/ProductCard"
import { HeaterCard } from "../HeaterCard/HeaterCard"
import { GlassDoorCard } from "../GlassDoorCard/GlassDoorCard"
import { ShadesCard } from "../ShadesCard/ShadesCard"
import { Header } from "../Header/Header"
import { AccessoriesSection } from "../AccessoriesSection/AccessoriesSection"

export const ProductPage = (): JSX.Element => {
  return (
    <div className="bg-[#ffffff] flex flex-row justify-center w-full">
      <div className="bg-[#ffffff] w-full md:w-full lg:w-[90%] 2xl:w-[1512px] relative flex flex-col justify-center items-center pt-10">
        <Header />

        <div className="inline-flex items-center justify-start gap-2.5 p-2.5 w-full mt-10">
          <img
            className="relative w-[30px] h-[30px]"
            alt="Frame"
            src="https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-1000004708.svg"
          />
          <div className="w-fit mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] whitespace-nowrap relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
            Products
          </div>
        </div>
        <div className="flex items-start justify-between gap-2.5 p-2.5 w-full mt-10">
          <div className="flex flex-col gap-2.5">
            <ProductCard />
            <HeaterCard />
            <GlassDoorCard />
            <ShadesCard />
          </div>
          <div className="flex flex-col justify-start gap-2.5">
            <OrderSummary />
          </div>
        </div>
        <AccessoriesSection />
        <img
          className="absolute w-[1512px] h-[688px] top-[3198px] left-0"
          alt="Footer dark"
          src="https://c.animaapp.com/m8o9g6iofzwjOy/img/footer-4-dark.png"
        />
      </div>
    </div>
  )
}
