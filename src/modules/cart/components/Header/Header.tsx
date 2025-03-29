"use client"
import React from "react"
import { Button } from "../Button/Button"
import { useRouter } from "next/navigation"
export const Header = (): JSX.Element => {
  const router = useRouter()
  return (
    <div className="flex w-[1248px] h-[75px] items-center justify-end gap-[305px] p-5 bg-[#f4f4f4cc] rounded-[20px] backdrop-blur-[13.8px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(13.8px)_brightness(100%)] shadow-relaxureblur-background">
      <div className="relative w-[76.45px] h-12 mt-[-6.50px] mb-[-6.50px] ml-[-1.45px] bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/logo.svg)] bg-[100%_100%]" />
      <div className="inline-flex items-center gap-[54px] relative flex-[0_0_auto] mt-[-6.50px] mb-[-6.50px]">
        <div className="flex w-[574px] h-11 items-center justify-end gap-10 relative">
          <div className="flex w-[111px] items-center justify-center gap-2.5 px-0 py-2.5 relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
              Accesories
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
              Features
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
              Our pergola
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
              About us
            </div>
          </div>
        </div>
        <Button text="Contact us" onClick={() => router.push("/us/contact")} />
      </div>
    </div>
  )
}
