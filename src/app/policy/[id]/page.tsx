"use client"

import V2MaskHeader from "@/components/V2MaskHeader"
import { getPolicy } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

export default function PagePolicy() {
  const [policy, setPolicy] = useState<any>()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams && searchParams.get("id")) {
      getPolicy(searchParams.get("id") || "").then((res) => {
        if (!res) {
          return
        }

        setPolicy(res.data)
      })
    }
  }, [searchParams])
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        {policy && (
          <>
            <V2MaskHeader title={policy.title}>
              <p
                className={
                  "text-xl whitespace-break-spaces prose all:unset text-center"
                }
              >
                <Markdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  remarkRehypeOptions={{ passThrough: ["link"] }}
                >
                  {policy.description}
                </Markdown>
              </p>
            </V2MaskHeader>
            <section
              className={
                "w-full lg:w-[1074px] max-w-none max-lg:px-6 mb-12 lg:mb-32 whitespace-break-spaces prose text-left"
              }
            >
              <Markdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                remarkRehypeOptions={{ passThrough: ["link"] }}
              >
                {policy.content}
              </Markdown>
            </section>
          </>
        )}
      </div>
      <FooterDark />
    </>
  )
}
