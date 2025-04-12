import React, { useReducer } from "react"

interface Props {
  property1: "primary-button-hover-l" | "primary-button-l"
  className?: string
  text: string
}

export const AddAccessories = ({
  property1,
  className,
  text = "Get started",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "primary-button-l",
  })

  return (
    <button
      className={`all-[unset] box-border flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative ${
        state.property1 === "primary-button-hover-l"
          ? "bg-[#0a3980]"
          : "bg-[#072f6c]"
      } ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave")
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter")
      }}
    >
      <span className="[font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-white font-medium leading-6 whitespace-nowrap relative">
        {text}
      </span>
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
