import React from "react"

interface Props {
  property1: "variant-2" | "default"
  className: any
}

export const PropertyDefaultWrapper = ({
  property1,
  className,
}: Props): JSX.Element => {
  return (
    <div className={`w-[556px] h-1 rounded-sm bg-[#d9d9d9] ${className}`}>
      <div
        className={`h-1 rounded-sm bg-[#072f6c] ${
          property1 === "default" ? "w-1" : ""
        }`}
      />
    </div>
  )
}
