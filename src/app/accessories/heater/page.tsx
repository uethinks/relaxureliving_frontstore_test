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
import V2SectionRenderer from "@/components/V2SectionRenderer"

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

  return (
    <>
      <div className="bg-background flex flex-col items-center justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <div className="flex flex-col gap-4 w-full">
          <HeaterProductPage
            heaterProduct={heater.product}
            heaterCMSData={heaterInfo.data}
          />
        </div>
        <V2SectionRenderer sections={heaterInfo.data?.sections || []} />
      </div>
      <FooterDark />
    </>
  )
}
