import { getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import V2Button from "./V2Button"
import V2Headline from "./V2Headline"
import V2MediaRenderer from "./V2MediaRenderer"

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
  useH1: boolean
}

interface HeroSectionProps {
  data: HeroData
  sectionPriority?: "high" | "normal"
}

export function V2PromoBanner({ data, sectionPriority = "normal" }: HeroSectionProps) {
  const { content, backgroundImage, useH1 = false } = data
  const { isStatic = false } = backgroundImage
  const { isReverse = false } = content
  
  console.log('V2PromoBanner useH1', useH1)
  return (
    <section
      className="relative w-full flex flex-col lg:flex-row lg:items-center"
      role="banner"
      aria-label="Hero section"
    >
      {/* Image Wrap */}
      <div className="w-full lg:relative">
        {isStatic ? (
          <V2MediaRenderer
            media={backgroundImage as any}
            options={{
              type: "media",
              className: "w-full h-[53.33vw] lg:h-auto object-cover object-center lg:object-contain",
              imageOptions: {
                priority: sectionPriority === "high",
              }
            }}
          />
        ) : (
          <V2MediaRenderer
            media={backgroundImage as any}
            options={{
              type: "media",
              className: "w-full h-[53.33vw] lg:h-auto object-cover object-center lg:object-contain",
              imageOptions: {
                priority: sectionPriority === "high",
              }
            }}
          />
        )}
      </div>

      {/* Content Wrap */}
      <div
        className={`bg-black lg:bg-transparent w-full px-6 pt-6 pb-12 lg:absolute lg:inset-0 lg:z-10 lg:max-w-[1074px] lg:mx-auto lg:flex lg:flex-col lg:justify-center ${
          isReverse ? "lg:items-end" : "lg:items-start"
        }`}
      >
        <div className="w-full lg:w-[50%] lg:max-w-[436px]">
          {/* title wrap */}
          <V2Headline
            title={content.title || ""}
            className="text-white text-2xl lg:text-[32px] lg:leading-tight"
            as={useH1 ? "h1" : "h2"}
          />

          {/* description wrap */}
          <div className="text-white text-sm lg:text-base mt-5 mb-6 lg:mb-8 lg:mt-8">
            <p className="max-w-prose">{content.description}</p>
          </div>

          {/* button wrap */}
          {content.button && (
            <V2Button
              data={{
                ...(content.button as any),
                size: "Medium",
              }}
              className={"w-full"}
            />
          )}
        </div>
      </div>
    </section>
  )
}
