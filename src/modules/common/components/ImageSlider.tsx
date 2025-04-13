import { useState } from "react"

interface ImageSliderProps {
  images: { url: string }[]
  className?: string
}

export const ImageSlider = ({
  images,
  className = "",
}: ImageSliderProps): JSX.Element => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Main Image */}
      <div className="relative w-full h-full rounded-[20px] overflow-hidden">
        <img
          src={images[currentImageIndex]?.url}
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prevImage}
            className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)] hover:bg-[#ffffff90]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#343A40"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="flex w-9 h-9 items-center justify-center gap-2.5 p-1.5 relative bg-[#ffffff73] rounded-[18px] border border-solid border-[#ffffffad] backdrop-blur-[29.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(29.4px)_brightness(100%)] hover:bg-[#ffffff90]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#343A40"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentImageIndex === index
                  ? "bg-white w-4"
                  : "w-2 bg-[rgba(255,255,255,0.3)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
