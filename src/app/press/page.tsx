"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2PressItem from "@/components/V2PressItem"
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
        <section className={"relation overflow-hidden w-full py-20"}>
          <img
            src="/img/body-mask.png"
            className={"absolute top-0 left-0 z-0 w-full"}
          />
          <div className={"max-w-7xl mb-10 text-black text-center m-auto"}>
            <h1 className={"font-semibold text-[56px]"}>
              Relaxure in the Press
            </h1>
            <p className={"text-xl"}>
              Discover articles showcasing Relaxure’s pergolas, outdoor living
              inspirations, and expert reviews.
            </p>
          </div>
        </section>
        <section className={"w-full max-w-[1440px] mb-20"}>
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
                      <V2PressItem
                        key={pressKey}
                        item={{
                          url: press.image ? getStrapiUrl(press.image.url) : "",
                          title: press.title,
                          link: press.link,
                        }}
                      />
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
