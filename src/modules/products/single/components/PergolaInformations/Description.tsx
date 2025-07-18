import React from "react"
import { PergolaData } from "@/types/global"
import Link from "next/link"

export const Description = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  const { descriptionTab } = pergolaData
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <div className="flex flex-col w-full items-start gap-2.5 relative">
      <div className="flex flex-col items-center justify-center gap-10 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center justify-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            {descriptionTab.title}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url("${baseUrl}${descriptionTab.image.url}")`,
          }}
          className="w-full aspect-[360/400] lg:aspect-[817/600] rounded-[20px] bg-no-repeat bg-cover bg-[50%_50%]"
        ></div>
        <div className="flex items-center px-0 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[14px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
            {descriptionTab.descriptions.map((item, index) => (
              <React.Fragment key={index}>
                {item.multiDescriptions}
                {index < descriptionTab.descriptions.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
        <div className="flex justify-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-fit bg-[#F6AF1F] hover:bg-[#fdce6f] text-black px-4 py-2 rounded-lg">
            <Link href="/accessories">Add Accessory</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
