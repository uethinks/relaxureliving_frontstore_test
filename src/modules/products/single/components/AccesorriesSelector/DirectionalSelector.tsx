import React from "react"

interface Props {
  title: string
  selectedSides: string[]
  onSideSelect: (accessoryType: string, side: string) => void
  pergolaSize: {
    width: number
    length: number
  }
  accessoryType: string
}

export const DirectionalSelector: React.FC<Props> = ({
  title,
  selectedSides,
  onSideSelect,
  pergolaSize,
  accessoryType,
}) => {
  return (
    <div className="mb-4">
      <div className="flex flex-col items-start w-full">
        {/* <h3 className="text-[#343A40] text-[16px] font-semibold mb-4">
          {title}
        </h3> */}
        <div className="relative flex justify-center items-center gap-1 w-full mt-2">
          {/* Left side (short) */}
          <button
            onClick={() => onSideSelect(accessoryType, "left")}
            className={`w-[25%] h-[130px] border transition-all flex flex-col items-center justify-center ${
              selectedSides.includes("left")
                ? "border-primary bg-primary-light"
                : "border-white"
            }`}
          >
            <div className="text-base font-semibold">Left</div>
            <div className="text-base font-semibold text-[#69727A]">
              {pergolaSize.width}"
            </div>
          </button>

          <div className="flex flex-col justify-between gap-2 w-[50%]">
            {/* Top side (long) */}
            <button
              onClick={() => onSideSelect(accessoryType, "top")}
              className={`w-full h-[60px] border transition-all flex flex-col items-center justify-center ${
                selectedSides.includes("top")
                  ? "border-primary bg-primary-light"
                  : "border-white"
              }`}
            >
              <div className="text-base font-semibold">Front</div>
              <div className="text-base font-semibold text-[#69727A]">
                {pergolaSize.length}"
              </div>
            </button>

            {/* Bottom side (long) */}
            <button
              onClick={() => onSideSelect(accessoryType, "bottom")}
              className={`w-full h-[60px] border transition-all flex flex-col items-center justify-center ${
                selectedSides.includes("bottom")
                  ? "border-primary bg-primary-light"
                  : "border-white"
              }`}
            >
              <div className="text-base font-semibold">Back</div>
              <div className="text-base font-semibold text-[#69727A]">
                {pergolaSize.length}"
              </div>
            </button>
          </div>

          {/* Right side (short) */}
          <button
            onClick={() => onSideSelect(accessoryType, "right")}
            className={`w-[25%] h-[130px] border transition-all flex flex-col items-center justify-center ${
              selectedSides.includes("right")
                ? "border-primary bg-primary-light"
                : "border-white"
            }`}
          >
            <div className="text-base font-semibold">Right</div>
            <div className="text-base font-semibold text-[#69727A]">
              {pergolaSize.width}"
            </div>
          </button>
        </div>
      </div>
    </div>
  )
} 