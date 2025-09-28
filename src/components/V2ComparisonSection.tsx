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

const MOCK_DATA = {
  "__component": "blocks.v2-comparison-section",
  "id": 13,
  "title": "Relaxure VS. Others",
  "backgroundColor": "white",
  "items": [
      {
          "id": 8,
          "documentId": "b5qx7ihv3wv0tu7cpi7ikre3",
          "name": "Relaxure Corsica (Light-Duty)",
          "price": "$5,297 - $11,858",
          "included_technology": "Motorized Louvers, Automatic Rain Sensors, LED & RGB Lighting, App & Remote Control",
          "customization_available": "**Fully Customizable** –  size, height, color",
          "quality": "Extremely High",
          "warranty": "Lifetime",
          "expected_longevity": "40+ Years",
          "wind_rating": "130 MPH",
          "snow_load_capacity": "35lbs / sqft",
          "frame_material": "Commercial grade **6063-T6** Aluminum",
          "steel_reinforced_baseplates": "Yes",
          "coating_standard": "AAMA-2605 powder-coated – highest U.S. architectural standard",
          "shipping_insurance": "Included (Free Door-to-Door, Full Insurance)",
          "maintenance": "Maintenance-free",
          "factory_direct": "Direct from factory",
          "estimated_delivery": "5-7 Weeks",
          "isHighlight": true,
          "category": "High Quality Pergolas",
          "createdAt": "2025-09-28T04:35:50.864Z",
          "updatedAt": "2025-09-28T04:41:58.513Z",
          "publishedAt": "2025-09-28T04:41:58.544Z"
      },
      {
          "id": 9,
          "documentId": "kqpcdg8bfir0bm6m9sxei18p",
          "name": "Relaxure Capri (Heavy-Duty)",
          "price": "$6,463 - $14,467",
          "included_technology": "Motorized Louvers, Automatic Rain Sensors, LED & RGB Lighting, App & Remote Control",
          "customization_available": "**Fully Customizable** – size, height, color",
          "quality": "Extremely High",
          "warranty": "Lifetime",
          "expected_longevity": "35+ Years",
          "wind_rating": "165 MPH",
          "snow_load_capacity": "65lbs / sqft",
          "frame_material": "Commercial grade **6063-T6** Aluminum",
          "steel_reinforced_baseplates": "Yes",
          "coating_standard": "AAMA-2605 powder-coated – highest U.S. architectural standard",
          "shipping_insurance": "Included (Free Door-to-Door, Full Insurance)",
          "maintenance": "Maintenance-free",
          "factory_direct": "Direct from factory",
          "estimated_delivery": "5-7 Weeks",
          "isHighlight": true,
          "category": "High Quality Pergolas",
          "createdAt": "2025-09-28T04:39:13.955Z",
          "updatedAt": "2025-09-28T04:42:05.538Z",
          "publishedAt": "2025-09-28T04:42:05.565Z"
      },
      {
          "id": 7,
          "documentId": "xuuz5hjytzg78i4msgjz2xc0",
          "name": "Hanso",
          "price": "$5,997 - $11,997",
          "included_technology": "None (Extra Charge)",
          "customization_available": "**No Customization** – standard sizes only",
          "quality": "Extremely High",
          "warranty": "10 Years",
          "expected_longevity": "30+ Years",
          "wind_rating": "72 - 120 MPH",
          "snow_load_capacity": "25lbs / sqft",
          "frame_material": "100% **6063-T5** Aluminum",
          "steel_reinforced_baseplates": "No",
          "coating_standard": "Standard powder-coating (lower grade)",
          "shipping_insurance": "Shipping & Insurance Extra",
          "maintenance": "Maintenance-free",
          "factory_direct": "Middlemen",
          "estimated_delivery": "10-14 Weeks",
          "isHighlight": false,
          "category": "High Quality Pergolas",
          "createdAt": "2025-09-28T04:41:48.987Z",
          "updatedAt": "2025-09-28T04:41:48.987Z",
          "publishedAt": "2025-09-28T04:41:49.016Z"
      },
      {
          "id": 11,
          "documentId": "tcl5q4wx52zzsqpkl14npo2l",
          "name": "Renson",
          "price": "$40,000 - $180,000",
          "included_technology": "None (Extra Charge)",
          "customization_available": "**Fully Customizable** – size, height, color",
          "quality": "Extremely High",
          "warranty": "10 Years",
          "expected_longevity": "30+ Years",
          "wind_rating": "165 MPH",
          "snow_load_capacity": "41lbs / sqft",
          "frame_material": "Commercial grade **6063-T6** Aluminum",
          "steel_reinforced_baseplates": "Yes",
          "coating_standard": "AAMA-2605 powder-coated – highest U.S. architectural standard",
          "shipping_insurance": "Shipping & Insurance Extra",
          "maintenance": "Yearly cleaning",
          "factory_direct": "Direct from factory",
          "estimated_delivery": "8-12 Weeks (Plus a few visits)",
          "isHighlight": false,
          "category": "High Quality Pergolas",
          "createdAt": "2025-09-28T04:52:59.655Z",
          "updatedAt": "2025-09-28T04:52:59.655Z",
          "publishedAt": "2025-09-28T04:52:59.678Z"
      },
      {
          "id": 13,
          "documentId": "l329csc70jxgs2oabbsjefg1",
          "name": "Struxure",
          "price": "$25,000 - $80,000",
          "included_technology": "None (Extra Charge)",
          "customization_available": "**Fully Customizable** – size, height, color",
          "quality": "High",
          "warranty": "10 Years",
          "expected_longevity": "20 - 30 Years",
          "wind_rating": "165 MPH",
          "snow_load_capacity": "50lbs / sqft",
          "frame_material": "100% **6063-T5** Aluminum",
          "steel_reinforced_baseplates": "Yes",
          "coating_standard": "AAMA-2605 powder-coated – highest U.S. architectural standard",
          "shipping_insurance": "Shipping & Insurance Extra",
          "maintenance": "Yearly cleaning",
          "factory_direct": "Through dealers",
          "estimated_delivery": "6-8 Weeks (Plus a few visits)",
          "isHighlight": false,
          "category": "High Quality Pergolas",
          "createdAt": "2025-09-28T04:54:53.948Z",
          "updatedAt": "2025-09-28T04:54:53.948Z",
          "publishedAt": "2025-09-28T04:54:53.972Z"
      },
      {
          "id": 15,
          "documentId": "fwxss77rqoncw01heplssbip",
          "name": "Purple Leaf",
          "price": "$2,500 - $8,000",
          "included_technology": "None",
          "customization_available": "**No Customization** – standard sizes only",
          "quality": "Medium",
          "warranty": "None",
          "expected_longevity": "2 - 3 Years",
          "wind_rating": "60 - 70 MPH (Dangerous)",
          "snow_load_capacity": "20lbs / sqft",
          "frame_material": "Cheap Aluminum Alloy",
          "steel_reinforced_baseplates": "No",
          "coating_standard": "Standard powder-coating (lower grade)",
          "shipping_insurance": "Free Shipping, Insurance Extra",
          "maintenance": "Yearly cleaning",
          "factory_direct": "Middlemen",
          "estimated_delivery": "7-15 Days",
          "isHighlight": false,
          "category": "Cheap Aluminum Pergola",
          "createdAt": "2025-09-28T05:00:12.157Z",
          "updatedAt": "2025-09-28T05:00:12.157Z",
          "publishedAt": "2025-09-28T05:00:12.178Z"
      },
      {
          "id": 17,
          "documentId": "b98pqvtke0ox3j44g9kz20iz",
          "name": "Mirador",
          "price": "$3,300 - $6,000",
          "included_technology": "None",
          "customization_available": "**No Customization** – standard sizes only",
          "quality": "Medium",
          "warranty": "2 Years",
          "expected_longevity": "5 Years",
          "wind_rating": "75 MPH",
          "snow_load_capacity": "13-18lbs / sqft (Dangerous)",
          "frame_material": "Cheap Aluminum Alloy",
          "steel_reinforced_baseplates": "No",
          "coating_standard": "Standard powder-coating (lower grade)",
          "shipping_insurance": "Free Shipping, Insurance Extra",
          "maintenance": "Yearly cleaning",
          "factory_direct": "Middlemen",
          "estimated_delivery": "7-15 Days",
          "isHighlight": false,
          "category": "Cheap Aluminum Pergola",
          "createdAt": "2025-09-28T05:01:50.216Z",
          "updatedAt": "2025-09-28T05:01:50.216Z",
          "publishedAt": "2025-09-28T05:01:50.233Z"
      },
      {
          "id": 19,
          "documentId": "ejglk7vh3rgn3ueb25vv6ic2",
          "name": "Yardistry",
          "price": "$1,500 - $8,000",
          "included_technology": "None",
          "customization_available": "**No Customization** – standard sizes only",
          "quality": "Good",
          "warranty": "1 Year",
          "expected_longevity": "2 - 5 Years",
          "wind_rating": "50 - 70 MPH (Dangerous)",
          "snow_load_capacity": "Varies",
          "frame_material": "Wood",
          "steel_reinforced_baseplates": "No",
          "coating_standard": "/",
          "shipping_insurance": "Free Shipping, Insurance Extra",
          "maintenance": "Regular cleaning + Painting",
          "factory_direct": "Middlemen",
          "estimated_delivery": "3-8 Weeks",
          "isHighlight": false,
          "category": "Cheap Aluminum Pergola",
          "createdAt": "2025-09-28T05:04:33.450Z",
          "updatedAt": "2025-09-28T05:04:33.450Z",
          "publishedAt": "2025-09-28T05:04:33.471Z"
      }
  ]
}

