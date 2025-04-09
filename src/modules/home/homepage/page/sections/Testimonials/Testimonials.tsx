import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export const Testimonials = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { id: 1, image: "/img/ellipse-79-7.svg" },
    { id: 2, image: "/img/ellipse-80-7.svg" },
    { id: 3, image: "/img/ellipse-79-6.svg" },
    { id: 4, image: "/img/ellipse-79-4.svg" },
    { id: 5, image: "/img/ellipse-80-6.svg" },
    { id: 6, image: "/img/ellipse-79-5.svg" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full lg:w-4/5">
      <div className="flex flex-col w-full items-center justify-center gap-2.5 lg:p-10 p-4 relative">
        <div className="flex flex-col lg:h-[711px] items-center justify-center gap-2.5 relative self-stretch w-full bg-[#ffffff]">
          <div className="flex flex-col w-4/5 items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <div className="w-4/5 items-center flex flex-col gap-2.5 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                <div className="inline-flex h-[41px] items-center justify-center p-2.5 bg-[#072f6c] rounded-[30px] gap-2.5 relative">
                  <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#ffffff] text-[18px] lg:text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                    Testimonials
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
              <div className="w-fit mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[length:var(--heading-2-font-size)] text-center leading-[var(--heading-2-line-height)] whitespace-nowrap relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
                What Our Customers Say
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-0 relative flex-[0_0_auto]">
              <p className="w-fit mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] whitespace-nowrap relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
                Real Experiences from Happy Customers
              </p>
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="lg:hidden relative w-full my-4 flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <FaChevronLeft className="text-[#072f6c]" />
            </button>

            <div className="w-48 h-48 mx-auto">
              <img
                className="w-48 h-48 object-contain"
                alt={`Testimonial ${slides[currentSlide].id}`}
                src={slides[currentSlide].image}
              />
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <FaChevronRight className="text-[#072f6c]" />
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="absolute w-32 h-32 top-0 left-[5%]">
              <img
                className="w-32 h-32 object-contain"
                alt="Ellipse"
                src="/img/ellipse-79-7.svg"
              />
            </div>

            <div className="absolute w-40 h-40 top-0 right-[20%]">
              <img
                className="w-40 h-40 object-contain"
                alt="Ellipse"
                src="/img/ellipse-80-7.svg"
              />
            </div>

            <div className="absolute w-20 h-20 top-[10%] right-[10%]">
              <div className="relative w-20 h-20 top-[87px] left-[87px]">
                <div className="absolute w-px h-px top-[46px] left-[46px] bg-[#6c95d34c] rounded-[0.5px]" />
                <div className="absolute w-px h-px top-[46px] left-[46px] bg-[#072f6c4c] rounded-[0.5px]" />
                <div className="absolute w-px h-px top-[46px] left-[46px] rounded-[0.5px] [background:linear-gradient(180deg,rgba(199.93,214.33,235.94,0.4)_0%,rgba(200,214,236,0.04)_100%)]" />
                <img
                  className="w-20 h-20 object-contain"
                  alt="Ellipse"
                  src="/img/ellipse-79-6.svg"
                />
              </div>
            </div>

            <div className="absolute w-32 h-32 top-[40%] left-[5%]">
              <img
                className="w-32 h-32 object-contain"
                alt="Ellipse"
                src="/img/ellipse-79-4.svg"
              />
            </div>

            <div className="absolute w-20 h-20 bottom-[20%] left-[30%]">
              <img
                className="w-20 h-20 object-contain"
                alt="Ellipse"
                src="/img/ellipse-80-6.svg"
              />
            </div>

            <div className="absolute w-32 h-32 bottom-[25%] right-[10%]">
              <img
                className="w-32 h-32 object-contain"
                alt="Ellipse"
                src="/img/ellipse-79-5.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
