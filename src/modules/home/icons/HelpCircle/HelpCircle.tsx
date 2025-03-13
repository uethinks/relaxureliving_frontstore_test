/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

interface Props {
  color: string;
  className: any;
}

export const HelpCircle = ({
  color = "#98A2B3",
  className,
}: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_242_2039)">
        <path
          d="M6.06001 5.99998C6.21675 5.55442 6.52611 5.17872 6.93331 4.9394C7.34052 4.70009 7.81927 4.61261 8.28479 4.69245C8.75032 4.7723 9.17255 5.01433 9.47673 5.37567C9.7809 5.737 9.94738 6.19433 9.94668 6.66665C9.94668 7.99998 7.94668 8.66665 7.94668 8.66665M8.00001 11.3333H8.00668M14.6667 7.99998C14.6667 11.6819 11.6819 14.6666 8.00001 14.6666C4.31811 14.6666 1.33334 11.6819 1.33334 7.99998C1.33334 4.31808 4.31811 1.33331 8.00001 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.33333"
        />
      </g>

      <defs>
        <clipPath id="clip0_242_2039">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </svg>
  );
};

HelpCircle.propTypes = {
  color: PropTypes.string,
};
