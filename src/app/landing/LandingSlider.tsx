"use client"
import React, {
  useState,
  useRef,
  useLayoutEffect,
  MutableRefObject,
  useEffect,
} from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

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
      modules={[Pagination]}
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
  const [containerRef, screenWidth] = useContainerWidth()
  const [images, setImages] = useState([
    ...landingSlider.images,
    ...landingSlider.images,
    ...landingSlider.images,
  ])
  const [activeIndex, setActiveIndex] = useState(landingSlider.images.length)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isClickable, setIsClickable] = useState(true)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const transitionEndTimeoutRef = useRef<NodeJS.Timeout>()
  const resetTimeoutRef = useRef<NodeJS.Timeout>()

  // 1. 计算inactive图片宽度
  const W = (screenWidth - GAP * 4) / 4.6
  const activeWidth = W * ACTIVE_SCALE

  // 动态计算容器高度，以适应最大的图片
  const containerHeight = (activeWidth * 5) / 4 + 40 // active slide height + padding

  // 2. 计算每张图片的宽高
  const getImageSize = (idx: number) => {
    if (idx === activeIndex) {
      return {
        width: activeWidth,
        aspectRatio: "4 / 5",
      }
    }
    return {
      width: W,
      aspectRatio: "25 / 42",
    }
  }

  // 3. 切换图片逻辑
  const switchSlide = (newIndex: number) => {
    if (!isClickable) return
    setIsClickable(false)
    setIsTransitioning(true)
    setActiveIndex(newIndex)
  }

  useEffect(() => {
    // 清理旧的定时器以防冲突
    if (transitionEndTimeoutRef.current)
      clearTimeout(transitionEndTimeoutRef.current)
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)

    const L = landingSlider.images.length
    const transitionTime = 500 // 必须与CSS的transition时间一致

    transitionEndTimeoutRef.current = setTimeout(() => {
      const needsReset = activeIndex < L || activeIndex >= 2 * L

      if (needsReset) {
        // 如果需要重置，先禁用动画，然后瞬间跳转
        setIsTransitioning(false)
        const newIndex = activeIndex < L ? activeIndex + L : activeIndex - L
        setActiveIndex(newIndex)

        // 在瞬间跳转后，用一个极短的延时重新启用动画和点击
        resetTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(true)
          setIsClickable(true)
        }, 50)
      } else {
        // 如果是正常滑动，动画结束后直接解锁点击
        setIsClickable(true)
      }
    }, transitionTime)

    return () => {
      if (transitionEndTimeoutRef.current)
        clearTimeout(transitionEndTimeoutRef.current)
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
    }
  }, [activeIndex, landingSlider.images.length])

  // Calculate the container's offset to center the active slide
  const getContainerOffset = () => {
    if (screenWidth === 0) return 0
    let offset = screenWidth / 2 - W / 2 - activeIndex * (W + GAP)
    // Adjust for the active slide's larger width
    if (activeIndex > 0) {
      offset -= (activeWidth - W) / 2
    }
    return offset + dragOffset
  }

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isClickable) return
    setIsDragging(false) // 先假定不是拖拽
    setDragStartX(e.clientX)
    setDragOffset(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    // 如果鼠标没按下，则不处理
    if (dragStartX === 0) return
    const currentX = e.clientX
    const offset = currentX - dragStartX

    // 只有当移动超过一个小的阈值时，才认为是拖拽
    if (!isDragging && Math.abs(offset) > 5) {
      setIsDragging(true)
    }

    if (isDragging) {
      setDragOffset(offset)
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === 0) return

    if (isDragging) {
      const threshold = W / 4
      if (dragOffset > threshold) {
        switchSlide(activeIndex - 1)
      } else if (dragOffset < -threshold) {
        switchSlide(activeIndex + 1)
      }
    } else {
      // 如果不是拖拽，那就是点击
      const slideElement = (e.target as HTMLElement).closest("[data-index]")
      if (slideElement) {
        const index = parseInt(slideElement.getAttribute("data-index")!, 10)
        if (!isNaN(index)) {
          switchSlide(index)
        }
      }
    }

    setDragStartX(0)
    setDragOffset(0)
    setIsDragging(false)
  }

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        switchSlide(activeIndex - 1)
      } else if (e.key === "ArrowRight") {
        switchSlide(activeIndex + 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndex, isClickable])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden flex flex-col items-center mb-4 mt-[120px]"
      onMouseLeave={handleMouseUp}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 mt-2">
        {landingSlider?.title}
      </h2>
      <p className="text-base lg:text-lg text-center text-gray-600 max-w-2xl mb-8">
        {landingSlider?.description}
      </p>
      <div
        className="relative w-full cursor-grab active:cursor-grabbing"
        style={{ height: screenWidth > 0 ? `${containerHeight}px` : "550px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="flex items-center absolute top-1/2 -translate-y-1/2"
          style={{
            left: getContainerOffset(),
            transition:
              isTransitioning && !isDragging
                ? "left 500ms ease-in-out"
                : "none",
          }}
        >
          {images.map((img, idx) => {
            const { width, aspectRatio } = getImageSize(idx)
            return (
              <div
                key={img.url + idx}
                data-index={idx}
                style={{
                  width,
                  aspectRatio,
                  marginRight: `${GAP}px`,
                  pointerEvents: "auto",
                }}
                className={[
                  "relative flex-shrink-0 shadow-lg cursor-pointer transition-all duration-500 ease-in-out",
                  activeIndex === idx ? "z-20" : "z-10",
                ].join(" ")}
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
                    pointerEvents: "none", // 确保图片本身不会捕获事件
                  }}
                />
              </div>
            )
          })}
        </div>
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
