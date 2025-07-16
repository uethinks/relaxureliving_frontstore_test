"use client"

import Link from "next/link"

interface AccessoriesGridProps {
  accessories: {
    heaterInfo: any
    shadesInfo: any
    glassdoorInfo: any
  }
}

export const AccessoriesGrid = ({ accessories }: AccessoriesGridProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  console.log("accessories", accessories)
  return (
    <div className="mt-10">
      <h2 className="text-[44px] font-merriweather font-bold mb-8">
        Accessories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-2 relative bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9] transition-colors">
          <div className="aspect-square overflow-hidden rounded-[20px]">
            <img
              src={`${baseUrl}${accessories.heaterInfo.product_images?.[0]?.url}`}
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
