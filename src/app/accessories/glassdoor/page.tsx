import { getProductByProductId } from "@lib/data/products"
import {
  getAccessoriesPage,
  getGlassdoor,
  getHomePage,
  getPergola,
} from "@lib/cms/strapiCmsApi"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import { PergolaData } from "types/global"
import GlassdoorProductPage from "./GlassdoorProductPage"
type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export default async function AccessoriesPage(props: Props) {
  const accessoriesPage = await getAccessoriesPage()
  console.log("accessoriesPage", accessoriesPage?.data)
  const pergola = await getProductByProductId({
    productId: accessoriesPage?.data?.pergolaId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })
  const glassdoor = await getProductByProductId({
    productId: accessoriesPage?.data?.glassdoorId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  const glassdoorInfo = await getGlassdoor()
  glassdoorInfo.data.product = glassdoor.product

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
          <GlassdoorProductPage
            glassdoorProduct={glassdoor.product as any}
            glassdoorCMSData={glassdoorInfo.data as any}
            pergolaSizes={pergolaSizes as any}
            pergolaSize={pergolaSize as any}
          />
        </div>
      </div>
      {/* <OurPromise
        pergolaData={
          {
            boringButImportantStuff: data.OurPromise,
          } as PergolaData
        }
      /> */}
      <FooterDark />
    </>
  )
}
