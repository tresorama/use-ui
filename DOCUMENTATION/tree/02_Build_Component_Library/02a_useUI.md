**useUI** is a function that help us building our UI Component Library, but is necessary only on "dynamic" UI Components, that change aspect based on props and state.

useUI take advantage of React, and "re-render" process based on props changes.

This is why we prefixed with "use" the function that make available to us "dynamic" styling, because in the future this fake Hook can be transformed into a real React Hook.
Until now is a pure function.

## Let's break it down

On every "Stack" component re-render phase we build a UI object by calling **_useUI_**.
Then we spread it to Box.

```javascript
const [UI, propsCleaned] = useUI(sheet, props,[]);
return <Box as="span" {...UI} {...propsCleaned} >;
```

**useUI** utilize the **sheet** object we declared above and **props** to build the **UI** object.
**useUI** also return us props with **sheet.API props** removed, as **propsCleaned**.

---

## sheet

```javascript
const sheet = {
  API: (props) => ({}), // => must return an {}
  UI: (_) => ({}), // => must return an {}
};
```

**REMEMBER:**

> Every props you need in the **UI** must be defined in **API**, along with their "default" values.
> **"sheet"** object can be named as you prefer. It's just an object with two function properties.
> **"API"** is **required** , and name can't be changed.
> **"UI"** is **required** , and name can't be changed.

Example:

```javascript
const sheet = {
  API: props => ({
    color: props.color || "black",
  }),
  UI: _ => ({
    color: `${_.color}=>setAlpha(0.5)`,
    borderColor: _.color,
    padding: 2
  }),
};

// later in component ..
const Component = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);
  return <Box {...UI} >
}
```

## propsCleaned

Exists an other shape of calling useUI, `const [UI] = useUI(sheet,props);`
This shape is faster because it does not return us "propCleaned".

You are maybe wondering which is the purpose of "cleaning" props.
Now we make it clear.

Let's say our UI Component provide an API with a "color" prop, and use the "faster" useUI shape.

```javascript
import React from "react";
import { Box, useUI } from "@tresorma/use-ui";

const sheet = {
  API: props => ({
    color: props.color || "black",
  }),
  UI: _ => ({
    color: `${_.color}=>setAlpha(0.5)`,
    borderColor: _.color,
    padding: ...
  }),
};

const Button = props => {
  const [UI] = useUI(sheet, props);
  return <Box {...UI} {...props} />;
};

export default Button;
```

... and we consume Button like this

```javascript
const ConsumerOfUIComponents = () => {
  const handleClick = () => alert("ciao");
  return (
    <Box>
      <Button color="primary" onClick={handleClick}>
        Click Me
      </Button>
    </Box>
  );
};
```

In Button, we receive :

```javascript
props = {
  color: 'primary',
  onClick: ... ,
}
```

... then we build UI object , that results in :

```javascript
UI = {
  color: "primary=>setAlpha(0.5)",
  borderColor: "primary",
};
```

... and spread both `UI` and `props` :

```javascript
return <Box {...UI} {...props} />;
```

Box will receive `color = 'primary'` instead of `color = 'primary=>setAlpha(0.5)`.
Because we spread `props` after spreading `UI`.

So we use this form :

```javascript
const [UI, propsCleaned] = useUI(sheet, props, []);
return <Box {...UI} {...propsCleaned} />;
```

.. where `propsCleaned = { onClick: ... }` does not contain any "color" prop, so it won't be overridden.

When you are sure that passing down props is not a problem, you can use the "faster" shape.
In all other case use the usual shape.
