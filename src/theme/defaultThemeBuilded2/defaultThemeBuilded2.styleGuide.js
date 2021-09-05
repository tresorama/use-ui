// BREAKPOINTS (MIN WIDTH)...
const BP = {
  xs: "0px",
  sm: "600px",
  md: "960px",
  lg: "1280px",
  xl: "1920px",
};

// SPACING SIZES ...
const SIZE = {
  base: 8, // 8 px
};

// COLORS ...
const BRAND_COLORS = {
  brand1: "#4dabf5",
  brand2: "#1769aa",
  brand2ContrastText: "white",
  brand3Light: "#f73378",
  brand3Dark: "green=>darken()",
  //
};
const COMMON_PALETTE = {
  coral: "coral",
  yellow: "rgb(255 255 0)",
  red: "rgb(255 0 0)",
  orange: "rgb(255 165 0)",
  green: "green",
  white: "#ededed",
  black: "rgba(0, 0, 0, 1)",
  // egggradients
  orangeBasicIncome: "#ff928b",
  orangeBasicIncome2: "#ffac81",
  blueAdeleFirstLove: "#009ffd",
  blueAdeleFirstLove2: "#2a2a72",
};
const COLOR = {
  ...COMMON_PALETTE,
  primary: COMMON_PALETTE.orangeBasicIncome,
  primaryContrastText: BRAND_COLORS.brand2ContrastText,
  //
  secondary: COMMON_PALETTE.blueAdeleFirstLove2,
  secondaryContrastText: COMMON_PALETTE.white,

  success: COMMON_PALETTE.green,
  warning: COMMON_PALETTE.red,
};

// FONT FAMILIES ...
const FONT = {
  fonts: [
    "Arial, serif",
    "Avenir, serif",
    '"Roboto", "Helvetica", "Arial", sans-serif',
  ],
};

// TEXT SIZES ...
const TEXT = {
  xs: "10px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  options: {
    convertToRem: true,
  },
};

const TRANSITION = {
  transitionDuration: {
    SHORT: 400,
  },
  transitionTimingFunction: {
    ONE: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// SPECIAL CSS-SNIPPET FOR CONSISTENT UI ...
const PRESETS = {
  rounded: {
    borderRadius: 1,
    overflow: "hidden",
  },
  boxShadow: {
    boxShadow: "0vh 0vh 10px 0px rgba(0,0,0,0.35)",
  },
  textBorderWhite: {
    textShadow: "-1px -1px #fff, 1px -1px #fff, -1px 1px #fff, 1px 1px #fff",
  },
  textBorderBlack: {
    textShadow: "-1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000",
  },
  transition_Buttons: {
    transitionDuration: "SHORT",
    transitionTimingFunction: "ONE",
  },
};
// TYPOGRAPHY STYLES ...
const TYPO = {
  mainNavItem: {
    fontFamily: 2,
    fontSize: "md",
    fontWeight: "400",
    textDecoration: "underline",
    textUnderlineOffset: "0.2em",
    // textTransform: "uppercase",
  },
  mainNavMobileItem: {
    fontFamily: 3,
    fontSize: "2xl",
    fontWeight: "700",
    textTransform: "capitalize",
    textDecoration: "underline",
  },
  button: {
    fontFamily: 2,
    fontSize: "sm",
    fontWeight: "700",
    textTransform: "uppercase",
    //
    // from material UI button
    lineHeight: "1",
    letterSpacing: "0.02857em",
    // transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // fontFamily: ,
  },
  badge: {
    fontFamily: 2,
    fontSize: "xs",
    fontWeight: "100",
    textTransform: "uppercase",
  },
  heading1: {
    fontFamily: 2,
    fontSize: "2xl",
    fontWeight: "700",
    lineHeight: "1.2",
    // textTransform: "uppercase",
  },
  heading2: {
    fontFamily: 2,
    fontSize: "xl",
    fontWeight: "800",
    // textTransform: "uppercase",
  },
  heading3: {
    fontFamily: 2,
    fontSize: "lg",
    fontWeight: "700",
    // textTransform: "uppercase",
  },
  heading4: {
    fontFamily: 2,
    fontSize: "md",
    fontWeight: "700",
    // textTransform: "uppercase",
  },
  heading5: {
    fontFamily: 2,
    fontSize: "sm",
    fontWeight: "700",
    // textTransform: "uppercase",
  },
  heading6: {
    fontFamily: 2,
    fontSize: "xs",
    fontWeight: "700",
    // textTransform: "uppercase",
  },
  body: {
    fontFamily: 2,
    fontSize: "md",
    fontWeight: "100",
  },
};

/* =================================================== 
      MERGE ALL STATIC TOKENS in defaultTheme
=================================================== */
const defaultThemeTokens = {
  BP,
  SIZE,
  COLOR,
  FONT,
  TEXT,
  TRANSITION,
  //
  TYPO,
  PRESETS,
};
export default styleGuide;
