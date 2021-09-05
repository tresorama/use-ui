function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, useUI } from "../../index";
const sheet = {
  customAPI: props => ({
    negate: props.negate || false,
    circle: props.circle || false
  }),
  runner: _ => ({
    img: {
      display: "inline-block",
      maxWidth: "100%",
      height: "auto",
      ...(_.negate && {
        filter: "invert(1)"
      }),
      ...(_.circle && {
        borderRadius: "50%",
        overflow: "hidden"
      })
    }
  })
};

const Image = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return /*#__PURE__*/React.createElement(Box, _extends({}, UI.img, propsCleaned));
};

Image.defaultProps = {
  as: "img"
};
export default Image;