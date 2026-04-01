import { getProductByProductId } from "@lib/data/products"
import { notFound } from "next/navigation"

import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getAccessoriesPage, getHeater } from "@lib/cms/strapiCmsApi"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { HeaterProductPage } from "./HeaterProductPage"
import { Metadata } from "next"
import {
  generateMetadataFromStrapi,
  getStrapiStructuredDataScript,
} from "@lib/util/seo"

// 强制静态生成
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export async function generateMetadata(): Promise<Metadata> {
  const heaterData = await getHeater()
  return generateMetadataFromStrapi(heaterData?.data?.seo || {})
}

export default async function AccessoriesPage(props: Props) {
  const accessoriesPage = await getAccessoriesPage()

  const heater = await getProductByProductId({
    productId: accessoriesPage?.data?.heaterId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  const heaterInfo = await getHeater()
  heaterInfo.data.product = heater.product
  const structuredDataScript = getStrapiStructuredDataScript(heaterInfo?.data?.seo)

  if (!heaterInfo.data || !heater.product) {
    notFound()
  }

  return (
    <>
      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataScript }}
        />
      )}
      <div className="bg-background flex flex-col items-center justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <div className="flex flex-col gap-4 w-full">
          <HeaterProductPage
            heaterProduct={heater.product}
            heaterCMSData={{
              ...heaterInfo.data,
              category: "Relaxure Accessories",
            }}
          />
        </div>
        <V2SectionRenderer sections={heaterInfo.data?.sections || []} />
      </div>
      <FooterDark />
    </>
  )
}
