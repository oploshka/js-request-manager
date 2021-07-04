
export function isArray(a) {
  return (!!a) && (a.constructor === Array);
}

export function isString(f) {
  return typeof f === 'string';
}

export function isFunction(f) {
  return typeof f === 'function';
}

export function isLiteralObject(a) {
  return (!!a) && (a.constructor === Object);
}
export function isEmpty(value) {
  return Boolean(value && typeof value === 'object') && !Object.keys(value).length;
}
