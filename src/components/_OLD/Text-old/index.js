import React from "react";
import { Box, useUI } from "../../index.js";
import UIProps from "./styles";

const Text = ({ as, variant, children, ...rest }) => {
  return (
    <Box as={as} {...UIProps.text} typoVariant={variant} {...rest}>
      {children}
    </Box>
  );
};
Text.defaultProps = {
  as: "span",
  variant: "body",
};
export default Text;
