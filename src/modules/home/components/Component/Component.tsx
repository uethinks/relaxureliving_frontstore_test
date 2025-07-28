"use client"
import PropTypes from "prop-types"
import React from "react"
import { useReducer } from "react"
import { useRouter } from "next/navigation"

const PRIMARY_BUTTON_L = "primary-button-l"
const PRIMARY_BUTTON_HOVER_L = "primary-button-hover-l"

interface Props {
  property1: "primary-button-hover-l" | "primary-button-l"
  className: any
  buttonClassName: any
  text: string
  onClick?: () => void
}

export const Component = ({
  property1,
  className,
  buttonClassName,
  text = "Get started",
  onClick,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || PRIMARY_BUTTON_L,
  })

  return (
    <button
      className={`all-[unset] box-border w-[200px] flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative ${
        state.property1 === PRIMARY_BUTTON_HOVER_L
          ? "hover:bg-[#fdce6f]"
          : "bg-[#F6AF1F]"
      } ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave")
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter")
      }}
      onClick={onClick}
    >
      <span
        className={`
          all-[unset] box-border [font-family:'Montserrat',Helvetica] 
          w-fit tracking-[0] text-base text-black font-medium 
          leading-6 whitespace-nowrap relative ${buttonClassName}
        `}
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
        property1: PRIMARY_BUTTON_HOVER_L,
      }

    case "mouse_leave":
      return {
        ...state,
        property1: PRIMARY_BUTTON_L,
      }
  }

  return state
}

Component.propTypes = {
  property1: PropTypes.oneOf([PRIMARY_BUTTON_HOVER_L, PRIMARY_BUTTON_L]),
  text: PropTypes.string,
}
