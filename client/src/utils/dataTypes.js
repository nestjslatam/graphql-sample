export const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
};

export const isBoolean = (value) => {
  return typeof value === 'boolean';
};
