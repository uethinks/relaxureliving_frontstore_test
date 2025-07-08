"use client"
import React, { useState } from "react"

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

// 箭头icon
const ArrowRight = ({ color = "#072F6C" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M7 5l5 5-5 5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const FaqWrapper = ({ faq }: { faq: FAQData }): JSX.Element | null => {
  // 桌面端状态
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [openQuestionIndex, setOpenQuestionIndex] = useState(-1)
  // 移动端状态
  const [openQuestion, setOpenQuestion] = useState<{
    level1: number
    level2: number
  }>({ level1: -1, level2: -1 })

  if (!faq?.homepageFAQ.length) return null

  return (
    <div
      id="faqs"
      className="flex flex-col w-full items-center justify-center min-h-[700px] bg-[#f3f3f3] py-16"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <h2 className="text-[#343a40] font-merriweather text-[32px] font-bold text-center mb-12 leading-[40px]">
          {faq.Subtitle}
        </h2>
        {/* 桌面端布局 */}
        <div
          className="hidden font-[500] lg:flex flex-row justify-between w-full rounded-[24px] overflow-visible"
          style={{ background: "#f3f3f3" }}
        >
          {/* 左侧菜单 */}
          <div className="w-[30%] flex flex-col bg-[#f3f3f3] py-2 pr-0">
            {faq.homepageFAQ.map((category, idx) => (
              <div
                key={category.id}
                className={`flex items-center text-[18px] leading-[28px] justify-between pl-8 pr-2 py-5 cursor-pointer select-none transition-all duration-150 rounded-[10px] relative ${
                  selectedCategoryIndex === idx
                    ? "bg-[#DCE7F8] text-[#072F6C] border-[1px] border-[#072F6C]"
                    : "text-[#343A40]"
                }`}
                onClick={() => {
                  setSelectedCategoryIndex(idx)
                  setOpenQuestionIndex(-1)
                }}
              >
                <h3 className="font-montserrat">{category.Title}</h3>
                <span
                  className={`ml-2 transition-transform duration-300 ${
                    selectedCategoryIndex === idx ? "rotate-90" : "rotate-0"
                  }`}
                >
                  <ArrowRight color="#072F6C" />
                </span>
              </div>
            ))}
          </div>
          {/* 右侧内容区 */}
          <div className="flex-1 flex flex-col py-2 pl-10 gap-4 bg-[#f3f3f3]">
            {faq.homepageFAQ[selectedCategoryIndex].question_and_answer.map(
              (answer, idx) => {
                const isOpen = openQuestionIndex === idx
                return (
                  <div key={answer.id} className="w-full">
                    <div
                      className={`rounded-[10px] border border-[#C9C9C9] bg-[#f3f3f3] transition-all duration-300 mb-4`}
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer min-h-[56px] px-6 py-3"
                        onClick={() =>
                          setOpenQuestionIndex(
                            openQuestionIndex === idx ? -1 : idx
                          )
                        }
                      >
                        <span className="text-[18px] leading-[28px] font-montserrat text-[#343A40]">
                          {answer.question}
                        </span>
                        <span
                          className={`text-[28px] text-[#072F6C] select-none transition-transform duration-300 ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                          style={{
                            width: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          +
                        </span>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-1000 ${
                          isOpen
                            ? "max-h-[500px] opacity-100 py-4 px-6"
                            : "max-h-0 opacity-0 py-0 px-6"
                        }`}
                      >
                        <div className="text-[#69727A] text-[18px] leading-[28px] font-montserrat">
                          {answer.Answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </div>
        {/* 移动端：原有手风琴结构 */}
        <div className="block lg:hidden w-full">
          <div className="relative w-full flex flex-col items-center px-5 font-[500]">
            {faq.homepageFAQ.map((category, indexLevel1) => (
              <div
                key={category.id}
                className="flex flex-col items-center w-full rounded-[20px] overflow-hidden px-4"
              >
                <div className="flex flex-row items-center gap-2.5 w-full pe-5 mb-4">
                  <div
                    className={`flex-1 text-lg leading-[21.6px] relative [font-family:'Montserrat',Helvetica] tracking-[0] cursor-pointer flex items-center justify-between px-4 py-4 rounded-[10px] transition-all duration-150 ${
                      openQuestion.level1 === indexLevel1
                        ? "bg-[#DCE7F8] text-[#072F6C] border-[1px] border-[#072F6C]"
                        : "text-[#343A40]"
                    } `}
                    onClick={() =>
                      setOpenQuestion((prev) => ({
                        level1: prev.level1 === indexLevel1 ? -1 : indexLevel1,
                        level2: 0,
                      }))
                    }
                  >
                    {category.Title}
                    <span
                      className={`ml-2 text-[20px] text-[#072F6C] transition-transform duration-300 ${
                        openQuestion.level1 === indexLevel1
                          ? "rotate-90"
                          : "rotate-0"
                      }`}
                    >
                      <ArrowRight color="#072F6C" />
                    </span>
                  </div>
                </div>
                <div className="w-full transition-all duration-300 ease-in-out">
                  {openQuestion.level1 === indexLevel1 &&
                    category.question_and_answer.map((answer, indexLevel2) => {
                      const isOpen = openQuestion.level2 === indexLevel2
                      return (
                        <div key={answer.id} className="w-full">
                          <div
                            className={`rounded-[16px] border border-[#e5e7eb] bg-[#f3f3f3] transition-all duration-200 mb-4`}
                          >
                            <div
                              className="flex items-center justify-between cursor-pointer min-h-[56px] px-6 py-3"
                              onClick={() =>
                                setOpenQuestion((prev) => ({
                                  level1: indexLevel1,
                                  level2:
                                    prev.level2 === indexLevel2
                                      ? -1
                                      : indexLevel2,
                                }))
                              }
                            >
                              <span className="text-base leading-[28px] font-montserrat text-[#343A40]">
                                {answer.question}
                              </span>
                              <span
                                className={`text-[28px] text-[#072F6C] select-none transition-transform duration-300 ${
                                  isOpen ? "rotate-45" : "rotate-0"
                                }`}
                                style={{
                                  width: 32,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                +
                              </span>
                            </div>
                            <div
                              className={`overflow-hidden transition-all duration-1000 ${
                                isOpen
                                  ? "max-h-[500px] opacity-100 py-4 px-6"
                                  : "max-h-0 opacity-0 py-0 px-6"
                              }`}
                            >
                              <div className="text-[#595c5f] text-[18px] leading-[28px] font-montserrat">
                                {answer.Answer}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
