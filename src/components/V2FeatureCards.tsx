import { Card, CardContent } from "@/components/ui/card"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import V2Headline from "./V2Headline"

interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

interface Media {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    xsmall?: MediaFormat
    thumbnail?: MediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface FeatureItem {
  id: number
  title: string
  description: string
  icon: Media
  image: Media
}

interface FeatureCardsData {
  __component: string
  id: number
  title: string
  items: FeatureItem[]
  description?: string
  backgroundColor?: string
}

interface FeatureCardsProps {
  data: FeatureCardsData
}

export function V2FeatureCards({ data }: FeatureCardsProps) {
  return (
    <section
      className={`w-full pt-20 pb-14 px-4 ${getBackgroundColor(data.backgroundColor)}`}
      aria-labelledby="features-heading"
    >
      <div className="w-full flex flex-col gap-5">
        {/* Main Heading */}
        <header className="text-center">
          <V2Headline
            title={data.title}
            as="h1"
            size="xl"
            className="max-w-[1074px] mx-auto"
            iconHidden
          />
        </header>
        {data.description && (
          <p className="text-center text-lg max-w-[1074px] mx-auto mb-2 text-[#8C877C]">
            {data.description}
          </p>
        )}

        {/* Features Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {data.items.map((item) => (
            <FeatureCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  item: FeatureItem
}

function FeatureCard({ item }: FeatureCardProps) {
  console.log("V2FeatureCards item:", item)
  // Use the best available icon format
  const iconUrl = item.icon?.url
  const iconAlt = item.icon?.alternativeText || `${item.title} icon`

  console.log("item:", item)

  return (
    <Card className={`bg-transparent border-none shadow-none`}>
      <CardContent className="p-0 flex h-[224px]">
        {/* Yellow vertical line */}
        <div className="w-[1px] bg-[#f4d03f] mr-6 flex-shrink-0"></div>

        {/* Content */}
        <div className="flex w-full justify-between gap-12">
          <div className="flex-1 flex flex-col">
            {/* Icon */}
            <div className="mb-4 flex gap-6 items-center">
              {iconUrl && (
                <Image
                  unoptimized
                  src={getStrapiUrl(iconUrl)}
                  alt={iconAlt}
                  width={item.icon?.width}
                  height={item.icon?.height}
                  className="w-14 h-14 object-contain"
                  loading="lazy"
                />
              )}
              {/* Title */}
              <h3 className="text-xl font-bold text-[#140e02]">{item.title}</h3>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-[#8c877c] text-sm leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            )}
          </div>

          {item.image && (
            <div className="h-full aspect-square">
              <img
                src={getStrapiUrl(item.image.url)}
                alt={item.image.alternativeText || ""}
                className="h-full object-cover"
                width={item.image.width}
                height={item.image.height}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default V2FeatureCards
