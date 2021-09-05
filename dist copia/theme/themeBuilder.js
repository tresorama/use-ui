import COLOR_UTILITIES from "./colorUtilities.js";
import { TYPE, inArray } from "../jshelpers/index.js"; // PURE FUNCTIONS

const convertPixelToRem = string => {
  // 1rem = 16px in browser => 1 : 16 = x : 10 => x = 1*10/16 = 10 /16 = 5/8
  // i.e. string = '10px'
  const isYetRem = string.indexOf("rem") > -1; // false

  if (isYetRem) return string;
  const pxNum = string.split("px")[0].trim(); // i.e. '10'

  const remNum = `${Number(pxNum) / 16}`;
  return `${remNum}rem`;
}; //


const buildCOLOR = function ({
  COLOR
}) {
  return { ...COLOR,

    methodsRunner(colorCode, methodsString) {
      const newColor = COLOR_UTILITIES.runColorMethodsChain(colorCode, methodsString);
      return newColor;
    },

    getColorValue(a) {
      try {
        // theme color key ???
        const isKey = !!this[a];

        if (isKey) {
          const colorCode = this[a]; // theme color key is a method ???

          const isMethod = colorCode.split("=>").length > 1;
          if (isMethod) return this.getColorValue(colorCode);
          return colorCode;
        } // methods '=>' ???


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
    }

  };
};

const buildTEXT = function ({
  TEXT
}) {
  const {
    options,
    ...rest
  } = TEXT; // build keys array ..

  const keys = [...Object.keys(rest)]; // build values array ...

  const values = (() => {
    const {
      convertToRem = true
    } = options || {};

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
        } // if 'a' is a number as index of keys...


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
    }

  };
};

const buildFONT = function ({
  FONT
}) {
  return { ...FONT,

    getFontFamilyValue(index) {
      try {
        if (TYPE.isNumber(index)) {
          const isKeyIndex = index - 1 < this.fonts.length;
          if (isKeyIndex) return this.fonts[index - 1];
        }

        throw new Error();
      } catch (error) {}

      return index;
    }

  };
};

const buildSIZE = function ({
  SIZE
}) {
  return { ...SIZE,

    getSizeValue(a) {
      try {
        if (TYPE.isString(a)) return `${a}`;
        if (TYPE.isNumber(a)) return `${a * this.base}px`;
        throw new Error();
      } catch (error) {
        return a;
      }
    }

  };
};

const buildBP = function ({
  BP
}) {
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
      let key = ""; // a === number => index of key

      if (TYPE.isNumber(a)) key = this.keys[a];else if (TYPE.isString(a)) {
        // a === string in keys =>  name of key
        const foundKey = this.keys.find(_ => a === _);
        if (foundKey) key = foundKey; // a === string not in keys => custom media query

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
    }

  };
};

const buildTRANSITION = function ({
  TRANSITION
}) {
  return { ...TRANSITION,
    options: {
      unit: "ms"
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
    }

  };
};

const themeBuilder = theme => ({ ...theme,
  BP: buildBP(theme),
  COLOR: buildCOLOR(theme),
  SIZE: buildSIZE(theme),
  TEXT: buildTEXT(theme),
  FONT: buildFONT(theme),
  TRANSITION: buildTRANSITION(theme),
  // special
  PRESETS: theme.PRESETS,
  TYPO: theme.TYPO,
  //
  CONVERTERS: theme.CONVERTERS,
  //
  CONVERTIBLE_PROPNAMES: (CONVERTERS => {
    if (!CONVERTERS) return [];
    const {
      MAP
    } = CONVERTERS;
    let _ = [];

    for (const key in MAP) {
      if (Object.hasOwnProperty.call(MAP, key)) {
        const propNames = MAP[key];
        _ = [..._, ...propNames];
      }
    }

    return _;
  })(theme.CONVERTERS),

  GET_CONVERTER(propName) {
    const isConvertible = inArray(this.CONVERTIBLE_PROPNAMES, propName);
    if (!isConvertible) return;
    return this.CONVERTERS.getConverterFunction(propName);
  }

});

export default themeBuilder;