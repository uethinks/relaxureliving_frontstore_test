import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getAccessoriesPage, getShades } from "@lib/cms/strapiCmsApi"
import { getProductByProductId } from "@lib/data/products"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import ShadesProductPage from "./ShadesProductPage"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import { Metadata } from "next"

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export async function generateMetadata(): Promise<Metadata> {
  const shadesData = await getShades()
  return generateMetadataFromStrapi(shadesData?.data?.seo || {})
}

export default async function AccessoriesPage(props: Props) {
  const accessoriesPage = await getAccessoriesPage()
  console.log("accessoriesPage", accessoriesPage?.data)
  const pergola = await getProductByProductId({
    productId: accessoriesPage?.data?.pergolaId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })
  const shades = await getProductByProductId({
    productId: accessoriesPage?.data?.shadeId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  const shadesInfo = await getShades()
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
