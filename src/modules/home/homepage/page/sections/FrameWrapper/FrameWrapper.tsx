import React from "react";

export const FrameWrapper = (): JSX.Element => {
  return (
    <div className="relative w-[1352px] h-[791px]">
      <div className="flex flex-col w-[1352px] items-center justify-center gap-2.5 p-10 relative">
        <div className="flex flex-col h-[711px] items-center justify-center gap-2.5 relative self-stretch w-full bg-[#ffffff]">
          <div className="flex flex-col w-[1182px] items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <div className="w-[1182px] items-center flex flex-col gap-2.5 relative flex-[0_0_auto]">
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

          <div className="absolute w-[266px] h-[266px] top-[356px] left-[13px]">
            <img
              className="absolute w-[127px] h-[127px] top-[51px] left-[87px] object-cover"
              alt="Ellipse"
              src="/img/ellipse-79-4.svg"
            />
          </div>

          <div className="absolute w-[266px] h-[266px] top-[427px] left-[839px]">
            <img
              className="w-[135px] h-[135px] top-[87px] left-[87px] absolute object-cover"
              alt="Ellipse"
              src="/img/ellipse-79-5.svg"
            />
          </div>

          <div className="absolute w-[266px] h-[266px] top-[76px] left-[948px]">
            <div className="relative w-[91px] h-[91px] top-[87px] left-[87px]">
              <div className="absolute w-px h-px top-[46px] left-[46px] bg-[#6c95d34c] rounded-[0.5px]" />

              <div className="absolute w-px h-px top-[46px] left-[46px] bg-[#072f6c4c] rounded-[0.5px]" />

              <div className="absolute w-px h-px top-[46px] left-[46px] rounded-[0.5px] [background:linear-gradient(180deg,rgba(199.93,214.33,235.94,0.4)_0%,rgba(200,214,236,0.04)_100%)]" />

              <img
                className="w-[91px] h-[91px] top-0 left-0 absolute object-cover"
                alt="Ellipse"
                src="/img/ellipse-79-6.svg"
              />
            </div>
          </div>

          <div className="absolute w-[266px] h-[266px] top-0 left-[13px]">
            <img
              className="w-[135px] h-[135px] top-[43px] left-[87px] absolute object-cover"
              alt="Ellipse"
              src="/img/ellipse-79-7.svg"
            />
          </div>

          <img
            className="w-[91px] h-[91px] top-[582px] left-[364px] absolute object-cover"
            alt="Ellipse"
            src="/img/ellipse-80-6.svg"
          />

          <img
            className="w-[193px] h-[188px] top-0 left-[704px] absolute object-cover"
            alt="Ellipse"
            src="/img/ellipse-80-7.svg"
          />
        </div>
      </div>
    </div>
  );
};
