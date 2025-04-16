import { getProduct, getAccessories } from "@lib/data/products"
import { ProductItem } from "./productItem"

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function getStaticProps({ params }) {
  const product = await getProduct(params.id)
  const accessories = await getAccessories()

  return {
    props: {
      product,
      accessories,
    },
    revalidate: 3600, // 每小时重新生成
  }
}

export default function ProductPage({ product, accessories }) {
  return <ProductItem product={product} accessories={accessories} />
}
