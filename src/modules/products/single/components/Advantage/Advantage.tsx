export const Advantage = (): JSX.Element => {
  return (
    <div className="flex w-full flex-col h-[95px] lg:h-[154px] items-start gap-2.5 px-2 lg:px-[57px] py-2.5 lg:py-5 relative self-stretch">
      <div className="absolute w-full h-[95px] lg:h-[154px] top-0 left-0 bg-[#f3f3f3] rounded-[20px] overflow-hidden shadow-shadow-relaxure-button">
        <img
          className="absolute w-5 h-10 lg:w-10 lg:h-[76px] top-[29px] left[10px] lg:top-[39px] lg:left-[37px]"
          alt="Vector"
          src="/img/leave_right.svg"
        />

        <img
          className="absolute w-5 h-10 lg:w-10 lg:h-[76px] top-[29px] right-[10px] lg:top-[39px] lg:right-[37px]"
          alt="Vector"
          src="/img/leave_left.svg"
        />
      </div>

      <div className="w-full flex items-center justify-center gap-2.5 lg:gap-9 relative flex-[0_0_auto]">
        <div className="flex flex-col w-[30%] lg:w-1/3 items-center gap-1 relative">
          <img
            className="relative w-5 h-5 lg:w-10 lg:h-[30px]"
            alt="Frame"
            src="/img/two_hours_installation.svg"
          />

          <div className="relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
            2 hour installation
          </div>
        </div>

        <div className="flex w-[30%] lg:w-1/3 items-center justify-center gap-2.5 relative">
          <div className="flex flex-col w-full items-center gap-1 relative ml-[-15.00px] mr-[-15.00px]">
            <img
              className="relative w-[30px] h-[34px] lg:w-10 lg:h-[62px]"
              alt="Frame"
              src="/img/five_years_warranty.svg"
            />

            <div className="relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
              15 years warranty
            </div>
          </div>
        </div>

        <div className="flex w-[30%] lg:w-1/3 items-center justify-center gap-2.5 relative">
          <div className="flex flex-col w-full items-center gap-1 relative ml-[-15.00px] mr-[-15.00px]">
            <img
              className="relative w-5 h-5 lg:w-10 lg:h-[30px]"
              alt="Frame"
              src="/img/two_months_delivery.svg"
            />

            <div className="relative w-full [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
              Fast delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
