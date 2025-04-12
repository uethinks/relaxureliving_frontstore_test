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
    <div className="flex flex-col justify-center items-center relative w-full rounded-[20px] overflow-hidden shadow-shadow-relaxure-button">
      <img
        className="rounded-[20px]"
        src={images?.[currentImageIndex]?.url}
        alt=""
      />
      <div className="flex py-2 justify-center items-center px-1 w-[98%]  bg-[#ffffff] rounded-[20px] overflow-hidden border border-solid border-[#ffffff87] backdrop-blur-[3.3px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.3px)_brightness(100%)]">
        <div className="flex w-full justify-between items-center gap-2.5 relative">
          {images?.map((image, index) => (
            <button
              key={index}
              className={`relative w-[16.67%] aspect-square rounded-2xl bg-cover bg-center cursor-pointer ${
                index === currentImageIndex ? "border-2 border-white-500" : ""
              }`}
              style={{ backgroundImage: `url(${image.url})` }}
              onClick={() => setCurrentImageIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}
