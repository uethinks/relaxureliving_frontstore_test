"use client"

import Image from "next/image"
import { useState } from "react"
import type { CraftsmanshipItem } from "@/types/craftsmanship"
import { getStrapiUrl } from "@lib/utils"


interface ImageAccordionProps {
  items: CraftsmanshipItem[]
}

export function ImageAccordion({ items }: ImageAccordionProps) {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(items[0].id)

  return (
    <>
      <div className="group flex max-md:flex-col justify-center gap-0">
        {items.map((item, index) => {
          const isHovered = hoveredItemId === item.id
          const hasAnyHovered = hoveredItemId !== null
          
          return (
            <article
              key={item.id}
              className={`group/article relative w-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity ${
                // Desktop: non-hovered items shrink when any item is hovered
                hasAnyHovered && !isHovered 
                  ? 'md:w-[20%] before:opacity-0 after:opacity-100' 
                  : 'md:w-full before:opacity-100 after:opacity-0'
              } ${
                // Add overlay effect for non-hovered items
                hasAnyHovered && !isHovered 
                  ? 'after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur-sm after:transition-all' 
                  : ''
              }`}
              onMouseEnter={() => setHoveredItemId(item.id)}
            //   onMouseLeave={() => setHoveredItemId(null)}
            >
              <div className="absolute inset-0 text-white z-10">
                <span className={`absolute inset-x-0 bottom-0 text-lg font-medium p-6 md:px-12 md:py-8 md:whitespace-nowrap md:truncate transition-all duration-400 ease-[cubic-bezier(.5,.85,.25,1.8)] ${
                  isHovered 
                    ? 'opacity-100 translate-y-0 delay-300' 
                    : 'opacity-0 translate-y-2'
                }`}>
                  {item.title}
                </span>
              </div>
              <Image
                
                src={
                  getStrapiUrl(item.media.url)
                }
                alt={item.media.alternativeText || item.title}
                width={960}
                height={480}
                className={`object-cover border-b-1 border-[#FFBF3C] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] h-72 md:h-[480px] w-full ${
                  isHovered ? 'border-b-4 border-[#FFBF3C]' : ''
                }`}
                // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </article>
          )
        })}
      </div>
      
      {/* Display description of hovered item */}
      {hoveredItemId && (
        <div className="mt-5 max-w-3xl px-5 h-[120px]">
          <p className="text-[#8C877C] text-sm leading-relaxed">
            {items.find(item => item.id === hoveredItemId)?.description}
          </p>
        </div>
      )}
    </>
  )
}
