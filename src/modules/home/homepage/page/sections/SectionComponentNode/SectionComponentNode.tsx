import React from "react"

interface ContactUsProps {
  id: number
  DescriptionOnImage: string
  Email: string
  FormDescription: string
  FullName: string
  Image: {
    data: {
      attributes: {
        url: string
      }
    }
  } | null
  Message: string
  PhoneNumber: string
  SendButton: string
}
export const SectionComponentNode = ({
  contactUs,
}: {
  contactUs: ContactUsProps
}): JSX.Element => {
  return (
    <div
      id="contact"
      className="flex w-full justify-center items-center gap-[87px] px-0 py-10 relative flex-[0_0_auto]"
    >
      <div className="flex w-[695px] h-[947px] items-center relative">
        <img
          className="relative flex-1 grow h-[947px] object-cover"
          alt="Unsplash"
          src="/img/unsplash-csk5xpo87li.png"
        />

        <div className="absolute w-[695px] h-[431px] top-56 left-0 rounded-[0px_0px_20px_20px] [background:linear-gradient(180deg,rgb(0,0,0)_0%,rgba(52,58,64,0)_100%)]" />

        <div className="w-[567px] items-center justify-center px-0 py-2.5 absolute top-[781px] left-[33px] flex gap-2.5">
          <p className="flex-1 mt-[-1.00px] [font-family:'Merriweather',Helvetica] font-bold text-[#ffffff] text-[32px] leading-[44.8px] relative tracking-[0]">
            {contactUs.DescriptionOnImage}
          </p>
        </div>
      </div>

      <div className="flex w-[570px] h-[655px] items-center gap-2.5 relative">
        <div className="flex flex-col w-[570px] h-[947px] items-center justify-center gap-[30px] relative mt-[-146.00px] mb-[-146.00px] bg-[#f8f8f8] rounded-[18.16px] border-[0.91px] border-solid border-[#ffffff6e] backdrop-blur-[32.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(32.4px)_brightness(100%)]">
          <div className="relative w-[102px] h-[82.21px]">
            <div className="h-[82px]">
              <div className="relative w-[253px] h-[232px] top-[-61px] left-[-86px]">
                <img
                  className="absolute w-[47px] h-[58px] top-[76px] left-[140px]"
                  alt="Group"
                  src="/img/group-266.png"
                />

                <img
                  className="absolute w-[253px] h-[232px] top-0 left-0"
                  alt="Vector"
                  src="/img/vector-1.svg"
                />

                <img
                  className="absolute w-[102px] h-[111px] top-[61px] left-[71px]"
                  alt="Group"
                  src="/img/group-265.png"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[52.66px] px-[3.63px] py-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-center justify-center gap-[18.16px] pl-[68.09px] pr-[72.63px] py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center justify-center gap-[9.08px] relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative w-[530px] mt-[-0.91px] ml-[-53.99px] mr-[-53.99px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-[#000000] text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                  {contactUs.FormDescription}
                </p>
              </div>
            </div>

            <div className="inline-flex flex-col items-center gap-[36.32px] px-[3.63px] py-0 relative flex-[0_0_auto]">
              <div className="flex flex-col w-[494.81px] items-start justify-center gap-[29.05px] px-[3.63px] py-0 relative flex-[0_0_auto]">
                <div className="flex flex-col w-[487.55px] items-start gap-[29.05px] relative flex-[0_0_auto]">
                  <div className="flex flex-col w-[487.55px] items-start gap-[3.63px] relative flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-[5.45px] relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-[5.45px] relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-0.91px] [font-family:'Inter',Helvetica] font-normal text-[#000000] text-sm tracking-[0] leading-[15.4px] whitespace-nowrap [background:transparent] border-[none] p-0">
                          {contactUs.FullName}
                        </div>

                        <input
                          className="focus:outline-none items-center gap-[9.08px] px-[14.53px] py-[16.34px] flex-[0_0_auto] bg-[#ffffff] rounded-[9.08px] border-[0.91px] border-solid border-[#d8dadc] flex relative self-stretch w-full"
                          id="fullname"
                          placeholder={contactUs.FullName}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-[487.55px] items-start gap-[3.63px] relative flex-[0_0_auto]">
                    <div className="flex-col items-start gap-[5.45px] flex-[0_0_auto] flex relative self-stretch w-full">
                      <div className="flex flex-col items-start gap-[5.45px] relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-0.91px] [font-family:'Inter',Helvetica] font-normal text-[#000000] text-[12.7px] tracking-[0] leading-[14.0px] whitespace-nowrap">
                          {contactUs.PhoneNumber}
                        </div>

                        <input
                          className="focus:outline-none items-center gap-[9.08px] px-[14.53px] py-[16.34px] flex-[0_0_auto] bg-[#ffffff] rounded-[9.08px] border-[0.91px] border-solid border-[#d8dadc] flex relative self-stretch w-full"
                          id="phone"
                          placeholder={contactUs.PhoneNumber}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-[487.55px] items-start gap-[3.63px] relative flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-[5.45px] relative self-stretch w-full flex-[0_0_auto] bg-[#f6f7f9]">
                      <div className="flex flex-col items-start gap-[5.45px] relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-0.91px] [font-family:'Inter',Helvetica] font-normal text-[#000000] text-[12.7px] tracking-[0] leading-[14.0px] whitespace-nowrap">
                          {contactUs.Email}
                        </div>

                        <input
                          className="focus:outline-none items-center gap-[9.08px] px-[14.53px] py-[16.34px] flex-[0_0_auto] bg-[#ffffff] rounded-[9.08px] border-[0.91px] border-solid border-[#d8dadc] flex relative self-stretch w-full"
                          id="email"
                          placeholder={contactUs.Email}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-[488px] items-start gap-[3.63px] relative flex-[0_0_auto] mr-[-0.45px]">
                    <div className="flex flex-col h-[207px] items-start gap-[5.45px] relative self-stretch w-full">
                      <div className="flex flex-col items-start gap-[5.45px] relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-0.91px] [font-family:'Inter',Helvetica] font-normal text-[#000000] text-[12.7px] tracking-[0] leading-[14.0px] whitespace-nowrap">
                          Message
                        </div>

                        <textarea
                          className="focus:outline-none items-center gap-[9.08px] px-[14.53px] py-[16.34px] flex-[0_0_auto] bg-[#ffffff] rounded-[9.08px] border-[0.91px] border-solid border-[#d8dadc] flex relative self-stretch w-full resize-vertical min-h-[120px]"
                          id="message"
                          placeholder={contactUs.Message}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col w-[482.1px] items-start gap-[9.08px] flex-[0_0_auto] flex relative">
            <button className="flex flex-col h-[43.58px] items-center gap-[var(--3-spacing-spacing-sm)] relative self-stretch w-full">
              <div className="h-[43.58px] items-center justify-center gap-[var(--3-spacing-spacing-md)] px-[12.71px] py-[9.08px] bg-[#072f6c] rounded-[var(--2-radius-radius-md)] overflow-hidden flex relative self-stretch w-full">
                <div className="inline-flex items-center relative flex-[0_0_auto] mt-[-5.45px] mb-[-5.45px]">
                  <div className="relative w-[30.87px] rounded-[7.26px] shadow-shadows-shadow-xs" />

                  <div className="relative w-fit font-med-16 font-[number:var(--med-16-font-weight)] text-variable-collection-beige-brand text-[length:var(--med-16-font-size)] tracking-[var(--med-16-letter-spacing)] leading-[var(--med-16-line-height)] whitespace-nowrap [font-style:var(--med-16-font-style)]">
                    {contactUs.SendButton}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
