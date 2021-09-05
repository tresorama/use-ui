import { inArray, TYPE } from "../jshelpers/index.js";
import COLOR_UTILITIES from "./colorUtilities.js";

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
export default CONVERTERS;
