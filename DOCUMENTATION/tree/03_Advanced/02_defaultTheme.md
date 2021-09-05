**defaultTheme** is a "special" object , inspired by material ui theme in the structure, that let us do things:
Serve our design token.
Provide features and tools that help defining styles property in Components.

## CSS properties theme related - defaultTheme

Values convertìsion in done by theme, here we discuss "defaultTheme" behaviour.

There are two "special" props that Box can also receive. [TYPO and PRESETS]().

- **"margin"** or **"padding"** props, and **"borderRadius"**, can receive a number, this number will be multiplied by a _base size value_ defined in theme, let's say 8px, converting our `margin: 4` in `margin: "32px"`, or `margin: 0.5` in `margin: "4px"`.

- **"color"**, **"backgroundColor"** and **"borderColor"** can receive , _key string_ that will be searched in theme and converted.
  So `borderColor: "primary"` became `borderColor: "#ff4489"`.
  You can provide a _color method string_ like `borderColor: "primary=>darken(20)+setAlpha(0.5)"` or `borderColor: "#ff00ff=>darken(20)+setAlpha(0.5)"`and value will be calculated by theme.
  This feature enable good reusability in components like buttons, where we receive only one base color , and set border, background and text color in relation around this base color. [See code of this button]()

- **"fontSize"** can receive a _key string_, in t-shirt scale , like `fontSize: "sm"` or `fontSize: "2xl"`.

- **"fontFamily"** a _index_ indicating which font in a list grab. Like `fontFamily: 1` or `fontFamily: 3`.

- **"transitionDuration"** and **"transitionDelay"** can receive a _key string_, like `transitionDuration: "SHORT".`
  This will grab a value in **theme** named "SHORT" and inject it.
  You can use calculation, `transitionDuration: "SHORT*0.5"` calculate the mathematical half value of "SHORT".

- **"transitionTimingFunction"** can receive a _key string_, like `transitionTimingFunction: "SMOOTH".`
  This will grab a value in **theme** named "SMOOTH" and inject it.

|                                     | what : type                      | effect                                    | real example                                                                              |
| ----------------------------------- | -------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| margin, padding, borderRadius       | _multiplier_ : `<Number>`        | `<Number> * theme.SIZE`                   | `<Box marginTop={4}>`                                                                     |
| color, backgroundColor, borderColor | _key string_ : `<String>`        | grab from `theme.COLORS`                  | `<Box borderColor="secondary" color="success">`                                           |
| color, backgroundColor, borderColor | _method string_ : `<String>`     | calculate the manipulation                | `<Box borderColor="secondary=>darken(30)+setAlpha(0.5)" color="#ff22fa=>contrastText()">` |
| fontSize                            | _key string_ : `<String>`        | grab from `theme.TEXT`                    | `<Box fontSize="2xl">`, `<Box fontSize="xs">`                                             |
| transitionDuration, transitionDelay | _key string_ : `<String>`        | grab from `theme.TRANSITION`              | `<Box transitionDuration="LONG" transitionDelay="SHORT">`                                 |
| transitionDuration, transitionDelay | _key method string_ : `<String>` | grab from `theme.TRANSITION` and multiply | `<Box transitionDuration="LONG*2" transitionDelay="SHORT*0.5">`                           |

## TYPO and PRESETS

There are two "special" props that Box can also receive. TYPO and PRESETS.
`<Box TYPO="heading3" PRESETS="boxShadowed">`.

### TYPO

Writing `<Box fontFamily="2xl" >`, `<Box letterSpacing="0.2" >` directly in component is not an ideal solution, when you need to change multiple elements with "same" typography.
To avoid confusion in the code base, we **DO NOT WRITE** typography styles directly.

We use `TYPO: "button"`, or `TYPO: "heading2"` to inject typography styles in Component.
Theses **TYPO** are object of typography CSS props, defined in **theme**.

```javascript
button: {
  fontSize: 'sm',
  letterSpacing: '0.2',
  lineHeight: '1.5',
  fontWeight: '400',
},
heading1: {...},
heading2: {
  fontSize: 'xl',
  letterSpacing: '0.2',
  lineHeight: '1.8',
  fontWeight: '700',
}
```

### PRESETS

With same idea, we use `<Box PRESETS={['roundedCorner', 'boxShadowed']} >` when we need to be consistent through the app.
These **PRESETS** are object of other props , defined in **theme**,

```javascript
roundedCorner: {
  borderRadius: 4,
  overflow: 'hidden',
}
boxShadowed: {
  boxShadow: "1px 3px rgb(0,0,0,0.5)"
}
```

Doing that allow us to update highly reused CSS rules in one single place, **theme**, avoiding us to edit several individual components for the same change.
It's what we always did, with "class" in CSS.

A good use of preset is for transition, where in **theme** we define all "technical" transition stuff:

```javascript
// in theme
transition_Buttons: {
  transitionDuration: "SHORT",
  transitionTimingFunction: "SMOOTH",
}
```

... and in component we recall the preset and chose on which property enable it.

```javascript
// in Component
<Box PRESETS="transition_Buttons" transitionProperty="color, borderColor">
```

|         | what : type                       | effect                    | real example                                                            |
| ------- | --------------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| TYPO    | _key string_ : `<String>`         | grab from `theme.TYPO`    | `<Box TYPO="navItemText">`                                              |
| PRESETS | _key string_ : `<String>`         | grab from `theme.PRESETS` | `<Box PRESETS="roundedCorner">`                                         |
| PRESETS | _array of key string_ : `<Array>` | grab from `theme.PRESETS` | `<Box PRESETS={["roundedCorner", "boxShadowed", "textBorderedWhite"]}>` |
