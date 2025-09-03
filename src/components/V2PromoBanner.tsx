import { Button } from "@/components/ui/button"
import { getStrapiUrl } from "@lib/utils"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import V2Headline from "./V2Headline"
import V2Button from "./V2Button"

interface HeroData {
  __component: string
  id: number
  content: {
    id: number
    description: string
    title?: string | null
    icon?: any
    button: {
      id: number
      type: string
      size?: string | null
      text: string
      link: string
    }
    image?: any
  }
  backgroundImage: {
    id: number
    documentId: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    width: number
    height: number
    formats: {
      large: { url: string; width: number; height: number }
      medium: { url: string; width: number; height: number }
      small: { url: string; width: number; height: number }
      xsmall: { url: string; width: number; height: number }
      thumbnail: { url: string; width: number; height: number }
    }
    url: string
  }
}

interface HeroSectionProps {
  data: HeroData
}

export function V2PromoBanner({ data }: HeroSectionProps) {
  const { content, backgroundImage } = data

  const generateSizes = () => {
    return "(max-width: 640px) 500px, (max-width: 1024px) 750px, 1000px"
  }

  return (
    <section className="relative min-h-screen w-full flex items-center" role="banner" aria-label="Hero section">
      <div className="absolute inset-0 z-0">
        <Image
          src={getStrapiUrl(backgroundImage.url)}
          alt={backgroundImage.alternativeText || "Relaxure pergola assembly process"}
          fill
          className="object-cover w-full"
          priority
          // sizes={generateSizes()}
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl lg:max-w-3xl w-[436px]">
          <V2Headline title={content.title || ""} className="text-white" />

          <div className="text-white text-base mb-8 mt-8">
            <p className="max-w-prose">{content.description}</p>
          </div>
          {content.button && <V2Button data={content.button as any} />}
        </div>
      </div>
    </section>
  )
}
