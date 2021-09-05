# Stack ( a Componet with an API )

Imagine your are coding a Stack, a Layout Component.
Ideally you want Stack be used like this.

```javascript
<Stack direction="column" gutter={'20px'}>
  <Button>
  <Text>
</Stack>
```

What we want is a place where define a Stack API, with default values.
Stack API structure:

- direction: 'row' or 'column', default 'row'
- gutter: valid css unit value, default null

This API must be written in a clear to read way.
For these scenario we use **useUI**

```javascript
// in Stack.js
import React from "react";
import { Box, useUI } from "@useui/react";

const stylesheet = {
  // define/parse the Stack API.
  API: (props) => ({
    direction: props.direction || "row",
    gutter: props.gutter || null,
  }),

  // consume the parsed API and return UI object.
  UI: (_) => ({
    display: "flex",
    flexDirection: _.direction,
    "& > * + *": {
      ...(_.direction === "row" && {
        marginLeft: _.gutter,
      }),
      ...(_.direction === "column" && {
        marginTop: _.gutter,
      }),
    },
  }),
};

const Stack = (props) => {
  //on every re-render of React re-build the "UI" object based on "props" that are changed.
  // ignore "propsCleaned" for now ...
  const [UI, propsCleaned] = useUI(stylesheet, props, []);

  // spread the UI object in <Box>.
  return <Box {...UI} {...propsCleaned} />;
};

export default Stack;
```

#### Button

We provide an **API** with :

- "shape" that can be 'text', 'contained' , or 'outline' , default to 'text',
- "color", that we use as base color for manipulation, default to 'black'

```javascript
import React from "react";
import { Box, useUI } from "@useui/react";

const stylesheet = {
  API: (props) => ({
    shape: props.shape || "text",
    color: props.color || "black",
  }),
  UI: (_) => ({
    buttonWrapper: {
      border: "1px solid transparent",
      borderRadius: "5px",
      overflow: "hidden",
      position: "relative",
      paddingY: '1.5em',
      paddingX: '2em',
      display: "inline-block",

      ...("text" === _.shape && "primary" ===_.color && {
        backgroundColor: "transparent",
        color: 'red',
        "&:hover": {
          backgroundColor: `orange`,
        },
      }),
      ...("text" === _.shape && "secondary" ===_.color && {
        backgroundColor: "transparent",
        color: 'blue',
        "&:hover": {
          backgroundColor: `lightblue`,
        },
      }),


      ...("outline" === _.shape && "primary" ===_.color && {
        backgroundColor: "transparent",
        color: 'red',
        borderColor: `orange`,
        "&:hover": {
          backgroundColor: `orange`,
          borderColor: 'red',
        },
      }),
      ...("outline" === _.shape && "secondary" ===_.color && {
        backgroundColor: "transparent",
        color: 'blue',
        borderColor: `lightblue`,
        "&:hover": {
          backgroundColor: `lightblue`,
          borderColor: 'blue',
        },
      }),


      ...("contained" === _.shape && && "primary" ===_.color && {
        borderColor: "transparent",
        backgroundColor: 'red',
        color: `white`,
        "&:hover": {
          backgroundColor: `darkred`,
        },
      }),
    },
      ...("contained" === _.shape && && "secondary" ===_.color && {
        borderColor: "transparent",
        backgroundColor: 'blue',
        color: `white`,
        "&:hover": {
          backgroundColor: `darkblue`,
        },
      }),

    buttonContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "none",
    },
  }),
};

const Button = ({ children, ...props }) => {
  const [UI, propsCleaned] = useUI(stylesheet, props, []);

  return (
    <Box {...UI.buttonWrapper} {...propsCleaned}>
      <Box {...UI.buttonContent}>{children}</Box>
    </Box>
  );
};

export default Button;
```
