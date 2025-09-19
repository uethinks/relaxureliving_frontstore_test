import { getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import V2Button from "./V2Button"
import V2Headline from "./V2Headline"

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
    isReverse?: false
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
    isStatic?: boolean
  }
}

interface HeroSectionProps {
  data: HeroData
}

export function V2PromoBanner({ data }: HeroSectionProps) {
  const { content, backgroundImage } = data
  const { isStatic = false } = backgroundImage
  const { isReverse = false } = content

  const generateSizes = () => {
    return "(max-width: 640px) 500px, (max-width: 1024px) 750px, 1000px"
  }

  return (
    <section
      className="relative w-full flex items-center"
      role="banner"
      aria-label="Hero section"
    >
      {isStatic ? (
        <img src={backgroundImage.url} className="w-full h-auto" />
      ) : (
        <Image
          unoptimized
          src={getStrapiUrl(backgroundImage.url)}
          alt={
            backgroundImage.alternativeText ||
            "Relaxure pergola assembly process"
          }
          width={backgroundImage.width}
          height={backgroundImage.height}
          className="w-full h-auto"
          priority
          // sizes={generateSizes()}
          quality={85}
        />
      )}

      <div
        className={`absolute inset-0 z-10 w-full max-w-[1074px] mx-auto flex flex-col justify-center ${
          isReverse ? "items-end" : "items-start"
        }`}
      >
        <div className="w-[50%]">
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
