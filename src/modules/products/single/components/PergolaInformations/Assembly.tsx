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
  videoUrl = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // 替换为你的默认视频
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
      description: "Our flagship pergola with motorized louvers",
      timeStamp: 0,
    },
    {
      id: 2,
      title: "Installation",
      description: "Our flagship pergola with motorized louvers",
      timeStamp: 25,
    },
    {
      id: 3,
      title: "Installation",
      description: "Our flagship pergola with motorized louvers",
      timeStamp: 50,
    },
    {
      id: 4,
      title: "Installation",
      description: "Our flagship pergola with motorized louvers",
      timeStamp: 75,
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
    <div className="flex w-full flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between w-full gap-6">
        {/* Navigation Buttons - Left on desktop, bottom on mobile */}
        <div className="w-full md:w-[48%] grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 order-2 md:order-1">
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
                <span className="text-lg md:text-xl font-medium">
                  {String(section.id).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                {section.title}
              </h3>
              <p className="text-center text-xs md:text-sm opacity-90 line-clamp-2">
                {section.description}
              </p>
            </button>
          ))}
        </div>

        {/* Video Section - Right on desktop, top on mobile */}
        <div className="w-full md:w-[48%] rounded-2xl overflow-hidden order-1 md:order-2">
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
                  rel: 0, // 不显示相关视频
                  showinfo: 0, // 不显示视频信息
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
      videoUrl="https://www.youtube.com/watch?v=GKOFllBvqws"
    />
  )
}
