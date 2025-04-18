"use client"
import React, { useEffect, useState, Suspense, lazy } from "react"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { OrderSummary } from "../OrderSummary/OrderSummary"
import { ProductCard } from "../ProductCard/ProductCard"
import { HeaterCard } from "../HeaterCard/HeaterCard"
import { GlassDoorCard } from "../GlassDoorCard/GlassDoorCard"
import { ShadesCard } from "../ShadesCard/ShadesCard"
import { useCart } from "@lib/context/cartContext"

// Lazy load only non-critical components
const AccessoriesSection = lazy(() =>
  import("../AccessoriesSection/AccessoriesSection").then((module) => ({
    default: module.AccessoriesSection,
  }))
)
const OurPromise = lazy(() =>
  import("@modules/home/homepage/page/sections/OurPromise").then((module) => ({
    default: module.OurPromise,
  }))
)
const FaqWrapper = lazy(() =>
  import("@modules/home/homepage/page/sections/FaqWrapper").then((module) => ({
    default: module.FaqWrapper,
  }))
)

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
  const { cart } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  // 初始化加载 FAQ 数据
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const { data } = await getHomePage()
        setFaq(data.FAQ)
      } catch (error) {
        console.error("Failed to fetch FAQ:", error)
      }
    }

    const timer = setTimeout(() => {
      fetchFAQ()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 监听购物车数据加载状态
  useEffect(() => {
    if (cart !== null) {
      setIsLoading(false)
    }
  }, [cart])

  if (isLoading) {
    return (
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px] min-h-screen"></div>
    )
  }

  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px]">
        <div className="bg-[#ffffff] w-full relative flex flex-col justify-center items-center pt-0 px-5 lg:px-20">
          <NavBarWrapper isFixed={false} />

          <div className="inline-flex items-center justify-start gap-2.5 w-full">
            <img
              className="relative w-[30px] h-[30px]"
              alt="Frame"
              src="https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-1000004708.svg"
              loading="lazy"
            />
            <div className="w-fit mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] whitespace-nowrap relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
              Products
            </div>
          </div>

          <div className="relative flex flex-col mt-10 lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-2.5 w-full">
            <div className="flex flex-col gap-[30px] w-full lg:w-2/3">
              <ProductCard />
              <HeaterCard />
              <GlassDoorCard />
              <ShadesCard />
            </div>
            <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3 sticky top-10">
              <OrderSummary />
            </div>
          </div>
        </div>
        <Suspense>
          <AccessoriesSection />
        </Suspense>
      </div>
      <Suspense>
        <OurPromise />
        {faq && <FaqWrapper faq={faq} />}
        <FooterDark />
      </Suspense>
    </>
  )
}
