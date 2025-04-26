import React from "react"
import { FirstScreen } from "./components/FirstScreen"
import { StoreProduct } from "@medusajs/types"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { CustomerReviews } from "./components/CustomerReviews"
import {
  ImageOnLeft,
  Advantages,
  AccessoriesCards,
} from "./components/LandingPage"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"

export const ProductItem = ({
  product,
  accessories,
}: {
  product: StoreProduct
  accessories: StoreProduct[]
}): JSX.Element => {
  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1910px] px-4 lg:px-20">
        <FirstScreen product={product} accessories={accessories} />

        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
          <div className="w-full">
            <ImageOnLeft />
          </div>
          <div className="w-full">
            <Advantages />
          </div>
          <div className="w-full">
            <AccessoriesCards />
          </div>
        </div>
      </div>
      <div className="w-full">
        <OurPromise />
      </div>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full md:px-5 lg:px-20">
        <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
          <div className="w-full">
            <CustomerReviews />
          </div>
        </div>
      </div>
      <FooterDark />
    </>
  )
}
