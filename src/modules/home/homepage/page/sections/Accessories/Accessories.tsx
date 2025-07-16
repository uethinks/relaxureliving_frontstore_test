"use client"
import React, { useEffect, useState } from "react"
import { AddAccessories } from "./AddAccessories"
import { ImageText } from "./ImageText"
import Link from "next/link"
import { Accessories as AccessoriesType, AccessoriesSlider } from "types/global"

export const Accessories = ({
  accessories,
}: {
  accessories: AccessoriesType | null
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<AccessoriesSlider>()

  const handleOptionClick = (option: AccessoriesSlider) => {
    setSelectedOption(option)
  }

  // 根据accessory title映射到对应的路由
  const getAccessoryRoute = (title: string): string => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes("glass") || titleLower.includes("door")) {
      return "/accessories/glassdoor"
    } else if (
      titleLower.includes("heater") ||
      titleLower.includes("heating")
    ) {
      return "/accessories/heater"
    } else if (titleLower.includes("shade") || titleLower.includes("shading")) {
      return "/accessories/shades"
    }
    // 默认返回pergola页面
    return "/products/pergola"
  }

  useEffect(() => {
    setSelectedOption(accessories?.slider[0])
  }, [accessories])

  return (
    <div
      id="accessories"
      className="flex flex-col-reverse lg:flex-row w-full lg:h-[785px] items-center justify-center gap-2.5 py-0 relative bg-[#ffffff] rounded-[20px] border border-solid border-transparent"
    >
      <div className="flex w-full lg:w-3/5 justify-center gap-2.5 py-0 relative bg-[#ffffff] rounded-[20px] border border-solid border-transparent">
        {accessories?.slider?.map((item) => (
          <ImageText
            key={item.id}
            largeImage={item.largeImage?.formats?.large?.url}
            smallImage={item.smallImage?.formats?.small?.url}
            subTitle={item.subtitle}
            description={item.description}
            show={item.id === selectedOption?.id}
          />
        ))}
      </div>
      <div className="flex-col w-full lg:w-2/5 justify-center gap-[30px] px-0 self-stretch flex lg:items-start items-center  relative">
        <div className="inline-flex flex-col lg:h-[788px] items-start justify-center gap-10 px-5 py-0 relative">
          <div className="inline-flex flex-col items-center lg:items-start gap-5 lg:gap-[60px] relative flex-[0_0_auto]">
            <div className="inline-flex flex-col items-center lg:items-start gap-10 relative flex-[0_0_auto]">
              <div className="hidden lg:flex w-full justify-center lg:justify-start items-center gap-2.5 relative flex-[0_0_auto]">
                {accessories?.slider?.map((item) => (
                  <button
                    key={item.id}
                    className={`flex flex-col items-center justify-center gap-[10.47px] p-2.5 relative rounded-[44px] ${
                      selectedOption?.id === item.id
                        ? "bg-[#ffffff] border border-solid border-black shadow-shadow-cards-relaxure"
                        : "border border-solid border-[#e8e8ea]"
                    }`}
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="flex items-center justify-center gap-[13.09px] relative self-stretch w-full flex-[0_0_auto]">
                      <div
                        className={`relative flex-1 mt-[-1.31px] [font-family:'Montserrat',Helvetica] font-medium text-[16px] lg:text-[22px] text-center tracking-[0] leading-[30.8px] ${
                          selectedOption?.id === item.id
                            ? "text-black"
                            : "text-[#69727a]"
                        }`}
                      >
                        {item.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col w-full items-end gap-2.5 relative flex-[0_0_auto]">
                <div className="flex  items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <h2 className="text-center lg:text-left mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative flex-1 tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
                    {accessories?.Subtitle}
                  </h2>
                </div>

                <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="w-full mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                    {accessories?.Description}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={
                selectedOption
                  ? getAccessoryRoute(selectedOption.title)
                  : "/products/pergola"
              }
            >
              <AddAccessories
                className="!flex-[0_0_auto]"
                property1="primary-button-l"
                text="Add accessory"
              />
            </Link>
            <div className="flex lg:hidden w-full justify-center lg:justify-start items-center gap-2.5 relative flex-[0_0_auto]">
              {accessories?.slider?.map((item) => (
                <button
                  key={item.id}
                  className={`flex flex-col items-center justify-center gap-[10.47px] p-2.5 relative rounded-[44px] ${
                    selectedOption?.id === item.id
                      ? "bg-[#ffffff] border border-solid border-black shadow-shadow-cards-relaxure"
                      : "border border-solid border-[#e8e8ea]"
                  }`}
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="flex items-center justify-center gap-[13.09px] relative self-stretch w-full flex-[0_0_auto]">
                    <div
                      className={`relative flex-1 mt-[-1.31px] [font-family:'Montserrat',Helvetica] font-medium text-[16px] lg:text-[22px] text-center tracking-[0] leading-[30.8px] ${
                        selectedOption?.id === item.id
                          ? "text-black"
                          : "text-[#69727a]"
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
