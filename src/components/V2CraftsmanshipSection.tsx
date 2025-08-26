import type { CraftsmanshipData } from "@/types/craftsmanship"
import { ImageAccordion } from "./ImageAccordion"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface CraftsmanshipSectionProps {
  data: CraftsmanshipData
}

export function V2CraftsmanshipSection({ data }: CraftsmanshipSectionProps) {
  return (
    <section className="w-full bg-white" aria-labelledby="craftsmanship-title">
      <div className="w-full">
        {/* Hero Content */}
        <div className="text-center mt-16 mb-5">
          <h1
            id="craftsmanship-title"
            className="text-h2 font-bold text-black mb-6 leading-tight"
          >
            {data.title}
          </h1>
          <div className="max-w-4xl mx-auto text-[#8C877C]">
            <Markdown remarkPlugins={[remarkGfm]}>{data.description2}</Markdown>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black">{data.subtitle}</h2>
        </div>

        {/* Feature Items */}
        <ImageAccordion items={data.items} />
      </div>
    </section>
  )
}
