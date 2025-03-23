"use client"
import React, { useState } from "react"
import { StoreProduct } from "@medusajs/types"
interface Props {
  product: StoreProduct
  property1: "default"
}

export const ImgContent = ({ product, property1 }: Props): JSX.Element => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = product.images?.map((image) => image)

  return (
    <div className="relative w-[817px] h-[558px] rounded-[20px] overflow-hidden shadow-shadow-relaxure-button">
      <div
        className="w-full h-full bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url(${images?.[currentImageIndex]?.url})` }}
      />
      <div className="absolute w-[884px] h-[222px] top-[336px] left-0 rounded-[20px] [background:linear-gradient(180deg,rgba(52,58,64,0)_0%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute w-[789px] h-[134px] top-[409px] left-[15px] bg-[#ffffffb2] rounded-[20px] overflow-hidden border border-solid border-[#ffffff87] backdrop-blur-[3.3px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.3px)_brightness(100%)]">
        <div className="inline-flex h-[117px] items-center gap-2.5 relative top-[9px] left-2.5">
          {images?.map((image, index) => (
            <div
              key={index}
              className={`relative w-[120px] h-[117px] rounded-2xl bg-cover bg-center cursor-pointer ${
                index === currentImageIndex ? "border-2 border-white-500" : ""
              }`}
              style={{ backgroundImage: `url(${image.url})` }}
              onClick={() => setCurrentImageIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
