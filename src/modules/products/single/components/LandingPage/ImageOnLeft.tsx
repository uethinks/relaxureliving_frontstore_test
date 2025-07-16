import React from "react"
import { PergolaData } from "@/types/global"
import Link from "next/link"
export const ImageOnLeft = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  const productFeatures = pergolaData?.productFeatures
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <div className="w-full inline-flex flex-col items-center gap-[60px] relative mt-10">
      <div className="flex flex-col w-full items-center justify-center gap-2.5 relative">
        <p className="relative w-full font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          {productFeatures?.title}
        </p>
        <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500] md:text-center">
          {productFeatures?.description}
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-2.5">
        {/* 移动端：图片在上文字在下；桌面端：交替布局 */}
        {productFeatures?.featureItem.map((item, index) => {
          const isEven = index % 2 === 0
          const textContent = (
            <div className="flex flex-col justify-center w-full md:w-1/2 px-4 order-1 md:order-none">
              <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
                {item.title}
              </h3>
              <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
                {item.description}
              </p>
            </div>
          )
          const imageContent = (
            <div className="w-full md:w-1/2 px-4 order-2 md:order-none">
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
              className="flex w-full flex-col md:flex-row items-center justify-center gap-8 py-8"
            >
              {/* 移动端：始终是图片在上文字在下 */}
              {/* 桌面端：根据索引交替排列 */}
              {isEven ? (
                <>
                  {imageContent}
                  {textContent}
                </>
              ) : (
                <>
                  {textContent}
                  {imageContent}
                </>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] mb-5">
        <div className="w-fit bg-[#F6AF1F] hover:bg-[#fdce6f] text-black px-4 py-2 rounded-lg">
          <Link href="/accessories">Add Accessory</Link>
        </div>
      </div>
    </div>
  )
}
