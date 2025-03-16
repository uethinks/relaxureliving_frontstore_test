"use client"
import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

interface Props {
  property1: "variant-2" | "default";
  className: any;
  overlapClassName: any;
  overlapClassNameOverride: any;
  frameClassName: any;
  overlapGroupClassName: any;
  rectangleClassName: any;
  rectangle: string;
}

export const Frame1000004776 = ({
  property1,
  className,
  overlapClassName,
  overlapClassNameOverride,
  frameClassName,
  overlapGroupClassName,
  rectangleClassName,
  rectangle = "/img/image.svg",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`w-full h-[600px] overflow-hidden relative ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.property1 === "variant-2" && (
        <img
          className={`absolute w-[407px] h-[248px] top-[20782px] left-[-9671px] object-cover ${overlapClassName}`}
          alt="Rectangle"
          src="/img/rectangle-1267.svg"
        />
      )}

      <div
        className={`w-[407px] left-0 top-[352px] bg-cover h-[248px] bg-[50%_50%] absolute ${state.property1 === "default" ? "bg-[url(/img/rectangle-1267-2.svg)]" : "bg-[url(/img/rectangle-1268-1.svg)]"} ${state.property1 === "variant-2" ? overlapClassNameOverride : (state.property1 === "default") ? overlapClassName : undefined}`}
      >
        <div
          className={`w-[132px] flex items-start gap-5 relative ${state.property1 === "default" ? "left-[21px]" : "left-[35px]"} ${state.property1 === "default" ? "top-[31px]" : "top-5"}`}
        >
          <div className="border border-solid border-[#ffffffad] w-[132px] flex items-center gap-2.5 shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] p-2.5 h-[41px] rounded-[30px] justify-center bg-[#ffffff73] relative">
            <div className="[font-family:'Montserrat',Helvetica] w-[100px] mt-[-4.00px] tracking-[0] text-lg text-[#343a40] font-medium leading-[27px] mb-[-2.00px] relative">
              Hands free
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-[596px] left-[450px] top-0 bg-cover h-[600px] bg-[50%_50%] absolute ${state.property1 === "variant-2" ? "bg-[url(/img/rectangle-1269-1.svg)]" : "bg-[url(/img/rectangle-1268.svg)]"} ${state.property1 === "default" ? overlapClassNameOverride : (state.property1 === "variant-2") ? overlapGroupClassName : undefined}`}
      >
        {state.property1 === "default" && (
          <div className="flex w-[512px] h-[116px] items-start gap-4 p-2.5 absolute top-[442px] left-[42px] bg-[#ffffff73] rounded-[20px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
            <div
              className={`relative flex-1 max-w-[90px] grow h-24 rounded-[9.12px] bg-[url(/img/frame-55-1.svg)] bg-cover bg-[50%_50%] ${frameClassName}`}
            />

            <div className="flex flex-col items-start gap-2 relative flex-1 grow">
              <div className="items-center flex gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <p className="flex-1 text-lg leading-[25.2px] relative mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] tracking-[0]">
                  With the press of a button or miles away
                </p>
              </div>

              <div className="justify-center self-stretch w-full flex-[0_0_auto] flex items-center gap-2.5 relative">
                <p className="flex-1 mt-[-1.00px] text-[#343a40] text-sm leading-[21px] relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                  You can control your pergola with the Wifi App and all in one
                  remote
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          className={`w-[132px] flex items-start gap-5 ${state.property1 === "variant-2" ? "left-[30px]" : "left-[35px]"} ${state.property1 === "variant-2" ? "top-8" : "top-[35px]"} ${state.property1 === "variant-2" ? "relative" : "absolute"}`}
        >
          <div className="border border-solid border-[#ffffffad] w-[132px] flex items-center gap-2.5 shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] p-2.5 h-[41px] rounded-[30px] justify-center bg-[#ffffff73] relative">
            <div className="[font-family:'Montserrat',Helvetica] w-[100px] mt-[-4.00px] tracking-[0] text-lg text-[#343a40] relative font-medium mb-[-2.00px] leading-[27px]">
              Hands free
            </div>
          </div>
        </div>
      </div>

      {state.property1 === "variant-2" && (
        <>
          <div className="flex w-[132px] items-start gap-5 absolute top-[383px] left-[-392px]">
            <div className="flex w-[132px] h-[41px] items-center justify-center gap-2.5 p-2.5 relative bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]">
              <div className="w-[100px] mt-[-4.00px] mb-[-2.00px] text-[#343a40] relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                Hands free
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col w-[450px] items-start gap-5 absolute top-0 left-0 ${rectangleClassName}`}
          >
            <div className="flex flex-col items-start justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                <div className="w-[125px] h-[41px] justify-center p-2.5 bg-[#072f6c] rounded-[30px] border border-solid border-[#a8a8a8] flex items-center gap-2.5 relative">
                  <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#ffffff] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                    Features
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative w-[484px] mt-[-1.00px] mr-[-34.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-[32px] tracking-[0] leading-[44.8px]">
                We bring the convenience back in luxury living
              </p>

              <div className="px-0 py-2.5 self-stretch w-full flex-[0_0_auto] flex items-center gap-2.5 relative">
                <p className="flex-1 mt-[-1.00px] text-[#68717a] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                  Discover our premium pergolas designed to enhance your outdoor
                  living experience.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute w-[257px] h-[497px] top-[103px] left-[1089px] bg-[url(/img/rectangle-1270.svg)] bg-cover bg-[50%_50%]">
            <div className="flex w-[132px] items-start gap-5 relative top-[31px] left-[21px]">
              <div className="flex w-[132px] h-[41px] items-center justify-center gap-2.5 p-2.5 relative bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]">
                <div className="w-[100px] mt-[-4.00px] mb-[-2.00px] text-[#343a40] relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                  Hands free
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {state.property1 === "default" && (
        <>
          <div
            className={`absolute w-[257px] h-[497px] top-[103px] left-[1089px] bg-[url(/img/rectangle-1269.svg)] bg-cover bg-[50%_50%] ${overlapGroupClassName}`}
          >
            <div className="relative top-8 left-[30px] flex w-[132px] items-start gap-5">
              <div className="flex w-[132px] h-[41px] items-center justify-center gap-2.5 p-2.5 relative bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]">
                <div className="w-[100px] mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                  Hands free
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[450px] items-start gap-5 absolute top-0 left-0">
            <div className="flex flex-col items-start justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                <div className="w-[125px] h-[41px] justify-center p-2.5 bg-[#072f6c] rounded-[30px] border border-solid border-[#a8a8a8] flex items-center gap-2.5 relative">
                  <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                    Features
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col items-start justify-center px-0 py-2.5 flex gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <p className="w-[484px] mr-[-34.00px] text-[32px] leading-[44.8px] relative mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] tracking-[0]">
                We bring the convenience back in luxury living
              </p>

              <div className="px-0 py-2.5 self-stretch w-full flex-[0_0_auto] flex items-center gap-2.5 relative">
                <p className="flex-1 mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                  Discover our premium pergolas designed to enhance your outdoor
                  living experience.
                </p>
              </div>
            </div>
          </div>

          <img
            className={`absolute w-[257px] h-[497px] top-[21301px] left-[-7904px] object-cover ${rectangleClassName}`}
            alt="Rectangle"
            src={rectangle}
          />

          <div className="flex w-[132px] items-start gap-5 absolute top-[134px] left-[1374px]">
            <div className="flex w-[132px] h-[41px] items-center justify-center gap-2.5 p-2.5 relative bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]">
              <div className="w-[100px] mt-[-4.00px] mb-[-2.00px] text-[#343a40] text-lg leading-[27px] relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                Hands free
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "click":
      return {
        ...state,
        property1: "variant-2",
      };
  }

  return state;
}

Frame1000004776.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
  rectangle: PropTypes.string,
};
