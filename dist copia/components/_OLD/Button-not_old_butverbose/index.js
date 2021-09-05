function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Box, Flex, useUI } from "../../index.js"; // const sheet = {
//   customAPI: props => ({
//     shape: props.shape || "text", // 'text' | 'outline' | 'contained'
//     variant: props.variant || "root", // 'root' | 'primary' | 'secondary'
//     color: props.color || undefined,
//   }),
//   runner: _ => {
//     const style = {
//       buttonWrapper: {
//         root: {
//           border: "1px solid transparent",
//           backgroundColor: "transparent",
//           borderRadius: "5px",
//           overflow: "hidden",
//           position: "relative",
//           paddingY: 1,
//           paddingX: 2,
//           // display: "inline-flex",
//           // justifyContent: "center",
//           // alignItems: "center",
//           display: "inline-block",
//           transitionDuration: "SHORT",
//           transitionDelay: 0,
//           transitionTimingFunction: "ONE",
//           transitionProperty: "background-color, color, borderColor",
//           // transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//         },
//         text: {
//           root: {
//             backgroundColor: "transparent",
//             // color: "black",
//             color: _.color ? _.color : "black",
//             "&:hover": {
//               // backgroundColor: "black=>setAlpha(0.08)",
//               backgroundColor: `${_.color ? _.color : "black"}=>setAlpha(0.08)`,
//             },
//           },
//           primary: {
//             backgroundColor: "transparent",
//             // color: "primary",
//             color: _.color ? _.color : "primary",
//             "&:hover": {
//               // backgroundColor: "primary=>setAlpha(0.08)",
//               backgroundColor: `${_.color ? _.color : "primary"}=>setAlpha(0.08)`,
//             },
//           },
//           secondary: {
//             backgroundColor: "transparent",
//             // color: "secondary",
//             color: _.color ? _.color : "secondary",
//             "&:hover": {
//               // backgroundColor: "secondary=>setAlpha(0.08)",
//               backgroundColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.08)`,
//             },
//           },
//         },
//         outline: {
//           root: {
//             backgroundColor: "transparent",
//             // color: "black",
//             // borderColor: "black=>setAlpha(0.5)",
//             color: _.color ? _.color : "black",
//             borderColor: `${_.color ? _.color : "black"}=>setAlpha(0.5)`,
//             "&:hover": {
//               // backgroundColor: "black=>setAlpha(0.08)",
//               // borderColor: "black",
//               backgroundColor: `${_.color ? _.color : "black"}=>setAlpha(0.08)`,
//               borderColor: _.color ? _.color : "black",
//             },
//           },
//           primary: {
//             backgroundColor: "transparent",
//             // color: "primary",
//             // borderColor: "primary=>setAlpha(0.5)",
//             color: _.color ? _.color : "primary",
//             borderColor: `${_.color ? _.color : "primary"}=>setAlpha(0.5)`,
//             "&:hover": {
//               // backgroundColor: "primary=>setAlpha(0.08)",
//               // borderColor: "primary",
//               backgroundColor: `${_.color ? _.color : "primary"}=>setAlpha(0.08)`,
//               borderColor: _.color ? _.color : "primary",
//             },
//           },
//           secondary: {
//             backgroundColor: "transparent",
//             // color: "secondary",
//             // borderColor: "secondary=>setAlpha(0.5)",
//             color: _.color ? _.color : "secondary",
//             borderColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.5)`,
//             "&:hover": {
//               // backgroundColor: "secondary=>setAlpha(0.08)",
//               // borderColor: "secondary",
//               backgroundColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.08)`,
//               borderColor: _.color ? _.color : "secondary",
//             },
//           },
//         },
//         contained: {
//           root: _.color
//             ? {
//                 borderColor: "transparent",
//                 backgroundColor: _.color,
//                 color: `${_.color}=>contrastTextColor()`,
//                 "&:hover": {
//                   backgroundColor: `${_.color}=>darken()`,
//                 },
//               }
//             : {
//                 borderColor: "transparent",
//                 backgroundColor: "black=>setAlpha(0.08)",
//                 color: "black",
//                 "&:hover": {
//                   backgroundColor: "black=>setAlpha(0.2)",
//                 },
//               },
//           primary: {
//             borderColor: "transparent",
//             // backgroundColor: "primary",
//             backgroundColor: _.color ? _.color : "primary",
//             // color: "primaryContrastText",
//             color: `${_.color ? _.color : "primary"}=>contrastTextColor()`,
//             "&:hover": {
//               // backgroundColor: "primary=>darken()",
//               backgroundColor: `${_.color ? _.color : "primary"}=>darken()`,
//             },
//           },
//           secondary: {
//             borderColor: "transparent",
//             // backgroundColor: "secondary",
//             backgroundColor: _.color ? _.color : "secondary",
//             // color: "secondaryContrastText",
//             color: `${_.color ? _.color : "secondary"}=>contrastTextColor()`,
//             "&:hover": {
//               // backgroundColor: "secondary=>darken()",
//               backgroundColor: `${_.color ? _.color : "secondary"}=>darken()`,
//             },
//           },
//         },
//       },
//       buttonContent: {
//         // Flex API
//         direction: "row",
//         gutter: 1,
//         // common
//         pointerEvents: "none",
//       },
//     };
//     return {
//       buttonWrapper: {
//         typoVariant: "button",
//         ...style.buttonWrapper.root,
//         ...style.buttonWrapper[_.shape].root,
//         ...style.buttonWrapper[_.shape][_.variant],
//       },
//       buttonContent: {
//         ...style.buttonContent,
//       },
//     };
//   },
// };

