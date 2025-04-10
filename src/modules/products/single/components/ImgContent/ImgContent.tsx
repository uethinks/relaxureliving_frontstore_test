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
    <div className="relative w-full h-[558px] rounded-[20px] overflow-hidden shadow-shadow-relaxure-button">
      <div
        className="w-full h-full bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url(${images?.[currentImageIndex]?.url})` }}
      />
      <div className="absolute w-full h-[222px] bottom-0 left-0 rounded-[20px] [background:linear-gradient(180deg,rgba(52,58,64,0)_0%,rgba(0,0,0,0.7)_100%)]" />
      <div className="flex justify-center items-center px-1 absolute w-[98%] h-[134px] bottom-4 left-1/2 -translate-x-1/2 bg-[#ffffffb2] rounded-[20px] overflow-hidden border border-solid border-[#ffffff87] backdrop-blur-[3.3px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.3px)_brightness(100%)]">
        <div className="flex w-full h-[117px] justify-between items-center gap-2.5 relative">
          {images?.map((image, index) => (
            <div
              key={index}
              className={`relative w-1/6 h-[117px] rounded-2xl bg-cover bg-center cursor-pointer ${
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
