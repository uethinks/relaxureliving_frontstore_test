import { StorePrice, StoreProductVariant } from "@medusajs/types"

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

export type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}
// 定义 Image 类型
export type Image = {
  name: string;
  url: string;
  caption?: string;
  formats: {
    xlarge: {
      url: string;
    };
    large: {
      url: string;
    };
    small: {
      url: string;
    };
    xsmall: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
// 定义 HeroProps 类型
export type HeroProps = {
  Title: string;
  Description: string;
  BackgroundImage: Image;
  LeftButton: string;
  RightButton: string;
}
export type UsageScenario = {
  id: number;
  ScenarioName: string;
  LargeImage: Image;
  SmallImage: Image;
  subtitle?: string;
  description?: string;
  button?: string;
}
export type OurPergolaProps = {
  Title: string;
  SubTitle: string;
  Description: string;
  BottomButton: string;
  UsageScenarios: UsageScenario[];
}
export type featureSlider = {
  Title: string
  subtitle: string
  Description: string
  Image: Image
}

export type features = {
  Title: string
  SubTitle: string
  Description: string
  FeaturesSlider: featureSlider[]
}
export type AccessoriesSlider = {
  id: number
  title: string
  subtitle: string
  description: string
  largeImage: Image
  smallImage: Image
}
export type Accessories = {
  Title: string
  Subtitle: string
  Description: string
  slider: AccessoriesSlider[]
  Button: string
}

export type Blog = {
  title: string
  description: string
  slug: string
  cover: Image
  author: {
    avatar: Image
    name: string
  }
  category: {
    name: string
  }
}
export type HomepageBlog = {
  Title: string
  Subtitle: string
  Description: string
  articles: Blog[]
} 

export type PergolaSize = {
  width: number
  length: number
}

export type selectedProductVariant = {
  productVarant: StoreProductVariant | null
  quantity: number
}
export type selectedProducts = selectedProductVariant[]

// 产品信息类型
export type ProductInformation = {
  id: number
  productTitle: string
  productSubtitle: string
  productDescription: string
  urlLink: string
}

// 相关产品ID类型
export type RelatedProductIds = {
  id: number
  pergolaId: string
  heaterId: string
  shadesId: string
  glassDoorId: string
}

// 描述标签内容类型
export type TextContentType = "paragraph" | "heading" | "list"
export type MediaContentType = "quote" | "code" | "image"

export type TextNode = {
  type: "text"
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export type TextContent = {
  type: TextContentType
  children: TextNode[]
  level?: number
  format?: string
}

export type MediaContent = {
  type: MediaContentType
  children: TextNode[]
  url?: string
  alt?: string
  caption?: string
  image?: {
    url: string
    alternativeText?: string
    caption?: string
  }
}

export type DescriptionContent = TextContent | MediaContent
export type multiDescription = {
  id: number
  multiDescriptions: string
}

// 描述标签类型
export type DescriptionTab = {
  id: number
  title: string
  image: Image
  descriptions: multiDescription[]
}

// 安装步骤类型
export type InstallationStep = {
  id: number
  numberOfButton: string
  tittle: string
  description: string
  percentage: number
}

// 组装说明类型
export type PutItTogether = {
  id: number
  title: string
  descriptions: multiDescription[]
  youtubeCode: string
  youtubeButtons: InstallationStep[]
}

// 产品特性类型
export type ProductFeature = {
  id: number
  title: string
  description: string
  image: Image
}

// 产品特性部分类型
export type ProductFeatures = {
  id: number
  title: string
  description: string
  youtubeCode: string
  featureItem: ProductFeature[]
}

// 图标内容类型
export type IconContent = {
  id: number
  content: string
  icon: Image
}

// 特性项目类型
export type FeatureItem = {
  id: number
  title: string
  description: string
  notJustPrettyFaceIconContent: IconContent[]
}

// 特性部分类型
export type NotJustAPrettyFace = {
  id: number
  title: string
  notJustAPrettyFaceItem: FeatureItem[]
}

// 配件项目类型
export type ProductAccessoryItem = {
  id: number
  description: string
  title: string
  image: Image
}

// 产品配件类型
export type ProductAccessories = {
  id: number
  title: string
  subtitle: string
  description: string
  productAccessoryItem: ProductAccessoryItem[]
}

// 承诺项目类型
export type PromiseItem = {
  id: number
  Title: string
  Description: string
  Icon: Image
}

// 重要事项类型
export type BoringButImportantStuff = {
  id: number
  Title: string
  Description: string
  Promise: PromiseItem[]
}

export type OneHundredDayRiskFreeTrial = {
  id: number
  Title: string
  short_description: any[]
  popup_content: any[]
  button: string
}

interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

interface FAQAnswer {
  id: number
  question: string
  Answer: string
}
export type SampleKit = {
  id: number
  product_image: Image
  title: string
  description: string
  button_name: string
  price_info: string
  product_id: string
}

// 主数据类型
export type PergolaData = {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    name: string
    productInformations: ProductInformation[]
    relatedProductIds: RelatedProductIds
    descriptionTab: DescriptionTab
    putItTogether: PutItTogether
    productFeatures: ProductFeatures
    notJustAPrettyFace: NotJustAPrettyFace
    productAccessories: ProductAccessories
    boringButImportantStuff: BoringButImportantStuff
    credential: AwardBlockProps
    one_hundred_day_risk_free_trial: OneHundredDayRiskFreeTrial
    product_images: Image[]
    product_overview: ProductOverview
    faq: FAQData
    get_in_touch: {
      title: string
      button_name: string
    }
    sample_kit: SampleKit
}

export type AwardBlockProps = {
  title: string
  images: Image[]
  topDescription: string
  showDescription: boolean
}

export type ReviewType = {
  id: number
  image: Image[]
}

export type ProductOverview = {
  id: number
  shot_description: string
  title: string
  product_overview_description: any
  pergola_size_technical_specs: any
  shipping_and_returns: any
  fast_easy_assembly: {
    title?: string
    subtitle?: string
    descriptions?: multiDescription[]
    youtubeCode?: string
    youtubeButtons?: InstallationStep[]
  }
  onehundred_days_free_risk: any
  lifetime_warranty: any
}
