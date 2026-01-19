import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"

import { getProductByProductType } from "@lib/data/products"
import { StoreProductListParams } from "@medusajs/types" 
import { CartPage } from "@modules/cart/components/ProductPage/CartPage"

const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"


// 强制静态生成
export const dynamic = "force-static"

// ISR 缓存策略 - 1小时重新验证
export const revalidate = 3600

// 生成动态 metadata
export const metadata: Metadata = {
  title: `Check Out Your Cart | Relaxure`,
  description: `N/A`,
  openGraph: {
    title: `Check Out Your Cart | Relaxure`,
    description: `N/A`,
    url: "/",
  },
  keywords: [
    "pergola",
    "outdoor shade",
    "smart home",
    "relaxure",
    "aluminum pergola",
  ],
  robots: "noindex, nofollow",
}

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

async function getProductsForAccessory({ regionId }: { regionId: string }) {
  const queryParams: StoreProductListParams = {
    fields: `*variants.calculated_price`,
    region_id: regionId,
    type_id: "ptyp_01JPP7MCZ9JAQNZJ55V91XWCSY",
  }
  const { products } = await getProductByProductType({ queryParams })
  return products
}

export default async function Cart(props: Props) {
  const region = await getRegion(defaultCountryCode)
  // Get accessories data
  const accessories = await getProductsForAccessory({
    regionId: region?.id ?? "",
  })
  return <CartPage accessories={accessories} />
}
