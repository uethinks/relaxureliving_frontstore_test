"use client"

export default function ChatButton() {
  return (
    <button
      onClick={() => (window as any).tidioChatApi?.open()}
      className="bg-[#072F6C] text-white px-8 py-4 rounded-md hover:bg-blue-800"
    >
      Meet a Relaxure Expert
    </button>
  )
}
