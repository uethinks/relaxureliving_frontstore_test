/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types"
import React from "react"

interface Props {
  className: any
  divClassName: any
  text: string
}

export const StyleSecondary = ({
  className,
  divClassName,
  text = "Button",
}: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 relative border border-solid border-[color:var(--primitive-color-neutral-white)] ${className}`}
    >
      <div
        className={`relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-semantic-text-alternate text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)] ${divClassName}`}
      >
        {text}
      </div>
    </div>
  )
}

StyleSecondary.propTypes = {
  text: PropTypes.string,
}
