"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProductByProductId } from "@lib/data/products"
import {
  getAccessoriesPage,
  getShades,
  getGlassdoor,
  getHeater,
} from "@lib/cms/strapiCmsApi"

export const CartAccessoriesGrid = () => {
  const [accessories, setAccessories] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setError(null)
        // 获取配件页面数据
        const accessoriesPage = await getAccessoriesPage()

        if (!accessoriesPage?.data) {
          throw new Error("Failed to fetch accessories page data")
        }

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

        const accessoriesData = {
          heaterInfo: heaterInfo.data,
          shadesInfo: shadesInfo.data,
          glassdoorInfo: glassdoorInfo.data,
        }

        setAccessories(accessoriesData)
      } catch (error) {
        console.error("Failed to fetch accessories:", error)
        setError(
          error instanceof Error ? error.message : "Failed to load accessories"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAccessories()
  }, [])

  if (loading) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-[44px] font-merriweather font-bold mb-8">
          Add Accessories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-2 relative bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9] animate-pulse"
            >
              <div className="aspect-square bg-gray-200 rounded-[20px]"></div>
              <div className="mt-4 h-6 bg-gray-200 rounded w-20"></div>
              <div className="mt-4 h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-[44px] font-merriweather font-bold mb-8">
          Accessories
        </h2>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!accessories) {
    return null
  }

  return (
    <div className="mt-10 w-full">
      <h2 className="text-[44px] font-merriweather font-bold mb-8">
        Accessories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-2 relative bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9] transition-colors">
          <div className="aspect-square overflow-hidden rounded-[20px]">
            <img
              src={`${baseUrl}${accessories.heaterInfo.productImages?.[0]?.url}`}
              alt={accessories.heaterInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#F6AF1F] rounded-[10px] px-4 py-2 w-fit mt-4">
            Exclusive
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-montserrat text-[22px] font-medium text-black">
                {accessories.heaterInfo.name}
              </h3>
              <span className="text-[24px] font-montserrat font-medium text-black">
                $
                {accessories.heaterInfo.product.variants?.[0]?.calculated_price
                  ?.calculated_amount ?? 0}
              </span>
            </div>
            <Link
              href={`/accessories/heater`}
              className="flex justify-end mt-4"
            >
              <button className=" w-8 h-8 rounded-full bg-[#F6AF1F33] text-black flex items-center justify-center transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        <div className="p-2 relative bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9] transition-colors">
          <div className="aspect-square overflow-hidden rounded-[20px]">
            <img
              src={`${baseUrl}${accessories.shadesInfo.product_images?.[0]?.url}`}
              alt={accessories.shadesInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#F6AF1F] rounded-[10px] px-4 py-2 w-fit mt-4">
            Exclusive
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-montserrat text-[22px] font-medium text-black">
                {accessories.shadesInfo.name}
              </h3>
              <span className="text-[24px] font-montserrat font-medium text-black">
                $
                {accessories.shadesInfo.product.variants?.[0]?.calculated_price
                  ?.calculated_amount ?? 0}
              </span>
            </div>

            <Link
              href={`/accessories/shades`}
              className="flex justify-end mt-4"
            >
              <button className=" w-8 h-8 rounded-full bg-[#F6AF1F33] text-black flex items-center justify-center transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        <div className="p-2 relative bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9] transition-colors">
          <div className="aspect-square overflow-hidden rounded-[20px]">
            <img
              src={`${baseUrl}${accessories.glassdoorInfo.product_images?.[0]?.url}`}
              alt={accessories.glassdoorInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-[#F6AF1F] rounded-[10px] px-4 py-2 w-fit mt-4">
            Exclusive
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-montserrat text-[22px] font-medium text-black">
                {accessories.glassdoorInfo.name}
              </h3>
              <span className="text-[24px] font-montserrat font-medium text-black">
                $
                {accessories.glassdoorInfo.product.variants?.[0]
                  ?.calculated_price?.calculated_amount ?? 0}
              </span>
            </div>
            <Link
              href={`/accessories/glassdoor`}
              className="flex justify-end mt-4"
            >
              <button className=" w-8 h-8 rounded-full bg-[#F6AF1F33] text-black flex items-center justify-center transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
