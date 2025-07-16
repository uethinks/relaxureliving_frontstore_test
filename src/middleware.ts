import { NextRequest, NextResponse } from "next/server"

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")

  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  // if the cache id is set, return next
  if (cacheIdCookie) {
    return NextResponse.next()
  }else{
    const response = NextResponse.next()
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })

    return response
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
