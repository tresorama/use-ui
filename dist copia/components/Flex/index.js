function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, useUI } from "../../index.js";
const sheet = {
  customAPI: props => ({
    direction: props.direction || "row",
    wrap: props.wrap ? "wrap" : "nowrap",
    justify: props.justify || null,
    align: props.align || null,
    gutter: props.gutter || null,
    autocenter: props.autocenter || false
  }),
  runner: _ => ({
    wrapper: {
      display: "flex",
      flexDirection: _.direction,
      justifyContent: _.justify,
      alignItems: _.align,
      flexWrap: _.wrap,
      "& > *": {
        margin: _.autocenter ? "auto" : null
      },
      "& > * + *": {
        [`margin${_.direction === "row" ? "Left" : "Top"}`]: _.gutter
      }
    }
  })
};

const Flex = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return /*#__PURE__*/React.createElement(Box, _extends({}, UI.wrapper, propsCleaned), props.children);
};

export default Flex;