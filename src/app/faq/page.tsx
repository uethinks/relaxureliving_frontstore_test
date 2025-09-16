"use client"

import { V2ContactUsSection } from "@/components/V2ContactUsSection"
import { getFAQCategories } from "@lib/cms/strapiCmsApi"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
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
      fill-rule="evenodd"
      clip-rule="evenodd"
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
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
)

export default function FaqPage() {
  const [categories, setCategories] = useState<any>()
  const [categoryId, setCategoryId] = useState(0)
  const [faqs, setFaqs] = useState<any>()
  const [faqId, setFaqId] = useState<any>(0)

  async function fetchFAQCategories() {
    try {
      const { data } = await getFAQCategories()
      console.log("FAQ Categories - data", data)
      setCategories(data)
      setFaqs(data?.[0]?.faqs)
    } catch (error) {
      console.error("Failed to fetch FAQ:", error)
    }
  }

  // 初始化加载 FAQ 数据
  useEffect(() => {
    fetchFAQCategories()
  }, [])

  useEffect(() => {
    if (!categories) {
      return
    }
    setFaqs(categories?.[categoryId]?.faqs)
    setFaqId(0)
  }, [categoryId])

  return (
    <>
      <div className="w-full flex flex-col items-center py-0 relative bg-[#ffffff]">
        <NavBarWrapper />
        <h1
          className={
            "pt-20 pb-10 text-center text-[56px] font-semibold text-[#140E02]"
          }
        >
          FAQs
        </h1>
        <section className={"relative w-full max-w-7xl flex flex-row gap-6"}>
          <div className="w-[342px] h-[calc(100vh-300px)] flex-grow-0 flex-shrink-0 basis-auto">
            <div className="overflow-hidden h-full pb-8">
              <ul className="flex pl-4 h-full flex-col gap-5 overflow-y-auto">
                {categories &&
                  categories?.map((category: any, categoryKey: number) => (
                    <li
                      key={category.id}
                      className={"relative text-2xl cursor-pointer"}
                      onClick={() => {
                        setCategoryId(categoryKey)
                      }}
                    >
                      {categoryId === categoryKey && (
                        <img
                          src="/img/icon-title.svg"
                          alt=""
                          className="w-8 h-8 flex-shrink-0 absolute top-0 -left-4 -z-1"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative z-1 font-bold text-[${
                          categoryId === categoryKey ? "#140E02" : "#8C877C"
                        }]`}
                      >
                        {category.name}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <article className={"w-full flex flex-col gap-[1px]"}>
            {faqs &&
              faqs?.map((faq: any, faqKey: number) => (
                <div
                  className={`bg-[${
                    faqId === faqKey + 1 ? "#EFEEEB" : "#EFEEEB66"
                  }] px-4`}
                >
                  <div
                    className={`flex flex-row items-center justify-between py-4 font-semibold text-base text-[#8C877C] ${
                      faq.description && "cursor-pointer"
                    }`}
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
                    className={`whitespace-break-spaces text-xs mb-4 text-[#2F2A1E] ${
                      faq.description && faqId === faqKey + 1
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      remarkRehypeOptions={{ passThrough: ["link"] }}
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
