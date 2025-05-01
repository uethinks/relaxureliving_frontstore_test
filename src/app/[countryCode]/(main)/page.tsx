import { getRegion } from "@lib/data/regions"
import { Homepage as Homepage } from "@modules/home/homepage/page"

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return <Homepage />
}
