import React from "react"
import { Component } from "../../../../components/Component"

export const NavBarWrapper = (): JSX.Element => {
  return (
    <div className="inline-flex flex-col items-start gap-2.5 px-0 py-10 fixed top-0 left-1/2 -translate-x-1/2">
      <div className="flex flex-col w-[1205px] h-[79px] items-center justify-center gap-2.5 p-5 relative bg-[#ffffffcc] rounded-[30px] border border-solid border-[#ffffff] backdrop-blur-[27.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]">
        <div className="justify-between self-stretch w-full flex-[0_0_auto] mt-[-4.50px] mb-[-4.50px] flex items-center relative">
          <img
            className="relative w-[76.45px] h-12"
            alt="Logo"
            src="/img/logo.svg"
          />

          <div className="flex w-[200px] items-center justify-end gap-5 relative">
            <div className="flex items-center justify-end gap-2.5 relative flex-1 grow ml-[-20.00px]">
              <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                <a
                  href="#pergola"
                  className="relative w-[138px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6"
                >
                  Our pergola
                </a>
              </div>

              <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                <a
                  href="#features"
                  className="relative w-[139px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6"
                >
                  Features
                </a>
              </div>

              <div className="flex w-[101px] items-center justify-center gap-2.5 px-0 py-2.5 relative">
                <a
                  href="#accessories"
                  className="relative w-[139px] mt-[-1.00px] ml-[-19.00px] mr-[-19.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6"
                >
                  Accesories
                </a>
              </div>
            </div>

            <a href="#contact">
              <Component
                className="!mr-[-1.00px]"
                property1="primary-button-l"
                text="Contact us"
                buttonClassName="nav-contact-us"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
