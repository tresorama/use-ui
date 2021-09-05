## Build a Complex Dynamic UI Component - A Button

### Button

We provide a **API** with :

- "shape" that can be 'text', 'contained' , or 'outline' , default to 'text',
- "color", that we use as base color for manipulation, default to 'black'

```javascript
import React from "react";
import { Box, useUI } from "@tresorama/use-ui";

const sheet = {
  API: (props) => ({
    shape: props.shape || "text",
    color: props.color || "black",
  }),
  UI: (_) => ({
    buttonWrapper: {
      //special
      TYPO: "button",
      PRESETS: ["roundedCorner", "transition_Buttons"],
      // common
      transitionProperty: "background-color, color, borderColor",
      display: "inline-block",
      border: "1px solid transparent",
      backgroundColor: "transparent",
      paddingY: 1.5,
      paddingX: 2,

      ...("text" === _.shape && {
        backgroundColor: "transparent",
        color: _.color,
        "&:hover": {
          backgroundColor: `${_.color}=>setAlpha(0.08)`,
        },
      }),

      ...("outline" === _.shape && {
        backgroundColor: "transparent",
        color: _.color,
        borderColor: `${_.color}=>setAlpha(0.5)`,
        "&:hover": {
          backgroundColor: `${_.color}=>setAlpha(0.08)`,
          borderColor: _.color,
        },
      }),

      ...("contained" === _.shape && {
        borderColor: "transparent",
        backgroundColor: _.color,
        color: `${_.color}=>contrastTextColor()`,
        "&:hover": {
          backgroundColor: `${_.color}=>darken()`,
        },
      }),
    },
    buttonContent: {
      // common
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "none",
    },
  }),
};

const Button = ({ children, ...props }) => {
  const [UI, propsCleaned] = useUI(sheet, props, []);

  return (
    <Box {...UI.buttonWrapper} {...propsCleaned}>
      <Box {...UI.buttonContent}>{children}</Box>
    </Box>
  );
};

export default Button;
```

The beauty of this Button is that for any given "color" it calculate borderColor, backgroundColor with color manipulation, letting us to change only one prop to change the all "color scheme" of the button.
