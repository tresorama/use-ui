import React from "react";
import { Box, useUI } from "../../index.js";

const sheet = {
  customAPI: props => ({
    direction: props.direction || "row",
    wrap: props.wrap ? "wrap" : "nowrap",
    justify: props.justify || null,
    align: props.align || null,
    gutter: props.gutter || null,
    autocenter: props.autocenter || false,
  }),
  runner: _ => ({
    wrapper: {
      display: "flex",
      flexDirection: _.direction,
      justifyContent: _.justify,
      alignItems: _.align,
      flexWrap: _.wrap,
      "& > *": {
        margin: _.autocenter ? "auto" : null,
      },
      "& > * + *": {
        [`margin${_.direction === "row" ? "Left" : "Top"}`]: _.gutter,
      },
    },
  }),
};

const Flex = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);

  return (
    <Box {...UI.wrapper} {...propsCleaned}>
      {props.children}
    </Box>
  );
};

export default Flex;
