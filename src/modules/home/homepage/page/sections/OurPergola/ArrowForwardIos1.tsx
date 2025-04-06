import React from "react"

interface Props {
  className: any
}

export const ArrowForwardIos1 = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8867 3.77L16.1167 2L6.11672 12L16.1167 22L17.8867 20.23L9.65672 12L17.8867 3.77Z"
        fill="white"
        fillOpacity="0.45"
      />
    </svg>
  )
}
