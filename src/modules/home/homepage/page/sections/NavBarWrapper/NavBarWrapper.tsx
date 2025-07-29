"use client"
import React, { useState, useEffect } from "react"
import { Component } from "../../../../components/Component"
import Link from "next/link"
import { useCart } from "@lib/context/cartContext"
import { getMenu } from "@lib/cms/strapiCmsApi"

// 菜单数据类型定义
interface SubMenuItem {
  id: number
  name: string
  url: string | null
  anchor: string | null
}

interface MenuItem {
  id: number
  name: string
  url: string | null
  anchor: string | null
  sub_menu_item: SubMenuItem[]
}

interface MenuData {
  data: {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    menu_item: MenuItem[]
  }
  meta: Record<string, any>
}

export const NavBarWrapper = ({
  isFixed = true,
  isHomePage = false,
}: {
  isFixed?: boolean
  isHomePage?: boolean
}): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const { cart } = useCart()

  const hasItemsInCart = cart?.items && cart.items.length > 0

  // 从API获取菜单数据
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await getMenu()
        setMenuData(data)
      } catch (error) {
        console.error("Failed to fetch menu data:", error)
      }
    }
    fetchMenuData()
  }, [])

  // 处理菜单项点击
  const handleMenuItemClick = (
    e: React.MouseEvent,
    url: string | null,
    anchor: string | null
  ) => {
    if (!url) {
      e.preventDefault()
      return
    }

    // 处理锚链接
    if (anchor) {
      if (url === "/" && isHomePage) {
        // 在首页，直接滚动到锚点
        e.preventDefault()
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else if (url === "/" && !isHomePage) {
        // 不在首页，跳转到首页并滚动到锚点
        e.preventDefault()
        window.location.href = `/#${anchor}`
      } else {
        // 其他页面，跳转到指定页面并滚动到锚点
        e.preventDefault()
        window.location.href = `/${url}#${anchor}`
      }
    }
  }

  // 获取菜单项的href
  const getMenuItemHref = (url: string | null, anchor: string | null) => {
    if (!url) {
      return "#"
    }
    if (url === "/") {
      return anchor ? `/#${anchor}` : "/"
    }
    return anchor ? `/${url}#${anchor}` : `/${url}`
  }

  // 渲染菜单项
  const renderMenuItem = (item: MenuItem, isMobile = false) => {
    const hasSubMenu = item.sub_menu_item && item.sub_menu_item.length > 0
    const href = getMenuItemHref(item.url, item.anchor)

    if (hasSubMenu) {
      if (isMobile) {
        return (
          <div key={item.id} className="w-full">
            <button
              onClick={() =>
                setOpenSubmenu(openSubmenu === item.id ? null : item.id)
              }
              className="w-full py-2 [font-family:'Montserrat',Helvetica] font-medium  text-[#343a40] text-base flex items-center justify-start gap-2"
            >
              {item.name}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  openSubmenu === item.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openSubmenu === item.id && (
              <div className="mt-2 pl-4 space-y-2">
                {item.sub_menu_item.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={getMenuItemHref(subItem.url, subItem.anchor)}
                    onClick={(e) => {
                      handleMenuItemClick(e, subItem.url, subItem.anchor)
                      setIsMenuOpen(false)
                    }}
                    className={`
                      block w-full text-start py-1 
                      [font-family:'Montserrat',Helvetica] font-medium 
                      text-[#343a40] text-sm hover:text-gray-600
                    `}
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )
      } else {
        return (
          <div key={item.id} className="relative group">
            <button
              className={`
                flex items-center gap-1 px-2.5 py-2.5 relative 
                [font-family:'Montserrat',Helvetica] font-medium 
                text-base tracking-[0] leading-6 hover:text-white-600 transition-colors
              `}
            >
              {item.name}
              <svg
                className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* 桌面端下拉菜单 */}
            <div className="absolute left-0 mt-2 w-56 bg-black invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-lg">
              <div className="py-1">
                {item.sub_menu_item.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={getMenuItemHref(subItem.url, subItem.anchor)}
                    onClick={(e) =>
                      handleMenuItemClick(e, subItem.url, subItem.anchor)
                    }
                    className="block px-4 py-2 text-sm [font-family:'Montserrat',Helvetica] font-medium  text-white transition-colors"
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )
      }
    } else {
      if (isMobile) {
        return (
          <a
            key={item.id}
            href={href}
            onClick={(e) => {
              handleMenuItemClick(e, item.url, item.anchor)
              setIsMenuOpen(false)
            }}
            className="w-full text-start py-2 [font-family:'Montserrat',Helvetica] font-medium  text-[#343a40] text-base hover:text-gray-600"
          >
            {item.name}
          </a>
        )
      } else {
        return (
          <a
            key={item.id}
            href={href}
            onClick={(e) => handleMenuItemClick(e, item.url, item.anchor)}
            className={`
              flex items-center justify-center gap-2.5 px-2.5 py-2.5 relative 
              [font-family:'Montserrat',Helvetica] font-medium  text-[#ffffff] 
              text-base tracking-[0] leading-6 hover:text-white-600 transition-colors
            `}
          >
            {item.name}
          </a>
        )
      }
    }
  }

  return (
    <div
      className={`z-50 w-full 2xl:w-[1512px] flex flex-col items-center gap-2.5 pb-[43px] pt-[34px]  ${
        isFixed
          ? "z-50 lg:px-[132px] lg:fixed lg:top-0 lg:left-1/2 lg:-translate-x-1/2"
          : "lg:px-[52px]"
      }`}
    >
      {/* Desktop Navigation */}
      <div
        className={`
          hidden xl:flex flex-col w-full h-[75px] items-center justify-center gap-2.5 p-5 
          relative bg-[#000000] rounded-[20px] backdrop-blur-[27.6px] backdrop-brightness-[100%] 
          [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]
        `}
      >
        <div className="justify-between self-stretch w-full flex-[0_0_auto] mt-[-4.50px] mb-[-4.50px] flex items-center relative">
          <Link href="/">
            <img
              className="relative w-[76.45px] h-12"
              alt="Logo"
              src="/img/logo.svg"
            />
          </Link>

          <div className="flex items-center justify-end gap-10 relative text-[#ffffff]">
            <div className="flex items-center justify-end gap-10 relative flex-1 grow">
              {/* 动态菜单项 */}
              {menuData?.data.menu_item.map((item) =>
                renderMenuItem(item, false)
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex  items-center justify-center gap-2.5 px-0 py-2.5 relative">
                <a
                  href="/cart"
                  className="relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium  text-base tracking-[0] leading-6"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img
                        className="w-[30px] h-[30px]"
                        src={
                          hasItemsInCart
                            ? "/img/cart-with-products.png"
                            : "/img/cart.png"
                        }
                        alt="cart"
                      />
                    </div>
                    <div>Cart</div>
                  </div>
                </a>
              </div>

              <a href="/#contact">
                <Component text="Contact us" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="xl:hidden flex flex-col w-full items-center justify-center relative">
        <div
          className={`
            w-full h-[60px] flex items-center justify-between bg-[#ffffffcc]
            rounded-[30px] border border-solid border-[#ffffff] backdrop-blur-[27.6px] 
            backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]
          `}
        >
          <Link href="/">
            <img
              className="relative w-[60px] h-8"
              alt="Logo"
              src="/img/mobile_logo.svg"
            />
          </Link>

          <div className="flex items-center justify-end gap-2 relative">
            <div className="flex  items-center justify-center gap-2.5 px-0 py-2.5 relative">
              <a
                href="/cart"
                className="relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img
                      className="w-[30px]"
                      src={
                        hasItemsInCart
                          ? "/img/mobile-cart-with-products.png"
                          : "/img/mobile-cart.png"
                      }
                      alt="cart"
                    />
                  </div>
                </div>
              </a>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#343a40]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`
              w-full mt-2 bg-[#ffffffcc] rounded-[30px] border border-solid border-[#ffffff] 
              backdrop-blur-[27.6px] backdrop-brightness-[100%] 
              [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]
            `}
          >
            <div className="flex flex-col items-start py-4 space-y-4">
              {/* 动态菜单项 */}
              {menuData?.data.menu_item.map((item) =>
                renderMenuItem(item, true)
              )}

              <a
                href="/#contact"
                onClick={(e) => {
                  setIsMenuOpen(false)
                }}
                className="w-full flex justify-start"
              >
                <Component text="Contact us" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
