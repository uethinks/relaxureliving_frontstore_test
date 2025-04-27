import { notFound } from "next/navigation"
import { getProductByProductId } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { ProductItem } from "@modules/products/single"
import { getPergola } from "@lib/cms/strapiCmsApi"
import { StoreProduct, StoreProductResponse } from "@medusajs/types"

type ProductInformation = {
  id: number
  productTitle: string
  productSubtitle: string
  productDescription: string
  urlLink: string
}

type Props = Readonly<{
  params: Promise<{ countryCode: string; pergola: string }>
}>

export async function generateStaticParams() {
  const pergolaData = await getPergola()

  if (!pergolaData?.data?.productInformations) {
    return []
  }

  return pergolaData?.data?.productInformations.map(
    (product: ProductInformation) => ({
      countryCode: "us",
      pergola: product.urlLink,
    })
  )
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  if (!region) {
    notFound()
  }

  // 获取主 pergola 数据
  const pergolaData = await getPergola().catch(() => null)
  if (!pergolaData) {
    notFound()
  }
  console.log("pergolaData", pergolaData)
  // 获取当前产品的信息
  const currentProductInfo = pergolaData.data.productInformations.find(
    (product: ProductInformation) => product.urlLink === params.pergola
  )
  if (!currentProductInfo) {
    notFound()
  }

  // 获取相关产品数据
  const { relatedProductIds } = pergolaData.data
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
  console.log("mainProduct", mainProduct)
  if (!mainProduct) {
    notFound()
  }

  // 将 StoreProductResponse 转换为 StoreProduct
  const mainProductData = mainProduct.product as unknown as StoreProduct
  const accessoriesData = [heaterProduct, shadesProduct, glassDoorProduct].map(
    (product) => product.product as unknown as StoreProduct
  )
  console.log("currentProductInfo", currentProductInfo)
  return (
    <ProductItem
      product={mainProductData}
      accessories={accessoriesData}
      pergolaData={pergolaData.data}
      currentProductInfo={currentProductInfo}
    />
  )
}
