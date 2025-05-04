"use client"
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useCallback } from "react"
import { features, featureSlider } from "types/global"

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
type featureSliderGroup = { expand: boolean } & featureSlider

export const Features = ({
  features,
}: {
  features: features | null
}): JSX.Element => {
  const [featureSliderGroup1, setFeatureSliderGroup1] = useState<
    featureSliderGroup[]
  >([])
  const [featureSliderGroup2, setFeatureSliderGroup2] = useState<
    featureSliderGroup[]
  >([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % 6)
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + 6) % 6)
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const featuresSliderGroup =
      features?.FeaturesSlider.map((slider) => ({
        ...slider,
        expand: false,
      })) || []
    setFeatureSliderGroup1(
      featuresSliderGroup?.slice(0, 3)?.map((slider, index) => ({
        ...slider,
        expand: index === 0,
      }))
    )
    setFeatureSliderGroup2(
      featuresSliderGroup?.slice(3, 6)?.map((slider, index) => ({
        ...slider,
        expand: index === 1,
      }))
    )
  }, [features])

  const handleGroup1Click = (index: number) => {
    setFeatureSliderGroup1(
      featureSliderGroup1.map((slider, i) => ({
        ...slider,
        expand: i === index,
      }))
    )
  }

  const handleGroup2Click = (index: number) => {
    setFeatureSliderGroup2(
      featureSliderGroup2.map((slider, i) => ({
        ...slider,
        expand: i === index,
      }))
    )
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 6)
  }

  const allSlides = [...featureSliderGroup1, ...featureSliderGroup2]

  return (
    <div
      id="features"
      className="w-full inline-flex flex-col lg:h-[1461px] items-start gap-10 relative"
    >
      <div className="flex flex-col w-full items-start gap-5">
        <div className="flex flex-col items-center justify-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative w-full mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            {features?.Title}
          </p>

          <div className="px-0 py-2.5 flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="flex-1 mt-[-1.00px] text-[#68717a] text-center relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-[16px] lg:text-[length:var(--relaxure-sub-heading-18-font-size)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] leading-[var(--relaxure-sub-heading-18-line-height)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              {features?.Description}
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        {isMobile ? (
          <div
            className="relative w-full h-[600px] overflow-hidden cursor-pointer rounded-[20px]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {allSlides.map((slider, index) => (
              <div
                key={slider.Title}
                className={`absolute w-full h-full transition-all duration-500 ease-in-out rounded-[20px] ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url("${
                    strapiUrl + slider.Image.formats.large.url
                  }")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="ms-5 mt-5 inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]">
                  <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                    {slider.Title}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex m-auto w-[90%] items-start gap-4 pt-2.5 pb-[7px] px-2.5 relative bg-[#ffffff73] rounded-[20px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]">
                    <div className="flex flex-col gap-2.5 w-full">
                      <div className="relative text-[14px] lg:text-[18px] flex-1 [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] tracking-[0] leading-[25.2px]">
                        {slider.subtitle}
                      </div>
                      <p className="relative [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-[12px] lg:text-[14px] tracking-[0] leading-[21px]">
                        {slider.Description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Indicator dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {allSlides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/30 border border-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-10 w-full">
              {featureSliderGroup1?.map((slider, index) => (
                <div
                  key={slider.Title}
                  className={`flex flex-col h-[600px] items-start justify-between gap-2.5 rounded-[20px] transition-all duration-500 ease-in-out ${
                    slider.expand ? "w-auto aspect-[707/600]" : "w-1/4"
                  }`}
                  style={{
                    backgroundImage: `url("${
                      strapiUrl + slider.Image.formats.large.url
                    }")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onMouseEnter={() => handleGroup1Click(index)}
                >
                  <div className="ms-5 mt-5 inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]">
                    <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                      {slider.Title}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col items-start gap-2.5 px-0 py-2.5 relative self-stretch w-full ${
                      slider.expand ? "block" : "hidden"
                    }`}
                  >
                    <div className="relative self-stretch w-full mb-[-10.00px] rounded-[0px_0px_20px_20px] [background:linear-gradient(180deg,rgba(52,58,64,0)_51%,rgba(0,0,0,0.6)_100%)]">
                      <div className="flex m-auto mb-10 w-[90%] items-start gap-4 pt-2.5 pb-[7px] px-2.5 relative bg-[#ffffff73] rounded-[20px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]">
                        <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                          <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] leading-[25.2px]">
                              {slider.subtitle}
                            </div>
                          </div>

                          <div className="flex w-full items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                            <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-sm tracking-[0] leading-[21px]">
                              {slider.Description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative w-full mt-10">
              <div className="flex gap-10 w-full">
                {featureSliderGroup2?.map((slider, index) => (
                  <div
                    key={slider.Title}
                    className={`flex flex-col h-[600px] items-start justify-between gap-2.5 rounded-[20px] transition-all duration-500 ease-in-out ${
                      slider.expand ? "w-auto aspect-[707/600]" : "w-1/4"
                    }`}
                    style={{
                      backgroundImage: `url("${
                        strapiUrl + slider.Image.formats.large.url
                      }")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onMouseEnter={() => handleGroup2Click(index)}
                  >
                    <div className="ms-5 mt-5 inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 bg-[#ffffff73] rounded-[30px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]">
                      <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#343a40] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px]">
                        {slider.Title}
                      </div>
                    </div>
                    <div
                      className={`flex flex-col items-start gap-2.5 px-0 py-2.5 relative self-stretch w-full ${
                        slider.expand ? "block" : "hidden"
                      }`}
                    >
                      <div className="relative self-stretch w-full mb-[-10.00px] rounded-[0px_0px_20px_20px] [background:linear-gradient(180deg,rgba(52,58,64,0)_51%,rgba(0,0,0,0.6)_100%)]">
                        <div className="flex m-auto mb-10 w-[90%] items-start gap-4 pt-2.5 pb-[7px] px-2.5 relative bg-[#ffffff73] rounded-[20px] border border-solid border-[#ffffffad] backdrop-blur-[14.7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.7px)_brightness(100%)]">
                          <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                            <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                              <div className="relative flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#343a40] text-lg tracking-[0] leading-[25.2px]">
                                {slider.subtitle}
                              </div>
                            </div>

                            <div className="flex w-full items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                              <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-sm tracking-[0] leading-[21px]">
                                {slider.Description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
