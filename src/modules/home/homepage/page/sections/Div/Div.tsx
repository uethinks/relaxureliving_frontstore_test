import React from "react";
import { Frame1000004790 } from "../../../../components/Frame1000004790";

export const Div = (): JSX.Element => {
  return (
    <div className="flex w-full items-center gap-[98px] px-[47px] py-0 relative flex-[0_0_auto] ml-[-47.00px] mr-[-47.00px]">
      <div className="flex flex-col w-[518px] items-start justify-center gap-[30px] px-0 py-4 relative">
        <div className="items-start self-stretch w-full flex flex-col gap-2.5 relative flex-[0_0_auto]">
          <div className="flex self-stretch w-full flex-col items-start gap-2.5 relative flex-[0_0_auto]">
            <div className="flex w-28 h-[41px] items-center justify-center p-2.5 bg-[#072f6c] rounded-[30px] gap-2.5 relative">
              <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                Our blog
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="w-[518px] mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
              The Pergola Journal
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="w-[514px] mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              The Pergola Journal offers expert tips and inspiration to help you
              create the perfect outdoor space with your pergola.
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-[740px] h-[1023px] mr-[-4.00px]">
        <Frame1000004790
          className="!absolute !left-0 bg-[url(/img/rectangle-1276-4.svg)] !top-[640px]"
          ellipse="/img/ellipse-80-8.svg"
          property1="variant-3"
        />
        <Frame1000004790
          className="!absolute !left-[390px] bg-[url(/img/rectangle-1276-5.svg)] !top-[423px]"
          img="/img/ellipse-80-9.svg"
          property1="default"
        />
        <Frame1000004790
          className="!absolute !left-[390px] bg-[url(/img/rectangle-1276-6.svg)] !top-0"
          ellipse="/img/ellipse-80-10.svg"
          property1="variant-3"
        />
        <Frame1000004790
          className="!absolute !left-0 bg-[url(/img/rectangle-1276-7.svg)] !top-0"
          img="/img/ellipse-80-11.svg"
          property1="default"
        />
      </div>
    </div>
  );
};
