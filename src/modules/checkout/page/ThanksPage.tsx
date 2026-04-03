"use client"

import { ContactSupportCard } from "@/components/ContactSupportCard"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ThanksPage() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-white">
        <NavBarWrapper isFixed={false} />
        <section className="w-full flex flex-col items-center px-5 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-20 text-center">
          <h1 className="text-4xl lg:text-6xl font-semibold text-[#140E02] tracking-tight">
            Thank you!
          </h1>
          <p className="mt-6 text-base lg:text-lg font-semibold text-[#140E02] max-w-xl">
            Your inquiry is successfully submitted.
          </p>
          <p className="mt-3 text-base lg:text-lg text-[#140E02] max-w-xl font-normal">
            Our sales team will reach out as soon as possible.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 bg-[#F3C363] px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Explore More
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
        <section className="w-full bg-[#F7F7F5] py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1074px] px-5 lg:px-20">
            <ContactSupportCard className="mx-auto max-w-[800px]" />
          </div>
        </section>
      </div>
      <FooterDark />
    </>
  )
}
