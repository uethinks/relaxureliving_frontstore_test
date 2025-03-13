/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { StyleOutlined } from "../../icons/StyleOutlined";

interface Props {
  style: "outlined";
}

export const ArrowForwardIos = ({ style }: Props): JSX.Element => {
  return (
    <StyleOutlined
      className="!absolute !w-6 !h-6 !top-0 !left-0"
      color="black"
    />
  );
};

ArrowForwardIos.propTypes = {
  style: PropTypes.oneOf(["outlined"]),
};
