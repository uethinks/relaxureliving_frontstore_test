import Link from "next/link"
import { getProductByProductId } from "@lib/data/products"
import {
  getAccessoriesPage,
  getShades,
  getGlassdoor,
  getHeater,
} from "@lib/cms/strapiCmsApi"
import V2HeroBanner from "@/components/V2HeroBanner"
import V2Button from "@/components/V2Button"

export const AccessoriesGrid = async ({
  showTitle = true,
}: {
  showTitle?: boolean
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

  // 获取配件页面数据
  const accessoriesPage = await getAccessoriesPage()

  if (!accessoriesPage?.data) {
    throw new Error("Failed to fetch accessories page data")
  }

  console.log("accessoriesPage: ", accessoriesPage.data)
  const { banner } = accessoriesPage.data

  // 获取各个产品的数据
  const heater = await getProductByProductId({
    productId: accessoriesPage?.data?.heaterId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  const shades = await getProductByProductId({
    productId: accessoriesPage?.data?.shadeId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  const glassdoor = await getProductByProductId({
    productId: accessoriesPage?.data?.glassdoorId,
    queryParams: {
      fields: `*variants.calculated_price`,
    },
  })

  // 获取配件信息并合并产品数据
  const heaterInfo = await getHeater()
  heaterInfo.data.product = heater.product

  const shadesInfo = await getShades()
  shadesInfo.data.product = shades.product

  const glassdoorInfo = await getGlassdoor()
  glassdoorInfo.data.product = glassdoor.product

  const accessories = {
    heaterInfo: heaterInfo.data,
    shadesInfo: shadesInfo.data,
    glassdoorInfo: glassdoorInfo.data,
  }

  console.log("accessories: ", accessories)

  return (
    <div className="w-full pb-20">
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        {banner?.length > 0 &&
          banner[0].__component === "blocks.v2-hero-banner" && (
            <V2HeroBanner data={banner[0]} />
          )}
      </div>
      <div className="mt-5 px-6 box-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative bg-white overflow-hidden transition-colors">
          <div className="aspect-square overflow-hidden">
            <img
              src={`${baseUrl}${accessories.heaterInfo.productImages?.[0]?.url}`}
              alt={accessories.heaterInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-montserrat text-[22px] font-medium text-black">
                {accessories.heaterInfo.name}
              </h3>
            </div>
          </div>
          <div>
            <span className="text-[24px] font-montserrat font-medium text-black">
              $
              {accessories.heaterInfo.product.variants?.[0]?.calculated_price
                ?.calculated_amount ?? 0}
            </span>
          </div>
          <V2Button
            data={{
              type: "Secondary",
              link: "/accessories/heater",
              size: "Medium",
              text: "Shop Now",
            }}
          />
        </div>
        <div className="relative bg-white overflow-hidden transition-colors">
          <div className="aspect-square overflow-hidden">
            <img
              src={`${baseUrl}${accessories.shadesInfo.productImages?.[0]?.url}`}
              alt={accessories.shadesInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-montserrat text-[22px] font-medium text-black">
                {accessories.shadesInfo.name}
              </h3>
            </div>
          </div>
          <div>
            <span className="text-[24px] font-montserrat font-medium text-black">
              $
              {accessories.shadesInfo.product.variants?.[0]?.calculated_price
                ?.calculated_amount ?? 0}
            </span>
          </div>
          <V2Button
            data={{
              type: "Secondary",
              link: "/accessories/shades",
              size: "Medium",
              text: "Shop Now",
            }}
          />
        </div>

        <div className="relative bg-white overflow-hidden transition-colors">
          <div className="aspect-square overflow-hidden">
            <img
              src={`${baseUrl}${accessories.glassdoorInfo.productImages?.[0]?.url}`}
              alt={accessories.glassdoorInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-montserrat text-[22px] font-medium text-black">
                {accessories.glassdoorInfo.name}
              </h3>
            </div>
          </div>
          <div>
            <span className="text-[24px] font-montserrat font-medium text-black">
              $
              {accessories.glassdoorInfo.product.variants?.[0]?.calculated_price
                ?.calculated_amount ?? 0}
            </span>
          </div>
          <V2Button
            data={{
              type: "Secondary",
              link: "/accessories/glassdoor",
              size: "Medium",
              text: "Shop Now",
            }}
          />
        </div>
      </div>
    </div>
  )
}
