import V2MaskHeader from "@/components/V2MaskHeader"
import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getDeliveryWarranty } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import DeliveryProcess from "./DeliveryProcess"
import { Metadata } from "next"
import {
  generateMetadataFromStrapi,
  getStrapiStructuredDataScript,
} from "@lib/util/seo"

export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const deliveryWarrantyData = await getDeliveryWarranty()
  return generateMetadataFromStrapi(deliveryWarrantyData?.data?.seo || {})
}

export default async function DeliveryWarrantyPage() {
  const { data } = await getDeliveryWarranty()
  const structuredDataScript = getStrapiStructuredDataScript(data?.seo)
  console.log("DeliveryWarranty - data", data)

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>fail to load delivery & warranty</p>
      </div>
    )
  }
  return (
    <>
      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataScript }}
        />
      )}
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <V2MaskHeader
          title={
            <>
              Delivery Process
              <br />
              Simple, Caring, and Hassle-Free
            </>
          }
          sectionClassName={"pb-3 lg:py-20"}
        />
        <DeliveryProcess />

        <section className={"w-full bg-white"}>
          <V2SectionRenderer
            sections={[
              {
                __component: "blocks.v2-dual-offer-section",
                id: 1,
                title: "Relaxure Warranty",
                description:
                  "At Relaxure, we build pergolas to last—and we back them with one of the strongest warranties in the industry. Our promise is simple: lasting quality, reliable support, and peace of mind for every customer.",
                cardItems: [
                  {
                    title: "Coverage You Can Count On",
                    description: (
                      <ul className="list-disc lg:p-0 pl-4">
                        {[
                          {
                            title: "Lifetime Structural Coverage",
                            description:
                              "Applies to all structural components, including columns,beams, and base plates. Guaranteed to remain free from bending, warping, or structural defects.",
                          },
                          {
                            title: "5-Year Mechanical Coverage",
                            description:
                              "Covers all movable elements such as louvers, hand cranks, and other mechanical systems, ensuring smooth, long-term operation.",
                          },
                          {
                            title: "2-Year Electrical Coverage",
                            description:
                              "Includes motors, sensors, control systems, and additional electronic accessories.",
                          },
                          {
                            title: "Finish Protection",
                            description:
                              "Our AAMA 2605 coastal-grade powder coating comes with a 10-Year Warranty, protecting against peeling, cracking, fading, and corrosion —even in coastal environments.",
                          },
                        ].map((item, itemKey) => (
                          <li key={itemKey}>
                            <span className={"font-semibold"}>
                              {item.title}
                            </span>
                            <br />
                            {item.description}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: "Warranty Promise",
                    description: (
                      <ul className="list-disc lg:p-0 pl-4">
                        {[
                          <>
                            If you experience any
                            <span className={"font-semibold"}>
                              {" "}
                              non-human-related defects{" "}
                            </span>
                            during the warranty period, Relaxure will provide
                            free repairs or replacements.
                          </>,
                          "Replacement parts (motors, louvers, remotes, etc.) are also available for purchase should you ever need them.",
                          "Please note: The warranty does not cover damages caused by improper installation, extreme weather conditions, or modifications made outside Relaxure guidelines.",
                          "Warranty applies to the original purchaser and is non-transferable.",
                        ].map((item, itemKey) => (
                          <li key={itemKey}>{item}</li>
                        ))}
                      </ul>
                    ),
                  },
                ],
              },
            ].concat(data.sections)}
            showContactUs={false}
          />
        </section>
      </div>
      <FooterDark />
    </>
  )
}
