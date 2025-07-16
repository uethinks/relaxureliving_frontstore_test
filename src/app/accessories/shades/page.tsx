import { notFound } from "next/navigation"
import {
  getProductByProductType,
  getProductByHandle,
  getProductByProductId,
} from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { StoreProductListParams } from "@medusajs/types"
import { listProductsForStaticParams } from "@lib/data/products"
import {
  getAccessoriesPage,
  getShades,
  getGlassdoor,
  getHeater,
} from "@lib/cms/strapiCmsApi"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import ShadesProductPage from "./ShadesProductPage"
import Breadcrumb from "../../../components/Breadcrumb"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"
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
      <div className="bg-[#ffffff] flex flex-col items-start justify-center w-full 2xl:w-[1512px] px-5 lg:px-20">
        <NavBarWrapper isFixed={false} />
        <div className="flex flex-col gap-4 text-[36px] font-medium text-black font-merriweather mb-5">
          Accessories
        </div>
        <div className="content-container py-6 small:py-8">
          <ShadesProductPage
            shadesProduct={shades.product as any}
            shadesCMSData={shadesInfo.data as any}
            pergolaSizes={pergolaSizes as any}
            pergolaSize={pergolaSize as any}
          />
        </div>
      </div>
      <FooterDark />
    </>
  )
}
