import React from "react"

interface Props {
  property1: "variant-3"
  className: string
  contentClassName: string
  frameClassName: string
  frameClassNameOverride: string
  mediumLengthHeroWrapperClassName: string
  mediumLengthHeroClassName: string
  loremIpsumDolorWrapperClassName: string
  loremIpsumDolorClassName: string
}

export const ImageText = ({
  property1,
  className,
  contentClassName,
  frameClassName,
  frameClassNameOverride,
  mediumLengthHeroWrapperClassName,
  mediumLengthHeroClassName,
  loremIpsumDolorWrapperClassName,
  loremIpsumDolorClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`w-[600px] h-[600px] rounded-[20px] overflow-hidden bg-[100%_100%] ${className}`}
    >
      <div
        className={`flex w-[512px] h-[134px] items-start gap-4 p-2.5 relative top-[432px] left-11 bg-[#ffffff73] rounded-[20px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)] ${contentClassName}`}
      >
        <div
          className={`relative flex-1 max-w-[90px] grow h-[114px] rounded-[9.12px] bg-[url(https://c.animaapp.com/7L3Jjiza/img/frame-55-3.svg)] bg-cover bg-[50%_50%] ${frameClassName}`}
        />

        <div
          className={`flex flex-col items-start gap-2 relative flex-1 grow mb-[-24.00px] ${frameClassNameOverride}`}
        >
          <div
            className={`flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] ${mediumLengthHeroWrapperClassName}`}
          >
            <p
              className={`relative flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] leading-[25.2px] ${mediumLengthHeroClassName}`}
            >
              Side Screens &amp; Privacy Panels
            </p>
          </div>

          <div
            className={`flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] ${loremIpsumDolorWrapperClassName}`}
          >
            <p
              className={`relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-sm tracking-[0] leading-[21px] ${loremIpsumDolorClassName}`}
            >
              Transform hot or windy days into perfect outdoor moments with
              elegant side screens that block harsh sunrays and strong gusts
              while creating a private sanctuary.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
