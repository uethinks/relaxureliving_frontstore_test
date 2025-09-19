import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import Image from "next/image"

export default async function ContactUsPage() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#EFEEEB80]">
        <NavBarWrapper />

        <section className={"max-w-7xl pt-20 pb-5"}>
          <img
            src="/img/body-mask.png"
            className={"absolute top-0 left-0 z-0 w-full"}
          />
          <div className={"relative z-10"}>
            <div className={"mb-10 text-black text-center"}>
              <h1 className={"font-semibold text-[56px]"}>Contact Us</h1>
              <p className={"text-xl"}>
                <span className={"font-semibold"}>
                  Your comfort and confidence matter most to us.
                </span>
                We’d love to hear from you.
                <br />
                Whether you have questions, need more details, or simply want
                advice before making a purchase, our team is here to help.
              </p>
            </div>
            <div
              className={
                "flex flex-col items-center gap-5 py-4 px-8 bg-[#fff] border border-[#efeeeb]"
              }
            >
              <div className={"flex items-center justify-center gap-4"}>
                <Image
                  unoptimized
                  src={"/img/icon-contact.svg"}
                  alt={"contact us"}
                  width={40}
                  height={40}
                />
                <div>
                  <p className={"text-[#140E02] text-base"}>
                    Need help as a current customer? Our support team is here
                    for you
                  </p>
                  <p className={"text-[#8C877C] text-xs"}>
                    10:00 AM – 6:00 PM EST / 6:00 AM – 2:00 PM PST (Mon–Sun)
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-center gap-4"}>
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
          </div>
        </section>

        <V2ContactUsSection
          title="Have more questions about our products or services"
          description="Simply fill out the form below and our team will get back to you within 24 hours."
        />
      </div>
      <FooterDark />
    </>
  )
}
