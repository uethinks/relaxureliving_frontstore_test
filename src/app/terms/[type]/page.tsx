import React from "react"
import { getAllTerms } from "@lib/cms/strapiCmsApi"
import AgreeButton from "./components/AgreeButton"
import { FooterDark } from "@modules/home/homepage/page/sections/footer"
import { NavBarWrapper } from "@modules/home/homepage/page/sections/NavBarWrapper"
interface TermType {
  title: string
}

// 定义所有可能的条款类型
const termsTypes: Record<string, TermType> = {
  "terms-of-service": {
    title: "Terms of Service",
  },
  "privacy-policy": {
    title: "Privacy Policy",
  },
  warranty: {
    title: "Warranty",
  },
  "refund-policy": {
    title: "Refund Policy",
  },
  "shipping-policy": {
    title: "Shipping Policy",
  },
  "intellectual-property-right": {
    title: "Intellectual Property Rights",
  },
}

// 错误提示组件
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-red-500 p-4 rounded-lg bg-red-50 border border-red-100">
        {message}
      </div>
    </div>
  </div>
)

// 生成静态参数和内容
export async function generateStaticParams() {
  try {
    const termsData = await getAllTerms()
    const validTypes = Object.keys(termsTypes).filter(
      (type) => termsData[type]?.data?.content
    )

    return validTypes.map((type) => ({
      type,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// 添加动态配置
export const dynamic = "force-dynamic"
export const revalidate = 3600 // 每小时重新验证一次

const metaMap: Record<string, { title: string; description: string }> = {
  "intellectual-property-right": {
    title: "Intellectual Property Rights Disclosure",
    description: "N/A",
  },
  "shipping-policy": {
    title: "Relaxure Shipping Policy",
    description:
      "Learn about the shipping timeframe for your Relaxure pergola.",
  },
  "terms-of-service": {
    title: "Relaxure Terms of Service",
    description:
      "Learn about the terms of service applicable to visitors of the https://relaxureliving.com/ website.",
  },
  "privacy-policy": {
    title: "Relaxure Privacy Policy",
    description: "Learn about Relaxure’s privacy policy.",
  },
  warranty: {
    title: "Relaxure Warranty Coverage Information",
    description: "Learn about Relaxure’s lifetime pergola warranty.",
  },
  "refund-policy": {
    title: "Relaxure Refund Policy",
    description:
      "Learn about refund eligibility requirements for Relaxure pergolas.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: { type: string }
}) {
  const meta = metaMap[params.type] || { title: "Relaxure", description: "" }
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default async function TermsPage({
  params,
}: {
  params: { type: string }
}) {
  const { type } = await params

  // 验证条款类型是否有效
  if (!termsTypes[type]) {
    console.error(`Invalid terms type: ${type}`)
    return <ErrorMessage message="Invalid terms type requested." />
  }

  const { title } = termsTypes[type]

  try {
    const termsData = await getAllTerms()

    if (!termsData) {
      console.error("No terms data received")
      return <ErrorMessage message="Failed to fetch terms data." />
    }

    const content = termsData[type]?.data?.content

    if (!content) {
      console.error(`No content found for type: ${type}`)
      return (
        <ErrorMessage message="Content not available for this terms type." />
      )
    }

    return (
      <main className="min-h-screen bg-gray-50">
        <NavBarWrapper isHomePage={false} isFixed={false} />
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-8">{title}</h1>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <AgreeButton />
          </div>
        </div>
        <FooterDark />
      </main>
    )
  } catch (error) {
    console.error("Error fetching terms content:", error)
    return (
      <ErrorMessage message="Failed to load terms content. Please try again later." />
    )
  }
}
