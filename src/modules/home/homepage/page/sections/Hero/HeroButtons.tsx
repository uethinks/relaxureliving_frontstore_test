"use client"
import React from "react"
import { StyleSecondary } from "../../../../components/StyleSecondary"
import Link from "next/link"

declare global {
  interface Window {
    GorgiasChat: {
      open: () => void
    }
  }
}

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
      <Link href="/us/products/pergola">
        <div className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] bg-[#072f6c] rounded-[10px]">
          <button className="all-[unset] box-border relative w-fit [font-family:'Montserrat',Helvetica] font-normal text-[color:var(--semantic-border-alternate)] text-base tracking-[0] leading-6 whitespace-normal">
            {leftButton}
          </button>
        </div>
      </Link>
      <button onClick={() => window.GorgiasChat.open()}>
        <StyleSecondary
          className="!border-[#ffffff] !rounded-[10px] !mr-[-1.00px] !mt-[-1.00px] !mb-[-1.00px] !flex-[0_0_auto]"
          divClassName="!text-[#ffffff] !tracking-[0] !text-base ![font-style:unset] !font-normal ![font-family:'Roboto',Helvetica] !leading-6"
          text={rightButton}
        />
      </button>
    </div>
  )
}
