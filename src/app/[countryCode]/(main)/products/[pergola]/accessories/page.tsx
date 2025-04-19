import { Metadata } from "next"
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
import { AccessoriesGrid } from "@modules/products/single/components/AccesorriesSelector/AccessoriesGrid"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"

const LazyOurPromise = dynamic(() =>
  import("@modules/home/homepage/page/sections/OurPromise").then((mod) => ({
    default: mod.OurPromise,
  }))
)

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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }
  const { products } = await getProductByHandle({
    region_id: region.id,
    handle: params.pergola,
  })
  if (!products.length) {
    notFound()
  }

  return {
    title: `${products[0].title} Accessories | Relaxureliving`,
    description: `Accessories for ${products[0].title}`,
    openGraph: {
      title: `${products[0].title} Accessories | Relaxureliving`,
      description: `Accessories for ${products[0].title}`,
      images: products[0].thumbnail ? [products[0].thumbnail] : [],
    },
  }
}

export default async function AccessoriesPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  if (!region) {
    notFound()
  }

  // Get the pergola product data
  const { products } = await getProductByHandle({
    region_id: region.id,
    handle: params.pergola,
  })
  if (!products.length) {
    notFound()
  }

  console.log("Pergola product:", products[0])

  // Get accessories data
  const accessories = await getProductsForAccessory({
    regionId: region.id,
  })

  // Extract pergola size from the product data
  const pergolaSize = {
    width: products[0].width || 0,
    length: products[0].length || 0,
  }

  console.log("Pergola size:", pergolaSize)

  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px] px-5 lg:px-20">
        <NavBarWrapper isFixed={false} />
        <div className="content-container py-6 small:py-8">
          <div className="flex flex-col gap-4">
            <AccessoriesGrid accessories={accessories} />
          </div>
        </div>

        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative"></div>
      </div>
      <div className="w-full">
        <Suspense>
          <LazyOurPromise />
        </Suspense>
      </div>
      <FooterDark />
    </>
  )
}
