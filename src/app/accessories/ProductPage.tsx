"use client"

import { ImgContent } from "@modules/products/single/components/ImgContent"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ProductPage({
  cmsData,
  children,
}: {
  cmsData: any
  children?: any
}) {
  return (
    <div className="w-full max-w-[1074px] mx-auto relative">
      <div className="lg:mx-auto flex flex-col w-full relative z-10">
        <div className="flex flex-col w-full lg:flex-row justify-between items-start">
          <div className="flex flex-col max-w-[1074px] w-full mx-auto lg:mt-10 gap-5 pb-5">
            <div className="flex flex-row justify-between items-start relative w-full lg:gap-6 max-lg:flex-wrap">
              {/* Left Content */}
              <div className="w-full lg:w-[708px] flex flex-col lg:sticky lg:top-0">
                <div className="flex flex-row justify-between w-full">
                  <ImgContent productImages={cmsData.productImages || []} />
                </div>
                <div className={"lg:hidden px-6"}>
                  <div className="pb-4 border-[#d9d9d9]">
                    <p className="text-[#2F2A1E] text-xl mb-2">
                      Relaxure Accessories
                    </p>
                    <h1 className="text-[#2F2A1E] text-3xl font-semibold">
                      {cmsData?.name}
                    </h1>
                  </div>
                  <div className="text-[#2F2A1E] text-sm">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {cmsData.shortDescription}
                    </Markdown>
                  </div>
                </div>
                <div className="text-[#2F2A1E] text-sm lg:mt-12 lg:pb-12 w-full prose max-w-none max-lg:px-6">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    // rehypePlugins={[rehypeRaw]}
                    remarkRehypeOptions={{ passThrough: ["link"] }}
                  >
                    {cmsData.detailDescription}
                  </Markdown>
                </div>
              </div>
              {/* Desktop View */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
