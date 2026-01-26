"use client"

import V2Button from "@/components/V2Button"
import { getMenu } from "@lib/cms/strapiCmsApi"
import { useCart } from "@lib/context/cartContext"
import { useIsMobile } from "@lib/hooks/useScreenSize"
import { getStrapiUrl } from "@lib/utils"
import { Menu, Minus, MoveRight, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Component } from "../../../../components/Component"
import Image from "next/image"
import { FIXED_BLUR_DATA_URL } from "@modules/products/single/components/ImgContent/ImgContent"
import { useQuery } from "@tanstack/react-query"

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
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const { cart } = useCart()
  const router = useRouter()

  const hasItemsInCart = cart?.items && cart.items.length > 0
  const isMobile = useIsMobile(1024)

  // 使用 React Query 获取菜单数据，配置缓存策略
  const {
    data: menuData,
    isLoading: isMenuLoading,
    isError: isMenuError,
  } = useQuery<MenuData>({
    queryKey: ["menu"],
    queryFn: getMenu,
    staleTime: 1000 * 60 * 30, // 30分钟内数据视为新鲜，不会重新获取
    gcTime: 1000 * 60 * 60, // 1小时后才从缓存中清除（原 cacheTime）
    refetchOnWindowFocus: false, // 窗口聚焦时不重新获取
    refetchOnMount: false, // 组件挂载时不重新获取（使用缓存）
    refetchOnReconnect: false, // 网络重连时不重新获取
    retry: 2, // 失败时重试2次
    retryDelay: 1000, // 重试延迟1秒
  })

  useEffect(() => {
    if (menuData?.data?.menu_item && menuData.data.menu_item.length > 0 && isMobile) {
      setOpenSubmenu(menuData.data.menu_item[0].id)
    }
  }, [isMobile, menuData])

  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.classList.add("overflow-hidden")
      } else {
        document.body.classList.remove("overflow-hidden")
      }
    }
  }, [isMobile, isMenuOpen])

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
                aria-label={item.name || "Menu item"}
                aria-expanded={openSubmenu === item.id}
                aria-haspopup="true"
                role="menuitem"
              >
                {item.name}
              </button>
              {openSubmenu === item.id ? (
                <button
                  className={"w-6 h-6 text-[#8C877C] flex items-center justify-center"}
                  onClick={() => {
                    setOpenSubmenu(null)
                  }}
                  aria-label={`Collapse ${item.name} submenu`}
                  type="button"
                >
                  <Minus className={"w-6 h-6"} />
                </button>
              ) : (
                <button
                  className={"w-6 h-6 text-[#8C877C] flex items-center justify-center"}
                  onClick={() => {
                    setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                  }}
                  aria-label={`Expand ${item.name} submenu`}
                  type="button"
                >
                  <Plus className={"w-6 h-6"} />
                </button>
              )}
            </div>
            {openSubmenu === item.id && (
              <div className={"mb-5"} role="menu">
                {item.sub_menu_item.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={getMenuItemHref(subItem.url, subItem.anchor)}
                    onClick={(e) => {
                      handleMenuItemClick(e, subItem.url, subItem.anchor)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-between py-5 border-b-[1px] border-b-[#8C877C] font-semibold text-xl text-[#140E02]"
                    role="menuitem"
                    aria-label={subItem.name || "Submenu item"}
                  >
                    {subItem.name}

                    <MoveRight className="w-4 h-4 text-[#140E02]" aria-hidden="true" />
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
              aria-label={item.name || "Menu item"}
              aria-haspopup="true"
              aria-expanded="false"
              role="menuitem"
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
            <div 
              className="fixed top-20 bg-[#EFEEEB] invisible group-hover:opacity-100 group-hover:visible transition-all z-50 -translate-x-6"
              role="menu"
              aria-label={`${item.name} submenu`}
            >
              <div className="px-10 py-4">
                {item.sub_menu_item.map((subItem) => (
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
                    className="block py-6 text-base text-[#2F2A1E] transition-colors font-semibold hover:underline cursor-pointer"
                    role="menuitem"
                    aria-label={subItem.name || "Submenu item"}
                  >
                    {subItem.name}
                  </div>
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
              aria-label={item.name || "Menu item"}
              aria-expanded={openSubmenu === item.id}
              aria-haspopup="true"
              role="menuitem"
            >
              {item.name}
            </button>
            {openSubmenu === item.id ? (
              <button
                className={"w-6 h-6 text-[#8C877C] flex items-center justify-center"}
                onClick={() => {
                  setOpenSubmenu(null)
                }}
                aria-label={`Collapse ${item.name} submenu`}
                type="button"
              >
                <Minus className={"w-6 h-6"} aria-hidden="true" />
              </button>
            ) : (
              <button
                className={"w-6 h-6 text-[#8C877C] flex items-center justify-center"}
                onClick={() => {
                  setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                }}
                aria-label={`Expand ${item.name} submenu`}
                type="button"
              >
                <Plus className={"w-6 h-6"} aria-hidden="true" />
              </button>
            )}
          </div>
          {openSubmenu === item.id && (
            <div className={"mb-5"} role="menu">
              {item.custom_sub_menu_item.map((subItem) => (
                <div key={subItem.id}>
                  <button
                    className={
                      "flex items-center justify-between text-[#140E02] text-xl mb-[10px] w-full text-left"
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
                    aria-label={subItem.name || "Submenu item"}
                    role="menuitem"
                  >
                    {subItem.name}
                    <MoveRight className="w-4 h-4 text-[#140E02]" aria-hidden="true" />
                  </button>
                  <div className={"mb-5 grid grid-cols-2 gap-2"}>
                    <div className="flex flex-col">
                      {subItem?.iconText &&
                        subItem?.iconText?.length > 0 &&
                        subItem.iconText.map((iconText) => (
                          <div
                            key={iconText.id}
                            className={"flex items-center gap-2 mb-[10px]"}
                          >
                            <Image
                              
                              className="w-10 h-10 flex-grow-0 flex-shrink-0 basis-auto"
                              src={getStrapiUrl(iconText?.icon?.url) || iconText?.icon?.url || ""}
                              alt={iconText.name || ""}
                              width={40}
                              height={40}
                              placeholder="blur"
                              blurDataURL={FIXED_BLUR_DATA_URL}
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
                      <div className="mt-auto w-full h-[1px] bg-[#8C877C]"></div>
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
                        <button
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
                          aria-label={`View ${subItem?.name || "product"}`}
                          className="w-full"
                          type="button"
                        >
                          <Image
                            
                            className="w-full h-[43.5vw] object-cover"
                            src={getStrapiUrl(subItem?.banner?.url) || ""}
                            alt={subItem?.name || ""}
                            width={600}
                            height={350}
                            placeholder="blur"
                            blurDataURL={FIXED_BLUR_DATA_URL}
                          />
                        </button>

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
                <div key={subItem.id}>
                  <button
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
                    className="w-full text-left"
                    aria-label={subItem.name || "Submenu item"}
                    role="menuitem"
                  >
                    <div
                      className={
                        "flex items-center justify-between text-[#140E02] text-xl mb-[10px]"
                      }
                    >
                      {subItem.name}
                      <MoveRight className="w-4 h-4 text-[#140E02]" aria-hidden="true" />
                    </div>
                    <Image
                      
                      className="w-full h-[11vw] border-b-[1px] border-b-[#8C877C] object-cover"
                      src={getStrapiUrl(subItem?.banner?.url) || ""}
                      alt={subItem?.name || ""}
                      width={800}
                      height={200}
                      placeholder="blur"
                      blurDataURL={FIXED_BLUR_DATA_URL}
                    />
                  </button>
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
            aria-label={item.name || "Menu item"}
            aria-haspopup="true"
            aria-expanded="false"
            role="menuitem"
          >
            {item.name}
          </button>

          {/* 桌面端下拉菜单 */}
          <div 
            className="fixed left-0 top-20 max-h-[600px] py-10 w-screen bg-[#EFEEEB] invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
            role="menu"
            aria-label={`${item.name} submenu`}
          >
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
                              <Image
                                
                                className="w-10 h-10"
                                src={getStrapiUrl(iconText?.icon?.url) || ""}
                                alt={iconText.name || ""}
                                width={40}
                                height={40}
                                placeholder="blur"
                                blurDataURL={FIXED_BLUR_DATA_URL}
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
                    <button
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
                      aria-label={`View ${subItem?.name || "product"}`}
                      className="w-full"
                      type="button"
                    >
                      <Image
                        
                        className="w-full h-[144px]"
                        src={getStrapiUrl(subItem?.banner?.url) || ""}
                        alt={subItem?.name || ""}
                        width={159}
                        height={144}
                        placeholder="blur"
                        blurDataURL={FIXED_BLUR_DATA_URL}
                      />
                    </button>

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

                      <button
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
                        aria-label={`View ${subItem?.name || "product"}`}
                        className="w-full ml-6"
                        type="button"
                      >
                        <Image
                          
                          className="w-full h-[114px]"
                          src={getStrapiUrl(subItem?.banner?.url) || ""}
                          width={159}
                          height={114}
                          placeholder="blur"
                          blurDataURL={FIXED_BLUR_DATA_URL}
                          alt={subItem?.name || ""}
                        />
                      </button>
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
      {(isFixed || isMobile) && (
        <div className="w-full h-[84px] lg:h-[112px]"></div>
      )}

      <header
        className={`z-50 w-full flex flex-col items-center gap-0 ${
          isFixed || isMobile
            ? "z-50 fixed top-0 left-1/2 -translate-x-1/2"
            : ""
        }`}
        role="banner"
      >
        {/* Top Contact Bar - Black Background */}
        <address className="flex w-full h-6 lg:h-8 bg-black lg:items-center items-end justify-center not-italic">
          <div className="flex w-full lg:max-w-[1074px] lg:justify-end justify-center items-center gap-6 text-[11px] lg:text-xs text-[#8C877C]">
            <a
              href="mailto:Info@Relaxureliving.Com"
              className="flex items-center gap-2 underline invert"
              aria-label="Send email to Info@Relaxureliving.Com"
            >
              <div
                className={"w-4 h-4"}
                style={{
                  mask: "url(/img/icon-contact-email.svg) no-repeat center",
                  maskSize: "contain",
                  backgroundColor: "#8C877C",
                }}
              />
              Info@Relaxureliving.Com
            </a>
            <a
              href="tel:1-213-566-8658"
              className="flex items-center gap-2 underline invert"
              aria-label="Call 1-213-566-8658"
            >
              <div
                className={"w-4 h-4"}
                style={{
                  mask: "url(/img/icon-contact-phone.svg) no-repeat center",
                  maskSize: "contain",
                  backgroundColor: "#8C877C",
                }}
              />
              1-213-566-8658
            </a>
          </div>
        </address>

        {/* Main Navigation Bar - Dark Brown/Black Background */}
        <nav
          className={`
            hidden lg:flex flex-col w-full h-20 items-center justify-center gap-2.5 p-5 
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
              <Image
                
                className="w-[160px]"
                src="/img/logo.svg"
                alt="Relaxure Living Logo"
                width={160}
                height={60}
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
                        <Image
                          
                          className="w-6 h-6"
                          src={
                            hasItemsInCart
                              ? "/img/v2-icon-cart.svg"
                              : "/img/v2-icon-cart.svg"
                          }
                          alt="Shopping cart"
                          width={24}
                          height={24}
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
                <Image
                  
                  className="w-[100px] h-auto"
                  src="/img/logo.svg"
                  alt="Relaxure Living Logo"
                  width={100}
                  height={38}
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
                      <Image
                        
                        className="w-6 h-6"
                        src={
                          hasItemsInCart
                            ? "/img/v2-icon-cart.svg"
                            : "/img/v2-icon-cart.svg"
                        }
                        alt="Shopping cart"
                        width={24}
                        height={24}
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
                className="bg-[#EFEEEB] max-lg:h-[calc(100vh-80px)] max-lg:overflow-auto"
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
