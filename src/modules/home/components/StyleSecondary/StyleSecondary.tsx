import React from "react"

interface Props {
  text: string
}

export const StyleSecondary = ({ text = "Button" }: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 relative bg-[#000000] !rounded-[10px] !mr-[-1.00px] !mt-[-1.00px] !mb-[-1.00px] !flex-[0_0_auto]`}
    >
      <div
        className={`relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] 
          text-semantic-text-alternate text-[length:var(--text-regular-normal-font-size)] whitespace-nowrap 
          !text-[#ffffff] !tracking-[0] !text-base ![font-style:unset] !leading-6`}
      >
        {text}
      </div>
    </div>
  )
}
