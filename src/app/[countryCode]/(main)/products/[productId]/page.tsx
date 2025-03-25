import { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getProductByProductId,
  listProductsForStaticParams,
  getProductByProductType,
} from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import { ProductItem } from "@modules/products/single"
import { StoreProductParams, StoreProductListParams } from "@medusajs/types"
type Props = Readonly<{
  params: Promise<{ countryCode: string; handle: string; productId: string }>
}>

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const products = await Promise.all(
      countryCodes.map(async (countryCode) => {
        const response = await listProductsForStaticParams({
          countryCode: countryCode,
          queryParams: { handle: "pergola" },
        })
        return response.response.products.map((product) => ({
          countryCode: countryCode,
          handle: product.handle,
          id: product.id,
        }))
      })
    ).then((results) => results.flat())

    const productPages = products
      .map((product) => ({
        countryCode: product.countryCode,
        handle: product.handle,
        productId: product.id,
      }))
      .filter((param) => param.productId)

    return productPages
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

async function getSingleProduct(productId: string, regionId: string) {
  const queryParams: StoreProductParams = {
    fields: `*variants.calculated_price`,
    region_id: regionId,
  }
  return await getProductByProductId({ productId, queryParams }).then(
    ({ product }) => product
  )
}

async function getProductsForAccessory({ regionId }: { regionId: string }) {
  const queryParams: StoreProductListParams = {
    fields: `*variants.calculated_price`,
    region_id: regionId,
    type_id: "ptyp_01JPP7MCZ9JAQNZJ55V91XWCSY",
  }
  return await getProductByProductType({ queryParams }).then(
    ({ products }) => products
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { productId, countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }
  const product = await getSingleProduct(productId, region.id)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Relaxureliving`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Relaxureliving`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  if (!region) {
    notFound()
  }

  const product = await getSingleProduct(params.productId, region.id)
  const accessories = await getProductsForAccessory({
    regionId: region.id,
  })
  if (!product) {
    notFound()
  }
  return <ProductItem product={product} accessories={accessories} />
}
