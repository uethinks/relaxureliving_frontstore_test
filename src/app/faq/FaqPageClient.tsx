"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import V2MaskHeader from "@/components/V2MaskHeader"
import { getFAQCategories } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

const IconPlus = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
)
const IconMinus = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
)

function buildUrl(category?: string) {
  const query = new URLSearchParams()
  query.set("category", category ? `${category}` : "")

  const queryString = query.toString()
  return queryString ? `/faq/?${queryString}` : `/faq/`
}

interface FaqPageClientProps {
  initialFaqData?: any
}

export function FaqPageClient({ initialFaqData }: FaqPageClientProps) {
  const [categories, setCategories] = useState<any>()
  const [categoryId, setCategoryId] = useState("")
  const [faqs, setFaqs] = useState<any>()
  const [faqId, setFaqId] = useState<any>(1)
  const searchParams = useSearchParams()
  const router = useRouter()

  async function fetchFAQCategories() {
    try {
      const { data } = await getFAQCategories()
      console.log("FAQ Categories - data", data)
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch FAQ:", error)
    }
  }

  // 初始化加载 FAQ 数据
  useEffect(() => {
    // 如果有初始数据，优先使用；否则从 API 获取
    if (initialFaqData?.data) {
      console.log("Using initial FAQ data from server")
      // 这里可以根据 initialFaqData 的结构来设置初始状态
      // 暂时保持原有的获取逻辑
    }
    fetchFAQCategories()
  }, [initialFaqData])

  useEffect(() => {
    if (!categories || !categoryId) {
      return
    }
    setFaqs(categories.find((x: any) => x.slug === categoryId)?.faqs)
    setFaqId(1)
    router.push(buildUrl(categoryId))
  }, [categoryId])

  useEffect(() => {
    if (!categories) {
      return
    }
    if (searchParams.get("category")) {
      const index = categories.findIndex(
        (x: any) => x.slug === searchParams.get("category")
      )
      // setFaqs(categories?.[index]?.faqs)
      setCategoryId(categories?.[index]?.slug)
    } else {
      setCategoryId(categories?.[0]?.slug)
    }
  }, [categories])

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <V2MaskHeader title={"FAQs"} />

        <section
          className={
            "relative w-full px-6 lg:px-0 lg:max-w-7xl flex gap-5 lg:gap-6 mb-20"
          }
        >
          <div className="w-[27vw] lg:w-[342px] flex-grow-0 flex-shrink-0 basis-auto">
            <ul className="flex pb-8 flex-col gap-5">
              {categories &&
                categories?.map((category: any) => (
                  <li
                    key={category.documentId}
                    className={"relative text-base lg:text-2xl cursor-pointer"}
                    onClick={() => {
                      setCategoryId(category.slug)
                    }}
                  >
                    {categoryId === category.slug && (
                      <img
                        src="/img/icon-title.svg"
                        alt=""
                        className="w-8 h-8 flex-shrink-0 absolute top-0 -left-4 -z-1"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`break-words whitespace-normal relative z-1 font-bold text-[${categoryId === category.slug ? "#140E02" : "#8C877C"}]`}
                    >
                      {category.name}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <article className={"w-full flex flex-col gap-[1px]"}>
            {faqs &&
              faqs?.map((faq: any, faqKey: number) => (
                <div
                  key={faq.documentId || faqKey}
                  className={`bg-[${faqId === faqKey + 1 ? "#EFEEEB" : "#EFEEEB66"}] px-4`}
                >
                  <div
                    className={`flex flex-row items-center justify-between py-4 font-semibold text-sm lg:text-base text-[#8C877C] ${faq.description && "cursor-pointer"}`}
                    onClick={() => {
                      if (!faq.description) {
                        return
                      }
                      setFaqId(faqKey + 1)
                    }}
                  >
                    {faq.title}
                    {faq.description &&
                      (faqId === faqKey + 1 ? (
                        <a
                          href="javascript:void(0)"
                          style={{ color: "#2F2A1E" }}
                        >
                          <IconMinus />
                        </a>
                      ) : (
                        <a
                          href="javascript:void(0)"
                          style={{ color: "#8C877C" }}
                        >
                          <IconPlus />
                        </a>
                      ))}
                  </div>

                  <div
                    className={`whitespace-break-spaces text-[10px] lg:text-xs mb-4 text-[#2F2A1E] ${faq.description && faqId === faqKey + 1 ? "block" : "hidden"}`}
                  >
                    <Markdown
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                      remarkRehypeOptions={{ passThrough: ["link"] }}
                      components={{
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="text-primary underline decoration-[#8C877C] font-semibold"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {faq.description}
                    </Markdown>
                  </div>
                </div>
              ))}
          </article>
        </section>
        <section className={"w-full bg-[#EFEEEB80]"}>
          <V2ContactUsSection />
        </section>
      </div>
      <FooterDark />
    </>
  )
}
