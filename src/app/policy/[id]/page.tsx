"use client"

import { getPolicy } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

export default function PagePolicy() {
  const params = useParams<{ id: string }>()
  const [policy, setPolicy] = useState<any>()

  useEffect(() => {
    if (!params || !params.id) {
      return
    }
    getPolicy(params.id).then((res) => {
      if (!res) {
        return
      }

      setPolicy(res.data)
    })
  }, [params.id])
  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        {policy && (
          <>
            <section className={"max-w-7xl my-20"}>
              <div className={"text-black text-center"}>
                <h1 className={"mb-5 font-semibold text-[56px]"}>
                  {policy.title}
                </h1>
                <p className={"text-xl whitespace-break-spaces prose"}>
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
            <section className={"max-w-7xl mb-32"}>
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
