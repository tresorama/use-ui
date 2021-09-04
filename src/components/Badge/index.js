import React from "react";
import { Box } from "../../index.js";

// badge component
const UI = {
  wrapper: {
    // special
    TYPO: "badge",
    PRESETS: "rounded",
    // common
    paddingX: 1,
    paddingY: 0.5,
    backgroundColor: "primary=>setAlpha(0.2)",
  },
};
const Badge = props => {
  return <Box as="span" {...UI.wrapper} {...props} />;
};
export default Badge;
