"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2Headline from "@/components/V2Headline"
import { getBlog, getBlogs, getTags } from "@lib/cms/strapiCmsApi"
import { getStrapiUrl } from "@lib/utils"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import dayjs from "dayjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { IconCalendar, IconNext, IconPrev } from "../svg"

export default function BlogDetail() {
  const [blog, setBlog] = useState<any>()
  const [recentBlogs, setRecentBlogs] = useState<any>([])
  const [tags, setTags] = useState([])
  // const [currentTags, setCurrentTags] = useState<string[] | undefined>()
  const searchParams = useSearchParams()
  const [prevId, setPrevId] = useState<any>()
  const [nextId, setNextId] = useState<any>()

  const router = useRouter()

  useEffect(() => {
    if (searchParams && searchParams.get("id")) {
      const id = searchParams.get("id") || ""
      getBlog(id).then((blogRes) => {
        if (!blogRes) {
          return
        }

        setBlog(blogRes.data)

        getBlogs({
          pageSize: 1,
          filters: {
            createdAt: {
              $lt: blogRes.data.createdAt,
            },
          },
        }).then((res) => {
          if (!res) {
            return
          }
          console.log("==== res.data prev ====", res.data)
          if (res.data.length > 0) {
            setPrevId({
              slug: res.data[0].slug,
              id: res.data[0].documentId,
            })
          }
        })
        getBlogs({
          pageSize: 1,
          filters: {
            createdAt: {
              $gt: blogRes.data.createdAt,
            },
          },
        }).then((res) => {
          if (!res) {
            return
          }
          console.log("==== res.data next ====", res.data)
          if (res.data.length > 0) {
            setNextId({
              slug: res.data[0].slug,
              id: res.data[0].documentId,
            })
          }
        })
      })

      getBlogs({
        pageSize: 3,
        filters: {
          documentId: {
            $ne: id,
          },
        },
      }).then((recentBlogRes) => {
        if (!recentBlogRes) {
          return
        }

        setRecentBlogs(recentBlogRes.data)
      })

      getTags().then((tagRes) => {
        setTags(tagRes.data)
      })
    }
  }, [searchParams])

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className={"relative m-20 w-[1074px] flex gap-6"}>
          <div className={"w-full"}>
            <div
              className={
                "h-[18px] mb-7 flex gap-1 items-center text-[#8C877C] text-xs font-semibold underline cursor-pointer"
              }
              onClick={() => {
                router.push("/blog")
              }}
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
                <div
                  className={"w-full mt-3 flex items-center justify-between"}
                >
                  <div
                    className={`h-[18px] mb-7 flex gap-1 items-center text-[#8C877C] text-xs font-semibold underline ${
                      prevId ? "cursor-pointer" : "opacity-50"
                    }`}
                    onClick={() => {
                      if (prevId && prevId.id) {
                        router.push(`/blog/${prevId.slug}?id=${prevId.id}`)
                      }
                    }}
                  >
                    <IconPrev />
                    Previous
                  </div>
                  <div
                    className={`h-[18px] mb-7 flex gap-1 items-center text-[#8C877C] text-xs font-semibold underline ${
                      nextId ? "cursor-pointer" : "opacity-50"
                    }`}
                    onClick={() => {
                      if (nextId && nextId.id) {
                        router.push(`/blog/${nextId.slug}?id=${nextId.id}`)
                      }
                    }}
                  >
                    <IconNext />
                    Next
                  </div>
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
                <div className={"w-[342px]"} key={recentBlog.documentId}>
                  <div
                    className={
                      "w-full h-[244px] flex items-center mb-5 cursor-pointer"
                    }
                    onClick={() => {
                      router.push(
                        `/blog/${recentBlog.slug}?id=${recentBlog.documentId}`
                      )
                    }}
                  >
                    <img
                      src={
                        recentBlog.cover
                          ? getStrapiUrl(recentBlog.cover.url)
                          : ""
                      }
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className={"flex flex-wrap gap-4 mb-[10px]"}>
                    {recentBlog.tags &&
                      recentBlog.tags.map((tag: any) => (
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
                      router.push(
                        `/blog/${recentBlog.slug}?id=${recentBlog.documentId}`
                      )
                    }}
                  >
                    {recentBlog.title}
                  </div>
                  {recentBlog.createdAt && (
                    <div
                      className={
                        "flex items-center text-base text-[#2F2A1E] mb-5"
                      }
                    >
                      <IconCalendar />
                      {dayjs(recentBlog.createdAt).format("MMM DD, YYYY")}
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
