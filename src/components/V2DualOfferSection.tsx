import { Card, CardContent } from "@/components/ui/card"
import { getStrapiUrl } from "@lib/utils"
import V2Button from "./V2Button"
import V2Headline from "./V2Headline"

interface ButtonData {
  id: number
  type: "Primary" | "Secondary"
  size?: string | null
  text: string
  link: string
}

interface IconData {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  url: string
  ext: string
  mime: string
}

interface IconItem {
  id: number
  title: string
  description: string | null
  icon: IconData
}

interface CardItem {
  id: number
  description: string
  title: string | null
  icon: string | null
  button: ButtonData
  image: string | null
}

interface DualOfferSectionProps {
  title: string
  iconItems: IconItem[]
  cardItems: CardItem[]
}

export default function V2DualOfferSection({
  data,
}: {
  data: DualOfferSectionProps
}) {
  const { title, iconItems, cardItems } = data
  return (
    <section
      className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6"
      // style={{
      //   background:
      //     "linear-gradient(90deg, rgba(239, 235, 235, 0.5) 0%, rgba(255, 255, 255, 0.50) 100%)",
      // }}
      aria-labelledby="main-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Headline with SEO optimization */}
        <header className="text-center mb-4">
          <V2Headline title={title} iconHidden className="mx-auto" />
        </header>

        {iconItems && iconItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-16 md:mb-20 max-w-7xl mx-auto">
            {iconItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center md:justify-center gap-3"
              >
                {item.icon?.url && (
                  <img
                    src={getStrapiUrl(item.icon.url)}
                    alt={item.icon.alternativeText || item.title}
                    width={item.icon.width}
                    height={item.icon.height}
                    className="w-6 h-6 md:w-8 md:h-8 text-[#140e02] flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span className="text-[#140e02] text-base md:text-lg font-semibold text-center md:text-left">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Two Column Content - Responsive Cards */}
        <div className="grid lg:grid-cols-2 gap-16">
          {cardItems.map((card, index) => (
            <Card
              key={card.id}
              className="bg-transparent border-none shadow-none w-[465px]"
            >
              <CardContent className="p-0 space-y-6 min-h-[320px] flex flex-col justify-between items-start">
                <div className="flex flex-col gap-10">
                  {card.title && (
                    <div className={"min-h-[92px]"}>
                      {" "}
                      <V2Headline title={card.title} />
                    </div>
                  )}

                  <p className="text-[#140e02] text-base max-w-prose mb-4">
                    {card.description}
                  </p>
                </div>
                {card.button && <V2Button data={card.button as any} />}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
