import {
  AccessoriesCards,
  Advantages,
} from "@modules/products/single/components/LandingPage"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import { Hero } from "./Hero"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { getHomePage, getLandingPage, getPergola } from "@lib/cms/strapiCmsApi"
import { PergolaData } from "types/global"
import LandingSlider from "./LandingSlider"
import GoodMemory from "./GoodMemory"

// 配置静态生成
export const dynamic = "force-static"
// export const revalidate = 3600 // 每小时重新验证一次

 
 
// 主页面组件
export default async function LandingPage() {
  const { data: landingPageData} = await getLandingPage()
  const { data: homePageData } = await getHomePage()
  const { data: pergolaPageData} = await getPergola()
 
  if (!landingPageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>please try again later!!</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full 2xl:max-w-[1910px] flex flex-col items-center gap-[10px] lg:gap-[120px] px-4 lg:px-20 py-0 relative bg-[#ffffff]">
        <NavBarWrapper isHomePage={true} />
        <Hero hero={landingPageData.hero} />
      </div>
      <LandingSlider landingSlider={landingPageData.landing_slider} />

      <div className="w-full 2xl:max-w-[1910px] flex flex-col items-center gap-[10px] lg:gap-[120px] px-4 lg:px-20 py-0 relative bg-[#ffffff]">
        <GoodMemory goodMemory={landingPageData.good_memory} />
        <Advantages pergolaData={pergolaPageData} />
        <AccessoriesCards pergolaData={pergolaPageData} />
      </div>
      <OurPromise
        pergolaData={
          {
            boringButImportantStuff: homePageData.OurPromise,
          } as PergolaData
        }
      />
      <FooterDark isHomepage={true} />
    </>
  )
}
