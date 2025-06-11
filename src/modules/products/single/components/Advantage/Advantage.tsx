export const Advantage = (): JSX.Element => {
  return (
    <div className="relative w-full flex flex-col items-start gap-2.5 px-2 lg:px-5 py-2.5 lg:py-5 self-stretch overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[#f3f3f3] rounded-[20px] overflow-hidden" />
      <div className="flex justify-between items-center w-full relative">
        <img
          className="h-10 w-5 lg:h-[76px] lg:w-10 mr-1 lg:mr-5"
          alt="Vector"
          src="/img/leave_right.svg"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2.5 gap-y-1 lg:gap-x-9 lg:gap-y-0 flex-1 w-full">
          <div
            className="flex flex-col items-center relative"
            style={{ height: "100px" }}
          >
            <div
              className="flex items-end justify-center w-full"
              style={{ height: "50px" }}
            >
              <img
                className="w-5 lg:w-10"
                alt="Frame"
                src="/img/two_hours_installation.svg"
              />
            </div>
            <div
              className="flex items-start justify-center w-full"
              style={{ height: "50px" }}
            >
              <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
                2 hour installation
              </h3>
            </div>
          </div>
          <div
            className="flex flex-col items-center relative"
            style={{ height: "100px" }}
          >
            <div
              className="flex items-end justify-center w-full"
              style={{ height: "50px" }}
            >
              <img
                className="w-5 lg:w-[30px]"
                alt="Frame"
                src="/img/five_years_warranty.svg"
              />
            </div>
            <div
              className="flex items-start justify-center w-full"
              style={{ height: "50px" }}
            >
              <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
                lifetime warranty
              </h3>
            </div>
          </div>
          <div
            className="flex flex-col items-center relative"
            style={{ height: "100px" }}
          >
            <div
              className="flex items-end justify-center w-full"
              style={{ height: "50px" }}
            >
              <img
                className="w-5 lg:w-[30px]"
                alt="Frame"
                src="/img/five_years_warranty.svg"
              />
            </div>
            <div
              className="flex items-start justify-center w-full"
              style={{ height: "50px" }}
            >
              <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
                100 day risk free trial
              </h3>
            </div>
          </div>
          <div
            className="flex flex-col items-center relative"
            style={{ height: "100px" }}
          >
            <div
              className="flex items-end justify-center w-full"
              style={{ height: "50px" }}
            >
              <img
                className="w-5 lg:w-10"
                alt="Frame"
                src="/img/two_months_delivery.svg"
              />
            </div>
            <div
              className="flex items-start justify-center w-full"
              style={{ height: "50px" }}
            >
              <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-[#69727a] text-base text-center tracking-[0] leading-6">
                <p>Free delivery</p>
                <p>Full insurance</p>
              </h3>
            </div>
          </div>
        </div>
        <img
          className="h-10 w-5 lg:h-[76px] lg:w-10 ml-1 lg:ml-5"
          alt="Vector"
          src="/img/leave_left.svg"
        />
      </div>
    </div>
  )
}
