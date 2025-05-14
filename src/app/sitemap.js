import { getAllTerms } from "@lib/cms/strapiCmsApi"
import { getPergola } from "@lib/cms/strapiCmsApi"
import { getRegion } from "@lib/data/regions"
import { listProductsForStaticParams } from "@lib/data/products"

// 定义所有可能的条款类型
const termsTypes = [
  "terms-of-service",
  "privacy-policy",
  "warranty",
  "refund-policy",
  "shipping-policy",
  "intellectual-property-right",
]

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://relaxureliving.com"
  const countryCode = "us"

  // 获取所有产品数据
  const region = await getRegion(countryCode)
  if (!region) {
    return []
  }

  const { response } = await listProductsForStaticParams({
    countryCode,
    regionId: region.id,
  })

  // 获取所有 pergola 数据
  const pergolaData = await getPergola()
  if (!pergolaData?.data) {
    return []
  }

  // 生成产品页面 URL
  const productUrls = pergolaData.data.productInformations.map((product) => ({
    url: `${baseUrl}/${countryCode}/products/${product.urlLink}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // 生成配件页面 URL
  const accessoryUrls = pergolaData.data.productInformations.map((product) => ({
    url: `${baseUrl}/${countryCode}/products/${product.urlLink}/accessories`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // 生成条款页面 URL
  const termsUrls = termsTypes.map((type) => ({
    url: `${baseUrl}/${countryCode}/terms/${type}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  // 生成其他静态页面 URL
  const staticPages = [
    {
      url: `${baseUrl}/${countryCode}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${countryCode}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/${countryCode}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  return [...staticPages, ...productUrls, ...accessoryUrls, ...termsUrls]
}
