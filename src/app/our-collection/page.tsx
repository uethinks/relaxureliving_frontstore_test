import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getOurCollection } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { CollectionContent } from "./CollectionContent"
import { Metadata } from "next"
import { generateMetadataFromStrapi } from "@lib/util/seo"

export async function generateMetadata(): Promise<Metadata> {
  const ourCollectionData = await getOurCollection()
  return generateMetadataFromStrapi(ourCollectionData?.data?.seo || {})
}

export default async function OurCollectionPage() {
  const { data } = await getOurCollection()
  console.log("OurCollection - data", data)

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>fail to load our collection</p>
      </div>
    )
  }

  return (
    <>
      <main className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <V2SectionRenderer
          sections={data.sections}
          customComponents={{
            "blocks.v2-collection-content": CollectionContent,
          }}
        />
      </main>
      <FooterDark />
    </>
  )
}
