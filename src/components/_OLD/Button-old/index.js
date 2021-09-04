import React from "react";
import { Box, useUI } from "../../index.js";
import getStyle from "./styles";

const Button = ({ as, shape, variant, children, ...rest }) => {
  const style = getStyle({ shape, variant });
  return (
    <Box as={as} {...style.buttonWrapper} {...rest}>
      <Box {...style.buttonContent}>{children}</Box>
    </Box>
  );
};

Button.defaultProps = {
  as: "button",
  shape: "text",
  variant: "root",
};
export default Button;
