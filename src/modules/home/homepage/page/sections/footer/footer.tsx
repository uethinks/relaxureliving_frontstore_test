import React from "react"
import Link from "next/link"
export const FooterDark = (): JSX.Element => {
  return (
    <div className="relative w-full h-[688px] bg-[#0A142F] mt-4">
      <div className="absolute w-[1132px] h-[539px] top-[53px] left-[193px]">
        <div className="absolute w-[323px] top-[47px] left-[402px] opacity-60 [font-family:'Montserrat',Helvetica] font-medium text-white text-[14px] text-center tracking-[2.80px] leading-[normal]">
          RELAXURE
        </div>
        <div className="absolute w-[693px] top-[82px] left-[217px] [font-family:'Merriweather',Helvetica] font-bold text-white text-[36px] text-center tracking-[0] leading-[50.4px]">
          Try sample kit
        </div>
        <p className="absolute w-[610px] top-[163px] left-[259px] opacity-80 [font-family:'Montserrat',Helvetica] font-medium text-white text-[18px] text-center tracking-[0] leading-[27px]">
          We are happy to help with any enquiries
        </p>
        <Link href="/us/products/pergola">
          <button className="absolute w-[271px] h-[48px] top-[226px] left-[428px] bg-[#072f6c] rounded-[10px] shadow-[0px_3px_7px_#072f6c1a,0px_13px_13px_#072f6c17,0px_29px_17px_#072f6c0d,0px_51px_20px_#072f6c03,0px_80px_22px_#072f6c00] overflow-hidden">
            <div className="absolute top-[12px] left-[71px] [font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              For only $ 50
            </div>
          </button>
        </Link>
        <div className="absolute w-[574px] h-[44px] top-[366px] left-[276px] flex justify-between items-center">
          <Link href="/us/terms/warranty">
            <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              Warranty
            </div>
          </Link>
          <Link href="/us/terms/refund-policy">
            <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              Refund policy
            </div>
          </Link>
          <Link href="/us/terms/terms-of-service">
            <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              Terms of service
            </div>
          </Link>
          <Link href="/us/terms/privacy-policy">
            <div className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
              Privacy policy
            </div>
          </Link>
        </div>
        <img
          className="absolute w-[1127px] h-px top-[452px] left-0 object-cover"
          alt="Line"
          src="https://c.animaapp.com/ipQflS1Z/img/line-2.svg"
        />
        <img
          className="absolute w-[112px] h-[74px] top-[473px] left-[-9px]"
          alt="Logo"
          src="https://c.animaapp.com/ipQflS1Z/img/logo.svg"
        />
        <div className="absolute w-[132px] h-[21px] top-[500px] left-[497px] opacity-80 [font-family:'Montserrat',Helvetica] font-normal text-white text-[14px] text-center tracking-[0] leading-[normal]">
          © 2025 Relaxure
        </div>
        <div className="absolute w-[219px] h-[45px] top-[494px] left-[907px]">
          <Link href="https://www.instagram.com/relaxurepergola/">
            <div className="absolute w-[47px] h-[45px] top-0 left-[114px] bg-[url(https://c.animaapp.com/ipQflS1Z/img/oval-copy.svg)] bg-cover">
              <div className="relative w-[14px] h-[13px] top-[16px] left-[17px]">
                <div className="relative h-[13px]">
                  <img
                    className="absolute w-[2px] h-[2px] top-[2px] left-[10px]"
                    alt="Oval"
                    src="https://c.animaapp.com/ipQflS1Z/img/oval.svg"
                  />
                  <img
                    className="absolute w-[7px] h-[6px] top-[3px] left-[3px]"
                    alt="Shape"
                    src="https://c.animaapp.com/ipQflS1Z/img/shape-1.svg"
                  />
                  <img
                    className="absolute w-[14px] h-[13px] top-0 left-0"
                    alt="Shape"
                    src="https://c.animaapp.com/ipQflS1Z/img/shape-2.svg"
                  />
                </div>
              </div>
            </div>
          </Link>
          <Link href="https://www.youtube.com/@Relaxure-m1z">
            <div className="absolute w-[47px] h-[45px] top-0 left-[172px] bg-[url(https://c.animaapp.com/ipQflS1Z/img/twitter@2x.png)] bg-cover">
              <div className="relative w-[17px] h-[11px] top-[17px] left-[16px] bg-[url(https://c.animaapp.com/ipQflS1Z/img/shape.svg)] bg-cover" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
