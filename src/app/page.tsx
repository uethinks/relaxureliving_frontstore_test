import { Homepage as Homepage } from "@modules/home/homepage/page"
import { Metadata } from "next"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"

// 配置静态生成
export const dynamic = "force-static"
// export const revalidate = 3600 // 每小时重新验证一次

// 首页动态metadata
export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomePage()
  return generateMetadataFromStrapi(homeData?.data?.seo || {})
}

export default Homepage
