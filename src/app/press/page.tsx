import { getPressPage } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import { Metadata } from "next"
import React, { Suspense } from "react"
import PressPageClient from "./PressPageClient"

export async function generateMetadata(): Promise<Metadata> {
  const pressPageData = await getPressPage()
  console.log("pressPageData", pressPageData)
  return generateMetadataFromStrapi(pressPageData?.data?.seo || {})
}

export default async function PagePress() {
  // 在服务器端获取初始数据
  const pressPageData = await getPressPage()
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PressPageClient initialPressData={pressPageData} />
    </Suspense>
  )
}
