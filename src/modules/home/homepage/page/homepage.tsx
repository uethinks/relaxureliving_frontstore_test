import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "./sections/NavBarWrapper"
import { FooterDark } from "./sections/footer"

// 配置静态生成
export const dynamic = "force-static"
// export const revalidate = 3600 // 每小时重新验证一次

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

// 主页面组件
export default async function Homepage() {
  const { data } = await getHomePage()
  console.log("Homepage - data", data)

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>fail to load homepage</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper isHomePage={true} />
        <V2SectionRenderer sections={data.sections || []} />
        <V2ContactUsSection />
      </div>
      <FooterDark isHomepage={true} />
    </>
  )
}
