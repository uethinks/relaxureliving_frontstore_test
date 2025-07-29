"use client"
import React, { useState } from "react"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { PergolaData } from "@/types/global"

export const OneHundredDayRiskFreeTrial = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}) => {
  const trial = pergolaData.one_hundred_day_risk_free_trial
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  if (!trial) {
    return null
  }

  const handleClick = () => {
    setIsPopupOpen(true)
  }

  const handleClose = () => {
    setIsPopupOpen(false)
  }

  return (
    <>
      <div className="flex flex-col w-full rounded-[20px] items-center justify-center px-8 py-6 relative bg-[#f3f3f3] mt-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
          <div className="flex justify-center items-center gap-3">
            <span className="text-[24px] lg:text-[36px] font-bold font-merriweather text-[#343a40]">
              {trial.Title}
            </span>
          </div>
          <div className="prose max-w-none text-[#68717a]">
            <BlocksRenderer content={trial.short_description} />
          </div>
          {trial.button && (
            <button
              onClick={handleClick}
              className={`all-[unset] w-fit hover:bg-[#0a3980] bg-[#072f6c] box-border 
                flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] 
                justify-center relative`}
            >
              <p
                className={`all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] 
                  text-16 text-[color:var(--semantic-border-alternate)] font-medium leading-6 whitespace-nowrap 
                  relative`}
              >
                {trial.button}
              </p>
            </button>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl p-6 lg:max-w-2xl h-[90vh] overflow-y-scroll mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="prose max-w-none mt-4">
              <BlocksRenderer content={trial.popup_content} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
