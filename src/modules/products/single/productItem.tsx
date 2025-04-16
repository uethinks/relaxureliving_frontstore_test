"use client"
import React, { useState, useEffect, Suspense } from "react"
import { FirstScreen } from "./components/FirstScreen"
import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { useRouter } from "next/navigation"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"

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
    <div className="bg-[#ffffff] flex flex-col items-center justify-center w-full overflow-hidden lg:block lg:h-[100vh] lg:overflow-y-scroll">
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

      <div className="lg:mx-auto flex flex-col justify-between items-start bg-[#ffffff] w-full px-10 relative">
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
      </div>
      <FooterDark />
    </div>
  )
}
