"use client"
import React from "react"
import { Assembly } from "./PergolaInformations/Assembly"
import { PergolaData } from "@/types/global"

export const AssemblyContent = ({
  pergolaData,
}: {
  pergolaData: PergolaData
}) => {
  return (
    <div id="assembly-content" className="w-full">
      <Assembly pergolaData={pergolaData} />
    </div>
  )
}
