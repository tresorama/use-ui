// js hepers
import { TYPE, removeFalsyPropsFromObject, removeProperties, inArray } from "../jshelpers/index.js"; // Box prop parser...

import { EXTRACTOR } from "./convertUIPropsToCSS.EXTRACTORS.js"; // given a props object return only useful properties. Speed the workflow.

const getPropsToWorkWith = allProps => {
  const {
    theme,
    UIProps,
    children,
    as,
    ...rest
  } = allProps;
  const propsToWorkWith = UIProps ? UIProps : rest;
  return propsToWorkWith;
};

const convertPropsObjectWithThemedValues = props => {
  debugger;
  const {
    theme
  } = props;
  const propsToWorkWith = getPropsToWorkWith(props); // extract custom props , like TYPO, PRESETS ...

  const extractedAddons = theme.EXTRACTOR_ADDONS && theme.EXTRACTOR_ADDONS({ ...propsToWorkWith,
    theme
  }); // merge with props

  const allProps = { ...(extractedAddons || {}),
    ...propsToWorkWith
  }; // extract only CSS properties.

  const onlyCSSprops = EXTRACTOR(allProps);
  const rawValues = removeFalsyPropsFromObject(onlyCSSprops); // convert all raw values with calculated CSS values ...

  const valued = convertPropsRawValuesToThemedValues(rawValues, theme);
  return valued;
};

const convertPropsRawValuesToThemedValues = (props, theme) => {
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

const convertModifiersPropsToThemedValues = props => {
  const {
    theme
  } = props;
  const propsToWorkWith = getPropsToWorkWith(props);

  const modifiersRawValuesArray = (() => {
    const _ = [];

    for (const key in propsToWorkWith) {
      if (Object.hasOwnProperty.call(propsToWorkWith, key)) {
        const isModifier = String(key).indexOf("&") > -1;

        if (isModifier) {
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
  const ADDONS_NAMES = theme.EXTRACTOR_ADDONS.NAMES || [];
  const propsToWorkWith = getPropsToWorkWith(props);
  const removeAddonsProps = removeProperties(ADDONS_NAMES);
  const propsToWorkWithWithoutAddons = removeAddonsProps(propsToWorkWith);
  let mediaQueriesHardcoded = {};
  let mediaQueriesArrayed = {}; // media query hardcoded ...

  (() => {
    for (const key in propsToWorkWithWithoutAddons) {
      if (Object.hasOwnProperty.call(propsToWorkWithWithoutAddons, key)) {
        const isMediaQuery = key.indexOf("@media") > -1 && key.indexOf("@") === 0;

        if (isMediaQuery) {
          const mediaQueryKey = key;
          const mediaQueryProps = propsToWorkWithWithoutAddons[key];
          mediaQueriesHardcoded[mediaQueryKey] = { ...mediaQueriesHardcoded[mediaQueryKey],
            ...mediaQueryProps
          };
        }
      }
    }
  })(); // media query from arrayed value on cssProp ...


  (() => {
    for (const key in propsToWorkWithWithoutAddons) {
      if (Object.hasOwnProperty.call(propsToWorkWithWithoutAddons, key)) {
        const isMediaQuery = TYPE.isArray(propsToWorkWithWithoutAddons[key]);

        if (isMediaQuery) {
          const propValues = propsToWorkWithWithoutAddons[key];
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
  debugger; // CSS properties refered DIRECTLY to component DOM element

  const directCSS = convertPropsObjectWithThemedValues(props); // CSS "&" sub properties sets ( i.e. &.isOpen, &:hover, &:nth-child, ...)

  const modifiersCSS = convertModifiersPropsToThemedValues(props); // CSS responsive props , both "@media ..." and ARRAY CSS props value

  const mediaQueriesCSS = convertMediaQueriesPropsToThemedValues(props);
  const UIPropsThemed = removeFalsyPropsFromObject({ ...directCSS,
    ...(modifiersCSS || {}),
    ...(mediaQueriesCSS || {})
  });
  return UIPropsThemed;
};

export { convertUIPropsToCSS };