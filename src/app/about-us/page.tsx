import V2Button from "@/components/V2Button"
import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2DualOfferSection from "@/components/V2DualOfferSection"
import { V2FAQSection } from "@/components/V2FAQSection"
import V2Headline from "@/components/V2Headline"
import { V2PromoBanner } from "@/components/V2PromoBanner"
import V2ServiceSnapshots from "@/components/V2ServiceSnapshots"
import { getAboutUs } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
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

export default async function AboutPage() {
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
      <main className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className="grid grid-cols-2 w-full bg-[#EFEEEB]">
          <div className="relative aspect-[6/5] w-full h-full overflow-hidden">
            <Image
              unoptimized
              src="/img/about-us-banner.png"
              alt="about us"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 680px"
            />
          </div>
          <div className="w-full py-[72px] px-[100px]">
            <div className="flex items-start gap-4 w-[436px]">
              <div className="flex-1 flex flex-col gap-10 items-start">
                <V2Headline title="Creating Spaces Where Life Happens, in Every Season" />
                <div
                  className={`leading-relaxed mb-6 prose prose-lg max-w-none`}
                  dangerouslySetInnerHTML={{
                    __html:
                      "At Relaxure, we believe great outdoor living should be effortless—beautiful in design, built to last, and ready for every season. Our pergolas bridge the gap between overpriced luxury and unreliable budget options, delivering exceptional quality, smart functionality, and timeless style at a fair value.<br />Picture this: a sunny afternoon with friends gathered under your pergola, laughter mingling with the aroma of a backyard barbecue. Or a quiet morning coffee as gentle rain falls above, while you stay perfectly dry and at peace.<br />This isn’t just about creating shade—it’s about creating a space where memories are made, connections flourish, and every season feels like your favorite one.",
                  }}
                />
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
                />
              </div>
            </div>
          </div>
        </section>
        <section className={"flex items-center flex-col w-full bg-white py-20"}>
          <p
            className={"mb-10 text-[32px] font-bold text-center text-[#140E02]"}
          >
            Our Story: From Humble Roots to Outdoor Innovation
          </p>
          <div
            className={
              "grid grid-cols-2 gap-x-[55px] w-full max-w-[1074px] text-[#2F2A1E] text-18"
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
        {data.sections.map((section: any) => {
          const key = `${section.id}-${section.__component}`
          console.log("AboutUs section", key, section)
          if (section.__component === "blocks.v2-promo-banner") {
            return <V2PromoBanner key={key} data={section} />
          } else if (section.__component === "blocks.v2-faq-section") {
            return <V2FAQSection key={key} data={section} />
          } else if (section.__component === "blocks.v2-service-snapshots") {
            return <V2ServiceSnapshots key={key} data={section} />
          } else if (section.__component === "blocks.v2-dual-offer-section") {
            return <V2DualOfferSection key={key} data={section} />
          }
          return null
        })}
        <V2ContactUsSection
          title="Got something specific in mind, send us a message"
          description="If you fill out the contact form below, one of our representatives will reach back out to you in a timely manner."
        />
      </main>
      <FooterDark isHomepage={true} />
    </>
  )
}
