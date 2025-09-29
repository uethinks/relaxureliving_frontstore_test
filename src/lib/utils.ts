import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiUrl(path: string) {
  if (path.startsWith("/img")) {
    return path
  }
  return `${strapiUrl}${path}`
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0)


export const getBackgroundColor = (color?: string) => {
  switch (color) {
    case "white":
      return "bg-white"
    case "gray":
      return "bg-[#F7F7F5]"
    case "black":
      return "bg-black"
    // 其他颜色
    default:
      return "bg-transparent"
  }
}