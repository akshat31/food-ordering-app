export const makePreciseValue = num => {
  let numToString = num.toString();
  let preciseLength = numToString.length;
  return num.toPrecision(preciseLength + 2);
};
