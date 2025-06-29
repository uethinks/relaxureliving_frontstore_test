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
          <div className="flex flex-wrap items-center justify-center gap-5 p-4 rounded-[3px] bg-white">
            <img className="w-10" src="/img/visa.png" alt="visa" />
            <img className="w-10" src="/img/master.png" alt="master" />
            <img className="w-10" src="/img/Maestro.png" alt="Maestro" />
            <img className="w-10" src="/img/JCB.png" alt="JCB" />
            <img
              className="w-10"
              src="/img/American_Express.png"
              alt="American_Express"
            />
            <img
              className="w-10"
              src="/img/Diners_Club.png"
              alt="Diners_Club"
            />
            <img className="w-10" src="/img/Discover.png" alt="Discover" />
            <img
              className="w-10"
              src="/img/VISA_Electron.png"
              alt="VISA_Electron"
            />
            <img className="w-10" src="/img/Klarna.png" alt="Klarna" />
            <img className="w-10" src="/img/afterpay.png" alt="afterpay" />
            <img className="w-10" src="/img/apple_pay.png" alt="apple_pay" />
            <img className="w-10" src="/img/google_pay.png" alt="google_pay" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:h-11 md:items-center md:justify-between md:lg:gap-10 relative">
            <Link
              href="/terms/intellectual-property-right"
              className="text-center"
            >
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Intellectual Property Rights
              </div>
            </Link>
            <Link href="/terms/shipping-policy" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Shipping Policy
              </div>
            </Link>
            <Link href="/terms/terms-of-service" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Terms of service
              </div>
            </Link>
            <Link href="/terms/privacy-policy" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Privacy policy
              </div>
            </Link>
            <Link href="/terms/warranty" className="text-center">
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] lg:text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
                Warranty
              </div>
            </Link>
            <Link href="/terms/refund-policy" className="text-center">
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
                      1-213-566-8658 (Toll free phone number)
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-full gap-5">
                    <a
                      href="mailto:info@relaxureliving.com"
                      className="text-white text-base tracking-[0] leading-6 whitespace-normal hover:text-blue-300 hover:underline transition-colors duration-200 cursor-pointer"
                      title="click to send email"
                    >
                      info@relaxureliving.com
                    </a>
                  </div>
                </div>

                <div className="relative flex flex-wrap justify-end items-center gap-5">
                  <Link href="https://www.facebook.com/profile.php?id=61570952814126&mibextid=wwXIfr&mibextid=wwXIfr">
                    <div className="relative w-[47px] h-[45px] bg-[url('/img/facebook.png')] bg-cover"></div>
                  </Link>
                  <Link href="https://www.instagram.com/relaxureliving/">
                    <div className="relative w-[47px] h-[45px] bg-[url('/img/insta.png')] bg-cover"></div>
                  </Link>
                  <Link href="https://www.youtube.com/@Relaxure-Pergola">
                    <div className="relative w-[47px] h-[45px] bg-[url('/img/youtube.png')] bg-cover"></div>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="flex flex-col md:hidden items-center justify-center gap-2">
                  <div className="flex items-center justify-center w-full gap-2">
                    <span className="text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                      1-213-566-8658 (Toll free phone number)
                    </span>
                  </div>
                  <div className="flex items-center justify-center w-full gap-2">
                    <a
                      href="mailto:info@relaxureliving.com"
                      className="text-white text-base tracking-[0] leading-6 whitespace-normal"
                    >
                      info@relaxureliving.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-2 mt-2 opacity-80 [font-family:'Montserrat',Helvetica] font-normal text-white text-[14px] text-center tracking-[0] leading-[normal]">
                  <div>© 2025 Relaxure</div>
                  <div className="text-[8px]">TM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
