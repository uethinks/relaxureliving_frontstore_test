import React from "react";

interface Props {
  property1: "variant-4" | "variant-2" | "variant-3" | "default";
  hasFrame: boolean;
  hasDiv: boolean;
  visible: boolean;
  hasFrame1: boolean;
}

export const PropertyDefaultWrapper = ({
  property1,
  hasFrame = true,
  hasDiv = true,
  visible = true,
  hasFrame1 = true,
}: Props): JSX.Element => {
  return (
    <div
      className={`flex-col items-start gap-5 relative ${["variant-3", "variant-4"].includes(property1) ? "w-[411px]" : ""} ${["variant-3", "variant-4"].includes(property1) ? "flex" : "inline-flex"}`}
    >
      {hasFrame && (
        <div className="inline-flex items-center gap-2.5 h-6 relative">
          <p className="[font-family:'Montserrat',Helvetica] w-[327px] mt-[-1.00px] tracking-[0] text-base text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative">
            What size do you want for your pergola?
          </p>
        </div>
      )}

      <div
        className={`w-[415px] h-12 relative ${["variant-3", "variant-4"].includes(property1) ? "mr-[-4.00px]" : ""}`}
      >
        <div className="border border-solid border-[#e9e9e9] w-[411px] h-12 rounded-[40px] bg-[#ffffff]">
          <div className="left-3 inline-flex items-center -top-px gap-[18px] relative">
            <div
              className={`w-[95px] top-1 h-[39px] rounded-[20px] bg-[#dce7f8] absolute ${property1 === "variant-2" ? "left-[97px]" : (property1 === "variant-3") ? "left-[196px]" : property1 === "variant-4" ? "left-[299px]" : "left-[-9px]"}`}
            />

            <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
              <div
                className={`[font-family:'Montserrat',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-lg font-medium leading-[27px] whitespace-nowrap relative ${property1 === "default" ? "text-[#072f6c]" : "text-[#69727a]"}`}
              >
                10’ x 10’
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
              <div
                className={`[font-family:'Montserrat',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-lg font-medium leading-[27px] whitespace-nowrap relative ${property1 === "variant-2" ? "text-[#072f6c]" : "text-[#69727a]"}`}
              >
                10’ x 13’
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
              <div
                className={`[font-family:'Montserrat',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-lg font-medium leading-[27px] whitespace-nowrap relative ${property1 === "variant-3" ? "text-[#072f6c]" : "text-[#69727a]"}`}
              >
                13’ x 13’
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] p-2.5 justify-center relative">
              <div
                className={`[font-family:'Montserrat',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-lg font-medium leading-[27px] whitespace-nowrap relative ${property1 === "variant-4" ? "text-[#072f6c]" : "text-[#69727a]"}`}
              >
                13’ x 19’
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasDiv && (
        <div className="w-[352px] flex flex-col items-start gap-4 flex-[0_0_auto] relative">
          <div className="w-[145px] flex items-center gap-2.5 flex-[0_0_auto] relative">
            <div className="w-5 h-6 overflow-hidden relative">
              <img
                className="w-1.5 left-[3px] top-1 h-1.5 absolute"
                alt="Vector"
                src="https://c.animaapp.com/m8o9g6iofzwjOy/img/vector.svg"
              />

              <img
                className="w-1.5 left-[11px] top-[5px] h-1.5 absolute"
                alt="Vector"
                src="https://c.animaapp.com/m8o9g6iofzwjOy/img/vector.svg"
              />

              <img
                className="w-[17px] left-px top-[11px] h-2.5 absolute"
                alt="Vector"
                src="https://c.animaapp.com/m8o9g6iofzwjOy/img/vector-4.svg"
              />

              <div className="w-[38px] left-0 top-[25px] h-[7px] absolute">
                <div className="[font-family:'Helvetica_Neue-Bold',Helvetica] w-[38px] left-0 tracking-[0] text-[3.1px] top-0 text-[#343a40] font-bold leading-[normal] absolute">
                  Created by erix subyarko
                </div>

                <div className="[font-family:'Helvetica_Neue-Bold',Helvetica] w-[33px] left-0 tracking-[0] text-[3.1px] top-[3px] text-[#343a40] font-bold leading-[normal] absolute">
                  from the Noun Project
                </div>
              </div>
            </div>

            <div
              className={`[font-family:'Montserrat',Helvetica] mt-[-1.00px] tracking-[0] text-base text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative ${property1 === "variant-4" ? "w-[126px]" : "w-[121px]"} ${property1 === "variant-4" ? "mr-[-11.00px]" : "mr-[-6.00px]"}`}
            >
              {property1 === "variant-2" && <>Fits 4-6 people</>}

              {property1 === "variant-3" && <>Fits 6-8 people</>}

              {property1 === "variant-4" && <>Fits 8-12 people</>}

              {property1 === "default" && <>Fits 2-4 people</>}
            </div>
          </div>

          {["variant-2", "variant-3", "variant-4"].includes(property1) && (
            <div
              className={`flex items-center gap-[5px] flex-[0_0_auto] relative ${property1 === "variant-4" ? "w-[265px]" : "w-52"}`}
            >
              {property1 === "variant-4" && (
                <div className="relative w-[22px] h-[22.88px]">
                  <div className="h-[23px]">
                    <div className="relative w-[22px] h-[23px]">
                      <img
                        className="absolute w-0.5 h-1 top-0.5 left-[13px]"
                        alt="Group"
                        src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-9.png"
                      />

                      <img
                        className="absolute w-3 h-3 top-0 left-0"
                        alt="Group"
                        src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-10.png"
                      />

                      <img
                        className="absolute w-0.5 h-px top-[13px] left-1"
                        alt="Group"
                        src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-11.png"
                      />

                      <img
                        className="absolute w-0.5 h-px top-3 left-[18px]"
                        alt="Group"
                        src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-12.png"
                      />

                      <img
                        className="absolute w-[22px] h-[21px] top-0.5 left-0"
                        alt="Vector"
                        src="https://c.animaapp.com/m8o9g6iofzwjOy/img/vector-9.svg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {["variant-2", "variant-3"].includes(property1) && (
                <img
                  className="w-5 h-5 relative"
                  alt="Frame"
                  src="https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-1000004863.svg"
                />
              )}

              <div
                className={`[font-family:'Montserrat',Helvetica] w-[327px] mt-[-1.00px] tracking-[0] text-base text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative ${property1 === "variant-4" ? "mr-[-89.00px]" : "mr-[-144.00px]"}`}
              >
                {property1 === "variant-4" && (
                  <>Ideal for expansive backyards</>
                )}

                {["variant-2", "variant-3"].includes(property1) && (
                  <>Perfect for small BBQ</>
                )}
              </div>
            </div>
          )}

          {property1 === "variant-4" && (
            <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
              <div className="relative w-6 h-[23.62px]">
                <div className="h-6">
                  <div className="relative w-6 h-6">
                    <img
                      className="absolute w-[11px] h-2.5 top-3.5 left-0"
                      alt="Group"
                      src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-13.png"
                    />

                    <img
                      className="absolute w-2.5 h-[11px] top-[9px] left-3.5"
                      alt="Group"
                      src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-14.png"
                    />

                    <img
                      className="absolute w-2.5 h-[11px] top-px left-0"
                      alt="Group"
                      src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-15.png"
                    />

                    <img
                      className="absolute w-[9px] h-2.5 top-[7px] left-[7px]"
                      alt="Group"
                      src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-16.png"
                    />

                    <img
                      className="absolute w-1 h-1 top-[17px] left-3"
                      alt="Group"
                      src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-17.png"
                    />

                    <img
                      className="absolute w-2 h-2 top-0 left-[13px]"
                      alt="Group"
                      src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-18.png"
                    />

                    <img
                      className="absolute w-0.5 h-0.5 top-3 left-px"
                      alt="Group"
                      src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group-19.png"
                    />
                  </div>
                </div>
              </div>

              <div className="relative w-56 h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                Perfect for outdoor retreats
              </div>
            </div>
          )}

          {["variant-2", "variant-3", "variant-4"].includes(property1) && (
            <div
              className={`flex items-center flex-[0_0_auto] relative ${property1 === "variant-4" ? "w-[282px]" : "w-[214px]"} ${property1 === "variant-4" ? "gap-2.5" : "gap-[5px]"}`}
            >
              {["variant-2", "variant-3"].includes(property1) && (
                <>
                  <img
                    className="w-6 h-[16.7px] relative"
                    alt="Frame"
                    src="https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-1000004864.svg"
                  />

                  <div className="[font-family:'Montserrat',Helvetica] w-[327px] mt-[-1.00px] tracking-[0] text-base mr-[-142.00px] text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative">
                    Fits a modular sofa
                  </div>
                </>
              )}

              {property1 === "variant-4" && (
                <>
                  <div className="relative w-5 h-6 bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/group-20.png)] bg-[100%_100%]" />

                  <p className="relative w-[252px] h-6 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                    Ideal for multiple seating areas
                  </p>
                </>
              )}
            </div>
          )}

          {["variant-3", "variant-4"].includes(property1) && (
            <>
              <div className="inline-flex items-center gap-[5px] flex-[0_0_auto] relative">
                <img
                  className="w-[21px] h-5 relative"
                  alt="Frame"
                  src="https://c.animaapp.com/m8o9g6iofzwjOy/img/frame-1000004866.svg"
                />

                <p className="[font-family:'Montserrat',Helvetica] w-[193px] mt-[-1.00px] tracking-[0] text-base text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative">
                  Fits a small kitchen set
                </p>
              </div>

              <div className="inline-flex items-center gap-[5px] flex-[0_0_auto] relative">
                <div className="w-[23px] h-[23.48px] relative">
                  <div className="h-[23px] relative">
                    <div className="w-[23px] left-0 top-0 h-5 absolute">
                      <img
                        className="w-1 left-[11px] top-0 h-1 absolute"
                        alt="Group"
                        src={
                          property1 === "variant-4"
                            ? "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-21.png"
                            : "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-3.png"
                        }
                      />

                      <img
                        className="w-[3px] left-1 top-1 h-[3px] absolute"
                        alt="Group"
                        src={
                          property1 === "variant-4"
                            ? "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-22.png"
                            : "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-4.png"
                        }
                      />

                      <img
                        className="w-0.5 left-px top-[17px] h-0.5 absolute"
                        alt="Group"
                        src={
                          property1 === "variant-4"
                            ? "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-23.png"
                            : "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-5.png"
                        }
                      />

                      <img
                        className="w-0.5 left-5 top-3 h-0.5 absolute"
                        alt="Group"
                        src={
                          property1 === "variant-4"
                            ? "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-25.png"
                            : "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-7.png"
                        }
                      />

                      <img
                        className="w-[23px] left-0 top-[3px] h-[17px] absolute"
                        alt="Group"
                        src={
                          property1 === "variant-4"
                            ? "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-26.png"
                            : "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-8.png"
                        }
                      />
                    </div>

                    <img
                      className="w-[3px] left-3 top-[21px] h-[3px] absolute"
                      alt="Group"
                      src={
                        property1 === "variant-4"
                          ? "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-24.png"
                          : "https://c.animaapp.com/m8o9g6iofzwjOy/img/group-6.png"
                      }
                    />
                  </div>
                </div>

                <div className="[font-family:'Montserrat',Helvetica] w-[220px] mt-[-1.00px] tracking-[0] text-base text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative">
                  Perfect for hosting parties
                </div>
              </div>
            </>
          )}

          {["default", "variant-2"].includes(property1) && (
            <div className="w-full flex self-stretch items-center gap-2.5 flex-[0_0_auto] relative">
              {property1 === "default" && (
                <img
                  className="relative w-5 h-6"
                  alt="Group"
                  src="https://c.animaapp.com/m8o9g6iofzwjOy/img/group.png"
                />
              )}

              {property1 === "variant-2" && (
                <div className="relative w-5 h-6 bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/group-2.png)] bg-[100%_100%]" />
              )}

              <div className="[font-family:'Montserrat',Helvetica] w-[327px] mt-[-1.00px] tracking-[0] text-base mr-[-5.00px] text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative">
                {property1 === "default" && <>Perfect for morning coffee</>}

                {property1 === "variant-2" && <>Ideal for small patios</>}
              </div>
            </div>
          )}

          {property1 === "default" && (
            <div className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-5 h-6 bg-[url(https://c.animaapp.com/m8o9g6iofzwjOy/img/group-1.png)] bg-[100%_100%]" />

              <div className="relative w-[327px] h-6 mt-[-1.00px] mr-[-5.00px] [font-family:'Montserrat',Helvetica] font-medium text-[#343a40] text-base tracking-[0] leading-6 whitespace-nowrap">
                Ideal for small patios
              </div>
            </div>
          )}
        </div>
      )}

      {visible && (
        <div
          className={`w-[411px] flex items-center gap-2.5 h-6 relative ${property1 === "variant-3" ? "justify-end" : ""}`}
        >
          <div
            className={`[font-family:'Montserrat',Helvetica] mt-[-1.00px] tracking-[0] text-base text-[#072f6c] underline h-6 font-medium leading-6 whitespace-nowrap relative ${property1 === "variant-4" ? "w-[323px]" : "w-[411px]"}`}
          >
            Custom size
          </div>
        </div>
      )}

      {hasFrame1 && (
        <div className="inline-flex flex-col items-start gap-5 flex-[0_0_auto] relative">
          <div className="w-[411px] flex items-center gap-2.5 h-6 relative">
            <p className="[font-family:'Montserrat',Helvetica] w-[411px] mt-[-1.00px] tracking-[0] text-base text-[#343a40] h-6 font-medium leading-6 whitespace-nowrap relative">
              What color would you like to choose?
            </p>
          </div>

          <div className="w-[301px] flex items-start gap-[30px] flex-[0_0_auto] relative">
            <div className="w-[130px] flex items-center gap-2 relative">
              <div className="border-2 border-solid border-[#072f6c] w-[41px] h-[39px] rounded-[20px] relative">
                <div className="w-[31px] left-[5px] top-1 h-[31px] rounded-[15.5px] bg-[#7e7e7e] relative" />
              </div>

              <div className="w-[60px] flex items-start px-0 py-2.5 rounded-[20px] justify-center relative">
                <div className="w-[61px] flex items-center mr-[-0.50px] gap-2.5 ml-[-0.50px] px-0 py-2.5 h-6 rounded-[20px] relative">
                  <div className="[font-family:'Montserrat',Helvetica] w-[81px] mt-[-11.00px] tracking-[0] text-base mr-[-20.00px] text-[#072f6c] h-6 font-medium leading-6 whitespace-nowrap mb-[-9.00px] relative">
                    Dark Gray
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[130px] flex items-center gap-2 relative">
              <div className="w-[41px] h-[39px] rounded-[20px] relative">
                <div className="border border-solid border-[#e9e9e9] w-[31px] left-[5px] top-1 h-[31px] rounded-[15.5px] bg-[#ffffff] relative" />
              </div>

              <div className="w-[60px] flex items-start px-0 py-2.5 rounded-[20px] justify-center relative">
                <div className="w-[61px] flex items-center mr-[-0.50px] gap-2.5 ml-[-0.50px] px-0 py-2.5 h-6 rounded-[20px] relative">
                  <div className="[font-family:'Montserrat',Helvetica] w-[81px] mt-[-11.00px] tracking-[0] text-base mr-[-20.00px] text-[#072f6c] h-6 font-medium leading-6 whitespace-nowrap mb-[-9.00px] relative">
                    White
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
