"use client"
import React, {
  useState,
  useRef,
  useLayoutEffect,
  MutableRefObject,
} from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

const GAP = 32
const ACTIVE_SCALE = 1.6
const IMAGE_COUNT = 5

function useContainerWidth(): [
  MutableRefObject<HTMLDivElement | null>,
  number
] {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])
  return [ref, width]
}

interface LandingSliderProps {
  landingSlider: {
    title: string
    description: string
    images: { url: string; name?: string }[]
  }
}

// 移动端Swiper轮播
const LandingSliderMobile: React.FC<{
  images: { url: string; name?: string }[]
  title: string
  description: string
}> = ({ images, title, description }) => (
  <div className="flex flex-col items-center mb-4 mt-[120px] w-full px-4">
    <h2 className="text-2xl lg:text-4xl font-bold text-center mb-4 mt-2">
      {title}
    </h2>
    <p className="text-base lg:text-lg text-center text-gray-600 max-w-2xl mb-8">
      {description}
    </p>
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className="w-full"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={img.url}>
          <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden">
            <img
              src={process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL + img.url}
              alt={img.name || ""}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)

// 桌面端多图排列
const LandingSliderDesktop: React.FC<LandingSliderProps> = ({
  landingSlider,
}) => {
  const [displayImages, setDisplayImages] = useState(landingSlider.images)
  const [containerRef, screenWidth] = useContainerWidth()
  const [fadingIdx, setFadingIdx] = useState<number | null>(null)

  // 1. 计算inactive图片宽度
  const W = (screenWidth - GAP * 4) / 4.6
  const activeWidth = W * ACTIVE_SCALE
  const containerWidth = screenWidth + W

  // 2. 计算每张图片的宽高
  const getImageSize = (idx: number) => {
    if (idx === 2) {
      return {
        width: activeWidth,
        aspectRatio: 4 / 5,
      }
    }
    return {
      width: W,
      aspectRatio: 25 / 42,
    }
  }

  // 3. 点击时与中间图片交换，只做淡出动画
  const handleClick = (idx: number) => {
    if (idx === 2 || fadingIdx !== null) return
    setFadingIdx(idx)
    setTimeout(() => {
      const newImages = [...displayImages]
      ;[newImages[2], newImages[idx]] = [newImages[idx], newImages[2]]
      setDisplayImages(newImages)
      setFadingIdx(null)
    }, 400)
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-hidden flex flex-col items-center mb-4 mt-[120px]"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 mt-2">
        {landingSlider?.title}
      </h2>
      <p className="text-base lg:text-lg text-center text-gray-600 max-w-2xl mb-8">
        {landingSlider?.description}
      </p>
      <div
        className="flex justify-between items-center"
        style={{
          gap: GAP,
          width: containerWidth,
        }}
      >
        {displayImages.map((img, idx) => {
          const { width, aspectRatio } = getImageSize(idx)
          const isFading = fadingIdx === idx
          return (
            <div
              key={img.url + idx}
              style={{
                width,
                aspectRatio,
                background: "#eee",
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
                cursor: idx === 2 ? "default" : "pointer",
              }}
              className={[
                "relative flex-shrink-0 shadow-lg overflow-visible bg-center",
                idx === 2 ? "z-20" : "z-10",
              ].join(" ")}
              onClick={() => handleClick(idx)}
              title={img.name || ""}
            >
              <img
                src={process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL + img.url}
                alt={img.name || ""}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 20,
                  transition: "opacity 0.4s",
                  opacity: isFading ? 0 : 1,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: 2,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 响应式切换
const LandingSlider: React.FC<LandingSliderProps> = ({ landingSlider }) => (
  <>
    {/* 移动端 Swiper 单图轮播 */}
    <div className="block md:hidden w-full">
      <LandingSliderMobile
        images={landingSlider.images}
        title={landingSlider.title}
        description={landingSlider.description}
      />
    </div>
    {/* 桌面端多图排列 */}
    <div className="hidden md:block w-full">
      <LandingSliderDesktop landingSlider={landingSlider} />
    </div>
  </>
)

export default LandingSlider
