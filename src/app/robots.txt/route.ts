import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
  const robotsTxt = isProduction
    ? `User-agent: *
Allow: /
Sitemap: https://www.relaxureliving.com/api/strapi-5-sitemap-plugin/sitemap.xml`
    : `User-agent: *
Disallow: /`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 
