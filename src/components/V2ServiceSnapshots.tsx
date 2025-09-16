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

interface FeaturesSectionProps {
  items?: FeatureItem[]
}

export default function FeaturesSection({ data }: { data: FeaturesSectionProps }) {
  const features = data.items || []

  return (
    <section className="w-full h-[380px] flex items-center justify-center" style={{ background: 'linear-gradient(90deg, rgba(239, 238, 235, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%)' }}>
      <div className="max-w-[1074px] w-full">
        <div className="flex flex-nowrap gap-16 justify-center">
          {features.map((feature) => (
            <div key={feature.id} className="basis-full sm:basis-1/3 lg:basis-1/6 grow flex flex-col items-center">
              <div className="flex justify-center mb-[28px]">
                {feature.icon && (
                  <img
                    src={getStrapiUrl(feature.icon.url)}
                    alt={feature.icon.alternativeText || feature.title}
                    width={feature.icon.width}
                    height={feature.icon.height}
                    className="w-14 h-14 object-contain"
                  />
                )}
              </div>
              <h3 className="text-[#000000] font-semibold text-[16px] mb-[20px] w-[160px] text-center">
                {feature.title}
              </h3>
              <p className="text-[#8c877c] text-sm whitespace-pre-line w-[170px] text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
