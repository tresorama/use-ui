function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Button, Icon } from "../../index.js";
import { useUI } from "../../stylingAPI/index.js";
const sheet = {
  customAPI: props => ({
    color: props.color || "black"
  }),
  runner: _ => ({
    button: {
      //Button API
      shape: "text"
    },
    icon: {
      color: _.color
    }
  })
};

const IconButton = ({
  children: iconComponent,
  ...props
}) => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return /*#__PURE__*/React.createElement(Button, _extends({}, UI.button, propsCleaned), /*#__PURE__*/React.createElement(Icon, UI.icon, iconComponent));
};

export default IconButton;