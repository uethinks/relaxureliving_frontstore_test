"use client"
import dynamic from "next/dynamic"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { OrderSummary } from "../OrderSummary/OrderSummary"
import { ProductCard } from "../ProductCard/ProductCard"
import { HeaterCard } from "../HeaterCard/HeaterCard"
import { GlassDoorCard } from "../GlassDoorCard/GlassDoorCard"
import { ShadesCard } from "../ShadesCard/ShadesCard"
import { SampleKitCard } from "../SampleKitCard/SampleKitCard"
import { useCart } from "@lib/context/cartContext"
import { StoreProduct } from "@medusajs/types"
import { EmptyCart } from "../EmptyCart/EmptyCart"
import { formatCartTotal } from "@lib/util/money"
import CartSkeleton from "../CartSkeleton/CartSkeleton"
import { useIsMobile } from "@lib/hooks/useScreenSize"

// 移动端组件使用动态导入，只在需要时加载
const CartPageMobile = dynamic(() => import("./CartPageMobile").then(mod => ({ default: mod.CartPageMobile })), {
  loading: () => <CartSkeleton />,
  ssr: false, // 移动端检测在客户端进行
})

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
      <FooterDark />
    </>
  )
}
