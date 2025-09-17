import type { RainResistanceBlock } from "@/types/rainResistance"
import { FeatureCard } from "@/components/FeatureCard"
import { getBackgroundColor } from "@lib/utils"

interface RainResistanceBlockProps {
  data: RainResistanceBlock
}

export function V2FeatureShowcase({ data }: RainResistanceBlockProps) {
  console.log("V2FeatureShowcase data", data)
  return (
    <div className={`w-full ${getBackgroundColor(data.backgroundColor)}`}>
      {/* Hero Section */}
      <section className="py-14 px-6 flex flex-col gap-5">
        {data.title && (
          <div className="max-w-[1074px] mx-auto text-center">
            <h1 className="text-h2 font-bold text-[#140e02] leading-tight">
              {data.title}
            </h1>
          </div>
        )}
        {data.description && (
          <div className="max-w-[1074px] mx-auto text-center">
            <text className="text-lg text-[#8C877C] leading-tight">
              {data.description}
            </text>
          </div>
        )}
      </section>

      {/* Feature Sections */}
      <div className="flex flex-col">
        {data.items.map((item, index) => (
          <FeatureCard
            key={item.id}
            item={item}
            textColor={index % 2 === 0 ? "text-[#140e02]" : "text-white"}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
