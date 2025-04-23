import React, { useState } from "react"
import YouTube from "react-youtube"

interface Props {
  videoId?: string
  videoUrl?: string // 新增：支持直接传入 YouTube URL
}

// 从 YouTube URL 提取视频 ID 的工具函数
const extractYouTubeId = (url: string): string | null => {
  if (!url) return null

  // 处理不同格式的 YouTube URL
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /^[a-zA-Z0-9_-]{11}$/, // 直接输入 ID 的情况
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

export const AssemblyContainer = ({
  videoId,
  videoUrl = "https://youtu.be/ZwKTt2-D1mk", // 替换为你的默认视频
}: Props): JSX.Element => {
  const [currentTime, setCurrentTime] = useState(0)
  const [player, setPlayer] = useState<any>(null)
  const [activeSection, setActiveSection] = useState(1)

  // 获取实际使用的视频 ID
  const actualVideoId = videoId || extractYouTubeId(videoUrl)

  if (!actualVideoId) {
    console.warn("No valid YouTube video ID provided")
  }

  const videoSections = [
    {
      id: 1,
      title: "Installation",
      description: "Install posts & beams ",
      timeStamp: 0,
    },
    {
      id: 2,
      title: "Installation",
      description: "Mount the louvers ",
      timeStamp: 29,
    },
    {
      id: 3,
      title: "Installation",
      description: "Install the transmission rod ",
      timeStamp: 68,
    },
    {
      id: 4,
      title: "Installation",
      description: "Attach the cover caps ",
      timeStamp: 85,
    },
  ]

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
        <div className="relative flex-1 mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[36px] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
          Easy assembly in 1-4 steps:
        </div>
        <div className="flex flex-col items-start justify-center gap-2.5 px-0 relative self-stretch w-full flex-[0_0_auto] lg:mt-[30px]">
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            In just 2-3 Hours, gather your friends, transform your Saturday
            project into Saturday evening entertainment.
          </p>
          <p className="text-[#69727a] text-[14px] lg:text-[18px] font-relaxure-sub-heading-18 font-[500]">
            Simple, smart, and stress-free! Our pre-assembled modular sections
            connect like building blocks. No extra trips, no missing parts.
            Everything's included. And for reinstallation, your Corsica pergola
            is strong and solid enough to ensure it is just as easy.
          </p>
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
                  {String(section.id).padStart(2, "0")}
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
            <YouTube
              videoId={actualVideoId}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              }}
              onReady={onReady}
              className="w-full aspect-video"
            />
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

export const Assembly = (): JSX.Element => {
  return (
    <AssemblyContainer
      // 两种方式都可以：
      // 方式1：直接传入视频 ID
      // videoId="ABC12345678"
      // 方式2：传入视频 URL
      videoUrl="https://youtu.be/ZwKTt2-D1mk"
    />
  )
}
