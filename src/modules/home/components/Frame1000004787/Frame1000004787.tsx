"use client"

import PropTypes from "prop-types";
import React from "react";

interface Props {
  property1: "default";
  className: any;
  frameClassName: any;
}

export const Frame1000004787 = ({
  property1,
  className,
  frameClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`relative w-[600px] h-[600px] bg-[url(/img/rectangle-1274.svg)] bg-[100%_100%] ${className}`}
    >
      <div className="flex w-[512px] h-[116px] items-start gap-4 p-2.5 absolute top-[450px] left-11 bg-[#ffffff73] rounded-[20px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
        <div
          className={`relative flex-1 max-w-[90px] grow h-24 rounded-[9.12px] bg-[url(/img/frame-55.svg)] bg-cover bg-[50%_50%] ${frameClassName}`}
        />

        <div className="flex flex-col items-start gap-2 relative flex-1 grow">
          <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] leading-[25.2px]">
              Come rain or sunshine
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="flex-1 mt-[-1.00px] text-sm leading-[21px] relative [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] tracking-[0]">
              Discover our premium pergolas designed to enhance.Discover our
              premium pergolas designed to enhance.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-[106px] h-[41px] items-center justify-center gap-2.5 p-2.5 absolute top-[153px] left-[493px] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
        <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] tracking-[0]">
          Heating
        </div>
      </div>

      <div className="flex w-[106px] h-[41px] items-center justify-center gap-2.5 p-2.5 absolute top-[315px] left-[408px] bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
        <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] tracking-[0]">
          Heating
        </div>
      </div>

      <div className="flex w-[126px] h-[41px] items-center justify-center gap-2.5 p-2.5 absolute top-[239px] left-40 bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_15.12px_#ffffff73,0px_0px_30.24px_#ffffff73,0px_0px_105.84px_#ffffff73,0px_0px_211.68px_#ffffff73,0px_0px_250px_#ffffff73,0px_0px_250px_#ffffff73]">
        <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] tracking-[0]">
          Glass door
        </div>
      </div>
    </div>
  );
};

Frame1000004787.propTypes = {
  property1: PropTypes.oneOf(["default"]),
};
