import React, { useState } from "react"
import Image from "next/image"
import { ImageReviewModal } from "./ImageReviewModal"

export interface ReviewType {
  id: string
  rating: number
  date: string
  author: string
  title: string
  content: string
  images?: string[]
  verified?: boolean
  response?: {
    author: string
    content: string
  }
}

interface CustomerReviewsProps {
  averageRating: number
  totalReviews: number
  ratingDistribution: number[]
  reviews: ReviewType[]
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

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  averageRating,
  totalReviews,
  ratingDistribution,
  reviews,
}) => {
  // Get all reviews that have images
  const reviewsWithImages = reviews.filter(
    (review) => review.images && review.images.length > 0
  )
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (reviewIndex: number) => {
    setCurrentReviewIndex(reviewIndex)
    setIsModalOpen(true)
  }

  const handleSeeMoreClick = () => {
    if (reviewsWithImages.length > 0) {
      setCurrentReviewIndex(0)
      setIsModalOpen(true)
    }
  }

  // Split reviews into columns based on screen size
  const splitReviews = (reviewList: ReviewType[], columnCount: number) => {
    const columns: ReviewType[][] = Array.from(
      { length: columnCount },
      () => []
    )
    reviewList.forEach((review, index) => {
      columns[index % columnCount].push(review)
    })
    return columns
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-16">
      {/* Reviews Overview Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Customer Reviews
        </h2>

        {/* Flex container for rating overview and distribution */}
        <div className="flex flex-col md:flex-row justify-center gap-16 items-center md:items-start">
          {/* Rating Overview */}
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <StarRating rating={averageRating} />
              <span className="text-xl font-medium">
                {averageRating} out of 5
              </span>
              <p className="text-gray-600">Based on {totalReviews} reviews</p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="w-full max-w-md md:max-w-sm">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3 mb-3">
                <StarRating rating={stars} />
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{
                      width: `${
                        (ratingDistribution[5 - stars] / totalReviews) * 100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-gray-600 min-w-[40px] text-right">
                  {ratingDistribution[5 - stars]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Photos Section */}
      <div className="mb-16 flex flex-col items-center">
        <h3 className="text-xl font-medium mb-6">Customer photos & videos</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {reviewsWithImages.slice(0, 7).map((review, index) => (
            <div
              key={review.id}
              className="min-w-[120px] h-[120px] relative rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={review.images![0]}
                alt="Customer review photo"
                fill
                className="object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
          <button
            onClick={handleSeeMoreClick}
            className="min-w-[120px] h-[120px] bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            See more
          </button>
        </div>
      </div>

      {/* Image Review Modal */}
      {reviewsWithImages.length > 0 && (
        <ImageReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          review={reviewsWithImages[currentReviewIndex]}
          currentReviewIndex={currentReviewIndex}
          onReviewChange={setCurrentReviewIndex}
          totalReviews={reviewsWithImages.length}
        />
      )}

      {/* Review Cards - Flex Column Layout */}
      <div className="hidden xl:flex justify-between gap-8">
        {/* Large screens - 3 columns */}
        {splitReviews(reviews, 3).map((columnReviews, columnIndex) => (
          <div key={columnIndex} className="w-1/3 flex flex-col gap-8">
            {columnReviews.map((review: ReviewType) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:flex xl:hidden justify-between gap-8">
        {/* Medium screens - 2 columns */}
        {splitReviews(reviews, 2).map((columnReviews, columnIndex) => (
          <div key={columnIndex} className="w-1/2 flex flex-col gap-8">
            {columnReviews.map((review: ReviewType) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex md:hidden gap-8">
        {/* Small screens - 1 column */}
        <div className="w-full flex flex-col gap-8">
          {reviews.map((review: ReviewType) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ReviewCardProps {
  review: ReviewType
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      {/* First row: Rating and Date */}
      <div className="flex justify-between items-center mb-4">
        <StarRating rating={review.rating} />
        <span className="text-gray-500 text-sm">{review.date}</span>
      </div>

      {/* Second row: User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 text-lg font-medium">
            {review.author.charAt(0)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{review.author}</span>
          {review.verified && (
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Third row: Images */}
      {review.images && review.images.length > 0 && (
        <div className="w-full mb-4">
          {/* Main image */}
          <div className="w-full h-[200px] relative rounded-lg overflow-hidden group cursor-pointer mb-2">
            <Image
              src={review.images[0]}
              alt="Review photo"
              fill
              className="object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
            />
          </div>

          {/* Thumbnail images */}
          {review.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {review.images.slice(1).map((image: string, index: number) => (
                <div
                  key={index}
                  className="w-16 h-16 relative rounded-lg overflow-hidden group cursor-pointer flex-shrink-0"
                >
                  <Image
                    src={image}
                    alt="Review photo thumbnail"
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Review Content */}
      <h4 className="font-medium text-lg mb-2">{review.title}</h4>
      <p className="text-gray-600 mb-4 leading-relaxed">{review.content}</p>

      {/* Merchant Response */}
      {review.response && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
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
  )
}
