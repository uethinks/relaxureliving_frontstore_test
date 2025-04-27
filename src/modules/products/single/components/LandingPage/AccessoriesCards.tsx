import React from "react"
import { PergolaData } from "@/types/global"

export const AccessoriesCards = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  const productAccessories = pergolaData?.productAccessories
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <div className="flex flex-col w-full items-center justify-center gap-10 relative mt-10">
      <div className="flex flex-col w-full items-center gap-5 relative flex-[0_0_auto]">
        <div className="flex flex-col w-full h-[100px] items-start relative">
          <div className="flex items-center justify-center gap-2.5 px-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-full mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              {productAccessories?.title}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 px-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-full mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              {productAccessories?.subtitle}
            </div>
          </div>
        </div>

        <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
          <p className="w-full px-10 text-[#68717a] text-center relative mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
            {productAccessories?.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 relative self-stretch w-full flex-[0_0_auto] px-00">
        {productAccessories?.productAccessoryItem.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundImage: `url(${strapiBaseUrl}${item.image.url})`,
            }}
            className="flex flex-col items-center justify-end relative w-full lg:w-1/3 h-[450px] rounded-[20px] overflow-hidden bg-cover bg-[50%_50%]"
          >
            <div className="flex justify-center items-center relative rounded-[20px] mb-10">
              <div className="flex flex-col w-[90%] items-center gap-5 relative bg-[#ffffff3d] rounded-[20px] border border-solid border-[#ffffff70] backdrop-blur-[14.1px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.1px)_brightness(100%)]">
                <div className="flex flex-col items-center gap-2 p-2.5 relative self-stretch w-full">
                  <div className="flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-bold text-[#ffffff] text-lg tracking-[0] leading-[25.2px]">
                      {item.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <p className="w-full mr-[-55.00px] text-[#ffffff] relative mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
