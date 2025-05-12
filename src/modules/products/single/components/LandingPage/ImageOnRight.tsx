import React from "react"

export const ImageOnRight = (): JSX.Element => {
  return (
    <div className="w-full inline-flex flex-col items-center gap-10 relative mt-10">
      <div className="flex w-full items-center justify-center gap-2.5 relative">
        <p className="relative w-full font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          Your outdoor space, comfortable and usable in any season, any weather,
          any time.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full items-center gap-10 relative px-4">
        <div className="flex flex-col w-full lg:w-1/2 items-start justify-center gap-5 relative">
          <div className="flex flex-col w-full items-start gap-5 relative">
            <div className="flex w-full items-center justify-center gap-2.5 p-2.5 relative">
              <p className="w-full font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                Transform your outdoor space into a designer-worthy environment
                that impresses guests and enhances your everyday enjoyment of
                your home.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 relative self-stretch w-full">
              <div className="flex flex-col items-start gap-2.5 p-5 relative self-stretch bg-[#f3f3f3] rounded-[20px]">
                <div className="inline-flex items-center gap-5 p-2.5 relative self-stretch">
                  <img
                    className="relative w-6 h-6"
                    alt="Frame"
                    src="https://c.animaapp.com/9ZRP9Uof/img/frame-1000004940.svg"
                  />
                  <p className="relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px] whitespace-normal">
                    Sleek, contemporary design
                  </p>
                </div>

                <div className="inline-flex items-center gap-5 p-2.5 relative self-stretch">
                  <div className="relative w-6 h-6 bg-cover bg-[url(https://c.animaapp.com/9ZRP9Uof/img/group@2x.png)] bg-[100%_100%]" />
                  <p className="relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px] whitespace-normal">
                    Premium finishes (multiple color options)
                  </p>
                </div>

                <div className="inline-flex items-center gap-5 p-2.5 relative self-stretch">
                  <img
                    className="relative w-6 h-6"
                    alt="Frame"
                    src="https://c.animaapp.com/9ZRP9Uof/img/frame-1000004945.svg"
                  />
                  <p className="relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px] whitespace-normal">
                    Hidden fastener system for clean lines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 items-center justify-center gap-5 relative">
          <img
            className="relative h-full w-full object-cover rounded-[20px]"
            alt="Rectangle"
            src="https://c.animaapp.com/9ZRP9Uof/img/rectangle-1271.svg"
          />
        </div>
      </div>
    </div>
  )
}
