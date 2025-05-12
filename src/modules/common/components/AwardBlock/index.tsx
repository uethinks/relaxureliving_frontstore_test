"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { AwardBlockProps, Image } from "types/global"

export const AwardBlock: React.FC<{ data: AwardBlockProps }> = ({ data }) => {
  const { title, images } = data
  const isScrollable = images.length > 4
  const cmsUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <div className="w-full bg-[#f5f5f5] rounded-[20px] py-10 flex flex-col items-center mx-auto">
      <h2 className="text-[18px] lg:text-[36px] font-bold font-merriweather text-center mb-8">
        {title}
      </h2>
      {isScrollable ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={60}
          className="w-full"
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {images.map((img: Image, idx: number) => (
            <SwiperSlide
              key={idx}
              style={{
                display: "flex",
                justifyContent: "around",
                alignItems: "center",
                height: 180,
                width: 250,
                maxWidth: 250,
              }}
            >
              <div className="bg-white rounded-xl flex items-center justify-center p-6 h-40 w-40 mx-auto">
                <img
                  src={`${cmsUrl}${img.url}`}
                  alt={img.name || ""}
                  className="max-h-24 max-w-full object-contain"
                  style={{ maxHeight: 180, maxWidth: 250 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-wrap justify-center gap-[8px] lg:gap-[60px]">
          {images.map((img: Image, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-xl flex items-center justify-center w-[75px] h-[64px] lg:h-[180px] lg:w-[250px]"
            >
              <img
                src={`${cmsUrl}${img.url}`}
                alt={img.name || ""}
                className="max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
