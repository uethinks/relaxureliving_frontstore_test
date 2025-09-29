import { Card, CardContent } from "@/components/ui/card"
import { getBackgroundColor, getStrapiUrl } from "@lib/utils"
import { CustomCarousel } from "./CustomCarousel"
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
  description?: string
  iconItems: IconItem[]
  cardItems: CardItem[]
  backgroundColor?: string
}

export default function V2DualOfferSection({
  data,
  isMobile = false,
}: {
  data: DualOfferSectionProps
  isMobile?: boolean
}) {
  const { title, iconItems, cardItems } = data
  return (
    <section
      className={`w-full lg:pt-20 lg:pb-16 ${getBackgroundColor(
        data.backgroundColor
      )}`}
      // style={{
      //   background:
      //     "linear-gradient(90deg, rgba(239, 235, 235, 0.5) 0%, rgba(255, 255, 255, 0.50) 100%)",
      // }}
      aria-labelledby="main-heading"
    >
      <div className="lg:max-w-[1074px] mx-auto">
        {/* Main Headline with SEO optimization */}
        <div className={"px-6 pt-8 lg:p-0"}>
          {title && (
            <header className="text-center mb-5">
              <V2Headline
                title={title}
                iconHidden
                className="mx-auto text-2xl lg:text-[32px] w-full"
              />
            </header>
          )}
          {data.description && (
            <p className="text-center text-lg text-[#8C877C] whitespace-break-spaces mb-10">
              {data.description}
            </p>
          )}
        </div>

        {iconItems && iconItems.length > 0 && (
          <div className="flex items-center justify-center gap-6 mb-8 lg:mb-20 max-w-[1074px] mx-auto">
            {iconItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col max-w-[80px] lg:max-w-[33%] lg:flex-row items-center justify-center gap-2 flex-shrink-0 flex-grow-0 basis-auto"
              >
                {item.icon?.url && (
                  <img
                    src={getStrapiUrl(item.icon.url)}
                    alt={item.icon.alternativeText || item.title}
                    width={item.icon.width}
                    height={item.icon.height}
                    className="w-6 h-6 text-[#140e02] flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span className="text-[#140e02] text-xs lg:text-base font-semibold text-center lg:text-left">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Two Column Content - Responsive Cards */}
        {isMobile ? (
          <CustomCarousel
            showNav={false}
            data={cardItems.map((card, index) => (
              <div key={card.id} className={"w-full px-6"}>
                {card.title && (
                  <V2Headline
                    title={card.title}
                    className={"w-full text-2xl mb-5"}
                  />
                )}
                <div className="text-[#2F2A1E] text-sm max-w-prose mb-10">
                  {card.description}
                </div>
                {card.button && (
                  <V2Button data={card.button as any} className={"w-full"} />
                )}
              </div>
            ))}
          />
        ) : (
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
                        <V2Headline title={card.title} />
                      </div>
                    )}

                    <div className="text-[#140e02] text-base max-w-prose mb-4">
                      {card.description}
                    </div>
                  </div>
                  {card.button && <V2Button data={card.button as any} />}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
