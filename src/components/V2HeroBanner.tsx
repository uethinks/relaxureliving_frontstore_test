import type { V2HeroBannerData } from "@/types/hero-banner"
import { getStrapiUrl } from "@lib/utils"
import { V2Button } from "./V2Button"
import V2MediaRenderer from "./V2MediaRenderer"

interface V2HeroBannerProps {
  data: V2HeroBannerData
}

export default function V2HeroBanner({ data }: V2HeroBannerProps) {
  const { title, description, button, backgroundImage } = data

  console.log("data: ", data)
  console.log("backgroundImage: ", backgroundImage)

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="w-full">
        <V2MediaRenderer
            media={backgroundImage as any}
            options={{
              // aspectRatio: "525/262",
              className: "w-full h-auto"
            }}
          />
        {/* Overlay for better text readability */}
        <div className="hidden lg:block absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative lg:absolute lg:inset-0 w-full lg:w-[1074px] lg:mx-auto bg-[#140E02] lg:bg-transparent p-6 pb-12 lg:p-0 lg:flex lg:items-center lg:justify-start">
        <div className="w-full lg:w-[525px] text-white">
          <h1 className="text-2xl lg:text-h2 font-bold mb-5 lg:mb-10 leading-normal">
            {title}
          </h1>

          <p className="text-base lg:text-xl font-semibold leading-normal">
            {description}
          </p>
          {button && (
            <>
              {/* 桌面端按钮 */}
              <div className="hidden lg:block">
                <V2Button
                  data={{ ...button, size: button.size } as any}
                  className="w-full mt-12 lg:mt-20"
                />
              </div>
              {/* 移动端按钮 */}
              <div className="block lg:hidden">
                <V2Button
                  data={
                    { ...button, size: button.sizeMobile || "Medium" } as any
                  }
                  className="w-full mt-12 lg:mt-20"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
