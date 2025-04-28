// app/api/hello/route.js
import { revalidateTag } from "next/cache"

export async function GET(req) {
  try {
    // 从 URL 中获取查询参数
    const { searchParams } = new URL(req.url)
    const tags = searchParams.get("tags")

    if (!tags) {
      return new Response(JSON.stringify({ error: "No tags provided" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // 将标签字符串分割成数组
    const tagArray = tags.split(",").map((tag) => tag.trim())

    // 清除每个标签的缓存
    tagArray.forEach((tag) => {
      revalidateTag(tag)
    })

    return new Response(
      JSON.stringify({
        message: "Cache cleared successfully",
        clearedTags: tagArray,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to revalidate" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
