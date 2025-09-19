"use client"

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
            <section className={"relative overflow-hidden w-full py-20"}>
              <img
                src="/img/body-mask.png"
                className={"absolute top-0 left-0 z-0 w-full"}
              />
              <div
                className={
                  "max-w-7xl m-auto text-black flex flex-col items-center"
                }
              >
                <h1 className={"mb-5 font-semibold text-[56px] text-center"}>
                  {policy.title}
                </h1>
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
              </div>
            </section>
            <section
              className={"max-w-7xl mb-32 whitespace-break-spaces prose"}
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
