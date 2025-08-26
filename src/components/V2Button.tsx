'use client'

import * as React from "react"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { getStrapiUrl } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

/**
 * Standardized interface for CMS button data structure
 */
export interface ButtonData {
  id: number
  type: "Primary" | "Secondary" | "Link"
  size: "Small" | "Medium" | "Large"
  text: string
  link: string
  icon?: any
}

/**
 * Props for V2Button component that extends shadcn Button
 */
export interface V2ButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  /** CMS button data */
  data: ButtonData
  /** Click handler for button mode - if not provided, will handle navigation automatically */
  onClick?: () => void
}

/**
 * V2Button component that renders a button based on CMS configuration
 *
 * @param data - CMS button data including type, size, text, link, and icon
 * @param className - Additional CSS classes
 * @param onClick - Click handler for button mode
 * @param target - Target for external links
 * @param rel - Rel attribute for external links
 * @param ...props - Additional shadcn Button props
 *
 * @example
 * ```tsx
 * <V2Button
 *   data={cmsButtonData}
 *   asLink={false}
 *   onClick={() => console.log('clicked')}
 * />
 * ```
 */
export const V2Button: React.FC<V2ButtonProps> = ({
  data,
  className,
  onClick,
  ...props
}) => {
  const { type, size, text, link, icon } = data
  const router = useRouter()

  // Determine if link is external
  const isExternalLink = link?.startsWith("http") || link?.startsWith("//")

  // Render icon if provided
  const renderIcon = () => {
    if (type === "Link") {
      return null
    }

    let iconSize = 'size-6'

    if (size === "Small") {
      iconSize = 'size-5'
    } else if (size === "Large") {
      iconSize = 'size-7'
    }

    if (!icon){
        return <ArrowRight className={`${iconSize} transition-transform duration-200 ease-in-out group-hover:translate-x-1`} />
    }

    const iconUrl = icon?.url ? getStrapiUrl(icon?.url) : "/img/right-arrow.svg"
    return (
      <img
        src={iconUrl}
        alt={`${text} icon`}
        className="inline-block w-5 h-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
      />
    )
  }

  // Unified navigation handler
  const handleClick = () => {
    if (onClick) {
      // Custom onClick provided, use it
      onClick()
      return
    }

    if (!link) {
      return
    }

    // Handle navigation automatically
    if (isExternalLink) {
      // External link - open in new tab with security attributes
      window.open(link, '_blank', 'noopener,noreferrer')
    } else {
      // Internal link - use Next.js router
      router.push(link)
    }
  }

  let sizeClass = "text-xl h-12 px-16"
  if (size === "Small") {
    sizeClass = "text-sm h-8 px-12"
  } else if (size === "Large") {
    sizeClass = "text-xl sm:text-2xl h-16 px-20 font-semibold"
  }

  let variantClass = "bg-primary hover:bg-primary-light"
  let variant = "default"
  if (type === "Secondary") {
    variant = "outline"
    variantClass = "bg-transparent hover:bg-transparent hover:text-primary border-2 border-primary"
  } else if (type === "Link") {
    variant = "link"
    variantClass = "hover:text-primary underline text-primary hover:text-primary-light p-0"
  }

  // Common button props
  const buttonProps: ButtonProps = {
    variant:
      type === "Secondary" ? "outline" : type === "Link" ? "link" : "default",
    className: cn(
      "text-black group gap-4",
      sizeClass,
      variantClass,
      className
    ),
    ...props,
  }

  // Render as button with unified navigation
  return (
    <Button {...buttonProps} onClick={handleClick}>
      <span>{text}</span>
      {renderIcon()}
    </Button>
  )
}

export default V2Button
