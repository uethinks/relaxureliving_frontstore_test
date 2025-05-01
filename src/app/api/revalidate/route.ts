import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tag, secret } = body

    // 验证密钥
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      )
    }

    if (!tag) {
      return NextResponse.json(
        { message: "Missing tag parameter" },
        { status: 400 }
      )
    }

    // 重新验证指定标签的缓存
    revalidateTag(tag)

    return NextResponse.json({
      revalidated: true,
      message: `Successfully revalidated tag: ${tag}`,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    )
  }
} 