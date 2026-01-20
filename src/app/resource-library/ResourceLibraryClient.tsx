"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2MaskHeader from "@/components/V2MaskHeader"
import V2MediaRenderer from "@/components/V2MediaRenderer"
import { getResourceLibrary } from "@lib/cms/strapiCmsApi"
import { getStrapiUrl } from "@lib/utils"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInViewport } from "ahooks"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { FIXED_BLUR_DATA_URL } from "@modules/products/single/components/ImgContent/ImgContent"

function buildUrl(category?: string) {
  const query = new URLSearchParams()
  query.set("category", category ? `${category}` : "all")

  const queryString = query.toString()
  return queryString
    ? `/resource-library/?${queryString}`
    : `/resource-library/`
}

export default function ResourceLibraryClient() {
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
        <V2MaskHeader
          title={"Resource Library"}
          sectionClassName={"pb-0 lg:pb-10"}
          description={
            <>
              We are dedicated to sharing{" "}
              <span className={"font-semibold"}>
                useful insights and practical tips
              </span>{" "}
              — from pergola installation and maintenance to outdoor living
              inspiration. Our Relaxure team is continuously creating content to
              make your pergola experience safer, easier, and more enjoyable all
              year round
            </>
          }
        />

        <section className={"relative w-full lg:max-w-7xl px-6 pb-20"}>
          <div className={"lg:max-w-[1074px] m-auto"}>
            <div
              className={
                "flex items-center lg:justify-center gap-12 pt-8 pb-5 lg:py-10 bg-[#fff] sticky top-[84px] lg:top-[110px] z-10 overflow-auto"
              }
            >
              {categories.map((category, categoryKey) => (
                <div
                  key={categoryKey}
                  className={`flex-shrink-0 flex-grow-0 basis-auto cursor-pointer font-semibold text-base lg:text-2xl ${
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
              <div
                className={
                  "flex flex-wrap justify-between gap-y-5 lg:gap-x-6 lg:gap-y-10 mb-10 w-full"
                }
              >
                {!isError &&
                  data &&
                  data.pages.map((page, pageNum) => (
                    <React.Fragment key={pageNum}>
                      {page.data.map((resource: any, resourceKey: number) => (
                        <div
                          className={
                            "flex-grow-0 flex-shrink-0 basis-auto w-[42vw] lg:w-[195px]"
                          }
                          key={resourceKey}
                        >
                          <a
                            className={
                              "w-full h-[60vw] lg:h-[276px] flex items-center mb-5"
                            }
                            href={
                              resource.pdf
                                ? getStrapiUrl(resource.pdf.url)
                                : "#"
                            }
                            target="_blank"
                          >
                            <V2MediaRenderer
                              media={resource.cover}
                              options={{
                                objectFit: "contain",
                                className: "object-contain w-full",
                              }}
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
                    <Image src="/img/icon-loading.svg" className="w-4 h-4" width={16} height={16} alt="loading" placeholder="blur" blurDataURL={FIXED_BLUR_DATA_URL} />
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
