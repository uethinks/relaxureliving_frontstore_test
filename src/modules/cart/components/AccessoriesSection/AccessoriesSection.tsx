"use client"
import { AccessoryCard } from "../AccessoryCard/AccessoryCard"
import { IconChevronDown } from "../../icons/IconChevronDown"
import { IconChevronRight2 } from "../../icons/IconChevronRight2"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import React, { useEffect, useState } from "react"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { FaqWrapper } from "@modules/home/homepage/page/sections/FaqWrapper"
interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}
export const AccessoriesSection = (): JSX.Element => {
  const [faq, setFaq] = useState<FAQData | null>(null)
  useEffect(() => {
    getHomePage().then(({ data }) => {
      setFaq(data.FAQ)
    })
  }, [])
  return (
    <div className="flex flex-col w-[1512px] items-start gap-[120px]">
      <div className="flex flex-col items-center justify-center gap-10 px-20 py-0 relative self-stretch w-full flex-[0_0_auto] mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[20px]">
        {/* <div className="flex-col justify-center gap-[30px] pt-10 pb-0 px-0 self-stretch w-full flex-[0_0_auto] flex items-start relative">
          <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[1346px] mt-[-1.00px] font-heading font-[number:var(--heading-font-weight)] text-[#343a40] text-[length:var(--heading-font-size)] leading-[var(--heading-line-height)] relative tracking-[var(--heading-letter-spacing)] [font-style:var(--heading-font-style)]">
                Add Accessories
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="inline-flex flex-wrap items-center gap-[107px_107px] relative flex-[0_0_auto]">
          <AccessoryCard
            frameClassName="bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-86.svg)]"
            property1="default"
          />
          <AccessoryCard
            frameClassName="bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-86-5.svg)]"
            property1="default"
          />
          <AccessoryCard property1="default" />
        </div> */}
        <div className="absolute w-[7px] h-[7px] top-[864px] left-[1402px] bg-[#e9e9e9] rounded-[3.5px] shadow-[inset_0px_1px_4px_#00000033]" />
      </div>
      <OurPromise />
      {/* FAQ */}
      {faq && <FaqWrapper faq={faq} />}
    </div>
  )
}
