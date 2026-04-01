import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getAccessoriesPage, getShades } from "@lib/cms/strapiCmsApi"
import { getProductByProductId } from "@lib/data/products"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import ShadesProductPage from "./ShadesProductPage"
import {
  generateMetadataFromStrapi,
  getStrapiStructuredDataScript,
} from "@lib/util/seo"
import { Metadata } from "next"
// 强制静态生成
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export async function generateMetadata(): Promise<Metadata> {
  const shadesData = await getShades()
  return generateMetadataFromStrapi(shadesData?.data?.seo || {})
}

export default async function AccessoriesPage(props: Props) {
  // 并行获取所有数据，显著改善FCP
  const [accessoriesPage, shadesInfo] = await Promise.all([
    getAccessoriesPage(),
    getShades()
  ])
  const structuredDataScript = getStrapiStructuredDataScript(shadesInfo?.data?.seo)
  
  // 并行获取产品数据
  const [pergola, shades] = await Promise.all([
    getProductByProductId({
      productId: accessoriesPage?.data?.pergolaId,
      queryParams: {
        fields: `*variants.calculated_price`,
      },
    }),
    getProductByProductId({
      productId: accessoriesPage?.data?.shadeId,
      queryParams: {
        fields: `*variants.calculated_price`,
      },
    })
  ])

  // 合并shades数据
  shadesInfo.data.product = shades.product

  // 获取pergola的尺寸选项
  const pergolaSizeOption = pergola.product.options?.find(
    (option) => option.title === "Size"
  )
  const pergolaSizes = pergolaSizeOption?.values || []

  // 从pergola产品中提取尺寸信息
  const pergolaSize = {
    width: pergola.product.width || 10,
    length: pergola.product.length || 10,
  }

  return (
    <>
      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataScript }}
        />
      )}
      {/* 预加载关键资源，改善LCP */}
      <link 
        rel="preload" 
        href={shadesInfo.data?.productImages?.[0]?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${shadesInfo.data.productImages[0].url}` : ''} 
        as="image" 
      />
      <div className="bg-background flex flex-col items-start justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <div className="flex flex-col gap-4 w-full">
          <ShadesProductPage
            shadesProduct={shades.product as any}
            shadesCMSData={{
              ...(shadesInfo.data as any),
              category: "Relaxure Accessories",
            }}
            pergolaSizes={pergolaSizes as any}
            pergolaSize={pergolaSize as any}
          />
        </div>
        <V2SectionRenderer sections={shadesInfo.data?.sections || []} />
      </div>
      <FooterDark />
    </>
  )
}
