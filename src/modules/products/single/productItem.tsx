"use client"
import React, { useState, useEffect, Suspense } from "react"
import { FirstScreen } from "./components/FirstScreen"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { CustomerReviews } from "./components/CustomerReviews"

import {
  PergolaSize,
  selectedProducts,
  selectedProductVariant,
} from "types/global"
import dynamic from "next/dynamic"

const LoadingSpinner = () => (
  <div className="w-full flex justify-center items-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
)

// Lazy load components with explicit client-side rendering
const LazyImageOnLeft = dynamic(
  () => import("./components/LandingPage").then((mod) => mod.ImageOnLeft),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
)

const LazyImageOnRight = dynamic(
  () => import("./components/LandingPage").then((mod) => mod.ImageOnRight),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
)

const LazyAdvantages = dynamic(
  () => import("./components/LandingPage").then((mod) => mod.Advantages),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
)

const LazyAccessoriesCards = dynamic(
  () => import("./components/LandingPage").then((mod) => mod.AccessoriesCards),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
)

const LazyOurPromise = dynamic(
  () =>
    import("@modules/home/homepage/page/sections/OurPromise").then(
      (mod) => mod.OurPromise
    ),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
)

const mockReviewData = {
  averageRating: 4.79,
  totalReviews: 343,
  ratingDistribution: [273, 69, 1, 0, 0],
  reviews: [
    {
      id: "1",
      rating: 5,
      date: "03/16/2024",
      author: "Ed Sprick",
      title: "Beautiful Setup",
      content:
        "Setting up the pergola with my son wasn't very difficult and the reward after it was done is awesome, have already had so many compliments on the pergola, thank you so much Pergolux.",
      images: ["/img/pergola-description.jpg"],
      verified: true,
    },
    {
      id: "2",
      rating: 4,
      date: "03/14/2024",
      author: "Charles Nunn",
      title: "PERGOLUX Screen 52 19'",
      content:
        'Installing this screen was pretty straight forward. It is reasonably heavy so would recommend three people to do the job. It is so long that the aluminum housing deforms just a bit toward the center. It is easy to move up and down. The spring tension is not quite enough on one end to go fully up but it is within about 1/4". I will probably just file a catch slot on that end that the built in spring catch can fail into to hold it fully up. Does a great job of shading us from the afternoon sun which hits our Pergolux Sundance full on. The screen looks very nice when extended.',
      images: ["/img/pergola-description.jpg"],
      verified: true,
    },
    {
      id: "3",
      rating: 5,
      date: "03/12/2024",
      author: "Tor Odd Worth",
      title: "Ready for Installation",
      content:
        "Pergolux is ready for installation, as long as the weather permits.",
      images: ["/img/pergola-description.jpg"],
      verified: true,
      response: {
        author: "PERGOLUX USA",
        content:
          "Hi, great to see how easily the packages can be stored! Will probably be a very good supplement to the bath stamp. Good luck with your new Pergola.",
      },
    },
    {
      id: "4",
      rating: 5,
      date: "03/10/2024",
      author: "Sarah Johnson",
      title: "Exceeded Our Expectations",
      content:
        "We've been looking for the perfect outdoor solution for our patio for months, and the Pergolux has exceeded all our expectations. The installation process was straightforward with clear instructions. What really impressed us was the quality of the materials - everything from the frame to the smallest screw feels premium. The motorized louvers work smoothly, and the LED lighting creates such a beautiful ambiance in the evening. We've essentially gained an extra room in our house!",
      images: ["/img/pergola-description.jpg", "/img/pergola-description.jpg"],
      verified: true,
    },
    {
      id: "5",
      rating: 4,
      date: "03/08/2024",
      author: "Michael Chen",
      title: "Great Product, Minor Issues",
      content:
        "Overall, I'm very satisfied with my Pergolux. The build quality is excellent and it looks stunning in our backyard. Installation took about a day with two people. Only giving 4 stars because the remote control had some connectivity issues initially, but customer service was quick to help resolve it.",
      verified: true,
    },
    {
      id: "6",
      rating: 5,
      date: "03/05/2024",
      author: "Emma Wilson",
      title: "Perfect for Year-Round Use",
      content:
        "Living in Seattle, we wanted something that could handle all weather conditions, and this pergola delivers! The rain sensors work perfectly, automatically closing the louvers when it starts to rain. We added the optional side screens and heaters, which have made it comfortable even during winter months. It's become our favorite spot for morning coffee and evening dinners.",
      images: ["/img/pergola-description.jpg"],
      verified: true,
      response: {
        author: "PERGOLUX USA",
        content:
          "Thank you for your wonderful review, Emma! We're so glad to hear that you're enjoying your pergola year-round. The rain sensors and climate control features are indeed perfect for the Seattle weather!",
      },
    },
    {
      id: "7",
      rating: 5,
      date: "03/01/2024",
      author: "David Martinez",
      title: "Worth Every Penny",
      content:
        "After comparing various options, we decided to invest in the Pergolux system. While it wasn't the cheapest option, it has proven to be worth every penny. The quality is outstanding, and the versatility is amazing. We use it practically every day, whether for family gatherings or just relaxing outside.",
      verified: true,
    },
    {
      id: "8",
      rating: 4,
      date: "02/28/2024",
      author: "Lisa Thompson",
      title: "Beautiful Addition to Our Home",
      content:
        "The pergola has transformed our backyard into a stunning outdoor living space. Installation was a bit challenging - definitely recommend getting professional help. The lighting system is fantastic and creates such a wonderful atmosphere in the evenings.",
      images: [
        "/img/pergola-description.jpg",
        "/img/pergola-description.jpg",
        "/img/pergola-description.jpg",
      ],
      verified: true,
    },
  ],
}

