'use client'

import React from "react"
import { FloatingSidebar, SidebarIcon } from "./FloatingSidebar"
import { ArrowUp, Ruler, Package } from "lucide-react"
import { StoreProduct } from "@medusajs/types"

interface ProductSidebarProps {
  product: StoreProduct
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({ product }) => {
  const sidebarIcons: SidebarIcon[] = [
    {
      icon: ArrowUp,
      text: "Back To Top",
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    },
    {
      icon: Ruler,
      text: "Custom Size",
      onClick: () => (window as any).tidioChatApi?.open(),
    },
    {
      icon: Package,
      text: "Try A Sample Kit",
      onClick: () => {
        const sampleKitElement = document.getElementById('sample-kit')
        if (sampleKitElement) {
          sampleKitElement.scrollIntoView({ behavior: 'smooth' })
        }
      },
    },
  ]

  return <FloatingSidebar icons={sidebarIcons} />
} 