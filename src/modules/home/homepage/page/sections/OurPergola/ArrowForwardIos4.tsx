import React from "react"

interface Props {
  className: any
}

export const ArrowForwardIos4 = ({ className }: Props): JSX.Element => {
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
        d="M6.11328 20.23L7.88328 22L17.8833 12L7.88328 2L6.11328 3.77L14.3433 12L6.11328 20.23Z"
        fill="white"
        fillOpacity="0.8"
      />
    </svg>
  )
}
