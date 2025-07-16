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
import { AccessoriesGrid } from "@modules/products/single/components/AccesorriesSelector/AccessoriesGrid"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
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
  const heater = await getProductByProductId({
    productId: accessoriesPage?.data?.heaterId,
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
  const glassdoor = await getProductByProductId({
    productId: accessoriesPage?.data?.glassdoorId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  const heaterInfo = await getHeater()
  heaterInfo.data.product = heater.product
  const shadesInfo = await getShades()
  shadesInfo.data.product = shades.product
  const glassdoorInfo = await getGlassdoor()
  glassdoorInfo.data.product = glassdoor.product
  const accessories = {
    heaterInfo: heaterInfo.data,
    shadesInfo: shadesInfo.data,
    glassdoorInfo: glassdoorInfo.data,
  }
  console.log(pergola.product.options?.[0]?.values)
  // Extract pergola size from the product data
  // const pergolaSize = {
  //   width: products[0].width || 0,
  //   length: products[0].length || 0,
  // }

  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px] px-5 lg:px-20">
        <NavBarWrapper isFixed={false} />
        <div className="content-container py-6 small:py-8">
          <div className="flex flex-col gap-4">
            <AccessoriesGrid accessories={accessories} />
          </div>
        </div>

        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative"></div>
      </div>
      <FooterDark />
    </>
  )
}
