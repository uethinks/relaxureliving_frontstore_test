"use client"

import { motion } from "motion/react"
import React from "react"

export interface SidebarIcon {
  icon: React.ReactNode
  text: string
  onClick?: () => void
  href?: string
  className?: string
}

interface FloatingSidebarProps {
  icons: SidebarIcon[]
  className?: string
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({
  icons,
  className = "",
}) => {
  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 lg:block ${className}`}
    >
      <div className="flex flex-col gap-[1px]">
        {icons.map((iconData, index) => (
          <SidebarButton key={index} {...iconData} />
        ))}
      </div>
    </div>
  )
}

interface SidebarButtonProps extends SidebarIcon {}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  text,
  onClick,
  href,
  className = "",
}) => {
  const buttonContent = (
    <div className="group relative">
      <div className="flex items-center justify-end">
        {/* 使用 Motion 的主按钮 - 合并所有动画 */}
        <motion.button
          onClick={onClick}
          className={`h-12 bg-primary hover:bg-primary-light border border-gray-200 flex items-center justify-end relative overflow-hidden ${className}`}
          aria-label={text}
          initial={{ width: 48 }}
          whileHover={{
            width: 200,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 25,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        >
          {/* 文字 - 使用 CSS 类控制动画，避免嵌套 Motion */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-100 whitespace-nowrap transform translate-x-[-10px] group-hover:translate-x-0">
            {text}
          </span>

          {/* 图标保持在右侧 */}
          <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
            {Icon}
          </div>
        </motion.button>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {buttonContent}
      </a>
    )
  }

  return buttonContent
}
