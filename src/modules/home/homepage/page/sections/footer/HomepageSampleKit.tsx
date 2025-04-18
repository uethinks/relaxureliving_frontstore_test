import React from "react"
import Link from "next/link"

export const HomepageSampleKit = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center w-full items-center gap-5 mt-[68px] lg:px-[260px]">
      <img
        className="relative max-w-full lg:max-w-[563px] mt-[-10.00px]"
        alt="Rectangle"
        src="https://c.animaapp.com/q2tzgr8Y/img/rectangle-1307-1.png"
      />

      <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-white text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          See Relaxure in Action
        </div>

        <p className="relative w-full opacity-80 font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-white text-[14px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] text-center tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
          Our sample kit puts premium quality in your hands. Get a tangible
          preview of your future outdoor oasis with aluminum frame pieces, glass
          door samples, and shade material swatches in all standard colors.
          Experience firsthand the substantial weight, precision engineering,
          and refined details that set Relaxure apart.
        </p>
      </div>

      <div className="inline-flex flex-col items-center gap-5 relative flex-[0_0_auto]">
        <Link href="/us/products/pergola">
          <button className="w-[271px] h-[48px] border-[#ffffff] border bg-[#072f6c] rounded-[10px] shadow-[0px_3px_7px_#072f6c1a,0px_13px_13px_#072f6c17,0px_29px_17px_#072f6c0d,0px_51px_20px_#072f6c03,0px_80px_22px_#072f6c00] overflow-hidden">
            <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              Bring Relaxure Home
            </div>
          </button>
        </Link>
        <div className="relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#ffffff] text-[14px] md:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
          $39 with Free Shipping
        </div>
      </div>
    </div>
  )
}
