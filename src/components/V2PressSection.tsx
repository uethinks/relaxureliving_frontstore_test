import { Card, CardContent } from "@/components/ui/card"
import { getStrapiUrl } from "@lib/utils"
import Image from "next/image"
import V2Button from "./V2Button"

interface ImageFormat {
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

interface ImageData {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    xsmall: ImageFormat
    thumbnail: ImageFormat
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

interface TestimonialItem {
  id: number
  documentId?: string
  title: string
  description: string
  link: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  image?: ImageData | null
}

interface V2PressSectionProps {
  data?: {
    __component?: string
    id?: number
    items: TestimonialItem[]
  }
}

export default function V2PressSection({ data }: V2PressSectionProps) {
  const testimonials = data?.items || [
    {
      id: 1,
      title: "Media praises the innovative features of our software...",
      description: "Media praises the innovative features of our software...",
      link: "https://relaxureliving.com/",
    },
    {
      id: 2,
      title:
        "Users commend the seamless experience provided by our platform...",
      description:
        "Users commend the seamless experience provided by our platform...",
      link: "https://relaxureliving.com/",
    },
    {
      id: 3,
      title:
        "Users commend the seamless experience provided by our platform...",
      description:
        "Users commend the seamless experience provided by our platform...",
      link: "https://relaxureliving.com/",
    },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Press Coverage and User Testimonials",
    description:
      "Media coverage and user testimonials about our software platform",
    itemListElement: testimonials.map((testimonial, index) => ({
      "@type": "Review",
      position: index + 1,
      name: testimonial.title,
      reviewBody: testimonial.description,
      author: {
        "@type": "Organization",
        name: "USA TODAY",
      },
      url: testimonial.link,
    })),
  }

  return (
    <>
      <section className="w-full" aria-labelledby="testimonials-heading">
        <div className="w-full">
          <h2 id="testimonials-heading" className="sr-only">
            Press Coverage and User Testimonials
          </h2>

          <div className="w-full flex flex-nowrap gap-16 justify-center">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-none shadow-none flex-1"
                style={{
                  background: "linear-gradient(270deg, #FFF 0%, #EFEEEB 100%)",
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-stretch space-x-4">
                    {/* Image Section */}
                    {testimonial.image && (
                      <div className="flex-shrink-0 ">
                        <Image
                          unoptimized
                          src={getStrapiUrl(testimonial.image.url)}
                          alt={
                            testimonial.image.alternativeText ||
                            testimonial.title
                          }
                          width={150}
                          height={150}
                          className="w-[150px] h-[150px] object-cover"
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="flex-1 min-w-0 flex flex-col items-start">
                      <p className="text-[#2f2a1e] text-sm sm:text-base leading-relaxed font-medium flex-1">
                        {testimonial.description}
                      </p>

                      <V2Button
                        data={
                          {
                            text: "Read More",
                            link: testimonial.link,
                            type: "Link",
                            size: "Small",
                          } as any
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
