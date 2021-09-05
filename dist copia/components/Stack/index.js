function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, useUI } from "../../index.js";
const sheet = {
  customAPI: props => ({
    direction: props.direction || "row",
    // 'row' | 'column'
    gutter: props.gutter || 0 // <Number>

  }),
  runner: _ => ({
    wrapper: {
      display: "flex",
      flexDirection: _.direction,
      "& > * + *": {
        [`margin${_.direction === "row" ? "Left" : "Top"}`]: _.gutter ? _.gutter : undefined
      }
    }
  })
};

const Stack = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return /*#__PURE__*/React.createElement(Box, _extends({}, UI.wrapper, propsCleaned));
};

export default Stack;