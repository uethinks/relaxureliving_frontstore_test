import Image from "next/image"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
export default function AboutPage() {
  return (
    <main className="w-full">
      <NavBarWrapper isFixed={false} />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">
            Creating Spaces Where Life Happens, In Every Season
          </h1>
          <p className="text-gray-600 mb-8">
            At Relaxure, we believe exceptional seasonal spaces is extraordinary
            outdoor living—without compromising on quality, functionality or
            time. We're bridging the gap between overpriced luxury and
            unreliable budget options with thoughtfully designed solutions to
            make their open space—it's where memories are made, connections
            flourish, and life's best moments unfold.
          </p>
          <button className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800">
            Explore our products
          </button>
        </div>
        <div className="flex-1">
          <Image
            src="/img/pergola-description.jpg"
            alt="Outdoor living space"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 md:col-span-1">
            Our Story: From Humble Beginnings to Outdoor Innovation
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-gray-600">
          <div className="space-y-6">
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
            <p>
              I was searching for my next entrepreneurial challenge when I
              looked at the outdoor living market with fresh eyes. What I saw
              troubled me—and might frustrate you too.
            </p>
            <p>
              Premium pergolas were selling for $25,000 or more—prices out of
              reach for most. Meanwhile, budget options from major retailers
              were so poorly constructed that they often became disappointments
              rather than enhancements to homes.
            </p>
          </div>
          <div className="space-y-6">
            <p>
              I gathered a team that shared my vision—top engineers from Fortune
              500 companies, experienced inventors, and design specialists with
              multicultural backgrounds. Together, we committed to a simple
              mission: to create premium quality outdoor structures at prices
              that wouldn't require a second mortgage.
            </p>
            <p>
              When we stripped away the industry's bloated margins, eliminated
              unnecessary middlemen, and focused on smart manufacturing, we
              could build pergolas with commercial-grade materials, advanced
              technology, and thoughtful design—all while keeping prices that
              real families could afford.
            </p>
            <p>
              I believe you deserve the same joy I found in those childhood
              outdoor moments. Your backyard isn't just square footage—it's
              where loved ones will gather over meals, where children will play,
              and where you'll find moments of peace in our increasingly indoor
              world.
            </p>
            <p>
              That's why each Relaxure pergolas are built not just with aluminum
              and technology but with a sense of purpose. We know we're helping
              craft the backdrop for your life's most meaningful moments.
            </p>
            <p className="font-medium">—Peter, Founder</p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/img/self-thinking.png"
              alt="Founder quote"
              className="w-full lg:max-w-[1069px] lg:max-h-[648px] object-cover"
            />
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#072F6C] text-white py-8 px-12 max-w-[600px]">
              <p className="text-2xl md:text-3xl font-serif leading-relaxed">
                "Why should creating a beautiful outdoor space require either a
                small fortune or constant compromise?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column - Title and Description */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif">
              What We Stand For
            </h2>
            <div className="space-y-6 text-gray-600">
              <p>
                When you choose Relaxure, you're joining a community of
                homeowners who refuse to compromise on their outdoor dreams.
                We're committed to transforming how you experience your home's
                outdoor spaces—through every weather change, season, and chapter
                of your life.
              </p>
              <p>
                When you choose Relaxure, you're not just investing in aluminum
                and technology—you're partnering with a company committed to
                transforming how you experience your home's outdoor spaces,
                regardless of season, weather, or budget.
              </p>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 space-y-4">
              <Image
                src="/img/demand-better.png"
                alt="Demand Better"
                width={160}
                height={160}
                className="mx-auto"
              />
              <h3 className="text-xl font-serif">Demand Better</h3>
              <p className="text-gray-600">
                We're not here to follow trends—we're here to redefine what's
                possible outdoors. By integrating cutting-edge technology with
                thoughtful design.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 space-y-4">
              <Image
                src="/img/accessable.png"
                alt="Accessible Excellence"
                width={160}
                height={160}
                className="mx-auto"
              />
              <h3 className="text-xl font-serif">Accessible Excellence</h3>
              <p className="text-gray-600">
                We're not here to follow trends—we're here to redefine what's
                possible outdoors. By integrating cutting-edge technology with
                thoughtful design.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 space-y-4">
              <Image
                src="/img/quantity.png"
                alt="Uncompromising Quality"
                width={160}
                height={160}
                className="mx-auto"
              />
              <h3 className="text-xl font-serif">Uncompromising Quality</h3>
              <p className="text-gray-600">
                We're not here to follow trends—we're here to redefine what's
                possible outdoors. By integrating cutting-edge technology with
                thoughtful design.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 space-y-4">
              <Image
                src="/img/promise.png"
                alt="Our Promise to You"
                width={160}
                height={160}
                className="mx-auto"
              />
              <h3 className="text-xl font-serif">Our Promise to You</h3>
              <p className="text-gray-600">
                What sets Relaxure apart isn't just what we make—it's why we
                make it. While our industry focuses on exclusivity, we're driven
                by something else:
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Experience the Relaxure Difference
          </h2>
          <button className="bg-[#072F6C] text-white px-8 py-4 rounded-md hover:bg-blue-800">
            Meet a Relaxure Expert
          </button>
        </div>
      </section>
      <FooterDark />
    </main>
  )
}