const sheet = {
  customAPI: props => ({
    shape: props.shape || "text",
    // 'text' | 'outline' | 'contained'
    colorScheme: props.colorScheme || "root",
    // 'root' | 'primary' | 'secondary'
    color: props.color || undefined
  }),
  runner: _ => {
    const style = {
      buttonWrapper: {
        root: {
          border: "1px solid transparent",
          backgroundColor: "transparent",
          borderRadius: "5px",
          overflow: "hidden",
          position: "relative",
          paddingY: 1,
          paddingX: 2,
          display: "inline-block",
          //
          transitionDuration: "SHORT",
          transitionDelay: 0,
          transitionTimingFunction: "ONE",
          transitionProperty: "background-color, color, borderColor"
        },
        text: {
          root: {
            backgroundColor: "transparent",
            color: _.color ? _.color : "black",
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "black"}=>setAlpha(0.08)`
            }
          },
          primary: {
            backgroundColor: "transparent",
            color: _.color ? _.color : "primary",
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "primary"}=>setAlpha(0.08)`
            }
          },
          secondary: {
            backgroundColor: "transparent",
            color: _.color ? _.color : "secondary",
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.08)`
            }
          }
        },
        outline: {
          root: {
            backgroundColor: "transparent",
            color: _.color ? _.color : "black",
            borderColor: `${_.color ? _.color : "black"}=>setAlpha(0.5)`,
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "black"}=>setAlpha(0.08)`,
              borderColor: _.color ? _.color : "black"
            }
          },
          primary: {
            backgroundColor: "transparent",
            color: _.color ? _.color : "primary",
            borderColor: `${_.color ? _.color : "primary"}=>setAlpha(0.5)`,
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "primary"}=>setAlpha(0.08)`,
              borderColor: _.color ? _.color : "primary"
            }
          },
          secondary: {
            backgroundColor: "transparent",
            color: _.color ? _.color : "secondary",
            borderColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.5)`,
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.08)`,
              borderColor: _.color ? _.color : "secondary"
            }
          }
        },
        contained: {
          root: _.color ? {
            borderColor: "transparent",
            backgroundColor: _.color,
            color: `${_.color}=>contrastTextColor()`,
            "&:hover": {
              backgroundColor: `${_.color}=>darken()`
            }
          } : {
            borderColor: "transparent",
            backgroundColor: "black=>setAlpha(0.08)",
            color: "black",
            "&:hover": {
              backgroundColor: "black=>setAlpha(0.2)"
            }
          },
          primary: {
            borderColor: "transparent",
            backgroundColor: _.color ? _.color : "primary",
            color: `${_.color ? _.color : "primary"}=>contrastTextColor()`,
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "primary"}=>darken()`
            }
          },
          secondary: {
            borderColor: "transparent",
            backgroundColor: _.color ? _.color : "secondary",
            color: `${_.color ? _.color : "secondary"}=>contrastTextColor()`,
            "&:hover": {
              backgroundColor: `${_.color ? _.color : "secondary"}=>darken()`
            }
          }
        }
      },
      buttonContent: {
        // Flex API
        direction: "row",
        gutter: 1,
        // common
        pointerEvents: "none"
      }
    };
    return {
      buttonWrapper: {
        typoVariant: "button",
        ...style.buttonWrapper.root,
        ...style.buttonWrapper[_.shape].root,
        ...style.buttonWrapper[_.shape][_.colorScheme]
      },
      buttonContent: { ...style.buttonContent
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
  const UI = useUI(sheet, props);
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: as,
    onClick: onClick
  }, UI.buttonWrapper, props), /*#__PURE__*/React.createElement(Flex, UI.buttonContent, children));
};

Button.defaultProps = {
  as: "button",
  onClick: () => {}
};
export default Button;