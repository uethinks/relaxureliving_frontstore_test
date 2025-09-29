"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2MaskHeader from "@/components/V2MaskHeader"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { getBlogs, getTags } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import BlogCard from "./BlogCard"
import { IconNext, IconPrev } from "./svg"

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
        <V2MaskHeader title="Blog" sectionClassName={"pt-8 pb-5 lg:py-20"} />
        <section
          className={
            "relative w-full px-6 pb-12 lg:pb-0 lg:px-0 lg:w-[1074px] flex flex-col lg:flex-row justify-between gap-10 lg:gap-6 lg:mb-20"
          }
        >
          <div className={"w-full flex flex-col items-center"}>
            <div className={"w-full flex flex-wrap lg:gap-x-6 gap-y-10"}>
              {blogs.map((blog: any) => (
                <BlogCard blog={blog} key={blog.documentId} />
              ))}
            </div>
            {total > 1 && (
              <div className={"mt-5 mb-10 lg:mt-10 lg:mb-20"}>
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
              </div>
            )}
          </div>
          <div
            className={"w-full lg:w-[342px] lg:sticky lg:top-[120px] lg:z-10"}
          >
            <div className={"mb-5 text-[#140E02] font-semibold text-2xl"}>
              Popular Tags
            </div>
            <div className={"flex flex-wrap gap-4"}>
              {tags &&
                tags?.map((tag: any) => (
                  <div
                    key={tag.id}
                    className={`py-[3px] px-[5px] font-semibold text-xs cursor-pointer ${
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
        </section>

        <section className={"w-full bg-[#EFEEEB80]"}>
          <V2ContactUsSection />
        </section>
      </main>
      <FooterDark />
    </>
  )
}
