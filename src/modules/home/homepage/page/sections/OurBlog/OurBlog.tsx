import React from "react"
import { Blog } from "../../../../components/Blog"
import { HomepageBlog } from "types/global"

export const OurBlog = ({
  homepageBlog,
}: {
  homepageBlog: HomepageBlog | null
}): JSX.Element => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center gap-[98px] px-[47px] py-0 relative flex-[0_0_auto] ml-[-47.00px] mr-[-47.00px]">
      {/* Desktop Layout */}
      <div className="flex flex-col w-full lg:w-2/5 items-start justify-center gap-[30px] px-0 py-4 relative">
        <div className="items-start self-stretch w-full flex flex-col gap-2.5 relative flex-[0_0_auto]">
          <div className="flex self-stretch w-full flex-col lg:items-start items-center gap-2.5 relative flex-[0_0_auto]">
            <div className="flex w-28 h-[41px] items-center justify-center p-2.5 bg-[#072f6c] rounded-[30px] gap-2.5 relative">
              <div className="w-fit mt-[-4.00px] mb-[-2.00px] text-[#ffffff] text-lg leading-[27px] whitespace-nowrap relative [font-family:'Montserrat',Helvetica] font-medium tracking-[0]">
                {homepageBlog?.Title}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:items-start items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="text-center lg:text-left w-full mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[18px] lg:text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] relative tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
              {homepageBlog?.Subtitle}
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="text-center lg:text-left w-full mt-[-1.00px] text-[#68717a] text-[length:var(--relaxure-sub-heading-18-font-size)] leading-[var(--relaxure-sub-heading-18-line-height)] relative font-relaxure-sub-heading-18 font-[number:var(--relaxure-sub-heading-18-font-weight)] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] [font-style:var(--relaxure-sub-heading-18-font-style)]">
              {homepageBlog?.Description}``
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Blog Grid */}
      <div className="hidden lg:block columns-2 gap-4 h-auto relative w-3/5 mr-[-4.00px]">
        <div className="mb-4 break-inside-avoid">
          <Blog size="large" blog={homepageBlog?.articles[0] || null} />
        </div>
        <div className="mb-4 break-inside-avoid">
          <Blog size="small" blog={homepageBlog?.articles[1] || null} />
        </div>
        <div className="mb-4 break-inside-avoid">
          <Blog size="small" blog={homepageBlog?.articles[2] || null} />
        </div>
        <div className="mb-4 break-inside-avoid">
          <Blog size="large" blog={homepageBlog?.articles[3] || null} />
        </div>
      </div>

      {/* Mobile Blog Grid */}
      <div className="flex lg:hidden flex-col w-full gap-4">
        <div className="mb-4">
          <Blog size="large" blog={homepageBlog?.articles[0] || null} />
        </div>
        <div className="mb-4">
          <Blog size="small" blog={homepageBlog?.articles[1] || null} />
        </div>
        <div className="mb-4">
          <Blog size="small" blog={homepageBlog?.articles[2] || null} />
        </div>
        <div className="mb-4">
          <Blog size="large" blog={homepageBlog?.articles[3] || null} />
        </div>
      </div>
    </div>
  )
}
