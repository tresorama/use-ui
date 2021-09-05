function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, useUI } from "../../index.js";
import getStyle from "./styles";

const Button = ({
  as,
  shape,
  variant,
  children,
  ...rest
}) => {
  const style = getStyle({
    shape,
    variant
  });
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: as
  }, style.buttonWrapper, rest), /*#__PURE__*/React.createElement(Box, style.buttonContent, children));
};

Button.defaultProps = {
  as: "button",
  shape: "text",
  variant: "root"
};
export default Button;