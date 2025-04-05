"use client"
import React, { useState } from "react"
import { Component } from "../../../../components/Component"
import { PergolaSliders } from "../../../../components/PergolaSliders"
import { OurPergolaProps, UsageScenario } from "types/global"
import Link from "next/link"

export const OurPergola = ({
  pergola,
}: {
  pergola: OurPergolaProps | null
}): JSX.Element => {
  const [selectedScenario, setSelectedScenario] =
    useState<UsageScenario | null>(null)
  const selectScenario = (scenario: UsageScenario) => {
    setSelectedScenario(scenario)
  }
  return (
    <div
      id="pergola"
      className="h-[794px] justify-center gap-[60px_60px] p-10 self-stretch w-full bg-[#f3f3f3] rounded-[20px] flex items-center relative"
    >
      <div className="flex flex-col h-[600px] items-start justify-center gap-[30px] px-0 py-4 relative flex-1 grow">
        <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
          <div className="flex w-[125px] h-[41px] items-center justify-center gap-2.5 p-2.5 relative bg-[#072f6c] rounded-[30px] border border-solid border-[#a8a8a8]">
            <div className="w-fit mt-[-4.00px] mb-[-2.00px] ml-[-2.50px] mr-[-2.50px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
              {pergola?.Title}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="h-[110px] items-center px-0 py-2.5 relative self-stretch w-full flex gap-2.5">
            <p className="flex-1 mt-[-31.00px] mb-[-29.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
              {pergola?.SubTitle}
            </p>
          </div>

          <div className="flex w-[489px] items-center px-0 py-2.5 flex-[0_0_auto] gap-2.5 relative">
            <p className="relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              {pergola?.Description}
            </p>
          </div>
        </div>

        <Link href="/us/products/pergola">
          <Component
            buttonClassName="!mr-[-8.00px] !ml-[-8.00px]"
            className="!flex-[0_0_auto]"
            property1="primary-button-l"
            text="Choose your pergola"
          />
        </Link>
      </div>

      <PergolaSliders
        usageScenarios={pergola?.UsageScenarios ?? []}
        selectedScenario={selectedScenario}
      />
      <div
        className="inline-flex absolute top-[33px] items-start gap-5"
        style={{ right: "5%" }}
      >
        {pergola?.UsageScenarios.map((scenario) => (
          <button
            onClick={() => selectScenario(scenario)}
            key={scenario.ScenarioName}
            className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[27.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]"
          >
            <div className="cursor-pointer w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
              {scenario.ScenarioName}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
