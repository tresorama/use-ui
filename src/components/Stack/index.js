import React from "react";
import { Box, useUI } from "../../index.js";

const sheet = {
  customAPI: props => ({
    direction: props.direction || "row", // 'row' | 'column'
    gutter: props.gutter || 0, // <Number>
  }),
  runner: _ => ({
    wrapper: {
      display: "flex",
      flexDirection: _.direction,
      "& > * + *": {
        [`margin${_.direction === "row" ? "Left" : "Top"}`]: _.gutter ? _.gutter : undefined,
      },
    },
  }),
};
const Stack = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return <Box {...UI.wrapper} {...propsCleaned} />;
};

export default Stack;
