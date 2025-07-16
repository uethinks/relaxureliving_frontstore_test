import { notFound } from "next/navigation"
import { getProductByProductId } from "@lib/data/products"

import {
  getAccessoriesPage,
  getHeater,
  getHomePage,
} from "@lib/cms/strapiCmsApi"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import { PergolaData } from "types/global"
import { HeaterProductPage } from "./HeaterProductPage"

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export default async function AccessoriesPage(props: Props) {
  const accessoriesPage = await getAccessoriesPage()
  console.log("accessoriesPage", accessoriesPage?.data)

  const heater = await getProductByProductId({
    productId: accessoriesPage?.data?.heaterId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  const heaterInfo = await getHeater()
  heaterInfo.data.product = heater.product

  if (!heaterInfo.data || !heater.product) {
    notFound()
  }

  // 获取OurPromise数据
  const { data } = await getHomePage()

  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px] px-5 lg:px-20">
        <NavBarWrapper isFixed={false} />
        <div className="content-container py-6 small:py-8 w-full">
          <HeaterProductPage
            heaterProduct={heater.product}
            heaterCMSData={heaterInfo.data}
          />
        </div>
      </div>
      <OurPromise
        pergolaData={
          {
            boringButImportantStuff: data.OurPromise,
          } as PergolaData
        }
      />
      <FooterDark />
    </>
  )
}
