import React from "react"
import { getAllTerms } from "@lib/cms/strapiCmsApi"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import AgreeButton from "./components/AgreeButton"

interface TermType {
  title: string
}

interface TermsData {
  data: {
    content: Array<{
      type: string
      children: Array<any>
    }>
  }
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
      countryCode: "us",
      type,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// 生成页面元数据
export async function generateMetadata({
  params,
}: {
  params: { countryCode: string; type: string }
}) {
  const { type } = params
  if (!termsTypes[type]) {
    return {
      title: "Not Found - Relaxure Living",
      description: "The requested terms page could not be found.",
    }
  }

  const title = termsTypes[type].title
  return {
    title: `${title} - Relaxure Living`,
    description: `View our ${title}`,
  }
}

export default async function TermsPage({
  params,
}: {
  params: { type: string; countryCode: string }
}) {
  const { type } = params

  // 验证条款类型是否有效
  if (!termsTypes[type]) {
    return <ErrorMessage message="Invalid terms type requested." />
  }

  const { title } = termsTypes[type]
  const termsData = await getAllTerms()
  const content = termsData[type]?.data?.content

  if (!content) {
    return <ErrorMessage message="Content not available for this terms type." />
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">{title}</h1>
          <div className="prose max-w-none">
            <BlocksRenderer content={content} />
          </div>
          <AgreeButton />
        </div>
      </div>
    </main>
  )
}
