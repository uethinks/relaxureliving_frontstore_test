import React from "react"

export const ImageOnLeft = (): JSX.Element => {
  return (
    <div className="w-full inline-flex flex-col items-center gap-[60px] relative mt-10">
      <div className="flex w-full items-center justify-center gap-2.5 relative">
        <p className="relative w-full font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] text-start tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          Welcome to outdoor living, perfected!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-[68px]">
        {/* WiFi app and all-in-one */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40]">
            WiFi app and all-in-one
          </h3>
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            all-in-one remote for intuitive climate control, allowing you to
            even define presets for different weather conditions and activities.
          </p>
          <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden mt-2.5 border border-gray-100">
            <img
              src="/img/wifi.webp"
              alt="WiFi app control"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>

        {/* Intelligent rain sensors */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40]">
            Intelligent rain sensors
          </h3>
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            Automatically close louvers during unexpected showers, protecting
            your outdoor furnishings even when you're away.
          </p>
          <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden mt-2.5 border border-gray-100">
            <img
              src="/img/rain.webp"
              alt="Rain sensor"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>

        {/* Motorized louvers */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40]">
            Motorized louvers
          </h3>
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            With 0-100% adjustability let you perfect your outdoor environment
            for any occasion, from full sunshine to complete shade.
          </p>
          <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden mt-2.5 border border-gray-100">
            <img
              src="/img/motorized.webp"
              alt="Motorized louvers"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>

        {/* Sophisticated RGB LED */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40]">
            Sophisticated RGB LED
          </h3>
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            Lighting system around the gutter and louvers extends your outdoor
            enjoyment well into the evening with adjustable light options.
          </p>
          <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden mt-2.5 border border-gray-100">
            <img
              src="/img/led.gif"
              alt="RGB LED lighting"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>

        {/* Outdoor-resistant */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40]">
            Outdoor-resistant
          </h3>
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            Powder-coated finish, designed for permanent long-term use so
            colours stay as pristine as the day you assembled it.
          </p>
          <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden mt-2.5 border border-gray-100">
            <img
              src="/img/outdoor.webp"
              alt="Outdoor resistant"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>

        {/* Commercial-grade aluminum */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] lg:text-[36px] font-heading-2 text-[#343a40]">
            Commercial-grade aluminum
          </h3>
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            Frame and Z-blade strengthened louvers, engineered to withstand
            winds up to 130mph and snow loads of 35-50lbs per square foot.
          </p>
          <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden mt-2.5 border border-gray-100">
            <img
              src="/img/commercial.webp"
              alt="Commercial grade aluminum"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
