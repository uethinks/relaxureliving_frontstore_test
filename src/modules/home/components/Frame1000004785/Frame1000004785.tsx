"use client"

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { ArrowForwardIos4 } from "../../icons/ArrowForwardIos4";
import { StyleOutlined } from "../../icons/StyleOutlined";
import { ArrowForwardIos } from "../ArrowForwardIos";
import { PropertyDefaultWrapper } from "../PropertyDefaultWrapper";

interface Props {
  property1: "variant-2" | "default";
  className: any;
  rectangle: string;
  propertyDefaultWrapperRectangle: string;
  rectangleClassName: any;
  img: string;
  rectangleClassNameOverride: any;
  rectangle1: string;
}

export const Frame1000004785 = ({
  property1,
  className,
  rectangle = "/img/rectangle-1271-3.svg",
  propertyDefaultWrapperRectangle = "/img/rectangle-1273.svg",
  rectangleClassName,
  img = "/img/rectangle-1271.svg",
  rectangleClassNameOverride,
  rectangle1 = "/img/rectangle-1273-3.svg",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`w-[711px] h-[740px] overflow-hidden ${state.property1 === "default" ? "relative" : ""} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.property1 === "default" && (
        <>
          <div className="absolute w-[765px] h-[740px] top-0 left-0">
            <div className="relative w-[600px] h-[708px] left-[60px]">
              <img
                className="top-0 left-0 absolute w-[600px] h-[600px] object-cover"
                alt="Rectangle"
                src={rectangle}
              />

              <PropertyDefaultWrapper
                className="!absolute !left-[66px] !top-[410px]"
                property1="default"
                rectangle={propertyDefaultWrapperRectangle}
              />
              <div className="left-[38px] flex w-[524px] items-center justify-between absolute top-[264px]">
                <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                  <ArrowForwardIos4 className="!relative !w-6 !h-6" />
                </div>

                <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                  <StyleOutlined
                    className="!relative !w-6 !h-6"
                    color="white"
                    opacity="0.8"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute w-[765px] h-[740px] top-0 left-[805px]">
            <img
              className={`top-[12414px] left-[5136px] absolute w-[600px] h-[600px] object-cover ${rectangleClassName}`}
              alt="Rectangle"
              src={img}
            />

            <div className="left-[126px] absolute w-[270px] h-[298px] top-[410px]">
              <div className="absolute left-0 w-[253px] h-[275px] top-[21px] bg-[#ffffff] rounded-[20px]">
                <div className="relative flex w-[233px] items-center gap-2.5 top-[218px] left-[13px]">
                  <p className="relative flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] leading-[25.2px]">
                    A pergola for every occasion
                  </p>
                </div>
              </div>

              <img
                className={`top-[12035px] left-[4961px] absolute w-[231px] h-[191px] object-cover ${rectangleClassNameOverride}`}
                alt="Rectangle"
                src={rectangle1}
              />
            </div>

            <div className="left-[98px] flex w-[524px] items-center justify-between absolute top-[264px]">
              <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                <ArrowForwardIos style="outlined" />
              </div>

              <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                <ArrowForwardIos style="outlined" />
              </div>
            </div>
          </div>
        </>
      )}

      {state.property1 === "variant-2" && (
        <div className="relative w-[1433px] h-[740px] left-[-668px]">
          <div className="absolute w-[765px] h-[740px] top-0 left-0 overflow-hidden">
            <img
              className="top-[11510px] left-[6609px] absolute w-[600px] h-[600px] object-cover"
              alt="Rectangle"
              src="/img/rectangle-1271-2.svg"
            />

            <div className="left-[126px] absolute w-[270px] h-[298px] top-[410px]">
              <div className="absolute left-0 w-[253px] h-[275px] top-[21px] bg-[#ffffff] rounded-[20px]">
                <div className="relative flex w-[233px] items-center gap-2.5 top-[218px] left-[13px]">
                  <p className="relative flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] leading-[25.2px]">
                    A pergola for every occasion
                  </p>
                </div>
              </div>

              <img
                className="top-[11131px] left-[6434px] absolute w-[231px] h-[191px] object-cover"
                alt="Rectangle"
                src="/img/rectangle-1273-4.svg"
              />
            </div>

            <div className="left-[98px] flex w-[524px] items-center justify-between absolute top-[264px]">
              <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                <ArrowForwardIos style="outlined" />
              </div>

              <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                <ArrowForwardIos style="outlined" />
              </div>
            </div>
          </div>

          <div className="absolute w-[765px] h-[740px] top-0 left-[668px]">
            <div className="relative w-[600px] h-[708px] left-[60px]">
              <img
                className="top-0 left-0 absolute w-[600px] h-[600px] object-cover"
                alt="Rectangle"
                src="/img/rectangle-1271-1.svg"
              />

              <PropertyDefaultWrapper
                className="!absolute !left-[66px] !top-[410px]"
                property1="default"
                rectangle="/img/rectangle-1273-1.svg"
              />
              <div className="left-[38px] flex w-[524px] items-center justify-between absolute top-[264px]">
                <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                  <ArrowForwardIos4 className="!relative !w-6 !h-6" />
                </div>

                <div className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)]">
                  <StyleOutlined
                    className="!relative !w-6 !h-6"
                    color="white"
                    opacity="0.8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function reducer(state: any, action: any) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "variant-2",
        };
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

Frame1000004785.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
  rectangle: PropTypes.string,
  propertyDefaultWrapperRectangle: PropTypes.string,
  img: PropTypes.string,
  rectangle1: PropTypes.string,
};
