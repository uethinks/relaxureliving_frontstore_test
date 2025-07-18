import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { FaqWrapper } from "@modules/home/homepage/page/sections/FaqWrapper"
import { AccessoriesGrid } from "@modules/products/single/components/AccesorriesSelector/AccessoriesGrid"
import { HtmlH2 } from "@/components/HtmlH2"

import { getFaqData } from "@lib/cms/strapiCmsApi"

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

export default async function FaqPage() {
  const faqData = await getFaqData()
  console.log("faqData", faqData)
  const faq = {
    homepageFAQ: faqData.data.faqs,
    Title: faqData.data.title,
    Subtitle: "",
    id: faqData.data.id,
  }

  return (
    <>
      <div className="w-full 2xl:max-w-[1910px] flex flex-col items-center gap-[10px] lg:gap-[120px] px-4 lg:px-20 py-0 relative bg-[#ffffff]">
        <NavBarWrapper isFixed={false} />

        <div className="w-full flex flex-col justify-center items-center">
          <HtmlH2
            html={faq.Title}
            className="font-merriweather text-[22] lg:text-[36px] font-bold mb-5"
          />
          <FaqWrapper faq={faq} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="font-merriweather text-[22] lg:text-[36px] font-bold">
            Available Add-Ons
          </h2>
          <AccessoriesGrid showTitle={false} />
        </div>
      </div>
      <FooterDark />
    </>
  )
}
