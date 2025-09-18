"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPolicies } from "@lib/cms/strapiCmsApi"
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Package,
  Phone,
  Shield,
  Star,
  Truck,
  Youtube,
} from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"

interface FooterDarkProps {
  isHomepage?: boolean
}

function FooterHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-0 py-6 border-b border-[#2f2a1e] gap-4 sm:gap-8">
      <div className="flex items-center">
        <img
          className="w-[120px] sm:w-[140px] lg:w-[160px]"
          src="/img/logo.svg"
          alt=""
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-right">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="text-lg sm:text-xl font-semibold">Excellent</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Button
                key={i}
                size="sm"
                className="w-6 h-6 p-0 bg-[#51b380] hover:bg-[#51b380]/90"
              >
                <Star className="w-3 h-3 fill-current" />
              </Button>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-[#8c877c]">
            TrustScore 4.9 | 15,821 Reviews
          </span>
        </div>

        <div className="text-center sm:text-right">
          <div className="text-lg sm:text-xl font-bold">15,000+</div>
          <div className="text-xs sm:text-sm text-[#8c877c]">
            Satisfied Customers.
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailSubscription() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-semibold">
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

      <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2f2a1e] hover:bg-[#2f2a1e]/80 rounded-full"
        >
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2f2a1e] hover:bg-[#2f2a1e]/80 rounded-full"
        >
          <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2f2a1e] hover:bg-[#2f2a1e]/80 rounded-full"
        >
          <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2f2a1e] hover:bg-[#2f2a1e]/80 rounded-full"
        >
          <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
        <div className="flex items-center gap-2 text-xs sm:text-sm justify-center sm:justify-start">
          <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>Info@Relaxureliving.Com</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm justify-center sm:justify-start">
          <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>1-213-566-8658</span>
        </div>
      </div>
    </div>
  )
}

function NavigationLinks({
  title,
  links,
}: {
  title: string
  links: { text: string; href: string }[]
}) {
  return (
    <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      <div className="space-y-2 sm:space-y-3">
        {links.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className="block text-[#8c877c] hover:text-white transition-colors text-sm sm:text-base"
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
  iconStyle = "rounded",
}: {
  icon: any
  title: string
  description: string
  iconStyle?: "rounded" | "rounded-full"
}) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#8c877c] ${iconStyle} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div>
        <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
          {title}
        </h4>
        <div
          className="text-xs sm:text-sm text-[#8c877c]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Package,
      title: "Delivered In 4 Weeks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      iconStyle: "rounded" as const,
    },
    {
      icon: Truck,
      title: "Hassle-Free Delivery",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span class="underline">Shipping Policy</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      iconStyle: "rounded" as const,
    },
    {
      icon: Shield,
      title: "Industry-Leading Warranty",
      description:
        'Lorem ipsum dolor sit amet, adipiscing elit. <span class="underline">Warranty</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      iconStyle: "rounded-full" as const,
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {features.map((feature) => (
        <FeatureItem key={feature.title} {...feature} />
      ))}
    </div>
  )
}

function PaymentMethods() {
  const paymentMethods = [
    { src: "/img/American_Express.png", alt: "American Express" },
    { src: "/img/apple_pay.png", alt: "Apple Pay" },
    { src: "/img/Diners_Club.png", alt: "Diners Club" },
    { src: "/img/Discover.png", alt: "Discover" },
    { src: "/img/google_pay.png", alt: "Google Pay" },
    { src: "/img/master.png", alt: "Mastercard" },
    { src: "/img/visa.png", alt: "Visa" },
    { src: "/img/Klarna.png", alt: "Klarna" },
    { src: "/img/afterpay.png", alt: "Afterpay" },
  ]

  return (
    <div className="flex gap-1 sm:gap-2 flex-wrap justify-center sm:justify-end">
      {paymentMethods.map((method) => (
        <img
          key={method.alt}
          src={method.src}
          alt={method.alt}
          className="h-6 sm:h-8 bg-white rounded"
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
          href: `/policy/${item.documentId}`,
        }))
      )
    })
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-[#140e02] text-white">
      {/* BadWeatherSection - preserved from original */}
      {/* <BadWeatherSection /> */}

      {/* HomepageSampleKit - only show on homepage */}
      {/* {isHomepage && <HomepageSampleKit />} */}

      {/* New Footer Design with max-w-[1074px] container */}
      <div className="w-full">
        <div className="max-w-[1074px] mx-auto">
          <FooterHeader />

          <div className="px-4 sm:px-0 py-8 sm:py-10 lg:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
              <EmailSubscription />
              <NavigationLinks title="Company" links={companyLinks} />
              <NavigationLinks title="Conditions" links={conditionLinks} />
              <FeaturesSection />
            </div>
          </div>

          <div className="px-4 sm:px-0 py-4 sm:py-6 border-t border-[#2f2a1e] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-[#8c877c] text-center sm:text-left">
              © 2025 Relaxure
            </div>
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>
  )
}
