import { getFaqData } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import { Metadata } from "next"
import { Suspense } from "react"
import { FaqPageClient } from "@/app/faq/FaqPageClient"
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600
export async function generateMetadata(): Promise<Metadata> {
  const faqData = await getFaqData()
  return generateMetadataFromStrapi(faqData?.data?.seo || {})
}

export default async function FaqPage() {
  // 在服务器端获取初始数据
  const faqData = await getFaqData()
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FaqPageClient initialFaqData={faqData} />
    </Suspense>
  )
}