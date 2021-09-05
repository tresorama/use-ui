function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, Flex, useUI } from "../../index.js";
const sheet = {
  customAPI: props => ({
    shape: props.shape || "text",
    color: props.color || "black"
  }),
  runner: _ => {
    return {
      buttonWrapper: {
        //special
        TYPO: "button",
        PRESETS: "transition_Buttons",
        // common
        border: "1px solid transparent",
        backgroundColor: "transparent",
        borderRadius: "5px",
        overflow: "hidden",
        position: "relative",
        paddingY: 1.5,
        paddingX: 2,
        display: "inline-block",
        transitionProperty: "background-color, color, borderColor",
        ...("text" === _.shape && {
          backgroundColor: "transparent",
          color: _.color,
          "&:hover": {
            backgroundColor: `${_.color}=>setAlpha(0.08)`
          }
        }),
        ...("outline" === _.shape && {
          backgroundColor: "transparent",
          color: _.color,
          borderColor: `${_.color}=>setAlpha(0.5)`,
          "&:hover": {
            backgroundColor: `${_.color}=>setAlpha(0.08)`,
            borderColor: _.color
          }
        }),
        ...("contained" === _.shape && {
          borderColor: "transparent",
          backgroundColor: _.color,
          color: `${_.color}=>contrastTextColor()`,
          "&:hover": {
            backgroundColor: `${_.color}=>darken()`
          }
        })
      },
      buttonContent: {
        // Flex API
        direction: "row",
        gutter: 1,
        // common
        pointerEvents: "none"
      }
    };
  }
};

const Button = ({
  as,
  onClick,
  children,
  ...props
}) => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: as,
    onClick: onClick
  }, UI.buttonWrapper, propsCleaned), /*#__PURE__*/React.createElement(Flex, UI.buttonContent, children));
};

Button.defaultProps = {
  as: "button",
  onClick: () => {}
};
export default Button;