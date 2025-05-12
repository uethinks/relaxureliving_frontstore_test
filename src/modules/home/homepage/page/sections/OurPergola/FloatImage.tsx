import React from "react"

interface Props {
  className: any
  rectangle: string
}

export const FloatImage = ({
  className,
  rectangle = "https://c.animaapp.com/m95uxn82DoG69O/img/rectangle-1273.svg",
}: Props): JSX.Element => {
  return (
    <div className={`w-[150px] xl:w-[270px] xl:h-[298px] ${className}`}>
      <div
        className={`w-full xl:w-[253px] xl:h-[275px] rounded-[20px] bg-white relative flex flex-col items-center justify-center p-2`}
      >
        <img
          className="w-full xl:w-[231px] object-cover xl:h-[191px] rounded-[20px]"
          alt="Rectangle"
          src={rectangle}
        />

        <div className="w-full mt-2.5 xl:w-[233px] flex items-center gap-2.5">
          <p className="[font-family:'Merriweather',Helvetica] mt-[-1.00px] tracking-[0] text-lg flex-1 text-[#343a40] font-bold leading-[25.2px] relative">
            A pergola for every occasion
          </p>
        </div>
      </div>
    </div>
  )
}
