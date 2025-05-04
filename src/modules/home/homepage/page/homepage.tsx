import React from "react"
import { OurPergola } from "./sections/OurPergola"
import { Accessories } from "./sections/Accessories"
import { FooterDark } from "./sections/footer"
import { OurPromise } from "./sections/OurPromise"
import { Features } from "./sections/Features"
import { Hero } from "./sections/Hero"
import { NavBarWrapper } from "./sections/NavBarWrapper"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { OurBlog } from "./sections/OurBlog"
import { FaqWrapper } from "./sections/FaqWrapper"
import { ContactUs } from "./sections/ContactUs"
import { Testimonials } from "./sections/Testimonials"
import { AwardBlock } from "@modules/common/components/AwardBlock"
import { PergolaData } from "types/global"
import { unstable_cache } from "next/cache"

// 配置静态生成
export const dynamic = "force-static"
export const revalidate = 3600 // 每小时重新验证一次

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

// 缓存数据获取函数
const getCachedHomePage = unstable_cache(
  async () => {
    try {
      const { data } = await getHomePage()
      console.log("data", data)
      return data
    } catch (error) {
      console.error("Error fetching homepage data:", error)
      return null
    }
  },
  ["homepage-data"],
  {
    revalidate: 3600, // 1小时缓存
    tags: ["homepage"], // 用于手动重新验证
  }
)

// 主页面组件
export default async function Homepage() {
  const data = await getCachedHomePage()

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>页面加载失败，请稍后重试</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full 2xl:w-[1910px] flex flex-col items-center gap-[10px] lg:gap-[120px] px-4 lg:px-20 py-0 relative bg-[#ffffff]">
        <NavBarWrapper isHomePage={true} />
        <Hero hero={data.HomepageHero} />
        <OurPergola pergola={data.OurPergola} />
        <Features features={data.Features} />
        <Accessories accessories={data.Accessories} />
        <AwardBlock data={data.credential} />
      </div>
      <OurPromise
        pergolaData={
          {
            boringButImportantStuff: data.OurPromise,
          } as PergolaData
        }
      />
      <div className="w-full 2xl:w-[1910px] flex flex-col items-center gap-[10px] lg:gap-10 px-4 md:px-20 py-0 relative bg-[#ffffff] mt-10 lg:mt-[120px]">
        <Testimonials />
      </div>
      <FaqWrapper faq={data.FAQ} />
      <div className="w-full 2xl:w-[1910px] flex flex-col items-center gap-[10px] lg:gap-10 px-4 md:px-20 py-0 relative bg-[#ffffff] mt-10 lg:mt-[120px]">
        <ContactUs contactUs={data.ContactUs} />
      </div>
      <FooterDark isHomepage={true} />
    </>
  )
}
