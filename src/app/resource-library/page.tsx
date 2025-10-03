import { getResourceLibraryPage } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import { Metadata } from "next"
import React, { Suspense } from "react"
import ResourceLibraryClient from "./ResourceLibraryClient"

export async function generateMetadata(): Promise<Metadata> {
  const resourceLibraryData = await getResourceLibraryPage()
  // console.log("resourceLibraryData", resourceLibraryData)
  return generateMetadataFromStrapi(resourceLibraryData?.data?.seo || {})
}

export default function ResourceLibraryPage() {
  return (
    <>
      <Suspense>
        <ResourceLibraryClient />
      </Suspense>
    </>
  )
}
