import { notFound } from "next/navigation"
import {
  getCustomPergola,
} from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import V2SectionRenderer from "@/components/V2SectionRenderer"
import { Metadata } from "next"
import { generateMetadataFromStrapi } from "@lib/util/seo"

// 强制静态生成
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export async function generateMetadata(): Promise<Metadata> {
  const customPergola = await getCustomPergola()
  return generateMetadataFromStrapi(customPergola?.data?.seo || {})
}

export default async function ProductCustomPage() {
  try {
    // 1. 并行获取基础数据
    const { data: pergolaData } = await getCustomPergola()

    console.log("ProductCustomPage - pergolaData", pergolaData)

    // 5. 渲染页面
    return (
      <>
        <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
          <NavBarWrapper isHomePage={true} />
          <V2SectionRenderer sections={pergolaData.sections || []} />
        </div>
        <FooterDark isHomepage={false} />
      </>
    )
  } catch (error) {
    console.error("Error rendering product custom  page:", error)
    notFound()
    return null // 添加明确的return语句以满足Sonar要求
  }
}
