import React from "react"

interface Props {
  text: string
  onClick?: () => void
}

export const Button = ({ text, onClick }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`w-full hover:bg-[#fdce6f] bg-[#F6AF1F] all-[unset] box-border flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative`}
    >
      <span className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-black relative font-medium whitespace-nowrap leading-6">
        {text}
      </span>
    </button>
  )
}
