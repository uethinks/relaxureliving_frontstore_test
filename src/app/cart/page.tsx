import { getRegion } from "@lib/data/regions"
import { ProductPage } from "@modules/cart/components/ProductPage/ProductPage"
import { getProductByProductType } from "@lib/data/products"
import { StoreProductListParams } from "@medusajs/types"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"

type Props = Readonly<{
  params: Promise<{ pergola: string }>
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
  const region = await getRegion(defaultCountryCode)
  // Get accessories data
  const accessories = await getProductsForAccessory({
    regionId: region?.id ?? "",
  })
  return <ProductPage accessories={accessories} />
}
