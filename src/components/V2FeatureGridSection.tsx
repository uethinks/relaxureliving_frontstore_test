import { Card, CardContent } from "@/components/ui/card"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import { CustomCarousel } from "./CustomCarousel"
import V2Button from "./V2Button"
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
  isMobile?: boolean
}

export function V2FeatureGridSection({
  data,
  isMobile = false,
}: FeatureGridProps) {
  return (
    <section
      className={`w-full py-8 lg:pt-20 lg:pb-14 lg:px-4 ${getBackgroundColor(
        data.backgroundColor
      )}`}
      aria-labelledby="features-heading"
    >
      <div className="px-6 lg:px-0">
        {/* Main Heading */}
        <header className="text-center">
          <V2Headline
            title={data.title}
            as="h1"
            size={isMobile ? "md" : "xl"}
            className="mb-4 w-full"
            iconHidden
          />
          {data.subtitle && (
            <p className="text-sm lg:text-lg text-[#8c877c] max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </header>
      </div>

      {/* Features Grid */}
      {data.items.length > 0 &&
        (isMobile ? (
          <div className={"w-full mt-10"}>
            <CustomCarousel
              showNav={false}
              data={data.items.map((item, key) => {
                const isVideo = item.image?.mime.startsWith("video/")

                return (
                  <div key={key} className={"w-full px-6"}>
                    {isVideo ? (
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
                    ) : (
                      <img
                        src={getStrapiUrl(item.image.url)}
                        alt={item.image.alternativeText || item.title}
                        className="w-full object-cover mb-5"
                      />
                    )}
                    <h3 className="text-base font-semibold mb-[10px] text-[#2F2A1E] text-center">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#8C877C]">{item.description}</p>
                  </div>
                )
              })}
            />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-auto sm:flex-1 max-w-[33.33%]"
              >
                <FeatureCard item={item} />
              </div>
            ))}
          </div>
        ))}
    </section>
  )
}

interface FeatureCardProps {
  item: FeatureItem
}

function FeatureCard({ item }: FeatureCardProps) {
  // Use the best available image format
  const imageUrl = item.image?.url
  const imageAlt =
    item.image?.alternativeText || `${item.title} feature illustration`

  return (
    <Card className="bg-transparent border-none shadow-none h-full">
      <CardContent className="p-0 flex flex-col items-center justify-between h-full">
        {/* Feature Image */}
        {imageUrl && (
          <div className="w-full h-auto mb-4 overflow-hidden bg-white/50">
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

        {/* Feature Content */}
        <div className="flex flex-col items-center">
          <div className="h-24 mb-6">
            <p className="text-2xl font-semibold text-center">{item.title}</p>
            <p className="text-[#8c877c] text-sm mt-2 text-center text-pretty">
              {item.description}
            </p>
          </div>

          {item.button && (
            <V2Button data={item.button as any} className="self-center" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
