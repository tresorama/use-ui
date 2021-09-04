import { TYPE } from "./index";

// REMOVE
export const removeProperty = propName => {
  return ({ [propName]: _, ...rest }) => rest;
};
export const removeProperties = propNames => {
  return object => {
    let _ = { ...object };
    propNames.forEach(propName => {
      const func = removeProperty(propName);
      _ = func(_);
    });
    return _;
  };
};
// EXTRACT
export const extractProperty = propName => {
  return ({ [propName]: _ }) => (_ ? { [propName]: _ } : {});
};

export const extractProperties = propNames => {
  return object => {
    let _ = {};
    propNames.forEach(propName => {
      const func = extractProperty(propName);
      _ = { ..._, ...func(object) };
    });
    return _;
  };
};
export const extractPropertiesByCondition = conditionFunction => {
  return object => {
    let _ = {};
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (conditionFunction(key, object[key])) {
          _ = { ..._, [key]: object[key] };
        }
      }
    }
    return _;
  };
};
// EXCLUDE
export const excludePropertiesByCondition = conditionFunction => {
  return object => {
    const propsExcluded = extractPropertiesByCondition(conditionFunction)(object);
    const propsCleaned = removeProperties(Object.keys(propsExcluded))(object);
    return [propsCleaned, propsExcluded];
  };
};
// UPDATE SUB PROPS
export const updatePropsWith = manipulation => {
  return object =>
    Object.assign(
      {},
      ...Object.keys(object).map(key => ({
        [key]: manipulation({ ...object[key] }),
      }))
    );
};
export const updatePropsWith2 = manipulation => {
  return object =>
    Object.assign(
      {},
      ...Object.entries(object).map(([key, value]) => ({
        [key]: manipulation(value),
      }))
    );
};

// UPDATE SUB OBJECTS ONLY
export const updateSubObjectsOnlyWith = manipulation => {
  const isSubObject = a => TYPE.isObject(a);
  const manipulateOnlySubObject = propValue =>
    isSubObject(propValue) ? manipulation(propValue) : propValue;
  return object => updatePropsWith(manipulateOnlySubObject)(object);
};
