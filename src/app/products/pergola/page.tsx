import { notFound } from "next/navigation"
import { getProductByProductId } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { V2ProductItem } from "@modules/products/single"
import {
  getGlassdoor,
  getHeater,
  getPergola,
  getShades,
  getStandardPergola,
} from "@lib/cms/strapiCmsApi"
import { StoreProduct, StoreProductResponse } from "@medusajs/types"
import { Metadata } from "next"
import {
  generateMetadataFromStrapi,
  getStrapiStructuredDataScript,
} from "@lib/util/seo"
import PerformanceMonitor from "@/components/PerformanceMonitor"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

// 强制静态生成
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

type ProductInformation = {
  id: number
  productTitle: string
  productSubtitle: string
  productDescription: string
  urlLink: string
}

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>


// 动态metadata
export async function generateMetadata(): Promise<Metadata> {
  const pergolaData = await getPergola()
  console.log("generateMetadata pergolaData", pergolaData)
  
  const baseMetadata = generateMetadataFromStrapi(pergolaData?.data?.seo || {})
  
  // 添加性能优化的 meta 标签
  return {
    ...baseMetadata,
    other: {
      'format-detection': 'telephone=no',
      'theme-color': '#F6AF1F',
    },
  }
}

export async function generateStaticParams() {
  try {
    // 1. 获取所有pergola数据
    const pergolaResponse = await getPergola()
    const pergolaData = pergolaResponse.data

    // 2. 确保有产品信息
    if (!pergolaData.productInformations?.length) {
      throw new Error("No product information available")
    }

    // 3. 生成所有可能的路径参数
    return pergolaData.productInformations.map(
      (product: ProductInformation) => ({
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
    const { pergola } = await params
    // 1. 并行获取基础数据
    const [
      region,
      heaterResponse,
      shadesResponse,
      glassDoorResponse,
      standardPergolaResponse,
    ] =
      await Promise.all([
        getRegion(defaultCountryCode),
        getHeater(),
        getShades(),
        getGlassdoor(),
        getStandardPergola(),
      ])
    
    // Extract data from responses
    const heaterCMData = heaterResponse.data
    const shadesCMData = shadesResponse.data
    const glassDoorCMData = glassDoorResponse.data
    const standardPergolaData = standardPergolaResponse.data
    const structuredDataScript = getStrapiStructuredDataScript(
      standardPergolaResponse?.data?.seo
    )
    console.log("structuredDataScript", structuredDataScript)
    
    // Validate region
    if (!region) {
      throw new Error(`Region not found for country code: ${defaultCountryCode}`)
    }
    
    // console.log("pergolaData", pergolaData)
    console.log("standardPergolaData", standardPergolaData)
    // // 2. 获取当前产品信息
    // const currentProductInfo = pergolaData.productInformations.find(
    //   (product: ProductInformation) => product.urlLink === pergola
    // )
    // if (!currentProductInfo) {
    //   notFound()
    // }

    // 3. 并行获取所有相关产品数据
    const { relatedProductIds } = standardPergolaData
    const [mainProduct, heaterProduct, shadesProduct, glassDoorProduct] =
      await Promise.all([
        getProductByProductId({
          productId: relatedProductIds.pergolaId,
          queryParams: {
            fields: `*variants.calculated_price`,
            region_id: region.id,
          },
        }),
        getProductByProductId({
          productId: relatedProductIds.heaterId,
          queryParams: {
            fields: `*variants.calculated_price`,
            region_id: region.id,
          },
        }),
        getProductByProductId({
          productId: relatedProductIds.shadesId,
          queryParams: {
            fields: `*variants.calculated_price`,
            region_id: region.id,
          },
        }),
        getProductByProductId({
          productId: relatedProductIds.glassDoorId,
          queryParams: {
            fields: `*variants.calculated_price`,
            region_id: region.id,
          },
        }),
      ])
    
    // Validate products
    if (!mainProduct) {
      throw new Error(`Product not found: ${relatedProductIds.pergolaId}`)
    }
    if (!heaterProduct) {
      throw new Error(`Product not found: ${relatedProductIds.heaterId}`)
    }
    if (!shadesProduct) {
      throw new Error(`Product not found: ${relatedProductIds.shadesId}`)
    }
    if (!glassDoorProduct) {
      throw new Error(`Product not found: ${relatedProductIds.glassDoorId}`)
    }
    const accessoriesCMSData = {
      heaterCMSData: heaterCMData,
      shadesCMSData: shadesCMData,
      glassDoorCMSData: glassDoorCMData,
    }
    // 4. 转换数据格式
    const mainProductData = mainProduct.product as StoreProduct
    const accessoriesData = [
      heaterProduct,
      shadesProduct,
      glassDoorProduct,
    ].map((product) => product.product as StoreProduct)

    // 5. 渲染页面
    return (
      <>
        {/* 性能监控 */}
        {/* <PerformanceMonitor /> */}
        
        {/* 预加载关键资源 */}
        {standardPergolaData?.productImages?.[0]?.url && (
          <link
            rel="preload"
            as="image"
            href={standardPergolaData.productImages[0].url}
            fetchPriority="high"
          />
        )}

        {structuredDataScript && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredDataScript }}
          />
        )}
        
        <V2ProductItem
          product={mainProductData}
          accessories={accessoriesData}
          standardPergolaData={standardPergolaData}
          accessoriesCMSData={accessoriesCMSData}
          // currentProductInfo={currentProductInfo}
        />
      </>
    )
  } catch (error) {
    console.error("Error rendering product page:", error)
    notFound()
    return null // 添加明确的return语句以满足Sonar要求
  }
}
