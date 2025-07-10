"use client"
import React from "react"
import { StyleSecondary } from "../../../../components/StyleSecondary"
import Link from "next/link"

interface HeroButtonsProps {
  leftButton: string
  rightButton: string
}

export const HeroButtons = ({
  leftButton,
  rightButton,
}: HeroButtonsProps): JSX.Element => {
  return (
    <div className="inline-flex flex-col md:flex-row items-start justify-end gap-5 relative flex-[0_0_auto]">
      <Link href="/products/pergola">
        <div className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] bg-[#F6AF1F] rounded-[10px]">
          <button className="all-[unset] box-border relative w-fit [font-family:'Montserrat',Helvetica] font-normal text-black text-base tracking-[0] leading-6 whitespace-normal">
            {leftButton}
          </button>
        </div>
      </Link>
      <button onClick={() => (window as any).tidioChatApi?.open()}>
        <StyleSecondary
          className="bg-[#000000] !rounded-[10px] !mr-[-1.00px] !mt-[-1.00px] !mb-[-1.00px] !flex-[0_0_auto]"
          divClassName="!text-[#ffffff] !tracking-[0] !text-base ![font-style:unset] !font-normal ![font-family:'Roboto',Helvetica] !leading-6"
          text={rightButton}
        />
      </button>
    </div>
  )
}
