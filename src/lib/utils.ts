import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiUrl(path: string) {
  return `${strapiUrl}${path}`
}
