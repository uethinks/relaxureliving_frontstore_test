import { getBlogPage, getBlogs, getTags } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import { Metadata } from "next"
import { Suspense } from "react"
import BlogPageClient from "./BlogPageClient"

export async function generateMetadata(): Promise<Metadata> {
  const blogPageData = await getBlogPage()
  // 使用第一篇博客的SEO数据作为页面元数据，或者可以创建专门的博客页面SEO配置
  const seoData = blogPageData?.data?.seo || {}
  return generateMetadataFromStrapi(seoData)
}

export default async function PageBlog() {
  // 在服务器端获取初始数据
  const [blogRes, tagsRes] = await Promise.all([
    getBlogs({ current: 1 }),
    getTags(),
  ])

  const initialBlogs = blogRes?.data || []
  const initialTags = tagsRes?.data || []
  const initialTotal = blogRes?.meta?.pagination?.pageCount || 0
  const initialPage = 1
  const initialCurrentTags = undefined

  return (
    <Suspense>
      <BlogPageClient
        initialBlogs={initialBlogs}
        initialTags={initialTags}
        initialTotal={initialTotal}
        initialPage={initialPage}
        initialCurrentTags={initialCurrentTags}
      />
    </Suspense>
  )
}
