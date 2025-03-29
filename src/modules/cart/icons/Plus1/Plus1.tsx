import React from "react";

interface Props {
  className: any;
}

export const Plus1 = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="26"
      viewBox="0 0 26 26"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9997 5.41709V20.5833M5.41658 13.0002H20.5828"
        stroke="#072F6C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.08571"
      />
    </svg>
  );
};
