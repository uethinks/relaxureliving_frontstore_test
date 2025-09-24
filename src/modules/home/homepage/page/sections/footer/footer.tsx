"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPolicies } from "@lib/cms/strapiCmsApi"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { IconDelivery, IconPackage, IconWarranty } from "./icons"

interface FooterDarkProps {
  isHomepage?: boolean
}

function NavigationLinks({
  title,
  links,
}: {
  title: string
  links: { text: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-sm lg:text-base lg:leading-5 text-[#fff] font-semibold mb-5">
        {title}
      </h3>
      <div className="ml-3">
        {links.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className="block text-[#EFEEEB] hover:text-white transition-colors text-base mb-[9px]"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  )
}

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 mb-5 lg:mb-10">
      <div
        className={`w-12 h-12 lg:w-[56px] lg:h-[56px] flex-grow-0 flex-shrink-0 basis-auto`}
      >
        <Icon className="w-full h-full" />
      </div>
      <div>
        <h4 className="font-semibold mb-1 lg:mb-[10px] text-sm lg:text-base text-[#fff]">
          {title}
        </h4>
        <div
          className="text-sm text-[#8c877c]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: IconPackage,
      title: "Delivered in 5 Weeks",
      description: "Fast and reliable delivery so you can enjoy it sooner.",
      iconStyle: "rounded" as const,
    },
    {
      icon: IconDelivery,
      title: "Hassle-Free Delivery",
      description:
        "Peace of mind delivered free. We handle everything for a smooth setup.",
      iconStyle: "rounded" as const,
    },
    {
      icon: IconWarranty,
      title: "Industry-Leading Warranty",
      description:
        "Built to last. Protected with one of the best warranties in the industry.",
      iconStyle: "rounded-full" as const,
    },
  ]

  return features.map((feature) => (
    <FeatureItem key={feature.title} {...feature} />
  ))
}

function PaymentMethods() {
  const paymentMethods = [
    { src: "/img/payments/master.png", alt: "Mastercard" },
    { src: "/img/payments/maestro.png", alt: "Maestro" },
    { src: "/img/payments/jcb.png", alt: "JCB" },
    { src: "/img/payments/american_express.png", alt: "American Express" },
    { src: "/img/payments/diners_club.png", alt: "Diners Club" },
    { src: "/img/payments/discover.png", alt: "Discover" },
    { src: "/img/payments/visa.png", alt: "Visa" },
    { src: "/img/payments/klarna.png", alt: "Klarna" },
    { src: "/img/payments/afterpay.png", alt: "Afterpay" },
    { src: "/img/payments/apple_pay.png", alt: "Apple Pay" },
    { src: "/img/payments/google_pay.png", alt: "Google Pay" },
  ]

  return (
    <div className="grid grid-cols-6 gap-2 lg:flex lg:justify-end">
      {paymentMethods.map((method) => (
        <img
          key={method.alt}
          src={method.src}
          alt={method.alt}
          className="lg:w-[41px] lg:h-[25px] bg-white rounded"
        />
      ))}
    </div>
  )
}

