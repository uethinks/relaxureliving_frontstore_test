import { getBackgroundColor } from "@lib/utils"
import { Wind, Snowflake, Clock } from "lucide-react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface ComparisonItem {
  id: number
  documentId: string
  name: string
  price: string
  included_technology: string
  customization_available: string
  quality: string
  warranty: string
  expected_longevity: string
  wind_rating: string
  snow_load_capacity: string
  frame_material: string
  steel_reinforced_baseplates: string
  coating_standard: string
  shipping_insurance: string
  maintenance: string
  factory_direct: string
  estimated_delivery: string
  isHighlight?: boolean
  category?: string
}

interface ComparisonData {
  title: string
  backgroundColor: string
  items: ComparisonItem[]
}

const rowLabels = [
  { key: "price", label: "Price" },
  { key: "included_technology", label: "Included\nTechnology" },
  { key: "customization_available", label: "Customization\nAvailable" },
  { key: "quality", label: "Quality" },
  { key: "warranty", label: "Warranty" },
  { key: "expected_longevity", label: "Expected\nLongevity" },
  { key: "wind_rating", label: "Wind Rating" },
  { key: "snow_load_capacity", label: "Snow Load\nCapacity" },
  { key: "frame_material", label: "Frame\nMaterial" },
  {
    key: "steel_reinforced_baseplates",
    label: "Steel\nReinforced\nBaseplates",
  },
  { key: "coating_standard", label: "Coating\nStandard" },
  { key: "shipping_insurance", label: "Shipping &\nInsurance" },
  { key: "maintenance", label: "Maintenance" },
  { key: "factory_direct", label: "Factory\nDirect" },
  { key: "estimated_delivery", label: "Estimated\nDelivery" },
]

const renderCellContent = (key: string, value: string) => {
  return (
    <div>
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        remarkRehypeOptions={{ passThrough: ["link"] }}
        components={{
          img: ({ ...props }) => (
            <img {...props} className="inline max-w-full h-auto mr-2" />
          ),
        }}
      >
        {value}
      </Markdown>
    </div>
  )
}

const getColumnBg = (item: ComparisonItem, index: number) => {
  if (item.isHighlight) {
    return index === 0 ? "bg-primary-light" : "bg-[#ffd379]"
  }
  return "bg-[#efeeeb]"
}

// 为数据行设置背景色
const getCellBg = (item: ComparisonItem, index: number, rowKey: string, rowIndex: number) => {
  const isNameRow = rowKey === "name"
  const isEvenRow = rowIndex % 2 === 1 // 偶数行（从0开始计数，所以奇数索引是偶数行）
  
  if (item.isHighlight) {
    // highlight 产品
    if (isNameRow) {
      return isEvenRow ? "bg-primary-light/80" : "bg-primary-light" // 偶数行略深
    } else {
      return isEvenRow ? "bg-[#EFEEEB]/50" : "bg-[#EFEEEB]" // 偶数行略深
    }
  } else {
    // 非 highlight 产品
    if (isNameRow) {
      return isEvenRow ? "bg-[#EFEEEB]/80" : "bg-[#EFEEEB]" // 偶数行略深
    } else {
      return isEvenRow ? "bg-[#F5F5F5]/0" : "bg-[#F5F5F5]/50" // 偶数行略深
    }
  }
}

export const V2PergolasComparisonTable = ({
  data,
}: {
  data: ComparisonData
}) => {
  console.log("data", data)
  const highQualityItems = data.items.filter(
    (item) => item.category === "High Quality Pergolas"
  )
  const cheapItems = data.items.filter(
    (item) => item.category === "Cheap Aluminum Pergolas"
  )

  // 创建排序后的数据数组，确保高质量产品在前，便宜产品在后
  const sortedItems = [...highQualityItems, ...cheapItems]

  return (
    <div className={`w-full ${getBackgroundColor(data.backgroundColor)}`}>
      <div className="max-w-[1074px] pb-24 pt-16 mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#000000] mb-8 capitalize">
          {data.title}
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-[#ffffff] shadow-lg overflow-hidden">
            {/* Header */}
            <thead>
              <tr>
                <th className="bg-[#2f2a1e] w-[150px] p-4 text-left font-medium text-[#000000] border-[#8c877c]"></th>
                <th
                  className="bg-[#2f2a1e] p-4 text-center font-medium text-[#ffffff] border-r border-[#8c877c]"
                  colSpan={highQualityItems.length}
                >
                  High Quality Pergolas
                </th>
                <th
                  className="bg-[#57554f] p-4 text-center font-medium text-[#ffffff]"
                  colSpan={cheapItems.length}
                >
                  Cheap Aluminum Pergolas
                </th>
              </tr>
              <tr>
                <th className="bg-white w-[160px] p-3 text-left font-medium text-[#000000] border-r border-[#8c877c]"></th>
                {sortedItems.map((item, index) => (
                  <th
                    key={item.id}
                    className={`${getColumnBg(
                      item,
                      index
                    )} p-3 text-center w-[160px] font-medium text-[#000000] border-r border-[#8c877c] text-sm last:border-r-0`}
                  >
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rowLabels.map((row, rowIndex) => (
                <tr
                  key={row.key}
                  className="border-b border-[#8c877c] last:border-b-0"
                >
                  <td className="bg-white p-4 font-medium text-[#000000] border-r border-[#8c877c] whitespace-pre-line">
                    {row.label}
                  </td>
                  {sortedItems.map((item, index) => (
                    <td
                      key={item.id}
                      className={`${getCellBg(item, index, row.key, rowIndex)} p-4 text-center ${
                        row.key === "included_technology" ||
                        row.key === "customization_available" ||
                        row.key === "frame_material" ||
                        row.key === "coating_standard" ||
                        row.key === "shipping_insurance"
                          ? "text-xs"
                          : "text-sm"
                      } border-r border-[#8c877c] last:border-r-0`}
                    >
                      {renderCellContent(
                        row.key,
                        item[row.key as keyof ComparisonItem] as string
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
