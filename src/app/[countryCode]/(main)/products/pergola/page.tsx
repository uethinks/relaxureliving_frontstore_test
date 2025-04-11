import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductByProductType, getProductByHandle } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { ProductItem } from "@modules/products/single"
import { StoreProductListParams } from "@medusajs/types"

type Props = Readonly<{
  params: Promise<{ countryCode: string; handle: string; productId: string }>
}>

export async function generateStaticParams() {
  const paths = [{ countryCode: "us", handle: "pergola" }]
  return paths
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
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }
  const { products } = await getProductByHandle({
    region_id: region.id,
    handle: params.handle,
  })
  if (!products.length) {
    notFound()
  }

  return {
    title: `${products[0].title} | Relaxureliving`,
    description: `${products[0].title}`,
    openGraph: {
      title: `${products[0].title} | Relaxureliving`,
      description: `${products[0].title}`,
      images: products[0].thumbnail ? [products[0].thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  if (!region) {
    notFound()
  }

  const { products } = await getProductByHandle({
    region_id: region.id,
    handle: "pergola",
  })
  const accessories = await getProductsForAccessory({
    regionId: region.id,
  })
  if (!products.length) {
    notFound()
  }
  return <ProductItem product={products[0]} accessories={accessories} />
}
