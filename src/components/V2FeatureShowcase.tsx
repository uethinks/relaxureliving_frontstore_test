import type { RainResistanceBlock } from "@/types/rainResistance"
import { FeatureCard } from "@/components/FeatureCard"

interface RainResistanceBlockProps {
  data: RainResistanceBlock
}

export function V2FeatureShowcase({ data }: RainResistanceBlockProps) {
  return (
    <div className="w-full bg-[#EFEEEB] ">
      {/* Hero Section */}
      {data.title && (
        <section className="py-14 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-h2 font-bold text-[#140e02] leading-tight">
              {data.title}
            </h1>
          </div>
        </section>
      )}

      {/* Feature Sections */}
      {data.items.map((item, index) => (
        <FeatureCard
          key={item.id}
          item={item}
          textColor={index % 2 === 0 ? "text-[#140e02]" : "text-white"}
          index={index}
        />
      ))}
    </div>
  )
}
