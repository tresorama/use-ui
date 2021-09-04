/* =================================================== 
      STATIC UI/Style/CSS
        => means that WON'T change un props change.
        
      IT IS SIMPLEST CASE POSSIBLE.
=================================================== */

// in 'ExampleComponent.js'

const UI = {
  wrapperStyles: {
    backgroundColor: "red",
    color: "white",
  },
  innerStyles: {
    textDecoration: "underline",
  },
};

const ExampleComponent_STATIC = props => (
  <Box {...UI.wrapperStyles} {...props}>
    <Box {...UI.innerStyles} />
  </Box>
);

/* =================================================== 
      DYNAMIC UI/Style/CSS
        => means that WILL change un props change.
        
      IT HAS TWO VARIATIONS:
        1_ When you DON'T need to pass props further down
        2_ When you need.

      IN BOTH VARIATION , YOU MUST USE A 'SHEET' (object) TO CALCULATE STYLES

=================================================== */

// in 'ExampleComponent.js'

const sheet = {
  customAPI: props => ({
    negateColors: props.negateColors || false,
  }),
  runner: _ => ({
    wrapperStyles: {
      maxWidth: "100%",
      ...(_.negate && {
        filter: "invert(1)",
      }),
    },
    innerStyles: {
      textTransform: "uppercase",
    },
  }),
};

// 1_ When you DON'T need to pass props further down => DYNAMIC SIMPLE
const ExampleComponent_DYNAMIC = props => {
  const [UI] = useUI(sheet, props);

  return (
    <Box {...UI.wrapperStyles} {...props}>
      <Box {...UI.innerStyles} />
    </Box>
  );
};
// 2_ When you need => DYNAMIC EXTENDED - WHEN YOU CARE IF CUSTOMAPI PROPS WILL BE PASSED DOWN, AND WANT TO PREVENT INSTEAD
const ExampleComponent_DYNAMIC_EXT = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);

  return (
    <Box {...UI.wrapperStyles} {...propsCleaned}>
      <Box {...UI.innerStyles} />
    </Box>
  );
};
