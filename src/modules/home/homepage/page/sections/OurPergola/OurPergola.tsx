import React from "react"
import { Button } from "./Button"
import { FloatImage } from "./FloatImage"
import { PropertyDefaultWrapper } from "./PropertyDefaultWrapper"
import { ArrowForwardIos1 } from "./ArrowForwardIos1"
import { ArrowForwardIos4 } from "./ArrowForwardIos4"
import Link from "next/link"

export const OurPergola = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col w-[1355px] items-center gap-2.5 relative">
        <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative w-[1346px] mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            How Will You Experience Relaxure?
          </p>
        </div>

        <div className="justify-center flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative w-[710px] mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] text-center tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
            Every homeowner has unique priorities. Discover how Relaxure
            enhances your specific outdoor lifestyle
          </p>
        </div>
      </div>
      <div
        id="pergola"
        className="flex flex-wrap w-[1352px] h-[817px] items-center justify-center gap-[60px_60px] p-10 relative bg-[#f3f3f3] rounded-[20px]"
      >
        <div className="flex w-[1274px] items-center gap-[60px] relative mt-[-1.50px] mb-[-1.50px] ml-[-1.00px] mr-[-1.00px]">
          <div className="flex flex-col w-[501px] h-[600px] items-start justify-center gap-[30px] px-0 py-4 relative">
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex h-[110px] items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full">
                <p className="relative flex-1 mt-[-6.00px] mb-[-4.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                  Premium Quality, Without the Premium Price
                </p>
              </div>

              <div className="flex w-[489px] items-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
                <p className="relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                  Get commercial-grade durability and smart features at a
                  fraction of what other premium pergolas cost. Transform your
                  outdoor space into valuable living area that adds up to 185
                  more usable days per year while enhancing your property value.
                </p>
              </div>
            </div>

            <Link href="/us/products/pergola">
              <Button
                className="!flex-[0_0_auto] !inline-flex !w-[unset]"
                property1="primary-button-l"
                text="Learn More About Value"
              />
            </Link>
          </div>

          <div className="relative w-[713px] h-[740px] overflow-hidden">
            <div className="absolute w-[713px] h-[740px] top-0 left-0">
              <div className="relative w-[653px] h-[708px] left-[60px]">
                <img
                  className="absolute w-[653px] h-[600px] top-0 left-0"
                  alt="Rectangle"
                  src="https://c.animaapp.com/m95uxn82DoG69O/img/rectangle-1271-6.svg"
                />

                <FloatImage
                  className="!absolute !left-[66px] !top-[410px]"
                  property1="default"
                  rectangle="https://c.animaapp.com/m95uxn82DoG69O/img/rectangle-1273-6.svg"
                />
                <PropertyDefaultWrapper
                  className="!absolute !left-12 !top-10"
                  property1="default"
                />
              </div>
            </div>

            <div className="absolute w-[765px] h-[740px] top-0 left-[805px]">
              <img
                className="absolute w-[600px] h-[600px] top-[2850px] left-[-53511px] object-cover"
                alt="Rectangle"
                src="https://c.animaapp.com/m95uxn82DoG69O/img/rectangle-1271.svg"
              />

              <div className="absolute w-[270px] h-[298px] top-[410px] left-[126px]">
                <div className="absolute w-[253px] h-[275px] top-[21px] left-0 bg-white rounded-[20px]">
                  <div className="flex w-[233px] items-center gap-2.5 relative top-[218px] left-[13px]">
                    <p className="relative flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] leading-[25.2px]">
                      A pergola for every occasion
                    </p>
                  </div>
                </div>

                <img
                  className="absolute w-[231px] h-[191px] top-[2440px] left-[-53637px] object-cover"
                  alt="Rectangle"
                  src="https://c.animaapp.com/m95uxn82DoG69O/img/rectangle-1273.svg"
                />
              </div>

              <div className="flex w-[524px] items-center justify-between absolute top-[264px] left-[98px]">
                <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)] shadow-blur-relaxure">
                  <ArrowForwardIos1 className="!ml-[-53615.00px] !relative !w-6 !h-6 !mb-[-2580.50px]" />
                </div>

                <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)] shadow-blur-relaxure">
                  <ArrowForwardIos4 className="!ml-[-54103.00px] !relative !w-6 !h-6 !mb-[-2580.50px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
