"use client"
import React, { useEffect } from "react"

export const TabButtons = () => {
  useEffect(() => {
    const assemblyContent = document.getElementById("assembly-content")
    const descriptionContent = document.getElementById("description-content")
    const assemblyTab = document.getElementById("assembly-tab")
    const descriptionTab = document.getElementById("description-tab")

    // 检查当前URL
    const isPergolaKitPage = window.location.href.includes(
      "aluminum-pergola-kit"
    )

    if (isPergolaKitPage) {
      // 显示assembly内容
      if (assemblyContent) {
        assemblyContent.style.display = "block"
        assemblyContent.style.opacity = "1"
        assemblyContent.style.transition = "opacity 0.3s ease-in-out"
      }
      if (descriptionContent) {
        descriptionContent.style.display = "none"
        descriptionContent.style.opacity = "0"
        descriptionContent.style.transition = "opacity 0.3s ease-in-out"
      }
      if (assemblyTab) {
        assemblyTab.classList.add(
          "text-[#072F6C]",
          "border-b-2",
          "border-[#072F6C]",
          "bg-[#dce7f8]"
        )
        assemblyTab.classList.remove("bg-[#f3f3f3]")
      }
      if (descriptionTab) {
        descriptionTab.classList.remove(
          "text-[#072F6C]",
          "border-b-2",
          "border-[#072F6C]",
          "bg-[#dce7f8]"
        )
        descriptionTab.classList.add("bg-[#f3f3f3]")
      }
    } else {
      // 默认显示description内容
      if (assemblyContent) {
        assemblyContent.style.display = "none"
        assemblyContent.style.opacity = "0"
        assemblyContent.style.transition = "opacity 0.3s ease-in-out"
      }
      if (descriptionContent) {
        descriptionContent.style.display = "block"
        descriptionContent.style.opacity = "1"
        descriptionContent.style.transition = "opacity 0.3s ease-in-out"
      }
    }
  }, [])

  const handleTabClick = (tabName: "description" | "assembly") => {
    const assemblyContent = document.getElementById("assembly-content")
    const descriptionContent = document.getElementById("description-content")
    const assemblyTab = document.getElementById("assembly-tab")
    const descriptionTab = document.getElementById("description-tab")

    if (tabName === "description") {
      if (descriptionContent) {
        descriptionContent.style.display = "block"
        setTimeout(() => {
          if (descriptionContent) descriptionContent.style.opacity = "1"
        }, 50)
      }
      if (assemblyContent) {
        assemblyContent.style.opacity = "0"
        setTimeout(() => {
          if (assemblyContent) assemblyContent.style.display = "none"
        }, 300)
      }
      if (descriptionTab) {
        descriptionTab.classList.add(
          "text-[#072F6C]",
          "border-b-2",
          "border-[#072F6C]",
          "bg-[#dce7f8]"
        )
        descriptionTab.classList.remove("bg-[#f3f3f3]")
      }
      if (assemblyTab) {
        assemblyTab.classList.remove(
          "text-[#072F6C]",
          "border-b-2",
          "border-[#072F6C]",
          "bg-[#dce7f8]"
        )
        assemblyTab.classList.add("bg-[#f3f3f3]")
      }
    } else {
      if (descriptionContent) {
        descriptionContent.style.opacity = "0"
        setTimeout(() => {
          if (descriptionContent) descriptionContent.style.display = "none"
        }, 300)
      }
      if (assemblyContent) {
        assemblyContent.style.display = "block"
        setTimeout(() => {
          if (assemblyContent) assemblyContent.style.opacity = "1"
        }, 50)
      }
      if (assemblyTab) {
        assemblyTab.classList.add(
          "text-[#072F6C]",
          "border-b-2",
          "border-[#072F6C]",
          "bg-[#dce7f8]"
        )
        assemblyTab.classList.remove("bg-[#f3f3f3]")
      }
      if (descriptionTab) {
        descriptionTab.classList.remove(
          "text-[#072F6C]",
          "border-b-2",
          "border-[#072F6C]",
          "bg-[#dce7f8]"
        )
        descriptionTab.classList.add("bg-[#f3f3f3]")
      }
    }
  }

  return (
    <div className="inline-flex items-start gap-10">
      <button
        id="description-tab"
        className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] cursor-pointer bg-[#dce7f8] transition-all duration-300 ease-in-out"
        onClick={() => handleTabClick("description")}
      >
        <div className="w-fit mt-[-4.00px] mb-[-2.00px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px] text-[#072f6c] transition-colors duration-300 ease-in-out">
          Description
        </div>
      </button>
      <button
        id="assembly-tab"
        className="inline-flex h-[41px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] rounded-[30px] border border-solid border-[#ffffffad] shadow-[0px_0px_8.91px_#ffffff73,0px_0px_17.82px_#ffffff73,0px_0px_62.37px_#ffffff73,0px_0px_124.74px_#ffffff73,0px_0px_213.84px_#ffffff73,0px_0px_250px_#ffffff73] cursor-pointer bg-[#f3f3f3] transition-all duration-300 ease-in-out"
        onClick={() => handleTabClick("assembly")}
      >
        <div className="w-fit mt-[-4.00px] mb-[-2.00px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium text-lg tracking-[0] leading-[27px] text-[#343a40] transition-colors duration-300 ease-in-out">
          Put it together
        </div>
      </button>
    </div>
  )
}
