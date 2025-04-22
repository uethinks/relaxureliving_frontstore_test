"use client"
import React, { Suspense, lazy, useEffect, useState } from "react"
import { OurPergola } from "./sections/OurPergola"
import { Accessories } from "./sections/Accessories"
import { FooterDark } from "./sections/footer"
import { OurPromise } from "./sections/OurPromise"
import { Features } from "./sections/Features"
import { Hero } from "./sections/Hero"
import { NavBarWrapper } from "./sections/NavBarWrapper"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import {
  HeroProps,
  OurPergolaProps,
  features,
  Accessories as AccessoriesType,
  HomepageBlog,
} from "types/global"
import { SWRConfig } from "swr"

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

interface ContactUsProps {
  id: number
  DescriptionOnImage: string
  Email: string
  FormDescription: string
  FullName: string
  Image: {
    data: {
      attributes: {
        url: string
      }
    }
  } | null
  Message: string
  PhoneNumber: string
  SendButton: string
}

interface InitialData {
  hero: HeroProps
  pergola: OurPergolaProps
  features: features
  accessories: AccessoriesType
  homepageBlog: HomepageBlog
  faq: FAQData
  contactUs: ContactUsProps
}

// 懒加载组件
const OurBlog = lazy(() =>
  import("./sections/OurBlog").then((module) => ({ default: module.OurBlog }))
)
const FaqWrapper = lazy(() =>
  import("./sections/FaqWrapper").then((module) => ({
    default: module.FaqWrapper,
  }))
)
const ContactUs = lazy(() =>
  import("./sections/ContactUs").then((module) => ({
    default: module.ContactUs,
  }))
)
const Testimonials = lazy(() =>
  import("./sections/Testimonials").then((module) => ({
    default: module.Testimonials,
  }))
)

// 首屏组件 - 只包含 Hero 和 NavBar
const AboveTheFold = ({ hero }: { hero: HeroProps }) => {
  return (
    <>
      <NavBarWrapper isHomePage={true} />
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
        if (prev >= 8) return prev // 修改为8，因为总共有8个组件
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
      // setTimeout(() => loadNextComponent(), 2000), // OurPromise
      setTimeout(() => loadNextComponent(), 2000), // OurBlog
      // setTimeout(() => loadNextComponent(), 3000), // FAQ
      // setTimeout(() => loadNextComponent(), 3500), // ContactUs
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
      {/* {loadedComponents >= 4 && <Testimonials />} */}
      {/* {loadedComponents >= 5 && <OurPromise />} */}
      {/* {loadedComponents >= 5 && <OurBlog homepageBlog={homepageBlog} />} */}
      {/* {loadedComponents >= 7 && faq && <FaqWrapper faq={faq} />}
      {loadedComponents >= 8 && contactUs && (
        <ContactUs contactUs={contactUs} />
      )} */}
    </>
  )
}

// 客户端组件
export const Homepage = ({
  initialData,
}: {
  initialData?: InitialData
}): JSX.Element => {
  const [data, setData] = useState<InitialData | null>(null)

  useEffect(() => {
    if (initialData) {
      setData(initialData)
    } else {
      getHomePage().then(({ data }) => {
        setData({
          hero: data.HomepageHero,
          pergola: data.OurPergola,
          features: data.Features,
          accessories: data.Accessories,
          homepageBlog: data.OurBlog,
          faq: data.FAQ,
          contactUs: data.ContactUs,
        })
      })
    }
  }, [initialData])

  if (!data) return <></>

  return (
    <SWRConfig
      value={{
        fallback: data,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      <div className="w-full 2xl:w-[1910px] flex flex-col items-center gap-[10px] lg:gap-10 px-5 lg:px-20 py-0 relative bg-[#ffffff]">
        <AboveTheFold hero={data.hero} />
        <ProgressiveComponents data={data} />
      </div>
      <OurPromise />
      <div className="w-full 2xl:w-[1910px] flex flex-col items-center gap-[10px] lg:gap-10 px-5 md:px-20 py-0 relative bg-[#ffffff] mt-10 lg:mt-[120px]">
        <Testimonials />
      </div>
      {/* <FaqWrapper faq={data.faq} /> */}
      <FaqWrapper faq={data.faq} />
      <div className="w-full 2xl:w-[1910px] flex flex-col items-center gap-[10px] lg:gap-10 px-5 md:px-20 py-0 relative bg-[#ffffff] mt-10 lg:mt-[120px]">
        <ContactUs contactUs={data.contactUs} />
      </div>
      <FooterDark isHomepage={true} />
    </SWRConfig>
  )
}

// 服务端数据获取 - 改为 SSG
export async function getStaticProps() {
  try {
    const { data } = await getHomePage()

    return {
      props: {
        initialData: {
          hero: data.HomepageHero,
          pergola: data.OurPergola,
          features: data.Features,
          accessories: data.Accessories,
          homepageBlog: data.OurBlog,
          faq: data.FAQ,
          contactUs: data.ContactUs,
        },
      },
      // 设置重新验证时间
      revalidate: 3600, // 每小时重新生成一次
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return {
      props: {
        initialData: null,
      },
    }
  }
}
