import { StorePrice } from "@medusajs/types"

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