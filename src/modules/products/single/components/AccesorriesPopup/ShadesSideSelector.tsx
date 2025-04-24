import React, { useEffect } from "react"

interface ShadesSideSelectorProps {
  onSideSelect: (sides: string[]) => void
  selectedSides: string[]
  shortSideLength?: string
  longSideLength?: string
}

const ShadesSideSelector: React.FC<ShadesSideSelectorProps> = ({
  onSideSelect,
  selectedSides,
  shortSideLength = '13"',
  longSideLength = '19"',
}) => {
  const isSquare = shortSideLength === longSideLength

  const handleSideClick = (side: string | number) => {
    let newSelectedSides: string[]

    if (isSquare) {
      // For square case, handle number selection (1-4)
      const count = typeof side === "number" ? side : 1
      // Check if the same number is clicked again
      if (selectedSides.length === count) {
        newSelectedSides = [] // Deselect if clicking the same number
      } else {
        newSelectedSides = Array(count).fill("left")
      }
    } else {
      // For rectangle case, handle side selection
      const sideStr = side as string
      const isSelected = selectedSides.includes(sideStr)
      if (isSelected) {
        newSelectedSides = selectedSides.filter((s) => s !== sideStr)
      } else {
        newSelectedSides = [...selectedSides, sideStr]
      }
    }

    onSideSelect(newSelectedSides)
  }

  if (isSquare) {
    return (
      <div className="flex flex-col items-start w-full max-w-[400px]">
        <h3 className="text-[16px] lg:text-lg text-[#343A40] [font-family:'Montserrat',sans-serif] font-medium mb-2 lg:mb-6">
          How many shades do you want?
        </h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((number) => (
            <button
              key={number}
              onClick={() => handleSideClick(number)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                selectedSides.length === number
                  ? "border-[#072F6C] bg-[#DCE7F8] text-[#072F6C]"
                  : "border-[#E9E9E9] text-[#69727A]"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start w-full max-w-[400px]">
      <h3 className="text-[16px] lg:text-lg text-[#343A40] [font-family:'Montserrat',sans-serif] font-medium mb-2 lg:mb-6">
        Which side do you want the shades?
      </h3>
      <div className="relative flex justify-center items-center gap-2">
        {/* Left Short Rectangle */}
        <button
          onClick={() => handleSideClick("left")}
          className={`w-[70px] h-[100px] border rounded transition-all flex flex-col items-center justify-center ${
            selectedSides.includes("left")
              ? "border-[#072F6C] bg-[#DCE7F8]"
              : "border-[#E9E9E9]"
          }`}
        >
          <div className="text-[14px] font-medium [font-family:'Montserrat',sans-serif]">
            Short
          </div>
          <div className="text-[14px] font-medium text-[#69727A]">
            {shortSideLength}
          </div>
        </button>

        {/* Middle Column with Long Rectangles */}
        <div className="flex flex-col gap-2 h-[100px]">
          <button
            onClick={() => handleSideClick("top")}
            className={`w-[140px] h-[50px] border rounded transition-all flex flex-col items-center justify-center ${
              selectedSides.includes("top")
                ? "border-[#072F6C] bg-[#DCE7F8]"
                : "border-[#E9E9E9]"
            }`}
          >
            <div className="text-[14px] font-medium [font-family:'Montserrat',sans-serif]">
              Long
            </div>
            <div className="text-[14px] font-medium text-[#69727A]">
              {longSideLength}
            </div>
          </button>

          <button
            onClick={() => handleSideClick("bottom")}
            className={`w-[140px] h-[50px] border rounded transition-all flex flex-col items-center justify-center ${
              selectedSides.includes("bottom")
                ? "border-[#072F6C] bg-[#DCE7F8]"
                : "border-[#E9E9E9]"
            }`}
          >
            <div className="text-[14px] font-medium [font-family:'Montserrat',sans-serif]">
              Long
            </div>
            <div className="text-[14px] font-medium text-[#69727A]">
              {longSideLength}
            </div>
          </button>
        </div>

        {/* Right Short Rectangle */}
        <button
          onClick={() => handleSideClick("right")}
          className={`w-[70px] h-[100px] border rounded transition-all flex flex-col items-center justify-center ${
            selectedSides.includes("right")
              ? "border-[#072F6C] bg-[#DCE7F8]"
              : "border-[#E9E9E9]"
          }`}
        >
          <div className="text-[14px] font-medium [font-family:'Montserrat',sans-serif]">
            Short
          </div>
          <div className="text-[14px] font-medium text-[#69727A]">
            {shortSideLength}
          </div>
        </button>
      </div>
    </div>
  )
}

export default ShadesSideSelector
