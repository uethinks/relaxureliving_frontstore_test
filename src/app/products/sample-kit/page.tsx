import { getProductByProductId } from "@lib/data/products"
import { notFound } from "next/navigation"

import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getAccessoriesPage, getSampleKit } from "@lib/cms/strapiCmsApi"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { SampleKitProductPage } from "./SampleKitProductPage"

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export default async function AccessoriesPage(props: Props) {
  const accessoriesPage = await getAccessoriesPage()
  console.log("accessoriesPage", accessoriesPage?.data)

  const sampleKit = await getProductByProductId({
    productId: accessoriesPage?.data?.sampleKitId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })
  console.log("sampleKit", sampleKit)

  const sampleKitInfo = await getSampleKit()
  sampleKitInfo.data.product = sampleKit.product
  console.log("sampleKitInfo", sampleKitInfo)

  if (!sampleKitInfo.data || !sampleKit.product) {
    notFound()
  }

  return (
    <>
      <div className="bg-background flex flex-col items-center justify-center w-full">
        <NavBarWrapper isFixed={false} />
        <div className="flex flex-col gap-4 w-full">
          <SampleKitProductPage
            sampleKitProduct={sampleKit.product}
            sampleKitCMSData={{
              ...sampleKitInfo.data,
              category: "Relaxure Sample Kit",
            }}
          />
        </div>
        <V2SectionRenderer sections={sampleKitInfo.data?.sections || []} />
      </div>
      <FooterDark />
    </>
  )
}
