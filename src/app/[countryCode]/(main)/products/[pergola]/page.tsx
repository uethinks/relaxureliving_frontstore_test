import { notFound } from "next/navigation"
import {
  getProductByProductType,
  getProductByHandle,
  getProductsListFromStoreApi,
} from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { ProductItem } from "@modules/products/single"
import { StoreProductListParams } from "@medusajs/types"
import { listProductsForStaticParams } from "@lib/data/products"

type Props = Readonly<{
  params: Promise<{ countryCode: string; pergola: string }>
}>

export async function generateStaticParams() {
  const region = await getRegion("us")

  if (!region) {
    return []
  }

  const { response } = await listProductsForStaticParams({
    countryCode: "us",
    regionId: region.id,
  })

  return response.products.map((product) => ({
    countryCode: "us",
    pergola: product.handle,
  }))
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

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  if (!region) {
    notFound()
  }

  const { products } = await getProductByHandle({
    queryParams: {
      fields: `*variants.calculated_price`,
      region_id: region.id,
      handle: params.pergola,
    },
  })
  const accessories = await getProductsForAccessory({
    regionId: region.id,
  })
  if (!products.length) {
    notFound()
  }
  return <ProductItem product={products[0]} accessories={accessories} />
}
