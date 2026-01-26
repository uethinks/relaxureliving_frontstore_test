import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface IProps {
  category?: string
  name?: string
  description?: string
  isHeading?: boolean
}

export default function V2ProductSelectorHeader({ data }: { data: IProps }) {
  const { category, name, description, isHeading = false } = data
  return (
    <>
      <div className="pb-4 border-[#d9d9d9]">
        {category && <p className="text-[#2F2A1E] text-xl mb-2">{category}</p>}
        {name && isHeading ? (
          <h1 className="text-[#2F2A1E] text-3xl font-semibold">{name}</h1>
        ) : (
          <p className="text-[#2F2A1E] text-3xl font-semibold">{name}</p>
        )}
      </div>
      {description && (
        <div className="text-[#2F2A1E] text-sm">
          <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
        </div>
      )}
    </>
  )
}
