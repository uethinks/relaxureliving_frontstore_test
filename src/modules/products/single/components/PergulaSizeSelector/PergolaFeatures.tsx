"use client"
import React, { useRef, useEffect, useState } from "react"
/* NOSONAR */
interface Feature {
  icon: string
  text: string
}

interface PergolaFeaturesProps {
  selectedSize: string
}

const HIGHER_CEILING_TEXT = "Higher ceiling 8.79FT(268cm)"

// 定义常用的图标常量
const FITS_PEOPLE_ICON = "/img/fits-people.png"

// 定义常用的feature常量
const FITS_PEOPLE_2_4: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 2-4 people",
}
const FITS_PEOPLE_4_6: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 4-6 people",
}
const FITS_PEOPLE_6_8: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 6-8 people",
}
const FITS_PEOPLE_8_12: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 8-12 people",
}
const MORNING_COFFEE: Feature = {
  icon: "/img/morning-coffee.png",
  text: "Perfect for morning coffee",
}
const SMALL_PATIO: Feature = {
  icon: "/img/small-patio.png",
  text: "Ideal for small patios",
}
const HIGHER_CEILING: Feature = {
  icon: "/img/ceiling.png",
  text: HIGHER_CEILING_TEXT,
}
const SMALL_BBQ: Feature = {
  icon: "/img/bbq.png",
  text: "Perfect for small BBQ",
}
const MODULAR_SOFA: Feature = {
  icon: "/img/sofa.png",
  text: "Fits a modular sofa",
}
const SMALL_KITCHEN: Feature = {
  icon: "/img/kitchen.png",
  text: "Fits a small kitchen set",
}
const HOSTING_PARTIES: Feature = {
  icon: "/img/party.png",
  text: "Perfect for hosting parties",
}
const EXPANSIVE_BACKYARD: Feature = {
  icon: "/img/backyard.png",
  text: "Ideal for expansive backyards",
}
const OUTDOOR_RETREATS: Feature = {
  icon: "/img/outdoor.png",
  text: "Perfect for outdoor retreats",
}
const MULTIPLE_SEATING: Feature = {
  icon: "/img/small-patio.png",
  text: "Ideal for multiple seating areas",
}

const FEATURES_BY_SIZE: Record<string, Feature[]> = {
  "10'x10'": [FITS_PEOPLE_2_4, MORNING_COFFEE, SMALL_PATIO, HIGHER_CEILING],
  "10'x13'": [
    FITS_PEOPLE_4_6,
    MORNING_COFFEE,
    SMALL_BBQ,
    MODULAR_SOFA,
    SMALL_PATIO,
    HIGHER_CEILING,
  ],
  "13'x13'": [
    FITS_PEOPLE_6_8,
    SMALL_BBQ,
    MODULAR_SOFA,
    SMALL_KITCHEN,
    HOSTING_PARTIES,
    HIGHER_CEILING,
  ],
  "13'x19'": [
    FITS_PEOPLE_8_12,
    EXPANSIVE_BACKYARD,
    OUTDOOR_RETREATS,
    MULTIPLE_SEATING,
    SMALL_KITCHEN,
    HOSTING_PARTIES,
    HIGHER_CEILING,
  ],
}

export const PergolaFeatures: React.FC<PergolaFeaturesProps> = ({
  selectedSize,
}) => {
  const [prevFeatures, setPrevFeatures] = useState<Set<string>>(new Set())
  const features = FEATURES_BY_SIZE[selectedSize] || FEATURES_BY_SIZE["10'x10'"]

  useEffect(() => {
    // 延迟更新prevFeatures，以便动画完成后再更新
    const timer = setTimeout(() => {
      setPrevFeatures(new Set(features.map((f) => f.text)))
    }, 200) // 与动画时长相同
    return () => clearTimeout(timer)
  }, [selectedSize])

  return (
    <div className="flex flex-col w-full items-start relative text-[#343A40]">
      <div className="w-full">
        {features.map((feature, index) => {
          const isNewFeature = !prevFeatures.has(feature.text)
          return (
            <div
              key={feature.text}
              className={`flex flex-row items-center gap-2.5 relative mb-4 ${
                isNewFeature ? "animate-slideIn" : ""
              }`}
            >
              <img src={feature.icon} alt={feature.text} className="w-5" />
              <p>{feature.text}</p>
            </div>
          )
        })}
      </div>
      <div className="flex flex-row items-center gap-2.5 relative text-[#072F6C]">
        <button
          onClick={() => (window as any).tidioChatApi?.open()}
          className="text-[#F6AF1F] transition-colors duration-200 underline"
        >
          I want a custom size
        </button>
      </div>
    </div>
  )
}
