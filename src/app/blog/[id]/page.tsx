import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"

export default async function BlogDetail() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />

        <V2ContactUsSection />
      </div>
      <FooterDark />
    </>
  )
}
