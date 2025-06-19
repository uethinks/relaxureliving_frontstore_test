"use client"
import React, { useState } from "react"

interface LandingSliderProps {
  landingSlider: {
    title: string
    description: string
    images: { url: string; name?: string }[]
  }
}

const SMALL_WIDTH = 250
const SMALL_HEIGHT = 421
const BIG_WIDTH = 400
const BIG_HEIGHT = 500
const GAP = 16

const LandingSlider: React.FC<LandingSliderProps> = ({ landingSlider }) => {
  const images = landingSlider.images
  const [activeIndex, setActiveIndex] = useState(Math.floor(images.length / 2))
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

  // 容器宽度 = 2.5*小图 + 1*大图 + 4*gap
  const containerWidth = SMALL_WIDTH * 2.5 + BIG_WIDTH + GAP * 4

  // 动态主轴对齐方式
  const getJustifyClass = () => {
    if (activeIndex === 0) return "justify-start"
    if (activeIndex === images.length - 1) return "justify-end"
    return "justify-center"
  }

  return (
    <div className="w-full flex flex-col items-center mb-4 mt-[120px]">
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 mt-2">
        {landingSlider?.title}
      </h2>
      <p className="text-base lg:text-lg text-center text-gray-600 max-w-2xl mb-8">
        {landingSlider?.description}
      </p>
      <div
        className="w-full relative flex justify-center overflow-hidden"
        style={{ height: BIG_HEIGHT }}
      >
        <div
          className={`flex ${getJustifyClass()} items-center w-full h-full gap-8`}
        >
          {images.map((img, idx) => {
            const isActive = idx === activeIndex
            return (
              <div
                key={img.url}
                className={[
                  "relative flex-shrink-0 mx-2 transition-all duration-300 cursor-pointer rounded-[20px] shadow-lg overflow-visible bg-cover bg-center",
                  isActive ? "z-20" : "z-10",
                ].join(" ")}
                style={{
                  width: isActive ? BIG_WIDTH : SMALL_WIDTH,
                  height: isActive ? BIG_HEIGHT : SMALL_HEIGHT,
                  backgroundImage: `url(${strapiBaseUrl + img.url})`,
                }}
                onClick={() => setActiveIndex(idx)}
                title={img.name || ""}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LandingSlider