export const V2PergolasComparisonTable = ({
  data,
}: {
  data: ComparisonData
}) => {
  console.log("data", data)
  data = MOCK_DATA
  
  // 动态提取所有唯一分类并排序
  const categories = Array.from(
    new Set(data.items.map(item => item.category).filter(Boolean))
  ).sort((a:any, b:any) => {
    // 确保 "High Quality Pergolas" 排在前面
    if (a === "High Quality Pergolas") return -1
    if (b === "High Quality Pergolas") return 1
    return a.localeCompare(b)
  })

  // 按分类分组数据
  const groupedItems = categories.map(category => ({
    category,
    items: data.items.filter(item => item.category === category)
  }))

  // 获取所有项目用于渲染
  const allItems = data.items

  return (
    <div className={`w-full ${getBackgroundColor(data.backgroundColor)}`}>
      <div className="max-w-[1074px] pb-24 pt-16 mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#000000] mb-8 capitalize">
          {data.title}
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-[#ffffff] shadow-lg overflow-hidden table-fixed" style={{ minWidth: '1200px' }}>
            {/* Header */}
            <thead>
              <tr>
                <th className="bg-[#2f2a1e] w-[150px] p-4 text-left font-medium text-[#000000] border-[#8c877c]"></th>
                {groupedItems.map((group, groupIndex) => (
                  <th
                    key={group.category}
                    className={`${
                      group.category === "High Quality Pergolas" 
                        ? "bg-[#2f2a1e]" 
                        : "bg-[#57554f]"
                    } p-4 text-center font-medium text-[#ffffff] border-r border-[#8c877c]`}
                    colSpan={group.items.length}
                  >
                    {group.category}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="bg-white w-[150px] p-3 text-left font-medium text-[#000000] border-r border-[#8c877c]"></th>
                {allItems.map((item, index) => (
                  <th
                    key={item.id}
                    className={`${getColumnBg(
                      item,
                      index
                    )} p-3 text-center w-[150px] font-medium text-[#000000] border-r border-[#8c877c] text-sm last:border-r-0`}
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
                  <td className="bg-white p-4 font-medium text-[#000000] border-r border-[#8c877c] whitespace-pre-line w-[150px]">
                    {row.label}
                  </td>
                  {allItems.map((item, index) => (
                    <td
                      key={item.id}
                      className={`${getCellBg(item, index, row.key, rowIndex)} p-4 text-center w-[150px] ${
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
