import { getBlog, getBlogs, getTags } from "@lib/cms/strapiCmsApi"
import { generateMetadataFromStrapi } from "@lib/util/seo"
import BlogDetailClient from "./BlogDetailClient"

export async function generateMetadata({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ id: string }> }) {
  const { id: searchId } = await searchParams
  const blog = await getBlog(searchId)
  return generateMetadataFromStrapi(blog?.data?.seo || {})
}

export default async function BlogDetail({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams
  console.log("params.id", id)
  
  // 在服务器端获取初始数据
  const [blogRes, recentBlogsRes, tagsRes] = await Promise.all([
    getBlog(id),
    getBlogs({
      pageSize: 3,
      filters: {
        documentId: {
          $ne: id,
        },
      },
    }),
    getTags(),
  ])

  const blog = blogRes?.data
  const recentBlogs = recentBlogsRes?.data || []
  const tags = tagsRes?.data || []

  // 获取上一篇和下一篇博客
  let prevId = null
  let nextId = null

  if (blog) {
    const [prevRes, nextRes] = await Promise.all([
      getBlogs({
        pageSize: 1,
        filters: {
          createdAt: {
            $lt: blog.createdAt,
          },
        },
      }),
      getBlogs({
        pageSize: 1,
        filters: {
          createdAt: {
            $gt: blog.createdAt,
          },
        },
      }),
    ])

    if (prevRes?.data?.length > 0) {
      prevId = {
        slug: prevRes.data[0].slug,
        id: prevRes.data[0].documentId,
      }
    }

    if (nextRes?.data?.length > 0) {
      nextId = {
        slug: nextRes.data[0].slug,
        id: nextRes.data[0].documentId,
      }
    }
  }

  return (
    <BlogDetailClient
      initialBlog={blog}
      initialRecentBlogs={recentBlogs}
      initialTags={tags}
      initialPrevId={prevId}
      initialNextId={nextId}
    />
  )
}
