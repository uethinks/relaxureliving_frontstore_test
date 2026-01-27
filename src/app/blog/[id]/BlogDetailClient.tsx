"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2Headline from "@/components/V2Headline"
import { getBlog, getBlogs, getTags } from "@lib/cms/strapiCmsApi"
import { getStrapiUrl } from "@lib/utils"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import BlogCard from "../BlogCard"
import { IconNext, IconPrev } from "../svg"
import V2MediaRenderer from "@/components/V2MediaRenderer"

interface BlogDetailClientProps {
  initialBlog: any
  initialRecentBlogs: any[]
  initialTags: any[]
  initialPrevId?: any
  initialNextId?: any
}

export default function BlogDetailClient({
  initialBlog,
  initialRecentBlogs,
  initialTags,
  initialPrevId,
  initialNextId,
}: BlogDetailClientProps) {
  const [blog, setBlog] = useState<any>(initialBlog)
  const [recentBlogs, setRecentBlogs] = useState<any>(initialRecentBlogs)
  const [tags, setTags] = useState(initialTags)
  const [prevId, setPrevId] = useState<any>(initialPrevId)
  const [nextId, setNextId] = useState<any>(initialNextId)
  const searchParams = useSearchParams()
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
        <section
          className={
            "relative mt-8 mb-12 lg:my-20 w-full lg:w-[1074px] flex lg:flex-row flex-col gap-y-8 gap-6"
          }
        >
          <div className={"w-full"}>
            <div
              className={
                "h-[18px] mb-5 ml-6 lg:ml-0 lg:mb-7 flex gap-1 items-center text-[#8C877C] text-xs font-semibold underline cursor-pointer"
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
                  <div className={"w-full mb-5 lg:w-[708px] lg:mb-10"}>
                    <V2MediaRenderer
                      media={blog.cover}
                      options={{
                        objectFit: "contain",
                        className: "object-contain w-full",
                      }}
                    />
                  </div>
                )}
                <div className={"px-6 lg:px-0"}>
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
                  <div className="mb-5 lg:mb-10">
                    <V2Headline title={blog.title} as="h1" />
                  </div>

                  <div className="text-[#000] prose max-lg:text-sm text-xl whitespace-normal">
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
                </div>
              </>
            )}
          </div>
          <div
            className={
              "w-full lg:w-[342px] max-lg:p-6 flex-grow-0 flex-shrink-0 basis-auto"
            }
          >
            <div
              className={"h-[35px] font-semibold text-[#140E02] text-2xl mb-3"}
            >
              Recent Posts
            </div>
            <div
              className={
                "w-full flex flex-wrap lg:gap-x-6 gap-y-10 max-lg:mb-10"
              }
            >
              {recentBlogs.map((recentBlog: any) => (
                <BlogCard
                  blog={recentBlog}
                  showLink={false}
                  key={recentBlog.documentId}
                />
              ))}
            </div>

            <div className={"w-full lg:w-[342px]"}>
              <div className={"mb-5 text-[#140E02] font-semibold text-2xl"}>
                Popular Tags
              </div>
              <div className={"flex flex-wrap gap-4"}>
                {tags &&
                  tags?.map((tag: any) => (
                    <div
                      key={tag.id}
                      className={`py-[3px] px-[5px] font-semibold text-xs cursor-pointer bg-[#2F2A1E] text-[#fff]`}
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
        </section>

        <section className={"w-full bg-[#EFEEEB80]"}>
          <V2ContactUsSection />
        </section>
      </div>
      <FooterDark />
    </>
  )
} 