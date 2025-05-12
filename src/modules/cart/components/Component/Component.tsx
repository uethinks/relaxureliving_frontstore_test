import React from "react";

interface Props {
  property1:
    | "primary-button-pressed-l"
    | "primary-button-hover-l"
    | "primary-button-l";
  className: any;
  text: string;
}

export const Component = ({
  property1,
  className,
  text = "Get started",
}: Props): JSX.Element => {
  return (
    <button
      className={`all-[unset] box-border w-[200px] flex items-center gap-2 shadow-shadow-relaxure-button px-6 py-3 rounded-[10px] justify-center relative ${property1 === "primary-button-hover-l" ? "bg-[#0a3980]" : (property1 === "primary-button-pressed-l") ? "bg-[#062e6b]" : "bg-[#072f6c]"} ${className}`}
    >
      <button className="all-[unset] box-border [font-family:'Montserrat',Helvetica] w-fit tracking-[0] text-base text-[#ffffff] relative font-medium whitespace-nowrap leading-6">
        {text}
      </button>
    </button>
  );
};
