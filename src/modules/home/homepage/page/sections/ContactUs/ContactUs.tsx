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

export const ContactUs = ({
  contactUs,
}: {
  contactUs: ContactUsProps
}): JSX.Element => {
  return (
    <div
      id="contact"
      className="flex flex-col lg:flex-row w-full justify-center items-center gap-4 lg:gap-[87px]"
    >
      <div className="flex justify-center w-full lg:w-3/5 h-[490px] lg:h-[947px] items-center">
        <img
          className="h-[490px] lg:h-[947px] w-full object-cover rounded-[20px]"
          alt="Unsplash"
          src="/img/unsplash-csk5xpo87li.png"
        />

        <div className="absolute bottom-10 left-0 w-[80%] lg:w-full px-4 py-2.5">
          <p className="font-bold text-white text-[18px] lg:text-[32px] leading-[44.8px] tracking-[0]">
            {contactUs.DescriptionOnImage}
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-2/5 items-center">
        <div className="flex flex-col w-full px-4 py-10 items-center gap-[30px] bg-[#f8f8f8] rounded-[18.16px] border border-solid border-[#ffffff6e] backdrop-blur-[32.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(32.4px)_brightness(100%)]">
          <div className="relative w-[102px] h-[82.21px]">
            <div className="relative w-[253px] h-[232px] -top-[61px] -left-[86px]">
              <img
                className="absolute w-[47px] h-[58px] top-[76px] left-[140px]"
                alt="Group"
                src="/img/group-266.png"
              />
              <img
                className="absolute w-[253px] h-[232px]"
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

          <div className="flex flex-col items-center gap-[52.66px] w-full">
            <div className="flex flex-col items-center gap-[18.16px] w-full">
              <p className="font-heading-2 text-black text-[18px] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)]">
                {contactUs.FormDescription}
              </p>
            </div>

            <div className="w-full flex flex-col items-center gap-[36.32px]">
              <div className="w-full flex flex-col items-start gap-[29.05px]">
                <div className="w-full flex flex-col items-start gap-[29.05px]">
                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-['Inter'] text-black text-sm tracking-[0] leading-[15.4px]">
                        {contactUs.FullName}
                      </div>
                      <input
                        className="w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid border-[#d8dadc] focus:outline-none"
                        id="fullname"
                        placeholder={contactUs.FullName}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-['Inter'] text-black text-[12.7px] tracking-[0] leading-[14.0px]">
                        {contactUs.PhoneNumber}
                      </div>
                      <input
                        className="w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid border-[#d8dadc] focus:outline-none"
                        id="phone"
                        placeholder={contactUs.PhoneNumber}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-['Inter'] text-black text-[12.7px] tracking-[0] leading-[14.0px]">
                        {contactUs.Email}
                      </div>
                      <input
                        className="w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid border-[#d8dadc] focus:outline-none"
                        id="email"
                        placeholder={contactUs.Email}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-['Inter'] text-black text-[12.7px] tracking-[0] leading-[14.0px]">
                        Message
                      </div>
                      <textarea
                        className="w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid border-[#d8dadc] focus:outline-none resize-vertical min-h-[120px]"
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

          <div className="w-full">
            <button className="w-full h-[43.58px]">
              <div className="h-full flex items-center justify-center gap-[var(--3-spacing-spacing-md)] px-[12.71px] py-[9.08px] bg-[#072f6c] rounded-[var(--2-radius-radius-md)]">
                <div className="flex items-center">
                  <div className="w-[30.87px] rounded-[7.26px] shadow-shadows-shadow-xs" />
                  <div className="font-med-16 text-variable-collection-beige-brand">
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
