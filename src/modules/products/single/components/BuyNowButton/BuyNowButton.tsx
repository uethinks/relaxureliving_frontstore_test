"use client"
import React from "react"
import { useReducer } from "react"

interface Props {
  property1: "primary-button-hover-l" | "primary-button-l"
  className: any
  text: string
  onClick: () => void
}

export const BuyNowButton = ({
  property1,
  className,
  text = "Get started",
  onClick,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "primary-button-l",
  })

  return (
    <button
      onClick={onClick}
      className={`all-[unset] box-border w-full flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative ${
        state.property1 === "primary-button-hover-l"
          ? "bg-[#0a3980]"
          : "bg-[#072f6c]"
      }`}
      onMouseLeave={() => {
        dispatch("mouse_leave")
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter")
      }}
    >
      <p className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-16 text-[color:var(--semantic-border-alternate)] font-medium leading-6 whitespace-nowrap relative">
        {text}
      </p>
    </button>
  )
}

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "primary-button-hover-l",
      }

    case "mouse_leave":
      return {
        ...state,
        property1: "primary-button-l",
      }
  }

  return state
}
