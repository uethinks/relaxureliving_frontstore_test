import React, { useEffect, useState } from "react"
import { Button } from "./Button"
import { FloatImage } from "./FloatImage"
import { PropertyDefaultWrapper } from "./PropertyDefaultWrapper"
import Link from "next/link"
import { OurPergolaProps, UsageScenario } from "types/global"
type pergolaScenario = { show: boolean } & UsageScenario
export const OurPergola = ({
  pergola,
}: {
  pergola: OurPergolaProps | null
}): JSX.Element => {
  const [usageScenarios, setUsageScenarios] = useState<pergolaScenario[]>([])
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  useEffect(() => {
    const scenarios = pergola?.UsageScenarios.map((scenario, index) => ({
      ...scenario,
      show: index === 0,
    }))
    setUsageScenarios(scenarios || [])
  }, [pergola])
  const sliderChange = () => {
    const currentIndex =
      usageScenarios.findIndex((item) => item.show === true) ?? 0
    const nextIndex = (currentIndex + 1) % (usageScenarios.length ?? 1)
    setUsageScenarios(
      usageScenarios.map((scenario, index) => ({
        ...scenario,
        show: index === nextIndex,
      }))
    )
  }
  useEffect(() => {
    const interval = setInterval(() => {
      sliderChange()
    }, 8000)
    return () => clearInterval(interval)
  }, [sliderChange])
  return (
    <>
      <div className="flex flex-col w-full items-center gap-2.5 relative">
        <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative w-full mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            How Will You Experience Relaxure?
          </p>
        </div>

        <div className="justify-center flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative w-full lg:w-2/5 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[18px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] text-center tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
            Every homeowner has unique priorities. Discover how Relaxure
            enhances your specific outdoor lifestyle
          </p>
        </div>
      </div>
      <div
        id="pergola"
        className="flex flex-wrap w-full items-center justify-center gap-[60px_60px] p-4 lg:p-10 relative bg-[#f3f3f3] rounded-[20px]"
      >
        <div className="flex flex-col lg:flex-row w-full items-center gap-[60px] relative mt-[-1.50px] mb-[-1.50px] ml-[-1.00px] mr-[-1.00px]">
          <div className="flex flex-col w-full lg:w-2/5  lg:h-[650px] items-center lg:items-start justify-center gap-[30px] px-0 py-4 relative">
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full">
                <p className="text-center lg:text-left relative flex-1 mt-[-6.00px] mb-[-4.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] tetx-[18px] lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                  {pergola?.SubTitle}
                </p>
              </div>

              <div className="flex w-full items-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
                <p className="text-center lg:text-left relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                  {pergola?.Description}
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
          {usageScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`relative w-full lg:w-3/5 overflow-hidden ${
                scenario.show ? "block" : "hidden"
              }`}
            >
              <div className="">
                <div className="relative ">
                  <div className="relative flex flex-col items-center pb-[50px]">
                    <PropertyDefaultWrapper
                      className="absolute w-4/5 h-1 rounded-sm bg-[#d9d9d9] top-5"
                      progressClass={scenario.show ? "animate-progress" : "w-1"}
                    />
                    <img
                      className="rounded-[20px]"
                      alt="Rectangle"
                      src={strapiUrl + scenario.LargeImage.formats.large.url}
                    />
                    <FloatImage
                      className="!absolute left-[20px] lg:left-[66px] -bottom-[30px] animate-diagonal"
                      rectangle={
                        strapiUrl + scenario.SmallImage.formats.small.url
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
