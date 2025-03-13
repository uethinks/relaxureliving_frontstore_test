import React from "react";
import { StyleSecondary } from "../../../../components/StyleSecondary";

export const Hero = (): JSX.Element => {
  return (
    <div className="flex flex-col h-[983px] items-end gap-2 pt-2.5 pb-10 px-0 relative self-stretch w-full">
      <div className="flex h-[900px] items-center px-16 py-0 relative self-stretch w-full rounded-[20px] overflow-hidden shadow-shadow-cards-relaxure bg-[url(/img/img-content.png)] bg-cover bg-[50%_50%]">
        <div className="flex flex-col w-[1224px] items-start gap-8 relative">
          <div className="flex flex-col w-[557px] items-start gap-6 relative flex-[0_0_auto]">
            <p className="self-stretch mt-[-1.00px] font-heading font-[number:var(--heading-font-weight)] text-[#ffffff] text-[length:var(--heading-font-size)] leading-[var(--heading-line-height)] relative tracking-[var(--heading-letter-spacing)] [font-style:var(--heading-font-style)]">
              Relax anytime of the year
            </p>

            <p className="self-stretch text-[#ffffff] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              Premium pergolas designed to enhance your outdoor living
              experience. Crafted with quality materials, they provide both
              style and functionality for any backyard.
            </p>
          </div>

          <div className="inline-flex items-start justify-end gap-5 relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] bg-[#072f6c] rounded-[10px]">
              <button className="all-[unset] box-border relative w-fit [font-family:'Montserrat',Helvetica] font-normal text-[color:var(--semantic-border-alternate)] text-base tracking-[0] leading-6 whitespace-nowrap">
                Reimagine your outdoor space
              </button>
            </div>

            <StyleSecondary
              className="!border-[#ffffff] !rounded-[10px] !mr-[-1.00px] !mt-[-1.00px] !mb-[-1.00px] !flex-[0_0_auto]"
              divClassName="!text-[#ffffff] !tracking-[0] !text-base ![font-style:unset] !font-normal ![font-family:'Roboto',Helvetica] !leading-6"
              text="Talk to a real human"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
