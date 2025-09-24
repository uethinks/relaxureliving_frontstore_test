import { ReactNode, useRef, useState } from "react"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"

interface CustomCarouselProps {
  data: ReactNode[]
  showDots?: boolean
  autoPlay?: boolean
  delay?: number
  loop?: boolean
  totalPages?: number
  slidesPerView?: number
  grid?: number
}

export function CustomCarousel({
  data = [],
  loop = true,
  slidesPerView = 1,
  autoPlay = true,
  delay = 3000,
}: CustomCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const swiperRef = useRef<any>()

  return (
    <div className={"w-full"}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        slidesPerView={slidesPerView}
        loop={loop}
        {...(autoPlay
          ? {
              autoplay: {
                delay: delay,
                disableOnInteraction: false,
              },
            }
          : {})}
        modules={[Autoplay]}
        loopAddBlankSlides={true}
        onSlideChange={(slide) => {
          setCurrentPage(slide.realIndex)
        }}
      >
        {data.map((val, key) => (
          <SwiperSlide key={key}>{val}</SwiperSlide>
        ))}
        <div
          className={
            "flex flex-grow-0 flex-shrink-0 basis-auto justify-center items-center gap-2 mt-5 mb-7"
          }
        >
          {Array.from({ length: data.length }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index)
                swiperRef.current.slideToLoop(index)
              }}
              className={`w-[10px] h-[10px] border transition-colors duration-200 hover:opacity-80 ${
                currentPage === index
                  ? "bg-[#FFBF3C] border-[#FFBF3C]"
                  : "bg-transparent border-[#8C877C]"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </Swiper>
    </div>
  )
}
