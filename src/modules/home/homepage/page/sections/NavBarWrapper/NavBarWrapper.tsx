"use client"
import React, { useState } from "react"
import { Component } from "../../../../components/Component"
import Link from "next/link"

export const NavBarWrapper = ({
  isFixed = true,
  isHomePage = false,
}: {
  isFixed?: boolean
  isHomePage?: boolean
}): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    e.preventDefault()
    if (isHomePage) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.location.href = `/#${section}`
    }
  }

  return (
    <div
      className={`w-full max-w-[1248px] flex flex-col items-start gap-2.5 py-10  ${
        isFixed
          ? "px-[132px] lg:fixed lg:top-0 lg:left-1/2 lg:-translate-x-1/2"
          : "px-[52px]"
      } z-50`}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-col w-full h-[75px] items-center justify-center gap-2.5 p-5 relative bg-gray-100 bg-opacity-80 rounded-[30px] backdrop-blur-[27.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]">
        <div className="justify-between self-stretch w-full flex-[0_0_auto] mt-[-4.50px] mb-[-4.50px] flex items-center relative">
          <Link href="/">
            <img
              className="relative w-[76.45px] h-12"
              alt="Logo"
              src="/img/logo.svg"
            />
          </Link>

          <div className="flex w-[200px] items-center justify-end gap-5 relative">
            <div className="flex items-center justify-end gap-2.5 relative flex-1 grow ml-[-20.00px]">
              <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                <a
                  href="#pergola"
                  onClick={(e) => handleScroll(e, "pergola")}
                  className="relative w-[138px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6"
                >
                  Our pergola
                </a>
              </div>

              <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto]">
                <a
                  href="#features"
                  onClick={(e) => handleScroll(e, "features")}
                  className="relative w-[139px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6"
                >
                  Features
                </a>
              </div>

              <div className="flex w-[101px] items-center justify-center gap-2.5 px-0 py-2.5 relative">
                <a
                  href="#accessories"
                  onClick={(e) => handleScroll(e, "accessories")}
                  className="relative w-[139px] mt-[-1.00px] ml-[-19.00px] mr-[-19.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6"
                >
                  Accessories
                </a>
              </div>
            </div>

            <a href="#contact" onClick={(e) => handleScroll(e, "contact")}>
              <Component
                className="!mr-[-1.00px]"
                property1="primary-button-l"
                text="Contact us"
                buttonClassName="nav-contact-us"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex flex-col w-full items-center justify-center relative">
        <div className="w-full h-[60px] flex items-center justify-between px-4 bg-[#ffffffcc] rounded-[30px] border border-solid border-[#ffffff] backdrop-blur-[27.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]">
          <Link href="/">
            <img
              className="relative w-[60px] h-8"
              alt="Logo"
              src="/img/logo.svg"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-[#343a40]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="w-full mt-2 bg-[#ffffffcc] rounded-[30px] border border-solid border-[#ffffff] backdrop-blur-[27.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(27.6px)_brightness(100%)]">
            <div className="flex flex-col items-center py-4 space-y-4">
              <a
                href="#pergola"
                onClick={(e) => {
                  handleScroll(e, "pergola")
                  setIsMenuOpen(false)
                }}
                className="w-full text-center py-2 [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base"
              >
                Our pergola
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  handleScroll(e, "features")
                  setIsMenuOpen(false)
                }}
                className="w-full text-center py-2 [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base"
              >
                Features
              </a>
              <a
                href="#accessories"
                onClick={(e) => {
                  handleScroll(e, "accessories")
                  setIsMenuOpen(false)
                }}
                className="w-full text-center py-2 [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base"
              >
                Accessories
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  handleScroll(e, "contact")
                  setIsMenuOpen(false)
                }}
                className="w-full flex justify-center"
              >
                <Component
                  className="!mr-[-1.00px]"
                  property1="primary-button-l"
                  text="Contact us"
                  buttonClassName="nav-contact-us"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
