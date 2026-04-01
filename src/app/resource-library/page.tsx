import { getResourceLibraryPage } from "@lib/cms/strapiCmsApi"
import {
  generateMetadataFromStrapi,
  getStrapiStructuredDataScript,
} from "@lib/util/seo"
import { Metadata } from "next"
import React, { Suspense } from "react"
import ResourceLibraryClient from "./ResourceLibraryClient"
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600
export async function generateMetadata(): Promise<Metadata> {
  const resourceLibraryData = await getResourceLibraryPage()
  // console.log("resourceLibraryData", resourceLibraryData)
  return generateMetadataFromStrapi(resourceLibraryData?.data?.seo || {})
}

export default async function ResourceLibraryPage() {
  const resourceLibraryData = await getResourceLibraryPage()
  const structuredDataScript = getStrapiStructuredDataScript(
    resourceLibraryData?.data?.seo
  )
  return (
    <>
      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataScript }}
        />
      )}
      <Suspense>
        <ResourceLibraryClient />
      </Suspense>
    </>
  )
}
