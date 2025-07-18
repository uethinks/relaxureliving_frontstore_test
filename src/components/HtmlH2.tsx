"use client"

import { useState, useEffect } from "react"

interface HtmlH2Props {
  html: string
  className?: string
}

export const HtmlH2 = ({ html, className }: HtmlH2Props) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 在客户端渲染之前，显示纯文本内容
  if (!isClient) {
    return <h2 className={className}>{html.replace(/<[^>]*>/g, "")}</h2>
  }

  // 客户端渲染时使用dangerouslySetInnerHTML
  return <h2 className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
