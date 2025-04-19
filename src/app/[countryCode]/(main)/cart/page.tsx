import { getRegion } from "@lib/data/regions"
import { ProductPage } from "@modules/cart/components/ProductPage/ProductPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductByProductType } from "@lib/data/products"
import { StoreProductListParams } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}
type Props = Readonly<{
  params: Promise<{ countryCode: string; pergola: string }>
}>

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

export default async function Cart(props: Props) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)
  // Get accessories data
  const accessories = await getProductsForAccessory({
    regionId: region?.id ?? "",
  })
  return <ProductPage accessories={accessories} />
}
