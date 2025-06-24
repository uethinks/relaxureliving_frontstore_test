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
import { SampleKitCard } from "../SampleKitCard/SampleKitCard"
import { useCart } from "@lib/context/cartContext"
import { StoreProduct } from "@medusajs/types"
import { EmptyCart } from "../EmptyCart/EmptyCart"
import { PergolaData, BoringButImportantStuff } from "@/types/global"
import Breadcrumb from "@/components/Breadcrumb"
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

export const ProductPage = ({
  accessories,
}: {
  accessories: StoreProduct[]
}): JSX.Element => {
  const [faq, setFaq] = useState<FAQData | null>(null)
  const [ourPromise, setOurPromise] = useState<BoringButImportantStuff | null>(
    null
  )
  const { cart } = useCart()

  // 初始化加载 FAQ 数据
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const { data } = await getHomePage()
        setFaq(data.FAQ)
        setOurPromise(data.OurPromise)
      } catch (error) {
        console.error("Failed to fetch FAQ:", error)
      }
    }

    const timer = setTimeout(() => {
      fetchFAQ()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Check if cart is empty
  const isCartEmpty = !cart?.items || cart.items.length === 0

  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px]">
        <div className="bg-[#ffffff] w-full relative flex flex-col justify-center items-center pt-0 px-5 lg:px-20">
          <NavBarWrapper isFixed={false} />

          {!isCartEmpty ? (
            <div className="inline-flex items-center justify-start gap-2.5 w-full">
              <img
                className="relative w-[30px] h-[30px]"
                alt="Frame"
                src="/img/cart.png"
                loading="lazy"
              />
              <div className="w-fit mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[24px] lg:text-[36px] leading-[var(--heading-2-line-height)] whitespace-nowrap relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
                Shopping Cart
              </div>
            </div>
          ) : null}
          <Breadcrumb steps={["Cart", "Information", "Payment"]} current={0} />
          {isCartEmpty ? (
            <EmptyCart />
          ) : (
            <div className="relative flex flex-col mt-10 lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-2.5 w-full">
              <div className="flex flex-col gap-[30px] w-full lg:w-2/3">
                <ProductCard />
                <ShadesCard />
                <HeaterCard />
                <GlassDoorCard />
                <SampleKitCard />
              </div>
              <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3 sticky top-10">
                <OrderSummary />
              </div>
            </div>
          )}
        </div>

        <Suspense>
          {/* <AccessoriesSection accessories={accessories} /> */}
        </Suspense>
      </div>
      <Suspense>
        <OurPromise
          pergolaData={
            {
              boringButImportantStuff: ourPromise,
            } as PergolaData
          }
        />
        {faq && <FaqWrapper faq={faq} />}
        <FooterDark />
      </Suspense>
    </>
  )
}
