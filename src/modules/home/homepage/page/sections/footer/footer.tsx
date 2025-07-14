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
    <div className="relative flex justify-center w-full overflow-hidden bg-black mt-10 lg:mt-[120px]">
      <div className="relative flex flex-col justify-between gap-2 w-full 2xl:w-[1512px] px-5 md:px-20 2xl:px-[193px]">
        {/* 移动端UI（所有页面，图1） */}
        <div className="md:hidden w-full">
          {/* 顶部功能区（BadWeatherSection/首页SampleKit） */}
          <BadWeatherSection />
          {/* 支付方式 */}
          <div className="flex flex-col items-center w-full pt-4 pb-2">
            <div className="text-white text-2xl font-bold mb-2 font-merriweather">
              We Accept
            </div>
            {/* 移动端支付方式图片部分 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <img
                className="w-12 bg-white rounded"
                src="/img/visa.png"
                alt="visa"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/master.png"
                alt="master"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/Maestro.png"
                alt="Maestro"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/JCB.png"
                alt="JCB"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/American_Express.png"
                alt="American_Express"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/Diners_Club.png"
                alt="Diners_Club"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/Discover.png"
                alt="Discover"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/VISA_Electron.png"
                alt="VISA_Electron"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/Klarna.png"
                alt="Klarna"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/afterpay.png"
                alt="afterpay"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/apple_pay.png"
                alt="apple_pay"
              />
              <img
                className="w-12 bg-white rounded"
                src="/img/google_pay.png"
                alt="google_pay"
              />
            </div>
            {/* 条款跳转 */}
            <div className="text-white text-2xl font-bold mb-2 font-merriweather">
              Conditions
            </div>
            <div className="flex flex-col items-center gap-1 mb-8">
              <Link
                href="/terms/intellectual-property-right"
                className="text-white text-base"
              >
                Intellectual Property Rights
              </Link>
              <Link
                href="/terms/shipping-policy"
                className="text-white text-base"
              >
                Shipping Policy
              </Link>
              <Link
                href="/terms/terms-of-service"
                className="text-white text-base"
              >
                Terms of service
              </Link>
              <Link
                href="/terms/privacy-policy"
                className="text-white text-base"
              >
                Privacy policy
              </Link>
              <Link href="/terms/warranty" className="text-white text-base">
                Warranty
              </Link>
              <Link
                href="/terms/refund-policy"
                className="text-white text-base"
              >
                Refund policy
              </Link>
            </div>
            {/* 社交媒体 */}
            <div className="text-white text-2xl font-bold mb-2 font-merriweather">
              Follow Us
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61570952814126&mibextid=wwXIfr&mibextid=wwXIfr"
                target="_blank"
              >
                <div className="w-[47px] h-[45px] bg-[url('/img/facebook.png')] bg-cover rounded-full" />
              </Link>
              <Link
                href="https://www.instagram.com/relaxureliving/"
                target="_blank"
              >
                <div className="w-[47px] h-[45px] bg-[url('/img/insta.png')] bg-cover rounded-full" />
              </Link>
              <Link
                href="https://www.youtube.com/@Relaxure-Pergola"
                target="_blank"
              >
                <div className="w-[47px] h-[45px] bg-[url('/img/youtube.png')] bg-cover rounded-full" />
              </Link>
            </div>
            {/* 联系方式和logo */}
            <div className="flex flex-col gap-2.5 items-center w-full border-t border-[#ffffff33] pt-4 pb-10">
              <Link href="/" className="mb-2">
                <img className="w-28" src="/img/logo.svg" alt="Logo" />
              </Link>
              <span className="text-white text-base mb-1">
                +1 (511) 123 - 4567
              </span>
              <a
                href="mailto:info@relaxureliving.com"
                className="text-white text-base mb-1"
              >
                info@relaxureliving.com
              </a>
              <span className="text-white text-xs opacity-80">
                © 2025 Relaxure
              </span>
            </div>
          </div>
        </div>

        {/* 桌面端首页UI（图2） */}
        {isHomepage && (
          <div className="hidden md:block max-w-[1200px]">
            {/* 顶部功能区 */}
            <HomepageSampleKit />
            {/* 底部导航和联系方式 */}
            <div className="w-full flex justify-center items-center gap-4">
              <span className="text-white text-base mb-1">
                +1 (511) 123 - 4567
              </span>
              <span className="text-white text-base mb-1">
                <a
                  href="mailto:pergola@relaxure.com"
                  className="text-white text-base mb-1 md:ml-4"
                >
                  info@relaxureliving.com
                </a>
              </span>
            </div>
            <div className="flex flex-col items-center w-full border-t border-[#ffffff33] pt-4">
              <div className="flex flex-col md:flex-row md:justify-between w-full items-center">
                <Link href="/" className="mb-2 md:mb-0">
                  <img className="w-28" src="/img/logo.svg" alt="Logo" />
                </Link>
                <div className="flex flex-row justify-center items-center gap-8 w-full mb-2">
                  <Link href="/#accessories">
                    <span className="text-white text-base">Accesories</span>
                  </Link>
                  <Link href="/#features">
                    <span className="text-white text-base">Features</span>
                  </Link>
                  <Link href="/products/pergola">
                    <span className="text-white text-base">Our pergola</span>
                  </Link>
                  <Link href="/about-us">
                    <span className="text-white text-base">About us</span>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-end items-center gap-4 w-full mb-2">
                <Link
                  href="https://www.facebook.com/profile.php?id=61570952814126&mibextid=wwXIfr&mibextid=wwXIfr"
                  target="_blank"
                >
                  <div className="w-[47px] h-[45px] bg-[url('/img/facebook.png')] bg-cover rounded-full" />
                </Link>
                <Link
                  href="https://www.instagram.com/relaxureliving/"
                  target="_blank"
                >
                  <div className="w-[47px] h-[45px] bg-[url('/img/insta.png')] bg-cover rounded-full" />
                </Link>
                <Link
                  href="https://www.youtube.com/@Relaxure-Pergola"
                  target="_blank"
                >
                  <div className="w-[47px] h-[45px] bg-[url('/img/youtube.png')] bg-cover rounded-full" />
                </Link>
              </div>
              <span className="text-white text-xs opacity-80">
                © 2025 Relaxure
              </span>
            </div>
          </div>
        )}

        {/* 桌面端非首页UI（图3） */}
        {!isHomepage && (
          <div className="hidden md:block w-full">
            {/* 顶部功能区 */}
            <BadWeatherSection />
            {/* 支付方式、条款、社交、联系方式 */}
            <div className="flex flex-row justify-between w-full mb-4 mt-4">
              <div>
                <div className="text-white text-2xl font-bold mb-4 font-merriweather">
                  We Accept
                </div>
                {/* 桌面端非首页支付方式图片部分 */}
                <div className="grid grid-cols-3 gap-2 mb-4 w-[270px]">
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/visa.png"
                    alt="visa"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/master.png"
                    alt="master"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/Maestro.png"
                    alt="Maestro"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/JCB.png"
                    alt="JCB"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/American_Express.png"
                    alt="American_Express"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/Diners_Club.png"
                    alt="Diners_Club"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/Discover.png"
                    alt="Discover"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/VISA_Electron.png"
                    alt="VISA_Electron"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/Klarna.png"
                    alt="Klarna"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/afterpay.png"
                    alt="afterpay"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/apple_pay.png"
                    alt="apple_pay"
                  />
                  <img
                    className="w-12 bg-white rounded"
                    src="/img/google_pay.png"
                    alt="google_pay"
                  />
                </div>
              </div>
              <div>
                <div className="text-white text-2xl font-bold mb-4 font-merriweather">
                  Conditions
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <Link
                    href="/terms/intellectual-property-right"
                    className="text-white text-base"
                  >
                    Intellectual Property Rights
                  </Link>
                  <Link
                    href="/terms/shipping-policy"
                    className="text-white text-base"
                  >
                    Shipping Policy
                  </Link>
                  <Link
                    href="/terms/terms-of-service"
                    className="text-white text-base"
                  >
                    Terms of service
                  </Link>
                  <Link
                    href="/terms/privacy-policy"
                    className="text-white text-base"
                  >
                    Privacy policy
                  </Link>
                  <Link href="/terms/warranty" className="text-white text-base">
                    Warranty
                  </Link>
                  <Link
                    href="/terms/refund-policy"
                    className="text-white text-base"
                  >
                    Refund policy
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-white text-2xl font-bold mb-4 font-merriweather">
                  Follow Us
                </div>
                <div className="flex justify-start items-center gap-4 mb-4">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61570952814126&mibextid=wwXIfr&mibextid=wwXIfr"
                    target="_blank"
                  >
                    <div className="w-[47px] h-[45px] bg-[url('/img/facebook.png')] bg-cover rounded-full" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/relaxureliving/"
                    target="_blank"
                  >
                    <div className="w-[47px] h-[45px] bg-[url('/img/insta.png')] bg-cover rounded-full" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@Relaxure-Pergola"
                    target="_blank"
                  >
                    <div className="w-[47px] h-[45px] bg-[url('/img/youtube.png')] bg-cover rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full border-t border-[#ffffff33] pt-4">
              <Link href="/" className="mb-2">
                <img className="w-28" src="/img/logo.svg" alt="Logo" />
              </Link>
              <div className="flex flex-row justify-start items-center gap-4 w-full mb-2">
                <span className="text-white text-base mb-1">
                  +1 (511) 123 - 4567
                </span>
                <a
                  href="mailto:info@relaxureliving.com"
                  className="text-white text-base mb-1"
                >
                  info@relaxureliving.com
                </a>
              </div>

              <div className="w-full text-white text-center text-xs opacity-80 mb-10">
                © 2025 Relaxure
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
