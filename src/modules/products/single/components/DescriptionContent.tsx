import React from "react"
import { Description } from "./PergolaInformations/Description"
import { PergolaData } from "@/types/global"

export const DescriptionContent = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}) => {
  const descriptionTab = pergolaData.descriptionTab
  return (
    <div id="description-content" className="w-full mt-5 lg:mt-[80px]">
      <Description pergolaData={pergolaData} />
    </div>
  )
}
