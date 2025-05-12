import {
  CustomerReviewsClient,
  ReviewType,
} from "@/modules/products/single/components/CustomerReviewsClient"
import { getReviews } from "../../../../lib/cms/strapiCmsApi"

export async function CustomerReviewsServer({
  productId,
}: {
  productId?: string
}) {
  try {
    const response = await getReviews()
    const productionReviews = response.data.find((review: any) =>
      review.name?.includes("production page")
    )
    const transformedReviews = productionReviews?.testimonials_item?.map(
      (review: any) => ({
        id: review.id.toString(),
        stars: review.stars,
        date: new Date(review.date).toLocaleDateString(),
        name: review.name,
        title: review.title,
        review: review.review,
        image: review.image,
        relaxure_team: review.relaxure_team,
      })
    )

    // 按日期排序
    const sortedReviews =
      transformedReviews?.sort((a: ReviewType, b: ReviewType) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }) || []

    return (
      <CustomerReviewsClient reviews={sortedReviews} productId={productId} />
    )
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return <CustomerReviewsClient reviews={[]} productId={productId} />
  }
}
