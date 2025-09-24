import { MoveLeft, MoveRight } from "lucide-react"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"

interface CustomCarouselProps {
  data: ReactNode[]
  showDots?: boolean
  showNav?: boolean
  autoPlay?: boolean
  delay?: number
  loop?: boolean
  slidesPerView?: number
  spaceBetween?: number
  onChange?: (index: number) => void
}

export function CustomCarousel({
  data = [],
  loop = true,
  slidesPerView = 1,
  autoPlay = true,
  delay = 3000,
  spaceBetween = 0,
  showDots = true,
  showNav = true,
  onChange = function () {},
}: CustomCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const swiperRef = useRef<any>()

  useEffect(() => {
    onChange(currentPage)
  }, [currentPage])

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
        spaceBetween={spaceBetween}
      >
        {data.map((val, key) => (
          <SwiperSlide key={key}>{val}</SwiperSlide>
        ))}
        {showDots && (
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
        )}
        {showNav && (
          <>
            <div
              className={
                "absolute z-10 top-0 bottom-0 left-0 m-auto w-8 h-8 flex items-center justify-center bg-[#FFBF3C]"
              }
              onClick={() => {
                console.log("==== prev ====")
                swiperRef.current.slidePrev()
              }}
            >
              <MoveLeft />
            </div>
            <div
              className={
                "absolute z-10 top-0 bottom-0 right-0 m-auto w-8 h-8 flex items-center justify-center bg-[#FFBF3C]"
              }
              onClick={() => {
                console.log("==== next ====")
                swiperRef.current.slideNext()
              }}
            >
              <MoveRight />
            </div>
          </>
        )}
      </Swiper>
    </div>
  )
}
