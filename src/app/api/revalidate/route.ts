import { revalidateTag, revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("APIRevalidate request headers", request.headers)
    console.log("APIRevalidate request body", request.body)
    const body = await request.json()
    console.log("APIRevalidate request body", JSON.stringify(body))
    const strapiToken = request.headers.get("x-strapi-token")
    console.log("APIRevalidate request strapiToken", strapiToken)
    if (strapiToken !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      )
    }
    // const { tag, secret } = body

    // // 验证密钥
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json(
    //     { message: "Invalid secret" },
    //     { status: 401 }
    //   )
    // }

    // if (!tag) {
    //   return NextResponse.json(
    //     { message: "Missing tag parameter" },
    //     { status: 400 }
    //   )
    // }


    // 重新验证指定标签的缓存
    revalidateTag("homepage")
    revalidatePath("/")     
    revalidatePath("/products/custom")
    revalidatePath("/products/pergola")
    revalidatePath("/about-us")
    revalidatePath("/accessories")
    revalidatePath("/terms/warranty")
    revalidatePath("/terms/refund-policy")
    revalidatePath("/terms/terms-of-service")
    revalidatePath("/terms/privacy-policy")
    revalidatePath("/accessories")
    revalidatePath("/accessories/glassdoor")
    revalidatePath("/accessories/heater")
    revalidatePath("/accessories/sample-kit")
    revalidatePath("/accessories/shades")
    revalidatePath("/faq")
    revalidatePath("/delivery-warranty")
    revalidatePath("/innovation")
    revalidatePath("/our-collection")
  

    return NextResponse.json({
      revalidated: true,
      message: `Successfully revalidated paths`,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    )
  }
} 