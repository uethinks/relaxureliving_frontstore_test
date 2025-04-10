import React from "react"

export const Description = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-start gap-10 relative mt-10">
      <div className="flex flex-col items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div
          style={{
            backgroundImage: `url("/img/pergola-description.jpg")`,
          }}
          className="w-full h-[600px] rounded-[20px] border-4 border-solid border-transparent bg-no-repeat bg-cover bg-[50%_50%]"
        ></div>
        <div className="flex items-center justify-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            Discover the Corsica
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
            Transform your outdoor space into a sophisticated, comfortable
            extension of your home with the Relaxure Corsica. This flagship
            pergola seamlessly blends with modern architecture while solving the
            challenge of unpredictable weather that keeps you indoors.
            <br />
            <br />
            The Corsica features precision-engineered motorized louvers,
            intelligent weather sensors, and intuitive app connectivity—giving
            you complete control over your outdoor environment with just a tap.
            Crafted from commercial-grade materials with meticulous attention to
            detail, it creates the perfect balance of sun, shade, and protection
            year-round. And thanks to our vast range of accessories, you can
            customize outdoor living your way!
            <br />
            <br />
            Whether you&#39;re hosting dinner parties under the stars, enjoying
            a peaceful morning coffee retreat, or simply enhancing your
            property&#39;s value, the Corsica elevates your outdoor living
            experience without the complexity of traditional construction.
          </p>
        </div>
      </div>

      <div className="flex w-[817px] items-center justify-center gap-2.5 px-0 py-2.5 relative flex-[0_0_auto]">
        <p className="relative flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          Welcome to outdoor living, perfected!
        </p>
      </div>

      <div className="flex flex-col w-[817px] h-[720px] items-start gap-10 p-5 relative bg-[#f3f3f3] rounded-[20px]">
        <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
          <div className="relative w-[30px] h-[30px] bg-[url(https://c.animaapp.com/9RVfVlyL/img/group@2x.png)] bg-[100%_100%]" />

          <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px]">
            Intelligent rain sensors automatically close louvers during
            unexpected showers, protecting your outdoor furnishings even when
            you&#39;re away.
          </p>
        </div>

        <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
          <img
            className="relative w-[30px] h-[30.56px]"
            alt="Frame"
            src="https://c.animaapp.com/9RVfVlyL/img/frame-1000004890.svg"
          />

          <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px]">
            WiFi app and all-in-one remote for intuitive climate control,
            allowing you to even define presets for different weather conditions
            and activities.
          </p>
        </div>

        <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
          <img
            className="relative w-[30px] h-[30px]"
            alt="Group"
            src="https://c.animaapp.com/9RVfVlyL/img/group-1@2x.png"
          />

          <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px]">
            Motorized louvers with 0-100% adjustability let you perfect your
            outdoor environment for any occasion, from full sunshine to complete
            shade.
          </p>
        </div>

        <div className="flex h-[91px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
          <img
            className="relative w-[30px] h-[30px]"
            alt="Frame"
            src="https://c.animaapp.com/9RVfVlyL/img/frame-1000004889.svg"
          />

          <p className="mb-[-9.00px] relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px]">
            Sophisticated RGB LED lighting system around the gutter and louvers
            extends your outdoor enjoyment well into the evening with adjustable
            white and warm light options.
          </p>
        </div>

        <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
          <img
            className="relative w-[30px] h-[30px]"
            alt="Frame"
            src="https://c.animaapp.com/9RVfVlyL/img/frame-1000004888.svg"
          />

          <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px]">
            Outdoor-resistant powder-coated finish, designed for permanent
            long-term use so colors stay as pristine as the day you assembled
            it.
          </p>
        </div>

        <div className="flex h-[74px] items-start gap-5 px-0 py-2.5 relative self-stretch w-full">
          <div className="relative w-[38px] h-[33px]">
            <div className="relative h-[33px]">
              <div className="absolute w-9 h-[33px] top-0 left-0">
                <img
                  className="absolute w-[13px] h-[13px] top-5 left-[23px]"
                  alt="Vector"
                  src="https://c.animaapp.com/9RVfVlyL/img/vector.svg"
                />

                <img
                  className="absolute w-[30px] h-[30px] top-0 left-0"
                  alt="Frame"
                  src="https://c.animaapp.com/9RVfVlyL/img/frame-1000004884.svg"
                />
              </div>

              <img
                className="absolute w-2 h-2 top-[7px] left-[30px]"
                alt="Vector"
                src="https://c.animaapp.com/9RVfVlyL/img/vector-1.svg"
              />
            </div>
          </div>

          <p className="mb-[-26.00px] relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#68717a] text-lg tracking-[0] leading-[27px]">
            Commercial-grade aluminum frame and 2-blade strengthened louvers,
            engineered to withstand winds up to 130mph and snow loads of
            35-50lbs per square foot.
          </p>
        </div>
      </div>
    </div>
  )
}
