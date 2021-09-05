function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, useUI } from "../../index.js";
const sheet = {
  customAPI: props => ({
    color: props.color || "black"
  }),
  runner: _ => ({
    iconWrapper: {
      // special
      PRESETS: "transition_Buttons",
      // common
      transitionProperty: "color",
      color: _.color,
      display: "flex"
    }
  })
};

const Icon = ({
  children: iconComponent,
  ...props
}) => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return /*#__PURE__*/React.createElement(Box, _extends({}, UI.iconWrapper, propsCleaned), iconComponent);
};

export default Icon;