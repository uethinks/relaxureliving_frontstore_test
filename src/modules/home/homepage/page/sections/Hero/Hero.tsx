import React from "react"
import { HeroProps } from "types/global"
import { HeroButtons } from "./HeroButtons"

const cmsBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

export const Hero = ({
  hero,
}: {
  hero: HeroProps | null
}): JSX.Element | null => {
  if (!hero) return null

  return (
    <div className="flex flex-col items-end gap-2 pt-2.5 px-0 relative self-stretch w-full">
      <div
        className={`
          flex lg:aspect-[1352/900] min-h-[586px] items-center px-5 md:px-[64px] 
          py-0 relative self-stretch w-full rounded-[20px] overflow-hidden 
          lg:shadow-shadow-cards-relaxure bg-cover bg-[50%_50%]
        `}
        style={{
          backgroundImage: `url("${cmsBaseUrl}${hero.BackgroundImage.formats.xlarge.url}")`,
        }}
      >
        <div className="absolute inset-0 bg-black-30" />
        <div className="flex flex-col w-full lg:w-4/5 items-start gap-8 relative z-10">
          <div className="flex flex-col items-start gap-6 relative flex-[0_0_auto]">
            <h1
              className={`
              self-stretch mt-20 lg:mt-[-1.00px] font-heading 
              font-[number:var(--heading-font-weight)] text-[#ffffff] 
              text-[22px] lg:text-[length:var(--heading-font-size)] 
              leading-[var(--heading-line-height)] relative 
              tracking-[var(--heading-letter-spacing)] 
              [font-style:var(--heading-font-style)]
            `}
            >
              {hero.Title}
            </h1>

            <p
              className={`
              hidden md:block self-stretch w-full lg:w-3/4 text-[#ffffff] 
              text-[16px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] 
              leading-[var(--relaxure-sub-heading-18-line-height)] relative 
              font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] 
              tracking-[var(--relaxure-sub-heading-18-letter-spacing)] 
              [font-style:var(--relaxure-sub-heading-18-font-style)]
            `}
            >
              {hero.Description}
            </p>
            <p
              className={`
              block md:hidden self-stretch w-full lg:w-3/4 text-[#ffffff] 
              text-[16px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] 
              leading-[var(--relaxure-sub-heading-18-line-height)] relative 
              font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] 
              tracking-[var(--relaxure-sub-heading-18-letter-spacing)] 
              [font-style:var(--relaxure-sub-heading-18-font-style)]
            `}
            >
              Create memorable gatherings and intimate moments in a space that
              impresses guests and enhances everyday living.
            </p>
          </div>

          <HeroButtons
            leftButton={hero.LeftButton}
            rightButton={hero.RightButton ?? ""}
          />
        </div>
      </div>
    </div>
  )
}
