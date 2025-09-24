import type { CraftsmanshipData } from "@/types/craftsmanship"
import { getStrapiUrl } from "@lib/utils"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CustomCarousel } from "./CustomCarousel"
import { ImageAccordion } from "./ImageAccordion"

interface CraftsmanshipSectionProps {
  data: CraftsmanshipData
}

export function V2CraftsmanshipSection({ data }: CraftsmanshipSectionProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // 初始设置
    handleResize()

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="w-full bg-white" aria-labelledby="craftsmanship-title">
      <div className="w-full">
        {/* Section Body */}
        <div className="px-6 lg:px-0 py-8 lg:py-0">
          {/* Hero Content */}
          <div className="text-center mt-8 lg:mt-16 mb-3 lg:mb-5">
            {/* Hero title */}
            <h1
              id="craftsmanship-title"
              className="text-2xl lg:text-h2 font-bold text-black mb-2.5 lg:mb-6 leading-tight"
            >
              {data.title}
            </h1>
            {/* Hero description */}
            <div className="w-full lg:max-w-[1074px] lg:mx-auto text-[#8C877C] text-sm lg:text-lg mb-2.5 lg:mb-0">
              <Markdown remarkPlugins={[remarkGfm]}>
                {data.description2}
              </Markdown>
            </div>
          </div>

          {/* Hero Subtitle */}
          <div className="text-center mb-0 lg:mb-12">
            <h2 className="text-base lg:text-2xl font-bold text-black">
              {data.subtitle}
            </h2>
          </div>
        </div>

        {/* Feature Items */}
        {isMobile ? (
          /* Mobile - 屏幕宽度小于1024px */
          <>
            <img
              className={"w-full h-[83.2vw] object-contain"}
              src={getStrapiUrl(data.items[currentPage].media.url)}
              alt={
                data.items[currentPage].media.alternativeText ||
                data.items[currentPage].title
              }
            />
            <CustomCarousel
              slidesPerView={3}
              autoPlay={false}
              spaceBetween={8}
              showDots={false}
              data={data.items.map((item, key) => (
                <div
                  key={key}
                  className="flex items-center justify-center w-full h-[26.667vw]"
                >
                  <img
                    className={"w-full"}
                    src={getStrapiUrl(item.media.url)}
                    alt={item.media.alternativeText || item.title}
                  />
                </div>
              ))}
              onChange={(i) => {
                setCurrentPage(i)
              }}
            />
            <div className={"w-full px-6 pt-9 pb-6 text-[#8C877C] text-sm"}>
              {data.items[currentPage].description}
            </div>
          </>
        ) : (
          /* PC - 屏幕宽度大于等于1024px */
          <ImageAccordion items={data.items} />
        )}
      </div>
    </section>
  )
}
