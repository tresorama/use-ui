// js hepers
import {
  extractPropertiesByCondition,
  excludePropertiesByCondition,
  updateSubObjectsOnlyWith,
  inArray,
  TYPE,
  clone,
} from "../jshelpers/index.js";
import { EXTRACTOR } from "./extractOnlyUIProps";
import { default as fallbackTheme } from "../theme/defaultThemeBuilded";

// PURE FUNCTIONS
const isEmptyObject = (object) => Object.keys(object).length === 0;

// BUSINESS LOGIC FUNCTIONS
const isModifier = (propName) => propName.indexOf("&") === 0;
const isMediaQueryHardcoded = (propName) => propName.indexOf("@media") === 0;
const isMediaQueryFast = (propName, propValue) => TYPE.isArray(propValue);
const isBlankPropValue = (propValue) =>
  inArray([null, undefined, ""], propValue);

// Given a theme, return a function that
// given a set of Props:Values not themed , return Prop:Value "themed".Its also THEME CUSTOM CONVERTER entry point
const convertPropsRawValuesToThemedValues = (theme) => {
  return (props) => {
    const _ = {};

    // foreach prop, convert raw value into CSS Themed value, if there is a converter..
    for (const propName in props) {
      if (Object.hasOwnProperty.call(props, propName)) {
        const propValue = props[propName];
        const converter = theme.GET_CONVERTER && theme.GET_CONVERTER(propName);

        if (converter) {
          _[propName] = converter(propValue, theme);
          continue;
        }

        _[propName] = String(propValue); // cast to string
      }
    }

    return _;
  };
};

// PARSE, CONVERT, AND RETURN A UI PROPS ONLY {},  GIVEN A REACT PROPS {}
// IT'S AN OBJECT , WITH ONE METHOD : getFinalObject()
const UI = function (allProps) {
  // extract some constant
  const { theme, children, as, ...props } = allProps;

  // define working objects where store temp data
  const raw = {
    typeOfProps: {
      directCSS: {},
      modifiersCSS: {},
      mediaQueriesFast: {},
      mediaQueriesHardcoded: {},
      addonsCSS: {},
    },
    typeOfPropsDerived: {
      mediaQueries: {},
    },
  };
  const themed = {
    typeOfProps: {
      directCSS: {},
      modifiersCSS: {},
      mediaQueries: {},
      addonsCSS: {},
    },
  };

  // STEP 1 - Extract only UI props and save into raw.typeOfPropsList.
  const [directCSS, mediaQueriesFast] = (() => {
    const UIprops = EXTRACTOR(props);
    const [directCSS, mediaQueriesFastRaw] =
      excludePropertiesByCondition(isMediaQueryFast)(UIprops);
    const mediaQueriesFast = (() => {
      let _ = {};
      Object.keys(mediaQueriesFastRaw).forEach((cssPropName) => {
        mediaQueriesFastRaw[cssPropName].forEach(
          (cssPropValue, themeBreakpointIndex) => {
            if (isBlankPropValue(cssPropValue)) return;
            const mediaQueryKey = theme.BP.up
              ? theme.BP.up(themeBreakpointIndex)
              : fallbackTheme.BP.up(themeBreakpointIndex);
            _[mediaQueryKey] = {
              ..._[mediaQueryKey],
              ...{ [cssPropName]: cssPropValue },
            };
          }
        );
      });
      return _;
    })();
    return [directCSS, mediaQueriesFast];
  })();
  const modifiersCSS = extractPropertiesByCondition(isModifier)(props);
  const mediaQueriesHardcoded = extractPropertiesByCondition(
    isMediaQueryHardcoded
  )(props);
  const addonsCSS = theme.EXTRACTOR_ADDONS
    ? theme.EXTRACTOR_ADDONS(allProps)
    : {};

  //  STEP 2 - Save step 1 outcomes!
  raw.typeOfProps = {
    directCSS, //{}
    mediaQueriesFast, //{}
    mediaQueriesHardcoded, //{}
    modifiersCSS, //{}
    addonsCSS, //{}
  };

  // STEP 2 - Build derived "type" of props and save in raw.typeOfPropsDerived
  //    merge mediaQuertFast and Hardcoded
  const mediaQueries = ((hardcoded, arrayed) => {
    const allMediaQueriesKeys = [
      ...Object.keys(hardcoded),
      ...Object.keys(arrayed),
    ];
    const _ = {};
    allMediaQueriesKeys.forEach((mqKey) => {
      _[mqKey] = {
        ...hardcoded[mqKey],
        ...arrayed[mqKey],
      };
    });
    return _;
  })(mediaQueriesHardcoded, mediaQueriesFast);

  //    save
  raw.typeOfPropsDerived = {
    mediaQueries, //{}
  };

  // STEP 3 - convert raw to themed values , for every "type" of props
  const buildUIObject = (obj) => new UI({ ...obj, theme }).getFinalObject();
  const convertPropsWithTheme = convertPropsRawValuesToThemedValues(theme);
  const convertNestedPropsWithTheme = (obj) => {
    return isEmptyObject(obj)
      ? null
      : updateSubObjectsOnlyWith(buildUIObject)(obj);
  };

  const directCSSThemed = convertPropsWithTheme(directCSS);
  const mediaQueriesThemed = convertNestedPropsWithTheme(mediaQueries);
  const modifiersCSSThemed = convertNestedPropsWithTheme(modifiersCSS);
  const addonsCSSThemed = convertPropsWithTheme(addonsCSS);

  themed.typeOfProps = {
    directCSS: directCSSThemed,
    modifiersCSS: modifiersCSSThemed,
    mediaQueries: mediaQueriesThemed,
    addonsCSS: addonsCSSThemed,
  };

  return {
    raw,
    themed,
    getFinalObject() {
      const { themed } = this;
      return {
        ...(themed.typeOfProps.addonsCSS || {}),
        ...(themed.typeOfProps.directCSS || {}),
        ...(themed.typeOfProps.mediaQueries || {}),
        ...(themed.typeOfProps.modifiersCSS || {}),
      };
    },
  };
};

// Box call convertUIPropsTOCSS(props) passing Box props as arguemnts
const convertUIPropsToCSS = (props) => {
  const _UI = new UI(props);
  const finalObject = _UI.getFinalObject();
  return finalObject;
};

export { convertUIPropsToCSS };
