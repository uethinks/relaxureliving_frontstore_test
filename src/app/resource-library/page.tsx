"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { getResourceLibrary } from "@lib/cms/strapiCmsApi"
import { getStrapiUrl } from "@lib/utils"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInViewport } from "ahooks"
import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useRef, useState } from "react"

function buildUrl(category?: string) {
  const query = new URLSearchParams()
  query.set("category", category ? `${category}` : "all")

  const queryString = query.toString()
  return queryString
    ? `/resource-library/?${queryString}`
    : `/resource-library/`
}

export default function ResourceLibraryPage() {
  return (
    <>
      <Suspense>
        <ResourceLibraryComponent />
      </Suspense>
    </>
  )
}

function ResourceLibraryComponent() {
  const categories = [
    {
      key: "all",
      name: "All",
    },
    {
      key: "installation_guides",
      name: "Installation Guides",
    },
    {
      key: "specs_sheets",
      name: "Specs Sheets",
    },
    {
      key: "education",
      name: "Education",
    },
  ]

  const [categoryId, setCategoryId] = useState(-1)
  const scrollRef = useRef<HTMLInputElement | null>(null)
  const [inViewport] = useInViewport(scrollRef)
  const searchParams = useSearchParams()
  const router = useRouter()

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["fetchList", categoryId],
      queryFn: ({ pageParam = 1 }) =>
        getResourceLibrary({
          current: pageParam,
          ...(categoryId <= 0
            ? {}
            : { category: categories[categoryId]?.name }),
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1,
    })

  useEffect(() => {
    if (inViewport && hasNextPage) {
      fetchNextPage()
    }
  }, [inViewport])

  useEffect(() => {
    if (searchParams.get("category")) {
      const index = categories.findIndex(
        (x: any) => x.key === searchParams.get("category")
      )
      setCategoryId(index)
    } else {
      setCategoryId(0)
    }
  }, [])

  useEffect(() => {
    router.push(buildUrl(categories[categoryId]?.key))
  }, [categoryId])

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#fff]">
        <NavBarWrapper />

        <section className={"relative overflow-hidden w-full py-20"}>
          <img
            src="/img/body-mask.png"
            className={"absolute top-0 left-0 z-0 w-full"}
          />
          <div className={"max-w-7xl m-auto text-black text-center"}>
            <h1 className={"font-semibold text-[56px]"}>Resource Library</h1>
            <p className={"text-xl"}>
              We are dedicated to sharing{" "}
              <span className={"font-semibold"}>
                useful insights and practical tips
              </span>{" "}
              — from pergola installation and maintenance to outdoor living
              inspiration. Our Relaxure team is continuously creating content to
              make your pergola experience safer, easier, and more enjoyable all
              year round
            </p>
          </div>
        </section>

        <section className={"relative w-full max-w-7xl pb-20"}>
          <div className={"max-w-[1074px] m-auto"}>
            <div
              className={
                "flex items-center justify-center gap-12 pt-20 py-10 bg-[#fff] sticky top-[115px] z-10"
              }
            >
              {categories.map((category, categoryKey) => (
                <div
                  key={categoryKey}
                  className={`cursor-pointer font-semibold text-2xl ${
                    categoryKey >= 0 && categoryKey === categoryId
                      ? "text-[#140E02] underline"
                      : "text-[#8C877C]"
                  }`}
                  onClick={() => {
                    setCategoryId(categoryKey)
                  }}
                >
                  {category.name}
                </div>
              ))}
            </div>
            <div className={"w-full"}>
              <div className={"flex flex-wrap gap-x-6 gap-y-10 mb-10 w-full"}>
                {!isError &&
                  data &&
                  data.pages.map((page, pageNum) => (
                    <React.Fragment key={pageNum}>
                      {page.data.map((resource: any, resourceKey: number) => (
                        <div
                          className={
                            "flex-grow-0 flex-shrink-0 basis-auto w-[195px]"
                          }
                          key={resourceKey}
                        >
                          <a
                            className={
                              "w-[195px] h-[276px] flex items-center mb-5"
                            }
                            href={
                              resource.pdf
                                ? getStrapiUrl(resource.pdf.url)
                                : "#"
                            }
                            target="_blank"
                          >
                            <img
                              src={getStrapiUrl(resource.cover.url)}
                              alt={resource.title}
                              className="object-contain w-full"
                            />
                          </a>
                          <p className={"font-semibold text-sm text-[#2F2A1E]"}>
                            {resource.title}
                          </p>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
              </div>
              <div
                className={
                  "flex items-center justify-center text-[#2F2A1E] text-xs"
                }
                ref={scrollRef}
              >
                {isFetchingNextPage || hasNextPage ? (
                  <>
                    loading...
                    <img src="/img/icon-loading.svg" className="w-4 h-4" />
                  </>
                ) : (
                  ""
                )}
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
