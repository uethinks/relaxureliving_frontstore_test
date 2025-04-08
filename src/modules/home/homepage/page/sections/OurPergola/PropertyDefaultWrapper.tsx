import React from "react"

interface Props {
  className: string
  progressClass: string
}

export const PropertyDefaultWrapper = ({
  className,
  progressClass,
}: Props): JSX.Element => {
  return (
    <div className={`w-[556px] h-1 rounded-sm bg-[#d9d9d9] ${className}`}>
      <div className={`h-1 rounded-sm bg-[#072f6c] ${progressClass}`} />
    </div>
  )
}
