interface GlassdoorSideSelectorProps {
  onSideSelect: (sides: string[]) => void
  selectedSides: string[]
  shortSideLength: string
  longSideLength: string
}

export const GlassdoorSideSelector: React.FC<GlassdoorSideSelectorProps> = ({
  onSideSelect,
  selectedSides,
  shortSideLength = '13"',
  longSideLength = '19"',
}) => {
  const handleSideClick = (side: string) => {
    const isSelected = selectedSides.includes(side)
    let newSelectedSides

    if (isSelected) {
      newSelectedSides = selectedSides.filter((s) => s !== side)
    } else {
      newSelectedSides = [...selectedSides, side]
    }

    onSideSelect(newSelectedSides)
  }

  return (
    <div className="flex flex-col items-start w-full max-w-[400px]">
      <h3 className="text-lg font-medium mb-6">
        Which side do you want the glass door?
      </h3>
      <div className="relative flex justify-center items-center gap-2">
        {/* Left Short Rectangle */}
        <button
          onClick={() => handleSideClick("left")}
          className={`w-[50px] h-[80px] border rounded transition-all flex flex-col items-center justify-center ${
            selectedSides.includes("left")
              ? "border-[#072F6C] bg-[#DCE7F8]"
              : "border-[#E9E9E9]"
          }`}
        >
          <div className="text-xs font-medium">Short</div>
          <div className="text-[10px] text-[#69727A]">{shortSideLength}</div>
        </button>

        {/* Middle Column with Long Rectangles */}
        <div className="flex flex-col gap-2 h-[80px]">
          <button
            onClick={() => handleSideClick("top")}
            className={`w-[120px] h-[50px] border rounded transition-all flex flex-col items-center justify-center ${
              selectedSides.includes("top")
                ? "border-[#072F6C] bg-[#DCE7F8]"
                : "border-[#E9E9E9]"
            }`}
          >
            <div className="text-xs font-medium">Long</div>
            <div className="text-[10px] text-[#69727A]">{longSideLength}</div>
          </button>

          <button
            onClick={() => handleSideClick("bottom")}
            className={`w-[120px] h-[50px] border rounded transition-all flex flex-col items-center justify-center ${
              selectedSides.includes("bottom")
                ? "border-[#072F6C] bg-[#DCE7F8]"
                : "border-[#E9E9E9]"
            }`}
          >
            <div className="text-xs font-medium">Long</div>
            <div className="text-[10px] text-[#69727A]">{longSideLength}</div>
          </button>
        </div>

        {/* Right Short Rectangle */}
        <button
          onClick={() => handleSideClick("right")}
          className={`w-[50px] h-[80px] border rounded transition-all flex flex-col items-center justify-center ${
            selectedSides.includes("right")
              ? "border-[#072F6C] bg-[#DCE7F8]"
              : "border-[#E9E9E9]"
          }`}
        >
          <div className="text-xs font-medium">Short</div>
          <div className="text-[10px] text-[#69727A]">{shortSideLength}</div>
        </button>
      </div>
    </div>
  )
}
