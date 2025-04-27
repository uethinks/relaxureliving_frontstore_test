import React from "react"
import { PergolaData } from "@/types/global"

export const Advantages = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  const notJustAPrettyFace = pergolaData?.notJustAPrettyFace
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <div className="flex flex-col w-full items-center justify-center px-8 py-6 relative bg-[#f3f3f3] mt-10">
      <div className="flex flex-col items-center gap-[60px] relative self-stretch w-full flex-[0_0_auto]">
        <p className="relative self-stretch [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-[18px] lg:text-[36px] text-center tracking-[0] leading-[50.4px]">
          {notJustAPrettyFace?.title}
        </p>
        <div className="flex flex-col lg:flex-row items-start gap-[60px] relative flex-[0_0_auto]">
          <div className="flex flex-col w-full lg:1/2 items-start gap-[20px] relative">
            <div className="flex flex-col items-start gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative self-stretch [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-[18px] lg:text-[22px] tracking-[0] leading-[30.8px]">
                {notJustAPrettyFace?.notJustAPrettyFaceItem[0].title}
              </p>
              <p className="relative self-stretch [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-[18px] tracking-[0] leading-[27px]">
                {notJustAPrettyFace?.notJustAPrettyFaceItem[0].description}
              </p>
            </div>
            <div className="flex flex-col w-full items-start gap-[10px] p-[20px] relative bg-white rounded-[20px]">
              {notJustAPrettyFace?.notJustAPrettyFaceItem[0].notJustPrettyFaceIconContent.map(
                (item) => (
                  <div
                    key={item.id}
                    className="inline-flex items-center gap-[20px] relative self-stretch w-full flex-[0_0_auto]"
                  >
                    <img
                      className="relative w-[24px] h-[24px]"
                      alt="Frame"
                      src={`${strapiBaseUrl}${item.icon.url}`}
                    />
                    <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-[18px] tracking-[0] leading-[27px]">
                      {item.content}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col w-full lg:1/2 items-start gap-[20px] relative">
            <div className="flex flex-col items-start gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative self-stretch [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-[18px] lg:text-[22px] tracking-[0] leading-[30.8px]">
                {notJustAPrettyFace?.notJustAPrettyFaceItem[1].title}
              </p>
              <p className="relative self-stretch [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-[18px] tracking-[0] leading-[27px]">
                {notJustAPrettyFace?.notJustAPrettyFaceItem[1].description}
              </p>
            </div>
            <div className="flex flex-col w-full items-start gap-[10px] p-[20px] relative bg-white rounded-[20px]">
              {notJustAPrettyFace?.notJustAPrettyFaceItem[1].notJustPrettyFaceIconContent.map(
                (item) => (
                  <div
                    key={item.id}
                    className="inline-flex items-center gap-[20px] relative self-stretch w-full flex-[0_0_auto]"
                  >
                    <img
                      className="relative w-[24px] h-[24px]"
                      alt="Frame"
                      src={`${strapiBaseUrl}${item.icon.url}`}
                    />
                    <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-[18px] tracking-[0] leading-[27px]">
                      {item.content}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
