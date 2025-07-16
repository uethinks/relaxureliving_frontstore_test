"use client"

export default function ChatButton() {
  return (
    <button
      onClick={() => (window as any).tidioChatApi?.open()}
      className="bg-[#F6AF1F] hover:bg-[#fdce6f] text-black px-8 py-4 rounded-md"
    >
      Meet a Relaxure Expert
    </button>
  )
}
