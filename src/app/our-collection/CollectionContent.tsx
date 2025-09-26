"use client"
import V2Headline from "@/components/V2Headline"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

export function CollectionContent({ data }: { data: any }) {
  return (
    <section
      className={"w-full pt-[18px] pb-12 px-6 lg:max-w-7xl lg:py-28 lg:px-0"}
    >
      <V2Headline title={data.title} />
      <div className="mt-10 whitespace-break-spaces">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          remarkRehypeOptions={{ passThrough: ["link"] }}
        >
          {data.content}
        </Markdown>
      </div>
    </section>
  )
}
