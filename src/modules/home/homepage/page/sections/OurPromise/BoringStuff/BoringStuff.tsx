import React from "react"

interface Props {
  property1: "assembly" | "warranty" | "delivery" | "build-the-last"
  className?: any
  element?: string
  october?: string
  subtract?: string
  vectorClassName?: any
  vector?: string
  img?: string
  vector1?: string
  vector2?: string
  star?: string
}

export const BoringStuff = ({
  property1,
  className,
  element = "https://c.animaapp.com/bEMo3Gov/img/22@2x.png",
  october = "https://c.animaapp.com/bEMo3Gov/img/october@2x.png",
  subtract = "https://c.animaapp.com/bEMo3Gov/img/subtract.svg",
  vectorClassName,
  vector = "/img/vector-15.svg",
  img = "https://c.animaapp.com/bEMo3Gov/img/vector-7.svg",
  vector1 = "https://c.animaapp.com/bEMo3Gov/img/vector-14.svg",
  vector2 = "https://c.animaapp.com/bEMo3Gov/img/vector.svg",
  star = "https://c.animaapp.com/bEMo3Gov/img/star-1.svg",
}: Props): JSX.Element => {
  return (
    <div
      className={`w-4/5 lg:w-[48%] inline-flex items-start gap-[57px] relative ${className}`}
    >
      <div className="border border-solid border-[#e8e8ea] w-full flex flex-col items-start gap-2.5 p-5 rounded-[20px] bg-[#ffffff] relative">
        <div className="w-full flex self-stretch flex-col items-center gap-6 flex-[0_0_auto] relative">
          <div className="w-full flex self-stretch flex-col items-start gap-4 flex-[0_0_auto] justify-center relative">
            <div className="border border-solid border-[#e8e8ea] inline-flex mt-[-1.00px] items-center gap-2.5 ml-[-1.00px] p-2.5 h-[38px] rounded-[20px] justify-center bg-[#ffffff] relative">
              <div className="[font-family:'Montserrat',Helvetica] w-fit mt-[-3.00px] tracking-[0] text-[14.6px] text-[#343a40] relative font-medium whitespace-nowrap mb-[-1.00px] leading-[21.9px]">
                {["assembly", "build-the-last"].includes(property1) && (
                  <>2-4 weeks</>
                )}

                {property1 === "delivery" && <>Free delivery</>}

                {property1 === "warranty" && <>Our warranty</>}
              </div>
            </div>

            <div className="w-full flex self-stretch flex-col items-start gap-3 h-[109px] relative">
              <div className="inline-flex items-center gap-2.5 h-[18px] justify-center relative">
                <div className="[font-family:'Montserrat',Helvetica] w-fit mt-[-4.00px] tracking-[0] text-[16.2px] text-[#343a40] relative font-medium whitespace-nowrap mb-[-2.00px] leading-[24.4px]">
                  {property1 === "build-the-last" && <>Built to Last</>}

                  {property1 === "delivery" && <>Hassle-Free Delivery</>}

                  {property1 === "warranty" && <>Industry-Leading Warranty</>}

                  {property1 === "assembly" && <>Quick-Assembly Design</>}
                </div>
              </div>

              <div className="w-full flex self-stretch items-start gap-2.5 flex-[0_0_auto] relative">
                <div className="[font-family:'Montserrat',Helvetica] mt-[-1.00px] tracking-[0] text-sm flex-1 text-[#69727a] h-[79px] font-medium leading-[21px] relative">
                  {property1 === "build-the-last" && (
                    <p>
                      We use only commercial-grade aluminum and stainless steel
                      hardware —the same materials used in high-end commercial
                      buildings where cutting corners isn&#39;t an option. Our
                      premium powder coating is designed for permanent long-term
                      outdoor use so colors don't fade, scratch, or fall off.
                    </p>
                  )}

                  {property1 === "delivery" && (
                    <p>
                      Your pergola ships within XXX days—completely free!—and
                      arrives at your door in clearly labeled, fully protected
                      packaging. We coordinate delivery timing with you and
                      ensure all components arrive together—so your outdoor
                      transformation can begin right away without waiting or
                      wondering.
                    </p>
                  )}

                  {property1 === "warranty" && (
                    <p>
                      Our 15-year total warranty is three times the industry
                      standard, reflecting our confidence in every weld, joint,
                      and component—because we&#39;d rather spend money on
                      quality materials than warranty claims.
                    </p>
                  )}

                  {property1 === "assembly" && (
                    <p>
                      Our pre-assembled modular sections connect like building
                      blocks, allowing installation in just 2-3 hours with clear
                      instructions and video guidance—transforming your Saturday
                      project into Saturday evening entertainment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-[0.97px] border-solid border-[#e8e8ea] w-full self-stretch h-[239px] overflow-hidden rounded-2xl bg-[#f3f3f3] relative">
            {["assembly", "build-the-last", "delivery"].includes(property1) && (
              <div
                className={`relative ${
                  property1 === "delivery"
                    ? "w-[204px]"
                    : property1 === "assembly"
                    ? "w-[135px]"
                    : "w-[182px]"
                } ${
                  property1 === "delivery"
                    ? "left-[199px]"
                    : property1 === "assembly"
                    ? "left-[234px]"
                    : "left-[220px]"
                } ${
                  property1 === "delivery"
                    ? "top-9"
                    : property1 === "assembly"
                    ? "top-[29px]"
                    : "top-[33px]"
                } ${
                  property1 === "delivery"
                    ? "h-[167px]"
                    : property1 === "assembly"
                    ? "h-[181px]"
                    : "h-[173px]"
                }`}
              >
                {["build-the-last", "delivery"].includes(property1) && (
                  <div
                    className={`${
                      property1 === "delivery" ? "h-[167px]" : "h-[173px]"
                    } ${property1 === "build-the-last" ? "relative" : ""}`}
                  >
                    {property1 === "build-the-last" && (
                      <>
                        <div className="absolute w-[94px] h-[115px] top-10 left-11 rounded-[14.97px] border-0 border-none rotate-[90.00deg] blur-[126.79px] [background:linear-gradient(184deg,rgba(0,213,187,0)_0%,rgba(137,0,245,0)_100%)]" />

                        <div className="absolute w-[50px] h-5 top-[15px] left-[25px] rounded-[14.97px] border-0 border-none rotate-[90.00deg] shadow-[0px_7.46px_11.19px_#00000040,inset_0px_59.67px_29.83px_#ffffff40] [background:linear-gradient(135deg,rgba(171,193,226,1)_9%,rgba(7,47,108,1)_61%)]" />

                        <div className="absolute w-[50px] h-5 top-[15px] left-[106px] rounded-[14.97px] border-0 border-none rotate-[90.00deg] shadow-[0px_7.46px_11.19px_#00000040,inset_0px_59.67px_29.83px_#ffffff40] [background:linear-gradient(135deg,rgba(171,193,226,1)_9%,rgba(7,47,108,1)_61%)]" />

                        <div className="absolute w-[182px] h-[151px] top-[22px] left-0 rounded-[14.97px] border-[11.19px] border-solid border-[#ffffff] shadow-[0px_29.83px_29.83px_#00000040] backdrop-blur-[14.92px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14.92px)_brightness(100%)] [background:linear-gradient(46deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.5)_100%)]" />

                        <img
                          className="absolute w-[120px] h-[86px] top-[47px] left-[30px]"
                          alt="Element"
                          src={element}
                        />

                        <img
                          className="absolute w-[131px] h-[45px] top-[126px] left-[29px]"
                          alt="October"
                          src={october}
                        />
                      </>
                    )}

                    {property1 === "delivery" && (
                      <div className="relative w-[265px] h-[198px] left-[-31px]">
                        <div className="absolute w-[129px] h-[143px] top-[18px] left-[68px] rounded-[64.49px/71.57px] blur-[91.86px] [background:linear-gradient(184deg,rgba(0,213,187,0)_0%,rgba(137,0,245,0)_100%)]" />

                        <div className="absolute w-[54px] h-[60px] top-[107px] left-[52px] rounded-[26.87px/29.82px] [background:linear-gradient(90deg,rgba(171,193,226,1)_0%,rgba(7,47,108,1)_100%)]" />

                        <div className="absolute w-[54px] h-[60px] top-[107px] left-[154px] rounded-[26.87px/29.82px] [background:linear-gradient(90deg,rgba(171,193,226,1)_0%,rgba(7,47,108,1)_100%)]" />

                        <img
                          className="absolute w-[265px] h-[198px] top-0 left-0"
                          alt="Subtract"
                          src={subtract}
                        />
                      </div>
                    )}
                  </div>
                )}

                {property1 === "assembly" && (
                  <div className="absolute w-[180px] h-[191px] top-0 left-[-22px]">
                    <img
                      className="absolute w-[93px] h-[103px] top-[88px] left-[17px]"
                      alt="Vector"
                      src={img}
                    />

                    <img
                      className="absolute w-[93px] h-[103px] top-[88px] left-16"
                      alt="Vector"
                      src={vector1}
                    />

                    <img
                      className="absolute w-[180px] h-[180px] top-0 left-0"
                      alt="Vector"
                      src={vector2}
                    />

                    <img
                      className="absolute w-16 h-[62px] top-[42px] left-[58px]"
                      alt="Star"
                      src={star}
                    />
                  </div>
                )}
              </div>
            )}

            {property1 === "warranty" && (
              <img
                className="absolute w-[196px] h-[206px] top-[33px] left-[203px]"
                alt="Group"
                src="https://c.animaapp.com/bEMo3Gov/img/group-295-1@2x.png"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
