//prettier-ignore
import { TYPE, removeFalsyPropsFromObject, extractPropertiesByCondition, inArray } from "../jshelpers/index.js";
import { EXTRACTOR } from "./convertUIPropsToCSS.EXTRACTORS.js"; // PURE FUNCTIONS

const isModifier = propName => propName.indexOf("&") === 0;

const isMediaQueryHardcoded = propName => propName.indexOf("@media") === 0;

const isMediaQueryFast = (propName, propValue) => TYPE.isArray(propValue); // given a props object return only useful properties. Speed the workflow.


const extractPropsToWorkWith = props => {
  const {
    theme,
    ...allProps
  } = props;
  const addons = theme.EXTRACTOR_ADDONS ? theme.EXTRACTOR_ADDONS(props) : {};
  const commonCSS = removeFalsyPropsFromObject(EXTRACTOR(allProps));
  const modifiers = extractPropertiesByCondition(isModifier)(allProps);
  const mediaQueryHardcoded = extractPropertiesByCondition(isMediaQueryHardcoded)(allProps);
  const result = { ...addons,
    ...commonCSS,
    ...modifiers,
    ...mediaQueryHardcoded
  };
  return { ...removeFalsyPropsFromObject(result),
    theme
  };
};

const convertPropsRawValuesToThemedValues = ({
  theme,
  ...props
}) => {
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
};

const convertPropsObjectWithThemedValues = props => {
  debugger; // const { theme } = props;
  // extract custom props , like TYPO, PRESETS ...
  // const extractedAddons =
  //   theme.EXTRACTOR_ADDONS && theme.EXTRACTOR_ADDONS({ ...propsToWorkWith, theme });
  // merge with props
  // const allProps = {
  //   ...(extractedAddons || {}),
  //   ...propsToWorkWith,
  // };
  // extract only CSS properties.
  // const onlyCSSprops = EXTRACTOR(allProps);
  // const rawValues = removeFalsyPropsFromObject(onlyCSSprops);
  // // convert all raw values with calculated CSS values ...
  // const valued = convertPropsRawValuesToThemedValues(rawValues, theme);
  // convert all raw values with calculated CSS values ...

  const valued = convertPropsRawValuesToThemedValues(props);
  return valued;
};

const convertModifiersPropsToThemedValues = props => {
  const {
    theme
  } = props;
  const propsToWorkWith = props;

  const modifiersRawValuesArray = (() => {
    const _ = [];

    for (const key in propsToWorkWith) {
      if (Object.hasOwnProperty.call(propsToWorkWith, key)) {
        if (isModifier(key)) {
          _.push({
            name: key,
            props: propsToWorkWith[key]
          });
        }
      }
    }

    return _;
  })();

  if (modifiersRawValuesArray.length === 0) return null;

  const modifiersThemedValuesObject = (() => {
    const _ = {};
    modifiersRawValuesArray.forEach(mod => {
      const {
        name: modKey,
        props: modProps
      } = mod;
      _[modKey] = convertUIPropsToCSS({ ...modProps,
        theme
      });
    });
    return _;
  })();

  return modifiersThemedValuesObject;
};

const convertMediaQueriesPropsToThemedValues = props => {
  const {
    theme
  } = props;
  let mediaQueriesHardcoded = {};
  let mediaQueriesArrayed = {}; // media query hardcoded ...

  (() => {
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        if (isMediaQueryHardcoded(key)) {
          const mediaQueryKey = key;
          const mediaQueryProps = props[key];
          mediaQueriesHardcoded[mediaQueryKey] = { ...mediaQueriesHardcoded[mediaQueryKey],
            ...mediaQueryProps
          };
        }
      }
    }
  })(); // media query from arrayed value on cssProp ...


  (() => {
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        const isMediaQuery = TYPE.isArray(props[key]);

        if (isMediaQuery) {
          const propValues = props[key];
          propValues.forEach((v, themeBreakpointIndex) => {
            if (inArray([null, undefined, ""])) return;
            const mediaQueryKey = theme.BP.up(themeBreakpointIndex);
            const mediaQueryProps = {
              [key]: v
            };
            mediaQueriesArrayed[mediaQueryKey] = { ...mediaQueriesArrayed[mediaQueryKey],
              ...mediaQueryProps
            };
          });
        }
      }
    }
  })();

  const merged = (() => {
    const allMediaQueriesKeys = [...Object.keys(mediaQueriesHardcoded), ...Object.keys(mediaQueriesArrayed)];
    const _ = {};
    allMediaQueriesKeys.forEach(mqKey => {
      _[mqKey] = { ...mediaQueriesHardcoded[mqKey],
        ...mediaQueriesArrayed[mqKey]
      };
    });
    return _;
  })();

  const themed = (() => {
    const _ = {};

    for (const mediaQueryKey in merged) {
      if (Object.hasOwnProperty.call(merged, mediaQueryKey)) {
        const mediaQueryProps = merged[mediaQueryKey];
        _[mediaQueryKey] = convertUIPropsToCSS({ ...mediaQueryProps,
          theme
        });
      }
    }

    return _;
  })();

  return themed;
};

const convertUIPropsToCSS = props => {
  debugger;
  const propsToWorkWith = extractPropsToWorkWith(props); // CSS properties refered DIRECTLY to component DOM element

  const directCSS = convertPropsObjectWithThemedValues(propsToWorkWith); // CSS "&" sub properties sets ( i.e. &.isOpen, &:hover, &:nth-child, ...)

  const modifiersCSS = convertModifiersPropsToThemedValues(propsToWorkWith); // CSS responsive props , both "@media ..." and ARRAY CSS props value

  const mediaQueriesCSS = convertMediaQueriesPropsToThemedValues(propsToWorkWith);
  const UIPropsThemed = removeFalsyPropsFromObject({ ...directCSS,
    ...(modifiersCSS || {}),
    ...(mediaQueriesCSS || {})
  });
  return UIPropsThemed;
};

export { convertUIPropsToCSS };