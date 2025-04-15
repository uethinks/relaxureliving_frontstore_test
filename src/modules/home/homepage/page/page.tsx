import { getHomePage } from "@lib/cms/strapiCmsApi"
import { ClientHomepage } from "../components/ClientHomepage"
import {
  HeroProps,
  OurPergolaProps,
  features,
  Accessories as AccessoriesType,
  HomepageBlog,
} from "types/global"

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

export default async function Home() {
  const { data } = await getHomePage()

  const initialData: InitialData = {
    hero: data.HomepageHero,
    pergola: data.OurPergola,
    features: data.Features,
    accessories: data.Accessories,
    homepageBlog: data.OurBlog,
    faq: data.FAQ,
    contactUs: data.ContactUs,
  }

  return <ClientHomepage initialData={initialData} />
}

// 配置 SSG
export const revalidate = 3600 // 每小时重新生成一次
