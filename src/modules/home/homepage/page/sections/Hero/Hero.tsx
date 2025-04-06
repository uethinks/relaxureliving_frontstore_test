import React from "react"
import { StyleSecondary } from "../../../../components/StyleSecondary"
import { HeroProps } from "types/global"
import Link from "next/link"
const cmsBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

export const Hero = ({ hero }: { hero: HeroProps | null }): JSX.Element => {
  return (
    <div className="flex flex-col h-[983px] items-end gap-2 pt-2.5 pb-10 px-0 relative self-stretch w-full">
      <div
        className="flex h-[900px] items-center px-16 py-0 relative self-stretch w-full rounded-[20px] overflow-hidden shadow-shadow-cards-relaxure bg-cover bg-[50%_50%]"
        style={{
          backgroundImage: `url(${cmsBaseUrl}${hero?.BackgroundImage.url})`,
        }}
      >
        <div className="flex flex-col w-[1224px] items-start gap-8 relative">
          <div className="flex flex-col w-[557px] items-start gap-6 relative flex-[0_0_auto]">
            <p className="self-stretch mt-[-1.00px] font-heading font-[number:var(--heading-font-weight)] text-[#ffffff] text-[length:var(--heading-font-size)] leading-[var(--heading-line-height)] relative tracking-[var(--heading-letter-spacing)] [font-style:var(--heading-font-style)]">
              {hero?.Title}
            </p>

            <p className="self-stretch text-[#ffffff] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              {hero?.Description}
            </p>
          </div>

          <div className="inline-flex items-start justify-end gap-5 relative flex-[0_0_auto]">
            <Link href="/us/products/pergola">
              <div className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] bg-[#072f6c] rounded-[10px]">
                <button className="all-[unset] box-border relative w-fit [font-family:'Montserrat',Helvetica] font-normal text-[color:var(--semantic-border-alternate)] text-base tracking-[0] leading-6 whitespace-nowrap">
                  {hero?.LeftButton}
                </button>
              </div>
            </Link>

            <StyleSecondary
              className="!border-[#ffffff] !rounded-[10px] !mr-[-1.00px] !mt-[-1.00px] !mb-[-1.00px] !flex-[0_0_auto]"
              divClassName="!text-[#ffffff] !tracking-[0] !text-base ![font-style:unset] !font-normal ![font-family:'Roboto',Helvetica] !leading-6"
              text={hero?.RightButton ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
