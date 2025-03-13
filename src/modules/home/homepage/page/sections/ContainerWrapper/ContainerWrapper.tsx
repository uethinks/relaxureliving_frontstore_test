import React from "react";
import { Component } from "../../../../components/Component";
import { Frame1000004787 } from "../../../../components/Frame1000004787";

export const ContainerWrapper = (): JSX.Element => {
  return (
    <div className="w-[1402px] h-[787px] justify-center gap-[168px] px-20 py-0 ml-[-25.00px] mr-[-25.00px] bg-[#ffffff] rounded-[20px] flex items-center relative">
      <div className="absolute w-[625px] h-[628px] top-[81px] left-[26px] bg-[#ffffff] rounded-[20px] overflow-hidden bg-[url(/img/img.png)] bg-cover bg-[50%_50%]">
        <div className="inline-flex relative top-[50px] left-[85px] items-start gap-5">
          <div className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]">
            <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
              Discover
            </div>
          </div>

          <div className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]">
            <div className="w-[79px] mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
              Discover
            </div>
          </div>

          <div className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
            <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
              Discover
            </div>
          </div>

          <div className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
            <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
              Discover
            </div>
          </div>
        </div>
      </div>

      <Frame1000004787
        className="!ml-[-42.50px] bg-[url(/img/rectangle-1274-1.svg)]"
        frameClassName="bg-[url(/img/frame-55-3.svg)]"
        property1="default"
      />
      <div className="flex flex-col w-[557px] items-start justify-center gap-[30px] px-0 py-[88px] relative self-stretch mr-[-40.50px]">
        <div className="flex flex-col items-start justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
            <div className="flex w-[125px] h-[41px] items-center justify-center gap-2.5 p-2.5 relative bg-[#072f6c] rounded-[30px] border border-solid border-[#a8a8a8]">
              <div className="w-fit mt-[-4.00px] mb-[-2.00px] ml-[-1.00px] mr-[-1.00px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                Accessories
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="items-center justify-center px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto] flex gap-2.5">
            <p className="flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
              Enjoy any activity you like no matter the weather
            </p>
          </div>

          <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              Discover our premium pergolas designed to enhance your outdoor
              living experience. Crafted with quality materials, they provide
              both style and functionality for any backyard.
            </p>
          </div>
        </div>

        <Component
          buttonClassName="!mr-[-5.00px] !ml-[-5.00px]"
          className="!flex-[0_0_auto]"
          property1="primary-button-l"
          text="Add to your pergola"
        />
      </div>
    </div>
  );
};
