import V2Button from "@/components/V2Button"
import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { V2FAQSection } from "@/components/V2FAQSection"
import V2Headline from "@/components/V2Headline"
import V2SectionRenderer from "@/components/V2SectionRenderer"
import { getAboutUs } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { Metadata } from "next"
import Image from "next/image"

// import { Metadata } from "next"

// 生成动态 metadata
// export const metadata: Metadata = {
//   title: `About Relaxure`,
//   description: `Relaxure is home to the world's smartest pergola, intelligently designed to
// enable four-season outdoor living.`,
//   openGraph: {
//     title: `About Relaxure`,
//     description: `Relaxure is home to the world's smartest pergola, intelligently designed to
// enable four-season outdoor living.`,
//     url: "/",
//   },
//   keywords: [
//     "pergola",
//     "outdoor shade",
//     "smart home",
//     "relaxure",
//     "aluminum pergola",
//   ],
// }

export async function generateMetadata(): Promise<Metadata> {
  const aboutUsData = await getAboutUs()
  return generateMetadataFromStrapi(aboutUsData?.data?.seo || {})
}

export default async function AboutUsPage() {
  const { data } = await getAboutUs()
  console.log("AboutUs - data", data)

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>fail to load about us</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className="grid grid-cols-1 lg:grid-cols-2 w-full bg-[#EFEEEB] lg:h-[680px]">
          <div className="relative w-full h-auto overflow-hidden">
            <div className={`w-full h-full overflow-hidden relative`}>
              <Image
                unoptimized
                src="/img/about-us-banner.png"
                alt="about us"
                width={720}
                height={680}
                className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105`}
              />
            </div>
          </div>
          <div className="w-full lg:py-[72px] lg:px-[100px] px-6 mt-10 mb-[48px] lg:mt-0 lg:mb-0">
            <div className="w-full lg:w-[436px] flex-1 flex flex-col items-start">
              <V2Headline
                title="Creating Spaces Where Life Happens, in Every Season"
                className={"lg:text-[32px] lg:leading-[46px]"}
              />
              <div className="mt-5 mb-10 lg:mt-10 lg:mb-20 w-full text-[#2F2A1E] text-sm lg:text-base lg:leading-[23px]">
                <p>
                  At Relaxure, we believe great outdoor living should be
                  effortless—beautiful in design, built to last, and ready for
                  every season. Our pergolas bridge the gap between overpriced
                  luxury and unreliable budget options, delivering exceptional
                  quality, smart functionality, and timeless style at a fair
                  value.
                </p>
                <p>
                  Picture this: a sunny afternoon with friends gathered under
                  your pergola, laughter mingling with the aroma of a backyard
                  barbecue. Or a quiet morning coffee as gentle rain falls
                  above, while you stay perfectly dry and at peace.
                </p>
                <p>
                  This isn’t just about creating shade—it’s about creating a
                  space where memories are made, connections flourish, and every
                  season feels like your favorite one.
                </p>
              </div>

              {/* Button wrap */}
              <V2Button
                data={
                  {
                    type: "Secondary",
                    size: "Medium",
                    text: "Design Yours Today",
                    link: "#",
                    icon: null,
                  } as any
                }
                className={"w-full lg:w-auto"}
              />
            </div>
          </div>
        </section>
        <section
          className={
            "flex items-center flex-col w-full bg-white pt-8 pb-12 lg:py-20"
          }
        >
          <p
            className={
              "px-6 mb-5 text-2xl lg:mb-10 lg:text-[32px] font-bold text-center text-[#140E02]"
            }
          >
            Our Story: From Humble Roots to Outdoor Innovation
          </p>
          <div
            className={
              "px-6 lg:p-0 lg:grid lg:grid-cols-2 lg:gap-x-[55px] overflow-auto lg:overflow-visible h-[480px] lg:h-auto w-full lg:max-w-[1074px] text-[#2F2A1E]text-sm lg:text-18"
            }
          >
            <p
              dangerouslySetInnerHTML={{
                __html:
                  "To understand Relaxure, you have to understand where I come from.<br />I grew up in a small rural village, where life was simple and the outdoors was our playground. My most treasured memories aren’t about things—they’re about moments: watching my grandfather work our little farm with quiet determination, and spending endless afternoons playing with my sister in the yard.<br /><br />Those moments of connection, freedom, and fresh air never left me. As I grew older and began my entrepreneurial journey, I kept coming back to a simple truth: when we create spaces that bring people together outdoors, something magical happens.<br /><br />Years later, while searching for my next big challenge, I took a fresh look at the outdoor living market. What I found was frustrating:<br />Premium pergolas priced at $25,000 or more, far beyond the reach of most families.<br /><br />Budget options from big retailers that looked appealing at first, but quickly disappointed with poor quality and short lifespans.",
              }}
            ></p>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  "I knew there had to be a better way. So I gathered a team of visionaries—engineers from Fortune 500 companies, seasoned inventors, and designers from diverse cultural backgrounds. Together, we set out on a mission: <span style='font-weight: 600'>to make premium-quality outdoor structures accessible to real families—without compromising on design, durability, or function.</span><br /><br />By stripping away bloated industry margins, cutting out unnecessary middlemen, and embracing smart manufacturing, we built pergolas using commercial-grade materials, advanced technology, and thoughtful details—while keeping prices fair.<br /><br />For me, it’s personal. I believe everyone deserves the kind of joy I found in my childhood yard: a place where loved ones gather for long dinners, children’s laughter fills the air, and quiet mornings bring peace in our increasingly busy, indoor lives.<br /><br />Every Relaxure pergola is crafted with more than just aluminum and technology—it’s built with a purpose: <span style='font-weight: 600'>to create the backdrop for life’s most meaningful moments.</span>",
              }}
            ></p>
          </div>
        </section>

        <V2SectionRenderer
          sections={data.sections || []}
          customComponents={{
            "blocks.v2-feature-cards": V2FAQSection,
          }}
        />
        {/* <V2ContactUsSection /> */}
      </div>
      <FooterDark />
    </>
  )
}
