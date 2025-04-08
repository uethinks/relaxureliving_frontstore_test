import React from "react"

interface Props {
  property1: "variant-2" | "default"
  className: any
  rectangle: string
}

export const FloatImage = ({
  property1,
  className,
  rectangle = "https://c.animaapp.com/m95uxn82DoG69O/img/rectangle-1273.svg",
}: Props): JSX.Element => {
  return (
    <div className={`w-[270px] h-[298px] ${className}`}>
      <div
        className={`w-[253px] h-[275px] rounded-[20px] bg-white relative ${
          property1 === "variant-2" ? "left-[7px]" : ""
        } ${property1 === "variant-2" ? "top-[18px]" : "top-[21px]"}`}
      >
        <img
          className="w-[231px] left-[11px] top-2.5 object-cover h-[191px] absolute rounded-[20px]"
          alt="Rectangle"
          src={rectangle}
        />

        <div className="w-[233px] flex left-[13px] items-center top-[218px] gap-2.5 absolute">
          <p className="[font-family:'Merriweather',Helvetica] mt-[-1.00px] tracking-[0] text-lg flex-1 text-[#343a40] font-bold leading-[25.2px] relative">
            A pergola for every occasion
          </p>
        </div>
      </div>
    </div>
  )
}
