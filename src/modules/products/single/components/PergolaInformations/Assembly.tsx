"use client"
import React, { useState } from "react"
import YouTubeWrapper from "../YouTubeWrapper"
import { PergolaData } from "@/types/global"
interface Props {
  pergolaData: PergolaData
  videoId?: string
  videoUrl?: string // 新增：支持直接传入 YouTube URL
}

export const AssemblyContainer = ({ pergolaData }: Props): JSX.Element => {
  const [player, setPlayer] = useState<any>(null)
  const [activeSection, setActiveSection] = useState(1)

  // 获取实际使用的视频 ID
  const actualVideoId = pergolaData.putItTogether.youtubeCode || "ZwKTt2-D1mk"

  const videoSections = pergolaData.putItTogether.youtubeButtons.map(
    (button) => ({
      id: button.id,
      numberOfButton: button.numberOfButton,
      title: button.tittle,
      description: button.description,
      timeStamp: button.percentage,
    })
  )

  const onReady = (event: any) => {
    setPlayer(event.target)
  }

  const seekTo = (timeStamp: number, sectionId: number) => {
    if (player) {
      const duration = player.getDuration()
      const seekTime = (duration * timeStamp) / 100
      player.seekTo(seekTime)
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col items-start justify-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto]">
        <div
          className={`relative flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] 
          text-[#343a40] text-[18px] lg:text-[36px] tracking-[var(--heading-2-letter-spacing)] 
          leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]`}
        >
          {pergolaData.putItTogether.title}
        </div>
        <div className="flex flex-col items-start justify-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto] lg:mt-[30px]">
          {pergolaData.putItTogether.descriptions.map((item, index) => (
            <p
              key={index}
              className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]"
            >
              {item.multiDescriptions}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full gap-6">
        {/* Navigation Buttons - Always on top */}
        <div className="w-full grid grid-cols-2 gap-3 md:gap-6 order-1">
          {videoSections.map((section) => (
            <button
              key={section.id}
              onClick={() => seekTo(section.timeStamp, section.id)}
              className={`flex flex-col items-center p-4 md:p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 border-2 ${
                activeSection === section.id
                  ? "bg-[#072f6c] text-white border-[#072f6c]"
                  : "bg-white text-[#343a40] border-[#e9e9e9] hover:border-[#072f6c]"
              }`}
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 mb-2 md:mb-4 rounded-full flex items-center justify-center ${
                  activeSection === section.id
                    ? "bg-white text-[#072f6c]"
                    : "bg-[#f8f9fa] text-[#072f6c]"
                }`}
              >
                <span className="text-[18px] md:text-xl font-medium font-montserrat">
                  {String(section.numberOfButton).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-[18px] md:text-2xl font-montserrat font-bold mb-1 md:mb-2">
                {section.title}
              </h3>
              <p className="text-center text-[14px] md:text-sm opacity-90 line-clamp-2">
                {section.description}
              </p>
            </button>
          ))}
        </div>

        {/* Video Section - Always below */}
        <div className="w-full rounded-2xl overflow-hidden order-2">
          {actualVideoId ? (
            <YouTubeWrapper videoId={actualVideoId} onReady={onReady} />
          ) : (
            <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-gray-500">
              请提供有效的 YouTube 视频 ID 或 URL
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Assembly = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}): JSX.Element => {
  return <AssemblyContainer pergolaData={pergolaData} />
}
