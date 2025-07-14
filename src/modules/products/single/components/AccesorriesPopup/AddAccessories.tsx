import React from "react"
import { useReducer } from "react"

interface Props {
  property1: "primary-button-hover-l" | "primary-button-l"
  className?: any
  buttonClassName: any
  text: string
  addAccessory: () => void
  disabled?: boolean
}

export const AddAccessories = ({
  property1,
  className,
  buttonClassName,
  text = "Get started",
  addAccessory,
  disabled = false,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "primary-button-l",
  })

  return (
    <button
      onClick={addAccessory}
      className={`all-[unset] box-border flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative ${
        state.property1 === "primary-button-hover-l"
          ? "hover:bg-[#fdce6f]"
          : "bg-[#F6AF1F]"
      } ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave")
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter")
      }}
    >
      <span
        className={`all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-black leading-6 whitespace-nowrap relative ${buttonClassName}`}
      >
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
