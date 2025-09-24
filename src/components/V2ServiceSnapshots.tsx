import { getStrapiUrl } from "@lib/utils"

interface FeatureItem {
  id: number
  title: string
  description2: string
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

interface FeaturesSectionProps {
  items?: FeatureItem[]
}

export default function FeaturesSection({
  data,
}: {
  data: FeaturesSectionProps
}) {
  const features = data.items || []

  return (
    <section
      className="w-full lg:h-[380px] flex items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(239, 238, 235, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%)",
      }}
    >
      <div className="p-6 pb-12 lg:p-0 lg:max-w-[1074px] w-full flex flex-wrap lg:flex-nowrap gap-6 justify-center">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="basis-full lg:basis-1/6 grow flex lg:flex-col items-center lg:gap-7 gap-8"
          >
            {feature.icon && (
              <img
                src={getStrapiUrl(feature.icon.url)}
                alt={feature.icon.alternativeText || feature.title}
                width={feature.icon.width}
                height={feature.icon.height}
                className="w-14 h-14 object-contain flex-shrink-0 flex-grow-0 basis-auto"
              />
            )}
            <div
              className={
                "flex flex-col lg:text-center gap-2 lg:gap-5 w-full lg:w-40"
              }
            >
              <h3 className="text-[#2F2A1E] text-base font-semibold line-clamp-2">
                {feature.title}
              </h3>
              <p className="text-[#8c877c] text-sm whitespace-pre-line line-clamp-2 lg:line-clamp-3">
                {feature.description2}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
