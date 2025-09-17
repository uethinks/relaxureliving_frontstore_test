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
import remarkGfm from "remark-gfm"

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
                <div className={"w-[342px]"} key={blog.id}>
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
                  <div className="text-[#8C877C] line-clamp-3 mb-10 whitespace-break-spaces">
                    <Markdown
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
                    href={`blog/${blog.id}`}
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
              <div className={"mb-5 text-[#140E02] font-semibold"}>
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

const IconPrev = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
)

const IconNext = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
)

const IconCalendar = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.6352 3.95192H15.9814V2.625H14.6544V3.95192H9.34676V2.625H8.01983V3.95192H5.36599C4.63618 3.95192 4.03906 4.54904 4.03906 5.27885V18.5481C4.03906 19.2779 4.63618 19.875 5.36599 19.875H18.6352C19.365 19.875 19.9621 19.2779 19.9621 18.5481V5.27885C19.9621 4.54904 19.365 3.95192 18.6352 3.95192ZM18.6352 18.5481H5.36599V9.25962H18.6352V18.5481ZM18.6352 7.93269H5.36599V5.27885H8.01983V6.60577H9.34676V5.27885H14.6544V6.60577H15.9814V5.27885H18.6352V7.93269Z"
      fill="#2F2A1E"
    />
  </svg>
)
