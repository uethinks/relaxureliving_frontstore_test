"use client"
import React from "react"
import { StyleSecondary } from "@/modules/home/components/StyleSecondary"
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
      <Link href="/#sample-kit">
        <div className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] bg-[#072f6c] rounded-[10px]">
          <button
            className={`
            all-[unset] box-border relative w-fit [font-family:'Montserrat',Helvetica] 
            font-normal text-[color:var(--semantic-border-alternate)] text-base 
            tracking-[0] leading-6 whitespace-normal
          `}
          >
            {leftButton}
          </button>
        </div>
      </Link>
      <button onClick={() => (window as any).tidioChatApi?.open()}>
        <StyleSecondary text={rightButton} />
      </button>
    </div>
  )
}
