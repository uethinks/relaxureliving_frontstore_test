import React, { useState } from "react"
import { AddAccessories } from "./AddAccessories"
import { ImageText } from "./ImageText"
import Link from "next/link"
export const Accessories = (): JSX.Element => {
  type ImageKey = "Glass Door" | "Heater" | "Shades"
  const [selectedOption, setSelectedOption] = useState<ImageKey>("Glass Door")

  const images: Record<ImageKey, string> = {
    "Glass Door": "https://c.animaapp.com/7L3Jjiza/img/img-3.png",
    Heater: "https://c.animaapp.com/7L3Jjiza/img/img-1.png",
    Shades: "https://c.animaapp.com/7L3Jjiza/img/img-2.png",
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option as ImageKey)
  }

  return (
    <div
      id="accessories"
      className="flex w-[1352px] h-[785px] items-center justify-center gap-2.5 px-20 py-0 relative bg-[#ffffff] rounded-[20px] border border-solid border-transparent"
    >
      <div
        className={`absolute w-[625px] h-[628px] top-[81px] left-[26px] rounded-[20px] overflow-hidden bg-cover bg-[50%_50%]`}
        style={{ backgroundImage: `url(${images[selectedOption]})` }}
      >
        <div className="inline-flex items-start gap-5 relative top-[50px] left-[85px]">
          {["Glass Door", "Heater", "Shades", "Discover"].map((option) => (
            <button
              key={option}
              className={`inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] ${
                selectedOption === option
                  ? "bg-[#ffffff73] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73]"
                  : "bg-[#ffffff73]"
              } rounded-[30px] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]`}
              onClick={() => option !== "Discover" && handleOptionClick(option)}
            >
              <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-lg tracking-[0] leading-[27px] whitespace-nowrap">
                {option}
              </div>
            </button>
          ))}
        </div>
      </div>

      <ImageText
        className="!h-[785.5px] !rounded-[26.18px] !mt-[-0.25px] !ml-[-80.25px] !mb-[-0.25px] !relative bg-[url(https://c.animaapp.com/7L3Jjiza/img/rectangle-1274-4.svg)] !w-[785.5px]"
        contentClassName="!h-[175px] !rounded-[26.18px] !gap-[20.95px] !border-[1.31px] !border-solid !p-[13.09px] !left-[58px] !w-[670px] !top-[566px]"
        frameClassName="!h-[149.24px] !rounded-[11.94px] !max-w-[117.82px] bg-[url(https://c.animaapp.com/7L3Jjiza/img/frame-55-4.svg)]"
        frameClassNameOverride="!gap-[10.47px] !mb-[-29.23px]"
        loremIpsumDolorClassName="!mt-[-1.31px] !text-[18.3px] !leading-[27.5px]"
        loremIpsumDolorWrapperClassName="!gap-[13.09px]"
        mediumLengthHeroClassName="!mt-[-1.31px] !text-[23.6px] !leading-[33.0px]"
        mediumLengthHeroWrapperClassName="!gap-[13.09px]"
        property1="variant-3"
      />
      <div className="flex-col w-[557px] justify-center gap-[30px] px-0 py-[88px] self-stretch mr-[-80.25px] flex items-start relative">
        <div className="inline-flex flex-col h-[788px] items-start justify-center gap-10 px-5 py-0 relative mt-[-89.50px] mb-[-89.50px] mr-[-40.00px]">
          <div className="inline-flex flex-col items-start gap-[60px] relative flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start gap-10 relative flex-[0_0_auto]">
              <div className="flex w-[557px] items-center gap-5 relative flex-[0_0_auto]">
                {["Glass Door", "Heater", "Shades"].map((option) => (
                  <button
                    key={option}
                    className={`flex flex-col w-[162px] items-center justify-center gap-[10.47px] p-5 relative rounded-[44px] ${
                      selectedOption === option
                        ? "bg-[#ffffff] border-2 border-solid border-[#072f6c] shadow-shadow-cards-relaxure"
                        : "border border-solid border-[#e8e8ea]"
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="flex items-center justify-center gap-[13.09px] relative self-stretch w-full flex-[0_0_auto]">
                      <div
                        className={`relative flex-1 mt-[-1.31px] [font-family:'Montserrat',Helvetica] font-medium text-[22px] text-center tracking-[0] leading-[30.8px] ${
                          selectedOption === option
                            ? "text-[#072f6c]"
                            : "text-[#69727a]"
                        }`}
                      >
                        {option}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col w-[557px] items-end gap-2.5 relative flex-[0_0_auto]">
                <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative flex-1 tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
                    Make It Yours
                  </div>
                </div>

                <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="w-[428px] mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                    Choose the right accessories that elevate your outdoor
                    living.
                  </p>
                </div>
              </div>
            </div>
            <Link href="/us/products/pergola">
              <AddAccessories
                className="!flex-[0_0_auto]"
                property1="primary-button-l"
                text="Add accessory"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
