import { getRegion } from "@lib/data/regions"
import { Homepage as Homepage } from "@modules/home/homepage/page"
import { listRegions } from "@lib/data/regions"

// 生成静态参数
export async function generateStaticParams() {
  const regions = await listRegions()
  return regions.map((region) => ({
    countryCode: region.countries?.[0]?.iso_2 || "us",
  }))
}

// 配置静态生成
export const dynamic = "force-static"
export const revalidate = 3600 // 每小时重新验证一次

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
