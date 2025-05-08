import { notFound } from "next/navigation"
import { getProductByProductId } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { ProductItem } from "@modules/products/single"
import { getPergola } from "@lib/cms/strapiCmsApi"
import { StoreProduct, StoreProductResponse } from "@medusajs/types"
import { unstable_cache } from "next/cache"

// 强制静态生成
export const dynamic = "force-static"
export const revalidate = 3600 // 1小时重新验证一次

type ProductInformation = {
  id: number
  productTitle: string
  productSubtitle: string
  productDescription: string
  urlLink: string
}

type Props = Readonly<{
  params: { countryCode: string; pergola: string }
}>

// 缓存pergola数据获取
const getCachedPergola = unstable_cache(
  async () => {
    const pergolaData = await getPergola()
    if (!pergolaData?.data) {
      throw new Error("Failed to fetch pergola data during build")
    }
    return pergolaData.data
  },
  ["pergola-data"],
  { revalidate: 3600 } // 1小时后重新验证
)

// 缓存region数据获取
const getCachedRegion = unstable_cache(
  async (countryCode: string) => {
    const region = await getRegion(countryCode)
    if (!region) {
      throw new Error(`Region not found for country code: ${countryCode}`)
    }
    return region
  },
  ["region-data"],
  { revalidate: 3600 }
)

// 缓存产品数据获取
const getCachedProduct = unstable_cache(
  async (productId: string, regionId: string) => {
    const product = await getProductByProductId({
      productId,
      queryParams: {
        fields: `*variants.calculated_price`,
        region_id: regionId,
      },
    })
    if (!product) {
      throw new Error(`Product not found: ${productId}`)
    }
    return product
  },
  ["product-data"],
  { revalidate: 3600 }
)

export async function generateStaticParams() {
  try {
    // 1. 获取所有pergola数据
    const pergolaData = await getCachedPergola()

    // 2. 确保有产品信息
    if (!pergolaData.productInformations?.length) {
      throw new Error("No product information available")
    }

    // 3. 生成所有可能的路径参数
    return pergolaData.productInformations.map(
      (product: ProductInformation) => ({
        countryCode: "us",
        pergola: product.urlLink,
      })
    )
  } catch (error) {
    // 在构建时如果出错，应该让构建失败
    console.error("Error generating static params:", error)
    throw error
  }
}

export default async function ProductPage({ params }: Props) {
  try {
    const { countryCode, pergola } = await params
    // 1. 并行获取基础数据
    const [pergolaData, region] = await Promise.all([
      getCachedPergola(),
      getCachedRegion(countryCode),
    ])

    // 2. 获取当前产品信息
    const currentProductInfo = pergolaData.productInformations.find(
      (product: ProductInformation) => product.urlLink === pergola
    )
    if (!currentProductInfo) {
      notFound()
    }

    // 3. 并行获取所有相关产品数据
    const { relatedProductIds } = pergolaData
    const [mainProduct, heaterProduct, shadesProduct, glassDoorProduct] =
      await Promise.all([
        getCachedProduct(relatedProductIds.pergolaId, region.id),
        getCachedProduct(relatedProductIds.heaterId, region.id),
        getCachedProduct(relatedProductIds.shadesId, region.id),
        getCachedProduct(relatedProductIds.glassDoorId, region.id),
      ])

    // 4. 转换数据格式
    const mainProductData = mainProduct.product as unknown as StoreProduct
    const accessoriesData = [
      heaterProduct,
      shadesProduct,
      glassDoorProduct,
    ].map((product) => product.product as unknown as StoreProduct)

    // 5. 渲染页面
    return (
      <ProductItem
        product={mainProductData}
        accessories={accessoriesData}
        pergolaData={pergolaData}
        currentProductInfo={currentProductInfo}
      />
    )
  } catch (error) {
    console.error("Error rendering product page:", error)
    notFound()
  }
}
