import React from "react"
import Link from "next/link"

export const FooterDark = (): JSX.Element => {
  return (
    <div className="relative flex justify-center w-full overflow-hidden bg-[#0A142F]">
      <div className="relative flex flex-col justify-between gap-10  w-full md:w-full lg:w-[90%] 2xl:w-[1512px]">
        <div className="flex flex-col justify-center w-full items-center gap-5 mt-10 px-5">
          <img
            className="relative max-w-full lg:max-w-[767px] mt-[-10.00px]"
            alt="Rectangle"
            src="https://c.animaapp.com/q2tzgr8Y/img/rectangle-1307-1.png"
          />

          <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-white text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              See Relaxure in Action
            </div>

            <p className="relative w-full opacity-80 font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-white text-[length:var(--relaxure-sub-heading-18-font-size)] text-center tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              Our sample kit puts premium quality in your hands. Get a tangible
              preview of your future outdoor oasis with aluminum frame pieces,
              glass door samples, and shade material swatches in all standard
              colors. Experience firsthand the substantial weight, precision
              engineering, and refined details that set Relaxure apart.
            </p>
          </div>

          <div className="inline-flex flex-col items-center gap-5 relative flex-[0_0_auto]">
            <Link href="/us/products/pergola">
              <button className="w-[271px] h-[48px] border-[#ffffff] border bg-[#072f6c] rounded-[10px] shadow-[0px_3px_7px_#072f6c1a,0px_13px_13px_#072f6c17,0px_29px_17px_#072f6c0d,0px_51px_20px_#072f6c03,0px_80px_22px_#072f6c00] overflow-hidden">
                <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                  Bring Relaxure Home
                </div>
              </button>
            </Link>
            <div className="relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#ffffff] text-base tracking-[0] leading-6 whitespace-nowrap">
              $39 with Free Shipping
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <div className="relative self-stretch w-full">
            <div className="w-full">
              <div className="w-full flex justify-between items-center ">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <Link href="/">
                    <img
                      className="w-[112px] h-[74px] "
                      alt="Logo"
                      src="https://c.animaapp.com/ipQflS1Z/img/logo.svg"
                    />
                  </Link>
                  <div className="opacity-80 [font-family:'Montserrat',Helvetica] font-normal text-white text-[14px] text-center tracking-[0] leading-[normal]">
                    © 2025 Relaxure
                  </div>
                </div>
                <div className="flex flex-wrap h-11 items-center justify-between lg:gap-10 relative">
                  <Link href="/us/terms/warranty">
                    <div className="underline [font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                      Warranty
                    </div>
                  </Link>
                  <Link href="/us/terms/refund-policy">
                    <div className="underline [font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                      Refund policy
                    </div>
                  </Link>
                  <Link href="/us/terms/terms-of-service">
                    <div className="underline [font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                      Terms of service
                    </div>
                  </Link>
                  <Link href="/us/terms/privacy-policy">
                    <div className="underline [font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                      Privacy policy
                    </div>
                  </Link>
                </div>
                <div className="relative flex flex-wrap justify-end items-center gap-5">
                  <Link href="https://www.instagram.com/relaxurepergola/">
                    <div className="w-[47px] h-[45px] bg-[url(https://c.animaapp.com/ipQflS1Z/img/oval-copy.svg)] bg-cover">
                      <div className="relative w-[14px] h-[13px] top-[16px] left-[17px]">
                        <div className="relative h-[13px]">
                          <img
                            className="absolute w-[2px] h-[2px] top-[2px] left-[10px]"
                            alt="Oval"
                            src="https://c.animaapp.com/ipQflS1Z/img/oval.svg"
                          />
                          <img
                            className="absolute w-[7px] h-[6px] top-[3px] left-[3px]"
                            alt="Shape"
                            src="https://c.animaapp.com/ipQflS1Z/img/shape-1.svg"
                          />
                          <img
                            className="absolute w-[14px] h-[13px] top-0 left-0"
                            alt="Shape"
                            src="https://c.animaapp.com/ipQflS1Z/img/shape-2.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="https://www.youtube.com/@Relaxure-m1z">
                    <div className="relative w-[47px] h-[45px] bg-[url(https://c.animaapp.com/ipQflS1Z/img/twitter@2x.png)] bg-cover">
                      <div className="relative w-[17px] h-[11px] top-[17px] left-[16px] bg-[url(https://c.animaapp.com/ipQflS1Z/img/shape.svg)] bg-cover" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
