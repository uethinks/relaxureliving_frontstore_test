import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import V2Headline from "./V2Headline"
import V2Button from "./V2Button"

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
  mediaPosition: string
  image: Media
  button: any
}

interface FeatureGridData {
  __component: string
  id: number
  title: string
  subtitle: string | null
  items: FeatureItem[]
  backgroundColor?: string
}

interface FeatureGridProps {
  data: FeatureGridData
}

export function V2FeatureGridSection({ data }: FeatureGridProps) {
  return (
    <section className={`w-full pt-20 pb-14 px-4 ${getBackgroundColor(data.backgroundColor)}`} aria-labelledby="features-heading">
      <div className="">
        {/* Main Heading */}
        <header className="text-center mb-10">
          <V2Headline
            title={data.title}
            as="h1"
            size="xl"
            className="mb-4 w-full"
            iconHidden
          />
          {data.subtitle && <p className="text-xl text-[#8c877c] max-w-2xl mx-auto">{data.subtitle}</p>}
        </header>

        {/* Features Grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {data.items.map((item) => (
            <div key={item.id} className="w-full sm:w-auto sm:flex-1 max-w-[33.33%]">
              <FeatureCard item={item} />
            </div>
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
  console.log('item:', item)
  // Use the best available image format
  const imageUrl = item.image?.url
  const imageAlt = item.image?.alternativeText || `${item.title} feature illustration`

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-0 flex flex-col items-center justify-start">
        {/* Feature Image */}
        {imageUrl && <div className="w-full mb-4 overflow-hidden bg-white/50">
          <Image
            unoptimized
            src={getStrapiUrl(imageUrl)}
            alt={imageAlt}
            width={item.image.width}
            height={item.image.height}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>}

        {/* Feature Content */}
        <div className="h-24 mb-6">
          <p className="text-2xl font-semibold text-center">{item.title}</p>
          <p className="text-[#8c877c] text-sm mt-2 text-center">{item.description}</p>
        </div>

        {item.button && <V2Button data={item.button as any} className="self-center" />}
      </CardContent>
    </Card>
  )
}
