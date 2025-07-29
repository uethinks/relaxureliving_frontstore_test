"use client"
import React, { useState } from "react"

interface Props {
  readonly name: string
  readonly content: string
}

export const TermsAndConditions = ({ name, content }: Props): JSX.Element => {
  const [show, setShow] = useState(true)

  if (!show) {
    return <></>
  }

  return (
    <div className="bg-[#00000080] flex justify-center items-center w-full h-full absolute top-0 left-0">
      <div className="flex flex-col w-[547px] items-center justify-center gap-5 p-5 relative bg-[#ffffff] rounded-[20px]">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="flex items-center justify-end gap-5 relative self-stretch w-full flex-[0_0_auto]">
          <button
            onClick={() => setShow(false)}
            className={`all-[unset] box-border w-full flex items-center gap-2 
              shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center 
              relative bg-[#072f6c] self-stretch flex-[0_0_auto]`}
          >
            <div
              className={`all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit 
              tracking-[0] text-base text-[#ffffff] relative font-medium whitespace-nowrap leading-6`}
            >
              Close
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
