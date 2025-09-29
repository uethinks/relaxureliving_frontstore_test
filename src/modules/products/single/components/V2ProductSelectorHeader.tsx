import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface IProps {
  category?: string
  name?: string
  description?: string
}

export default function V2ProductSelectorHeader({ data }: { data: IProps }) {
  const { category, name, description } = data
  return (
    <>
      <div className="pb-4 border-[#d9d9d9]">
        {category && <p className="text-[#2F2A1E] text-xl mb-2">{category}</p>}
        {name && (
          <h1 className="text-[#2F2A1E] text-3xl font-semibold">{name}</h1>
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
