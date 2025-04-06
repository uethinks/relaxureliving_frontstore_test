"use client"
import React, { useState } from "react"
import { IconChevronDown4 } from "../../../../icons/IconChevronDown4"

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

export const FaqWrapper = ({ faq }: { faq: FAQData }): JSX.Element | null => {
  const [openQuestion, setOpenQuestion] = useState<{
    level1: number
    level2: number
  }>({ level1: 0, level2: 0 })
  return faq?.homepageFAQ.length > 0 ? (
    <div className="flex flex-col w-full items-center justify-center gap-2.5 relative ml-[-80.00px] mr-[-80.00px] bg-[#f3f3f3]">
      <div className="flex flex-col w-full items-center gap-10 px-0 py-10 relative flex-[0_0_auto]">
        <div className="flex flex-col h-[143px] items-start relative self-stretch w-full">
          <div className="flex flex-col items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
              <div className="flex w-[125px] h-[41px] items-center justify-center p-2.5 bg-[#072f6c] rounded-[30px] gap-2.5 relative">
                <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                  {faq.Title}
                </div>
              </div>
            </div>
          </div>

          <div className="h-[179px] items-start justify-center px-0 py-10 relative self-stretch w-full mb-[-77.00px] flex gap-2.5">
            <div className="w-full mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] text-center leading-[var(--heading-2-line-height)] relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
              {faq.Subtitle}
            </div>
          </div>
        </div>

        <div className="relative w-full flex flex-col items-center gap-2.5">
          {faq.homepageFAQ.map((category, indexLevel1) => (
            <div
              key={category.id}
              className={`flex flex-col items-center w-4/5 rounded-[20px] overflow-hidden p-4 gap-6 ${
                openQuestion.level1 === indexLevel1 ? "bg-[#ffffff]" : ""
              }`}
            >
              <div className="flex flex-row items-start gap-2.5 w-full">
                <img
                  className="relative w-[18px] h-[18px]"
                  alt="Frame"
                  src="/img/frame-112.svg"
                />
                <div className="flex-1 font-semibold text-texttxt-primary text-lg leading-[21.6px] relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] tracking-[0]">
                  {category.Title}
                </div>
                <button
                  onClick={() =>
                    setOpenQuestion({ level1: indexLevel1, level2: 0 })
                  }
                  className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]"
                >
                  <IconChevronDown4
                    className="!relative !w-4 !h-4"
                    color="#072F6C"
                  />
                </button>
              </div>
              {category.question_and_answer.map((answer, indexLevel2) =>
                openQuestion.level1 === indexLevel1 ? (
                  <div
                    key={answer.id}
                    className="flex flex-col w-[90%] items-start gap-[4px]"
                  >
                    <div className="flex-[0_0_auto] flex items-start gap-2.5 relative self-stretch w-full">
                      <div className="flex h-6 items-center gap-4 relative flex-1 grow">
                        <div className="flex items-start relative flex-1 self-stretch grow">
                          <div className="flex-1 font-semibold text-texttxt-primary text-base leading-[21.6px] relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] tracking-[0]">
                            {answer.question}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setOpenQuestion({
                              level1: indexLevel1,
                              level2: indexLevel2,
                            })
                          }
                          className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]"
                        >
                          <IconChevronDown4
                            className="!relative !w-4 !h-4"
                            color="#072F6C"
                          />
                        </button>
                      </div>
                    </div>

                    {openQuestion.level1 === indexLevel1 &&
                    openQuestion.level2 === indexLevel2 ? (
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <p className="self-stretch font-normal text-texttxt-secondary text-base leading-[22.4px] relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] tracking-[0]">
                          {answer.Answer}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null
}
