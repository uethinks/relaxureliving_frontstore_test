import { getPolicy } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import PolicyClient from "./PolicyClient"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

export async function generateMetadata({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ id: string }> }) {
  const resolvedSearchParams = await searchParams
  
  // 使用searchParams中的id作为主要ID
  const id = resolvedSearchParams.id
  if (!id) {
    return {}
  }
  
  const policy = await getPolicy(id)
  return generateMetadataFromStrapi(policy?.data?.seo || {})
}

export default async function PagePolicy({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ id: string }> }) {
  const resolvedSearchParams = await searchParams
  
  console.log("resolvedSearchParams", resolvedSearchParams)
  // 使用searchParams中的id
  const id = resolvedSearchParams.id
  
  if (!id) {
    return <div>No policy ID provided</div>
  }
  
  // 在服务器端获取初始数据
  const policyRes = await getPolicy(id)
  const policy = policyRes?.data

  return <PolicyClient initialPolicy={policy} />
}
