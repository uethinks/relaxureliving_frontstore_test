import { NextResponse } from "next/server"

import { getSitemap } from "@lib/cms/strapiCmsApi"

export const dynamic = "force-dynamic"

async function generateSiteMap(): Promise<string> {
  return getSitemap()
}

export async function GET() {
  try {
    const sitemap = await generateSiteMap()
    console.log('sitemap', sitemap)
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch {
    return new NextResponse("Sitemap temporarily unavailable", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }
}
