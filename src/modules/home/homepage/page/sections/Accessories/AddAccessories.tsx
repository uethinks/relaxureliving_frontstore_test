"use client"
import React from "react"

interface Props {
  property1: "primary-button-hover-l" | "primary-button-l"
  className?: string
  text: string
}

export const AddAccessories = ({
  property1,
  className,
  text = "Get started",
}: Props): JSX.Element => {
  return (
    <button
      className={`
        all-[unset] hover:bg-[#fdce6f] bg-[#F6AF1F] box-border 
        flex items-center gap-2 shadow-shadow-relaxure-button 
        px-6 py-3 rounded-[10px] justify-center relative ${className}
      `}
    >
      <span className="[font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-black font-medium leading-6 whitespace-nowrap relative">
        {text}
      </span>
    </button>
  )
}
