import { cn } from "@/lib/utils"

interface V2HeadlineProps {
  title: string
  iconHidden?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size?: "sm" | "md" | "lg" | "xl"
  underlineColor?: string
  underlinePosition?: "bottom" | "center" | "top"
  className?: string
  children?: React.ReactNode
}

const sizeClasses = {
  sm: "text-xl lg:text-2xl",
  md: "text-2xl lg:text-3xl",
  lg: "text-3xl lg:text-4xl",
  xl: "text-4xl lg:text-5xl",
}

const underlinePositions = {
  bottom: "-bottom-2",
  center: "-bottom-1",
  top: "-top-2",
}

export default function V2Headline({
  title,
  as: Component = "h1",
  size = "md",
  iconHidden = false,
  className,
  children,
}: V2HeadlineProps) {
  const sizeClass = sizeClasses[size]

  return (
    <Component
      className={cn(
        "font-bold text-[#140e02] leading-tight relative",
        sizeClass,
        className
      )}
    >
      {!iconHidden && (
        <img
          src="/img/icon-title.svg"
          alt=""
          className="w-16 h-16 flex-shrink-0 absolute -top-0 -left-8 -z-1"
          aria-hidden="true"
        />
      )}
      <span className="relative w-full block min-h-16">{title}</span>
      {children}
    </Component>
  )
}
