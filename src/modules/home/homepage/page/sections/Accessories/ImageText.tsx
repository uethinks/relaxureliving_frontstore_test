import React from "react"

interface Props {
  largeImage: string
  smallImage: string
  subTitle: string
  description: string
  show: boolean
}

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
export const ImageText = ({
  largeImage,
  smallImage,
  subTitle,
  description,
  show,
}: Props): JSX.Element => {
  return (
    <div
      style={{
        backgroundImage: `url("${strapiUrl}${largeImage}")`,
      }}
      className={`flex flex-col items-center justify-end !h-[785.5px] !rounded-[26.18px] !relative w-full overflow-hidden bg-cover bg-[100%_100%] ${
        show ? "block" : "hidden"
      }`}
    >
      <div
        className={`mx-auto mb-10 !h-[175px] !rounded-[26.18px] !gap-[20.95px] !border-[1.31px] !border-solid !p-[13.09px] w-[90%] flex items-start relative bg-[#ffffff73] border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]`}
      >
        <div
          style={{
            backgroundImage: `url("${strapiUrl}${smallImage}")`,
          }}
          className={`!h-[149.24px] !rounded-[11.94px] !max-w-[117.82px] --- relative flex-1 grow bg-cover bg-[50%_50%]`}
        />

        <div
          className={`flex flex-col items-start relative flex-1 grow !gap-[10.47px] !mb-[-29.23px]`}
        >
          <div
            className={`flex items-center relative self-stretch w-full flex-[0_0_auto] !gap-[13.09px]`}
          >
            <p
              className={`relative flex-1 [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] !mt-[-1.31px] !text-[23.6px] !leading-[33.0px]`}
            >
              {subTitle}
            </p>
          </div>

          <div
            className={`flex items-center justify-center relative self-stretch w-full flex-[0_0_auto] !gap-[13.09px]`}
          >
            <p
              className={`relative flex-1 [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-sm tracking-[0] !mt-[-1.31px] !text-[18.3px] !leading-[27.5px]`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
