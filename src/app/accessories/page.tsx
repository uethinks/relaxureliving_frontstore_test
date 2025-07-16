import { FooterDark } from "@modules/home/homepage/page/sections/footer/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { AccessoriesGrid } from "@modules/products/single/components/AccesorriesSelector/AccessoriesGrid"
import { OurPromise } from "@modules/home/homepage/page/sections/OurPromise"
import { getHomePage } from "@lib/cms/strapiCmsApi"
import { PergolaData } from "types/global"

type Props = Readonly<{
  params: Promise<{ pergola: string }>
}>

export default async function AccessoriesPage(props: Props) {
  // 获取OurPromise数据
  const { data } = await getHomePage()

  return (
    <>
      <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px] px-5 lg:px-20">
        <NavBarWrapper isFixed={false} />
        <div className="content-container py-6 small:py-8">
          <div className="flex flex-col gap-4">
            <AccessoriesGrid />
          </div>
        </div>
      </div>
      <OurPromise
        pergolaData={
          {
            boringButImportantStuff: data.OurPromise,
          } as PergolaData
        }
      />
      <FooterDark />
    </>
  )
}
