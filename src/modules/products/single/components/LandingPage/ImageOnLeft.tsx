import React from "react"
import YouTubeWrapper from "../YouTubeWrapper"
import { PergolaData } from "@/types/global"
export const ImageOnLeft = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  const productFeatures = pergolaData?.productFeatures
  const actualVideoId = productFeatures?.youtubeCode || "qtfijujZKO0"
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <div className="w-full inline-flex flex-col items-center gap-[60px] relative mt-10">
      <div className="flex flex-col w-full items-center justify-center gap-2.5 relative">
        <p className="relative w-full font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          {productFeatures?.title}
        </p>
        <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500] text-center">
          {productFeatures?.description}
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-2.5">
        {/* 交替布局：偶数索引左文字右图片，奇数索引右文字左图片 */}
        {productFeatures?.featureItem.map((item, index) => {
          const isEven = index % 2 === 0
          const textContent = (
            <div className="flex flex-col justify-center w-1/2 px-4">
              <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
                {item.title}
              </h3>
              <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
                {item.description}
              </p>
            </div>
          )
          const imageContent = (
            <div className="w-1/2 px-4">
              <div className="relative w-full aspect-[3/2] rounded-[20px] overflow-hidden">
                <img
                  src={`${strapiBaseUrl}${item.image.url}`}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                />
              </div>
            </div>
          )

          return (
            <div
              key={item.id}
              className="flex w-full flex-row items-center justify-center gap-8 py-8"
            >
              {isEven ? (
                <>
                  {textContent}
                  {imageContent}
                </>
              ) : (
                <>
                  {imageContent}
                  {textContent}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