export const ProductItem = ({
  product,
  accessories,
}: {
  product: StoreProduct
  accessories: StoreProduct[]
}): JSX.Element => {
  const [selectedVariant, setSelectedVariant] = useState<StoreProductVariant>()
  const [pergolaSize, setPergolaSize] = useState<PergolaSize>({
    width: 0,
    length: 0,
  })
  useEffect(() => {
    setPergolaSize({
      width: selectedVariant?.width ?? 0,
      length: selectedVariant?.length ?? 0,
    })
  }, [selectedVariant])
  const [selectedAccessoriesHeater, setSelectedAccessoriesHeater] =
    useState<selectedProducts>([])
  const [selectedAccessoriesShades, setSelectedAccessoriesShades] =
    useState<selectedProducts>([])
  const [selectedAccessoriesGlassdoor, setSelectedAccessoriesGlassdoor] =
    useState<selectedProducts>([])
  const [pergolaQuantity, setPergolaQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const handleVariantChange = (variant: StoreProductVariant | undefined) => {
    setSelectedVariant(variant)
  }
  useEffect(() => {
    setTotalPrice(
      pergolaQuantity *
        (selectedVariant?.calculated_price?.calculated_amount ?? 0)
    )
  }, [pergolaQuantity, selectedVariant])
  const handleAccessoryToggle = ({
    type,
    selectedProducts,
  }: {
    type: string
    selectedProducts: selectedProducts
  }) => {
    if (type === "Heating") {
      setSelectedAccessoriesHeater(selectedProducts)
    } else if (type === "Shades") {
      setSelectedAccessoriesShades(selectedProducts)
    } else if (type === "Glass door") {
      setSelectedAccessoriesGlassdoor(selectedProducts)
    }
  }

  const router = useRouter()
  // add the selected variant to the cart
  const handleBuyNow = async () => {
    try {
      const results = await Promise.all([
        buyPergula(),
        buyHeater(),
        buyShades(),
        buyGlassdoor(),
      ])

      router.push("/cart")
    } catch (error) {
      console.error("Error adding items to cart:", error)
    }
  }

  const buyPergula = async () => {
    if (!selectedVariant?.id) return null

    try {
      const result = await addToCart({
        variantId: selectedVariant.id,
        quantity: pergolaQuantity,
        countryCode: "us",
      })
      console.log("Pergola added to cart successfully:", result)
      return result
    } catch (error) {
      console.error("Error adding pergola to cart:", error)
      throw error
    }
  }

  const buyHeater = async () => {
    if (selectedAccessoriesHeater.length === 0) return null

    const addToCartPromises = selectedAccessoriesHeater
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: "us",
          })
          console.log("Heater added to cart successfully:", result)
          return result
        } catch (error) {
          console.error("Error adding heater to cart:", error)
          throw error
        }
      })

    try {
      const results = await Promise.all(addToCartPromises)
      console.log("All heaters added to cart successfully:", results)
      return results
    } catch (error) {
      console.error("Error adding heaters to cart:", error)
      throw error
    }
  }

  const buyShades = async () => {
    if (selectedAccessoriesShades.length === 0) return null

    const addToCartPromises = selectedAccessoriesShades
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: "us",
          })
          console.log("Add to cart result:", result)
          return result
        } catch (error) {
          console.error("Error adding item to cart:", error)
          throw error
        }
      })

    try {
      const results = await Promise.all(addToCartPromises)
      console.log("All shades added to cart successfully:", results)
      return results
    } catch (error) {
      console.error("Error adding shades to cart:", error)
      throw error
    }
  }

  const buyGlassdoor = async () => {
    if (selectedAccessoriesGlassdoor.length === 0) return null

    const addToCartPromises = selectedAccessoriesGlassdoor
      .filter((item) => item.productVarant && item.quantity)
      .map(async (item) => {
        try {
          const result = await addToCart({
            variantId: item?.productVarant?.id ?? "",
            quantity: item.quantity,
            countryCode: "us",
          })
          console.log("Glassdoor added to cart successfully:", result)
          return result
        } catch (error) {
          console.error("Error adding glassdoor to cart:", error)
          throw error
        }
      })

    try {
      const results = await Promise.all(addToCartPromises)
      console.log("All glassdoors added to cart successfully:", results)
      return results
    } catch (error) {
      console.error("Error adding glassdoors to cart:", error)
      throw error
    }
  }

  return (
    <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full 2xl:w-[1512px] px-20">
      <FirstScreen
        product={product}
        accessories={accessories}
        onVariantChange={handleVariantChange}
        onAccessoryToggle={handleAccessoryToggle}
        selectedVariant={selectedVariant}
        selectedAccessoriesHeater={selectedAccessoriesHeater}
        selectedAccessoriesShades={selectedAccessoriesShades}
        selectedAccessoriesGlassdoor={selectedAccessoriesGlassdoor}
        pergolaSize={pergolaSize}
        pergolaQuantity={pergolaQuantity}
        totalPrice={totalPrice}
        onQuantityChange={setPergolaQuantity}
        onBuyNow={handleBuyNow}
      />

      <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full relative">
        <div className="w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <LazyImageOnLeft />
          </Suspense>
        </div>
        <div className="w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <LazyImageOnRight />
          </Suspense>
        </div>
        <div className="w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <LazyAdvantages />
          </Suspense>
        </div>
        <div className="w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <LazyAccessoriesCards />
          </Suspense>
        </div>
        <div className="w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <LazyOurPromise />
          </Suspense>
        </div>

        <div className="w-full">
          <CustomerReviews {...mockReviewData} />
        </div>
      </div>
      <FooterDark />
    </div>
  )
}
