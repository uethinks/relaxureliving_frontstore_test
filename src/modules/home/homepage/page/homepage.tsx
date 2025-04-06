"use client"
import React, { useEffect, useState } from "react"
import { OurPergola } from "./sections/OurPergola"
import { ContainerWrapper } from "./sections/ContainerWrapper"
import { Div } from "./sections/Div"
import { DivWrapper } from "./sections/DivWrapper"
import { FaqWrapper } from "./sections/FaqWrapper"
import { Frame } from "./sections/Frame"
import { FrameWrapper } from "./sections/FrameWrapper"
import { Hero } from "./sections/Hero"
import { NavBarWrapper } from "./sections/NavBarWrapper"
import { SectionComponentNode } from "./sections/SectionComponentNode"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { HeroProps, OurPergolaProps } from "types/global"

interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}

interface ContactUsProps {
  id: number
  DescriptionOnImage: string
  Email: string
  FormDescription: string
  FullName: string
  Image: {
    data: {
      attributes: {
        url: string
      }
    }
  } | null
  Message: string
  PhoneNumber: string
  SendButton: string
}

export const Homepage = (): JSX.Element => {
  const [hero, setHero] = useState<HeroProps | null>(null)
  const [pergola, setPergola] = useState<OurPergolaProps | null>(null)
  const [faq, setFaq] = useState<FAQData | null>(null)
  const [contactUs, setContactUs] = useState<ContactUsProps | null>(null)
  useEffect(() => {
    getHomePage().then(({ data }) => {
      console.log("getHomePage", data)
      setHero(data.HomepageHero)
      setPergola(data.OurPergola)
      setFaq(data.FAQ)
      setContactUs(data.ContactUs)
    })
  }, [])
  return (
    <div className="flex flex-col items-center gap-[120px] px-20 py-0 relative bg-[#ffffff]">
      <Hero hero={hero} />
      <OurPergola pergola={pergola} />
      {/* features */}
      <Frame />
      {/* Accessories */}
      <ContainerWrapper />
      {/* Testimonials */}
      <FrameWrapper />
      {/* Our promise */}
      <DivWrapper />
      {/*  Our blog */}
      <Div />
      {/* FAQ */}
      {faq && <FaqWrapper faq={faq} />}
      {/* contact us */}
      {contactUs && <SectionComponentNode contactUs={contactUs} />}
      {/* footer */}
      <img
        className="relative w-[1512px] h-[688px] ml-[-80.00px] mr-[-80.00px]"
        alt="Footer dark"
        src="/img/footer-4-dark.png"
      />

      <NavBarWrapper />
    </div>
  )
}
