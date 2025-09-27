"use client"
import V2MediaRenderer from "@/components/V2MediaRenderer"
import React, { useRef, useEffect, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

/* NOSONAR */
interface Feature {
  icon: string
  text: string
}

interface PergolaFeaturesProps {
  selectedSize: string
  selectorData: any
}

const HIGHER_CEILING_TEXT = "Higher ceiling 8.79FT(268cm)"

// 定义常用的图标常量
const FITS_PEOPLE_ICON = "/img/fits-people.png"

// 定义常用的feature常量
const FITS_PEOPLE_2_4: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 2-4 People",
}
const FITS_PEOPLE_4_6: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 4-6 People",
}
const FITS_PEOPLE_6_8: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 6-8 People",
}
const FITS_PEOPLE_8_12: Feature = {
  icon: FITS_PEOPLE_ICON,
  text: "Fits 8-12 People",
}
const MORNING_COFFEE: Feature = {
  icon: "/img/morning-coffee.png",
  text: "Perfect For Morning Coffee",
}
const SMALL_PATIO: Feature = {
  icon: "/img/small-patio.png",
  text: "Ideal For Small Patios",
}
const HIGHER_CEILING: Feature = {
  icon: "/img/ceiling.png",
  text: "Higher Ceiling 8.29FT(268cm)",
}
const SMALL_BBQ: Feature = {
  icon: "/img/bbq.png",
  text: "Perfect For Small BBQ",
}
const MODULAR_SOFA: Feature = {
  icon: "/img/sofa.png",
  text: "Fits A Modular Sofa",
}
const SMALL_KITCHEN: Feature = {
  icon: "/img/kitchen.png",
  text: "Fits A Small Kitchen Set",
}
const HOSTING_PARTIES: Feature = {
  icon: "/img/party.png",
  text: "Perfect For Hosting Parties",
}
const EXPANSIVE_BACKYARD: Feature = {
  icon: "/img/backyard.png",
  text: "Ideal For Expansive Backyards",
}
const OUTDOOR_RETREATS: Feature = {
  icon: "/img/outdoor.png",
  text: "Perfect For Outdoor Retreats",
}
const MULTIPLE_SEATING: Feature = {
  icon: "/img/small-patio.png",
  text: "Ideal For Multiple Seating Areas",
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

// Color Dark Gray, White
export const VALUE_BY_COLORS: Record<string, string> = {
  "Dark Gray": "#252D35",
  "Light Gray": "#D7D7D7",
  White: "#FFFFFF",
}

// style CONFIG
export const IMG_BY_STYLE: Record<string, string> = {
  "Wall Mounted": "/img/product_style.png",
  Freestanding: "/img/product_style.png",
}

export const PergolaFeatures: React.FC<PergolaFeaturesProps> = ({
  selectedSize,
  selectorData,
}) => {
  const [prevFeatures, setPrevFeatures] = useState<Set<string>>(new Set())
  const features = FEATURES_BY_SIZE[selectedSize] || FEATURES_BY_SIZE["10'x10'"]
  const sizeDescription =
    selectorData?.sizeData[selectedSize]?.description || ""

  useEffect(() => {
    // 延迟更新prevFeatures，以便动画完成后再更新
    const timer = setTimeout(() => {
      setPrevFeatures(new Set(features.map((f) => f.text)))
    }, 200) // 与动画时长相同
    return () => clearTimeout(timer)
  }, [selectedSize])

  return (
    <div className="grid grid-cols-2 gap-2 min-h-[160px]">
      <div className="flex-1 pb-2 text-xs">
        <Markdown
          remarkPlugins={[remarkGfm]}
          // rehypePlugins={[rehypeRaw]}
          remarkRehypeOptions={{ passThrough: ["link"] }}
        >
          {sizeDescription}
        </Markdown>
      </div>
      <V2MediaRenderer
        media={selectorData?.sizeData[selectedSize]?.image}
        options={{
          enableZoom: true,
          objectFit: "contain",
          imageOptions: {
            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
          },
        }}
      />
      {/* <img
        src={
          selectorData?.sizeData[selectedSize]?.image?.url ||
          "/img/product_size.png"
        }
        alt="Relaxure Pergola Kit"
        className="w-full h-[120px] object-contain"
      /> */}
    </div>
  )
}
