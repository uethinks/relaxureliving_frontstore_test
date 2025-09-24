import type { V2HeroBannerData } from "@/types/hero-banner"
import { getStrapiUrl } from "@lib/utils"
import { V2Button } from "./V2Button"

interface V2HeroBannerProps {
  data: V2HeroBannerData
}

export default function V2HeroBanner({ data }: V2HeroBannerProps) {
  const { title, description, button, backgroundImage } = data

  console.log("data: ", data)
  console.log("backgroundImage: ", backgroundImage)

  return (
    <section className="relative w-full lg:min-h-[720px] flex flex-wrap lg:items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="lg:absolute inset-0 z-0 flex-grow-0 flex-shrink-0 basis-auto w-full">
        <img
          src={getStrapiUrl(backgroundImage.url) || "/placeholder.svg"}
          alt="Outdoor living space with pergola"
          className="w-full lg:h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="hidden lg:block absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative w-full lg:w-[1074px] mx-auto bg-[#140E02] lg:bg-transparent p-6 pb-12 lg:p-0">
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
                  data={{ ...button, size: button.sizeMobile } as any}
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
