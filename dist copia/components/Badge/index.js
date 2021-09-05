function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box } from "../../index.js"; // badge component

const UI = {
  wrapper: {
    // special
    TYPO: "badge",
    PRESETS: "rounded",
    // common
    paddingX: 1,
    paddingY: 0.5,
    backgroundColor: "primary=>setAlpha(0.2)"
  }
};

const Badge = props => {
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: "span"
  }, UI.wrapper, props));
};

export default Badge;