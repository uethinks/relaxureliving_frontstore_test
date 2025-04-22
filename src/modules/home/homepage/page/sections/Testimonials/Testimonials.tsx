import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface TestimonialBubbleProps {
  message: string
  name: string
  title: string
  position: "top" | "bottom"
  className?: string
}

const TestimonialBubble: React.FC<TestimonialBubbleProps> = ({
  message,
  name,
  title,
  position,
  className = "",
}) => {
  return (
    <div
      className={`relative ${
        position === "top" ? "mb-4" : "mt-4"
      } ${className}`}
    >
      {position === "top" && (
        <div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#343A40]"
          style={{
            clipPath: "polygon(50% 100%, 0 0, 100% 0)",
          }}
        />
      )}
      <div className="bg-[#343A40] text-white p-6 rounded-2xl max-w-[400px]">
        <p className="text-base mb-4">{message}</p>
        <div className="space-y-1">
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-300">{title}</p>
        </div>
      </div>
      {position === "bottom" && (
        <div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#343A40]"
          style={{
            clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
          }}
        />
      )}
    </div>
  )
}

interface TestimonialData {
  id: number
  image: string
  message: string
  name: string
  title: string
  position: "top" | "bottom"
  containerClass: string
  bubbleClass: string
}

export const Testimonials = (): JSX.Element => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials: TestimonialData[] = [
    {
      id: 1,
      image: "/img/ellipse-79-4.svg",
      message:
        "The service was exceptional! I highly recommend it to everyone.",
      name: "Sarah M.",
      title: "Marketing Director",
      position: "top",
      containerClass: "w-[266px] h-[266px] left-[13px] top-[356px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[-130px] z-10",
    },
    {
      id: 2,
      image: "/img/ellipse-79-5.svg",
      message: "Outstanding quality and attention to detail. Very satisfied!",
      name: "James K.",
      title: "Creative Designer",
      position: "top",
      containerClass: "w-[266px] h-[266px] left-[839px] top-[427px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[-130px] z-10",
    },
    {
      id: 3,
      image: "/img/ellipse-79-6.svg",
      message:
        "Nice to meet you! If you have any question about our services, feel free to contact us.",
      name: "Robert L.",
      title: "Business Administration",
      position: "bottom",
      containerClass: "w-[266px] h-[266px] left-[948px] top-[76px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[170px] z-10",
    },
    {
      id: 4,
      image: "/img/ellipse-79-7.svg",
      message: "Excellent team and great communication throughout.",
      name: "Emily R.",
      title: "Project Manager",
      position: "bottom",
      containerClass: "w-[266px] h-[266px] left-[13px] top-0 absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[188px] z-10",
    },
    {
      id: 5,
      image: "/img/ellipse-80-6.svg",
      message: "Very professional service, exceeded my expectations!",
      name: "Michael P.",
      title: "Tech Lead",
      position: "top",
      containerClass: "w-[266px] h-[266px] left-[364px] top-[470px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[-160px] z-10",
    },
    {
      id: 6,
      image: "/img/ellipse-80-7.svg",
      message: "Incredible experience from start to finish.",
      name: "Lisa T.",
      title: "Product Owner",
      position: "bottom",
      containerClass: "w-[266px] h-[266px] left-[672px] top-[16px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[220px] z-10",
    },
  ]

  const handleAvatarClick = (id: number) => {
    setActiveId(activeId === id ? null : id)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const renderTestimonial = (data: TestimonialData) => {
    const isActive = activeId === data.id

    return (
      <div key={data.id} className={data.containerClass}>
        {isActive && (
          <>
            <div className="w-[180px] h-[180px] translate-x-[-50%] translate-y-[-50%] left-[132.50px] top-[132.50px] absolute bg-[#6c95d3]/30 rounded-full" />
            <div className="w-[120px] h-[120px] translate-x-[-50%] translate-y-[-50%] left-[132.50px] top-[132.50px] absolute bg-[#072f6c]/30 rounded-full" />
            <div className="w-[240px] h-[240px] translate-x-[-50%] translate-y-[-50%] left-[132.50px] top-[132.50px] absolute bg-gradient-to-b from-[#c7d6eb]/40 to-[#c8d6ec]/5 rounded-full" />
            <div className={data.bubbleClass}>
              <TestimonialBubble
                position={data.position}
                message={data.message}
                name={data.name}
                title={data.title}
              />
            </div>
          </>
        )}
        <img
          className="w-[127px] h-[127px] translate-x-1/2 translate-y-1/2 absolute rounded-full cursor-pointer transition-transform hover:scale-105"
          src={data.image}
          onClick={() => handleAvatarClick(data.id)}
          alt={`${data.name}'s testimonial`}
        />
      </div>
    )
  }

  const renderMobileTestimonial = (data: TestimonialData, index: number) => {
    return (
      <div
        key={data.id}
        className={`w-full flex-shrink-0 flex flex-col items-center px-4 ${
          currentSlide === index ? "block" : "hidden"
        }`}
      >
        <div className="relative w-[200px] h-[200px] mb-8">
          <div className="w-[180px] h-[180px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6c95d3]/30 rounded-full" />
          <div className="w-[120px] h-[120px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#072f6c]/30 rounded-full" />
          <div className="w-[200px] h-[200px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#c7d6eb]/40 to-[#c8d6ec]/5 rounded-full" />
          <img
            className="w-[100px] h-[100px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            src={data.image}
            alt={`${data.name}'s testimonial`}
          />
        </div>
        <div className="w-full max-w-[300px]">
          <TestimonialBubble
            position="bottom"
            message={data.message}
            name={data.name}
            title={data.title}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Version */}
      <div className="hidden 2xl:block">
        <div
          data-property-1="Default"
          className="w-full p-10 inline-flex flex-col justify-center items-center gap-2.5"
        >
          <div className="self-stretch h-[711px] relative bg-white flex flex-col justify-center items-center gap-2.5 overflow-hidden">
            <div className="w-[1182px] flex flex-col justify-center items-center gap-2.5">
              <div className="w-[1182px] flex flex-col justify-start items-center gap-2.5">
                <div className="flex flex-col justify-start items-start gap-2.5">
                  <div className="h-[41px] p-2.5 bg-[#072f6c] rounded-[30px] outline outline-1 outline-offset-[-1px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-white text-lg font-medium font-['Montserrat'] leading-[27px]">
                      Testimonials
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="text-center justify-start text-[#343a40] text-4xl font-bold font-['Merriweather'] leading-[50.40px]">
                  What Our Customers Say
                </div>
              </div>
              <div className="px-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-[#68717a] text-lg font-medium font-['Montserrat'] leading-[27px]">
                  Real Experiences from Happy Customers
                </div>
              </div>
            </div>
            {testimonials.map(renderTestimonial)}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="2xl:hidden w-full py-10 px-4">
        <div className="flex flex-col items-center">
          <div className="h-[41px] p-2.5 bg-[#072f6c] rounded-[30px] mb-4">
            <div className="text-white text-lg font-medium font-['Montserrat']">
              Testimonials
            </div>
          </div>
          <h2 className="text-[#343a40] text-2xl font-bold font-['Merriweather'] text-center mb-2">
            What Our Customers Say
          </h2>
          <p className="text-[#68717a] text-base font-medium font-['Montserrat'] text-center">
            Real Experiences from Happy Customers
          </p>
        </div>

        <div className="relative w-full">
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <FaChevronLeft className="text-[#072f6c]" />
          </button>

          <div className="w-full">
            {testimonials.map((testimonial, index) =>
              renderMobileTestimonial(testimonial, index)
            )}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <FaChevronRight className="text-[#072f6c]" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-[#072f6c]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
