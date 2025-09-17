"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { getBlogs, getTags } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import dayjs from "dayjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { IconCalendar, IconNext, IconPrev } from "./svg"

function buildBlogUrl(page?: number, tags?: string[]) {
  const query = new URLSearchParams()
  query.set("page", page ? `${page}` : "1")
  if (tags && tags.length > 0) {
    tags.forEach((tag) => query.append("tag", tag))
  }
  const queryString = query.toString()
  return queryString ? `/blog/?${queryString}` : `/blog/`
}

export default function PageBlog() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  )
}

function BlogContent() { 
  const [tags, setTags] = useState([])
  const [currentTags, setCurrentTags] = useState<string[] | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [blogs, setBlogs] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  async function fetchBlogs() {
    const blogRes = await getBlogs({
      current: currentPage,
      tagIds: currentTags,
    })
    setBlogs(blogRes.data || [])
    setTotal(blogRes.meta.pagination.pageCount)
  }

  useEffect(() => {
    const page = searchParams.get("page")
    const tag = searchParams.getAll("tag")

    setCurrentPage(page ? Number(page) : 1)
    setCurrentTags(tag && tag.length > 0 ? tag : undefined)

    getTags().then((tagRes) => {
      setTags(tagRes.data)
    })
  }, [])

  useEffect(() => {
    router.push(buildBlogUrl(currentPage, currentTags))
    fetchBlogs()
  }, [currentPage, currentTags])

  return (
    <>
      <main className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className={"max-w-7xl py-20"}>
          <div className={"mb-10 text-black text-center"}>
            <h1 className={"font-semibold text-[56px]"}>Blog</h1>
          </div>
        </section>
        <section className={"relative w-[1074px] flex justify-between gap-6"}>
          <div className={"w-full flex flex-col items-center"}>
            <div className={"w-full flex flex-wrap gap-6"}>
              {blogs.map((blog: any) => (
                <div className={"w-[342px]"} key={blog.documentId}>
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
                  <div className="text-[#8C877C] line-clamp-3 mb-10 whitespace-break-spaces prose">
                    <Markdown
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                      remarkRehypeOptions={{ passThrough: ["link"] }}
                    >
                      {blog.content}
                    </Markdown>
                  </div>
                  <a
                    className={
                      "block w-[144px] h-8 leading-8 text-[#140E02] text-sm text-center font-semibold border border-[#FFBF3C]"
                    }
                    href={`blog/${blog.documentId}`}
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
            <div className={"mt-10 mb-20"}>
              {total > 1 && (
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <div
                          className={"cursor-pointer"}
                          onClick={() => {
                            setCurrentPage(currentPage - 1)
                          }}
                        >
                          <IconPrev />
                        </div>
                      </PaginationItem>
                    )}
                    {Array(total)
                      .fill(0)
                      .map((output, index) => {
                        return (
                          <PaginationItem key={index}>
                            <PaginationLink
                              href="#"
                              onClick={() => {
                                setCurrentPage(index + 1)
                              }}
                              isActive={index + 1 === currentPage}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                    {currentPage < total && (
                      <PaginationItem>
                        <div
                          className={"cursor-pointer"}
                          onClick={() => {
                            setCurrentPage(currentPage + 1)
                          }}
                        >
                          <IconNext />
                        </div>
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
          <div>
            <div className={"w-[342px] sticky top-[120px] z-10"}>
              <div className={"mb-5 text-[#140E02] font-semibold text-2xl"}>
                Popular Tags
              </div>
              <div className={"flex flex-wrap gap-4 "}>
                {tags &&
                  tags?.map((tag: any) => (
                    <div
                      key={tag.id}
                      className={`py-[3px] px-[5px]  font-semibold text-xs cursor-pointer ${
                        currentTags && currentTags.includes(`${tag.id}`)
                          ? "bg-[#ffb521] text-[#181a1b]"
                          : "bg-[#2F2A1E] text-[#fff]"
                      }`}
                      onClick={() => {
                        setCurrentTags((prev) =>
                          prev
                            ? prev.includes(`${tag.id}`)
                              ? prev.filter((x) => x !== `${tag.id}`)
                              : [...prev, `${tag.id}`]
                            : [`${tag.id}`]
                        )
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
      </main>
      <FooterDark />
    </>
  )
}
