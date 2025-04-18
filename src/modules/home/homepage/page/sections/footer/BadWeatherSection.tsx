import React from "react"
import Link from "next/link"

export const BadWeatherSection = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center w-full items-center gap-5 mt-[68px] lg:px-[260px] text-white">
      <h2 className="text-[18px] lg:text-[length:var(--heading-2-font-size)] font-bold text-center leading-tight">
        Leave "Bad Weather" Days Behind
      </h2>

      <p className="text-[14px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] text-center max-w-[800px] mt-4 opacity-90">
        Explore the Relaxure Corsica and take the first step to four-season
        outdoor living.
      </p>

      <Link href="/us/products/corsica" className="mt-8">
        <button className="w-[271px] h-[48px] border-[#ffffff] border bg-transparent hover:bg-[#072f6c] transition-colors rounded-[10px] shadow-[0px_3px_7px_#072f6c1a] overflow-hidden">
          <div className="font-medium text-white text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
            Explore the Corsica
          </div>
        </button>
      </Link>
    </div>
  )
}
