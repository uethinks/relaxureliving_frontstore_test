import React from "react"
import { BoringStuff } from "./BoringStuff/BoringStuff"

export const OurPromise = (): JSX.Element => {
  return (
    <div className="inline-flex flex-col items-center justify-center gap-5 pt-20 pb-10 relative rounded-[20px] border border-solid border-transparent">
      <div className="w-full justify-center gap-[30px] px-0 py-4 flex flex-col items-center relative flex-[0_0_auto]">
        <div className="flex-col items-center gap-10 flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
            <div className="items-center justify-center gap-2.5 px-0 py-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative w-full lg:w-[896px] mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                The boring but important stuff
              </p>
            </div>

            <div className="items-center justify-center gap-2.5 px-0 py-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
              <p className="w-full lg:w-[974px] mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] text-center leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                Discover our premium pergolas designed to enhance your outdoor
                living experience. Crafted with quality materials, they provide
                both style and functionality for any backyard.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap justify-between lg:items-start items-center pt-10 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
            <BoringStuff
              className="!flex-[0_0_auto]"
              element="https://c.animaapp.com/bEMo3Gov/img/22-1@2x.png"
              october="https://c.animaapp.com/bEMo3Gov/img/october-1@2x.png"
              property1="build-the-last"
            />
            <BoringStuff
              className="!flex-[0_0_auto]"
              property1="delivery"
              subtract="https://c.animaapp.com/bEMo3Gov/img/subtract-1.svg"
            />
            <BoringStuff className="!flex-[0_0_auto]" property1="warranty" />
            <BoringStuff
              className="!flex-[0_0_auto]"
              img="https://c.animaapp.com/bEMo3Gov/img/vector-7-1.svg"
              property1="assembly"
              star="https://c.animaapp.com/bEMo3Gov/img/star-1-1.svg"
              vector="/img/image.svg"
              vector1="https://c.animaapp.com/bEMo3Gov/img/vector-14-1.svg"
              vector2="https://c.animaapp.com/bEMo3Gov/img/vector-1.svg"
              vectorClassName="!left-[-52808px] !top-[-3621px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
