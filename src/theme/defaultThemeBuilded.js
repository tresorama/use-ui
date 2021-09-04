import { inArray, TYPE } from "../jshelpers/index.js";
import COLOR_UTILITIES from "./colorUtilities.js";

/* =================================================== 
      STATIC THEME TOKENS
=================================================== */
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
  fonts: ["Arial, serif", "Avenir, serif", '"Roboto", "Helvetica", "Arial", sans-serif'],
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

/* =================================================== 
      EXTRACTOR and CONVERTERS
=================================================== */
const EXTRACTOR_ADDONS = props => {
  const { theme } = props;

  // extract special TYPOGRAPHY "style-snippet", to inject ...
  const TYPOprops = theme.TYPO[props.TYPO];

  // extract special PRESETS "style-snippet", to inject ...
  const PRESETSprops = (() => {
    if (!props.PRESETS) return null;
    try {
      const presetNames = TYPE.isArray(props.PRESETS) ? props.PRESETS : [props.PRESETS];

      let cssProps = {};
      presetNames.forEach(
        presetName => (cssProps = { ...cssProps, ...(theme.PRESETS[presetName] || {}) })
      );
      return cssProps;
    } catch (error) {
      return null;
    }
  })();

  return {
    ...(TYPOprops || {}),
    ...(PRESETSprops || {}),
  };
};
EXTRACTOR_ADDONS.NAMES = ["PRESETS", "TYPO"];
const CONVERTERS = {
  getConverterFunction(cssPropKey) {
    let converter = null;
    const { MAP } = this;

    // get converter function for this CSS prop...
    for (const converterName in MAP) {
      if (Object.hasOwnProperty.call(MAP, converterName)) {
        // extract all prop name allowed with this converter ...
        const propsAllowed = MAP[converterName];
        // get convertert if this prop name is included ...
        if (inArray(propsAllowed, cssPropKey)) {
          converter = this[converterName];
          break;
        }
      }
    }
    return converter;
  },
  MAP: {
    getSize: [
      "padding",
      "paddingX",
      "paddingY",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "margin",
      "marginX",
      "marginY",
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft",
      "borderRadius",
    ],
    getTextSize: ["fontSize"],
    getColor: ["color", "backgroundColor", "borderColor"],
    getFontFamily: ["fontFamily"],
    getTransitionTime: ["transitionDuration", "transitionDelay"],
    getTransitionTimingFunction: ["transitionTimingFunction"],
  },
  getSize: (size, { SIZE: S }) => S.getSizeValue(size),
  getTextSize: (size, { TEXT: T }) => T.getFontSizeValue(size),
  getColor: (key, { COLOR: C }) => C.getColorValue(key),
  getFontFamily: (index, { FONT: F }) => F.getFontFamilyValue(index),
  getTransitionTime: (a, { TRANSITION: T }) => T.getTime(a),
  getTransitionTimingFunction: (a, { TRANSITION: T }) => T.getTiming(a),
};

/* =================================================== 
      FUNCTIONAL PART OF defaultTheme
=================================================== */
// PURE FUNCTIONS
const convertPixelToRem = string => {
  // 1rem = 16px in browser => 1 : 16 = x : 10 => x = 1*10/16 = 10 /16 = 5/8

  // i.e. string = '10px'
  const isYetRem = string.indexOf("rem") > -1; // false
  if (isYetRem) return string;
  const pxNum = string.split("px")[0].trim(); // i.e. '10'
  const remNum = `${Number(pxNum) / 16}`;
  return `${remNum}rem`;
};

