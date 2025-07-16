import { Homepage as Homepage } from "@modules/home/homepage/page"
import { Metadata } from "next"

// 配置静态生成
export const dynamic = "force-static"
export const revalidate = 3600 // 每小时重新验证一次

// 首页特定的 metadata
export const metadata: Metadata = {
  title: `World's Smartest Aluminium Pergola Kit, Starting at $5220 | Relaxure`,
  description: `Lifetime Warranty, Built to Last for 30+ Years - Buy Aluminum Pergola Kits for
Your Backyard, Patio or Deck-Free Shipping-100-Day Trial`,
  openGraph: {
    title: `World's Smartest Aluminium Pergola Kit, Starting at $5220 | Relaxure`,
    description: `Lifetime Warranty, Built to Last for 30+ Years - Buy Aluminum Pergola Kits for
Your Backyard, Patio or Deck-Free Shipping-100-Day Trial`,
    url: "/",
  },
  keywords: [
    "pergola",
    "outdoor shade",
    "smart home",
    "relaxure",
    "aluminum pergola",
  ],
}

export default async function Home() {
  return <Homepage />
}
