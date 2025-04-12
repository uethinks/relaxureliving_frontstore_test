import React from "react"

export const ImageOnLeft = (): JSX.Element => {
  return (
    <div className="w-full inline-flex flex-col items-center gap-10 relative">
      <div className="flex w-full items-center justify-center gap-2.5 relative">
        <p className="relative w-full font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[24px] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          Your outdoor space, comfortable and usable in any season, any weather,
          any time.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full items-center gap-[100px] relative px-4">
        <div className="flex flex-col w-full lg:w-1/2 items-center justify-center gap-5 relative mr-[-6.00px]">
          <img
            className="relative h-full w-full object-cover rounded-[20px]"
            alt="Rectangle"
            src="https://c.animaapp.com/xZorZhSb/img/rectangle-1271.svg"
          />
          <div className="flex flex-col justify-center w-[90%] absolute bottom-4 left-4 gap-4">
            <div className="flex w-full items-center gap-5 p-5 bg-[#ffffff8f] rounded-[20px] border border-solid border-[#ffffff85] backdrop-blur-[9.9px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(9.9px)_brightness(100%)]">
              <div className="relative w-[30px] h-[30px] bg-cover bg-[url(https://c.animaapp.com/xZorZhSb/img/calendar-check@2x.png)] bg-[100%_100%]" />

              <div className="flex flex-col w-4/5 items-start justify-center gap-2.5 pl-0 pr-2.5 py-0 relative">
                <div className="flex w-[118px] items-center gap-2.5 relative flex-[0_0_auto]">
                  <div className="flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-[22px] leading-[30.8px] relative tracking-[0]">
                    185 Days
                  </div>
                </div>

                <div className="flex w-full h-[30px] items-center justify-center gap-2.5 relative mr-[-310.00px]">
                  <p className="flex-1 font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                    Average additional use of their outdoor space
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-5 p-5 bg-[#ffffff8f] rounded-[20px] border border-solid border-[#ffffff85] backdrop-blur-[9.9px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(9.9px)_brightness(100%)]">
              <img
                className="relative w-[30px] h-[30px] bg-cover"
                alt="Frame"
                src="https://c.animaapp.com/xZorZhSb/img/frame-1000004929.svg"
              />
              <div className="flex flex-col w-4/5 items-start justify-center gap-2.5 pl-0 pr-2.5 py-0 relative mr-[-6.00px]">
                <div className="flex w-[118px] items-center gap-2.5 relative flex-[0_0_auto]">
                  <div className="flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-semibold text-[#343a40] text-[22px] leading-[30.8px] relative tracking-[0]">
                    130 MPH
                  </div>
                </div>

                <div className="flex h-[30px] items-center gap-2.5 relative self-stretch w-full">
                  <p className="relative w-fit font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] whitespace-nowrap [font-style:var(--relaxure-sub-heading-18-font-style)]">
                    comfortable range for outdoor use
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 items-start justify-center gap-5 relative mr-[-6.00px]">
          <div className="flex flex-col w-full  items-start gap-5 relative">
            <div className="flex flex-col  items-start gap-2.5 px-0 py-2.5 relative self-stretch w-full">
              <div className="flex flex-col items-start justify-center gap-[30px] relative self-stretch w-full">
                <div className="flex w-full items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                  <p className="w-full mt-[-1.00px] ml-[-8.50px] mr-[-8.50px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                    Extend your living space beyond the walls of your home with
                    a versatile outdoor structure that provides comfort in every
                    season—from summer shade to shelter during light rain or
                    cooler evenings.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
                    <p className="w-[428px] mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-[22px] leading-[30.8px] relative tracking-[0]">
                      With Relaxure Corsica, your get:
                    </p>
                  </div>

                  <div className="flex flex-col h-[170px] items-start gap-[85px] relative self-stretch w-full">
                    <div className="inline-flex flex-col items-start justify-center gap-2.5 relative flex-[0_0_auto]">
                      <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                        <div className="relative w-[30px] h-[30px] bg-cover bg-[url(https://c.animaapp.com/xZorZhSb/img/group-2@2x.png)] bg-[100%_100%]" />

                        <p className="relative w-fit font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] whitespace-nowrap [font-style:var(--relaxure-sub-heading-18-font-style)]">
                          Optional side screens for sunshine, wind, and privacy
                        </p>
                      </div>

                      <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                        <div className="relative w-[30px] h-[30px] bg-cover bg-[url(https://c.animaapp.com/xZorZhSb/img/group-2@2x.png)] bg-[100%_100%]" />

                        <p className="relative w-fit font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] whitespace-nowrap [font-style:var(--relaxure-sub-heading-18-font-style)]">
                          Rain sensor with automatic response
                        </p>
                      </div>

                      <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                        <div className="relative w-[30px] h-[30px] bg-cover bg-[url(https://c.animaapp.com/xZorZhSb/img/group-2@2x.png)] bg-[100%_100%]" />

                        <p className="relative w-fit font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] whitespace-nowrap [font-style:var(--relaxure-sub-heading-18-font-style)]">
                          Integrated LED lighting for extended evening use
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
