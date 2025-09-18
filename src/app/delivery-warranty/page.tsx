import V2DualOfferSection from "@/components/V2DualOfferSection"
import { V2FAQSection } from "@/components/V2FAQSection"
import { getDeliveryWarranty } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import Image from "next/image"

export default async function DeliveryWarrantyPage() {
  const { data } = await getDeliveryWarranty()
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
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className={"relative w-full py-20 overflow-hidden"}>
          <img
            src="/img/body-mask.png"
            className={"absolute top-0 left-0 z-0 w-full"}
          />
          <div className={"max-w-7xl m-auto"}>
            <h1
              className={
                "mb-[126px] text-center text-[56px] font-semibold text-black"
              }
            >
              Delivery Process
              <br />
              Simple, Caring, and Hassle-Free
            </h1>
            <div className={"w-full h-[1px] mb-5 bg-[#EFEEEB]"}></div>
            <div className={"grid grid-cols-5 gap-x-6 w-full"}>
              {[
                {
                  title: "Instant Quote",
                  description:
                    "No waiting, no guessing. Get a clear and accurate price within seconds, so you know exactly what to expect.",
                  icon: "quote",
                },
                {
                  title: "Personalized CAD Design",
                  description:
                    "Our designers craft a custom drawing just for you, turning your vision into a detailed plan that fits your space perfectly.",
                  icon: "personalized",
                },
                {
                  title: "Approve with Confidence",
                  description:
                    "Take your time to review every detail. Once you’re happy, secure your order with ease—your peace of mind matters most to us.",
                  icon: "approve",
                },
                {
                  title: "Built with Care (3–5 Weeks)",
                  description:
                    "Your pergola is crafted in our factory with rigorous quality checks, ensuring every piece meets the highest standards before it leaves.",
                  icon: "build",
                },
                {
                  title: "Free & Insured Shipping (1–2 Weeks)",
                  description:
                    "Relax while we take care of the rest. We provide free, door-to-door delivery with full insurance, so your pergola arrives safe, sound, and ready to enjoy.",
                  icon: "shipping",
                },
              ].map((item, itemKey) => (
                <div
                  className="relative flex flex-col items-center gap-y-[10px] p-6 border-b border-[#FFBF3C] text-center"
                  style={{
                    background:
                      "linear-gradient(360deg, rgba(239, 238, 235, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)",
                  }}
                  key={item.title}
                >
                  <div
                    className={
                      "flex flex-col items-center absolute -top-[88px]"
                    }
                  >
                    <div
                      className={
                        "mb-7 text-[#706C63] text-2xl leading-9 font-semibold"
                      }
                    >
                      0{itemKey + 1}
                    </div>
                    <span
                      className={
                        "w-2 h-2 border border-[#706C63] rounded bg-[#FFBF3C]"
                      }
                    ></span>
                  </div>

                  <Image
                    unoptimized
                    src={`/img/icon-${item.icon}.svg`}
                    alt={item.title}
                    width={56}
                    height={56}
                  />
                  <div className={"text-[#2F2A1E] font-semibold text-base"}>
                    {item.title}
                  </div>
                  <div className={"text-[#8C877C] text-sm"}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={"w-full max-w-7xl mb-20"}>
          <V2DualOfferSection
            data={
              {
                title: "Relaxure Warranty",
                description:
                  "At Relaxure, we build pergolas to last—and we back them with one of the strongest warranties in the industry. Our promise is simple: lasting quality, reliable support, and peace of mind for every customer.",
                cardItems: [
                  {
                    title: "Coverage You Can Count On",
                    description: (
                      <ul className="list-disc">
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
                      <ul className="list-disc">
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
              } as never
            }
          />
        </section>
        {data.sections.map((section: any) => {
          const key = `${section.id}-${section.__component}`
          if (section.__component === "blocks.v2-faq-section") {
            return <V2FAQSection key={key} data={section} />
          }
          return null
        })}
      </div>
      <FooterDark />
    </>
  )
}
