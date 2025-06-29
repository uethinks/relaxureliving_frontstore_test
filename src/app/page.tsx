import { Homepage as Homepage } from "@modules/home/homepage/page"

// 配置静态生成
export const dynamic = "force-static"
export const revalidate = 3600 // 每小时重新验证一次

export default async function Home() {
  return <Homepage />
}
