"use client"
import PropTypes from "prop-types"
import React from "react"
import { useReducer } from "react"
import { useRouter } from "next/navigation"

interface Props {
  property1: "primary-button-hover-l" | "primary-button-l"
  className: any
  buttonClassName: any
  text: string
}

export const Component = ({
  property1,
  className,
  buttonClassName,
  text = "Get started",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "primary-button-l",
  })
  const pergolaProductId = "prod_01JPP0SGBQZSKXS0B9EXN7DTT3"
  const router = useRouter()
  const goToPergolaProduct = () => {
    router.push(`/us/products/${pergolaProductId}`)
  }
  return (
    <button
      className={`all-[unset] box-border w-[200px] flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative ${
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
      onClick={goToPergolaProduct}
    >
      <span
        className={`all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[color:var(--semantic-border-alternate)] font-medium leading-6 whitespace-nowrap relative ${buttonClassName}`}
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

Component.propTypes = {
  property1: PropTypes.oneOf(["primary-button-hover-l", "primary-button-l"]),
  text: PropTypes.string,
}
