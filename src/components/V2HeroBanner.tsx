import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { V2HeroBannerData } from "@/types/hero-banner"
import { getStrapiUrl } from "@lib/utils"
import { V2Button } from "./V2Button"

interface V2HeroBannerProps {
  data: V2HeroBannerData
}

export default function V2HeroBanner({ data }: V2HeroBannerProps) {
  const { title, description, button, backgroundImage } = data
  console.log('data: ', data)
  console.log('backgroundImage: ', backgroundImage)

  // Get responsive image sources
  const imageSources = {
    mobile: backgroundImage?.formats?.small?.url || backgroundImage?.url,
    tablet: backgroundImage?.formats?.medium?.url|| backgroundImage?.url,
    desktop: backgroundImage?.formats?.large?.url|| backgroundImage?.url,
  }

  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[720px] flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 1024px)" srcSet={getStrapiUrl(imageSources.desktop)} />
          <source media="(min-width: 768px)" srcSet={getStrapiUrl(imageSources.tablet)} />
          <img
            src={getStrapiUrl(imageSources.mobile) || "/placeholder.svg"}
            alt="Outdoor living space with pergola"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-[1074px] mx-auto">
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-h2 font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-base font-semibold sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl text-white leading-relaxed">
              {description}
            </p>
            {button && <V2Button data={button as any} className="w-full" />}
          </div>
        </div>
      </div>
    </section>
  )
}
