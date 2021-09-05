const deepType = a => Object.prototype.toString.call(a);

const getDeepType = a => deepType(a).split("object")[1].split("]")[0].trim().toLowerCase();

export const TYPE = {
  isNull: a => a === null,
  isUndefined: a => a === undefined,
  isString: a => getDeepType(a) === "string",
  isNumber: a => getDeepType(a) === "number",
  isBoolean: a => getDeepType(a) === "boolean",
  isArray: a => getDeepType(a) === "array",
  isObject: a => getDeepType(a) === "object",
  isFunction: a => getDeepType(a) === "function",
  isHtmlElement: a => getDeepType(a) === "htmldivelement",
  isSymbol: a => getDeepType(a) === "symbol",
  isBigInt: a => getDeepType(a) === "bigint"
};