"use client"
import React, { useRef, useEffect, useState } from "react"
/* NOSONAR - 此文件包含必要的重复代码*/
interface Feature {
  icon: string
  text: string
}

interface PergolaFeaturesProps {
  selectedSize: string
}

const HIGHER_CEILING_TEXT = "Higher ceiling 8.79FT(268cm)"

const FEATURES_BY_SIZE: Record<string, Feature[]> = {
  "10'x10'": [
    { icon: "/img/fits-people.png", text: "Fits 2-4 people" },
    { icon: "/img/morning-coffee.png", text: "Perfect for morning coffee" },
    { icon: "/img/small-patio.png", text: "Ideal for small patios" },
    { icon: "/img/ceiling.png", text: HIGHER_CEILING_TEXT },
  ],
  "10'x13'": [
    { icon: "/img/fits-people.png", text: "Fits 4-6 people" },
    { icon: "/img/morning-coffee.png", text: "Perfect for morning coffee" },
    { icon: "/img/bbq.png", text: "Perfect for small BBQ" },
    { icon: "/img/sofa.png", text: "Fits a modular sofa" },
    { icon: "/img/small-patio.png", text: "Ideal for small patios" },
    { icon: "/img/ceiling.png", text: HIGHER_CEILING_TEXT },
  ],
  "13'x13'": [
    { icon: "/img/fits-people.png", text: "Fits 6-8 people" },
    { icon: "/img/bbq.png", text: "Perfect for small BBQ" },
    { icon: "/img/sofa.png", text: "Fits a modular sofa" },
    { icon: "/img/kitchen.png", text: "Fits a small kitchen set" },
    { icon: "/img/party.png", text: "Perfect for hosting parties" },
    { icon: "/img/ceiling.png", text: HIGHER_CEILING_TEXT },
  ],
  "13'x19'": [
    { icon: "/img/fits-people.png", text: "Fits 8-12 people" },
    { icon: "/img/backyard.png", text: "Ideal for expansive backyards" },
    { icon: "/img/outdoor.png", text: "Perfect for outdoor retreats" },
    { icon: "/img/small-patio.png", text: "Ideal for multiple seating areas" },
    { icon: "/img/kitchen.png", text: "Fits a small kitchen set" },
    { icon: "/img/party.png", text: "Perfect for hosting parties" },
    { icon: "/img/ceiling.png", text: HIGHER_CEILING_TEXT },
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
