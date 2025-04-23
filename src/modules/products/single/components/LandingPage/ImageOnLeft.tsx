import React from "react"
import YouTube from "react-youtube"

export const ImageOnLeft = (): JSX.Element => {
  const actualVideoId = "qtfijujZKO0"

  return (
    <div className="w-full inline-flex flex-col items-center gap-[60px] relative mt-10">
      <div className="flex flex-col w-full items-center justify-center gap-2.5 relative">
        <p className="relative w-full font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] text-start tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          Welcome to outdoor living, perfected!
        </p>
        <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
          Hands full? Simply speak and your pergola responds. Seamlessly
          integrated with your smart home system, we bring intelligent control
          to your outdoor space—adjusting shade, lighting, and locks with a
          word. It's the favorite way to adjust your pergola for kids and
          grown-ups alike!
        </p>
        <div className="w-full rounded-[20px] overflow-hidden">
          {actualVideoId ? (
            <YouTube
              videoId={actualVideoId}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              }}
              className="w-full aspect-video"
            />
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-[68px] gap-y-[40px]">
        {/* WiFi app and all-in-one */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-2.5">
            <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
              WiFi app and all-in-one
            </h3>
            <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
              For intuitive climate control, allowing you to even define presets
              for different weather conditions and activities.
            </p>
          </div>
          <div className="mt-5 relative w-full aspect-[3/2] rounded-[20px] overflow-hidden">
            <img
              src="/img/wifi.webp"
              alt="WiFi app control"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* Intelligent rain sensors */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-2.5">
            <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
              Intelligent rain sensors
            </h3>
            <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
              Automatically close louvers during unexpected showers, protecting
              your outdoor furnishings even when you're away.
            </p>
          </div>
          <div className="mt-5 relative w-full aspect-[3/2] rounded-[20px] overflow-hidden">
            <img
              src="/img/rain.webp"
              alt="Rain sensor"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* Motorized louvers */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-2.5">
            <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
              Motorized louvres
            </h3>
            <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
              With 0-100% adjustability let you perfect your outdoor environment
              for any occasion, from full sunshine to complete shade.
            </p>
          </div>
          <div className="mt-5 relative w-full aspect-[3/2] rounded-[20px] overflow-hidden">
            <img
              src="/img/motorized.webp"
              alt="Motorized louvers"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* Sophisticated RGB LED */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-2.5">
            <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
              Sophisticated RGB LED
            </h3>
            <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
              Lighting system around the gutter and louvers extends your outdoor
              enjoyment well into the evening with adjustable white and warm
              light options.
            </p>
          </div>
          <div className="mt-5 relative w-full aspect-[3/2] rounded-[20px] overflow-hidden">
            <img
              src="/img/led.gif"
              alt="RGB LED lighting"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* Outdoor-resistant */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-2.5">
            <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
              Outdoor-resistant
            </h3>
            <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
              Powder-coated finish, designed for permanent long-term use so
              colors stay as pristine as the day you assembled it.
            </p>
          </div>
          <div className="mt-5 relative w-full aspect-[3/2] rounded-[20px] overflow-hidden">
            <img
              src="/img/outdoor.jpg"
              alt="Outdoor resistant"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* Commercial-grade aluminum */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-2.5">
            <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40] mb-5">
              Commercial-grade aluminum
            </h3>
            <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
              Frame with patented 45° Beam to Post connection and 2-blade
              strengthened louvers, engineered to withstand winds up to 130mph,
              snow loads of 35-50lbs per square foot, even earthquakes exceeding
              7.0 Richter without frame distortion, anchor and connection
              failures, tipping, or collapsing.
            </p>
          </div>
          <div className="relative w-full aspect-[3/2] rounded-[20px] overflow-hidden">
            <img
              src="/img/commercial.webp"
              alt="Commercial grade aluminum"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