//
const buildCOLOR = function ({ COLOR }) {
  return {
    ...COLOR,
    methodsRunner(colorCode, methodsString) {
      const newColor = COLOR_UTILITIES.runColorMethodsChain(colorCode, methodsString);
      return newColor;
    },
    getColorValue(a) {
      try {
        // theme color key ???
        const isKey = !!this[a];
        if (isKey) {
          const colorCode = this[a];
          // theme color key is a method ???
          const isMethod = colorCode.split("=>").length > 1;
          if (isMethod) return this.getColorValue(colorCode);
          return colorCode;
        }
        // methods '=>' ???
        const isMethod = a.split("=>").length > 1;
        if (isMethod) {
          const [colorString, methodsString] = a.split("=>");
          const colorCode = this.getColorValue(colorString);
          return this.methodsRunner(colorCode, methodsString);
        }
        throw new Error("No special treament, pass directly");
      } catch (error) {
        return a;
      }
    },
  };
};
const buildTEXT = function ({ TEXT }) {
  const { options, ...rest } = TEXT;

  // build keys array ..
  const keys = [...Object.keys(rest)];
  // build values array ...
  const values = (() => {
    const { convertToRem = true } = options || {};
    const _ = keys.map(key => {
      if (convertToRem) return convertPixelToRem(TEXT[key]);
      return TEXT[key];
    });
    return _;
  })();

  return {
    // ...TEXT,
    keys,
    values,
    getKeyIndex(keyString) {
      return this.keys.indexOf(keyString);
    },
    getValueByIndex(index) {
      return this.values[index];
    },
    getValueByKey(key) {
      try {
        const keyIndex = this.getKeyIndex(key);
        return this.getValueByIndex(keyIndex);
      } catch (error) {
        return null;
      }
    },
    getFontSizeValue(a) {
      try {
        // if 'a' is a TEXT SIZE key pass its value ...
        if (TYPE.isString(a)) {
          const isKey = inArray(this.keys, a);
          if (isKey) return this.getValueByKey(a);
        }
        // if 'a' is a number as index of keys...
        if (TYPE.isNumber(a)) {
          if (Number.isInteger(a)) {
            const keyIndexExists = a < this.keys.length;
            if (keyIndexExists) return this.getValueByKey(this.keys[a]);
          }
        }

        throw new Error();
      } catch (error) {
        return a;
      }
    },
  };
};
const buildFONT = function ({ FONT }) {
  return {
    ...FONT,
    getFontFamilyValue(index) {
      try {
        if (TYPE.isNumber(index)) {
          const isKeyIndex = index - 1 < this.fonts.length;
          if (isKeyIndex) return this.fonts[index - 1];
        }
        throw new Error();
      } catch (error) {}
      return index;
    },
  };
};
const buildSIZE = function ({ SIZE }) {
  return {
    ...SIZE,
    getSizeValue(a) {
      try {
        if (TYPE.isString(a)) return `${a}`;
        if (TYPE.isNumber(a)) return `${a * this.base}px`;
        throw new Error();
      } catch (error) {
        return a;
      }
    },
  };
};
const buildBP = function ({ BP }) {
  //build breakponit keys and values ...
  const keys = [];
  const values = {};
  for (const k in BP) {
    if (Object.hasOwnProperty.call(BP, k)) {
      keys.push(k);
      values[k] = BP[k];
    }
  }

  return {
    keys,
    values,
    getWidthValue(a) {
      let key = "";

      // a === number => index of key
      if (TYPE.isNumber(a)) key = this.keys[a];
      else if (TYPE.isString(a)) {
        // a === string in keys =>  name of key
        const foundKey = this.keys.find(_ => a === _);
        if (foundKey) key = foundKey;
        // a === string not in keys => custom media query
        if (!foundKey) return String(a).trim();
      }
      return this.values[key];
    },
    up(key) {
      return `@media (min-width: ${this.getWidthValue(key)})`;
    },
    down(key) {
      const index = this.keys.indexOf(key);
      const nextKey = this.keys[index];
      return `@media (max-width: ${this.getWidthValue(nextKey)})`;
    },
  };
};
const buildTRANSITION = function ({ TRANSITION }) {
  return {
    ...TRANSITION,
    options: {
      unit: "ms",
    },
    getTime(a) {
      const UNIT = this.options.unit;
      try {
        const isKey = this.transitionDuration[a] !== undefined;
        if (isKey) {
          return `${this.transitionDuration[a]}${UNIT}`;
        }

        const isInteger = Number.isInteger(Number(a));
        if (isInteger) {
          return `${a}${UNIT}`;
        }

        const isMultiply = a.indexOf("*") > -1;
        if (isMultiply) {
          const [key, multiplier] = a.split("*");
          const isKey = this.transitionDuration[key] !== undefined;
          if (isKey) {
            const value = this.transitionDuration[key];
            return `${value * Number(multiplier)}${UNIT}`;
          }
        }
        throw new Error("Pass Directly");
      } catch (error) {
        return a;
      }
    },
    getTiming(a) {
      try {
        const isKey = this.transitionTimingFunction[a] !== undefined;
        if (isKey) return this.transitionTimingFunction[a];
        throw new Error("Pass Directly");
      } catch (error) {
        return a;
      }
    },
  };
};

const themeBuilder = theme => ({
  BP: buildBP(theme),
  COLOR: buildCOLOR(theme),
  SIZE: buildSIZE(theme),
  TEXT: buildTEXT(theme),
  FONT: buildFONT(theme),
  TRANSITION: buildTRANSITION(theme),
  // special
  PRESETS: theme.PRESETS,
  TYPO: theme.TYPO,
  // EXTRACTOR
  EXTRACTOR_ADDONS: EXTRACTOR_ADDONS,
  // CONVERTERS
  CONVERTERS: CONVERTERS,
  CONVERTIBLE_PROPNAMES: (CONVERTERS => {
    if (!CONVERTERS) return [];
    const { MAP } = CONVERTERS;
    let _ = [];
    for (const key in MAP) {
      if (Object.hasOwnProperty.call(MAP, key)) {
        const propNames = MAP[key];
        _ = [..._, ...propNames];
      }
    }
    return _;
  })(CONVERTERS),
  GET_CONVERTER(propName) {
    const isConvertible = inArray(this.CONVERTIBLE_PROPNAMES, propName);
    if (!isConvertible) return;
    return this.CONVERTERS.getConverterFunction(propName);
  },
});
const defaultTheme = themeBuilder(defaultThemeTokens);
export default defaultTheme;
