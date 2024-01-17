export const addTrailingDots = (str, maxLen) => {
  if (str.length <= maxLen) return str;

  return `${str}...`;
}