import { getStrapiUrl } from "@lib/utils"

interface ServiceItem {
  id: number
  title: string
  status: string // e.g., "Free"
  originalPrice?: string // e.g., "+.99"
  description: string
  icon?: {
    id: number
    name: string
    url: string
    width: number
    height: number
    alternativeText?: string
  } | null
  secondaryIcon?: {
    id: number
    name: string
    url: string
    width: number
    height: number
    alternativeText?: string
  } | null
  secondaryText?: string
}

interface V2ServiceDescriptionProps {
  data: {
    items?: ServiceItem[]
  }
}

export default function V2ServiceDescription({
  data,
}: V2ServiceDescriptionProps) {
  const serviceItems = data.items || []

  return (
    <div className="mt-6 space-y-4">
      {serviceItems.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">
              {item.title}:{" "}
              <span className="text-highlight">{item.status}</span>
            </span>
            {item.originalPrice && (
              <span className="text-[#8C877C] line-through">
                {item.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[#8c8c8c] text-sm">
            {item.icon && (
              <>
                {item.icon?.url && <img
                  src={getStrapiUrl(item.icon.url)}
                  alt={item.icon.alternativeText || item.title}
                  className="w-4 h-4 inline-block mr-2 mb-1"
                />}
                <span className="ml-2">{item.description}</span>
                <br />
              </>
            )}
            {item.secondaryIcon && (
              <>
                <img
                  src={getStrapiUrl(item.secondaryIcon.url)}
                  alt={item.secondaryIcon.alternativeText || item.title}
                  className="w-4 h-4 inline-block mr-2 mb-1"
                />
                <span className="ml-2">{item.secondaryText}</span>
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  )
}
