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
export const Homepage = (): JSX.Element => {
  const [hero, setHero] = useState<HeroProps | null>(null)
  const [pergola, setPergola] = useState<OurPergolaProps | null>(null)
  useEffect(() => {
    getHomePage().then(({ data }) => {
      console.log("getHomePage", data)
      setHero(data.HomepageHero)
      setPergola(data.OurPergola)
    })
  }, [])
  return (
    <div className="flex flex-col items-center gap-[120px] px-20 py-0 relative bg-[#ffffff]">
      <Hero hero={hero} />
      <OurPergola pergola={pergola} />
      <Frame />
      <ContainerWrapper />
      <FrameWrapper />
      <DivWrapper />
      <Div />
      <FaqWrapper />
      <SectionComponentNode />
      <img
        className="relative w-[1512px] h-[688px] ml-[-80.00px] mr-[-80.00px]"
        alt="Footer dark"
        src="/img/footer-4-dark.png"
      />

      <NavBarWrapper />
    </div>
  )
}
