import { redirect } from "next/navigation"

export default function NotFound() {
  // 自动重定向到首页
  redirect("/")
}
