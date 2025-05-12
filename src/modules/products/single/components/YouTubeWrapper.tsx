"use client"
import React from "react"
import YouTube from "react-youtube"

interface YouTubeWrapperProps {
  videoId: string
  onReady?: (event: any) => void
  className?: string
}

const YouTubeWrapper: React.FC<YouTubeWrapperProps> = ({
  videoId,
  onReady,
  className = "w-full aspect-video",
}) => {
  return (
    <div className={className}>
      <YouTube
        videoId={videoId}
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
    </div>
  )
}

export default YouTubeWrapper
