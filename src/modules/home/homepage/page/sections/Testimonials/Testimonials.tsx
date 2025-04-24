import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Add keyframes for wave animation
const styles = `
@keyframes wave {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

@keyframes wave2 {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
  }
}

@keyframes wave3 {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}
`

interface TestimonialBubbleProps {
  message: string
  name: string
  title: string
  position: "top" | "bottom"
  className?: string
  popupClass?: string
}

const TestimonialBubble: React.FC<TestimonialBubbleProps> = ({
  message,
  name,
  title,
  position,
  className = "",
  popupClass = "",
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
      <div className={`bg-[#343A40] text-white p-6 rounded-2xl ${popupClass}`}>
        <p className="text-base mb-4">{message}</p>
        <div className="space-y-1">
          <h4 className="font-medium">{name}</h4>
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
  popupClass?: string
}

export const Testimonials = (): JSX.Element => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials: TestimonialData[] = [
    {
      id: 1,
      image: "/img/ellipse-79-4.svg",
      message:
        "Ordered in mid December and came quickly in January. You gotta wonder how they managed logistics. Lots of sturdy packaging. I am a doctor and hate wasting hours with mislabeled part. Thank god all their parts come with matching labels to help my contractor. Every part has sticky and plastic on it to prevent scratching. I will have more reviews later. Hopefully this is helping. No regrets so far.",
      name: "Lucas Martinez",
      title: "Marketing Director",
      position: "top",
      containerClass: "w-[266px] h-[266px] left-[13px] top-[356px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[-230px] z-10",
      popupClass: "w-[600px]",
    },
    {
      id: 2,
      image: "/img/ellipse-79-5.svg",
      message:
        "Okay, buckle up. Their warranty is like the superhero of all warranties—15 years of total protection!",
      name: "Emma Thompson",
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
        "I was amazed at how silent the pergola stays during storms. I started wondering if it had taken a vow of silence—no creaking or rattling, just pure relaxation.",
      name: "Robert L.",
      title: "Business Administration",
      position: "bottom",
      containerClass: "w-[266px] h-[266px] left-[948px] top-[76px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[170px] z-10",
      popupClass: "w-[200px]",
    },
    {
      id: 4,
      image: "/img/ellipse-79-7.svg",
      message:
        "I like the offerings of this company. They have enough clearance under their pergolas. It's crazy how many are just 7 feet or so, and if you want a fan, well hope all your friends are short! In my case, 9 foot also assures I clear a window.",
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
      message: `The thick posts make it feel like a permanent, solid structure, not some flimsy add-on.
Hanso Pergola's louvers are so thin, they make a Chinese historical drama belt look like a heavyweight champion. A strong gust of wind might just send them to early retirement! 😆🎭💨
`,
      name: "Sophia Anderson",
      title: "Tech Lead",
      position: "top",
      containerClass: "w-[266px] h-[266px] left-[364px] top-[470px] absolute",
      bubbleClass:
        "w-full absolute left-1/2 transform -translate-x-1/2 top-[-200px] z-10",
      popupClass: "w-[600px]",
    },
    {
      id: 6,
      image: "/img/ellipse-80-7.svg",
      message:
        "I love that I can keep my lights and on without freaking out about the weather….if you think about how the electric wires and directly in contact with water, there is no way you can be rest assured.. It's such a relief not having to unplug everything when it starts drizzling!!",
      name: "James Wilson",
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
            <style>{styles}</style>
            <div className="w-[180px] h-[180px] translate-x-[-50%] translate-y-[-50%] left-[132.50px] top-[132.50px] absolute bg-[#6c95d3]/30 rounded-full animate-[wave_1s_ease-out_infinite]" />
            <div className="w-[120px] h-[120px] translate-x-[-50%] translate-y-[-50%] left-[132.50px] top-[132.50px] absolute bg-[#072f6c]/30 rounded-full animate-[wave2_1.2s_ease-out_infinite]" />
            <div className="w-[240px] h-[240px] translate-x-[-50%] translate-y-[-50%] left-[132.50px] top-[132.50px] absolute bg-gradient-to-b from-[#c7d6eb]/40 to-[#c8d6ec]/5 rounded-full animate-[wave3_1.4s_ease-out_infinite]" />
            <div className={data.bubbleClass}>
              <TestimonialBubble
                position={data.position}
                message={data.message}
                name={data.name}
                title={data.title}
                popupClass={data.popupClass}
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
        <div className="relative w-[200px] h-[200px]">
          <style>{styles}</style>
          <div className="w-[180px] h-[180px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6c95d3]/30 rounded-full animate-[wave_1s_ease-out_infinite]" />
          <div className="w-[120px] h-[120px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#072f6c]/30 rounded-full animate-[wave2_1.2s_ease-out_infinite]" />
          <div className="w-[200px] h-[200px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#c7d6eb]/40 to-[#c8d6ec]/5 rounded-full animate-[wave3_1.4s_ease-out_infinite]" />
          <img
            className="w-[100px] h-[100px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            src={data.image}
            alt={`${data.name}'s testimonial`}
          />
        </div>
        <div className="w-full max-w-[280px]">
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
          className="w-full p-10 flex justify-center items-center gap-2.5"
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
          {/* <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-[#072f6c]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}
