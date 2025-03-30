import React from "react"

export const FrameWrapper = (): JSX.Element => {
  return (
    <div className="relative w-4/5">
      <div className="flex flex-col w-full items-center justify-center gap-2.5 p-10 relative">
        <div className="flex flex-col h-[711px] items-center justify-center gap-2.5 relative self-stretch w-full bg-[#ffffff]">
          <div className="flex flex-col w-4/5 items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <div className="w-4/5 items-center flex flex-col gap-2.5 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                <div className="inline-flex h-[41px] items-center justify-center p-2.5 bg-[#072f6c] rounded-[30px] gap-2.5 relative">
                  <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                    Testimonials
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
              <div className="w-fit mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] text-center leading-[var(--heading-2-line-height)] whitespace-nowrap relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
                What Our Customers Say
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
              <p className="w-fit mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] whitespace-nowrap relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                Real Experiences from Happy Customers
              </p>
            </div>
          </div>

          <div className="absolute w-32 h-32 top-0 left-[5%]">
            <img
              className="w-32 h-32 object-contain"
              alt="Ellipse"
              src="/img/ellipse-79-7.svg"
            />
          </div>

          <div className="absolute w-40 h-40 top-0 right-[20%]">
            <img
              className="w-40 h-40 object-contain"
              alt="Ellipse"
              src="/img/ellipse-80-7.svg"
            />
          </div>

          <div className="absolute w-20 h-20 top-[10%] right-[10%]">
            <div className="relative w-20 h-20 top-[87px] left-[87px]">
              <div className="absolute w-px h-px top-[46px] left-[46px] bg-[#6c95d34c] rounded-[0.5px]" />

              <div className="absolute w-px h-px top-[46px] left-[46px] bg-[#072f6c4c] rounded-[0.5px]" />

              <div className="absolute w-px h-px top-[46px] left-[46px] rounded-[0.5px] [background:linear-gradient(180deg,rgba(199.93,214.33,235.94,0.4)_0%,rgba(200,214,236,0.04)_100%)]" />

              <img
                className="w-20 h-20 object-contain"
                alt="Ellipse"
                src="/img/ellipse-79-6.svg"
              />
            </div>
          </div>

          <div className="absolute w-32 h-32 top-[40%] left-[5%]">
            <img
              className="w-32 h-32 object-contain"
              alt="Ellipse"
              src="/img/ellipse-79-4.svg"
            />
          </div>

          <div className="absolute w-20 h-20 bottom-[20%] left-[30%]">
            <img
              className="w-20 h-20 object-contain"
              alt="Ellipse"
              src="/img/ellipse-80-6.svg"
            />
          </div>

          <div className="absolute w-32 h-32 bottom-[25%] right-[10%]">
            <img
              className="w-32 h-32 object-contain"
              alt="Ellipse"
              src="/img/ellipse-79-5.svg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
