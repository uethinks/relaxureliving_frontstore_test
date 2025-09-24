import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"
import { ReactNode, useEffect, useRef, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel"

// 导航点组件
interface CarouselDotsProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}
function CarouselDots({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: CarouselDotsProps) {
  if (totalPages <= 1) return null

  return (
    <div
      className={cn("flex justify-center items-center gap-2 mt-4", className)}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={cn(
            "w-[10px] h-[10px] border transition-colors duration-200 hover:opacity-80",
            currentPage === index
              ? "bg-[#FFBF3C] border-[#FFBF3C]"
              : "bg-transparent border-[#8C877C]"
          )}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  )
}

interface CustomCarouselProps {
  data: ReactNode[]
  showDots?: boolean
  autoPlay?: number
  loop?: boolean
  totalPages?: number
}

export function CustomCarousel({
  data,
  showDots = true,
  autoPlay = 3000,
  loop = true,
  totalPages,
}: CustomCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const plugin = useRef(Autoplay({ delay: autoPlay, stopOnInteraction: true }))

  // 计算总页数
  const calculatedTotalPages = totalPages || data?.length || 0

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
      plugin.current.play()
    })
  }, [api])

  // 处理页面切换
  const handlePageChange = (page: number) => {
    if (api) {
      api.scrollTo(page)
    }
  }

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop,
        }}
      >
        <CarouselContent>
          {data?.map((item: ReactNode, index: number) => (
            <CarouselItem key={index}>{item}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 导航点 */}
      {showDots && (
        <CarouselDots
          totalPages={calculatedTotalPages}
          currentPage={current}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
