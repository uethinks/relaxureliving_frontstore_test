import React from "react"

interface BreadcrumbProps {
  steps: string[]
  current: number
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ steps, current }) => (
  <nav className="w-full my-8">
    <ol className="flex items-center bg-white rounded-lg px-6 py-4 gap-4">
      {steps.map((step, idx) => {
        let color = "#69727A" // 未来步骤
        if (idx < current) {
          color = "#072F6C" // 历史步骤
        }
        if (idx === current) {
          color = "#343A40" // 当前步骤
        }
        return (
          <li key={step} className="flex items-center">
            <span className="text-lg font-medium" style={{ color }}>
              {step}
            </span>
            {idx < steps.length - 1 && (
              <span className="mx-2 text-[#8d9299] text-xl">{">"}</span>
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)

export default Breadcrumb
