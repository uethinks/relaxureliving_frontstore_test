import React from "react"
import Image from "next/image"

interface ReviewType {
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
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Reviews Overview Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-8">Customer Reviews</h2>
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <StarRating rating={averageRating} />
            <span className="text-xl font-medium">
              {averageRating} out of 5
            </span>
          </div>
          <p className="text-gray-600 mb-8">Based on {totalReviews} reviews</p>

          {/* Rating Distribution */}
          <div className="max-w-md mx-auto">
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
      <div className="mb-16">
        <h3 className="text-xl font-medium mb-6">Customer photos & videos</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {reviews
            .filter((review) => review.images && review.images.length > 0)
            .flatMap((review) => review.images || [])
            .slice(0, 7)
            .map((image, index) => (
              <div
                key={index}
                className="min-w-[120px] h-[120px] relative rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt="Customer review photo"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          <button className="min-w-[120px] h-[120px] bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            See more
          </button>
        </div>
      </div>

      {/* Review Cards - Flex Column Layout */}
      <div className="hidden xl:flex gap-8">
        {/* Large screens - 3 columns */}
        {splitReviews(reviews, 3).map((columnReviews, columnIndex) => (
          <div key={columnIndex} className="w-1/3 flex flex-col gap-8">
            {columnReviews.map((review: ReviewType) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:flex xl:hidden gap-8">
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
          {review.images.length === 1 ? (
            // Single image layout
            <div className="w-full h-[200px] relative rounded-lg overflow-hidden">
              <Image
                src={review.images[0]}
                alt="Review photo"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            // Multiple images layout
            <div className="flex gap-2 overflow-x-auto">
              {review.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="w-full h-[200px] min-w-[200px] relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt="Review photo"
                    fill
                    className="object-cover"
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
