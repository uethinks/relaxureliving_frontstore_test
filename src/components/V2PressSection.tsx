import { getStrapiUrl } from "@lib/utils"
import { useEffect, useState } from "react"
import { CustomCarousel } from "./CustomCarousel"
import V2PressItem from "./V2PressItem"

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
  isMobile?: boolean
}

export default function V2PressSection({
  data,
  isMobile = false,
}: V2PressSectionProps) {
  const testimonials = data?.items || []
  const [carouselData, setCarouselData] = useState<React.ReactNode[]>([])
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    if (!testimonials) {
      return
    }
    if (isMobile) {
      // 屏幕宽度小于1024px时，将两个item包裹在一个div中
      const groupedData: React.ReactNode[] = []
      for (let i = 0; i < testimonials.length; i += 2) {
        const pair = testimonials.slice(i, i + 2)
        groupedData.push(
          <div key={i} className="flex flex-col gap-4">
            {pair.map((testimonial, index) => (
              <V2PressItem
                key={i + index}
                item={testimonial}
              />
            ))}
          </div>
        )
      }
      setCarouselData(groupedData)
      setSlidesPerView(1)
    } else {
      // 屏幕宽度大于等于1024px时，每个item单独包裹在一个div中
      const singleData = testimonials.map((testimonial, key) => (
        <div key={key}>
          <V2PressItem
            item={testimonial}
          />
        </div>
      ))
      setCarouselData(singleData)
      setSlidesPerView(3)
    }

    // 初始设置
  }, [testimonials, isMobile])

  return (
    <>
      <section className="w-full" aria-labelledby="testimonials-heading">
        <div className="w-full">
          <h2 id="testimonials-heading" className="sr-only">
            Press Coverage and User Testimonials
          </h2>

          <div className="w-full flex flex-nowrap gap-16 justify-center">
            <CustomCarousel
              showNav={false}
              slidesPerView={slidesPerView}
              data={carouselData}
            />
          </div>
        </div>
      </section>
    </>
  )
}
