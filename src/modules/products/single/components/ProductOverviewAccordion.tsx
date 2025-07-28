"use client"
/* NOSONAR */
import React, { useState, useEffect } from "react"
import { ProductOverview } from "@/types/global"
import { ImageSlider } from "@modules/common/components/ImageSlider"
import ClickableImageSlider from "./ClickableImageSlider"
import YouTubeWrapper from "./YouTubeWrapper"
import Link from "next/link"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

// 定义手风琴展开和收起的样式常量
const ACCORDION_EXPANDED_STYLES = "max-h-[1000px] opacity-100"
const ACCORDION_EXPANDED_STYLES_LARGE = "max-h-[2000px] opacity-100"
const ACCORDION_EXPANDED_STYLES_XLARGE = "max-h-[3000px] opacity-100"
const ACCORDION_COLLAPSED_STYLES = "max-h-0 opacity-0"

interface ProductOverviewAccordionProps {
  productOverview: ProductOverview
}

export const ProductOverviewAccordion: React.FC<
  ProductOverviewAccordionProps
> = ({ productOverview }) => {
  // 获取视频ID
  const getVideoId = () => {
    // 从fast_easy_assembly中获取youtubeCode，如果没有则使用默认值
    return productOverview.fast_easy_assembly?.youtubeCode || "ZwKTt2-D1mk"
  }

  // 定义视频步骤类型
  interface VideoSection {
    id: number
    numberOfButton: string
    title: string
    description: string
    timeStamp: number
  }

  // 获取视频步骤
  const getVideoSections = (): VideoSection[] => {
    if (!productOverview.fast_easy_assembly?.youtubeButtons) {
      return []
    }

    return productOverview.fast_easy_assembly.youtubeButtons.map(
      (button: any) => ({
        id: button.id,
        numberOfButton: button.numberOfButton,
        title: button.tittle,
        description: button.description,
        timeStamp: button.percentage,
      })
    )
  }

  const videoSections = getVideoSections()
  const videoId = getVideoId()

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [player, setPlayer] = useState<any>(null)
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const [hasAutoSeeked, setHasAutoSeeked] = useState(false)
  const [riskPopupOpen, setRiskPopupOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  useEffect(() => {
    if (openIndex === 3 && videoSections.length > 0 && !hasAutoSeeked) {
      setActiveSection(videoSections[0].id)
      if (player) {
        const duration = player.getDuration()
        const seekTime = (duration * videoSections[0].timeStamp) / 100
        player.seekTo(seekTime)
      }
      setHasAutoSeeked(true)
    }
    // 如果手风琴收起，重置hasAutoSeeked
    if (openIndex !== 3) {
      setHasAutoSeeked(false)
    }
  }, [openIndex, videoSections, player, hasAutoSeeked])

  useEffect(() => {
    setIsClient(true)
  }, [])

  // YouTube播放器准备就绪回调
  const onReady = (event: any) => {
    setPlayer(event.target)
    // 只在首次展开时自动跳转
    if (openIndex === 3 && videoSections.length > 0 && !hasAutoSeeked) {
      const duration = event.target.getDuration()
      const seekTime = (duration * videoSections[0].timeStamp) / 100
      event.target.seekTo(seekTime)
      setActiveSection(videoSections[0].id)
      setHasAutoSeeked(true)
    }
  }

  // 跳转到视频指定时间
  const seekTo = (timeStamp: number, sectionId: number) => {
    if (player) {
      const duration = player.getDuration()
      const seekTime = (duration * timeStamp) / 100
      player.seekTo(seekTime)
      setActiveSection(sectionId)
    } else {
      setActiveSection(sectionId)
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  return (
    <>
      <div id="product-overview" className="w-full max-w-xl mx-auto my-10">
        {/* 主标题 */}
        {isClient && (
          <h2
            className="text-3xl font-bold text-center text-gray-800 mb-2"
            dangerouslySetInnerHTML={{
              __html: productOverview.shot_description,
            }}
          ></h2>
        )}
        {/* 副标题 */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {productOverview.title}
        </h2>
        {/* 外边框的手风琴 */}
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          {/* Description */}
          <div className="border-b" id="accordion-item-0">
            <button
              className="w-full flex items-center justify-between px-6 py-5 focus:outline-none transition-colors hover:bg-gray-50"
              onClick={() => handleToggle(0)}
              aria-expanded={openIndex === 0}
            >
              <h3 className="flex items-center text-[#69727A] text-[18px] font-medium font-montserrat">
                {productOverview.product_overview_description?.title}
              </h3>
              <span
                className={`ml-2 text-[#F6AF1F] text-2xl font-bold transform transition-transform duration-200 ${
                  openIndex === 0 ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`px-6 pb-5 text-gray-600 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === 0
                  ? ACCORDION_EXPANDED_STYLES
                  : ACCORDION_COLLAPSED_STYLES
              }`}
            >
              {/* 这里可以自定义Description的渲染逻辑 */}
              {isClient && (
                <div
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      productOverview.product_overview_description?.description,
                  }}
                ></div>
              )}
            </div>
          </div>
          {/* Pergola Sizes & Technical Specs */}
          <div className="border-b" id="accordion-item-1">
            <button
              className="w-full flex items-center justify-between px-6 py-5 focus:outline-none transition-colors hover:bg-gray-50"
              onClick={() => handleToggle(1)}
              aria-expanded={openIndex === 1}
            >
              <h3 className="flex items-center text-[#69727A] text-[18px] font-medium font-montserrat">
                {productOverview.pergola_size_technical_specs?.title ||
                  "Pergola Sizes & Technical Specs"}
              </h3>
              <span
                className={`ml-2 text-[#F6AF1F] text-2xl font-bold transform transition-transform duration-200 ${
                  openIndex === 1 ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`px-6 pb-5 text-gray-600 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === 1
                  ? ACCORDION_EXPANDED_STYLES_LARGE
                  : ACCORDION_COLLAPSED_STYLES
              }`}
            >
              {/* 文字内容 */}
              <div className="text-gray-600 text-sm">
                {productOverview.pergola_size_technical_specs?.description}
              </div>
              <div className="flex flex-wrap items-center justify-start w-full mt-5 mb-5">
                <a
                  href="/upload_files/Pergola_technical_sheet_new.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2"
                >
                  <img src="/img/pdf.png" alt="PDF" className="w-5 h-5" />
                  <h3 className="font-medium text-[#69727A] text-[14px]">
                    Product Technical Sheet
                  </h3>
                </a>
              </div>
              {/* 图片Slider */}
              {productOverview.pergola_size_technical_specs?.images?.length >
                0 && (
                <div className="mb-4">
                  <ClickableImageSlider
                    images={productOverview.pergola_size_technical_specs.images}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Shipping & Returns */}
          <div className="border-b" id="accordion-item-2">
            <button
              className="w-full flex items-center justify-between px-6 py-5 focus:outline-none transition-colors hover:bg-gray-50"
              onClick={() => handleToggle(2)}
              aria-expanded={openIndex === 2}
            >
              <h3 className="flex items-center text-[#69727A] text-[18px] font-medium font-montserrat">
                {productOverview.shipping_and_returns?.title}
              </h3>
              <span
                className={`ml-2 text-[#F6AF1F] text-2xl font-bold transform transition-transform duration-200 ${
                  openIndex === 2 ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`px-6 pb-5 flex flex-col items-center text-gray-600 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === 2
                  ? ACCORDION_EXPANDED_STYLES
                  : ACCORDION_COLLAPSED_STYLES
              }`}
            >
              {/* 这里可以自定义Shipping & Returns的渲染逻辑 */}
              {isClient && (
                <div
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: productOverview.shipping_and_returns?.description,
                  }}
                ></div>
              )}
              {productOverview.shipping_and_returns?.link_title && (
                <Link
                  className="text-[#F6AF1F] underline text-base mt-4 text-center"
                  href={productOverview.shipping_and_returns?.link_url}
                >
                  {productOverview.shipping_and_returns?.link_title}
                </Link>
              )}
            </div>
          </div>
          {/* Fast & Easy Assembly */}
          <div className="border-b" id="accordion-item-3">
            <button
              className="w-full flex items-center justify-between px-6 py-5 focus:outline-none transition-colors hover:bg-gray-50"
              onClick={() => handleToggle(3)}
              aria-expanded={openIndex === 3}
            >
              <h3 className="flex items-center text-[#69727A] text-[18px] font-medium font-montserrat">
                {productOverview.fast_easy_assembly?.title}
              </h3>
              <span
                className={`ml-2 text-[#F6AF1F] text-2xl font-bold transform transition-transform duration-200 ${
                  openIndex === 3 ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`px-6 pb-5 text-gray-600 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === 3
                  ? ACCORDION_EXPANDED_STYLES_XLARGE
                  : ACCORDION_COLLAPSED_STYLES
              }`}
            >
              {/* 标题和描述 */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-start">
                {productOverview.fast_easy_assembly?.subtitle}
              </h2>
              <p className="text-gray-600 text-sm mb-6 text-start">
                {
                  productOverview.fast_easy_assembly?.descriptions?.[0]
                    ?.multiDescriptions
                }
              </p>
              <p className="text-gray-600 text-sm mb-6 text-start">
                {
                  productOverview.fast_easy_assembly?.descriptions?.[1]
                    ?.multiDescriptions
                }
              </p>

              {/* 步骤卡片按钮 */}
              {videoSections.length > 0 && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {videoSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => seekTo(section.timeStamp, section.id)}
                      className={`flex flex-col items-center justify-between rounded-2xl p-6 min-h-[180px] shadow border-2 focus:outline-none  text-gray-900
                        ${
                          activeSection === section.id
                            ? "bg-[#F6AF1F] border-[#F6AF1F] text-white"
                            : "bg-white hover:bg-[#fdce6f]"
                        }
                      `}
                    >
                      {/* 步骤编号圆形背景 */}
                      <div
                        className={`w-14 h-14 flex text-black items-center justify-center rounded-full mb-4 text-lg font-bold bg-white
                        
                      `}
                      >
                        {String(section.numberOfButton).padStart(2, "0")}
                      </div>
                      {/* 步骤标题 */}
                      <div
                        className={`text-xl font-bold mb-2 text-center font-montserrat text-gray-700
                      `}
                      >
                        {section.title}
                      </div>
                      {/* 步骤描述 */}
                      <div
                        className={`text-base text-center font-normal text-gray-700 
                      `}
                      >
                        {section.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* YouTube视频播放器 */}
              {videoId && (
                <div className="mb-6">
                  <div className="w-full rounded-2xl overflow-hidden">
                    <YouTubeWrapper videoId={videoId} onReady={onReady} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* 100 Days Free Risk */}
          <div className="border-b" id="accordion-item-4">
            <button
              className="w-full flex items-center justify-between px-6 py-5 focus:outline-none transition-colors hover:bg-gray-50"
              onClick={() => handleToggle(4)}
              aria-expanded={openIndex === 4}
            >
              <h3 className="flex items-center text-[#69727A] text-[18px] font-medium font-montserrat">
                {productOverview.onehundred_days_free_risk?.Title}
              </h3>
              <span
                className={`ml-2 text-[#F6AF1F] text-2xl font-bold transform transition-transform duration-200 ${
                  openIndex === 4 ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`px-6 pb-5 text-gray-600 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === 4
                  ? ACCORDION_EXPANDED_STYLES_LARGE
                  : ACCORDION_COLLAPSED_STYLES
              }`}
            >
              {/* 卡片内容 */}
              <div className="flex flex-col w-full items-center justify-center  relative">
                <div className="w-full max-w-xl bg-white rounded-2xl flex flex-col items-center gap-4">
                  {/* 图片 */}
                  {productOverview.onehundred_days_free_risk?.image?.url && (
                    <img
                      src={`${baseUrl}${productOverview.onehundred_days_free_risk.image.url}`}
                      alt={
                        productOverview.onehundred_days_free_risk.image
                          .alternativeText || "risk free"
                      }
                      className="w-full h-full object-contain mb-2 rounded-2xl"
                    />
                  )}
                  {/* 标题 */}
                  <div className="text-[24px] lg:text-[32px] font-bold font-merriweather text-[#343a40] text-start leading-tight">
                    {productOverview.onehundred_days_free_risk?.content_title}
                  </div>
                  {/* 内容 */}
                  <div className="prose max-w-none text-[#68717a] text-start">
                    <BlocksRenderer
                      content={
                        productOverview.onehundred_days_free_risk
                          ?.short_description
                      }
                    />
                  </div>
                  {/* 按钮 */}
                  {productOverview.onehundred_days_free_risk?.button && (
                    <button
                      onClick={() => setRiskPopupOpen(true)}
                      className="w-fit hover:bg-[#fdce6f] bg-[#F6AF1F] box-border flex items-center gap-2 px-6 py-3 rounded-[10px] justify-center relative font-medium mt-2"
                    >
                      {productOverview.onehundred_days_free_risk.button}
                    </button>
                  )}
                </div>
              </div>
              {/* 弹窗 */}
              {riskPopupOpen && (
                <div
                  className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50"
                  onClick={() => setRiskPopupOpen(false)}
                >
                  <div
                    className="bg-white rounded-2xl p-6 lg:max-w-2xl h-[90vh] overflow-y-scroll mx-4 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setRiskPopupOpen(false)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="prose max-w-none mt-4">
                      <BlocksRenderer
                        content={
                          productOverview.onehundred_days_free_risk
                            ?.popup_content
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Lifetime Warranty */}
          <div id="accordion-item-5">
            <button
              className="w-full flex items-center justify-between px-6 py-5 focus:outline-none transition-colors hover:bg-gray-50"
              onClick={() => handleToggle(5)}
              aria-expanded={openIndex === 5}
            >
              <h3 className="flex items-center text-[#69727A] text-[18px] font-medium font-montserrat">
                {productOverview.lifetime_warranty?.title}
              </h3>
              <span
                className={`ml-2 text-[#F6AF1F] text-2xl font-bold transform transition-transform duration-200 ${
                  openIndex === 5 ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`flex flex-col items-center justify-center px-6 pb-5 text-gray-600 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === 5
                  ? ACCORDION_EXPANDED_STYLES
                  : ACCORDION_COLLAPSED_STYLES
              }`}
            >
              {/* 这里可以自定义Lifetime Warranty的渲染逻辑 */}
              <div className="text-gray-600 text-sm">
                {productOverview.lifetime_warranty?.description}
              </div>
              {productOverview.lifetime_warranty?.link_title && (
                <Link
                  className="text-[#F6AF1F] underline text-base mt-4 text-center"
                  href={productOverview.lifetime_warranty?.link_url}
                >
                  {productOverview.lifetime_warranty?.link_title}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        #product-overview p {
          margin-top: 1.5rem;
        }
      `}</style>
    </>
  )
}

export default ProductOverviewAccordion
