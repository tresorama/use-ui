import { clone } from "./clone.js";
import { inArray } from "./array.js";

export const removeFalsyPropsFromObject = obj => {
  const falsyValues = [undefined, null, false];
  let _ = clone(obj);
  for (const key in _) {
    if (Object.hasOwnProperty.call(_, key)) {
      if (inArray(falsyValues, _[key])) delete _[key];
    }
  }
  return { ..._ };
};
export const removeAllBPropFromA = (a, b) => {
  const _ = {};
  for (const key in a) {
    if (Object.hasOwnProperty.call(a, key)) {
      if (Object.hasOwnProperty.call(b, key)) continue;
      _[key] = a[key];
    }
  }
  return _;
};
export const prefixObjectKeys = (obj, prefix) => {
  const _ = {};
  for (const propKey in obj) {
    if (Object.hasOwnProperty.call(obj, propKey)) {
      const propValue = obj[propKey];
      _[`${prefix}${propKey}`] = propValue;
    }
  }
  return clone(_);
};
