import { RelatedProductIds, Image } from "@/types/global"
import { getStrapiUrl } from "@lib/utils"

export const handleDownloadPDF = (PDF_Link: string, name: string) => {
  if (PDF_Link) {
    console.log("PDF_Link", PDF_Link)
    const link = document.createElement("a")
    link.href = getStrapiUrl(PDF_Link)
    link.download = `${name || "demo"}.pdf`
    link.target = "_blank"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// 转换函数：将 relatedProductIds 中的 sizeDescription 和 sizeImage 转换为目标格式
export const convertSelectorData = (
  relatedProductIds: RelatedProductIds
): any => {
  const sizeResult: { [size: string]: { description: string; image: Image } } =
    {}

  // 遍历 relatedProductIds 的所有属性
  Object.entries(relatedProductIds).forEach(([key, value]) => {
    console.log("key", key)
    console.log("value", value)
    // 匹配 sizeDescription_10x10 格式
    const descMatch = key.match(/sizeDescription_(\d+)x(\d+)/)
    if (descMatch) {
      const [, width, length] = descMatch
      const sizeKey = `${width}'x${length}'`

      if (!sizeResult[sizeKey]) {
        sizeResult[sizeKey] = { description: "", image: {} as Image }
      }
      sizeResult[sizeKey].description = value as string
    }

    // 匹配 sizeImage_10x10 格式
    const imgMatch = key.match(/sizeImage_(\d+)x(\d+)/)
    if (imgMatch) {
      const [, width, length] = imgMatch
      const sizeKey = `${width}'x${length}'`

      if (!sizeResult[sizeKey]) {
        sizeResult[sizeKey] = { description: "", image: {} as Image }
      }
      sizeResult[sizeKey].image = value as Image
    }
  })

  return {
    PDF_Link_glassdoor: relatedProductIds.PDF_Link_glassdoor,
    PDF_Link_pergola: relatedProductIds.PDF_Link_pergola,
    PDF_Link_sunshade: relatedProductIds.PDF_Link_sunshade,
    PDF_Link_heater: relatedProductIds.PDF_Link_heater,
    sizeData: sizeResult,
  }
}
