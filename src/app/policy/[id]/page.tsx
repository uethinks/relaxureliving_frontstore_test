import { getPolicy } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import PolicyClient from "./PolicyClient"
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600
export async function generateMetadata({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ id: string }> }) {
  const { id: searchId } = await searchParams
  const policy = await getPolicy(searchId)
  return generateMetadataFromStrapi(policy?.data?.seo || {})
}

export default async function PagePolicy({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ id: string }> }) {
  const { id: searchId } = await searchParams
  
  // 在服务器端获取初始数据
  const policyRes = await getPolicy(searchId)
  const policy = policyRes?.data

  return <PolicyClient initialPolicy={policy} />
}
