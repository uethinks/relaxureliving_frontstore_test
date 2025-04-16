"use client"

import { useRouter } from "next/navigation"

export default function AgreeButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      Agree and continue
    </button>
  )
}
