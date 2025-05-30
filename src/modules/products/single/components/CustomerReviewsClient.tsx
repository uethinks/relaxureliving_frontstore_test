"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ImageReviewModal } from "./ImageReviewModal"
import { Image as ImageType } from "../../../../types/global"

export interface ReviewType {
  id: number
  stars: number
  date: string
  name: string
  title: string
  review: string
  image: ImageType[]
  relaxure_team?: string
}

interface CustomerReviewsProps {
  productId?: string
  reviews: ReviewType[]
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-[6px]">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <img
            key={star}
            src="/img/star.png"
            alt="star"
            className="w-[16px] h-[16px]"
          />
        ) : null
      )}
    </div>
  )
}

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

export const CustomerReviewsClient: React.FC<CustomerReviewsProps> = ({
  productId,
  reviews: initialReviews,
}) => {
  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9) // Default for large screens
  const [imagesToShow, setImagesToShow] = useState(7) // 默认大屏

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setImagesToShow(7)
        setItemsPerPage(9)
      } else if (window.innerWidth >= 768) {
        setImagesToShow(4)
        setItemsPerPage(8)
      } else {
        setImagesToShow(1)
        setItemsPerPage(4)
      }
    }

    handleResize() // Initial call
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(reviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReviews = reviews.slice(startIndex, endIndex)

  const averageRating = 5
  const ratingDistribution = [300, 97, 0, 0, 0]

  if (isLoading) {
    return null
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto py-16 text-center text-red-500">
        {error}
      </div>
    )
  }

  // Get all reviews that have images
  const reviewsWithImages = reviews.filter(
    (review) => review.image && review.image.length > 0
  )
  const [currentImagePop, setCurrentImagePop] = useState<ReviewType>(
    reviewsWithImages[0]
  )
  useEffect(() => {
    console.log("currentReviewIndex", currentReviewIndex)
    setCurrentImagePop(
      reviewsWithImages[currentReviewIndex] || reviewsWithImages[0]
    )
  }, [currentReviewIndex])
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

  // Pagination controls component
  const PaginationControls = () => {
    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto py-16 bg-[#F3F3F3] px-5 lg:px-[63px] mt-10 lg:mt-[80px] rounded-[20px]">
      {/* Reviews Overview Section */}
      <div className="mb-5">
        <h2 className="font-700 text-[18px] lg:text-[36px] font-bold font-merriweather text-center mb-8">
          Loved By Homeowners
        </h2>
        <p className="text-[16px] lg:text-[18px] font-medium font-relaxure-sub-heading-18 text-[#343A40] text-center mb-8">
          Star rating 98% Customer Satisfaction
        </p>

        {/* Flex container for rating overview and distribution */}
        <div className="flex flex-row md:flex-row justify-center items-center gap-4 lg:gap-16 relative">
          {/* Rating Overview */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <StarRating rating={averageRating} />
              <span className="text-[14px] font-[600] lg:text-[18px]">
                4.90 out of 5
              </span>
              <p className="text-[14px] font-[600] lg:text-[18px]">
                Based on 397 reviews
              </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-[2px] h-32 bg-gray-200"></div>

          {/* Rating Distribution */}
          <div className="">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <StarRating rating={stars} />

                {ratingDistribution[5 - stars] > 0 && (
                  <span className="text-[14px] font-[600] lg:text-[18px]text-left">
                    {ratingDistribution[5 - stars]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Photos Section */}
      <div className="mb-16 flex flex-col items-center">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {reviewsWithImages.slice(0, imagesToShow).map((review, index) => (
            <div
              key={review.id}
              className="min-w-[120px] h-[120px] relative rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              {review.image[0]?.formats?.small?.url && (
                <img
                  src={`${strapiUrl}${review.image[0].formats.small.url}`}
                  alt="Customer review photo"
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
              )}
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
          review={currentImagePop}
          currentReviewIndex={currentReviewIndex}
          onReviewChange={setCurrentReviewIndex}
          totalReviews={reviewsWithImages.length}
        />
      )}

      {/* Review Cards - Flex Column Layout */}
      <div className="hidden xl:flex justify-between gap-8">
        {/* Large screens - 3 columns */}
        {splitReviews(currentReviews, 3).map((columnReviews, columnIndex) => (
          <div key={columnIndex} className="w-1/3 flex flex-col gap-8">
            {columnReviews.map((review: ReviewType) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:flex xl:hidden justify-between gap-8">
        {/* Medium screens - 2 columns */}
        {splitReviews(currentReviews, 2).map((columnReviews, columnIndex) => (
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
          {currentReviews.map((review: ReviewType) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Add pagination controls */}
      <PaginationControls />
    </div>
  )
}

interface ReviewCardProps {
  review: ReviewType
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]">
      {/* First row: Rating and Date */}
      <div className="flex justify-between items-center mb-4">
        <StarRating rating={review.stars} />
        <span className="text-gray-500 text-sm">{review.date}</span>
      </div>

      {/* Second row: User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 text-lg font-medium">
            {(review.name || "A").charAt(0)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{review.name || "Anonymous"}</span>
          {review.relaxure_team && (
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Third row: Images */}
      {review.image && review.image.length > 0 && (
        <div className="w-full mb-4">
          {/* Main image */}
          <div
            className="w-full h-[200px] relative rounded-lg overflow-hidden group cursor-pointer mb-2"
            onClick={() => handleImageClick(0)}
          >
            {review.image[0]?.formats?.small?.url && (
              <img
                src={`${strapiUrl}${review.image[0].formats.small.url}`}
                alt="Review photo"
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
              />
            )}
          </div>

          {/* Thumbnail images */}
          {review.image.length > 1 && (
            <div className="flex gap-2 justify-center">
              {review.image.slice(1).map((image: ImageType, index: number) => (
                <div
                  key={index}
                  className="w-16 h-16 relative rounded-lg overflow-hidden group cursor-pointer flex-shrink-0"
                  onClick={() => handleImageClick(index + 1)}
                >
                  {image.formats?.small?.url && (
                    <img
                      src={`${strapiUrl}${image.formats.small.url}`}
                      alt="Review photo thumbnail"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Review Content */}
      <h4 className="font-medium text-[18px] font-relaxure-sub-heading-18 text-[#343A40] mb-2">
        {review.title}
      </h4>
      <p className="text-[#343A40] mb-4 font-relaxure-sub-heading-18 leading-relaxed">
        {review.review}
      </p>

      {/* Merchant response */}
      {review.relaxure_team && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">P</span>
            </div>
            <p className="font-medium text-[#343A40] text-[18px] font-relaxure-sub-heading-18">
              Relaxure Team
            </p>
          </div>
          <p className="text-[#343A40] font-relaxure-sub-heading-18 leading-relaxed">
            {review.relaxure_team}
          </p>
        </div>
      )}

      {/* Image Modal */}
      {review.image && review.image.length > 0 && (
        <ImageReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          review={review}
          currentReviewIndex={currentImageIndex}
          onReviewChange={setCurrentImageIndex}
          totalReviews={review.image.length}
        />
      )}
    </div>
  )
}
