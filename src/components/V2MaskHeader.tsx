"use client"

import { cn } from "@lib/utils"
import React from "react"

interface IProps {
  sectionClassName?: string
  title?: React.ReactNode
  description?: React.ReactNode
  showMask?: boolean
  children?: React.ReactNode
}

export default function V2MaskHeader({
  title,
  sectionClassName,
  description,
  showMask = true,
  children,
}: IProps) {
  return (
    <section
      className={cn(
        "relative w-full px-6 pt-8 pb-12 lg:px-0 lg:py-20 overflow-hidden",
        sectionClassName
      )}
    >
      {showMask && (
        <img
          src="/img/body-mask.png"
          className={"absolute top-0 left-0 z-0 w-full"}
        />
      )}
      <div className={"lg:max-w-[1074px] m-auto"}>
        {title && (
          <h1
            className={
              "mb-5 text-center text-2xl lg:text-6xl font-semibold text-black"
            }
          >
            {title}
          </h1>
        )}
        {description && (
          <p className={"text-center text-sm lg:text-xl text-black"}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
