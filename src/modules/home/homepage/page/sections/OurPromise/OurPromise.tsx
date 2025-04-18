import React from "react"

interface PromiseCardProps {
  icon: string
  description: string
}

const PromiseCard: React.FC<PromiseCardProps> = ({ icon, description }) => {
  return (
    <div className="flex flex-col gap-4 p-6 w-full rounded-lg">
      <img src={icon} alt="Feature icon" className="w-12 h-12" />
      <h3 className="text-[#343a40] text-[20px] font-semibold">
        We are the gift that keeps giving
      </h3>
      <p className="text-[#68717a] text-[14px]">{description}</p>
    </div>
  )
}

export const OurPromise = (): JSX.Element => {
  const promiseCards = [
    {
      icon: "/img/calendar.png",
      description:
        "We use only commercial-grade aluminum and stainless steel hardware —the same materials used in high-end commercial buildings where cutting corners isn't an option. Our premium powder coating is designed for permanent long-term outdoor use so colors don't fade, scratch, or fall off.",
    },
    {
      icon: "/img/checked.png",
      description:
        "Our 15-year total warranty is three times the industry standard, reflecting our confidence in every weld, joint, and component—because we'd rather spend money on quality materials than warranty claims.",
    },
    {
      icon: "/img/car.png",
      description:
        "Your pergola ships within XXX days—completely free!—and arrives at your door in clearly labeled, fully protected packaging. We coordinate delivery timing with you and ensure all components arrive together—so your outdoor transformation can begin right away without waiting or wondering.",
    },
    {
      icon: "/img/barge.png",
      description:
        "Our pre-assembled modular sections connect like building blocks, allowing installation in just 2-3 hours with clear instructions and video guidance—transforming your Saturday project into Saturday evening entertainment.",
    },
  ]

  return (
    <div className="w-full bg-[#F3F3F3] mt-[120px]">
      <div className="p-10 w-full 2xl:w-[1512px] px-20 mx-auto">
        <div className="flex flex-col lg:gap-[132px] md:items-center lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section */}
          <div className="flex flex-col gap-5 w-full md:w-[600px] lg:w-1/3 mb-10 lg:mb-0">
            <h2 className="text-[#343a40] text-[36px] font-bold">
              The Boring But Important Stuff
            </h2>
            <p className="text-[#68717a] text-[18px]">
              These details might not be flashy, but they're why you'll love
              your Relaxure pergola from the day it arrives and for decades
              more!
            </p>
          </div>

          {/* Right Section - Grid of Cards */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 w-full md:w-full lg:w-2/3">
            {promiseCards.map((card, index) => (
              <PromiseCard
                key={index}
                icon={card.icon}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
