import { Homepage as Homepage } from "@modules/home/homepage/page"
import { Metadata } from "next"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"

export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

// 首页动态metadata
export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomePage()
  return generateMetadataFromStrapi(homeData?.data?.seo || {})
}

export default Homepage
