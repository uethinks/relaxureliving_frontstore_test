import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { Homepage as Homepage } from "@modules/home/homepage/page"

export const metadata: Metadata = {
  title: "Relaxureliving",
  description:
    "At Relaxure, we believe everyone deserves access to extraordinary outdoor living—without compromising on quality, functionality, or price. We're bridging the gap between overpriced luxury and underwhelming alternatives because we know your backyard is more than open space—it's where memories are made, connections flourish, and life's best moments unfold.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return <Homepage />
}
