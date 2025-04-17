import React from "react"
import Image from "next/image"
import { ReviewType } from "./CustomerReviews"

interface ImageReviewModalProps {
  isOpen: boolean
  onClose: () => void
  review: ReviewType
  currentReviewIndex: number
  onReviewChange: (index: number) => void
  totalReviews: number
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-yellow-400 text-lg">
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  )
}

export const ImageReviewModal: React.FC<ImageReviewModalProps> = ({
  isOpen,
  onClose,
  review,
  currentReviewIndex,
  onReviewChange,
  totalReviews,
}) => {
  const [isLoading, setIsLoading] = React.useState(true)

  // Handle keyboard events
  React.useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        const newIndex =
          currentReviewIndex === 0 ? totalReviews - 1 : currentReviewIndex - 1
        onReviewChange(newIndex)
      } else if (e.key === "ArrowRight") {
        const newIndex =
          currentReviewIndex === totalReviews - 1 ? 0 : currentReviewIndex + 1
        onReviewChange(newIndex)
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentReviewIndex, totalReviews, onReviewChange, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
      >
        ×
      </button>

      {/* Modal content */}
      <div className="w-full h-full md:h-[90vh] md:w-[90vw] bg-white rounded-lg overflow-hidden">
        <div className="h-full flex flex-col md:flex-row">
          {/* Image section */}
          <div className="w-full md:w-2/3 h-1/2 md:h-full relative bg-black">
            {review.images && review.images.length > 0 && (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                  </div>
                )}
                <Image
                  src={review.images[0]}
                  alt="Review photo"
                  fill
                  className="object-contain"
                  onLoadingComplete={() => setIsLoading(false)}
                  priority
                />
                {totalReviews > 1 && (
                  <>
                    {/* Previous button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const newIndex =
                          currentReviewIndex === 0
                            ? totalReviews - 1
                            : currentReviewIndex - 1
                        onReviewChange(newIndex)
                        setIsLoading(true)
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 flex items-center justify-center text-gray-800 transition-all shadow-lg z-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    {/* Next button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const newIndex =
                          currentReviewIndex === totalReviews - 1
                            ? 0
                            : currentReviewIndex + 1
                        onReviewChange(newIndex)
                        setIsLoading(true)
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 flex items-center justify-center text-gray-800 transition-all shadow-lg z-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Review info section */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-6 bg-white">
            {/* User info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-lg font-medium">
                  {review.author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.author}</span>
                  {review.verified && (
                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} />
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
              </div>
            </div>

            {/* Review content */}
            <h4 className="font-medium text-lg mb-2">{review.title}</h4>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {review.content}
            </p>

            {/* Merchant response */}
            {review.response && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm">P</span>
                  </div>
                  <p className="font-medium">{review.response.author}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {review.response.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
