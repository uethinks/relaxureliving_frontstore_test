import React from "react"

interface Props {
  property1: "variant-2" | "default"
  overlapClassName: any
}

export const AssemblyContainer = ({
  property1,
  overlapClassName,
}: Props): JSX.Element => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#343a40] text-[length:var(--heading-2-font-size)]">
        Welcome to outdoor living, perfected!
      </div>
      <div
        className={`flex flex-row justify-between w-full relative ${
          property1 === "default" ? "overflow-hidden" : ""
        }`}
      >
        <div className="w-[50%] flex flex-wrap items-start gap-2">
          <div
            className={`w-[49%] flex flex-col items-center gap-10 p-5 rounded-[20px] relative ${
              property1 === "variant-2" ? "border-2 border-solid" : ""
            } ${property1 === "variant-2" ? "border-[#e9e9e9]" : ""} ${
              property1 === "default"
                ? "shadow-[30px_142px_85px_#0000000d,49px_63px_63px_#00000017]"
                : ""
            } ${property1 === "default" ? "bg-[#072f6c]" : "bg-white"}`}
          >
            <div className="w-1/2 flex items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] overflow-hidden justify-center relative">
              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] ml-[-55.00px] -rotate-180 h-0.5 rounded-[20px] relative" />

              <div className="w-[60px] h-[101px] relative">
                <div className="w-[84px] -left-3 top-4 h-[59px] relative">
                  <div className="w-[55px] left-[15px] top-0.5 h-[55px] rounded-[27.5px] bg-white absolute" />

                  <div className="w-[84px] flex left-0 flex-col items-center top-0 gap-2.5 px-0 py-2.5 justify-center absolute">
                    <div className="[font-family:'Montserrat',Helvetica] self-stretch mt-[-1.00px] tracking-[0] text-[28px] text-black font-medium text-center leading-[39.2px] relative">
                      01
                    </div>
                  </div>
                </div>
              </div>

              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] h-0.5 rounded-[20px] relative" />
            </div>

            <div className="w-1/2 flex flex-col items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] relative">
              <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] px-2.5 py-0 justify-center relative">
                <div
                  className={`[font-family:'Merriweather',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[26px] font-bold leading-[36.4px] whitespace-nowrap relative ${
                    property1 === "default" ? "text-white" : "text-[#343a40]"
                  }`}
                >
                  Installation
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
                <p
                  className={`font-relaxure-sub-heading-18 mt-[-1.00px] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] text-[length:var(--relaxure-sub-heading-18-font-size)] [font-style:var(--relaxure-sub-heading-18-font-style)] flex-1 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-center leading-[var(--relaxure-sub-heading-18-line-height)] relative ${
                    property1 === "default"
                      ? "text-[#fbfbfb]"
                      : "text-[#343a40]"
                  }`}
                >
                  Our flagship pergola with motorized louvers
                </p>
              </div>
            </div>
          </div>

          <div
            className={`w-[49%] flex flex-col items-center gap-10 p-5 rounded-[20px] relative ${
              property1 === "default" ? "border-2 border-solid" : ""
            } ${property1 === "default" ? "border-[#e9e9e9]" : ""} ${
              property1 === "variant-2" ? "shadow-shadow-cards-relaxure" : ""
            } ${property1 === "default" ? "bg-white" : "bg-[#072f6c]"}`}
          >
            <div className="w-1/2 flex items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] overflow-hidden justify-center relative">
              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] ml-[-55.00px] -rotate-180 h-0.5 rounded-[20px] relative" />

              <div className="w-[60px] h-[101px] relative">
                <div className="w-[84px] -left-3 top-4 h-[59px] relative">
                  <div className="w-[55px] left-[15px] top-0.5 h-[55px] rounded-[27.5px] bg-white absolute" />

                  <div className="w-[84px] flex left-0 flex-col items-center top-0 gap-2.5 px-0 py-2.5 justify-center absolute">
                    <div className="[font-family:'Montserrat',Helvetica] self-stretch mt-[-1.00px] tracking-[0] text-[28px] text-black font-medium text-center leading-[39.2px] relative">
                      02
                    </div>
                  </div>
                </div>
              </div>

              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] h-0.5 rounded-[20px] relative" />
            </div>

            <div className="w-1/2 flex flex-col items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] relative">
              <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] px-2.5 py-0 justify-center relative">
                <div
                  className={`[font-family:'Merriweather',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[26px] font-bold leading-[36.4px] whitespace-nowrap relative ${
                    property1 === "default" ? "text-[#343a40]" : "text-white"
                  }`}
                >
                  Installation
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
                <p
                  className={`font-relaxure-sub-heading-18 mt-[-1.00px] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] text-[length:var(--relaxure-sub-heading-18-font-size)] [font-style:var(--relaxure-sub-heading-18-font-style)] flex-1 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-center leading-[var(--relaxure-sub-heading-18-line-height)] relative ${
                    property1 === "default" ? "text-[#343a40]" : "text-white"
                  }`}
                >
                  Our flagship pergola with motorized louvers
                </p>
              </div>
            </div>
          </div>

          <div className="w-[49%] border-2 border-solid border-[#e9e9e9] flex flex-col items-center gap-10 p-5 rounded-[20px] bg-white relative">
            <div className="w-full flex items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] overflow-hidden justify-center relative">
              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] ml-[-55.00px] -rotate-180 h-0.5 rounded-[20px] relative" />

              <div className="w-[60px] h-[101px] relative">
                <div className="w-[84px] -left-3 top-4 h-[59px] relative">
                  <div className="w-[55px] left-[15px] top-0.5 h-[55px] rounded-[27.5px] bg-white absolute" />

                  <div className="w-[84px] flex left-0 flex-col items-center top-0 gap-2.5 px-0 py-2.5 justify-center absolute">
                    <div className="[font-family:'Montserrat',Helvetica] self-stretch mt-[-1.00px] tracking-[0] text-[28px] text-black font-medium text-center leading-[39.2px] relative">
                      04
                    </div>
                  </div>
                </div>
              </div>

              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] h-0.5 rounded-[20px] relative" />
            </div>

            <div className="w-1/2 flex flex-col items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] relative">
              <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] px-2.5 py-0 justify-center relative">
                <div className="[font-family:'Merriweather',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[26px] text-[#343a40] font-bold leading-[36.4px] whitespace-nowrap relative">
                  Installation
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
                <p className="font-relaxure-sub-heading-18 mt-[-1.00px] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] text-[length:var(--relaxure-sub-heading-18-font-size)] [font-style:var(--relaxure-sub-heading-18-font-style)] text-[#343a40] flex-1 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-center leading-[var(--relaxure-sub-heading-18-line-height)] relative">
                  Our flagship pergola with motorized louvers
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-solid border-[#e9e9e9] w-[49%] flex flex-col items-center gap-10 p-5 rounded-[20px] bg-white relative">
            <div className="w-1/2 flex items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] overflow-hidden justify-center relative">
              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] ml-[-55.00px] -rotate-180 h-0.5 rounded-[20px] relative" />

              <div className="w-[60px] h-[101px] relative">
                <div className="w-[84px] -left-3 top-4 h-[59px] relative">
                  <div className="w-[55px] left-[15px] top-0.5 h-[55px] rounded-[27.5px] bg-white absolute" />

                  <div className="w-[84px] flex left-0 flex-col items-center top-0 gap-2.5 px-0 py-2.5 justify-center absolute">
                    <div className="[font-family:'Montserrat',Helvetica] self-stretch mt-[-1.00px] tracking-[0] text-[28px] text-black font-medium text-center leading-[39.2px] relative">
                      03
                    </div>
                  </div>
                </div>
              </div>

              <div className="[background:linear-gradient(117deg,rgba(206,205,205,1)_0%,rgba(255,255,255,0)_100%)] w-[165px] h-0.5 rounded-[20px] relative" />
            </div>

            <div className="w-1/2 flex flex-col items-center mr-[-16.00px] gap-2.5 flex-[0_0_auto] ml-[-16.00px] relative">
              <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] px-2.5 py-0 justify-center relative">
                <div className="[font-family:'Merriweather',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[26px] text-[#343a40] font-bold leading-[36.4px] whitespace-nowrap relative">
                  Installation
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
                <p className="font-relaxure-sub-heading-18 mt-[-1.00px] tracking-[var(--relaxure-sub-heading-18-letter-spacing)] text-[length:var(--relaxure-sub-heading-18-font-size)] [font-style:var(--relaxure-sub-heading-18-font-style)] text-[#343a40] flex-1 font-[number:var(--relaxure-sub-heading-18-font-weight)] text-center leading-[var(--relaxure-sub-heading-18-line-height)] relative">
                  Our flagship pergola with motorized louvers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-[45%] h-[631px]`}>
          <div
            className={`bg-cover rounded-lg h-[642px] bg-[50%_50%] relative ${
              property1 === "variant-2" ? "left-px" : ""
            } ${
              property1 === "variant-2"
                ? "bg-[url(https://c.animaapp.com/m9bkeusq7PdKGc/img/-o0a8457-2.png)]"
                : "bg-[url(https://c.animaapp.com/m9bkeusq7PdKGc/img/-o0a8457-3.png)]"
            } ${property1 === "variant-2" ? overlapClassName : undefined}`}
          >
            <img
              className={`w-[114px] h-[127px] absolute ${
                property1 === "variant-2" ? "left-[301px]" : "left-[302px]"
              } ${property1 === "variant-2" ? "top-[253px]" : "top-[258px]"}`}
              alt="Polygon"
              src="https://c.animaapp.com/m9bkeusq7PdKGc/img/polygon-1.svg"
            />
          </div>
        </div>

        {property1 === "default" && (
          <div className="absolute w-1/2 h-[631px] top-0 left-[1358px]">
            <div
              className={`relative h-[642px] top-[7923px] left-[-48228px] bg-[url(https://c.animaapp.com/m9bkeusq7PdKGc/img/-o0a8457-4.png)] bg-cover bg-[50%_50%] ${overlapClassName}`}
            >
              <img
                className="absolute w-[163px] h-[163px] top-0 left-0"
                alt="Polygon"
                src="https://c.animaapp.com/m9bkeusq7PdKGc/img/polygon-1.svg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export const Assembly = (): JSX.Element => {
  return (
    <AssemblyContainer
      overlapClassName="!left-[-3459px] !top-[-8695px]"
      property1="default"
    />
  )
}
