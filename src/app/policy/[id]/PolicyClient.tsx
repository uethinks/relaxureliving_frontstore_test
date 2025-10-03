"use client"

import V2MaskHeader from "@/components/V2MaskHeader"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface PolicyClientProps {
  initialPolicy?: any
}

export default function PolicyClient({ initialPolicy }: PolicyClientProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        {initialPolicy && (
          <>
            <V2MaskHeader title={initialPolicy.title}>
              <div
                className={
                  "text-xl whitespace-normal prose all:unset text-center mx-auto"
                }
              >
                <Markdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  remarkRehypeOptions={{ passThrough: ["link"] }}
                >
                  {initialPolicy.description}
                </Markdown>
              </div>
            </V2MaskHeader>
            <section
              className={
                "w-full lg:w-[1074px] max-w-none max-lg:px-6 mb-12 lg:mb-32 whitespace-normal prose text-left"
              }
            >
              <Markdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                remarkRehypeOptions={{ passThrough: ["link"] }}
              >
                {initialPolicy.content}
              </Markdown>
            </section>
          </>
        )}
      </div>
      <FooterDark />
    </>
  )
}
