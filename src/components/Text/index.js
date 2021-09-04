import React from "react";
import { Box, useUI } from "../../index.js";

const sheet = {
  customAPI: props => ({
    typo: props.typo || "body",
    color: props.color || undefined,
  }),
  runner: _ => ({
    text: {
      // special
      TYPO: _.typo,
      // common
      color: _.color,
    },
  }),
};
const Text = props => {
  const [UI] = useUI(sheet, props);
  return <Box {...props} {...UI.text} />;
};
Text.defaultProps = {
  as: "span",
};
export default Text;
