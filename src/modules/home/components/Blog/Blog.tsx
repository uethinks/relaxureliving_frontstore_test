"use client"
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react"
import { Blog as BlogType } from "types/global"
interface Props {
  size: "small" | "large"
  blog: BlogType | null
}
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL ?? ""
export const Blog = ({ size, blog }: Props): JSX.Element => {
  return (
    <div
      className={`flex flex-col justify-between w-full bg-[100%_100%] overflow-hidden rounded-[20px] relative ${
        size === "small" ? "lg:h-[383px]" : "lg:h-[600px]"
      } bg-[url(/img/rectangle-1276-4.svg)] h-[450px]`}
      style={{
        backgroundImage: `url(${strapiUrl + blog?.cover.formats.large.url})`,
      }}
    >
      <div className="w-[132px] mt-5 ml-5 flex items-start gap-5">
        <div className=" border border-solid border-[#ffffffad] w-[132px] flex items-center gap-2.5 shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] p-2.5 h-[41px] rounded-[30px] justify-center bg-[#ffffff73] relative">
          <div className="[font-family:'Montserrat',Helvetica] w-[100px] mt-[-4.00px] tracking-[0] text-lg text-[#343a40] relative font-medium mb-[-2.00px] leading-[27px]">
            {blog?.category?.name}
          </div>
        </div>
      </div>
      <div
        className={`mx-auto mb-4 [background:linear-gradient(180deg,rgba(52,58,64,0)_51.5%,rgba(0,0,0,0.6)_100%)] w-[90%] rounded-[20px]`}
      >
        <div
          className={`border border-solid border-[#e0dcdc42] w-full flex flex-col items-start gap-5 p-5 rounded-[20px] [-webkit-backdrop-filter:blur(12.6px)_brightness(100%)] bg-[#e0dcdc99] backdrop-blur-[12.6px] backdrop-brightness-[100%] relative`}
        >
          <div className="w-full flex self-stretch flex-col items-start gap-2 h-[75px] relative">
            <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] relative">
              <div className="[font-family:'Merriweather',Helvetica] mt-[-1.00px] tracking-[0] text-lg flex-1 text-[#343a40] relative font-bold leading-[25.2px]">
                {blog?.title}
              </div>
            </div>

            <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] justify-center mb-[-21.00px] relative">
              <p className="[font-family:'Montserrat',Helvetica] mt-[-1.00px] tracking-[0] text-sm flex-1 text-[#343a40] relative font-medium leading-[21px]">
                {blog?.description}
              </p>
            </div>
          </div>

          <div className="w-[151px] flex items-center gap-2.5 flex-[0_0_auto] relative">
            <img
              className="w-10 object-cover h-10 relative"
              alt="Ellipse"
              src={strapiUrl + blog?.author?.avatar?.formats.small.url}
            />

            <div className="flex items-center grow gap-2.5 flex-1 relative">
              <div className="[font-family:'Montserrat',Helvetica] w-full mt-[-1.00px] tracking-[0] text-base mr-[-143.00px] text-[#343a40] relative font-medium leading-[22.4px]">
                {blog?.author?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
