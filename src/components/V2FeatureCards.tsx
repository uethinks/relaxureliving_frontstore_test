import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getStrapiUrl } from "@lib/utils"
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
}

interface FeatureCardsData {
  __component: string
  id: number
  title: string
  items: FeatureItem[]
}

interface FeatureCardsProps {
  data: FeatureCardsData
}

export function V2FeatureCards({ data }: FeatureCardsProps) {
  return (
    <section className="w-full bg-white pt-20 pb-14 px-4" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <header className="text-center mb-16">
          <V2Headline
            title={data.title}
            as="h1"
            size="xl"
            className="mb-4 max-w-7xl mx-auto"
            iconHidden
          />
        </header>

        {/* Features Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
  // Use the best available icon format
  const iconUrl = item.icon.formats?.thumbnail?.url || item.icon.url
  const iconAlt = item.icon.alternativeText || `${item.title} icon`

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-0 flex h-full">
        {/* Yellow vertical line */}
        <div className="w-1 bg-[#f4d03f] mr-6 flex-shrink-0"></div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Icon */}
          <div className="mb-4">
            <Image
              src={getStrapiUrl(iconUrl)}
              alt={iconAlt}
              width={item.icon.width}
              height={item.icon.height}
              className="w-14 h-14 object-contain"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[#140e02] mb-3 leading-tight">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-[#8c877c] text-sm leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default V2FeatureCards