"use client"
import React from "react"
import Image from "next/image"
import { FIXED_BLUR_DATA_URL } from "@modules/products/single/components/ImgContent/ImgContent"

interface GoodMemoryProps {
  goodMemory: {
    title: string
    description: string
    subtitle: string
    with_relaxure_one: string
    with_relaxure_two: string
    with_relaxure_three: string
    image: { url: string; name: string }
  }
}

const GoodMemory: React.FC<{ goodMemory: GoodMemoryProps["goodMemory"] }> = ({
  goodMemory,
}) => {
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 bg-white mt-[120px]">
      {/* 顶部大标题 */}
      <h2 className="text-2xl lg:text-4xl font-bold text-[#343A40] text-center max-w-4xl mb-12">
        {goodMemory.title}
      </h2>
      {/* 主内容区 */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* 左侧内容 */}
        <div className="flex-1 flex flex-col gap-6 max-w-xl">
          <p className="text-[#69727A] text-lg">{goodMemory.description}</p>
          <div className="mt-6">
            <div className="font-bold text-[22px] mb-4 text-[#343A40]">
              {goodMemory.subtitle}
            </div>
            <ul className="flex flex-col gap-4 text-[#69727A]">
              {[
                goodMemory.with_relaxure_one,
                goodMemory.with_relaxure_two,
                goodMemory.with_relaxure_three,
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-[#3d4543] text-lg"
                >
                  <span className="inline-block w-6 h-6 rounded-full border-2 border-[#3d4543] flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#3d4543"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 右侧图片及毛玻璃卡片 */}
        <div className="flex-1 flex items-center justify-center relative w-full max-w-xl min-w-[320px]">
          <Image
            src={strapiBaseUrl + goodMemory.image.url}
            alt={goodMemory.image.name}
            className="rounded-2xl w-full object-cover max-h-[420px] min-h-[320px]"
            width={600}
            height={420}
            placeholder="blur"
            blurDataURL={FIXED_BLUR_DATA_URL}
          />
        </div>
      </div>
    </section>
  )
}

export default GoodMemory
