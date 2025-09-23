"use client"

import V2Button from "@/components/V2Button"
import { getMenu } from "@lib/cms/strapiCmsApi"
import { useCart } from "@lib/context/cartContext"
import { getStrapiUrl } from "@lib/utils"
import { Menu, Minus, MoveRight, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Component } from "../../../../components/Component"

// 菜单数据类型定义
interface SubMenuItem {
  id: number
  name: string
  url: string | null
  anchor: string | null
}

interface CustomSubMenuItem {
  id: number
  name: string
  url: string | null
  showLinkBtn: boolean
  subTitle: string | null
  description: string | null
  banner: {
    url: string | null
  }
  iconText: {
    id: number
    name: string
    icon: {
      url: string | null
    }
  }[]
}

interface SubBannerMenuItem {
  id: number
  name: string
  url: string
  banner: {
    url: string | null
  }
}

interface MenuItem {
  id: number
  name: string
  url: string | null
  anchor: string | null
  sub_menu_item: SubMenuItem[]
  custom_sub_menu_item: CustomSubMenuItem[]
  sub_banner_menu_item: SubBannerMenuItem[]
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
}): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const { cart } = useCart()
  const router = useRouter()

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
    const hasCustomSubMenu =
      item.custom_sub_menu_item && item.custom_sub_menu_item.length > 0
    const hasBannerMenu =
      item.sub_banner_menu_item && item.sub_banner_menu_item.length > 0
    const href = getMenuItemHref(item.url, item.anchor)

    if (hasSubMenu) {
      if (isMobile) {
        return (
          <div key={item.id} className="relative w-full">
            <div className="w-full flex items-center justify-between pb-5 border-b-[1px] border-b-[#fff] text-[#8C877C] text-base">
              <button
                onClick={() => {
                  if (item.url) {
                    router.push(
                      item?.url.startsWith("/") ? item?.url : `/${item?.url}`
                    )
                    return
                  }
                  setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                }}
              >
                {item.name}
              </button>
              {openSubmenu === item.id ? (
                <Minus
                  className={"w-6 h-6 text-[#8C877C]"}
                  onClick={() => {
                    setOpenSubmenu(null)
                  }}
                />
              ) : (
                <Plus
                  className={"w-6 h-6 text-[#8C877C]"}
                  onClick={() => {
                    setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                  }}
                />
              )}
            </div>
            {openSubmenu === item.id && (
              <div className={"mb-5"}>
                {item.sub_menu_item.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={getMenuItemHref(subItem.url, subItem.anchor)}
                    onClick={(e) => {
                      handleMenuItemClick(e, subItem.url, subItem.anchor)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-between py-5 border-b-[1px] border-b-[#8C877C] font-semibold text-xl text-[#140E02]"
                  >
                    {subItem.name}

                    <MoveRight className="w-4 h-4 text-[#140E02]" />
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
              onClick={() => {
                if (item.url) {
                  router.push(
                    item?.url.startsWith("/") ? item?.url : `/${item?.url}`
                  )
                  return
                }
              }}
              className={`
                flex items-center gap-1 px-2.5 py-2.5 h-[75px] relative text-base tracking-[0] leading-6 hover:text-white-600 transition-colors hover:underline  font-semibold
              `}
            >
              {item.name}
              {/* <svg
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
              </svg> */}
            </button>

            {/* 桌面端下拉菜单 */}
            <div className="fixed top-[75px] bg-[#EFEEEB] invisible group-hover:opacity-100 group-hover:visible transition-all z-50 -translate-x-6">
              <div className="px-10 py-4">
                {item.sub_menu_item.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={getMenuItemHref(subItem.url, subItem.anchor)}
                    onClick={(e) =>
                      handleMenuItemClick(e, subItem.url, subItem.anchor)
                    }
                    className="block py-6 text-base text-[#2F2A1E] transition-colors font-semibold hover:underline "
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )
      }
    } else if (hasCustomSubMenu || hasBannerMenu) {
      return isMobile ? (
        <div key={item.id} className="relative w-full">
          <div
            className={`
            w-full flex items-center justify-between pb-5 border-b-[1px] text-[#8C877C] text-base
            ${
              openSubmenu === item.id
                ? "border-b-transparent"
                : "border-b-[#fff]"
            }
            `}
          >
            <button
              onClick={() => {
                if (item.url) {
                  router.push(
                    item?.url.startsWith("/") ? item?.url : `/${item?.url}`
                  )
                  return
                }
              }}
            >
              {item.name}
            </button>
            {openSubmenu === item.id ? (
              <Minus
                className={"w-6 h-6 text-[#8C877C]"}
                onClick={() => {
                  setOpenSubmenu(null)
                }}
              />
            ) : (
              <Plus
                className={"w-6 h-6 text-[#8C877C]"}
                onClick={() => {
                  setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                }}
              />
            )}
          </div>
          {openSubmenu === item.id && (
            <div className={"mb-5"}>
              {item.custom_sub_menu_item.map((subItem) => (
                <div key={subItem.id}>
                  <div
                    className={
                      "flex items-center justify-between text-[#140E02] text-xl mb-[10px]"
                    }
                    onClick={() => {
                      if (!subItem || !subItem?.url) {
                        return
                      }
                      router.push(
                        subItem?.url.startsWith("/")
                          ? subItem?.url
                          : `/${subItem?.url}`
                      )
                    }}
                  >
                    {subItem.name}
                    <MoveRight className="w-4 h-4 text-[#140E02]" />
                  </div>
                  <div className={"mb-5 grid grid-cols-2 gap-2"}>
                    <div className="flex flex-col">
                      {subItem?.iconText &&
                        subItem?.iconText?.length > 0 &&
                        subItem.iconText.map((iconText) => (
                          <div
                            key={iconText.id}
                            className={"flex items-center gap-2 mb-[10px]"}
                          >
                            <img
                              className={
                                "w-10 h-10 flex-grow-0 flex-shrink-0 basis-auto"
                              }
                              src={
                                iconText?.icon?.url
                                  ? getStrapiUrl(iconText?.icon?.url)
                                  : ""
                              }
                              alt={iconText.name}
                            />
                            <div
                              className={
                                "text-[11px] text-[#2F2A1E] line-clamp-2"
                              }
                            >
                              {iconText.name}
                            </div>
                          </div>
                        ))}
                      <div className="mt-auto w-full h-[1px] bg-[#8C877C] self-end"></div>
                    </div>
                    <div>
                      <div
                        className={
                          "text-[11px] text-[#8C877C] line-clamp-2 font-semibold"
                        }
                      >
                        {subItem.subTitle}
                      </div>
                      <div
                        className={"text-[11px] text-[#8C877C] line-clamp-6"}
                      >
                        {subItem.description}
                      </div>
                      <div className={"mt-[10px]"}>
                        <img
                          className="w-full h-[43.5vw] object-cover"
                          src={
                            subItem?.banner?.url
                              ? getStrapiUrl(subItem?.banner?.url)
                              : ""
                          }
                          alt={subItem?.name}
                          onClick={() => {
                            if (!subItem || !subItem?.url) {
                              return
                            }
                            router.push(
                              subItem?.url.startsWith("/")
                                ? subItem?.url
                                : `/${subItem?.url}`
                            )
                          }}
                        />

                        {subItem.showLinkBtn && (
                          <V2Button
                            data={{
                              text: "Shop Now",
                              type: "Primary",
                              size: "Small",
                              link: subItem?.url
                                ? subItem?.url.startsWith("/")
                                  ? subItem?.url
                                  : `/${subItem?.url}`
                                : "",
                              icon: "null",
                            }}
                            className="w-full"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {item.sub_banner_menu_item.map((subItem) => (
                <div
                  key={subItem.id}
                  onClick={() => {
                    if (!subItem || !subItem?.url) {
                      return
                    }
                    router.push(
                      subItem?.url.startsWith("/")
                        ? subItem?.url
                        : `/${subItem?.url}`
                    )
                  }}
                >
                  <div
                    className={
                      "flex items-center justify-between text-[#140E02] text-xl mb-[10px]"
                    }
                  >
                    {subItem.name}
                    <MoveRight className="w-4 h-4 text-[#140E02]" />
                  </div>
                  <img
                    className="w-full h-[11vw] border-b-[1px] border-b-[#8C877C] object-cover"
                    src={
                      subItem?.banner?.url
                        ? getStrapiUrl(subItem?.banner?.url)
                        : ""
                    }
                    alt={subItem?.name}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div key={item.id} className="relative group">
          <button
            className={`
              flex items-center gap-1 px-2.5 py-2.5 h-[75px] relative text-base tracking-[0] leading-6 hover:text-white-600 transition-colors hover:underline  font-semibold
            `}
            onClick={() => {
              if (item.url) {
                router.push(
                  item?.url.startsWith("/") ? item?.url : `/${item?.url}`
                )
                return
              }
            }}
          >
            {item.name}
          </button>

          {/* 桌面端下拉菜单 */}
          <div className="fixed left-0 top-[75px] max-h-[600px] py-10 w-screen bg-[#EFEEEB] invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div
              className={
                "w-full max-w-[1074px] flex justify-center items-center gap-y-10 m-auto flex-wrap"
              }
            >
              {item.custom_sub_menu_item.map((subItem) => (
                <div
                  key={subItem.id}
                  // href={getMenuItemHref(subItem.url, "")}
                  // onClick={(e) => handleMenuItemClick(e, subItem.url, "")}
                  className="flex w-full flex-grow-0 flex-shrink-0 basis-auto overflow-hidden"
                >
                  <div className="w-full flex border-b">
                    <div className="w-[159px] flex-grow-0 flex-shrink-0 basis-auto text-2xl text-[#140E02] font-semibold">
                      {subItem.name}
                    </div>

                    {subItem?.iconText && subItem?.iconText?.length > 0 && (
                      <div className="w-full ml-6">
                        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                          {subItem.iconText.map((iconText) => (
                            <div
                              key={iconText.id}
                              className={"flex items-center gap-x-3"}
                            >
                              <img
                                className={"w-10 h-10"}
                                src={
                                  iconText?.icon?.url
                                    ? getStrapiUrl(iconText?.icon?.url)
                                    : ""
                                }
                                alt={iconText.name}
                              />
                              <div className={"text-xs text-[#2F2A1E]"}>
                                {iconText.name}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="py-3">
                          <div className="text-xs text-[#8C877C] font-semibold">
                            {subItem.subTitle}
                          </div>
                          <div className="text-xs text-[#8C877C]">
                            {subItem.description}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-[159px] ml-6 flex-grow-0 flex-shrink-0 basis-auto">
                    <img
                      className="w-full h-[144px] cursor-pointer"
                      src={
                        subItem?.banner?.url
                          ? getStrapiUrl(subItem?.banner?.url)
                          : ""
                      }
                      alt={subItem?.name}
                      onClick={() => {
                        if (!subItem || !subItem?.url) {
                          return
                        }
                        router.push(
                          subItem?.url.startsWith("/")
                            ? subItem?.url
                            : `/${subItem?.url}`
                        )
                      }}
                    />

                    {subItem.showLinkBtn && (
                      <V2Button
                        data={{
                          text: "Shop Now",
                          type: "Primary",
                          size: "Small",
                          link: subItem?.url
                            ? subItem?.url.startsWith("/")
                              ? subItem?.url
                              : `/${subItem?.url}`
                            : "",
                          icon: "null",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
              {item.sub_banner_menu_item && (
                <div
                  // href={getMenuItemHref(subItem.url, "")}
                  // onClick={(e) => handleMenuItemClick(e, subItem.url, "")}
                  className={`grid grid-cols-${item.sub_banner_menu_item?.length} gap-x-6`}
                >
                  {item.sub_banner_menu_item.map((subItem: any) => (
                    <div key={subItem.id} className={"flex overflow-hidden"}>
                      <div className="w-[159px] flex-grow-0 flex-shrink-0 basis-auto text-2xl text-[#140E02] font-semibold border-b">
                        {subItem.name}
                      </div>

                      <img
                        className="w-full h-[114px] ml-6 cursor-pointer"
                        src={
                          subItem?.banner?.url
                            ? getStrapiUrl(subItem?.banner?.url)
                            : ""
                        }
                        alt={subItem?.name}
                        onClick={() => {
                          if (!subItem || !subItem?.url) {
                            return
                          }
                          router.push(
                            subItem?.url.startsWith("/")
                              ? subItem?.url
                              : `/${subItem?.url}`
                          )
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )
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
              flex items-center justify-center gap-2.5 px-2.5 py-2.5 relative text-[#2F2A1E]
              text-base tracking-[0] leading-6 hover:text-white-600 transition-colors  font-semibold
            `}
          >
            {item.name}
          </a>
        )
      }
    }
  }

  return (
    <>
      {/* Placeholder element to prevent content from being hidden behind fixed navigation */}
      {isFixed && <div className="hidden xl:block w-full h-[115px]"></div>}

      <header
        className={`z-50 w-full flex flex-col items-center gap-0 ${
          isFixed
            ? "z-50 lg:fixed lg:top-0 lg:left-1/2 lg:-translate-x-1/2"
            : ""
        }`}
        role="banner"
      >
        {/* Top Contact Bar - Black Background */}
        <address className="flex w-full h-6 lg:h-8 bg-black lg:items-center items-end justify-center not-italic">
          <div className="flex w-full lg:max-w-[1074px] lg:justify-end justify-center items-center gap-6 text-white text-[11px] lg:text-xs text-[#8C877C]">
            <a
              href="mailto:Info@Relaxureliving.Com"
              className="flex items-center gap-2 transition-colors underline"
              aria-label="Send email to Info@Relaxureliving.Com"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Info@Relaxureliving.Com
            </a>
            <a
              href="tel:1-213-566-8658"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors underline"
              aria-label="Call 1-213-566-8658"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              1-213-566-8658
            </a>
          </div>
        </address>

        {/* Main Navigation Bar - Dark Brown/Black Background */}
        <nav
          className={`
            hidden lg:flex flex-col w-full h-[75px] items-center justify-center gap-2.5 p-5 
            relative bg-[#140E02] backdrop-blur-[27.6px] backdrop-brightness-[100%] 
            [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]
          `}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="w-full max-w-[1074px] mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Relaxure Homepage"
            >
              <img
                className="w-[160]"
                src="/img/logo.svg"
                alt="Relaxure Living Logo"
              />
            </Link>

            <div className="flex items-center justify-end w-full gap-8 xl:gap-10 relative text-[#ffffff]">
              <ul
                className="flex items-center justify-center gap-6 xl:gap-10 relative flex-1 grow"
                role="menubar"
                aria-label="Main menu"
              >
                {/* 动态菜单项 */}
                {menuData?.data.menu_item.map((item) => (
                  <li key={item.id} role="none">
                    {renderMenuItem(item, false)}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center gap-4 px-0 py-2.5 relative">
                  <V2Button
                    data={{
                      text: "Contact Us",
                      type: "Primary",
                      size: "Small",
                      link: "/contact-us",
                      icon: "null",
                    }}
                    className={"mr-2"}
                  />
                  <a
                    href="/cart"
                    className="relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-base tracking-[0] leading-6 text-white"
                    aria-label={`Shopping cart with ${
                      hasItemsInCart ? cart?.items?.length || 1 : 0
                    } items`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img
                          className="w-6 h-6"
                          src={
                            hasItemsInCart
                              ? "/img/v2-icon-cart.svg"
                              : "/img/v2-icon-cart.svg"
                          }
                          alt="Shopping cart"
                        />
                        {hasItemsInCart && (
                          <span
                            className="absolute -top-1 -right-1 bg-[#F6AF1F] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                            aria-label={`${
                              cart?.items?.length || 1
                            } items in cart`}
                          >
                            {cart?.items?.length || 1}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                  {/* <a href="">
                    <img
                      className="w-6 h-6"
                      src={"/img/v2-icon-user.svg"}
                      alt="Member login"
                    />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav
          className="lg:hidden flex flex-col w-full items-center justify-center relative"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="w-full">
            <div className="w-full h-[60px] flex items-center justify-between bg-[#140E02] px-6">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white flex-grow-0 flex-shrink-0 basis-auto "
                aria-label={
                  isMenuOpen ? "Close mobile menu" : "Open mobile menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
              <Link
                href="/"
                className="flex items-center justify-center w-full"
                aria-label="Relaxure Homepage"
              >
                <img
                  className="w-[100px]"
                  src="/img/logo.svg"
                  alt="Relaxure Living Logo"
                />
              </Link>

              <div className="flex items-center justify-center px-0 py-2.5 relative">
                <a
                  href="/cart"
                  className="flex-grow-0 flex-shrink-0 basis-auto relative mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-base tracking-[0] leading-6 text-white"
                  aria-label={`Shopping cart with ${
                    hasItemsInCart ? cart?.items?.length || 1 : 0
                  } items`}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img
                        className="w-6 h-6"
                        src={
                          hasItemsInCart
                            ? "/img/v2-icon-cart.svg"
                            : "/img/v2-icon-cart.svg"
                        }
                        alt="Shopping cart"
                      />
                      {hasItemsInCart && (
                        <span
                          className="absolute -top-1 -right-1 bg-[#F6AF1F] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                          aria-label={`${
                            cart?.items?.length || 1
                          } items in cart`}
                        >
                          {cart?.items?.length || 1}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div
                id="mobile-menu"
                className="bg-[#EFEEEB]"
                role="menu"
                aria-label="Mobile menu options"
              >
                <ul className="flex flex-col items-start w-full py-5 px-6">
                  {/* 动态菜单项 */}
                  {menuData?.data.menu_item.map((item) => (
                    <li key={item.id} role="none" className={"w-full mb-5"}>
                      {renderMenuItem(item, true)}
                    </li>
                  ))}

                  <li role="none" className={"w-full mt-10"}>
                    <a
                      href="/#contact"
                      onClick={(e) => {
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex justify-center"
                      role="menuitem"
                    >
                      <Component text="Contact Us" />
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}
