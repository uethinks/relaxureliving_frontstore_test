"use client"
import React, { useEffect, useState, lazy } from "react"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { OrderSummary } from "../OrderSummary/OrderSummary"
import { ProductCard } from "../ProductCard/ProductCard"
import { HeaterCard } from "../HeaterCard/HeaterCard"
import { GlassDoorCard } from "../GlassDoorCard/GlassDoorCard"
import { ShadesCard } from "../ShadesCard/ShadesCard"
import { SampleKitCard } from "../SampleKitCard/SampleKitCard"
import { useCart } from "@lib/context/cartContext"
import { StoreProduct } from "@medusajs/types"
import { EmptyCart } from "../EmptyCart/EmptyCart"
import { PergolaData, BoringButImportantStuff } from "@/types/global"
import { formatCartTotal } from "@lib/util/money"
import Breadcrumb from "@/components/Breadcrumb"
import { CartAccessoriesGrid } from "./CartAccessoriesGrid"
import CartSkeleton from "../CartSkeleton/CartSkeleton"
import { CartPageMobile } from "./CartPageMobile"
import { useIsMobile, useScreenSize } from "@lib/hooks/useScreenSize" // Lazy load only non-critical components


interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}

//购物车左边的产品列表页面
export const CartPage = ({
    accessories
}: {
  accessories: StoreProduct[]
}): JSX.Element => { 
  const { cart, isLoading } = useCart()
  const isMobile = useIsMobile(1024)  

  // Check if cart is empty
  const isCartEmpty = !cart?.items || cart.items.length === 0
 
  // Render mobile version if on mobile device
  if (isMobile) {
    return <CartPageMobile accessories={accessories} />
  } 

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-background ">
        <div className=" w-full relative flex flex-col justify-center items-center pt-0">
          <NavBarWrapper isFixed={false} />
          {/* <Breadcrumb steps={["Cart", "Information", "Payment"]} current={0} /> */}
          {isLoading ? (
            <CartSkeleton />
          ) : isCartEmpty ? (
            <EmptyCart />
          ) : (     
            <div className="w-full max-w-[1074px] mx-auto">          
              <div className="relative flex flex-col my-10 lg:flex-row items-center lg:items-start justify-start lg:justify-between gap-6 w-full">
                <div className="flex flex-col gap-[30px] w-full lg:w-2/3">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[#2f2a1e]">
                      Your Cart ({cart?.items?.length ?? 0})
                    </h1>
                    <div className="text-[#8c877c]">
                      Subtotal:{" "}
                      <span className="font-semibold text-[#8C877C]">
                        {formatCartTotal(cart)}
                      </span>
                    </div>
                  </div>
                  <ProductCard />
                  <ShadesCard />
                  <HeaterCard />
                  <GlassDoorCard />
                  <SampleKitCard />
                </div>
                <div className="flex flex-col justify-start gap-2.5 w-full lg:w-1/3 sticky top-10">
                  <OrderSummary />
                </div>              
              </div>
            </div>
          )}
        </div>
    
      </div>
      {/* <OurPromise
        pergolaData={
          {
            boringButImportantStuff: ourPromise,
          } as PergolaData
        }
      />
      {faq && <FaqWrapper faq={faq} />} */}
      <FooterDark />
    </>
  )
}
