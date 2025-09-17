"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2Headline from "@/components/V2Headline"
import { getBlog, getBlogs, getTags } from "@lib/cms/strapiCmsApi"
import { getStrapiUrl } from "@lib/utils"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import dayjs from "dayjs"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { IconCalendar, IconPrev } from "../svg"

export default function BlogDetail() {
  const params = useParams<{ id: string }>()
  const [blog, setBlog] = useState<any>()
  const [recentBlogs, setRecentBlogs] = useState<any>([])
  const [tags, setTags] = useState([])
  // const [currentTags, setCurrentTags] = useState<string[] | undefined>()

  const router = useRouter()

  useEffect(() => {
    if (!params || !params.id) {
      return
    }
    getBlog(params.id).then((blogRes) => {
      if (!blogRes) {
        return
      }

      setBlog(blogRes.data)
    })

    getBlogs({
      pageSize: 3,
      sort: "createdAt:desc",
      filters: {
        documentId: {
          $ne: params.id,
        },
      },
    }).then((blogRes) => {
      if (!blogRes) {
        return
      }

      setRecentBlogs(blogRes.data)
    })

    getTags().then((tagRes) => {
      setTags(tagRes.data)
    })
  }, [params.id])

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className={"relative m-20 w-[1074px] flex gap-6"}>
          <div className={"w-full"}>
            <div
              className={
                "h-[18px] mb-7 flex gap-1 items-center text-[#8C877C] text-xs font-semibold underline"
              }
            >
              <IconPrev />
              Back to list
            </div>
            {blog && (
              <>
                {blog?.cover && (
                  <div className={"w-[708px] mb-10"}>
                    <img
                      src={getStrapiUrl(blog?.cover?.url)}
                      alt="blog?.title"
                      className="object-contain w-full"
                    />
                  </div>
                )}
                {blog?.tags && (
                  <div className={"flex flex-wrap gap-4 mb-5"}>
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
                )}
                <div className="mb-10">
                  <V2Headline title={blog.title} />
                </div>

                <div className="text-[#000] prose text-xl whitespace-break-spaces">
                  <Markdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    remarkRehypeOptions={{ passThrough: ["link"] }}
                  >
                    {blog.content}
                  </Markdown>
                </div>
              </>
            )}
          </div>
          <div className={"w-[342px] flex-grow-0 flex-shrink-0 basis-auto"}>
            <div className={"w-full"}>
              <div
                className={
                  "h-[35px] font-semibold text-[#140E02] text-2xl mb-3"
                }
              >
                Recent Posts
              </div>
              {recentBlogs.map((recentBlog: any) => (
                <div
                  className={"w-[342px]"}
                  key={recentBlog.documentId}
                  onClick={() => {
                    router.push(`/blog/${recentBlog.documentId}`)
                  }}
                >
                  <div className={"w-full h-[244x] flex items-center mb-5"}>
                    <img
                      src="/img/about-us-banner.png"
                      className="object-contain w-full"
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
                      "line-clamp-2 text-[#140E02] text-2xl font-bold mb-[10px]"
                    }
                  >
                    {blog.title}
                  </div>
                  {blog.createdAt && (
                    <div
                      className={
                        "flex items-center text-base text-[#2F2A1E] mb-5"
                      }
                    >
                      <IconCalendar />
                      {dayjs(blog.createdAt).format("MMM DD, YYYY")}
                    </div>
                  )}
                </div>
              ))}

              <div className={"w-[342px] sticky top-[120px] z-10"}>
                <div
                  className={"mt-10 mb-5 text-[#140E02] font-semibold text-2xl"}
                >
                  Popular Tags
                </div>
                <div className={"flex flex-wrap gap-4"}>
                  {tags &&
                    tags?.map((tag: any) => (
                      <div
                        key={tag.id}
                        className={`py-[3px] px-[5px]  font-semibold text-xs cursor-pointer bg-[#2F2A1E] text-[#fff]`}
                        onClick={() => {
                          router.push(`/blog/?page=1&tag=${tag.id}`)
                        }}
                      >
                        {tag.title}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <V2ContactUsSection />
      </div>
      <FooterDark />
    </>
  )
}
