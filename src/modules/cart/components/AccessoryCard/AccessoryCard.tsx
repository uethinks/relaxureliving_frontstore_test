import React from "react";
import { Plus } from "../../icons/Plus";
import { Plus1 } from "../../icons/Plus1";

interface Props {
  property1: "variant-2" | "variant-3" | "default";
  frameClassName: any;
}

export const AccessoryCard = ({
  property1,
  frameClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`border border-solid border-[#a8a8a8] flex flex-col items-start relative ${
        property1 === "variant-2" ? "w-[390px]" : "w-[374px]"
      } ${property1 === "variant-2" ? "gap-[20.86px]" : "gap-5"} ${
        property1 === "variant-2"
          ? "shadow-[0px_3.13px_7.3px_#072f6c1a,0px_13.56px_13.56px_#072f6c17,0px_30.24px_17.73px_#072f6c0d,0px_53.19px_20.86px_#072f6c03,0px_83.43px_22.94px_transparent]"
          : ""
      } ${property1 === "variant-2" ? "p-[10.43px]" : "p-2.5"} ${
        property1 === "variant-2" ? "h-[504px]" : "h-[484px]"
      } ${property1 === "variant-2" ? "rounded-[20.86px]" : "rounded-[20px]"} ${
        property1 === "variant-2" ? "bg-[#ffffff]" : ""
      }`}
    >
      <div
        className={`border-[#e8e8ea] w-full self-stretch grow bg-cover flex-1 bg-[50%_50%] relative ${
          property1 === "variant-2" ? "border-[1.24px] border-solid" : "border-[1.19px] border-solid"
        } ${property1 === "variant-2" ? "bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-86-1.svg)]" : (property1 === "variant-3") ? "bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-86.svg)]" : "bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-86-2.svg)]"} ${property1 === "variant-2" ? "rounded-[19.9px]" : "rounded-[19.08px]"} ${frameClassName}`}
      />

      <div
        className={`w-full flex self-stretch flex-col items-start flex-[0_0_auto] relative ${property1 === "variant-2" ? "gap-[20.86px]" : "gap-5"}`}
      >
        <div
          className={`border-[#a8a8a8] flex items-center justify-center bg-[#072f6c] relative ${property1 === "variant-2" ? "border-[1.04px] border-solid" : "border border-solid"} ${property1 === "variant-2" ? "w-[109.5px]" : "w-[105px]"} ${property1 === "variant-2" ? "gap-[10.43px]" : "gap-2.5"} ${property1 === "variant-2" ? "p-[10.43px]" : "p-2.5"} ${property1 === "variant-2" ? "h-[42.76px]" : "h-[41px]"} ${property1 === "variant-2" ? "rounded-[31.29px]" : "rounded-[30px]"}`}
        >
          <div
            className={`[font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-[#ffffff] relative font-medium whitespace-nowrap ${property1 === "variant-2" ? "mt-[-2.59px]" : "mt-[-2.50px]"} ${property1 === "variant-2" ? "text-[16.7px]" : "text-base"} ${property1 === "variant-2" ? "mb-[-0.51px]" : "mb-[-0.50px]"} ${property1 === "variant-2" ? "leading-[25.0px]" : "leading-6"}`}
          >
            Exclusive
          </div>
        </div>

        <div
          className={`w-full flex self-stretch items-start flex-[0_0_auto] relative ${property1 === "variant-2" ? "gap-[10.43px]" : "gap-2.5"}`}
        >
          <div
            className={`flex items-center grow flex-1 relative ${property1 === "variant-2" ? "gap-[10.43px]" : "gap-2.5"}`}
          >
            <div
              className={`[font-family:'Montserrat',Helvetica] tracking-[0] text-[#343a40] relative font-medium ${property1 === "variant-2" ? "w-[102.2px]" : "w-[98px]"} ${property1 === "variant-2" ? "mt-[-1.04px]" : "mt-[-1.00px]"} ${property1 === "variant-2" ? "text-[22.9px]" : "text-[22px]"} ${property1 === "variant-2" ? "leading-[34.4px]" : "leading-[33px]"}`}
            >
              Heater
            </div>
          </div>

          <div
            className={`inline-flex items-center flex-[0_0_auto] justify-end relative ${property1 === "variant-2" ? "gap-[10.43px]" : "gap-2.5"}`}
          >
            <div
              className={`[font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-[#343a40] relative font-semibold whitespace-nowrap ${property1 === "variant-2" ? "mt-[-1.04px]" : "mt-[-1.00px]"} ${property1 === "variant-2" ? "text-[22.9px]" : "text-[22px]"} ${property1 === "variant-2" ? "leading-[32.1px]" : "leading-[30.8px]"}`}
            >
              $ 3,500.00
            </div>
          </div>
        </div>

        <div
          className={`flex items-center justify-end relative ${property1 === "variant-2" ? "w-[370px]" : "w-full"} ${["default", "variant-3"].includes(property1) ? "self-stretch" : ""} ${property1 === "variant-2" ? "mr-[-0.86px]" : ""} ${property1 === "variant-2" ? "gap-[10.43px]" : "gap-2.5"} ${property1 === "variant-2" ? "px-0 py-[10.43px]" : "px-0 py-2.5"} ${property1 === "variant-2" ? "h-11" : "h-[42px]"}`}
        >
          {property1 === "variant-3" && (
            <div className="flex w-[118px] h-[42px] items-center relative mt-[-10.00px] mb-[-10.00px]">
              <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] mt-[-2.50px] mb-[-2.50px]">
                <div className="font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#69727a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative w-fit mt-[-1.00px] font-relaxure-sub-heading-18 tracking-[var(--relaxure-sub-heading-18-letter-spacing)] whitespace-nowrap [font-style:var(--relaxure-sub-heading-18-font-style)]">
                  Qty :
                </div>
              </div>

              <div className="flex w-14 h-10 items-center justify-center gap-2.5 p-2.5 relative rounded-[10px] border border-solid border-[#a8a8a8]">
                <div className="mt-[-3.00px] mb-[-1.00px] text-[#69727a] relative w-fit [font-family:'Montserrat',Helvetica] font-medium text-base tracking-[0] leading-6 whitespace-nowrap">
                  1
                </div>
              </div>
            </div>
          )}

          <div
            className={`inline-flex items-center flex-[0_0_auto] bg-[#c3d6f2] relative ${property1 === "variant-2" ? "mt-[-9.81px]" : "mt-[-9.50px]"} ${property1 === "variant-2" ? "gap-[10.43px]" : "gap-2.5"} ${property1 === "variant-2" ? "p-[8.34px]" : "p-2"} ${property1 === "variant-2" ? "h-[42.76px]" : "h-[41px]"} ${property1 === "variant-2" ? "rounded-[21.38px]" : "rounded-[20.5px]"} ${property1 === "variant-2" ? "mb-[-9.81px]" : "mb-[-9.50px]"}`}
          >
            {["default", "variant-3"].includes(property1) && (
              <Plus className="!relative !w-6 !h-6" />
            )}

            {property1 === "variant-2" && (
              <Plus1 className="!relative !w-[25.03px] !h-[25.03px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
