"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { getPress } from "@lib/cms/strapiCmsApi"
import { getStrapiUrl } from "@lib/utils"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInViewport } from "ahooks"
import React, { useEffect, useRef } from "react"

export default function PagePress() {
  const scrollRef = useRef<HTMLInputElement | null>(null)
  const [inViewport] = useInViewport(scrollRef)

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["fetchList"],
      queryFn: ({ pageParam = 1 }) => getPress({ current: pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1,
    })

  useEffect(() => {
    if (inViewport && hasNextPage) {
      fetchNextPage()
    }
  }, [inViewport])

  return (
    <>
      <main className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <section className={"max-w-7xl py-20"}>
          <div className={"mb-10 text-black text-center"}>
            <h1 className={"font-semibold text-[56px]"}>
              Relaxure in the Press
            </h1>
            <p className={"text-xl"}>
              Discover articles showcasing Relaxure’s pergolas, outdoor living
              inspirations, and expert reviews.
            </p>
          </div>
        </section>
        <section className={"w-full max-w-[1440px]"}>
          <div className={"w-full"}>
            <div
              className={
                "flex flex-wrap items-center gap-x-6 gap-y-5 mb-10 w-full"
              }
            >
              {!isError &&
                data &&
                data.pages.map((page, pageNum) => (
                  <React.Fragment key={pageNum}>
                    {page.data.map((press: any, pressKey: number) => (
                      <div
                        className={
                          "flex items-center gap-x-5 p-5 flex-grow-1 flex-shrink-1 basis-auto w-[464px]"
                        }
                        style={{
                          background:
                            "linear-gradient(270deg, #FFFFFF 0%, #EFEEEB 100%)",
                        }}
                        key={pressKey}
                      >
                        <div
                          className={
                            "w-40 h-40 flex items-center flex-grow-0 flex-shrink-0 basis-auto"
                          }
                        >
                          <img
                            src={getStrapiUrl(press.image.url)}
                            alt={press.title}
                            className="object-contain w-full"
                          />
                        </div>
                        <div
                          className={
                            "flex flex-col justify-between h-[107px] pr-5"
                          }
                        >
                          <p
                            className={
                              "text-[#2F2A1E] text-base font-semibold line-clamp-3"
                            }
                          >
                            <span className={"text-[#FFBF3C]"}>"</span>
                            {press.title}
                            <span className={"text-[#FFBF3C]"}>"</span>
                          </p>
                          <a
                            href={press.link}
                            className={
                              "underline text-[#FFBF3C] text-xs font-semibold"
                            }
                          >
                            Read more
                          </a>
                        </div>
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
        </section>

        <section className={"w-full bg-[#EFEEEB80]"}>
          <V2ContactUsSection />
        </section>
      </main>
      <FooterDark />
    </>
  )
}
