import { Card, CardContent } from "@/components/ui/card"
import { getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import { CustomCarousel } from "./CustomCarousel"

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
    small?: MediaFormat
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
  media: Media
}

interface V2OccasionsSectionData {
  __component: string
  id: number
  title: string
  subtitle: string
  items: FeatureItem[]
}

interface V2OccasionsSectionProps {
  data: V2OccasionsSectionData
  isMobile: boolean
}

export default function V2OccasionsSection({
  data,
  isMobile = false,
}: V2OccasionsSectionProps) {
  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(239, 238, 235, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%)",
      }}
      aria-labelledby="features-heading"
    >
      <div className="max-w-[1074px] w-full mx-auto">
        {/* Header Section */}
        <header className="text-center mb-0 py-8 px-6 lg:px-0 lg:pt-[70px] lg:pb-[60px]">
          <h1
            id="features-heading"
            className="text-foreground text-2xl lg:text-h2 font-bold mb-2.5 lg:mb-6 leading-tight"
          >
            {data.title}
          </h1>
          <p className="text-muted-foreground w-full lg:text-lg mx-auto leading-relaxed text-sm lg:max-w-none">
            {data.subtitle}
          </p>
        </header>

        {/* Features Grid */}
        {isMobile ? (
          <CustomCarousel
            showNav={false}
            data={data.items.map((item, key) => (
              <div key={key} className={"w-full px-6"}>
                <img
                  src={getStrapiUrl(item.media.url)}
                  alt={item.media.alternativeText || item.title}
                  className="w-full h-[43.467vw] object-cover mb-5"
                />
                <h3 className="text-base font-semibold mb-[10px] text-[#2F2A1E]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8C877C]">{item.description}</p>
              </div>
            ))}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {data.items.map((item) => (
              <Card
                key={item.id}
                className="border-0 shadow-none bg-transparent"
              >
                <CardContent className="p-0 space-y-6">
                  <div className="aspect-[525/262] overflow-hidden bg-muted">
                    <Image
                      unoptimized
                      src={getStrapiUrl(item.media.url)}
                      alt={item.media.alternativeText || item.title}
                      width={item.media.width}
                      height={item.media.height}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      priority={item.id <= 2} // Prioritize first two images
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <h3 className="text-foreground text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
