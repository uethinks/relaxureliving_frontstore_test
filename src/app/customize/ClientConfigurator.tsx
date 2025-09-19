"use client"
import { useEffect } from "react"

export default function ClientConfigurator() {
  const SALESQUEZE_IFRAME_SRC =
    "https://relaxureliving.salesqueze.com/en/embed?nfid=xfkh45x8krecm0ktix8m5"

  useEffect(() => {
    // Hide Tidio chat on this page
    const style = document.createElement("style")
    style.setAttribute("data-hide-tidio", "1")
    style.textContent = `
      #tidio-chat-iframe,
      #tidio-chat,
      [id*="tidio"] {
        display: none !important;
        visibility: hidden !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup: remove the style when component unmounts
      const existing = document.head.querySelector('style[data-hide-tidio]')
      if (existing) existing.remove()
    }
  }, [])

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/90">
      <iframe
        src={SALESQUEZE_IFRAME_SRC}
        id="sq_nfid_xfkh45x8krecm0ktix8m5"
        className="w-full h-full border-0"
        allow="fullscreen"
        allowFullScreen={false}
        title="Salesqueze Showroom"
      />
    </div>
  )
}
