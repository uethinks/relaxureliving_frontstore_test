import React from "react"
import { FirstScreen } from "./components/FirstScreen"
import { StoreProduct } from "@medusajs/types"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { CustomerReviewsServer } from "./components/CustomerReviewsServer"
import { AwardBlock } from "@modules/common/components/AwardBlock"
import {
  ImageOnLeft,
  Advantages,
  AccessoriesCards,
} from "./components/LandingPage"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import { PergolaData, ProductInformation } from "@/types/global"
import { OneHundredDayRiskFreeTrial } from "./components/OneHundredDayRiskFreeTrial"
interface ProductItemProps {
  product: StoreProduct
  accessories: StoreProduct[]
  pergolaData: PergolaData
  currentProductInfo: ProductInformation
}

export const ProductItem = ({
  product,
  accessories,
  pergolaData,
  currentProductInfo,
}: ProductItemProps): JSX.Element => {
  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1910px] px-4 lg:px-20">
        <FirstScreen
          product={product}
          accessories={accessories}
          currentProductInfo={currentProductInfo}
          pergolaData={pergolaData}
        />

        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
          <div className="w-full">
            <ImageOnLeft pergolaData={pergolaData} />
          </div>
          <div className="w-full mt-10">
            <OneHundredDayRiskFreeTrial pergolaData={pergolaData} />
          </div>
          <div className="w-full">
            <Advantages pergolaData={pergolaData} />
          </div>
          <div className="w-full">
            <AccessoriesCards pergolaData={pergolaData} />
          </div>
        </div>
      </div>
      <div className="w-full">
        <OurPromise pergolaData={pergolaData} />
      </div>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full md:px-5 lg:px-20 mt-5 lg:mt-[80px]">
        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
          <div className="w-full">
            <AwardBlock data={pergolaData.credential} />
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full md:px-5 lg:px-20">
        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
          <div className="w-full">
            <CustomerReviewsServer />
          </div>
        </div>
      </div>
      <FooterDark />
    </>
  )
}
