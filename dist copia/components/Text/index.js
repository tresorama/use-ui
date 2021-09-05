function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, useUI } from "../../index.js";
const sheet = {
  customAPI: props => ({
    typo: props.typo || "body",
    color: props.color || undefined
  }),
  runner: _ => ({
    text: {
      // special
      TYPO: _.typo,
      // common
      color: _.color
    }
  })
};

const Text = props => {
  const [UI] = useUI(sheet, props);
  return /*#__PURE__*/React.createElement(Box, _extends({}, props, UI.text));
};

Text.defaultProps = {
  as: "span"
};
export default Text;