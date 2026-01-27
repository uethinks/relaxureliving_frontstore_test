import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2MaskHeader from "@/components/V2MaskHeader"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import Image from "next/image"
import { Metadata } from "next"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import { getContactUs } from "@lib/cms/strapiCmsApi"

export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const contactUsData = await getContactUs()
  return generateMetadataFromStrapi(contactUsData?.data?.seo || {})
}

export default async function ContactUsPage() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#F7F7F5]">
        <NavBarWrapper />
        <V2MaskHeader
          showMask={false}
          title={"Contact Us"}
          sectionClassName={"pb-5 lg:pb-0"}
          description={
            <>
              <span className={"font-semibold"}>
                Your comfort and confidence matter most to us.
              </span>
              We’d love to hear from you.
              <br />
              Whether you have questions, need more details, or simply want
              advice before making a purchase, our team is here to help.
            </>
          }
        >
          <div
            className={
              "flex flex-col items-center mt-8 lg:mt-10 gap-5 py-4 px-8 bg-[#fff] border border-[#efeeeb]"
            }
          >
            <div
              className={
                "flex items-start lg:items-center justify-center gap-4"
              }
            >
              <Image
                unoptimized
                src={"/img/icon-contact.svg"}
                alt={"contact us"}
                width={40}
                height={40}
              />
              <div>
                <p className={"text-[#140E02] text-base"}>
                  Need help as a current customer? Our support team is here for
                  you
                </p>
                <p className={"text-[#8C877C] text-xs"}>
                  10:00 AM – 6:00 PM EST / 6:00 AM – 2:00 PM PST (Mon–Sun)
                </p>
              </div>
            </div>
            <div className={"flex items-center justify-center gap-4 text-xs"}>
              <p className={"flex items-center justify-center gap-1"}>
                <Image
                  unoptimized
                  src={"/img/icon-contact-phone.svg"}
                  alt={"contact us phone"}
                  width={16}
                  height={16}
                />

                <a href="tel:1-213-566-8658">1-213-566-8658</a>
              </p>
              <p className={"flex items-center justify-center gap-1"}>
                <Image
                  unoptimized
                  src={"/img/icon-contact-email.svg"}
                  alt={"contact us email"}
                  width={16}
                  height={16}
                />
                <a href="mailto:info@relaxureliving.com" target="_blank">
                  info@relaxureliving.com
                </a>
              </p>
            </div>
          </div>
        </V2MaskHeader>

        <V2ContactUsSection
          title="Have more questions about our products or services"
          description="Simply fill out the form below and our team will get back to you within 24 hours."
        />
      </div>
      <FooterDark />
    </>
  )
}
