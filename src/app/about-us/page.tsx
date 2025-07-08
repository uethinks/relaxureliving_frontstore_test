import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import Link from "next/link"
import { Metadata } from "next"

// 生成动态 metadata
export const metadata: Metadata = {
  title: `About Relaxure`,
  description: `Relaxure is home to the world's smartest pergola, intelligently designed to
enable four-season outdoor living.`,
  openGraph: {
    title: `About Relaxure`,
    description: `Relaxure is home to the world's smartest pergola, intelligently designed to
enable four-season outdoor living.`,
    url: "/",
  },
  keywords: [
    "pergola",
    "outdoor shade",
    "smart home",
    "relaxure",
    "aluminum pergola",
  ],
}

export default function AboutPage() {
  return (
    <main className="w-full flex flex-col items-center">
      <NavBarWrapper isFixed={false} />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 lg:py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-[18px] lg:text-[36px] font-[700] mb-6 font-['Merriweather']">
            Creating Spaces Where Life Happens, In Every Season
          </h1>
          <p className="text-[16px] lg:text-[18px] font-[500] text-gray-600 mb-8 font-['Montserrat']">
            At Relaxure, we believe exceptional seasonal spaces is extraordinary
            outdoor living—without compromising on quality, functionality or
            time. We're bridging the gap between overpriced luxury and
            unreliable budget options with thoughtfully designed solutions to
            make their open space—it's where memories are made, connections
            flourish, and life's best moments unfold.
          </p>
          <Link href="/products/pergola">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800">
              Explore our products
            </button>
          </Link>
        </div>
        <div className="flex-1">
          <img
            src="/img/pergola-description.jpg"
            alt="Outdoor living space"
            className="rounded-lg w-full max-w-[600px] h-auto"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <h2 className="text-[18px] lg:text-[28px] font-[700] mb-12 md:col-span-1 font-['Merriweather']">
            Our Story: From Humble Beginnings to Outdoor Innovation
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-['Montserrat']">
          <div className="space-y-6 text-[16px] lg:text-[18px] font-[500]">
            <p>
              To understand what we do here at Relaxure, you need to know where
              I come from. I spent my childhood in a small rural village, and my
              most cherished memories from that time are simple moments
              outdoors. I watched my grandfather work tirelessly on our small
              farm, while I spent countless hours with my sister in our yard.
            </p>
            <p>
              Those experiences of connection and freedom stayed with me. As I
              grew older and explored entrepreneurship, I kept returning to this
              simple truth: when we create spaces for people to come together
              outdoors, something magical happens.
            </p>
          </div>
          <div className="space-y-6 text-[16px] lg:text-[18px] font-[500]">
            <p>
              I gathered a team that shared my vision—top engineers from Fortune
              500 companies, experienced inventors, and design specialists with
              multicultural backgrounds. Together, we committed to a simple
              mission: to create premium quality outdoor structures at prices
              that wouldn't require a second mortgage.
            </p>
            <p className="text-[18px] lg:text-[28px] font-[700] leading-relaxed font-['Merriweather']">
              —Peter Y. Founder
            </p>
          </div>
        </div>
      </section>

      <FooterDark />
    </main>
  )
}
