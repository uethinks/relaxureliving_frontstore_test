import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getStrapiUrl } from "@lib/utils"
import V2Headline from "./V2Headline"
import V2Button from "./V2Button"

interface ButtonData {
  id: number
  type: string
  size: string | null
  text: string
  link: string | null
  icon: string | null
}

interface ImageData {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    small: {
      url: string
      width: number
      height: number
    }
    xsmall: {
      url: string
      width: number
      height: number
    }
    thumbnail: {
      url: string
      width: number
      height: number
    }
  }
  url: string
}

interface V2HeroProductSectionProps {
  id: number
  title: string
  description: string
  button: ButtonData
  image: ImageData
}

export default function V2HeroProductSection({
  data,
}: {
  data: V2HeroProductSectionProps
}) {
  const { title, description, button, image } = data

  return (
    <section className="w-full h-[480px] flex items-center justify-center">
      <div className="max-w-7xl w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left side - Pergola Image */}
        <div className="h-[480px] overflow-hidden">
          <Image  
            unoptimized
            src={getStrapiUrl(image.url)}
            alt={
              image.alternativeText ||
              `Modern ${title.toLowerCase()} for outdoor luxury living`
            }
            width={image.width}
            height={image.height}
            className="object-contain h-full w-full"
            // priority -- remove it for lazy loading, as it is above the fold
          />
        </div>

        {/* Right side - Content */}
        <div className="space-y-8">
          <header className="space-y-4">
            <V2Headline title={title} as="h1" size="md" />
          </header>
          <p className="text-base text-[#2f2a1e] max-w-lg whitespace-pre-line">
            {description}
          </p>
          <V2Button data={button as any} />
        </div>
      </div>
    </section>
  )
}
