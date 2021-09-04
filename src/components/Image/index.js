import React from "react";
import { Box, useUI } from "../../index";

const sheet = {
  customAPI: props => ({
    negate: props.negate || false,
    circle: props.circle || false,
  }),
  runner: _ => ({
    img: {
      display: "inline-block",
      maxWidth: "100%",
      height: "auto",
      ...(_.negate && {
        filter: "invert(1)",
      }),
      ...(_.circle && {
        borderRadius: "50%",
        overflow: "hidden",
      }),
    },
  }),
};

const Image = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return <Box {...UI.img} {...propsCleaned} />;
};
Image.defaultProps = {
  as: "img",
};

export default Image;
