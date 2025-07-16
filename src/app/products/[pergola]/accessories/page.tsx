import { notFound } from "next/navigation"
import { getProductByProductType, getProductByHandle } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { StoreProductListParams } from "@medusajs/types"
import { listProductsForStaticParams } from "@lib/data/products"
import { AccessoriesGrid } from "@modules/products/single/components/AccesorriesSelector/AccessoriesGrid"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
const defaultCountryCode = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "us"
type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export async function generateStaticParams() {
  const region = await getRegion(defaultCountryCode)

  if (!region) {
    return []
  }

  const { response } = await listProductsForStaticParams({
    countryCode: defaultCountryCode,
    regionId: region.id,
  })

  return response.products.map((product) => ({
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

export default async function AccessoriesPage(props: Props) {
  const params = await props.params
  const region = await getRegion(defaultCountryCode)
  if (!region) {
    notFound()
  }

  // Get the pergola product data
  const { products } = await getProductByHandle({
    queryParams: {
      region_id: region.id,
      handle: params.pergola,
    },
  })
  if (!products.length) {
    notFound()
  }

  // Get accessories data
  const accessories = await getProductsForAccessory({
    regionId: region.id,
  })

  // Extract pergola size from the product data
  const pergolaSize = {
    width: products[0].width || 0,
    length: products[0].length || 0,
  }

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
      <FooterDark />
    </>
  )
}
