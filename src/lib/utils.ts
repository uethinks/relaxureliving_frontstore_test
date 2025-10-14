import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const assetsStrapiBaseURL = process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL
console.log("assetsStrapiBaseURL", assetsStrapiBaseURL)


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiUrl(path: string | undefined | null) {
  if (!path) {
    return null
  }
  if (path.startsWith("/img")) {
    console.log("getStrapiUrl path start with img",  path)
    return path
  }
  if(path.startsWith("http")) {
    return path
  }
  //自定义的之前上传的 /uploads/craftsmanship3_86368d690c.png
  //if path starts with /uploads then remove it and concat with assetsStrapiBaseURL
  if (path.startsWith("/uploads")) {
    const newPath = path.replace("/uploads", "")
    console.log("getStrapiUrl path starts with /uploads", newPath)
    return `${assetsStrapiBaseURL}${newPath}`
  }
  console.log("getStrapiUrl path", path)  
  return `${assetsStrapiBaseURL}${path}`  
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