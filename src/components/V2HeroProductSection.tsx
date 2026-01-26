import { getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import V2Button from "./V2Button"
import V2Headline from "./V2Headline"
import V2MediaRenderer from "./V2MediaRenderer"

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
  sectionPriority?: "high" | "normal"
}

export default function V2HeroProductSection({
  data,
  sectionPriority = "high",
}: {
  data: V2HeroProductSectionProps
  sectionPriority?: "high" | "normal"
}) {
  const { title, description, button, image } = data

  return (
    <section className="w-full h-auto lg:h-[480px] flex lg:items-center lg:justify-center">
      <div className="max-w-[1074px] w-full h-auto lg:h-full grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
        {/* Left side - Pergola Image */}
        <div className="w-full h-auto lg:h-[480px] overflow-hidden">
          <V2MediaRenderer
            media={image as any}
            options={{
              type: image.id <= 2 ? "hero" : "media",
              imageOptions: {
                priority: sectionPriority === "high",
              },
            }}
          />
        </div>

        {/* Right side - Content */}
        <div className="space-y-8 flex flex-col justify-center items-start w-full px-6 pt-5 pb-[50px] lg:p-0">
          <header className="space-y-4">
            <V2Headline title={title} as="h2" size="md" />
          </header>
          <p className="text-base text-[#2f2a1e] max-w-lg whitespace-pre-line">
            {description}
          </p>
          {button && <V2Button data={button as any} className={"w-full"} />}
        </div>
      </div>
    </section>
  )
}
