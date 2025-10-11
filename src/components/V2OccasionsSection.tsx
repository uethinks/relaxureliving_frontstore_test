import { Card, CardContent } from "@/components/ui/card"
import { getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import { CustomCarousel } from "./CustomCarousel"
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
  width: number | null
  height: number | null
  formats: {
    small?: MediaFormat
    xsmall?: MediaFormat
    thumbnail?: MediaFormat
  } | null
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
  sectionPriority?: "high" | "normal"
}

interface V2OccasionsSectionProps {
  data: V2OccasionsSectionData
  isMobile?: boolean
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
                <V2MediaRenderer
                  media={item.media}
                  options={{
                    aspectRatio: "525/262",
                    className: "mb-5",
                    imageOptions: {
                      priority: data.sectionPriority === "high",
                    }
                  }}
                />
                <h3 className="text-base font-semibold mb-[10px] text-[#2F2A1E] text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8C877C]">{item.description}</p>
              </div>
            ))}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {data.items.map((item) => (
              <Card
                key={item.id}
                className="border-0 shadow-none bg-transparent"
              >
                <CardContent className="p-0 space-y-6">
                  <V2MediaRenderer
                    media={item.media}
                    options={{
                      aspectRatio: "525/262",
                      imageOptions: {
                        priority: item.id <= 2,
                        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      }
                    }}
                  />
                  <div>
                    <h3 className="text-center text-foreground text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-center text-muted-foreground text-sm">
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
