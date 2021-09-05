## Data Flow

Box is a React Component that can receive all CSS features as props, like backgroundColor, transform, position, and so on.

Box for each prop call **theme.CONVERT_UI_PROP(propName, propValue)**, that convert a Design Token Values ( i.e. "primary" for backgroundColor ) into printable CSS value ( i.e. "#67df3s" )

Box, can receive also a THEME object, that let us using the power of JS into CSS.

Let's say ...

```javascript
<Box marginTop={4} backgroundColor="primary" onClick={someFunction}>
```

Box parse only "UI" related props, so in this case

```javascript
const parsed = {
  marginTop: 4,
  backgroundColor: "primary",
};
```

and for each parsed prop...

```javascript
for (propName in parsed) { // propName = "marginTop"

	const converter = THEME.CONVERTER.getConverterFunction(propName);
    // ask to theme for a converter for "marginTop" prop, if any...

	if ( converter ) {

	  const propValue = parsed[propName];// propValue = 4 (Number)
	  const themedValue = converter(propValue) // themedValue = "32px"
	}
```

```javascript
for (propName in parsed) { // propName = "backgroundColor"

	const converter = THEME.CONVERTER.getConverterFunction(propName);
    // ask to theme for a converter for "backgroundColor" prop, if any...

	if ( converter ) {

	  const propValue = parsed[propName];// propValue = "primary"
	  const themedValue = converter(propValue) // themedValue = "rgb(43,78,10)"
	}
```

This bridge between Box and Theme is the foundation of our workspace.
