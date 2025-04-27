import React from "react"
import { PergolaData } from "@/types/global"
interface PromiseCardProps {
  icon: string
  description: string
  title: string
}

const PromiseCard: React.FC<PromiseCardProps> = ({
  icon,
  description,
  title,
}) => {
  return (
    <div className="flex flex-col gap-4 p-6 w-full rounded-lg">
      <img src={icon} alt="Feature icon" className="w-12 h-12" />
      <h3 className="text-[#343a40] text-[16px] lg:text-[20px] font-relaxure-sub-heading-18">
        {title}
      </h3>
      <p className="text-[#68717a] text-[14px] font-relaxure-sub-heading-18">
        {description}
      </p>
    </div>
  )
}

export const OurPromise = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  const boringButImportantStuff = pergolaData?.boringButImportantStuff
  const promiseCards = boringButImportantStuff?.Promise || []
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

  return (
    <div className="w-full bg-[#F3F3F3] mt-10 lg:mt-[120px]">
      <div className="p-10 w-full 2xl:w-[1910px] px-4 md:px-20 mx-auto">
        <div className="flex flex-col justify-start items-center lg:gap-[132px] md:items-center lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section */}
          <div className="flex flex-col justify-start items-start text-center lg:text-left gap-5 w-full md:w-[600px] lg:w-1/3 mb-10 lg:mb-0">
            <h2 className="text-[#343a40] text-[18px] font-heading-2 lg:text-[36px] font-bold mx-auto lg:mx-0">
              {boringButImportantStuff?.Title}
            </h2>
            <p className="text-[#68717a] text-[18px] font-relaxure-sub-heading-18">
              {boringButImportantStuff?.Description}
            </p>
          </div>

          {/* Right Section - Grid of Cards */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 w-full md:w-full lg:w-2/3">
            {promiseCards.map((card, index) => (
              <PromiseCard
                key={index}
                icon={`${strapiBaseUrl}${card.Icon.url}`}
                title={card.Title}
                description={card.Description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
