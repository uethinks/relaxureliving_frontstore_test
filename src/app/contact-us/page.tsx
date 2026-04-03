import { ContactSupportCard } from "@/components/ContactSupportCard"
import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2MaskHeader from "@/components/V2MaskHeader"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { Metadata } from "next"
import {
  generateMetadataFromStrapi,
  getStrapiStructuredDataScript,
} from "@lib/util/seo"
import { getContactUs } from "@lib/cms/strapiCmsApi"

export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const contactUsData = await getContactUs()
  return generateMetadataFromStrapi(contactUsData?.data?.seo || {})
}

export default async function ContactUsPage() {
  const contactUsData = await getContactUs()
  const structuredDataScript = getStrapiStructuredDataScript(
    contactUsData?.data?.seo
  )
  return (
    <>
      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataScript }}
        />
      )}
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
          <ContactSupportCard className="mt-8 lg:mt-10" />
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
