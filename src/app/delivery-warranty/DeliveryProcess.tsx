"use client"

import { CustomCarousel } from "@/components/CustomCarousel"
import { useIsMobile } from "@lib/hooks/useScreenSize"
import Image from "next/image"
import { useEffect, useState } from "react"

const processList = [
  {
    title: "Instant Quote",
    description:
      "No waiting, no guessing. Get a clear and accurate price within seconds, so you know exactly what to expect.",
    icon: "quote",
  },
  {
    title: "Personalized CAD Design",
    description:
      "Our designers craft a custom drawing just for you, turning your vision into a detailed plan that fits your space perfectly.",
    icon: "personalized",
  },
  {
    title: "Approve with Confidence",
    description:
      "Take your time to review every detail. Once you’re happy, secure your order with ease—your peace of mind matters most to us.",
    icon: "approve",
  },
  {
    title: "Built with Care (3–5 Weeks)",
    description:
      "Your pergola is crafted in our factory with rigorous quality checks, ensuring every piece meets the highest standards before it leaves.",
    icon: "build",
  },
  {
    title: "Free & Insured Shipping (1–2 Weeks)",
    description:
      "Relax while we take care of the rest. We provide free, door-to-door delivery with full insurance, so your pergola arrives safe, sound, and ready to enjoy.",
    icon: "shipping",
  },
]

function groupedList(arr: any) {
  const size = Math.ceil(arr.length / 3)
  const result = []

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }

  return result
}

export default function DeliveryProcess() {
  const isMobile = useIsMobile(1024)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 在组件挂载前，始终渲染桌面版以避免水合不匹配
  if (!mounted) {
    return (
      <>
        <div className="mb-[126px]"></div>
        <div className={"w-full h-[1px] mb-5 bg-[#EFEEEB]"}></div>
        <div className={"grid grid-cols-5 gap-x-6 w-full"}>
          {processList.map((item, itemKey) => (
            <div
              className="relative flex flex-col items-center gap-y-[10px] p-6 border-b border-[#FFBF3C] text-center"
              style={{
                background:
                  "linear-gradient(360deg, rgba(239, 238, 235, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)",
              }}
              key={item.title}
            >
              <div className={"flex flex-col items-center absolute -top-[88px]"}>
                <div
                  className={
                    "mb-7 text-[#706C63] text-2xl leading-9 font-semibold"
                  }
                >
                  0{itemKey + 1}
                </div>
                <span
                  className={
                    "w-2 h-2 border border-[#706C63] rounded bg-[#FFBF3C]"
                  }
                ></span>
              </div>

              <Image
                
                src={`/img/icon-${item.icon}.svg`}
                alt={item.title}
                width={56}
                height={56}
              />
              <div className={"text-[#2F2A1E] font-semibold text-base"}>
                {item.title}
              </div>
              <div className={"text-[#8C877C] text-sm"}>{item.description}</div>
            </div>
          ))}
        </div>
      </>
    )
  }

  return isMobile ? (
    <div className={"w-full"}>
      <CustomCarousel
        showNav={false}
        autoPlay={false}
        data={groupedList(processList).map((arr, arrKey) => (
          <div className={"grid grid-cols-2 gap-[10px] relative"} key={arrKey}>
            <div
              className={`${
                arr.length == 2 ? "w-screen" : "w-[50vw]"
              } h-[1px] px-6 absolute top-[60px] left-0 z-1`}
            >
              <p className={"w-full h-full bg-[#EFEEEB]"}></p>
            </div>

            {arr.map((item: any, itemKey: number) =>
              item ? (
                <div
                  className="relative flex flex-col items-center gap-y-[10px] pt-24 p-6 border-b border-[#FFBF3C] text-center"
                  style={{
                    background:
                      "linear-gradient(360deg, rgba(239, 238, 235, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)",
                  }}
                  key={item?.title}
                >
                  <div className={"flex flex-col items-center absolute top-0"}>
                    <div
                      className={
                        "mb-5 text-[#706C63] text-base leading-9 font-semibold"
                      }
                    >
                      0{arrKey * 2 + itemKey + 1}
                    </div>
                    <span
                      className={
                        "w-2 h-2 border border-[#706C63] rounded bg-[#FFBF3C]"
                      }
                    ></span>
                  </div>

                  <Image
                    
                    src={`/img/icon-${item?.icon}.svg`}
                    alt={item?.title}
                    width={56}
                    height={56}
                  />
                  <div className={"text-[#2F2A1E] font-semibold text-base"}>
                    {item?.title}
                  </div>
                  <div className={"text-[#8C877C] text-sm"}>
                    {item?.description}
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        ))}
      />
    </div>
  ) : (
    <>
      <div className="mb-[126px]"></div>
      <div className={"w-full h-[1px] mb-5 bg-[#EFEEEB]"}></div>
      <div className={"grid grid-cols-5 gap-x-6 w-full"}>
        {processList.map((item, itemKey) => (
          <div
            className="relative flex flex-col items-center gap-y-[10px] p-6 border-b border-[#FFBF3C] text-center"
            style={{
              background:
                "linear-gradient(360deg, rgba(239, 238, 235, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)",
            }}
            key={item.title}
          >
            <div className={"flex flex-col items-center absolute -top-[88px]"}>
              <div
                className={
                  "mb-7 text-[#706C63] text-2xl leading-9 font-semibold"
                }
              >
                0{itemKey + 1}
              </div>
              <span
                className={
                  "w-2 h-2 border border-[#706C63] rounded bg-[#FFBF3C]"
                }
              ></span>
            </div>

            <Image
              
              src={`/img/icon-${item.icon}.svg`}
              alt={item.title}
              width={56}
              height={56}
            />
            <div className={"text-[#2F2A1E] font-semibold text-base"}>
              {item.title}
            </div>
            <div className={"text-[#8C877C] text-sm"}>{item.description}</div>
          </div>
        ))}
      </div>
    </>
  )
}
