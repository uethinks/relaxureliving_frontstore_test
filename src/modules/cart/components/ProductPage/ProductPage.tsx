"use client"
import React, { useEffect, useState } from "react"
import { OrderSummary } from "../OrderSummary/OrderSummary"
import { ProductCard } from "../ProductCard/ProductCard"
import { HeaterCard } from "../HeaterCard/HeaterCard"
import { GlassDoorCard } from "../GlassDoorCard/GlassDoorCard"
import { ShadesCard } from "../ShadesCard/ShadesCard"
import { AccessoriesSection } from "../AccessoriesSection/AccessoriesSection"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import { FaqWrapper } from "@modules/home/homepage/page/sections/FaqWrapper"
import { getHomePage } from "@lib/cms/strapiCmsApi"

interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}
export const ProductPage = (): JSX.Element => {
  const [faq, setFaq] = useState<FAQData | null>(null)
  useEffect(() => {
    getHomePage().then(({ data }) => {
      setFaq(data.FAQ)
    })
  }, [])
  return (
    <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full">
      <div className="bg-[#ffffff] w-full lg:w-[90%] 2xl:w-[1512px] relative flex flex-col justify-center items-center pt-10">
        <NavBarWrapper isFixed={false} />

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
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-2.5 p-2.5 w-full mt-10">
          <div className="flex flex-col gap-2.5 w-full lg:w-2/3">
            <ProductCard />
            <HeaterCard />
            <GlassDoorCard />
            <ShadesCard />
          </div>
          <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3">
            <OrderSummary />
          </div>
        </div>
        <AccessoriesSection />
        <OurPromise />
        {/* FAQ */}
        {faq && <FaqWrapper faq={faq} />}
      </div>
      <FooterDark />
    </div>
  )
}
