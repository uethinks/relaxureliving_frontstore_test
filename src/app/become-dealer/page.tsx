import { V2BecomeDealerForm } from "@/components/V2BecomeDealerForm"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"

export default async function BecomeDealer() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className={"max-w-[1074px] my-20"}>
          <div className={"text-black text-center"}>
            <h1 className={"font-semibold text-[56px]"}>
              Partner with Relaxure Pergola
            </h1>
            <p className={"text-xl"}>
              Bring timeless outdoor elegance to your customers. We’re looking
              for passionate, quality-driven dealers across the U.S. who share
              our vision for exceptional design and craftsmanship. If you’re
              ready to grow together, our B2B team will personally connect with
              you within{" "}
              <span className={"font-semibold"}>2–3 business days</span> to
              explore how we can build success side by side.
            </p>
          </div>
        </section>
        <section className={"w-full bg-[#EFEEEB80]"}>
          <V2BecomeDealerForm />
        </section>
      </div>
      <FooterDark />
    </>
  )
}
