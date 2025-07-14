"use client"

import { useRouter } from "next/navigation"

export default function AgreeButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="bg-[#F6AF1F] hover:bg-[#fdce6f]  text-black px-4 py-2 rounded-md transition-colors"
    >
      Agree and continue
    </button>
  )
}
