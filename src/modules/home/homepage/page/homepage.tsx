"use client"
import React, { useEffect, useState } from "react"
import { OurPergola } from "./sections/OurPergola"
import { Accessories } from "./sections/Accessories"
import { OurBlog } from "./sections/OurBlog"
import { FooterDark } from "./sections/footer"
import { OurPromise } from "./sections/OurPromise"
import { FaqWrapper } from "./sections/FaqWrapper"
import { Features } from "./sections/Features"
import { FrameWrapper } from "./sections/FrameWrapper"
import { Hero } from "./sections/Hero"
import { NavBarWrapper } from "./sections/NavBarWrapper"
import { SectionComponentNode } from "./sections/SectionComponentNode"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import {
  HeroProps,
  OurPergolaProps,
  features,
  Accessories as AccessoriesType,
  HomepageBlog,
} from "types/global"

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
  const [features, setFeatures] = useState<features | null>(null)
  const [accessories, setAccessories] = useState<AccessoriesType | null>(null)
  const [homepageBlog, setHomepageBlog] = useState<HomepageBlog | null>(null)
  useEffect(() => {
    getHomePage().then(({ data }) => {
      console.log("getHomePage", data)
      setHero(data.HomepageHero)
      setPergola(data.OurPergola)
      setFaq(data.FAQ)
      setContactUs(data.ContactUs)
      setFeatures(data.Features)
      setAccessories(data.Accessories)
      setHomepageBlog(data.OurBlog)
    })
  }, [])
  return (
    <>
      <div className="w-full md:w-full lg:w-[90%] 2xl:w-[1512px] flex flex-col items-center gap-[120px] lg:px-20 px-4 py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <Hero hero={hero} />
        <OurPergola pergola={pergola} />
        {/* features */}
        <Features features={features} />
        {/* Accessories */}
        <Accessories accessories={accessories} />
        {/* Testimonials */}
        <FrameWrapper />
        {/* Our promise */}
        <OurPromise />
        {/*  Our blog */}
        <OurBlog homepageBlog={homepageBlog} />
        {/* FAQ */}
        {faq && <FaqWrapper faq={faq} />}
        {/* contact us */}
        {contactUs && <SectionComponentNode contactUs={contactUs} />}
        {/* footer */}
      </div>
      <FooterDark />
    </>
  )
}
