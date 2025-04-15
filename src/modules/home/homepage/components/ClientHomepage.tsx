"use client"
import React, { useEffect, useState, lazy } from "react"
import { OurPergola } from "../page/sections/OurPergola"
import { Accessories } from "../page/sections/Accessories"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { OurPromise } from "../page/sections/OurPromise"
import { Features } from "../page/sections/Features"
import { Hero } from "../page/sections/Hero"
import { NavBarWrapper } from "../page/sections/NavBarWrapper"
import { SWRConfig } from "swr"
import {
  HeroProps,
  OurPergolaProps,
  features,
  Accessories as AccessoriesType,
  HomepageBlog,
} from "types/global"
import { FAQData, ContactUsProps } from "../types"

const Testimonials = lazy(() =>
  import("../page/sections/Testimonials").then((module) => ({
    default: module.Testimonials,
  }))
)

const OurBlog = lazy(() =>
  import("../page/sections/OurBlog").then((module) => ({
    default: module.OurBlog,
  }))
)

const FaqWrapper = lazy(() =>
  import("../page/sections/FaqWrapper").then((module) => ({
    default: module.FaqWrapper,
  }))
)

const ContactUs = lazy(() =>
  import("../page/sections/ContactUs").then((module) => ({
    default: module.ContactUs,
  }))
)

interface InitialData {
  hero: HeroProps
  pergola: OurPergolaProps
  features: features
  accessories: AccessoriesType
  homepageBlog: HomepageBlog
  faq: FAQData
  contactUs: ContactUsProps
}

// 首屏组件 - 只包含 Hero 和 NavBar
const AboveTheFold = ({ hero }: { hero: HeroProps }) => {
  return (
    <>
      <NavBarWrapper />
      <Hero hero={hero} />
    </>
  )
}

// 渐进式加载的组件
const ProgressiveComponents = ({ data }: { data: InitialData }) => {
  const [loadedComponents, setLoadedComponents] = useState<number>(0)
  const { pergola, features, accessories, homepageBlog, faq, contactUs } = data

  useEffect(() => {
    const loadNextComponent = () => {
      setLoadedComponents((prev) => {
        if (prev >= 8) return prev
        return prev + 1
      })
    }

    // 初始加载 OurPergola
    loadNextComponent()

    // 设置定时器逐步加载其他组件
    const timers = [
      setTimeout(() => loadNextComponent(), 500), // Features
      setTimeout(() => loadNextComponent(), 1000), // Accessories
      setTimeout(() => loadNextComponent(), 1500), // Testimonials
      setTimeout(() => loadNextComponent(), 2000), // OurPromise
      setTimeout(() => loadNextComponent(), 2500), // OurBlog
      setTimeout(() => loadNextComponent(), 3000), // FAQ
      setTimeout(() => loadNextComponent(), 3500), // ContactUs
    ]

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  return (
    <>
      {loadedComponents >= 1 && <OurPergola pergola={pergola} />}
      {loadedComponents >= 2 && <Features features={features} />}
      {loadedComponents >= 3 && <Accessories accessories={accessories} />}
      {loadedComponents >= 4 && <Testimonials />}
      {loadedComponents >= 5 && <OurPromise />}
      {loadedComponents >= 6 && <OurBlog homepageBlog={homepageBlog} />}
      {loadedComponents >= 7 && faq && <FaqWrapper faq={faq} />}
      {loadedComponents >= 8 && contactUs && (
        <ContactUs contactUs={contactUs} />
      )}
    </>
  )
}

export const ClientHomepage = ({
  initialData,
}: {
  initialData: InitialData
}): JSX.Element => {
  return (
    <SWRConfig
      value={{
        fallback: initialData,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      <div className="w-full flex flex-col items-center gap-[10px] lg:gap-10 px-10 py-0 relative bg-[#ffffff]">
        <AboveTheFold hero={initialData.hero} />
        <ProgressiveComponents data={initialData} />
      </div>
      <FooterDark />
    </SWRConfig>
  )
}
