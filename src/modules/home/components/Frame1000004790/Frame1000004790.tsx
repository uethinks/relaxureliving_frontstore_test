"use client"

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

interface Props {
  property1: "variant-4" | "variant-2" | "variant-3" | "default";
  className: any;
  ellipse: string;
  img: string;
}

export const Frame1000004790 = ({
  property1,
  className,
  ellipse = "/img/ellipse-80-1.svg",
  img = "/img/ellipse-80.svg",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`w-[350px] bg-[100%_100%] overflow-hidden rounded-[20px] relative ${["variant-3", "variant-4"].includes(state.property1) ? "h-[383px]" : "h-[600px]"} ${state.property1 === "variant-3" ? "bg-[url(/img/rectangle-1276-1.svg)]" : (state.property1 === "variant-4") ? "bg-[url(/img/rectangle-1276-2.svg)]" : state.property1 === "variant-2" ? "bg-[url(/img/rectangle-1276-3.svg)]" : "bg-[url(/img/rectangle-1276.svg)]"} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div
        className={`[background:linear-gradient(180deg,rgba(52,58,64,0)_51.5%,rgba(0,0,0,0.6)_100%)] w-[350px] left-0 h-[269px] rounded-[20px] absolute ${["variant-3", "variant-4"].includes(state.property1) ? "top-[114px]" : "top-[331px]"}`}
      >
        <div
          className={`border border-solid border-[#e0dcdc42] w-[300px] flex left-[25px] flex-col items-start gap-5 p-5 rounded-[20px] [-webkit-backdrop-filter:blur(12.6px)_brightness(100%)] bg-[#e0dcdc99] backdrop-blur-[12.6px] backdrop-brightness-[100%] relative ${["variant-3", "variant-4"].includes(state.property1) ? "top-[58px]" : "top-[47px]"}`}
        >
          <div className="w-full flex self-stretch flex-col items-start gap-2 h-[75px] relative">
            <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] relative">
              <div className="[font-family:'Merriweather',Helvetica] mt-[-1.00px] tracking-[0] text-lg flex-1 text-[#343a40] relative font-bold leading-[25.2px]">
                Pergola Buying Guide
              </div>
            </div>

            <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] justify-center mb-[-21.00px] relative">
              <p className="[font-family:'Montserrat',Helvetica] mt-[-1.00px] tracking-[0] text-sm flex-1 text-[#343a40] relative font-medium leading-[21px]">
                Tips on how to choose the right pergola based on space, style,
                and material.
              </p>
            </div>
          </div>

          <div className="w-[151px] flex items-center gap-2.5 flex-[0_0_auto] relative">
            <img
              className="w-10 object-cover h-10 relative"
              alt="Ellipse"
              src={
                state.property1 === "variant-3"
                  ? ellipse
                  : state.property1 === "variant-4"
                    ? "/img/ellipse-80-2.svg"
                    : state.property1 === "variant-2"
                      ? "/img/ellipse-80-3.svg"
                      : img
              }
            />

            <div className="flex items-center grow gap-2.5 flex-1 relative">
              <div className="[font-family:'Montserrat',Helvetica] w-[244px] mt-[-1.00px] tracking-[0] text-base mr-[-143.00px] text-[#343a40] relative font-medium leading-[22.4px]">
                Aurora G.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[132px] left-[26px] flex items-start top-[33px] gap-5 absolute">
        <div className="border border-solid border-[#ffffffad] w-[132px] flex items-center gap-2.5 shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] p-2.5 h-[41px] rounded-[30px] justify-center bg-[#ffffff73] relative">
          <div className="[font-family:'Montserrat',Helvetica] w-[100px] mt-[-4.00px] tracking-[0] text-lg text-[#343a40] relative font-medium mb-[-2.00px] leading-[27px]">
            Hands free
          </div>
        </div>
      </div>
    </div>
  );
};

function reducer(state: any, action: any) {
  if (state.property1 === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          property1: "variant-2",
        };
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "mouse_leave":
        return {
          property1: "default",
        };
    }
  }

  if (state.property1 === "variant-3") {
    switch (action) {
      case "mouse_enter":
        return {
          property1: "variant-4",
        };
    }
  }

  if (state.property1 === "variant-4") {
    switch (action) {
      case "mouse_leave":
        return {
          property1: "variant-3",
        };
    }
  }

  return state;
}

Frame1000004790.propTypes = {
  property1: PropTypes.oneOf([
    "variant-4",
    "variant-2",
    "variant-3",
    "default",
  ]),
  ellipse: PropTypes.string,
  img: PropTypes.string,
};
