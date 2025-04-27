import React from "react"
import { PergolaData } from "@/types/global"

export const Description = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  const { descriptionTab } = pergolaData
  return (
    <div className="flex flex-col w-full items-start gap-4 relative">
      <div className="flex flex-col items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div
          style={{
            backgroundImage: `url("/img/pergola2.jpg")`,
          }}
          className="w-full lg:mb-[60px] aspect-[360/400] lg:aspect-[817/600] rounded-[20px] bg-no-repeat bg-cover bg-[50%_50%]"
        ></div>
        <div className="flex items-center justify-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            {descriptionTab.title}
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto] lg:mt-[30px]">
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
      </div>
    </div>
  )
}
