import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { AccessoriesGrid } from "@modules/products/single/components/AccesorriesSelector/AccessoriesGrid"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import { getAccessoriesPage, getHomePage } from "@lib/cms/strapiCmsApi"
import { PergolaData } from "types/global"
import { Metadata } from "next"
import {
  generateMetadataFromStrapi,
  getStrapiStructuredDataScript,
} from "@lib/util/seo"

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

// 强制静态生成
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const accessoriesPage = await getAccessoriesPage()
  // console.log("accessoriesPage", accessoriesPage)
  return generateMetadataFromStrapi(accessoriesPage?.data?.seo || {})
}

export default async function AccessoriesPage(props: Props) {
  const accessoriesPage = await getAccessoriesPage()
  const structuredDataScript = getStrapiStructuredDataScript(
    accessoriesPage?.data?.seo
  )
  // 获取OurPromise数据
  // const { data } = await getHomePage()

  return (
    <>
      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataScript }}
        />
      )}
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <div className="content-container">
          <div className="flex flex-col gap-4">
            <AccessoriesGrid />
          </div>
        </div>
      </div>
      <FooterDark />
    </>
  )
}
