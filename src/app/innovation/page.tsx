import { V2PromoBanner } from "@/components/V2PromoBanner"
import V2SectionRenderer from "@/components/V2SectionRenderer"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"

export default async function InnovationPage() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section
          className={
            "relative w-full px-6 pt-8 pb-12 lg:px-0 lg:py-20 overflow-hidden"
          }
        >
          <img
            src="/img/body-mask.png"
            className={"absolute top-0 left-0 z-0 w-full"}
          />
          <div className={"lg:max-w-[1074px] m-auto"}>
            <h1
              className={
                "mb-5 text-center text-6 lg:text-[56px] font-semibold text-black"
              }
            >
              Innovation at Relaxure:
              <br />
              Listening, Learning, and Improving
            </h1>
            <p className={"text-center text-sm lg:text-xl text-black"}>
              At Relaxure, we believe innovation isn’t about flashy features or
              bold claims. It begins with listening—understanding frustrations
              and working patiently to make things better.
            </p>
          </div>
        </section>
        <V2PromoBanner
          data={
            {
              content: {
                title: "A Brand with Purpose",
                description:
                  "We set out with a clear goal: create pergolas that combine strength, beauty, and comfort—without putting them out of reach. For us, “affordable luxury” means premium quality and thoughtful design that more families can enjoy.",
                isReverse: true,
              },
              backgroundImage: {
                isStatic: true,
                url: "/img/innovation-hero1.png",
              },
            } as never
          }
        />
        <section className={"w-full mb-5 lg:mb-24"}>
          <V2SectionRenderer
            sections={[
              {
                __component: "blocks.v2-dual-offer-section",
                id: 40,
                cardItems: [
                  {
                    title: "Learning from Customers",
                    description: (
                      <>
                        {[
                          <>
                            From community forums and customer reviews, we’ve
                            seen recurring challenges:
                            <br />
                            <br />
                          </>,
                          <>
                            <span className={"font-semibold"}>
                              Service gaps –{" "}
                            </span>
                            poor communication or disappearing support.
                          </>,
                          <>
                            <span className={"font-semibold"}>
                              Durability issues –{" "}
                            </span>
                            wood pergolas rotting or warping.
                          </>,
                          <>
                            <span className={"font-semibold"}>
                              Complex assembly –{" "}
                            </span>
                            unclear instructions, missing parts.
                          </>,
                          <>
                            <span className={"font-semibold"}>
                              Unclear pricing –{" "}
                            </span>
                            confusing quotes or hidden fees.
                          </>,
                          <>
                            <br />
                            Instead of overlooking these concerns, we treat them
                            as a guide for improvement.
                          </>,
                        ].map((item, itemKey) => (
                          <p key={itemKey}>{item}</p>
                        ))}
                      </>
                    ),
                  },
                  {
                    title: "How We Responded",
                    description: (
                      <>
                        {[
                          <>
                            Each pain point shaped how we build Relaxure
                            pergolas:
                            <br />
                            <br />
                          </>,
                          <>
                            <span className={"font-semibold"}>
                              Affordable luxury:
                            </span>
                            Priced between $5,000 and $14,000—accessible yet
                            commercial-grade.
                            <br />
                            <br />
                          </>,
                          <>
                            <span className={"font-semibold"}>
                              All-in features:
                            </span>
                            Motorized louvers, rain sensors, and LED lighting
                            are standard, not add-ons.
                            <br />
                            <br />
                          </>,
                          <>
                            <span className={"font-semibold"}>
                              Customization:
                            </span>
                            Flexible size, height, and colors so every pergola
                            fits its space.
                            <br />
                            <br />
                          </>,
                          <>
                            <span className={"font-semibold"}>Durability:</span>
                            6063-T6 aluminum with AAMA 2605 finishes, reducing
                            upkeep and worry.
                            <br />
                            <br />
                          </>,
                          <>
                            We know we’re not perfect, but each step helps
                            create a better experience for our customers.
                          </>,
                        ].map((item, itemKey) => (
                          <p key={itemKey}>{item}</p>
                        ))}
                      </>
                    ),
                  },
                ],
              },
            ]}
            showContactUs={false}
          />
        </section>
        <V2PromoBanner
          data={
            {
              content: {
                title: "Our Mindset",
                description:
                  "What sets Relaxure apart isn’t just stronger pergolas, but a philosophy: listen, learn, improve. Instead of chasing specs, we focus on people—their comfort, peace of mind, and trust.\nInnovation, to us, is not about being the loudest. It’s about building trust, one experience at a time.",
                isReverse: true,
              },
              backgroundImage: {
                isStatic: true,
                url: "/img/innovation-hero2.png",
              },
            } as never
          }
        />
      </div>
      <FooterDark />
    </>
  )
}
