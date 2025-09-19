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
import { formatPrice } from "@lib/utils"
import { Badge } from "@/components/ui/badge"

const AccessoriesGridItem = ({ infoData }: { infoData: any }) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  console.log('infoData', infoData)
  const variant = infoData.product.variants[0]
  const originalPrice = variant?.calculated_price?.original_amount || 0
  const calculatedPrice = variant?.calculated_price?.calculated_amount || 0
  const savingsPercentage =
    originalPrice > 0
      ? Math.round(((originalPrice - calculatedPrice) / originalPrice) * 100)
      : 0

  return (
    <div className="relative bg-white overflow-hidden transition-colors">
      <Link href={`/accessories/${infoData.slug}`}>
        <div className="overflow-hidden cursor-pointer">
          <img
            src={`${baseUrl}${infoData.listImage?.url}`}
            alt={infoData.name}
            className="w-full h-auto"
          />
        </div>
      </Link>
      <div className="mt-4 h-[120px]">
        <div className="flex justify-between items-start">
          <h3 className="font-montserrat text-[22px] font-medium text-black">
            {infoData.name}
          </h3>
        </div>
        <p className="text-xs font-semibold">{infoData.subtitle}</p>
        <p className="text-xs text-[#8C877C] mt-[10px]">
          {infoData.listDescription}
        </p>
      </div>
      <div className="flex flex-col w-full mb-5">
        <div className="flex items-center gap-2">
          <span className="text-[#000000] text-3xl font-bold">
            {formatPrice(calculatedPrice)}
          </span>
          {savingsPercentage > 0 && (
            <Badge className="bg-highlight rounded-none text-white font-bold px-6 py-2 [clip-path:polygon(15px_0,100%_0,100%_100%,15px_100%,0_50%)]">
              {savingsPercentage}% off
            </Badge>
          )}
        </div>
        {originalPrice > calculatedPrice && (
          <p className="text-[#8c8c8c] text-xl">
            <span className="line-through font-semibold">
              {formatPrice(originalPrice)}
            </span>{" "}
            <span className="text-[#ff5f00]">
              Save {formatPrice(originalPrice - calculatedPrice)}
            </span>
          </p>
        )}
      </div>
      <V2Button
        data={{
          type: "Secondary",
          link: `/accessories/${infoData.slug}`,
          size: "Medium",
          text: "Shop Now",
          iconHidden: true,
        }}
      />
    </div>
  )
}

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

  // console.log("accessoriesPage: ", accessoriesPage.data)
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

  return (
    <div className="w-full pb-20">
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        {banner?.length > 0 &&
          banner[0].__component === "blocks.v2-hero-banner" && (
            <V2HeroBanner data={banner[0]} />
          )}
      </div>
      <div className="mt-5 px-6 box-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccessoriesGridItem
          infoData={{
            ...accessories.heaterInfo,
            slug: "heater",
          }}
        />
        <AccessoriesGridItem
          infoData={{
            ...accessories.shadesInfo,
            slug: "shades",
          }}
        />
        <AccessoriesGridItem
          infoData={{
            ...accessories.glassdoorInfo,
            slug: "glassdoor",
          }}
        />
      </div>
    </div>
  )
}
