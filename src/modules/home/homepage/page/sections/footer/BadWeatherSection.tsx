import React from "react"
import Link from "next/link"

export const BadWeatherSection = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center w-full items-center gap-5 mt-[68px] mb-[192px] lg:px-[260px] text-white">
      <h2 className="relative self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-white text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
        Leave "Bad Weather" Days Behind
      </h2>

      <p className="relative w-full opacity-80 font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-white text-[14px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] text-center tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
        Explore the Relaxure Corsica and take the first step to four-season
        outdoor living.
      </p>

      <Link href="/products/pergola" className="mt-2">
        <button className="w-[271px] h-[48px] border-[#ffffff] border bg-transparent hover:bg-[#072f6c] transition-colors rounded-[10px] shadow-[0px_3px_7px_#072f6c1a] overflow-hidden">
          <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
            Explore the Corsica
          </div>
        </button>
      </Link>
    </div>
  )
}
