export const Advantage = (): JSX.Element => {
  return (
    <div className="flex flex-col h-[154px] items-start gap-2.5 px-[57px] py-5 relative self-stretch w-full">
      <div className="absolute w-[817px] h-[154px] top-0 left-0 bg-[#f3f3f3] rounded-[20px] overflow-hidden shadow-shadow-relaxure-button">
        <img
          className="absolute w-10 h-[76px] top-[39px] left-[37px]"
          alt="Vector"
          src="/img/leave_right.svg"
        />

        <img
          className="absolute w-10 h-[76px] top-[39px] left-[736px]"
          alt="Vector"
          src="/img/leave_left.svg"
        />

        <div className="absolute w-[187px] h-[102px] top-[29px] left-[517px]" />
      </div>

      <div className="inline-flex items-center justify-center gap-9 relative flex-[0_0_auto]">
        <div className="flex flex-col w-[217px] items-center gap-1 relative">
          <img
            className="relative w-[30px] h-[30px]"
            alt="Frame"
            src="/img/two_hours_installation.svg"
          />

          <div className="relative w-[173px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
            2 hour installation
          </div>
        </div>

        <div className="flex w-[187px] items-center justify-center gap-2.5 relative">
          <div className="flex flex-col w-[217px] items-center gap-1 relative ml-[-15.00px] mr-[-15.00px]">
            <img
              className="relative w-[45px] h-[62px]"
              alt="Frame"
              src="/img/five_years_warranty.svg"
            />

            <div className="relative w-[173px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
              5 years warranty
            </div>
          </div>
        </div>

        <div className="flex w-[187px] items-center justify-center gap-2.5 relative">
          <div className="flex flex-col w-[217px] items-center gap-1 relative ml-[-15.00px] mr-[-15.00px]">
            <img
              className="relative w-[30px] h-[30px]"
              alt="Frame"
              src="/img/two_months_delivery.svg"
            />

            <div className="relative w-[173px] [font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
              2 months delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
