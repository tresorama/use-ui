// js hepers
//prettier-ignore
import { extractPropertiesByCondition, excludePropertiesByCondition, inArray, TYPE } from "../jshelpers/index.js";
import { EXTRACTOR } from "./convertUIPropsToCSS.EXTRACTORS.js";
import { default as fallbackTheme } from "../theme/defaultThemeBuilded"; // PURE FUNCTIONS
// BUSINESS LOGIC FUNCTIONS

const isModifier = propName => propName.indexOf("&") === 0;

const isMediaQueryHardcoded = propName => propName.indexOf("@media") === 0;

const isMediaQueryFast = (propName, propValue) => TYPE.isArray(propValue); // Given a set of Props "raw" , convert to "themed". Its also THEME CUSTOM CONVERTER entry point


const convertPropsRawValuesToThemedValues = theme => props => {
  const _ = {}; // foreach prop, convert raw value into CSS Themed value, if there is a converter..

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
}; // PARSE, CONVERT, AND RETURN A UI PROPS ONLY {},  GIVEN A REACT PROPS {}
// IT'S AN OBJECT , WITH ONE METHOD : getFinalObject()


const UI = function (allProps) {
  const {
    theme,
    children,
    as,
    ...props
  } = allProps;
  const raw = {
    typeOfProps: {
      directCSS: {},
      modifiersCSS: {},
      mediaQueriesFast: {},
      mediaQueriesHardcoded: {},
      addonsCSS: {}
    },
    typeOfPropsDerived: {
      mediaQueries: {}
    }
  };
  const themed = {
    typeOfProps: {
      directCSS: {},
      modifiersCSS: {},
      mediaQueries: {},
      addonsCSS: {}
    }
  };
  const liveAttributes = {
    hasModifiers: true,
    hasMediaQueryHardcoded: true,
    hasMediaQueryFast: true
  }; // 1 extract only UI props and save into raw.typeOfPropsList {}.
  //    extract directCSS and mediaQueryFast
  //      extract directCSS
  //      exclude from directCSS, mediaQueryFast only props.

  const [directCSS, mediaQueriesFast] = (() => {
    const UIprops = EXTRACTOR(props);
    const [directCSS, mediaQueriesFastRaw] = excludePropertiesByCondition(isMediaQueryFast)(UIprops);

    const mediaQueriesFast = (() => {
      let _ = {};

      for (const key in mediaQueriesFastRaw) {
        debugger;

        if (Object.hasOwnProperty.call(mediaQueriesFastRaw, key)) {
          mediaQueriesFastRaw[key].forEach((v, themeBreakpointIndex) => {
            if (inArray([null, undefined, ""], v)) return;
            debugger;
            const mediaQueryKey = theme.BP.up ? theme.BP.up(themeBreakpointIndex) : fallbackTheme.BP.up(themeBreakpointIndex); // aggiungere => check if values array is longer that fallbackTheme.BP !!!

            const newProps = {
              [key]: v
            };
            _[mediaQueryKey] = { ..._[mediaQueryKey],
              ...newProps
            };
          });
        }
      }

      return _;
    })();

    return [directCSS, mediaQueriesFast];
  })(); //    extract modifierCSS
  //      extract if isModifier


  const modifiersCSS = extractPropertiesByCondition(isModifier)(props); //    extract mediaQueryHardcoded
  //      extract if isMediaQueryHardcoded

  const mediaQueriesHardcoded = extractPropertiesByCondition(isMediaQueryHardcoded)(props); //    extract addons
  //      extract by theme.EXTRACTOR_ADDONS

  const addonsCSS = theme.EXTRACTOR_ADDONS ? theme.EXTRACTOR_ADDONS(allProps) : {}; //    Save!

  raw.typeOfProps = {
    directCSS,
    //{}
    mediaQueriesFast,
    //{}
    mediaQueriesHardcoded,
    //{}
    modifiersCSS,
    //{}
    addonsCSS //{}

  }; // 2 Build derived "type" of props and save in raw.typeOfPropsDerived {}
  //    merge mediaQuertFast and Hardcoded

  const mediaQueries = ((hardcoded, arrayed) => {
    const allMediaQueriesKeys = [...Object.keys(hardcoded), ...Object.keys(arrayed)];
    const _ = {};
    allMediaQueriesKeys.forEach(mqKey => {
      _[mqKey] = { ...hardcoded[mqKey],
        ...arrayed[mqKey]
      };
    });
    return _;
  })(mediaQueriesHardcoded, mediaQueriesFast); //    save


  raw.typeOfPropsDerived = {
    mediaQueries //{}

  }; // 3 convert raw to themed values , for every "type" of props

  const convertPropsWithTheme = convertPropsRawValuesToThemedValues(theme);

  const convertNestedPropsWithTheme = object => {
    return Object.assign({}, ...Object.keys(object).map(key => ({
      [key]: new UI({ ...object[key],
        theme
      }).getFinalObject()
    })));
  }; //    convert directCSS


  const directCSSThemed = convertPropsWithTheme(directCSS); //    convert mediaQueryMerged

  const mediaQueriesThemed = convertNestedPropsWithTheme(mediaQueries); //    convert modifiers

  const modifiersCSSThemed = convertNestedPropsWithTheme(modifiersCSS); //    convert addons

  const addonsCSSThemed = convertPropsWithTheme(addonsCSS);
  themed.typeOfProps = {
    directCSS: directCSSThemed,
    modifiersCSS: modifiersCSSThemed,
    mediaQueries: mediaQueriesThemed,
    addonsCSS: addonsCSSThemed
  };
  /*
  
   // 4 combine them as unique object with a "print" function
   */

  return {
    raw,
    themed,

    getFinalObject() {
      const {
        themed
      } = this;
      return { ...themed.typeOfProps.addonsCSS,
        ...themed.typeOfProps.directCSS,
        ...themed.typeOfProps.mediaQueries,
        ...themed.typeOfProps.modifiersCSS
      };
    }

  };
};

const convertUIPropsToCSS = props => new UI(props).getFinalObject();

export { convertUIPropsToCSS };