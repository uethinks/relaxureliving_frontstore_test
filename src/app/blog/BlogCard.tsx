"use client"

import { getStrapiUrl } from "@lib/utils"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { IconCalendar } from "./svg"

interface IProps {
  blog: any
  showLink?: boolean
}

export default function BlogCard({ blog, showLink = true }: IProps) {
  const router = useRouter()

  return (
    <div className={"w-full lg:w-[342px]"} key={blog.documentId}>
      <div
        className={
          "w-full h-[62vw] lg:h-[244px] flex items-center mb-5 cursor-pointer"
        }
        onClick={() => {
          router.push(`/blog/${blog.slug}?id=${blog.documentId}`)
        }}
      >
        <img
          src={blog.cover ? getStrapiUrl(blog.cover.url) : ""}
          className="object-contain w-full h-full"
        />
      </div>
      <div className={"flex flex-wrap gap-4 mb-[10px]"}>
        {blog.tags &&
          blog.tags.map((tag: any) => (
            <div
              key={tag.id}
              className={
                "py-[3px] px-[5px] bg-[#2F2A1E] text-[#fff] font-semibold text-xs"
              }
            >
              {tag.title}
            </div>
          ))}
      </div>
      <div
        className={
          "line-clamp-2 text-[#140E02] text-2xl font-bold mb-[10px] cursor-pointer"
        }
        onClick={() => {
          router.push(`/blog/${blog.slug}?id=${blog.documentId}`)
        }}
      >
        {blog.title}
      </div>
      {blog.createdAt && (
        <div className={"flex items-center text-base text-[#2F2A1E] mb-5"}>
          <IconCalendar />
          {dayjs(blog.createdAt).format("MMM DD, YYYY")}
        </div>
      )}
      <div className="text-sm lg:text-base text-[#8C877C] line-clamp-3 mb-5 lg:mb-10 whitespace-break-spaces prose">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          remarkRehypeOptions={{ passThrough: ["link"] }}
        >
          {blog.content}
        </Markdown>
      </div>
      {showLink && (
        <a
          className={
            "block w-[144px] h-8 leading-8 text-[#140E02] text-sm text-center font-semibold border border-[#FFBF3C]"
          }
          href={`blog/${blog.slug}?id=${blog.documentId}`}
        >
          Read more
        </a>
      )}
    </div>
  )
}
