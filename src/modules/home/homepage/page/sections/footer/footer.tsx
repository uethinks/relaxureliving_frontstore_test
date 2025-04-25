import React from "react"
import Link from "next/link"
import { HomepageSampleKit } from "./HomepageSampleKit"
import { BadWeatherSection } from "./BadWeatherSection"

interface FooterDarkProps {
  isHomepage?: boolean
}

export const FooterDark = ({
  isHomepage = false,
}: FooterDarkProps): JSX.Element => {
  return (
    <div className="relative flex justify-center w-full overflow-hidden bg-[#0A142F] mt-10 lg:mt-[120px]">
      <div className="relative flex flex-col justify-between gap-2  w-full 2xl:w-[1512px] px-5 md:px-20 2xl:px-[193px]">
        {isHomepage ? <HomepageSampleKit /> : <BadWeatherSection />}
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:h-11 md:items-center md:justify-between md:lg:gap-10 relative">
            <Link href="/us/terms/terms-of-service" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Terms of service
              </div>
            </Link>
            <Link href="/us/terms/privacy-policy" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Privacy policy
              </div>
            </Link>
            <Link href="/us/terms/warranty" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Warranty
              </div>
            </Link>
            <Link href="/us/terms/refund-policy" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Refund policy
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full items-center gap-2 mb-10 border-t border-gray-700 pt-4">
          <div className="relative self-stretch w-full">
            <div className="w-full">
              <div className="w-full flex justify-between items-center ">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <Link href="/">
                    <img
                      className="w-[112px] h-[74px] "
                      alt="Logo"
                      src="/img/logo.png"
                    />
                  </Link>
                </div>
                <div className="hidden md:flex items-center justify-center gap-5">
                  <div className="flex items-center justify-start w-full gap-5">
                    <span className="text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                      1-672-673-0150
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-full gap-5">
                    <span className="text-white text-base tracking-[0] leading-6 whitespace-normal">
                      info@relaxureliving.com
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-wrap justify-end items-center gap-5">
                  <Link href="https://www.instagram.com/relaxureliving/">
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
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="flex flex-col md:hidden items-center justify-center gap-2">
                  <div className="flex items-center justify-center w-full gap-2">
                    <span className="text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                      1-672-673-0150
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-full gap-2">
                    <span className="text-white text-base tracking-[0] leading-6 whitespace-normal">
                      info@relaxureliving.com
                    </span>
                  </div>
                </div>
                <div className="mt-2 opacity-80 [font-family:'Montserrat',Helvetica] font-normal text-white text-[14px] text-center tracking-[0] leading-[normal]">
                  © 2025 Relaxure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
