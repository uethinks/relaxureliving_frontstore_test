import { Card, CardContent } from "@/components/ui/card"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import { CustomCarousel } from "./CustomCarousel"
import V2Headline from "./V2Headline"
import V2MediaRenderer from "./V2MediaRenderer"

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
  isMobile?: boolean
}

export function V2FeatureCards({ data, isMobile = false }: FeatureCardsProps) {
  return (
    <section
      className={`w-full pt-8 pb-5 lg:pt-20 lg:pb-14 max-lg lg:px-4 ${getBackgroundColor(
        data.backgroundColor
      )}`}
      aria-labelledby="features-heading"
    >
      <div className="w-full flex flex-col gap-5">
        {/* Main Heading */}
        <div className={"max-lg:px-6"}>
          <header className="text-center">
            <V2Headline
              title={data.title}
              as="h1"
              size="xl"
              className="w-full lg:max-w-[1074px] mx-auto"
              iconHidden
            />
          </header>
          {data.description && (
            <p className="text-center text-sm lg:text-lg lg:max-w-[1074px] mx-auto mb-2 text-[#8C877C]">
              {data.description}
            </p>
          )}
        </div>

        {/* Features Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {isMobile ? (
            <CustomCarousel
              data={data.items.map((item) => (
                <FeatureCard key={item.id} item={item} />
              ))}
              showNav={false}
            />
          ) : (
            data.items.map((item) => <FeatureCard key={item.id} item={item} />)
          )}
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
  const iconUrl = item.icon?.url
  const iconAlt = item.icon?.alternativeText || `${item.title} icon`

  return (
    <Card className={`bg-transparent border-none shadow-none`}>
      <CardContent className="p-0 flex max-lg:flex-col lg:h-[224px] max-lg:px-6">
        {/* Yellow vertical line */}
        <div className="hidden w-[1px] bg-[#f4d03f] mr-6 flex-shrink-0"></div>
        <div className="lg:hidden w-full h-[1px] bg-[#f4d03f] mr-6 flex-grow-0 basis-auto flex-shrink-0 mb-8"></div>

        {/* Content */}
        <div className="flex w-full max-lg:flex-col justify-between gap-12">
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
            <div className="lg:h-full aspect-square">
              <V2MediaRenderer
                media={item.image}
                options={{
                  objectFit: "cover",
                  imageOptions: {
                    sizes:
                      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
                  },
                }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default V2FeatureCards
