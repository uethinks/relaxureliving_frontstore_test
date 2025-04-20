import React from "react"

export const Description = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-start gap-4 relative">
      <div className="flex flex-col items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div
          style={{
            backgroundImage: `url("/img/pergola2.jpg")`,
          }}
          className="w-full lg:mb-[60px] h-[600px] rounded-[20px] bg-no-repeat bg-cover bg-[50%_50%]"
        ></div>
        <div className="flex items-center justify-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            Discover the Corsica
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto] lg:mt-[30px]">
          <p className="relative flex-1 mt-[-1.00px] font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[#68717a] text-[14px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
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
    </div>
  )
}
