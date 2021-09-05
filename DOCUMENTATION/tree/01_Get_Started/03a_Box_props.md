## useUI props

## CSS properties

Box can receive all props of regular CSS, camelCased, with value as string.

Box can receive also pseudo and nested selectors , `&:before`, `&:hover`, `& > p`, `& > *:nth-of-type(1)`, ... as objects.
These feature are provided by [@emotion/styled]().

Box can receive also special values for some regular CSS props, that will be translated in CSS by **theme**.
These CSS props are considered **theme related**.
