import { getStrapiUrl } from "@lib/utils"

interface FeatureItem {
  id: number
  title: string
  description: string
  icon: {
    id: number
    name: string
    url: string
    width: number
    height: number
    alternativeText?: string
  } | null
  button?: any
  image?: any
}

interface V2FeatureItemsProps {
  items?: FeatureItem[]
}

export default function V2FeatureItems({ data }: { data: V2FeatureItemsProps }) {
  console.log("data", data)
  const features = data.items || []

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 flex items-center justify-center">
      <div className="max-w-[1074px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 justify-items-center">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-4 w-full">
              <div className="flex-shrink-0">
                {feature.icon && (
                  <img
                    src={getStrapiUrl(feature.icon.url)}
                    alt={feature.icon.alternativeText || feature.title}
                    width={feature.icon.width}
                    height={feature.icon.height}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-14 lg:h-14 object-contain"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#000000] font-semibold text-sm sm:text-base lg:text-[16px] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#8c877c] text-xs sm:text-sm whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
