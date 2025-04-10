import React from "react"

export const ImageOnRight = (): JSX.Element => {
  return (
    <div className="w-full inline-flex flex-col h-[657px] items-center gap-10 relative">
      <div className="flex w-full h-[147px] items-center justify-center gap-2.5 relative">
        <p className="relative w-full font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          Your outdoor space, comfortable and usable in any season, any weather,
          any time.
        </p>
      </div>

      <div className="flex w-full h-[885px] items-start gap-[100px] relative mb-[-415.00px]">
        <div className="flex flex-col w-[592px] h-[470px] items-start gap-5 relative">
          <div className="flex w-[586px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
            <p className="w-[583px] ml-[-8.50px] mr-[-8.50px] relative mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              Transform your outdoor space into a designer-worthy environment
              that impresses guests and enhances your everyday enjoyment of your
              home.
            </p>
          </div>

          <div className="flex flex-col w-[586px] h-[349px] items-start gap-5 relative">
            <div className="flex flex-col w-[516px] items-start gap-2.5 p-5 relative flex-[0_0_auto] bg-[#f3f3f3] rounded-[20px]">
              <div className="inline-flex h-10 items-start gap-5 px-0 py-2.5 relative">
                <img
                  className="relative w-6 h-6 mb-[-4.00px]"
                  alt="Frame"
                  src="https://c.animaapp.com/9ZRP9Uof/img/frame-1000004940.svg"
                />

                <div className="relative w-fit mt-[-1.00px] mb-[-6.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px] whitespace-nowrap">
                  Sleek, contemporary design
                </div>
              </div>

              <div className="flex w-[476px] h-[41px] items-start gap-5 px-0 py-2.5 relative">
                <div className="relative w-6 h-6 mb-[-3.00px] bg-[url(https://c.animaapp.com/9ZRP9Uof/img/group@2x.png)] bg-[100%_100%]" />

                <p className="w-fit mb-[-5.00px] whitespace-nowrap relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px]">
                  Premium finishes (multiple color options)
                </p>
              </div>

              <div className="inline-flex h-10 items-start gap-5 px-0 py-2.5 relative self-stretch">
                <img
                  className="relative w-6 h-6 mb-[-4.00px]"
                  alt="Frame"
                  src="https://c.animaapp.com/9ZRP9Uof/img/frame-1000004945.svg"
                />

                <p className="relative w-fit mt-[-1.00px] mb-[-6.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px] whitespace-nowrap">
                  Hidden fastener system for clean lines
                </p>
              </div>
            </div>
          </div>
        </div>

        <img
          className="relative w-[653px] h-[470px] mr-[-6.00px] object-cover"
          alt="Rectangle"
          src="https://c.animaapp.com/9ZRP9Uof/img/rectangle-1271.svg"
        />
      </div>
    </div>
  )
}