export const FooterDark = ({
  isHomepage = false,
}: FooterDarkProps): React.ReactElement => {
  const companyLinks = [
    { text: "About Us", href: "/about-us" },
    { text: "Press", href: "/press" },
    { text: "Blog", href: "/blog" },
    { text: "Become A Dealer", href: "/become-dealer" },
  ]
  const [conditionLinks, setConditionLinks] = useState([])

  useEffect(() => {
    getPolicies().then((res) => {
      if (!res.data) {
        return
      }

      setConditionLinks(
        res.data.map((item: any) => ({
          text: item.title,
          href: `/policy/${item.slug}?id=${item.documentId}`,
        }))
      )
    })
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-[#140e02] text-white px-6 pt-10 pb-20 lg:h-[860px] lg:px-0 lg:pt-[97px]">
      <div className="flex justify-between w-full lg:w-[1074px] mx-auto flex-wrap">
        <div className="flex flex-col w-full lg:w-[342px] flex-grow-0 flex-shrink-0 basis-auto">
          <img
            className="w-[103px] lg:w-[160px] mb-[52px] lg:mb-[60px]"
            src="/img/logo.svg"
            alt=""
          />
          <h3 className="mb-[10px] text-sm lg:text-base font-semibold">
            Subscribe To Our Emails
          </h3>
          <div className="flex h-[40px]">
            <Input
              placeholder="Email"
              className="bg-[#efeeeb] text-black border-none rounded-r-none flex-1 h-full text-sm sm:text-base"
            />
            <Button className="bg-[#ffbf3c] hover:bg-[#ffbf3c]/90 text-black px-3 sm:px-4 h-full">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-[22px] lg:gap-[25px] lg:my-10 my-5">
            <a className="lg:w-[45px] lg:h-[45px] w-[39px] h-[39px]" href="#">
              <img
                className={"w-full h-full"}
                src="/img/icon-facebook.svg"
                alt="facebook"
              />
            </a>
            <a className="lg:w-[45px] lg:h-[45px] w-[39px] h-[39px]" href="#">
              <img
                className={"w-full h-full"}
                src="/img/icon-instagram.svg"
                alt="instagram"
              />
            </a>
            <a className="lg:w-[45px] lg:h-[45px] w-[39px] h-[39px]" href="#">
              <img
                className={"w-full h-full"}
                src="/img/icon-youtube.svg"
                alt="youtube"
              />
            </a>
          </div>

          <div className="flex flex-col gap-5 text-sm lg:text-base text-[#fff] mb-10 lg:m-0">
            <div className="flex items-center gap-2">
              <img
                src={"/img/icon-contact-email.svg"}
                alt={"contact us email"}
                className={"w-4 h-4 invert"}
              />
              <a href="mailto:info@relaxureliving.com" target="_blank">
                info@relaxureliving.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={"/img/icon-contact-phone.svg"}
                alt={"contact us phone"}
                className={"w-4 h-4 invert"}
              />
              <a href="tel:1-213-566-8658">1-213-566-8658</a>
            </div>
          </div>

          <div className="hidden lg:block text-sm text-white mt-auto">
            © 2025 Relaxure
          </div>
        </div>

        <div>
          <div className="flex items-center gap-x-6 gap-y-[10px] lg:gap-y-6 flex-wrap mb-[57px]">
            <span className="text-lg sm:text-xl font-semibold">Excellent</span>
            <div className={"flex flex-col items-center"}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <div className="flex items-center justify-center w-[25px] h-[25px] bg-[#51b380] hover:bg-[#51b380]/90 rounded-sm">
                      <Star className="w-[13px] h-[13px] fill-current" />
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-[#EFEEEB] font-semibold">
                TrustScore 4.9 | 15,821 Reviews
              </span>
            </div>
            <div className="flex items-center w-full lg:w-auto">
              <div className="lg:text-xl font-bold text-[#fff] mr-1">
                15,000+
              </div>
              <div className="lg:text-base text-[#EFEEEB]">
                Satisfied Customers.
              </div>
            </div>
          </div>
          <div className={"flex gap-y-[30px] lg:gap-6 flex-wrap"}>
            <div
              className={
                "grid grid-cols-2 lg:grid-cols-1 flex-grow-0 flex-shrink-0 basis-auto gap-y-10 gap-x-2 w-full lg:w-auto"
              }
            >
              <NavigationLinks title="Company" links={companyLinks} />
              <NavigationLinks title="Conditions" links={conditionLinks} />
            </div>
            <div className={"w-full lg:w-[340px]"}>
              <FeaturesSection />
            </div>
          </div>
          <div className={"mt-10 lg:mt-[95px]"}>
            <PaymentMethods />
          </div>
          <div className="lg:hidden text-sm text-white mt-10">
            © 2025 Relaxure
          </div>
        </div>
      </div>
    </div>
  )
}
