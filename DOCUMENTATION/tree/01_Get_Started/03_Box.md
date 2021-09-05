# Box

**Box** is the base React Component that :

- receive all **useUI** props
- convert (if needed) **useUI** props through **theme**.
- print the HTML Element

Add a React prop `as="footer"` or `as="ul"`, or any other _HTML Tag_ to change which _tag_ is really printed.
If not provided _default_ is `"div"`.

```javascript
<Box>
  <Box as="span" >My Label</Box>
</Box>

... will be ...

<div>
  <span>My Label</span>
</div>
```

You must always use Box to render HTML elements.

# MAYBE NOT - START

Usually , your usage will be this:

```javascript
// ./components/Button.js
const Button = ({ as = "button", onClick, children, ...props }) => {
  return (
    <Box as={as} onClick={onClick} {...props}>
      {children}
    </Box>
  );
};

//.. components/MyAssembledComponent.js
import Button from "./components/Button.js";

const MyAssembledComponent = (props) => {
  return (
    <Box>
      <Box as="h1">My Beautiful Haeding</Box>
      <Box as="p">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </Box>
      <Button onClick={() => alert("Clicked")}>Click Me</Button>
    </Box>
  );
};
```

And styling / CSS ?

```javascript
//.. components/MyAssembledComponent.js
import Button from "./components/Button.js";

const MyAssembledComponent = (props) => {
  return (
    <Box>
      <Box
        as="h1"
        color="red"
        fontFamily="sans-serif"
        lineHeight="1.1"
        fontSize="2rem"
      >
        My Beautiful Haeding
      </Box>
      <Box
        as="p"
        color="black"
        fontFamily="serif"
        lineHeight="1.6"
        fontSize="1.3rem"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </Box>
      <Button
        onClick={() => alert("Clicked")}
        color="black"
        borderColor="grey"
        backgroundColor="white"
      >
        Click Me
      </Button>
    </Box>
  );
};
```

# MAYBE NOT - END
