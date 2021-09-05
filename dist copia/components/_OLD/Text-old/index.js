function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, useUI } from "../../index.js";
import UIProps from "./styles";

const Text = ({
  as,
  variant,
  children,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: as
  }, UIProps.text, {
    typoVariant: variant
  }, rest), children);
};

Text.defaultProps = {
  as: "span",
  variant: "body"
};
export default Text;