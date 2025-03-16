/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
  onClick: () => void;
}

export const ArrowForwardIos4 = ({ className, onClick }: Props): JSX.Element => {
  return (
    <svg
      onClick={onClick}
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8848 3.77L16.1148 2L6.11477 12L16.1148 22L17.8848 20.23L9.65477 12L17.8848 3.77Z"
        fill="white"
        fillOpacity="0.45"
      />
    </svg>
  );
};
