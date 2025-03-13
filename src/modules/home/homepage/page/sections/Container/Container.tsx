import React from "react";
import { Component } from "../../../../components/Component";
import { Frame1000004785 } from "../../../../components/Frame1000004785";

export const Container = (): JSX.Element => {
  return (
    <div className="h-[794px] justify-center gap-[60px_60px] p-10 self-stretch w-full bg-[#f3f3f3] rounded-[20px] flex items-center relative">
      <div className="flex flex-col h-[600px] items-start justify-center gap-[30px] px-0 py-4 relative flex-1 grow">
        <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
          <div className="flex w-[125px] h-[41px] items-center justify-center gap-2.5 p-2.5 relative bg-[#072f6c] rounded-[30px] border border-solid border-[#a8a8a8]">
            <div className="w-fit mt-[-4.00px] mb-[-2.00px] ml-[-2.50px] mr-[-2.50px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
              Our pergola
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="h-[110px] items-center px-0 py-2.5 relative self-stretch w-full flex gap-2.5">
            <p className="flex-1 mt-[-31.00px] mb-[-29.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
              The all year round pergola For big or small outside areas
            </p>
          </div>

          <div className="flex w-[489px] items-center px-0 py-2.5 flex-[0_0_auto] gap-2.5 relative">
            <p className="relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              Discover our premium pergolas designed to enhance your outdoor
              living experience. Crafted with quality materials, they provide
              both style and functionality for any backyard.
            </p>
          </div>
        </div>

        <Component
          buttonClassName="!mr-[-8.00px] !ml-[-8.00px]"
          className="!flex-[0_0_auto]"
          property1="primary-button-l"
          text="Choose your pergola"
        />
      </div>

      <Frame1000004785
        className="!mt-[-13.00px] !mb-[-13.00px]"
        img="/img/rectangle-1271-4.svg"
        property1="default"
        propertyDefaultWrapperRectangle="/img/rectangle-1273-4-2.svg"
        rectangle="/img/rectangle-1271-2-2.svg"
        rectangle1="/img/rectangle-1273-5.svg"
        rectangleClassName="!left-[-1426px] !top-[-1136px]"
        rectangleClassNameOverride="!left-[-1601px] !top-[-1515px]"
      />
      <div className="inline-flex absolute top-[33px] left-[496px] items-start gap-5">
        <div className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]">
          <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
            Intimate &amp; cosy
          </div>
        </div>

        <div className="w-[169px] relative shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] flex h-[41px] items-center justify-center gap-2.5 p-2.5 bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad]">
          <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
            Family &amp; friends
          </div>
        </div>

        <div className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
          <div className="w-56 mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
            Spacious Entertainment
          </div>
        </div>

        <div className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
          <div className="w-[150px] mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
            Luxurious Living
          </div>
        </div>
      </div>
    </div>
  );
};
