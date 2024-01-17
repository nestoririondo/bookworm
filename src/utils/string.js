const addTrailingDots = (str, maxLen) => {
  if (str.length <= maxLen) return str;
  return `${str.slice(maxLen)}...`;
};
export { addTrailingDots };

const getYear = (str) => {
  if (typeof str !== "string") return;
  return `(${str.slice(-4)})`;
};
export { getYear };
