import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getStrapiUrl } from "@lib/utils"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

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

interface FAQItem {
  id: number
  documentId: string
  category: string
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
  }
}

export function V2FAQSection({ data }: FAQSectionProps) {
  return (
    <section
      className="py-16 px-4"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#140e02]">
            {data.title}
          </h2>
          {data.description && (
            <p className={"mt-10 text-lg text-[#8C877C] whitespace-pre-line"}>
              {data.description}
            </p>
          )}
        </header>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-12">
          {data.items.map((faq) => (
            <Card
              key={faq.id}
              className="bg-white border-l-4 border-[#ffbf3c] shadow-sm hover:shadow-md transition-shadow duration-200"
              itemScope
              itemType="https://schema.org/Question"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    {faq.icon?.url ? (
                      <Image
                        unoptimized
                        src={getStrapiUrl(faq.icon.url)}
                        alt={faq.icon.alternativeText || `${faq.category} icon`}
                        width={faq.icon.width}
                        height={faq.icon.height}
                        className="w-8 h-8 text-[#ffbf3c]"
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
                      {faq.category}
                    </span>
                    <h3
                      className="text-lg sm:text-xl font-semibold text-[#140e02] mb-3 leading-tight"
                      itemProp="name"
                    >
                      {faq.title}
                    </h3>
                  </div>
                </div>

                <div itemScope itemType="https://schema.org/Answer">
                  <p
                    className="text-[#2f2a1e] text-sm sm:text-base leading-relaxed whitespace-pre-line"
                    itemProp="text"
                  >
                    {faq.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data.button && (
          <footer className="text-center">
            <Button
              className="bg-[#ffbf3c] hover:bg-[#e6a835] text-[#140e02] font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#ffbf3c] focus:ring-offset-2"
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
