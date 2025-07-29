"use client"
import React from "react"
interface Props {
  text: string
  onClick?: () => void
}

export const Component = ({
  text = "Get started",
  onClick,
}: Props): JSX.Element => {
  return (
    <button
      className={`all-[unset] box-border hover:bg-[#fdce6f] bg-[#F6AF1F] w-[200px] flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative`}
      onClick={onClick}
    >
      <span
        className={`
          all-[unset] box-border [font-family:'Montserrat',Helvetica] 
          w-fit tracking-[0] text-base text-black font-medium 
          leading-6 whitespace-nowrap relative
        `}
      >
        {text}
      </span>
    </button>
  )
}
