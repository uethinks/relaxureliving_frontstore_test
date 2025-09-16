import { V2FeatureShowcase } from "@/components/V2FeatureShowcase"
import V2Headline from "@/components/V2Headline"
import V2HeroBanner from "@/components/V2HeroBanner"
import { getOurCollection } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

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

        {data.sections.map((section: any) => {
          const key = `${section.id}-${section.__component}`
          console.log("OurCollection section", key, section)
          if (section.__component === "blocks.v2-hero-banner") {
            return <V2HeroBanner key={key} data={section} />
          } else if (section.__component === "blocks.v2-rain-resistance") {
            return <V2FeatureShowcase key={key} data={section} />
          } else if (section.__component === "blocks.v2-collection-content") {
            return (
              <section className={"w-full max-w-7xl py-28"}>
                <V2Headline title={section.title} />
                <div className="mt-10 whitespace-break-spaces">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    remarkRehypeOptions={{ passThrough: ["link"] }}
                  >
                    {section.content}
                  </Markdown>
                </div>
              </section>
            )
          }
          return null
        })}
      </main>
      <FooterDark />
    </>
  )
}
