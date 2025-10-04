'use client'

import React from "react"
import { FloatingSidebar, SidebarIcon } from "./FloatingSidebar"
import { ArrowUp, Ruler, Package } from "lucide-react"
import { StoreProduct } from "@medusajs/types"
import { useRouter } from "next/navigation"
import { TrackingEvent } from "@/types/tracking"
import { trackEvent } from "@lib/util/tracking"

interface ProductSidebarProps {
  product: StoreProduct
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({ product }) => {
  const router = useRouter()
  const sidebarIcons: SidebarIcon[] = [
    {
      icon: <ArrowUp strokeWidth={1.5} />,
      text: "Back To Top",
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    },
    {
      icon: <img src="/img/custom_size.svg" alt="custom size" />,
      text: "Custom Size",
      onClick: () => {
        // /customize
        trackEvent(TrackingEvent.STANDARD_ALWAYSON_TO_3D)
        router.push('/customize')
      },
    },
    {
      icon: <img src="/img/try_a_sample_kit.svg" alt="try_a_sample_kit" />,
      text: "Try A Sample Kit",
      onClick: () => {
        router.push('/products/sample-kit')
      },
    },
  ]

  return <FloatingSidebar icons={sidebarIcons} />
} 