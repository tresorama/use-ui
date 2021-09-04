import React from "react";
import { Box, useUI } from "../../index.js";

const sheet = {
  customAPI: props => ({
    color: props.color || "black",
  }),
  runner: _ => ({
    iconWrapper: {
      // special
      PRESETS: "transition_Buttons",
      // common
      transitionProperty: "color",
      color: _.color,
      display: "flex",
    },
  }),
};

const Icon = ({ children: iconComponent, ...props }) => {
  const [UI, propsCleaned] = useUI(sheet, props, []);

  return (
    <Box {...UI.iconWrapper} {...propsCleaned}>
      {iconComponent}
    </Box>
  );
};

export default Icon;
