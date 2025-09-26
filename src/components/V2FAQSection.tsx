"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Media } from "@/types/craftsmanship"
import { getStrapiUrl } from "@lib/utils"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { CustomCarousel } from "./CustomCarousel"

interface FAQIcon {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  url: string
  ext: string
  mime: string
}

interface FAQCategory {
  id: number
  name: string
}

interface FAQItem {
  id: number
  documentId: string
  faq_category: FAQCategory
  title: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  icon: FAQIcon
}

interface FAQButton {
  id: number
  type: string
  size?: string
  text: string
  link: string
  icon?: string
}

interface FAQSectionProps {
  data: {
    __component: string
    id: number
    title: string
    description?: string
    items: FAQItem[]
    button: FAQButton
    backgroundImage?: Media
  }
  isMobile?: boolean
}

function FAQCard({ faq }: { faq: FAQItem }) {
  return (
    <Card
      key={faq.id}
      className="bg-white border-0 border-l-4 border-[#ffbf3c] shadow-sm hover:shadow-md transition-shadow duration-200"
      itemScope
      itemType="https://schema.org/Question"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-5 lg:mb-9">
          <div className="w-[56px] h-[56px] flex-shrink-0">
            {faq.icon?.url ? (
              <Image
                unoptimized
                src={getStrapiUrl(faq.icon.url)}
                alt={
                  faq.icon.alternativeText ||
                  `${faq?.faq_category?.name || faq?.title} icon`
                }
                width={faq.icon.width}
                height={faq.icon.height}
                className="w-full h-full text-[#ffbf3c]"
              />
            ) : (
              // Fallback icon
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#ffbf3c]"
              >
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path
                  d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          <div>
            <span className="text-sm text-[#8c877c] font-medium uppercase tracking-wide">
              {faq?.faq_category?.name || ""}
            </span>
            <h3
              className="text-base font-semibold text-[#140e02] leading-tight"
              itemProp="name"
            >
              {faq.title}
            </h3>
          </div>
        </div>

        <div itemScope itemType="https://schema.org/Answer">
          <div
            className="text-[#8C877C] text-sm leading-relaxed whitespace-break-spaces prose"
            itemProp="text"
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-primary underline font-semibold px-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
              remarkRehypeOptions={{ passThrough: ["link"] }}
            >
              {faq.description}
            </Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function V2FAQSection({ data, isMobile = false }: FAQSectionProps) {
  const [carouselData, setCarouselData] = useState<React.ReactNode[]>([])

  useEffect(() => {
    if (!data || !data.items) {
      return
    }
    if (isMobile) {
      // 屏幕宽度小于1024px时，将两个item包裹在一个div中
      const groupedData: React.ReactNode[] = []
      for (let i = 0; i < data.items.length; i += 2) {
        const pair = data.items.slice(i, i + 2)
        groupedData.push(
          <div key={i} className="w-full flex flex-col gap-[10px] px-6">
            {pair.map((faq) => (
              <FAQCard key={faq.id} faq={faq} />
            ))}
          </div>
        )
      }
      setCarouselData(groupedData)
    }
  }, [isMobile, data])

  return (
    <section
      className={`w-full pt-8 pb-12 lg:py-16 lg:px-4`}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Background Image */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <picture>
            <img
              src={getStrapiUrl(data.backgroundImage.url) || "/placeholder.svg"}
              alt={
                data.backgroundImage.alternativeText || "FAQ section background"
              }
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      )}

      <div className={`w-full lg:max-w-[1074px] mx-auto`}>
        <header className="text-center mb-8 lg:mb-12">
          {data.title && (
            <h2 className="text-2xl lg:text-4xl font-semibold text-[#140e02]">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p
              className={
                "px-6 mt-10 text-lg text-[#8C877C] whitespace-pre-line"
              }
            >
              {data.description}
            </p>
          )}
        </header>

        <div className="lg:grid lg:gap-6 lg:grid-cols-2 lg:mb-16">
          {isMobile
            ? carouselData && (
                <CustomCarousel showNav={false} data={carouselData} />
              )
            : data.items.map((faq) => <FAQCard key={faq.id} faq={faq} />)}
        </div>

        {data.button && (
          <footer className="text-center px-6 lg:p-0">
            <Button
              className="bg-[#ffbf3c] w-full lg:w-[240px] hover:bg-[#e6a835] text-xl text-[#140e02] font-semibold px-6 sm:px-8 py-3 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#ffbf3c] focus:ring-offset-2"
              asChild
            >
              <a
                href={data.button.link}
                aria-label={`${data.button.text} - View all frequently asked questions`}
              >
                {data.button.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </footer>
        )}
      </div>
    </section>
  )
}
