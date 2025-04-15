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
  };
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